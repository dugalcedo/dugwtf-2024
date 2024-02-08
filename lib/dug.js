export function randRange(min, max, int) {
    let r = (Math.random()*(max-min)) + min
    return int ? Math.round(r) : r
}

export function DOM(obj){
    const dom = {}
    forEachProp(obj, (k, v) => {
        if (v.startsWith('%')) {
            dom[k] = document.querySelectorAll(v)
        } else {
            dom[k] = document.querySelector(v)
        }
    })
    return dom
}

export function handleForm(form, callback, validationObject) {
    form.addEventListener('submit', e => {
        const data = Object.fromEntries(new FormData(form))
        e.preventDefault()
        if (validationObject) validateForm(form, validationObject)
        callback(data, e, form)
    })
}

export function validateForm(form, obj = {}) {
    const {
        required = [], // e.g. ['name', 'password']
        numbers = [], // e.g. [['rating', [0, 1440]]],
        matches = [], // e.g. [['password', 'password2']]
    } = obj

    const errors = []

    required.forEach(field => {
        if (!form[field]) {
            console.warn(`Form does not have field ${field}`)
        }
        // console.log(field, form[field])
        if (!form[field].value) {
            errors.push(`${field} field required`)
        }
    })

    numbers.forEach(([field, range]) => {
        const [min, max] = range
        const value = Number(form[field].value)||0
        if (value < min || value > max) {
            errors.push(`${field} field must be between ${min} and ${max}`)
        }
    })

    matches.forEach(([a, b]) => {
        if (form[a].value !== form[b].value) {
            errors.push(`fields '${a}' and '${b}' must match`)
        }
    })

    return errors
}

export async function haemta(options = {}) {

    // Defaults
    const {
        endpoint,
        method = "GET",
        responseType = 'json',
        requestType = 'application/json',
        headers = {},
        body,
        onBadRes = (res)=>{},
        onGoodRes = data=>data
    } = options

    if (!endpoint) {
        console.warn("No endpoint provided")
        return
    }

    const fetchOptions = {
        method,
        headers: {
            "Content-Type": requestType,
            ...headers
        }
    }

    if (body) fetchOptions.body = JSON.stringify(body)

    const token = localStorage.getItem('moosic-token')
    if (token) fetchOptions.headers['x-token'] = token

    const res = await fetch(endpoint, fetchOptions)

    if (!res.ok) {
        console.log(`Failed making ${method} request to ${endpoint}.`)
        console.log(res)
        return onBadRes(res)
    }

    const data = await res[responseType]()

    if (data.token) {
        document.cookie = `token=${data.token};max-age=${14*24*3600};`
    }

    return onGoodRes(data)
}

export function forEachProp(obj, cb) {Object.entries((obj||{})).forEach(([k,v])=>cb(k,v))}

export class Component {
    static ce = document.createElement.bind(document)
    static all = []

    constructor(options) {
        this.options = options
        Component.all.push(this)
        this.render()
    }

    render() {
        const C = Component
        const O = this.options
        const main = C.ce(O.tagname||'div')
        const parent = typeof O.parent === 'string' ? document.querySelector(O.parent) : O.parent
        if (!parent) {
            console.warn('Error in dugjs.Compoment: missing parent')
        }

        forEachProp(O.attr, (k, v) => {
            main.setAttribute(k, v)
        })

        forEachProp(O.props, (k, v) => {
            main[k] = v
        })
        
        forEachProp(O.events, (k, v) => {
            if (typeof v === 'function') {
                main.addEventListener(k, v)
            } else if (typeof v === 'object' && !Array.isArray(v)) {
                const fnOptions = v
                const fn = fnOptions.fn
                main.addEventListener(k, e => {
                    fn(e.target, e)
                })
            } else {
                console.warn('dug.Component: Events must be objects or functions.')
            }
        })
        
        forEachProp(O.dataset, (k, v) => {
            main.setAttribute(`data-${k}`, v)
        })
        
        forEachProp(O.style, (k, v) => {
            main.style[k] = v
        })

        if (O.children) {
            O.children.forEach(child => {
                new Component({...child, parent: main})
            })
        }

        parent.append(main)
    }
}

export function findDugElements(suffix) {
    return document.querySelectorAll(`*[d-${suffix}]`)
}

let _config = {}
let _attrs = ['innerText']
let _events = ['onclick']

function scan() {
    _attrs.forEach(scanForAttr)
    _events.forEach(scanForHandler)
    scanForStyles()
}

function isRelevant(el, dependencies) {
    if (dependencies) {
        if (! dependencies.some(dep => el.classList.contains(`__d-${dep}`))) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}

function scanForStyles(dependencies) {
    const styleElements = findDugElements('style')
    styleElements.forEach(el => {
        if (!isRelevant(el, dependencies)) return
        let styles = el.getAttribute('d-style').split(';')
        styles = styles.map(s => s.replaceAll('\n','').trim()).filter(s => s)
        styles.forEach(style => {
            let [prop, val] = style.split(':')
            val = val.trim()
            if (val.startsWith('$')) {
                el.classList.add(`__d-${val.replace('$','')}`)
                val = _config.state[val.replace('$','')]
            }
            el.style[prop] = val
        })
    })
}

function scanForHandler(eventName) {
    const els = findDugElements(eventName)
    els.forEach(el => {
        const handlerName = el.getAttribute(`d-${eventName}`)
        const handler = _config.handlers[handlerName]
        const eName = eventName.replace('on','')
        el.addEventListener(eName, e => {
            const dependencies = handler(_config.state, e)
            _attrs.forEach((attr)=>{scanForAttr(attr, dependencies)})
            scanForStyles(dependencies)
        })
    })
}

function scanForAttr(attr, dependencies) {
    const els = findDugElements(attr)
    els.forEach(el => {
        const propName = el.getAttribute(`d-${attr}`)

        // check dependencies first, to see if element should be updated
        if (!isRelevant(el, dependencies)) return

        el.classList.add(`__d-${propName}`)
        el[attr] = _config.state[propName]
    })
}

export function init(config) {
    _config = config
    scan()
    const observer = new MutationObserver((records, observer) => {
        console.log('observed')
        // scan()
    })
    observer.observe(document.querySelector(config.scope), {childList: true, subtree: true})
}