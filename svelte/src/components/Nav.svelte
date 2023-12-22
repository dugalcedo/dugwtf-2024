<script>
    import A from "./A.svelte"
    import router from "../lib/router.js"

    const themes = [
        'light',
        'dark'
    ]

    function changeTheme(e) {
        document.documentElement.classList = e.target.value
    }

</script>

<nav id="main-nav">
    {#each router as route}
        <A href={route.path}>{route.linkText}</A>
    {/each}
    <select on:change={changeTheme}>
        {#each themes as theme}
            <option value={theme}>{theme}</option>
        {/each}
    </select>
</nav>