const pokemonContainer = document.querySelector('.poke-container')
const row = document.querySelector('.row')
const atras = document.querySelector('#atras')
const siguiente = document.querySelector('#siguiente')
const spinner = document.querySelector('#spinner')

let limit = 11
let offset = 1

atras.addEventListener('click', () => {
    if (offset !== 1) {
        offset -= 11
        eliminarNodos(row)
        getData(offset, limit)
    }
})

siguiente.addEventListener('click', () => {
    offset += 11
    eliminarNodos(row)
    getData(offset, limit)
})

async function getData(offset, limite) {
    const location = window.location.hostname
    const port = window.location.port
    let data

    const myHeaders = {
        "Content-Type": "application/json"
    }

    // const dataAlmacenada = localStorage.getItem('dataAlmacenada')

    // if (dataAlmacenada) {
    //     data = dataAlmacenada
    //     data.forEach(element => {
    //         createPokemon(element)
    //     })
    //     spinner.style.display = 'none'
    //     return data
    // } 

    const raw = JSON.stringify({
        limite,
        offset
    })

    const settings = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }

    try {
        const fetchResponse = await fetch(`https://${location}/pokemonList`, settings)
        data = await fetchResponse.json()
    } catch (e) {
        return e
    }

    data.forEach(element => {
        createPokemon(element)
    })
    spinner.style.display = 'none'
    console.log(data)
    localStorage.setItem('dataAlmacenada', JSON.stringify(data))
    return data
}

async function createPokemon(pokemon) {
    console.log(pokemon)

    const columna = document.createElement('div')
    columna.classList.add('col-sm-3')

    const card = document.createElement('div')
    card.classList.add('card')


    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    card.appendChild(cardBody)
    columna.appendChild(card)

    const imagen = document.createElement('img')
    imagen.src = pokemon.sprite
    imagen.classList.add('img-thumbnail')
    imagen.setAttribute('value', `${pokemon.nombre}`)
    imagen.setAttribute('onclick', 'test()')

    const nombre = document.createElement('h5')
    nombre.setAttribute('id', 'pokemonName')
    nombre.classList.add('card-title')
    nombre.textContent = pokemon.nombre

    const lista = document.createElement('ul')
    lista.classList.add('list-group', 'list-group-flush')

    let habilidades
    if (pokemon.habilidades.length === 1) {
        habilidades = document.createElement('li')
        habilidades.classList.add('list-group-item')
        habilidades.textContent = `Habilidad: ${pokemon.habilidades[0]}`
    } else {
        let habilidad3
        !pokemon.habilidades[2] ? habilidad3 = '' : habilidad3 = pokemon.habilidades[2]
        habilidades = document.createElement('li')
        habilidades.classList.add('list-group-item')
        habilidades.textContent = `Habilidades: ${pokemon.habilidades[0]} / ${pokemon.habilidades[1]} / ${habilidad3}`
    }

    let tipo
    if (pokemon.tipo.length === 1) {
        tipo = document.createElement('li')
        tipo.classList.add('list-group-item')
        tipo.textContent = `Tipo: ${pokemon.tipo[0]}`
    } else {
        tipo = document.createElement('li')
        tipo.classList.add('list-group-item')
        tipo.textContent = `Tipos: ${pokemon.tipo[0]} / ${pokemon.tipo[1]} /`
    }

    const peso = document.createElement('li')
    peso.classList.add('list-group-item')
    peso.textContent = `Peso: ${pokemon.peso}`

    lista.appendChild(habilidades)
    lista.appendChild(tipo)
    lista.appendChild(peso)


    cardBody.appendChild(imagen)
    cardBody.appendChild(nombre)
    cardBody.appendChild(lista)

    row.appendChild(columna)

    pokemonContainer.appendChild(row)

}

function getName(parent) {
    while(parent.firstChild) {
        const data = document.querySelector('#pokemonName')
        console.log('data: ', data)
    }
}

function eliminarNodos(parent) {
    spinner.style.display = 'block'
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}


getData(offset, limit)