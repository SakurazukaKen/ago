import createRouterMap from './create-router-map'
class Router {
  constructor ({opt, route}) {
    const {pathMap, regexps} = createRouterMap(route)
    this.pathMap = pathMap
    this.regexps = regexps
  }
  match (location) {
    let route = this.pathMap[location]
    if (!route) {
      route = this.regexps.filter(route => {
        return new RegExp(route.reg).test(location)
      })[0]
      if (route) {
        route.params = RegExp(route.reg).exec(location)
      }
    }
    return route
  }
}

export default Router
