function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    console.log("I'm statessss")
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
        return res.json()
    })

        //armazena valor de states em state e segue o código (states é res.json, poderia ser qualquer outro nome)
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
    console.log(`selectedIndex:${indexOfSelectedState}`)
    stateInput.value = event.target.options[indexOfSelectedState].text
// O código acima foi feito para setar dentro de um input escondido no html com a prop name=state
// o nome do estado selecionado

    const ufValue = event.target.value
    console.log(`ufValue:${ufValue}`)
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    console.log("I'm cities")
    fetch (url)
    .then((res) => {
        return res.json()
    })
    .then((cities) => {
             //armazena valor de cities em city e segue o código (cities é res.json)
        for(const city of cities){
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
    // passa o número do estado

//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []




function handleSelectedItem(event){
    itemLi = event.target

    itemLi.classList.toggle("selected")

    //dataset só funciona pq no html ele tem a prop data-id
    const itemId = itemLi.dataset.id //vai de 1 a  6
    
    //verifica se itemId está no arry
    if(selectedItems.includes(itemId)){//se sim, retira itemId do array
        const index = selectedItems.indexOf(itemId)
        selectedItems.splice(index,1);
    }else{//se não, acrescenta itemId ao array
        selectedItems.push(itemId)
    }
    console.log(selectedItems);
    collectedItems.value = selectedItems //atualiza input escondido

}