<script>
    import A from "./A.svelte"
    export let dug
</script>

<A classList="dug-card" href="/music/{dug.idno}">
    <div class="cover"><img src="{dug.cover.xs}" alt="{dug.cover.desc}"></div>
    <div class="title">{dug.title}</div>
</A>