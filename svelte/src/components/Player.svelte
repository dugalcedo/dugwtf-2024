<script>
    import { getDugTrack } from "../lib/api.js"
    import DugTrack from "../lib/DugTrack.js"

    let shown = false
    let current = null

    let timeTracker
    let time
    let p
    let hasPrev = true
    let hasNext = true

    let playing = false

    DugTrack.onTrackChange = function(dugTrack) {
        clearInterval(timeTracker)
        shown = true
        current = dugTrack
        playing = true
        setTimeTracker()
        // check if prev and next
        // console.log(DugTrack.getNext(), DugTrack.getPrev())
    }

    DugTrack.onplaypause = function(dugTrack) {
        playing = dugTrack.playing
    }

    function setTimeTracker() {
        timeTracker = setInterval(() => {
            shown = true
            time = current.formattedTime
            p = current.p
        }, 250)
    }

    function handleTrackerClick(tracker) {
        let trackerRect = tracker.getBoundingClientRect()
        let trackerWidth = tracker.offsetWidth
        tracker.addEventListener('click', e => {
            let {clientX} = e
            let trueX = clientX - trackerRect.left
            let factor = trueX/trackerWidth
            let s = factor*current.audio.duration
            current.audio.currentTime = s
        })
    }

    function handlePlayBtn() {
        if (current.playing) {
            current.pause()
            playing = false
            clearInterval(timeTracker)
        } else {
            current.play()
            setTimeTracker()
        }
    }

    function handleAdjBtn(nextOrPrev) {
        DugTrack.playAdjacent(nextOrPrev)
    }
</script>

{#if shown && current}
    <div id="player-container">
        <div id="player">
            <div class="info" use:handleTrackerClick>
                <div class="title">
                    {current.title}
                </div>
                <div class="time">
                    {time}
                </div>
                <div class="tracker" style="
                    width: {p}%;
                "></div>
            </div>
            <div class="spacer"></div>
            <button on:click={()=>{handleAdjBtn("Prev")}}
            disabled={!hasPrev}>
                {@html `&#x23EE;`}
            </button>
            <button on:click={handlePlayBtn}>
                {@html playing ? `&#x23F8`:`&#x23F5;`}
            </button>
            <button on:click={()=>{handleAdjBtn("Next")}}
            disabled={!hasNext}>
                {@html `&#x23ED;`}
            </button>
        </div>
    </div>
{/if}