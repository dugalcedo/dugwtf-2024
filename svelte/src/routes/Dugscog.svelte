<script>
    import DugCard from "../components/DugCard.svelte"
    import { getDugs, dugFetchMemo, getDugTrack } from "../lib/api.js"
    import DugTrack from "../lib/DugTrack.js"
    import LoadingDots from "../components/LoadingDots.svelte"
    let dugYears
    getDugs()
        .then(data => {
            // add year to each dug
            data = data.map(d => ({
                ...d,
                year: new Date(d.released.date).getFullYear()
            }))
            // get set of years
            let years = [...new Set(data.map(d => d.year))]
            dugYears = []
            years.forEach(year => {
                if (year < 2012) return
                dugYears.push({
                    year,
                    dugs: data.filter(d => d.year === year)
                })
            })
            // console.log(dugYears)
        })

</script>

<button on:click={DugTrack.playDugsPicks} class="picks-btn">
    play dug's picks
</button>

<ul class="dugscog">
    {#if !dugYears}
        <LoadingDots>Loading dugscography</LoadingDots>
    {:else if typeof dugYears === 'string'}
        Error: {dugYears}
    {:else}
        {#each dugYears as {year, dugs}}
            <li class="dug-year">
                <h2>{year}</h2>
                <ul class="dug-year_dugs">
                    {#each dugs as dug}
                        <li>
                            <DugCard {dug} />
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    {/if}
</ul>

