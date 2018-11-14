export const getHashtagsInString = (text) => {
  return patternSearch(text, /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm);
}

export const getUrlsInString = (text) => {
  return patternSearch(text, /(https?:\/\/[^\s]+)/);
}

export const patternSearch = (text, pattern) => {
  const matches = text.match(pattern);
  if (matches && matches.length > 0) {
    return matches.map(t => {
      return t.trim();
    });
  }

  return [];
}
