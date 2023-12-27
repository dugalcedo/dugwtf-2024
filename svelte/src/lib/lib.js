export const pad0 = n => n < 10 ? "0"+n : n

export const displayTime = t => {
    let totalSeconds = t
    let totalMinutes = totalSeconds / 60
    let m = Math.floor(totalMinutes)
    let s = Math.round(totalSeconds%60)
    return `${pad0(m)}:${pad0(s)}`
}


// export const DEV = !location.href.includes('dug.wtf')
export const DEV = false
export const ROOT = DEV ? "http://localhost:4321/api" : "https://dug.wtf/api"

export const onclickout = (node, cb) => {
    document.addEventListener('click', e => {
        if (e.target === node) return
        if (node.contains(e.target)) return
        cb(e)
    })
}