<script>
    import A from "../components/A.svelte";
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
        <A href="/music">&#9664; back</A>
        <a href={dug.cover.l} target="_blank" title="click to download hi-res">
            <img src={dug.cover.s} alt={dug.cover.desc}>
        </a>
        
        <Tracklist {dug} />

    </div>
{:else}
    <LoadingDots stillWaiting="Still waiting? Check the URL. Is that a valid dugscography idno?">Loading release with idno {idno}</LoadingDots>
{/if}