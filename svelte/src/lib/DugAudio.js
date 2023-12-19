import memo from "./memo.js"
import { dugMemo } from "./api.js"

const pad0 = n => n < 10 ? "0"+n : n

const displayTime = t => {
    let totalSeconds = t
    let totalMinutes = totalSeconds / 60
    let m = Math.floor(totalMinutes)
    let s = Math.round(totalSeconds%60)
    return `${pad0(m)}:${pad0(s)}`
}

class DugAudio {
    static all = []
    static queue = []

    constructor(endpoint, trackNo, trackTitle) {
        this.audio = new Audio(endpoint)
        this.i = trackNo
        this.title = trackTitle
        this.fetched = true
        DugAudio.all.push(this)

        this.onsignal = () => {}
    }


    play() {
        this.pauseOthers()
        this.audio.play()
        this.playing = true
        this.onsignal()
    }

    pause() {
        this.audio.pause()
        clearInterval(this.interval)
        this.playing = false
        this.onsignal()
    }

    rewind() {
        this.audio.currentTime = 0
    }

    addToQueue() {
        DugAudio.queue.push(this)
        this.printQueue()
    }

    printQueue() {
        if (DugAudio.queue.length < 1) return
        let print = `### Queue ###\n`
        DugAudio.queue.forEach((t, i) => {
            print += `${i+1}.  ${t.title}  (${t.dug.title})\n`
        })
        console.log(print)
    }

    pauseOthers() {
        DugAudio.all.forEach(aud => {
            // SHOULD PAUSE
            if (aud !== this) {
                aud.pause()
                aud.rewind()
            }
        })
    }
}

export default DugAudio