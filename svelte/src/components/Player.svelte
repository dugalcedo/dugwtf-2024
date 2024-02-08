<script>
    import DugTrack from "../lib/DugTrack.js"

    let shown = false
    let current = null

    let timeTracker
    let time
    let p
    let hasPrev = true
    let hasNext = true

    let canplay = false

    let playing = false

    DugTrack.listenFor(current, 'dugcanplay', e => {
        canplay = true
    })

    DugTrack.listen('trackchange', e => {
        const dugTrack = e.target
        if (!dugTrack.loaded) canplay = false
        clearInterval(timeTracker)
        shown = true
        current = dugTrack
        playing = true
        setTimeTracker()
    })

    DugTrack.listen('play', () => {
        playing = true
    })

    DugTrack.listen('pause', () => {
        playing = false
    })

    function setTimeTracker() {
        timeTracker = setInterval(() => {
            time = current.formattedTime
            p = current.p
            if (current.playing) canplay = true
        }, 250)
    }

    function handleTrackerClick(tracker) {
        tracker.addEventListener('click', e => {
            let trackerRect = tracker.getBoundingClientRect()
            let trackerWidth = tracker.offsetWidth
            let {clientX} = e
            let trueX = clientX - trackerRect.left
            let factor = trueX/trackerWidth
            let s = factor*current.audio.duration
            console.log("s:", s)
            current.cur = Math.round(s)
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
                {#if canplay}
                <!-- INFO -->
                    <div class="title">
                        {#if current.dug.artist != 'Dug Alcedo'}
                            {current.dug.artist} -
                        {/if}
                        {current.title}
                        <em>({current.dug.title})</em>
                    </div>
                    <div class="time">
                        {time}
                    </div>
                {:else}
                    loading | please be patient
                {/if}
                <!-- TRACKER -->
                <div class="tracker" style="
                    width: {p||0}%;
                "></div>
            </div>
            <div class="spacer"></div>
            <button on:click={()=>{handleAdjBtn("Prev")}}
            disabled={!hasPrev} class="prev">
                {@html `&#x23EE;`}
            </button>
            <button on:click={handlePlayBtn} class="play">
                {@html playing ? `&#x23F8`:`&#x23F5;`}
            </button>
            <button on:click={()=>{handleAdjBtn("Next")}}
            disabled={!hasNext} class="next">
                {@html `&#x23ED;`}
            </button>
        </div>
    </div>
{/if}