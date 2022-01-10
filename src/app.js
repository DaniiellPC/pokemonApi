const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const rutas = require('./routes')

const puerto = process.env.PORT

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(rutas)

app.set('port', puerto || 5000)
app.set('views', path.join(__dirname, '../public/views'))
app.set('view engine', 'ejs')


app.listen(app.get('port'), () => {
    console.log(`Server on port:`, app.get('port'))
})
