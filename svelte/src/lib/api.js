import memo from "./memo.js"
import DugAudio from "./DugAudio.js"

const DEV = true
const ROOT = DEV ? "http://localhost:4321/api" : "https://dug.wtf/api"

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


async function dugFetchMemo(endpoint, key, options = {}) {
    return dugMemo(key, async () => dugFetch(endpoint, options))
}



async function createDugAudio(endpoint, trackNo, trackTitle) {
    const audio = new DugAudio(endpoint, trackNo, trackTitle)
    return audio
}

async function dugAudioMemo(albumId, trackNo, trackTitle) {
    let endpoint = ROOT + `/audio/track?albumId=${albumId}&trackNo=${trackNo}`
    return dugMemo(endpoint, async () => createDugAudio(endpoint, trackNo, trackTitle))
}

async function getDugs(full = true) {
    return dugFetchMemo(`/dugscog${full?"?full=true":""}`, 'dugs')
}

async function getDug(idno) {
    const dugs = await getDugs()
    return dugs.find(dug => dug.idno === idno)
}

async function getTrack(albumId, trackIndex, trackTitle) {
    return dugAudioMemo(albumId, trackIndex+1, trackTitle)
}

async function getTracklist(albumId) {
    // console.log("Fetching tracklist")
    return dugFetchMemo(`/audio/tracklist?albumId=${albumId}`, albumId)
}

export {
    getDugs,
    getDug,
    getTrack,
    getTracklist
}