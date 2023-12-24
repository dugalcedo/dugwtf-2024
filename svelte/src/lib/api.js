import memo from "./memo.js"
import DugTrack from './DugTrack.js'
import { ROOT } from './lib.js'

async function dugFetch(endpoint, options = {}) {
    const res = await fetch(ROOT+endpoint)
    // console.log(res)
    if (!res.ok) {
        const msg = await res.text()
        return msg
    }
    const data = await res.json()
    return data
}

async function dugMemo(key, asyncCallback) {
    if (!key) {
        console.error("missing key")
        return
    }
    let found
    memo.subscribe(current => found = current[key])
    if (!found) {
        let data = await asyncCallback()
        memo.update(current => {
            current[key] = data
            return current
        })
        return data
    } else {
        return found
    }
}


async function dugFetchMemo(endpoint, options = {}) {
    return dugMemo(`fetch:${endpoint}`, async () => dugFetch(endpoint, options))
}

async function getDugs(full = true) {
    return dugFetchMemo(`/dugscog${full?"?full=true":""}`, 'dugs')
}

async function getDug(idno) {
    const dugs = await getDugs()
    return dugs.find(dug => dug.idno === idno)
}

async function getDugTrack(dug, track, i) {
    const dugTrackId = `track:${dug.id}/${i}/${track.title}`
    return dugMemo(dugTrackId, async () => new DugTrack(dug, track, dugTrackId, i))
}

async function getAllDugTracksFromOneRelease(dug) {
    let tracks = []
    for (let i = 0; i < dug.tracklist.length; i++) {
        let track = await getDugTrack(dug, dug.tracklist[i], i)
        tracks.push(track)
    }
    return tracks
}

export {
    getDugs,
    getDug,
    dugMemo,
    dugFetchMemo,
    getDugTrack,
     getAllDugTracksFromOneRelease
}