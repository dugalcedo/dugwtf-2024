<script>
    import Track from "./Track.svelte"
    export let dug

    let tracklist = dug.tracklist

</script>

<div class="dug_tracklist">
    {#if tracklist.length}
        {#each tracklist as track, i}
            <Track {track} {i} {dug}/>
        {/each}
    {:else}
        a media player is unavailable for this release, but you can listen to it <a href="{dug.bc.link}" target="_blank">here</a>.
    {/if}
</div>