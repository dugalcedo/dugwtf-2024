import dugs from './dugs.js'
import { writeFileSync } from 'fs'

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


const locMap = {
    GOL: "golden, colorado",
    SHM: "täby, sweden",
    LAK: "lakewood, colorado",
    CAT: "cathedral city, california",
    BGO: 'borrego spings, california',
    SDG: 'san diego, california',
    ASH: 'asheville, north carolina',
    WFN: 'woodfin, north carolina',
    TEM: 'temecula, california',
    MUR: 'murrieta, california',
    CDY: 'cody, wyoming'
}

const newDugs = dugs.map(dug => {
    
    delete dug.era

    return alphabetizeKeys(dug)
})

writeFileSync('./db/dugs.json', JSON.stringify(newDugs, false, 4))