<script>
    import MoreNav from "./MoreNav.svelte"
    import map from "../../lib/map.js"
    function mapTable(node) {
        const cells = node.querySelectorAll(':scope td')
        cells.forEach(cell => {
            if (cell.innerText.includes('[')) {
                cell.style.opacity = 0.33
                cell.style.fontStyle = 'italic'
            }
        })
    }
    function sortable(th) {

    }
</script>
<MoreNav />

<div class="more map">
    <p style="text-align: justify;">
        in 2021, i made a fictional map of the united states, where i divided it into 100 states of <em>roughly</em> equal population, based on 2019 census estimates. it was popular on reddit and was featured on the youtube channel "Mr. Beat". <a href="https://dug.wtf/map" target="_blank">see it here.</a>
    </p>
    <table id="map-table" use:mapTable>
        <thead>
            <tr>
                <th colspan="100">
                    <h3>states</h3>
                </th>
            </tr>
            <tr>
                <th>name</th>
                <th>biggest metro</th>
                <th>biggest city</th>
                <th>2nd metro</th>
                <th>2nd city</th>
                <th>original states</th>
            </tr>
        </thead>
        <tbody>
            {#each map as state}
                <tr>
                    <td style="font-weight: 900;">{state.name.toUpperCase()}</td>
                    <td>{state.metro1}</td>
                    <td>{state.city1 || state.metro1}</td>
                    <td>{state.metro2}</td>
                    <td>{state.city2 || state.metro2}</td>
                    <td>
                        {state.states.join(', ')}
                    </td>
                </tr>
            {/each}
            <tr>
                <td colspan="100">
                    more to come...
                </td>
            </tr>
        </tbody>
    </table>
</div>