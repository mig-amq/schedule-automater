import {
  Router
} from 'express'

const Schedule = Router()

Schedule.get('/', (req, res) => {
  res.render('index.hbs')
})

Schedule.delete('/', (req, res) => {
  res.render('index.hbs')
})

Schedule.put('/', (req, res) => {
  res.render('index.hbs')
})

Schedule.post('/', (req, res) => {
  res.render('index.hbs')
})

export default Schedule