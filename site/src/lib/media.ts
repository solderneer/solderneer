import manifest from '../data/media-manifest.json';

interface MediaAsset {
  blobUrl: string;
  contentType: string;
  size: number;
  hash: string;
  uploadedAt: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

interface MediaManifest {
  version: number;
  lastUpdated: string | null;
  assets: Record<string, MediaAsset>;
}

const mediaManifest = manifest as MediaManifest;

export type MediaType = 'image' | 'video' | 'model';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];
const VIDEO_EXTENSIONS = ['mp4', 'mov', 'webm', 'm4v'];
const MODEL_EXTENSIONS = ['glb', 'gltf', 'obj', 'fbx'];

export function getMediaType(path: string): MediaType {
  const ext = path.toLowerCase().split('.').pop() || '';
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image';
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
  if (MODEL_EXTENSIONS.includes(ext)) return 'model';
  return 'image'; // default fallback
}

/**
 * Normalize a path for manifest lookup.
 * Handles various input formats:
 * - "folder/file.jpg" -> "images/folder/file.jpg"
 * - "images/folder/file.jpg" -> "images/folder/file.jpg"
 * - "/flights/file.mp4" -> "videos/file.mp4"
 * - "models/file.glb" -> "models/file.glb"
 */
function normalizePath(path: string): string {
  // Remove leading slash
  let normalized = path.replace(/^\/+/, '');

  // If path starts with known prefix, return as-is
  if (normalized.startsWith('images/') ||
      normalized.startsWith('videos/') ||
      normalized.startsWith('models/')) {
    return normalized;
  }

  // Legacy paths: /flights/file.mp4 -> videos/file.mp4
  if (normalized.startsWith('flights/')) {
    return 'videos/' + normalized.replace('flights/', '');
  }

  // Detect type from extension and add appropriate prefix
  const mediaType = getMediaType(normalized);
  switch (mediaType) {
    case 'video':
      return 'videos/' + normalized;
    case 'model':
      return 'models/' + normalized;
    default:
      return 'images/' + normalized;
  }
}

export function getMediaAsset(path: string): MediaAsset | null {
  const normalizedPath = normalizePath(path);
  return mediaManifest.assets[normalizedPath] || null;
}

export function getBlobUrl(path: string): string | null {
  const asset = getMediaAsset(path);
  return asset?.blobUrl || null;
}

/**
 * Get an optimized image URL using Vercel Image Optimization.
 * For non-image media types, returns the direct Blob URL.
 */
export function getOptimizedImageUrl(
  path: string,
  options: { width?: number; quality?: number } = {}
): string | null {
  const asset = getMediaAsset(path);
  if (!asset) return null;

  const mediaType = getMediaType(path);

  // Only apply Vercel Image Optimization for images
  if (mediaType !== 'image') {
    return asset.blobUrl;
  }

  const { width = 800, quality = 75 } = options;
  const encodedUrl = encodeURIComponent(asset.blobUrl);

  return `/_vercel/image?url=${encodedUrl}&w=${width}&q=${quality}`;
}

/**
 * Generate a srcset string for responsive images.
 */
export function getImageSrcSet(
  path: string,
  widths: number[] = [320, 640, 960, 1280, 1920],
  quality: number = 75
): string | null {
  const asset = getMediaAsset(path);
  if (!asset || getMediaType(path) !== 'image') return null;

  return widths
    .map(w => {
      const url = getOptimizedImageUrl(path, { width: w, quality });
      return `${url} ${w}w`;
    })
    .join(', ');
}

export function getImageDimensions(path: string): { width: number; height: number } | null {
  const asset = getMediaAsset(path);
  return asset?.dimensions || null;
}

/**
 * Check if a path is an external URL (not managed by manifest).
 */
export function isExternalUrl(path: string): boolean {
  return path.startsWith('http://') || path.startsWith('https://');
}

/**
 * Resolve a media path to its final URL.
 * Returns the original path if it's external or not found in manifest.
 */
export function resolveMediaUrl(path: string): string {
  if (isExternalUrl(path)) {
    return path;
  }

  const blobUrl = getBlobUrl(path);
  return blobUrl || path;
}

/**
 * Get all assets from the manifest (useful for debugging/listing).
 */
export function getAllAssets(): Record<string, MediaAsset> {
  return mediaManifest.assets;
}
