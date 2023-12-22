<script>
    import A from "../components/A.svelte";
    import DugInfo from "../components/DugInfo.svelte";
    import LoadingDots from "../components/LoadingDots.svelte";
    import Tracklist from "../components/Tracklist.svelte";
    import { getDug } from "../lib/api.js"

    let idno = Number(location.pathname.slice(7))
    let dug

    getDugData()
    async function getDugData(){
        let data = await getDug(idno)
        dug = data
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
            <a href="{dug.bc.link}" target="_blank">
                <button class="buy">BUY / DOWNLOAD</button>
            </a>
            <DugInfo {dug} />
        </div>
        <div class="right">
            <Tracklist {dug} />
        </div>
        

    </div>
{:else}
    <LoadingDots stillWaiting="Still waiting? Check the URL. Is that a valid dugscography idno?">Loading release with idno {idno}</LoadingDots>
{/if}