import memo from "./memo.js"

const DEV = true
const ROOT = DEV ? "http://localhost:4321/api" : "https://dug.wtf/api"

async function dugFetch(endpoint, options = {}) {
    const res = await fetch(ROOT+endpoint)
    if (!res.ok) {
        const msg = await res.text()
        return msg
    }
    const data = await res.json()
    return data
}

async function dugFetchMemo(endpoint, key, options = {}) {
    if (!key) {
        console.error("missing key")
        return
    }
    let found
    memo.subscribe(current => found = current[key])
    if (!found) {
        let data = await dugFetch(endpoint, options)
        memo.update(current => {
            current[key] = data
            return current
        })
        return data
    } else {
        return found
    }
}

async function getDugs(full = true) {
    return dugFetchMemo(`/dugscog${full?"?full=true":""}`, 'dugs')
}

async function getDug(idno) {
    const dugs = await getDugs()
    return dugs.find(dug => dug.idno === idno)
}

export {
    getDugs,
    getDug
}