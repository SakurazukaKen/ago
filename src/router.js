import {createRouterMap, addRouteRecord} from './create-router-map'
class Router {
  constructor(opt, route) {
    const {pathMap, regexps} = createRouterMap(route)
    this.pathMap = pathMap
    this.regexps = regexps
    this.opt = opt
    if (!'onpopstate' in window) {
      this.opt.mode = 'hash'
    }
    this.setLocation = this.opt.mode == 'hash'?this.setHash:this.pushLocation
    this.getLocation = this.opt.mode == 'hash'?this.getHash:this.getPathname
    this.listen()
  }
  pushLocation (path) {
    window.history.pushState({}, '', path)
    this.onStateChange()
  }
  setHash (path) {
    location.hash = path
  }
  getPathname () {
    return location.pathname
  }
  getHash () {
    return location.hash.slice(1)
  }
  match (path) {
    let route = this.pathMap[path]
    if (!route) {
      route = this.regexps
        .map(regexp => {
          const {keys, reg, routeRecord} = regexp
          const paramList = path.match(reg)
          if (paramList === null) {return false}
          const record = Object.assign({}, routeRecord)
          record.params = {}
          for(let i = 0; i < keys.length; i += 1) {
            record.params[keys[i].name] = paramList[i + 1]
          }
          return record
        })
        .filter(record => {
          return !!record
        })[0]
    }
    if (!route) {
      window.history.replaceState({}, '', '/')
    }
    return route
  }

  regist (rawRoute) {
    if(Array.isArray(rawRoute)) {
      const {pathMap, regexps} = createRouterMap(rawRoute, this.pathMap, this.regexps)
      this.pathMap = pathMap
      this.regexps = regexps
    } else {
      addRouteRecord(this.pathMap, this.regexps, rawRoute)
    }
  }

  trigger (routeRecord) {
    if (routeRecord) {
      routeRecord.beforeEnter && routeRecord.beforeEnter()
      routeRecord.handler && routeRecord.handler.call(this, routeRecord)
      .then(routeRecord.beforeEnter)
    }
  }

  onStateChange (event) {
    this.trigger(this.match(this.getLocation()))
  }

  listen () {
    if (this.opt.mode === 'history') {
      window.onpopstate = this.onStateChange.bind(this)
    } else {
      window.onhashchange = this.onStateChange.bind(this)
    }
    document.onclick = (event) => {
      if('ago' in event.target.attributes) {
        event.preventDefault()
        this.setLocation(event.target.getAttribute('ago'))
      }
    }
  }
}

export default Router
