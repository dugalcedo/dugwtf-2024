<script>
    import { onclickout } from "../lib/lib.js"

    export let options
    export let onchange
    export let initial
    let value = initial

    let optionsShown

    function change(o) {
        value = o
        onchange(o)
        optionsShown = false
    }
</script>

<!-- <select on:change={onchange}>
    {#each options as option}
        <option value={option} selected={initial===option}>{option}</option>
    {/each}
</select> -->

<div class="select" role="listbox"
use:onclickout={()=>{
    optionsShown = false
}}
>
    <button class="head"
    on:click={()=>{optionsShown = !optionsShown}}
    >
        <div class="val">
            {value}
        </div>
        <div class="icon">
            v
        </div>
    </button>
    <div class="options" class:shown={optionsShown}>
        {#each options as o}
            <button on:click={()=>{change(o)}}>
                {o}
            </button>
        {/each}
    </div>
</div>