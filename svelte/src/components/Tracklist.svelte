<script>
    import { getTracklist, getTrack } from "../lib/api.js"
    import LoadingDots from "./LoadingDots.svelte"
    import Track from "./Track.svelte"
    export let dug

    let tracklist
    let tracklistNotFound
    getTracklistData()
    async function getTracklistData() {
        let data = await getTracklist(dug.id)
        if (typeof data === 'string') {
            tracklistNotFound = data
        } else {
            tracklist = data
        }
    }

</script>

<div class="dug_tracklist">
    {#if tracklistNotFound}
    Tracklist unavailable.
    {:else if !tracklist}
        <LoadingDots>Loading tracklist...</LoadingDots>
    {:else}
        {#each tracklist as trackTitle, i}
            <Track {trackTitle} {i} {dug}/>
        {/each}
    {/if}
</div>