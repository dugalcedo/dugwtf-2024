<script>
    import { getDugTrack } from "../lib/api.js"

    export let track
    export let i
    export let dug

    let loaded
    let dugTrack

    let time = `00:00 / --:--`
    let p = 0
    let playing = false

    init()

    async function init() {
        const events = {
            ontimechange: () => {
                time = dugTrack.formattedTime
                p = dugTrack.p
            },
            onplay: () => {
                playing = true
            },
            onpause: () => {
                playing = false
            }
        }
        dugTrack = await getDugTrack(dug, track, i)
        dugTrack.events = events
        if (dugTrack.playing) {
            playing = true
            dugTrack.trackTime()
        }
        loaded = true
        time = dugTrack.formattedTime
    }

    async function handlePlayBtn() {
        if (playing) {
            dugTrack.pause()
        } else {
            dugTrack.play()
        }
    }

    async function handleQueueBtn() {

    }

</script>

{#if loaded}
    <div class="dug_track" class:active={playing}>
        <button on:click={handlePlayBtn} class="play">
            {@html playing ? `&#x23F8;` : `&#x23F5;`}
        </button>
        <button on:click={handleQueueBtn} class="queue">
            +
        </button>
        <div class="no">{i+1}</div>
        <div class="title">{dugTrack.title}</div>
        <div class="time">
            {time}
        </div>

        <div class="tracker" style="
            width: {p}%;
        "></div>
    </div>
{/if}