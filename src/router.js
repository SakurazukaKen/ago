import createRouterMap from './create-router-map'
class Router {
  constructor ({opt, route}) {
    const {pathMap, nameMap} = createRouterMap(route)
  }

}

export default Router
