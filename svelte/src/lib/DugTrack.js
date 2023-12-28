import memo from "./memo.js"
import { pad0, displayTime } from "./lib.js"
import { ROOT } from "./lib.js"
import { getAllDugTracksFromOneRelease } from "./api.js"
import { dugFetchMemo, getDugTrack } from "./api.js"

class DugTrack {
    
    //////////////////////////////////////////////////////////////////
    ////////////////////////CONSTRUCTOR///////////////////////////////
    //////////////////////////////////////////////////////////////////
    constructor(dug, track, dugTrackId, i) {
        this.id = dugTrackId
        this.track = track
        this.dug = dug
        this.i = i

        this.audio = new Audio(ROOT + track.endpoint)
        this.audio.oncanplay = () => {
            this.loaded = true
            this.dispatch('dugcanplay')
        }

        this.timeTracker = null
        
        DugTrack.all.push(this)
    }

    //////////////////////////////////////////////////////////////////
    ////////////////////////STATIC PROPERTIES/////////////////////////
    //////////////////////////////////////////////////////////////////
    static all = []
    static nowPlaying = null
    static queue = []
    static queuePosition = 0

    //////////////////////////////////////////////////////////////////
    ////////////////////////STATIC METHODS////////////////////////////
    //////////////////////////////////////////////////////////////////
    static getNext = () => DugTrack.queue[DugTrack.queuePosition+1]
    static getPrev = () => DugTrack.queue[DugTrack.queuePosition-1]

    static listen = (eventName, cb) => {
        document.addEventListener(eventName, e => {
            cb(e.detail)
        })
    }
    static listenFor = (dugTrack, eventName, cb) => {
        if (DugTrack.nowPlaying !== dugTrack) return
        DugTrack.listen(eventName, cb)
    }
    static dispatch = (eventName) => {
        document.dispatchEvent(new CustomEvent(eventName))
    }

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

    static queueAlbum = async function(dug, i=0) {
        DugTrack.queue = []
        let tracks = await getAllDugTracksFromOneRelease(dug)
        DugTrack.queuePosition = i
        DugTrack.queue.push(...tracks)
        DugTrack.queue[DugTrack.queuePosition].play()
        DugTrack.dispatch('queue')
    }

    static logQueue = function(){
        console.log(`\n###### Queue`)
        DugTrack.queue.forEach(t => {
            console.log(`* ${t.dug.artist} - ${t.track.title} - ${t.dug.title}`)
        })
        console.log("#####\n")
    }

    static addToQueue = function(track) {
        DugTrack.queue.push(track)
        DugTrack.dispatch('queue')
    }

    static playDugsPicks = async function() {
        let picks = await dugFetchMemo('/audio/picks') 
        picks = await Promise.all(picks.map(async (t,i) => await getDugTrack(
            {
                id:t.dugId,
                artist: t.artist,
                title: t.album
            },t,t.i
            )))
        DugTrack.queuePosition = 0
        DugTrack.queue = picks
        DugTrack.queue[0].play()
        // console.log(picks)
    }

    //////////////////////////////////////////////////////////////////
    //////////////////////GETTERS AND SETTERS/////////////////////////
    //////////////////////////////////////////////////////////////////
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

    set cur(n) {
        this.audio.currentTime = n
    }

    //////////////////////////////////////////////////////////////////
    /////////////////////INSTANCE METHODS/////////////////////////////
    //////////////////////////////////////////////////////////////////

    dispatch(eventName, details = {}) {
        document.dispatchEvent(new CustomEvent(
            eventName,
            {detail: {
                ...details,
                target: this
            }}
        ))
    }

    listen(eName, cb) {
        document.addEventListener(eName, e => {
            if (this !== e.detail.target) return
            cb(e.detail)
        })
    }

    play() {
        this.pauseAllOthers()
        this.audio.play()
        DugTrack.nowPlaying = this
        this.trackTime()
        this.dispatch('play')
        this.dispatch('trackchange')
        DugTrack.dispatch('queue')
    }

    pause() {
        this.audio.pause()
        this.dispatch('pause')
        DugTrack.dispatch('queue')
    }

    stop() {
        this.audio.pause()
        this.audio.currentTime = 0
        this.dispatch('timechange')
        clearInterval(this.timeTracker)
    }

    trackTime() {
        this.timeTracker = setInterval(() => {
            if (this.audio.currentTime >= this.audio.duration) {
                clearInterval(this.timeTracker)
                DugTrack.playAdjacent("Next")
            } else {
                this.dispatch('timechange')
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