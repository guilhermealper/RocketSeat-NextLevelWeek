function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    console.log("I'm statessss")
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
        return res.json()
    })

        //armazena valor de states em state e segue o código (states é res.json)
    .then((states) => {
        for(const state of states){
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
           }
    })
}

populateUFs()

function getCities(event){
    // Busca no .html o item indicado, no caso o select que tem a prop name=city
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
// O código acima foi feito para setar dentro de um input escondido no html com a prop name=state
// o nome do estado selecionado

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    console.log("I'm cities")
    fetch (url)
    .then((res) => {
        return res.json()
    })
    .then((cities) => {
        //armazena valor de cities em city e segue o código (cities é res.json)
        for(const city of cities){
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.id}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)