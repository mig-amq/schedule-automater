import {
  Router
} from 'express'

const Home = Router()

Home.get('/', (req, res) => {
  res.render('index.hbs')
})

Home.delete('/', (req, res) => {
  res.render('index.hbs')
})

Home.put('/', (req, res) => {
  res.render('index.hbs')
})

Home.post('/', (req, res) => {
  res.render('index.hbs')
})

export default Home