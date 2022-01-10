const axios = require('axios').default
const NodeCache = require('node-cache')
const myCache = new NodeCache()

const getPokemon = async (id) => {
    const api = `https://pokeapi.co/api/v2/pokemon/${id}`
    let pokemon = {}
    let response
    try {
        response = await axios.get(api)
    } catch (err) {
        console.error('Error: ', err.statusMessage);
    }
    if (!response || response.status !== 200) return console.log('Datos de pokemon no encontrados')
    // console.log(response.data)
    pokemon = response.data
    return pokemon
}

const getEvolution = async (id) => {
    const api = `https://pokeapi.co/api/v2/evolution-chain/${id}`
    let pokemon = {}
    let response
    try {
        response = await axios.get(api)
    } catch (err) {
        console.error('Error: ', err.statusMessage);
    }
    if (!response || response.status !== 200) return console.log('Datos de pokemon no encontrados')
    // console.log(response.data)
    pokemon = response.data
    return pokemon
}

const pokemonEncontrado = async (limit, offset) => {
    let response
    let pokemon = []
    let habilidades = []
    let tipos = []
    for (let i = offset; i <= limit + offset; i++) {
        try {
            response = await getPokemon(i)
        } catch (error) {
            console.log(error)
        }

        let newHabilidades = []
        let newTipos = []
        habilidades = response.abilities
        tipos = response.types
        for (const habilidad of habilidades) {
            newHabilidades.push(habilidad.ability.name)
        }
        for (const tipo of tipos) {
            newTipos.push(tipo.type.name)
        }
        pokemon = [...pokemon, {
            habilidades: [...newHabilidades],
            nombre: response.name,
            peso: response.weight,
            sprite: response.sprites.front_default,
            tipo: [...newTipos]
        }]
    }
    console.log(pokemon)
    return pokemon
}

const pokemonId = async (id) => {
    let responsePokemon
    let pokemon = []
    let habilidades = []
    let tipos = []
    try {
        responsePokemon = await getPokemon(id)
    } catch (error) {
        console.log(error)
    }

    let newHabilidades = []
    let newTipos = []
    habilidades = responsePokemon.abilities
    tipos = responsePokemon.types
    for (const habilidad of habilidades) {
        newHabilidades.push(habilidad.ability.name)
    }
    for (const tipo of tipos) {
        newTipos.push(tipo.type.name)
    }
    pokemon = [...pokemon, {
        habilidades: [...newHabilidades],
        nombre: responsePokemon.name,
        peso: responsePokemon.weight,
        sprite: responsePokemon.sprites.front_default,
        tipo: [...newTipos]
    }]

    console.log(pokemon)
    return pokemon
}

const evolutionId = async (id) => {
    let responseEvolution
    let responsePokemon
    let pokemon = []
    let habilidades = []
    let tipos = []


    try {
        responseEvolution = await getEvolution(id)
    } catch (error) {
        console.log(error)
    }
    let evoluciones = []
    const arrayEvoluciones = responseEvolution.chain.evolves_to

    for (let value of Object.values(arrayEvoluciones)) {
        evoluciones.push(value.species.name)
        evoluciones.push(value.evolves_to[0].species.name)
    }
    console.log(evoluciones)

    const nombre = responseEvolution.chain.species.name

    try {
        responsePokemon = await getPokemon(nombre)
    } catch (error) {
        console.log(error)
    }

    let newHabilidades = []
    let newTipos = []
    habilidades = responsePokemon.abilities
    tipos = responsePokemon.types
    for (const habilidad of habilidades) {
        newHabilidades.push(habilidad.ability.name)
    }
    for (const tipo of tipos) {
        newTipos.push(tipo.type.name)
    }
    pokemon = [...pokemon, {
        evoluciones: evoluciones,
        habilidades: [...newHabilidades],
        nombre: responsePokemon.name,
        peso: responsePokemon.weight,
        sprite: responsePokemon.sprites.front_default,
        tipo: [...newTipos]
    }]

    console.log(pokemon)
    return pokemon
}

module.exports.pokemonEncontrado = pokemonEncontrado
module.exports.pokemonId = pokemonId
module.exports.evolutionId = evolutionId
