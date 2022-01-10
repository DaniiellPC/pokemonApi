const pokemonApi = require('../api')
const express = require('express')
const router =  express.Router()


router.get('/', async (req, res) => {
    res.render('index')
})

router.post('/pokemonList', async (req, res, next) => {
    console.log(req.body)
    const cuerpo = req.body
    const limit = cuerpo.limite
    const offset = cuerpo.offset

    let texto
    try {
        texto = await pokemonApi.pokemonEncontrado(limit, offset)
    } catch (error) {
        console.log('Error')
    }
    res.status(200).json(texto)
    res.render('index', {pokemon: texto})
    next()
    return
})

router.post('/pokemonById', async (req, res, next) => {
    console.log(req.body)
    const cuerpo = req.body
    const id = cuerpo.id

    let texto
    try {
        texto = await pokemonApi.pokemonId(id)
    } catch (error) {
        console.log('Error')
    }
    res.status(200).json(texto)
    next()
    return
})

router.post('/evolutionById', async (req, res, next) => {
    console.log(req.body)
    const cuerpo = req.body
    const id = cuerpo.id

    let texto
    try {
        texto = await pokemonApi.evolutionId(id)
    } catch (error) {
        console.log('Error')
    }
    // console.log(texto)
    res.status(200).json(texto)
    next()
    return
})


module.exports = router