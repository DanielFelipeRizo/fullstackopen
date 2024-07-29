//ejercicio 3.12

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstackdfr:${password}@cluster0fullstackopen.m8ffyzf.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const nameConsole = process.argv[3]
const numberConsole = process.argv[4]

const person = new Person({
    name: nameConsole,
    number: numberConsole
})

if (process.argv.length < 4) {
    Person.find({}).then(result => {
        console.log('phonebook')
        result.forEach(p => {
            console.log(p.name, p.number)
        })
        mongoose.connection.close()
    })
} else {
    person.save().then(result => {
        console.log('person registered')
        //console.log(result);
        console.log(`added: ${result.name}, number: ${result.number} to phonebook`);
        mongoose.connection.close()
    })
}
