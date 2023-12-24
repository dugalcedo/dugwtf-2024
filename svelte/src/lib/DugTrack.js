import memo from "./memo.js"
import { pad0, displayTime } from "./lib.js"
import { ROOT } from "./lib.js"
import { getAllDugTracksFromOneRelease } from "./api.js"

class DugTrack {
    static all = []
    static nowPlaying = null
    static onTrackChange = function(){}
    static queue = []
    static queuePosition = 0
    static onAdd = function(){}
    static getNext = () => DugTrack.queue[DugTrack.queuePosition+1]
    static getPrev = () => DugTrack.queue[DugTrack.queuePosition-1]
    static onplaypause = () => {}

    static playAdjacent = function(nextOrPrev){
        DugTrack.nowPlaying.stop()
        let adj = DugTrack[`get${nextOrPrev}`]()
        if (!adj) {
            DugTrack.queuePosition = 0
        } else {
            DugTrack.queuePosition += (nextOrPrev==="Next"?1:-1)
            adj.play()
        }
    }

    static queueAlbum = async function(dug) {
        DugTrack.queue.splice(0)
        let tracks = await getAllDugTracksFromOneRelease(dug)
        DugTrack.queuePosition = DugTrack.queue.length
        DugTrack.queue.push(...tracks)
        DugTrack.queue[DugTrack.queuePosition].play()
        // DugTrack.logQueue()
    }

    static logQueue = function(){
        console.log(`\n###### Queue`)
        DugTrack.queue.forEach(t => {
            console.log(`* ${t.dug.artist} - ${t.track.title} - ${t.dug.title}`)
        })
        console.log("#####\n")
    }

    constructor(dug, track, dugTrackId, i) {
        this.id = dugTrackId
        this.track = track
        this.dug = dug
        this.i = i

        this.audio = new Audio(ROOT + track.endpoint)

        this.timeTracker = null
        
        DugTrack.all.push(this)

        this.addEventListener = function(eventName, callback) {
            this[`on${eventName}`] = function(arg) {
                this[`on${eventName}`](arg)
                callback(arg)
            }
        }
    }

    get title() {
        return this.track.title
    }

    get cur() {
        return this.audio?.currentTime || 0
    }

    get dur() {
        return this.track.duration_s
    }

    get display() {
        return `${this.i+1} - ${this.title}`
    }

    get endpoint() {
        return ROOT + this.track.endpoint
    }

    get formattedTime() {
        let cur = displayTime(this.cur)
        let dur = displayTime(this.dur)
        return `${cur} / ${dur}`
    }

    get playing() {
        return !this.audio.paused && (this.audio.duration > 0)
    }

    get p() {
        return this.audio.currentTime/this.audio.duration*100
    }

    set events(e) {
        Object.entries(e).forEach(([k,v]) => {
            this[k] = v
        })
    }

    set cur(n) {
        this.audio.currentTime = n
    }

    unsetEvent(name) {console.warn(`Event "${name}" not set.`, this)}

    play() {
        this.pauseAllOthers()
        this.audio.play()
        DugTrack.nowPlaying = this
        this.trackTime()
        this.onplay()
        DugTrack.onTrackChange(this)
        DugTrack.onplaypause(this)
    }

    pause() {
        this.audio.pause()
        this.onpause()
        DugTrack.onplaypause(this)
    }

    stop() {
        this.audio.pause()
        this.audio.currentTime = 0
        this.ontimechange()
        clearInterval(this.timeTracker)
        DugTrack.onplaypause(this)
    }

    trackTime() {
        this.timeTracker = setInterval(() => {
            if (this.audio.currentTime >= this.audio.duration) {
                clearInterval(this.timeTracker)
                DugTrack.playAdjacent("Next")
            } else {
                this.ontimechange()
            }
        }, 250)
    }

    stopTrackingTime() {
        clearInterval(this.timeTracker)
    }

    pauseAllOthers() {
        DugTrack.all.forEach(dugTrack => {
            if (dugTrack === this) return
            dugTrack.cur = 0
            dugTrack.pause()
        })
    }

    addToQueue() {
        DugTrack.queue.push(this)
    }
}

export default DugTrack