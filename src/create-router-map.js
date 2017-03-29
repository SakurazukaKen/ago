export function createRouterMap (routes, oldPathMap, oldNameMap) {
  const pathMap = oldPathMap || Object.create(null)
  const nameMap = oldNameMap || Object.create(null)

  routes.forEach(route => addRouteRecord(pathMap, nameMap, route))

  return {pathMap, nameMap}
}

function addRouteRecord(pathMap, nameMap, route, base) {
  const {rawPath, name} = route
  const patternPath = rawPath.replace(/:(\w | \-)?/g, 'PARAMS')
  const hasParams = rawPath.indexOf(':') > -1
  const routeRecord = {
    rawpath: rawPath,
    patternPath: patternPath,
    name: name,
    handler: route.handler,
    base: base,
    hasParams: hasParams
  }

  pathMap[patternPath] = routeRecord
  nameMap[name] = routeRecord
}
