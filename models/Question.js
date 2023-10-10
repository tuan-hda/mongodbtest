const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    noAnswers: {
      type: Number,
      required: true,
      default: 0,
    },
    userList: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const QuestionModel = mongoose.model('Question', QuestionSchema)

module.exports = QuestionModel
