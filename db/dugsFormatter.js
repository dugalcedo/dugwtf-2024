import dugs from './dugs.js'
import { writeFileSync } from 'fs'

const findYears = str => {
    const years = str.matchAll(/\d{4}/gm)
    return [...new Set([...years].map(x => Number(x[0])))]
}

let newDugs = dugs.map(dug => {
    dug.recordedYears = findYears(dug.recorded)
    dug.releasedYears = findYears(dug.released)
    return dug
})

writeFileSync('./db/dugs.json', JSON.stringify(newDugs, false, 4))