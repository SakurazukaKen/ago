import {getRegexp} from './params'
export function createRouterMap (routes, oldPathMap, oldRegexps) {
  const pathMap = oldPathMap || Object.create(null)
  const regexps = oldRegexps || []
  routes.forEach(route => addRouteRecord(pathMap, regexps, route))

  return {pathMap, regexps}
}

function addRouteRecord(pathMap, regexps, route) {
  let {handler, path, beforeEnter, afterLeave} = route
  if (!path || !handler) {
    console.log('path and handler is necessary')
  }
  const hasParams = /:(\w|-)+/g.test(path)
  let routeRecord = {
    path,
    handler,
    beforeEnter,
    afterLeave,
    hasParams,
  }
  pathMap[path] = routeRecord
  if(hasParams) {
    let {keys, reg} = getRegexp(path)
    regexps.push({
      reg,
      keys,
      routeRecord
    })
  }
}
