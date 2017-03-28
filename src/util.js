export function normalizePath(path) {
  return path.replace(/\/\//g, '/')
}

export function cancatPath(base, relative) {
  if (relative.charAt(0) === '/') {return relative}

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  let base_segments = base.split('/')
  if (!base_segments[base_segments.length-1]) {base_segments.pop()}

  let relative_segments = relative.split('/')
  for (let segment of relative_segments) {
    switch (segment) {
      case '.':
        break
      case '..':
        base_segments.pop()
        break
      default:
        base_segments.push(segment)
    }
  }

  let path = base_segments.join('/')
  if (path.charAt(0) !== '/') {
    path = '/' + path
  }
  return path
}

export function parseUrl(path) {
  let hash = ''
  let query = ''

  const hashIndex = path.indexOf('#')
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex)
    path = path.slice(0, hashIndex)
  }

  const queryIndex = path.indexOf('?')
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1)
    path = path.slice(0, queryIndex)
  }

  return {
    path,
    query,
    hash
  }
}
