#!/usr/bin/env node

import { put } from '@vercel/blob';
import { createHash } from 'crypto';
import { readFile, writeFile, readdir, stat, mkdir } from 'fs/promises';
import { join, relative, extname } from 'path';
import { existsSync } from 'fs';

const MEDIA_DIR = join(process.cwd(), 'media');
const MANIFEST_PATH = join(process.cwd(), 'site/src/data/media-manifest.json');

const SUPPORTED_EXTENSIONS = {
  images: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'],
  videos: ['.mp4', '.mov', '.webm', '.m4v'],
  models: ['.glb', '.gltf', '.obj', '.fbx']
};

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.m4v': 'video/x-m4v',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.obj': 'model/obj',
  '.fbx': 'application/octet-stream'
};

async function computeFileHash(filePath) {
  const content = await readFile(filePath);
  return 'sha256:' + createHash('sha256').update(content).digest('hex');
}

async function getImageDimensions(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.images.includes(ext)) return null;

  try {
    // Dynamic import sharp only when needed
    const sharp = (await import('sharp')).default;
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    console.warn(`Could not get dimensions for ${filePath}: ${error.message}`);
    return null;
  }
}

async function walkDirectory(dir) {
  const files = [];

  if (!existsSync(dir)) {
    return files;
  }

  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkDirectory(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      const allSupported = [
        ...SUPPORTED_EXTENSIONS.images,
        ...SUPPORTED_EXTENSIONS.videos,
        ...SUPPORTED_EXTENSIONS.models
      ];
      if (allSupported.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function loadManifest() {
  try {
    const content = await readFile(MANIFEST_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return { version: 1, lastUpdated: null, assets: {} };
  }
}

async function saveManifest(manifest) {
  manifest.lastUpdated = new Date().toISOString();

  // Ensure the directory exists
  const dir = join(process.cwd(), 'site/src/data');
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

async function uploadFile(filePath, manifest) {
  const relativePath = relative(MEDIA_DIR, filePath);
  const hash = await computeFileHash(filePath);
  const ext = extname(filePath).toLowerCase();

  // Check if file already uploaded with same hash
  const existing = manifest.assets[relativePath];
  if (existing && existing.hash === hash) {
    console.log(`  Skipping (unchanged): ${relativePath}`);
    return null;
  }

  const content = await readFile(filePath);
  const stats = await stat(filePath);
  const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

  console.log(`  Uploading: ${relativePath}`);

  const blob = await put(relativePath, content, {
    access: 'public',
    contentType,
    addRandomSuffix: true
  });

  const asset = {
    blobUrl: blob.url,
    contentType,
    size: stats.size,
    hash,
    uploadedAt: new Date().toISOString()
  };

  // Add dimensions for images
  const dimensions = await getImageDimensions(filePath);
  if (dimensions) {
    asset.dimensions = dimensions;
  }

  return { path: relativePath, asset };
}

async function main() {
  console.log('Vercel Blob Media Upload\n');

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Error: BLOB_READ_WRITE_TOKEN environment variable not set');
    console.error('Get your token from: https://vercel.com/dashboard/stores');
    process.exit(1);
  }

  if (!existsSync(MEDIA_DIR)) {
    console.log('No media/ directory found. Nothing to upload.');
    process.exit(0);
  }

  const manifest = await loadManifest();
  const files = await walkDirectory(MEDIA_DIR);

  if (files.length === 0) {
    console.log('No media files found in media/ directory.');
    process.exit(0);
  }

  console.log(`Found ${files.length} media file(s)\n`);

  let uploadCount = 0;
  let errorCount = 0;

  for (const filePath of files) {
    try {
      const result = await uploadFile(filePath, manifest);
      if (result) {
        manifest.assets[result.path] = result.asset;
        uploadCount++;
      }
    } catch (error) {
      console.error(`  Error uploading ${filePath}: ${error.message}`);
      errorCount++;
    }
  }

  if (uploadCount > 0) {
    await saveManifest(manifest);
    console.log(`\nUploaded ${uploadCount} file(s). Manifest updated.`);
  } else if (errorCount === 0) {
    console.log('\nNo new files to upload. All files up to date.');
  }

  if (errorCount > 0) {
    console.error(`\n${errorCount} file(s) failed to upload.`);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
