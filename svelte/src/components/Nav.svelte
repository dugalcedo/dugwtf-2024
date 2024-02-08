<script>
    import A from "./A.svelte"
    import router from "../lib/router.js"
    import Select from "./Select.svelte";

    const themes = [
        'dark',
        'light'
    ]

    localStorage.setItem('dugwtf-theme', 'dark')
    const initialTheme = localStorage.getItem('dugwtf-theme') || 'dark'

    function changeTheme(o) {
        document.documentElement.classList = o
        localStorage.setItem('dugwtf-theme', o)
    }

    let vw = 0

</script>

<svelte:window bind:innerWidth={vw} />

<nav id="main-nav">


        {#each router as route}
            {#if route.linkText}
                <A href={route.path}>{route.linkText}</A>
            {/if}
        {/each}
        <!-- <Select options={themes} initial={initialTheme} onchange={changeTheme} /> -->


</nav>