<script>
    import DugTrack from "../lib/DugTrack.js"

    let queue = DugTrack.queue
    let hidden = false

    DugTrack.onqueue = q => {
        queue = q
    }

    function clearQueue() {
        DugTrack.queue = []
        DugTrack.nowPlaying.pause()
    }

    function play(track) {
        track.play()
        queue = DugTrack.queue
    }
</script>

{#if queue.length}
<div id="queue" class:hidden={hidden}>
    <h3>QUEUE</h3>
    {#each queue as track}
        <button class:active={track.playing} class="track"
        on:click={()=>{play(track)}}>
            {#if track.playing}-->{/if}
            {track.title}
        </button>
    {/each}
    <div class="controls">
        <button on:click={clearQueue}>
            🞮
        </button>
        <button on:click={()=>{hidden = !hidden}}>
            {hidden ? "🠋" : "🠉"}
        </button>
    </div>
</div>
{/if}