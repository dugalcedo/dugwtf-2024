<script>
    export let href = "/"
    export let classList = ""
    export let id = ""

    function intercept(e) {
        e.preventDefault()
        history.pushState({},"",href)
        document.dispatchEvent(new CustomEvent("route"))
    }

    function addClasses(node) {
        if (!classList) return
        node.classList = classList
    }
</script>

<a href="{href}" id={id} on:click={intercept} use:addClasses><slot></slot></a>