/* Shariff Muhammad 23611732 */

export function parseHashtags(text){

  const tags = text
    .split(/[\s,]+/)
    .map((tag) => tag.replace(/^#+/, '').toLowerCase().replace(/[^a-z0-9_]/g, ''))
    .filter(Boolean);
  return [...new Set(tags)];

}


export function formatHashtag(tag){

  return `#${tag.replace(/^#+/, '')}`;
  
}