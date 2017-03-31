var router = {
  _router: {},
  afterHook: [],
  beforeHook: [],
  root: '/',
  getFragment() {
    var fragment = decodeURI(location.pathname)
    fragment = fragment.replace(/\?(.*)$/, '')
    return fragment
  },
  normalizeUrl(url) {
    return url.toString().replace(/\/$/, '').replace(/^\//, '')
  },
  listen() {
    window.onpopstate = this.trigger.bind(this)
    document.querySelectorAll('a.a-link').forEach(ele =>
      ele.onclick = (event) => {
        event.preventDefault()
        this.go(event.target.getAttribute('go'))
      }
    )
  },
  trigger(event) {
    var state = event.state
    var fragment = this.getFragment()
    this.afterHook.forEach(fn => fn(state.from, fragment))
    this._router[this.normalizeUrl(fragment)]()
    this.beforeHook.forEach(fn => fn(state.from, fragment))
  },
  regist(re, handler) {
    this._router[this.normalizeUrl(re)] = handler
    return this
  },
  clean() {
    this._router = {}
    return this
  },
  forward() {
    window.history.forward()
  },
  back() {
    window.history.back()
  },
  go(url, title) {
    window.history.pushState({ from: this.getFragment() }, title ? title : document.title, url)
    this.trigger({state: { from: this.getFragment()}})
  }

}


if (window) {
  window.$router = router
}
