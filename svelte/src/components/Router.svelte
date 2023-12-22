<script>
    import router from "../lib/router.js"
    import NotFound from "../routes/NotFound.svelte"
    import Dug from "../routes/Dug.svelte"

    let component
    findRoute()

    function findRoute() {
        component = router.find(r => r.path === location.pathname)?.component
        if (!component) {
            if (location.pathname.startsWith('/music')) {
                component = null
                setTimeout(() => {
                    component = Dug
                }, 100)
            } else {
                component = NotFound
            }
        }
    }

    document.addEventListener('route', findRoute)
    window.addEventListener('popstate', findRoute)
</script>

{#if component}
    <svelte:component this={component} />
{/if}