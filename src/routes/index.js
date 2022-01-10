const pokemonApi = require('../api')
const express = require('express')
const router =  express.Router()

// let limit = 8
// let offset = 1

router.get('/', async (req, res) => {
    // let limit = 19
    // let offset = 1
    // let texto
    // try {
    //     texto = await pokemonApi.pokemonEncontrado(limit, offset)
    // } catch (error) {
    //     console.log('Error')
    // }

    res.render('index')
})

// router.get('/', async (req, res) => {
//     res.render('pokemonList')
// })

router.get('/pokemonList', async (req, res) => {
    let limit = 39
    let offset = 21
    // const newOffset = pokemonApi.guardarLimite(limit, offset)
    let texto
    try {
        texto = await pokemonApi.pokemonEncontrado(limit, offset)
    } catch (error) {
        console.log('Error')
    }
    res.render('pokemonList', {pokemon: texto})
})

router.post('/pokemon', async (req, res, next) => {
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
    // console.log(texto)
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
    // console.log(texto)
    res.status(200).json(texto)
    res.render('index', {pokemon: texto})
    next()
    return
})


module.exports = router