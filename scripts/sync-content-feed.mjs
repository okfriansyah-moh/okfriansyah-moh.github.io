#!/usr/bin/env node
/**
 * Ensures per-locale content-feed.meta.json includes every document from topic-index.json.
 * Run automatically before dev/build; automation can update meta for new articles.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TOPIC_INDEX_PATH = path.join(ROOT, '.automation/topic-index.json');
const LOCALES = ['en', 'id'];

function docPathToLink(docPath) {
  if (docPath.startsWith('i18n/')) {
    const relative = docPath
      .replace(/^i18n\/[^/]+\/docusaurus-plugin-content-docs\/current\//, '');
    return `/docs/${relative.replace(/\.mdx?$/, '')}`;
  }
  return `/${docPath.replace(/\.mdx?$/, '')}`;
}

function inferType(link) {
  if (link.includes('/systems/')) return 'system';
  if (link.includes('/concepts/')) return 'concept';
  if (link.includes('/projects/')) return 'project';
  if (link.includes('/blog/')) return 'blog';
  return 'concept';
}

function titleFromSlug(link) {
  const slug = link.split('/').pop() ?? 'article';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parseFrontmatter(absPath) {
  if (!fs.existsSync(absPath)) return {};
  const content = fs.readFileSync(absPath, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const fields = {};
  for (const line of match[1].split('\n')) {
    const parsed = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (!parsed) continue;
    const [, key, raw] = parsed;
    fields[key] = raw.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1').trim();
  }
  return fields;
}

function loadJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function resolveDocFileFromPath(docPath) {
  const abs = path.join(ROOT, docPath);
  if (fs.existsSync(abs)) return abs;
  const base = abs.replace(/\.mdx?$/, '');
  for (const ext of ['.md', '.mdx']) {
    if (fs.existsSync(`${base}${ext}`)) return `${base}${ext}`;
  }
  return null;
}

function resolveDocFileFromLink(link) {
  if (link.startsWith('/docs/')) {
    const relative = link.slice('/docs/'.length);
    const enPath = `docs/${relative}.md`;
    const idPath = `i18n/id/docusaurus-plugin-content-docs/current/${relative}.md`;
    return resolveDocFileFromPath(enPath) ?? resolveDocFileFromPath(idPath);
  }
  const base = path.join(ROOT, link.slice(1));
  for (const ext of ['.md', '.mdx']) {
    if (fs.existsSync(`${base}${ext}`)) return `${base}${ext}`;
  }
  return null;
}

function documentPathsForTopic(topic) {
  const doc = topic?.document;
  if (!doc) return {};
  if (typeof doc === 'string') {
    const en = doc;
    const relative = en.replace(/^docs\//, '').replace(/\.mdx?$/, '');
    return {
      en,
      id: `i18n/id/docusaurus-plugin-content-docs/current/${relative}.md`,
    };
  }
  return doc;
}

function computeReadingTime(item) {
  if (item.link.startsWith('/docs/')) {
    const file = resolveDocFileFromLink(item.link);
    if (file) {
      const body = fs
        .readFileSync(file, 'utf8')
        .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
        .replace(/```[\s\S]*?```/g, '');
      const words = body.split(/\s+/).filter(Boolean).length;
      return Math.max(1, Math.round(words / 200));
    }
  }
  const descWords = (item.description ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(descWords / 20));
}

function syncLocale(locale, topicIndex) {
  const metaPath = path.join(ROOT, `src/data/i18n/${locale}/content-feed.meta.json`);
  const meta = loadJson(metaPath, {items: []});
  const links = new Set(meta.items.map((item) => item.link));
  let added = 0;

  for (const topic of Object.values(topicIndex.topics ?? {})) {
    const paths = documentPathsForTopic(topic);
    const docPath = paths[locale];
    if (!docPath) continue;

    const link = docPathToLink(docPath);
    if (links.has(link)) continue;

    const absDoc = resolveDocFileFromPath(docPath);
    if (!absDoc) {
      console.log(`[sync-content-feed:${locale}] Skipping ${link} — document file not found yet.`);
      continue;
    }

    const fm = parseFrontmatter(absDoc);
    const stat = fs.statSync(absDoc);

    meta.items.push({
      title: fm.title || titleFromSlug(link),
      description:
        fm.description ||
        (locale === 'id'
          ? 'Artikel engineering baru — metadata akan disempurnakan saat konten diterbitkan.'
          : 'New engineering article — metadata will be refined when content is published.'),
      link,
      type: inferType(link),
      date: stat.mtime.toISOString().slice(0, 10),
    });
    links.add(link);
    added += 1;
    console.log(`[sync-content-feed:${locale}] Added feed entry for ${link}`);
  }

  meta.items.sort((a, b) => b.date.localeCompare(a.date));

  const beforeCount = meta.items.length;
  meta.items = meta.items.filter((item) => {
    if (item.link.startsWith('/blog/')) return true;
    if (!item.link.startsWith('/docs/')) return true;
    const relative = item.link.slice('/docs/'.length);
    const enExists =
      fs.existsSync(path.join(ROOT, `docs/${relative}.md`)) ||
      fs.existsSync(path.join(ROOT, `docs/${relative}.mdx`));
    const idExists =
      fs.existsSync(
        path.join(ROOT, `i18n/id/docusaurus-plugin-content-docs/current/${relative}.md`),
      ) ||
      fs.existsSync(
        path.join(ROOT, `i18n/id/docusaurus-plugin-content-docs/current/${relative}.mdx`),
      );
    const exists = locale === 'en' ? enExists : idExists;
    if (!exists) {
      console.log(`[sync-content-feed:${locale}] Removed stale feed entry ${item.link}`);
    }
    return exists;
  });

  if (beforeCount !== meta.items.length) {
    const pruned = beforeCount - meta.items.length;
    console.log(
      `[sync-content-feed:${locale}] Pruned ${pruned} stale entr${pruned === 1 ? 'y' : 'ies'}.`,
    );
  }

  for (const item of meta.items) {
    item.readingTime = computeReadingTime(item);
  }

  fs.mkdirSync(path.dirname(metaPath), {recursive: true});
  fs.writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);

  if (added === 0) {
    console.log(`[sync-content-feed:${locale}] Feed is in sync with topic-index.`);
  } else {
    console.log(`[sync-content-feed:${locale}] Added ${added} entr${added === 1 ? 'y' : 'ies'}.`);
  }
}

const topicIndex = loadJson(TOPIC_INDEX_PATH, {topics: {}});
for (const locale of LOCALES) {
  syncLocale(locale, topicIndex);
}

// Legacy single-file mirror for backward compatibility during transition
const legacyPath = path.join(ROOT, 'src/data/content-feed.meta.json');
const enMetaPath = path.join(ROOT, 'src/data/i18n/en/content-feed.meta.json');
if (fs.existsSync(enMetaPath)) {
  fs.copyFileSync(enMetaPath, legacyPath);
}
