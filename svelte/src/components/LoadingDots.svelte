<script>
    export let stillWaiting = "Still waiting? Something might be wrong. Report to Dug at dougalcedo@gmail.com."
    let noDots = 0
    let dots
    let long

    renderDots()
    function renderDots() {
        let s = ""
        for (let i = 0; i < noDots; i++) {
            s += "."
        }
        dots = s
    }

    setInterval(() => {
        if (noDots < 3) {
            noDots++
        } else {
            noDots = 0
        }
        renderDots()
    }, 125)

    setTimeout(() => {
        long = true
    }, 5000)
</script>

<slot></slot>{dots}{#if long}<br>{stillWaiting}{/if}