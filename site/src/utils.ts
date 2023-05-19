export function stringToPastelColor(str: String) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return hue;
}

export function hasDuplicate(strings: string[]): boolean {
  const uniqueStrings = new Set<string>();

  for (const str of strings) {
    if (uniqueStrings.has(str)) {
      return true;
    }

    uniqueStrings.add(str);
  }

  return false;
}
