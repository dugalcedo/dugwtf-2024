<script>
    import { getTrack } from "../lib/api.js"

    export let dug
    const albumId = dug.id
    export let i
    export let trackTitle

    let trackLoading
    let track = {
        fetched: false,
        playing: false
    }

    let duration = "--:-- / --:--"

    async function readyTrack() {
        if (track.fetched) return

        // LOAD TRACK for FIRST TIME
        trackLoading = true
        track = await getTrack(albumId, i, trackTitle)
        track.dug = dug
        track.onsignal = () => {
            track = track
        }
        trackLoading = false
        ///////////////////////////////
        
    }

    async function handlePlayBtn() {
        await readyTrack()
        // if already playing, PAUSE
        if (track.playing) {
            track.pause()
        } else { // PLAY
            track.play()
        }
    }

    async function handleQueueBtn() {
        await readyTrack()
        track.addToQueue()
    }

</script>

<div class="dug_track">
    <div>{i+1}</div>
    <div>{trackTitle}</div>
    <div>
        {duration}
    </div>
    <button on:click={handlePlayBtn}>
        {#if trackLoading}
            ...
        {:else}
             {@html track?.playing ? `⏸` : `&#9658;`}
        {/if}
    </button>
    <button on:click={handleQueueBtn}>
        +
    </button>
</div>