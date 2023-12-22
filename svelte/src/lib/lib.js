export const pad0 = n => n < 10 ? "0"+n : n

export const displayTime = t => {
    let totalSeconds = t
    let totalMinutes = totalSeconds / 60
    let m = Math.floor(totalMinutes)
    let s = Math.round(totalSeconds%60)
    return `${pad0(m)}:${pad0(s)}`
}


export const DEV = true
export const ROOT = DEV ? "http://localhost:4321/api" : "https://dug.wtf/api"
