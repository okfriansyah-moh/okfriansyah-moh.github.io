#!/usr/bin/env node
/**
 * Ensures content-feed.meta.json includes every document from topic-index.json.
 * Run automatically before dev/build; automation can update meta for new articles.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const META_PATH = path.join(ROOT, 'src/data/content-feed.meta.json');
const TOPIC_INDEX_PATH = path.join(ROOT, '.automation/topic-index.json');

function docPathToLink(docPath) {
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

const meta = loadJson(META_PATH, {items: []});
const topicIndex = loadJson(TOPIC_INDEX_PATH, {topics: {}});
const links = new Set(meta.items.map((item) => item.link));
let added = 0;

for (const topic of Object.values(topicIndex.topics ?? {})) {
  const document = topic?.document;
  if (!document) continue;

  const link = docPathToLink(document);
  if (links.has(link)) continue;

  const absDoc = path.join(ROOT, document);
  if (!fs.existsSync(absDoc)) {
    console.log(`[sync-content-feed] Skipping ${link} — document file not found yet.`);
    continue;
  }

  const fm = parseFrontmatter(absDoc);
  const stat = fs.statSync(absDoc);

  meta.items.push({
    title: fm.title || titleFromSlug(link),
    description:
      fm.description ||
      'New engineering article — metadata will be refined when content is published.',
    link,
    type: inferType(link),
    date: stat.mtime.toISOString().slice(0, 10),
  });
  links.add(link);
  added += 1;
  console.log(`[sync-content-feed] Added feed entry for ${link}`);
}

meta.items.sort((a, b) => b.date.localeCompare(a.date));

const beforeCount = meta.items.length;
meta.items = meta.items.filter((item) => {
  if (item.link.startsWith('/blog/')) return true;
  if (!item.link.startsWith('/docs/')) return true;
  const docPath = path.join(ROOT, `${item.link.slice(1)}.md`);
  const docPathMdx = path.join(ROOT, `${item.link.slice(1)}.mdx`);
  const exists = fs.existsSync(docPath) || fs.existsSync(docPathMdx);
  if (!exists) {
    console.log(`[sync-content-feed] Removed stale feed entry ${item.link}`);
  }
  return exists;
});

if (beforeCount !== meta.items.length) {
  console.log(`[sync-content-feed] Pruned ${beforeCount - meta.items.length} stale entr${beforeCount - meta.items.length === 1 ? 'y' : 'ies'}.`);
}

fs.writeFileSync(META_PATH, `${JSON.stringify(meta, null, 2)}\n`);

if (added === 0) {
  console.log('[sync-content-feed] Feed is in sync with topic-index.');
} else {
  console.log(`[sync-content-feed] Added ${added} entr${added === 1 ? 'y' : 'ies'}.`);
}
