<script>
    import A from "../components/A.svelte";
    import DugInfo from "../components/DugInfo.svelte";
    import LoadingDots from "../components/LoadingDots.svelte";
    import Tracklist from "../components/Tracklist.svelte";
    import { getDug, getAllDugTracksFromOneRelease } from "../lib/api.js"
    import DugTrack from "../lib/DugTrack.js"

    let idno = Number(location.pathname.slice(7))
    let dug

    getDugData()
    async function getDugData(){
        let data = await getDug(idno)
        dug = data
    }

    async function handlePlayAll() {
        let tracks = await getAllDugTracksFromOneRelease(dug)
        tracks[0].play()
        DugTrack.queue.push(...tracks)
        // DugTrack.logQueue()
    }

</script>


{#if dug}
    <div class="dug">
        <div class="left">
            <nav>
                {#if dug.prev !== undefined}
                    <A href="/music/{dug.prev}">&#9664; prev</A>
                {/if}
                <A href="/music">all</A>
                {#if dug.next !== undefined}
                    <A href="/music/{dug.next}">next &#9654;</A>
                {/if}
            </nav>
            <a href={dug.cover.l} target="_blank" title="click to download hi-res">
                <img src={dug.cover.s} alt={dug.cover.desc} class="cover">
            </a>

            <!-- BUTTONS -->
            <div class="buttons"
            style="grid-template-columns: repeat({dug.tracklist.length ? 2 : 1} ,1fr)"
            >
                {#if dug.tracklist.length}
                <button class="play" on:click={handlePlayAll}>PLAY ALL</button>
                {/if}
                <a href="{dug.bc.link}" target="_blank">
                    <button class="buy">BUY / DOWNLOAD</button>
                </a>
            </div>

            <DugInfo {dug} />
        </div>
        <div class="right">
            <Tracklist {dug} />
        </div>
        

    </div>
{:else}
    <LoadingDots stillWaiting="Still waiting? Check the URL. Is that a valid dugscography idno?">Loading release with idno {idno}</LoadingDots>
{/if}