import {getRegexp} from './params'
export function createRouterMap (routes, oldPathMap, oldRegexps) {
  const pathMap = oldPathMap || Object.create(null)
  const regexps = oldRegexps || []
  routes.forEach(route => addRouteRecord(pathMap, regexps, route))

  return {pathMap}
}

function addRouteRecord(pathMap, regexps, route, base) {
  const {path, name} = route
  const hasParams = path.indexOf(':') > -1
  if (hasParams) {
    let {keys, reg} = getRegexp(path)
    regexps.push({
      path,
      keys,
      reg,
      handler: route.handler,
    })
  } else {
    const routeRecord = {
      path: path,
      name: name,
      handler: route.handler,
      base: base
    }
    pathMap[path] = routeRecord
  }
  return {pathMap, regexps}
}
