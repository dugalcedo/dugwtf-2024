<script>
    import contacts from "../lib/contact.js"
</script>

<table id="contact">
    {#each contacts as {
        title,
        value,
        copyable,
        links
    }}
        <tr class="contact">
            <td class="title">
                {title}
            </td>
            <td class="value">
                {#if links}
                    <a href="{links[0].href}" target="_blank">
                        {value}
                    </a>
                {:else}
                    {value}
                {/if}
            </td>
            <td>
                {#if copyable}
                    <button class="copy" style="grid-column-start: 4;">
                        📋
                    </button>
                {/if}
            </td>
        </tr>
    {/each}
</table>