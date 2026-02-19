/**
 * Path-to-label map for layout breadcrumb. Keys are full path segments;
 * the breadcrumb is built from the current URL by splitting and looking up labels.
 */
export const BREADCRUMB_LABELS: Record<string, string> = {
  '': 'Home',
  about: 'About',
  games: 'Games',
  casual: 'Casual',
  'tic-tac-toe': 'Tic-Tac-Toe',
  'dots-and-boxes': 'Dots and Boxes',
  puzzle: 'Puzzle',
  tools: 'Tools',
  productivity: 'Productivity Tools',
  'developer-tool': 'Developer Tools',
  'base32-encode-decode': 'Base32 Encode / Decode',
  'base64-encode-decode': 'Base64 Encode / Decode',
  'url-encode-decode': 'URL Encode / Decode',
  'password-generator': 'Password Generator',
  regex: 'Regular Expression Check',
};

/**
 * Returns a human-readable label for a path segment, or a titleized fallback.
 */
export function getBreadcrumbLabel(segment: string): string {
  return BREADCRUMB_LABELS[segment] ?? titleize(segment);
}

function titleize(pathSegment: string): string {
  return pathSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
