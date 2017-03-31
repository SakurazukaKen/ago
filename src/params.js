import Regexp from 'path-to-regexp'

const regexpCache = Object.create(null)
const compilerCache = Object.create(null)

export function getRegexp(path) {
  let hit = regexpCache[path]
  let keys, reg
  if (hit) {
    keys = hit.keys
    reg = hit.reg
  } else {
    keys = []
    reg = Regexp(path, keys)
    regexpCache[path] = {keys, reg}
  }

  return {keys, reg}
}

export function compilePath(path, params) {
  try {
    let compiler = compilerCache[path] || (compilerCache[path] = Regexp.compile(path))
    return compiler(params||{}, { pretty: true })
  } catch (e) {
    return ''
  }
}
