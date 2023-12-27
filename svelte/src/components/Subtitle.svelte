<script>

const rrange = (lo, hi) => Math.random()*(hi-lo)+lo

const spanify = (str, opt = {}) => {
    return str
            .split('')
            .map(char => {
                const span = document.createElement('span')
                if (char === " ") char = '&nbsp;&nbsp;'
                if (opt.class) span.classList = opt.class
                span.innerHTML = char
                if (opt.cb) opt.cb(span)
                return span
            })
}

const renderGhost = (node, orig) => {
    const ghost = document.createElement('div')
    ghost.classList = 'ghost'
    ghost.append(...spanify(orig, {
        cb: span => {
            const int = 1000
            span.style.position = 'relative'
            span.style.transition = `all ${int}ms linear`
            setInterval(() => {
                span.style.left = rrange(-2, 2) + 'px'
                span.style.top = rrange(-2, 2) + 'px'
            }, int)
        }
    }))
    node.append(ghost)
}

const subtitle = node => {
    const content = document.createElement('div')
    content.classList = 'content'
    const orig = node.innerText
    node.innerText = ""
    content.append(...spanify(orig))
    renderGhost(node, orig)
    node.append(content)
}

</script>

<div use:subtitle id="subtitle">
    electronic mooseician and web developer
</div>