const express = require('express')
const app = express()
const path = require('path')
const puerto = 5000
const rutas = require('./routes')


app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(rutas)

app.set('views', path.join(__dirname, '../public/views'))
app.set('view engine', 'ejs')


app.listen(puerto, () => {
    console.log(`Server on port ${puerto}`)
})
