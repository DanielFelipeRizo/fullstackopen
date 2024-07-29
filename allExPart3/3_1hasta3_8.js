const express = require('express')
const app = express()
var morgan = require('morgan')

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

//se usa para poder tomar el json del body por medio del request
app.use(express.json())

//app.use(morgan('tiny'))
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const cantPersons = persons.length
    const dateNow = new Date()
    response.send(`<p>Phonebook has info for ${cantPersons} people<br/> ${dateNow.toUTCString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxCurrentId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0

    const min = Math.ceil(maxCurrentId) + 1
    const max = 1000000

    let maxId;
    do {
        maxId = Math.floor(Math.random() * (max - min)) + min;
    } while (persons.find(p => p.id === maxId));

    return maxId;
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log('body', body);

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } else if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name already exist'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
