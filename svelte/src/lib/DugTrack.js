import memo from "./memo.js"
import { pad0, displayTime } from "./lib.js"
import { ROOT } from "./lib.js"

class DugTrack {
    static all = []
    constructor(dug, track, dugTrackId, i) {
        this.id = dugTrackId
        this.track = track
        this.dug = dug
        this.i = i

        this.audio = new Audio(ROOT + track.endpoint)

        this.timeTracker = null
        DugTrack.all.push(this)
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
        this.trackTime()
        this.onplay()
    }

    pause() {
        this.audio.pause()
        this.onpause()
    }

    trackTime() {
        this.timeTracker = setInterval(() => {
            this.ontimechange()
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
}

export default DugTrack