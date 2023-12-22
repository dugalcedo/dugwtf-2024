import getMP3Duration from 'get-mp3-duration'
import dugs from './dugs.js'
import { readdirSync, writeFileSync, renameSync, readFileSync } from 'fs'

// const hyphenize = str => str.toLowerCase().replaceAll(' ','-')
const alphabetizeKeys = dug => {
    let old = {...dug} 
    let sorted = {}
    let entries = Object.entries(old)
    entries.sort((a,b)=>a[0].localeCompare(b[0]))
    entries.forEach(([k,v]) => {
        sorted[k] = v
    })

    return sorted
}

const pad0 = n => n < 10 ? "0"+n : n

const displayTime = t => {
    let totalSeconds = t
    let totalMinutes = totalSeconds / 60
    let m = Math.floor(totalMinutes)
    let s = Math.round(totalSeconds%60)
    return `${pad0(m)}:${pad0(s)}`
}

const trackToName = s => {
    s = s.replace(/\d\d\s/g,'').replace('.mp3','')
    return s
}

const trackLength = (id, title) => {
    let file = readFileSync(`./db/audio/${id}/${title}`)
    let duration_s = Math.round(getMP3Duration(file)/1000)
    let duration_f = displayTime(duration_s)
    return {
        duration_s,
        duration_f
    }
}

/* if (dug.id !== 'DUG042c') return dug
dug.tracklist = []
try {
    const tracks = readdirSync(`./db/audio/${dug.id}`)
    tracks.forEach((title, i) => {
        let durationData = trackLength(dug.id, title)
        dug.tracklist.push({
            title: trackToName(title),
            endpoint: `/audio/track?albumId=${dug.id}&trackNo=${i+1}`,
            ...durationData
        })
    })
} catch (error) {
    
} */

const newDugs = dugs.map((dug, i) => {

    if (dug.id == "DUG042c") {
        dug.label = 'pelagoram'
    } else {
        dug.label = 'chewed leg'
    }
    
    return alphabetizeKeys(dug)
})

writeFileSync('./db/dugs.json', JSON.stringify(newDugs, false, 4))