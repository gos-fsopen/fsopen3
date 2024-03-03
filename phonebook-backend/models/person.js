const { default: mongoose } = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI
mongoose.connect(url).then(e => {
  console.log('connection established')
}).catch(e => {
  console.log('error', e.message)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v){
        return /^(?:\d{2}-\d{5,}|\d{3}-\d{4,})$/.test(v)
      },
      message: 'Provided number is invalid'
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform : (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)