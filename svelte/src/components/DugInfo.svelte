<script>
    export let dug
</script>

<div class="info">
    <h2 class="title">{dug.title}</h2>
    <p class="artist">by {dug.artist}</p>
    <p class="duration">{dug.len.tracks.display}, {dug.len.duration.display}</p>
    <p class="released">released: {dug.released.display}</p>
    <p class="label">label: {dug.label}</p>
    <p class="recorded">recorded: {dug.recorded.display}</p>
    <div class="location">location{dug.location.arr.length > 1 ? "s":""}: {dug.location.short}</div>
    <table class="credits">
        <thead>
            <tr>
                <th colspan="2">credits</th>
            </tr>
        </thead>
        <tbody>
            {#each dug.credits as [role, person]}
                <tr>
                    <td>{role}</td>
                    <td>{person}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>