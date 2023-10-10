const express = require('express')
const mongoose = require('mongoose')
const QuestionModel = require('./models/Question')
require('dotenv').config()
const app = express()

mongoose.connect(`mongodb://127.0.0.1:27017/mongodbtest?retryWrites=true&w=majority`)

app.post('/', async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(require('./questions.json')))

    const listAsync = []
    data.forEach((item) => {
      const question = new QuestionModel(item)
      listAsync.push(question.save())
    })

    await Promise.all(listAsync)
    res.status(201).json({
      data: 'Success',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
})

app.get('/', async (req, res) => {
  try {
    const data = await QuestionModel.find()
    res.status(200).json({
      data: data,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Internal server error' })
  }
})

const connection = mongoose.connection
connection.once('open', () => {
  console.log(new Date(), 'database established successfully')
})

app.listen(3000, () => {
  console.log(new Date(), 'listening on port 3000')
})
