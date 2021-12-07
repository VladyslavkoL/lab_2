const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
    response.render('pages/index', { title: 'Home' })
})
app.get('/passanger', function (request, response) {
  response.render('pages/passanger', { title: 'Passanger' })
})
app.get('/ticket', function (request, response) {
    response.render('pages/ticket', { title: 'Ticket' })
})
app.get('/train', function (request, response) {
    response.render('pages/train', { title: 'Train' })
})
app.get('/selled_tickets', function (request, response) {
    response.render('pages/selled_tickets', { title: 'Selled_Tickets' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 3000)