const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
require('dotenv').config()
const Person = require('./models/person')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('person', (request) => {
  return JSON.stringify(request.body)
})


app.use(morgan(':method :url :response-time :person'))
app.get('/api/persons/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const time = new Date()
  const inp = time.toTimeString()
  const len = Person.find({}).then(all => {
    let t = Object.keys(all).length
    response.send(`<p>Phonebook currently has ${t} people. 
    Time: ${inp}</p>`)} )

})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result =>
  {
    response.status(204).send('Success')
  })
    .catch(error => {
      next(error)
    })

})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  else {
    const newPerson = new Person({

      name: body.name,
      number: body.number
    })

    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
      .catch(error => next(error))

  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name,  number }, { new:true, runValidators: true, context:'query' })
    .then(update => {
      console.log(request.params.id)
      response.json(update)
    })
    .catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error : error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})