<script>
    import A from "./A.svelte"
    import router from "../lib/router.js"
</script>

<nav>
    {#each router as route}
        <A href={route.path}>{route.linkText}</A>
    {/each}
</nav>