import React from 'react';
import wordmark from './wordmark.png';
import mascot from './mascot-full-6-7.png';
import mark from './mark-6-7-master.png';
import icon from './icon-1024.png';
import home from './home.png';
import styles from './visuals.module.css';

type Props = {locale?: 'en' | 'id'};

export function AssetGallery({locale = 'en'}: Props) {
  const id = locale === 'id';
  const assets = [
    {src: wordmark, name: 'Wordmark', alt: id ? 'Wordmark Padu berwarna oranye dengan huruf membulat.' : 'Orange Padu wordmark with rounded lettering.', note: id ? 'Nama yang dibaca.' : 'The name people read.'},
    {src: mascot, name: id ? 'Maskot lengkap' : 'Full mascot', alt: id ? 'Dua ubin keramik bernomor 6 dan 7, tersenyum, dengan penghubung oranye, tangan, kaki, dan sepatu.' : 'Smiling ceramic 6 and 7 tiles joined by an orange connector, with arms, legs, and shoes.', note: id ? 'Karakter untuk ilustrasi.' : 'Character for illustration.'},
    {src: mark, name: id ? 'Mark ringkas' : 'Compact mark', alt: id ? 'Ubin 6 dan 7 dengan wajah dan penghubung oranye, tanpa tangan atau kaki.' : 'Faced 6 and 7 tiles with an orange connector and no limbs.', note: id ? 'Identitas dengan detail lebih sedikit.' : 'Identity with fewer details.'},
    {src: icon, name: id ? 'Ikon aplikasi' : 'App icon', alt: id ? 'Mark 6 dan 7 pada latar krem persegi dengan sudut membulat.' : 'The 6 and 7 mark on a rounded square cream field.', note: id ? 'Bentuk untuk launcher aplikasi.' : 'Artwork for the app launcher.'},
  ];
  return <figure className={styles.figure}>
    <div className={styles.grid}>
      {assets.map(asset => <div className={styles.asset} key={asset.name}>
        <div className={styles.imageStage}><img src={asset.src} alt={asset.alt} loading="lazy" width={asset.src === wordmark ? 2172 : asset.src === icon ? 1024 : 1254} height={asset.src === wordmark ? 724 : asset.src === icon ? 1024 : 1254} /></div>
        <strong>{asset.name}</strong><p>{asset.note}</p>
      </div>)}
    </div>
    <figcaption>{id ? 'Aset Padu yang sudah ada, ditampilkan tanpa perubahan. Masing-masing memiliki tugas berbeda.' : 'Existing Padu assets, shown unchanged. Each has a different job.'}</figcaption>
  </figure>;
}

export function Palette({locale = 'en'}: Props) {
  const id = locale === 'id';
  const colors = [
    ['Parchment', '#FFF9EE', id ? 'Latar utama' : 'Main background'],
    ['Ivory', '#FFFDF7', id ? 'Permukaan' : 'Surfaces'],
    ['Ink / umber', '#29251E', id ? 'Teks utama' : 'Primary text'],
    ['Copper', '#C44921', id ? 'Aksi utama' : 'Primary actions'],
    ['Marigold', '#F6C64D', id ? 'Aksen inventori' : 'Inventory accent'],
    ['Verdigris', '#176B59', id ? 'Teal / keadaan aktif' : 'Teal / powered state'],
    ['Trace idle', '#E1D5BE', id ? 'Jejak dan garis batas' : 'Idle traces and outlines'],
  ];
  return <figure className={styles.figure}>
    <div className={styles.swatches}>{colors.map(([name, hex, role]) => <div className={styles.swatch} key={hex}>
      <span className={styles.color} style={{backgroundColor: hex}} aria-hidden="true" />
      <strong>{name}</strong><code>{hex}</code><span>{role}</span>
    </div>)}</div>
    <figcaption>{id ? 'Pilihan token dari AppTheme produksi pada revisi sumber artikel. Nama dan fungsi tetap terbaca tanpa mengenali warnanya.' : 'Selected production AppTheme tokens at this article’s source revision. Names and roles remain readable without recognizing the colors.'}</figcaption>
  </figure>;
}

