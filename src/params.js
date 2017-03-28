import Regexp from 'path-to-regexp'

const regexpCache = Object.create(null)
const compilerCache = Object.create(null)

export function getRegexp(path) {
  let hit = regexpCache[path]
  let keys, regexp
  if (hit) {
    keys = hit.keys
    regexp = hit.regexp
  } else {
    keys = []
    regexp = Regexp(path, keys)
    regexpCache[path] = {keys, regexp}
  }

  return {keys, regexp}
}

export function compilePath(path, params) {
  try {
    let compiler = compilerCache[path] || (compilerCache[path] = Regexp.compile(path))
    return compiler(params||{}, { pretty: true })
  } catch (e) {
    return ''
  }
}
