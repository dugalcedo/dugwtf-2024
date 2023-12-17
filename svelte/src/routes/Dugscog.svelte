<script>
    import A from "../components/A.svelte"
    import { getDugs } from "../lib/api.js"
    import LoadingDots from "../components/LoadingDots.svelte"
    let dugs
    getDugs()
        .then(data => dugs = data)
</script>

{#if !dugs}
    <LoadingDots>Loading dugscography</LoadingDots>
{:else if typeof dugs === 'string'}
    Error: {dugs}
{:else}
    {#each dugs as dug}
        <A classList="dug-card" href="/music/{dug.idno}">
            <img src="{dug.cover.xs}" alt="{dug.cover.desc}">
            {dug.title}
        </A>
    {/each}
{/if}