export function StyleComparison({locale = 'en'}: Props) {
  const id = locale === 'id';
  return <figure className={styles.figure}>
    <div className={styles.grid}>
      <div className={`${styles.sample} ${styles.coherent}`}>
        <strong>{id ? 'Gaya konsisten' : 'Coherent styling'}</strong>
        <p>{id ? 'Permukaan hangat · aksen copper' : 'Warm surfaces · copper accent'}</p>
        <div className={styles.tiles} aria-label={id ? 'Contoh persamaan 6 tambah 7 sama dengan 13' : 'Example equation: 6 plus 7 equals 13'}><span>6</span><b>+</b><span>7</span><b>=</b><span>13</span></div>
        <div className={styles.actionSample}>{id ? 'Contoh penekanan aksi' : 'Action emphasis sample'}</div>
        <small>{id ? 'Sudut, jarak, dan penekanan sejalan.' : 'Corners, spacing, and emphasis agree.'}</small>
      </div>
      <div className={`${styles.sample} ${styles.disconnected}`}>
        <strong>{id ? 'Gaya terputus' : 'Disconnected styling'}</strong>
        <p>{id ? 'Latar dingin · banyak aksen' : 'Cool field · competing accents'}</p>
        <div className={styles.tiles} aria-label={id ? 'Contoh persamaan 6 tambah 7 sama dengan 13' : 'Example equation: 6 plus 7 equals 13'}><span>6</span><b>+</b><span>7</span><b>=</b><span>13</span></div>
        <div className={styles.actionSample}>{id ? 'Contoh penekanan aksi' : 'Action emphasis sample'}</div>
        <small>{id ? 'Sudut dan penekanan berubah antar elemen.' : 'Corners and emphasis change between elements.'}</small>
      </div>
    </div>
    <figcaption>{id ? 'Ilustrasi edukasi statis yang dibuat untuk artikel ini. Ini bukan riwayat desain Padu atau usulan desain baru; bidang aksi tidak interaktif.' : 'Static teaching illustrations made for this article. These are not historical Padu versions or a proposed redesign; the action samples are not interactive.'}</figcaption>
  </figure>;
}

export function SizeComparison({locale = 'en'}: Props) {
  const id = locale === 'id';
  return <figure className={styles.figure}>
    <div className={styles.grid}>
      {[[mascot, id ? 'Maskot lengkap' : 'Full mascot'], [mark, id ? 'Mark ringkas' : 'Compact mark']].map(([src, label]) => <div className={styles.asset} key={label}>
        <strong>{label}</strong>
        <div className={styles.sizes}>{[96, 48, 24].map(size => <div key={size}><img src={src} width={size} height={size} loading="lazy" alt={id ? `${label}, kotak ${size} piksel` : `${label}, ${size}-pixel box`} /><code>{size}px</code></div>)}</div>
      </div>)}
    </div>
    <figcaption>{id ? 'Perbandingan edukasi menggunakan berkas asli pada kotak CSS 96, 48, dan 24 piksel. Padding transparan ikut dihitung; ini bukan ukuran minimum yang disertifikasi atau uji launcher perangkat.' : 'Teaching comparison using original files in 96, 48, and 24 CSS-pixel boxes. Transparent padding is included; these are not certified minimum sizes or device launcher tests.'}</figcaption>
  </figure>;
}

export function HistoricalHome({locale = 'en'}: Props) {
  const id = locale === 'id';
  return <figure className={styles.figure}>
    <img className={styles.home} src={home} width={780} height={1688} loading="lazy" alt={id ? 'Home Padu historis: wordmark oranye, maskot 6 dan 7, kartu kuning Today’s Padu dengan aksi copper, serta kartu mode pada latar krem.' : 'Historical Padu Home: orange wordmark, 6 and 7 mascot, yellow Today’s Padu card with a copper action, and mode cards on a cream field.'} />
    <figcaption>{id ? 'Bukti visual historis, 17 September 2026, viewport logis 390 × 844. Diambil oleh uji visual Flutter. Ini bukan tangkapan layar produksi terkini atau bukti perilaku perangkat.' : 'Historical visual evidence, September 17, 2026, at a 390 × 844 logical viewport. Captured by a Flutter visual test. This is not a current production screenshot or evidence of device behavior.'}</figcaption>
  </figure>;
}
