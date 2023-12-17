const exampleDugPre = document.querySelector("#example-dug")

fetch('/api/dugscog')
    .then(res=>res.json())
    .then(([dug])=>{
        exampleDugPre.innerText = JSON.stringify(dug, false, 4)
    })