import * as dotenv from "dotenv"

dotenv.config()

import express, { Request, Response } from 'express'
import * as bodyParser from "body-parser"
import expressLayouts from 'express-ejs-layouts'
import { format } from 'date-fns'
import db from './config/mongoDb'

db.once('open', () => console.log('Connection established'))

import movieCollection from './model/movieCollection'
import cast from './model/cast'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Static files
app.use(express.static('src/public'))
app.use('/css', express.static(__dirname + 'public/css'))

// Template engine
app.use(expressLayouts)
app.set('views', './src/views/');
app.set('view engine', 'ejs');

app.get('/', async (req: Request, res: Response) => {
  const senderData = Array()

  const data = await movieCollection.find()

  for (const item of data) {
    const castList = await cast.find({ movieId: item.id })

    senderData.push({
      id: item.id,
      name: item.name,
      rating: item.rating,
      genere: item.genere,
      releaseDate: format(item.releaseDate, 'dd-MM-yyyy'),
      cast: castList
    })
  }

  const localData = {
    title: "Collection List",
    movieList: senderData
  }

  res.render('index', localData)
})

app.get('/add', (req: Request, res: Response) => {
  const localData = {
    title: "Add new collection"
  }
  res.render('add', localData)
})

app.post('/add', async (req: Request, res: Response) => {
  const newMovieData = new movieCollection({
    name: req.body.name,
    rating: req.body.rating,
    genere: req.body.genere,
    releaseDate: req.body.releaseDate
  })

  const newMovie = await newMovieData.save()

  const newMovieId = newMovie.id

  const castList = req.body.cast

  for (const castName of castList) {
    const newCastData = new cast({
      name: castName,
      movieId: newMovieId
    })

    await newCastData.save()
  }

  res.redirect('/?msg=Success')
})

app.get("/edit/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  if (!id) res.redirect('/')

  const movieData = await movieCollection.find({ _id: id })

  const data = {
    name: movieData[0].name,
    rating: movieData[0].rating,
    genere: movieData[0].genere,
    releaseDate: format(movieData[0].releaseDate, 'yyyy-MM-dd')
  }

  const castData = await cast.find({ movieId: id })

  const castList = castData.map(item => {
    return item.name
  })

  const localData = {
    movie: {
      details: data,
      castList
    },
    title: "Edit Collecttion"
  }

  res.render('edit', localData)
})

app.post("/edit/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  if (!id) res.redirect('/')

  await movieCollection.updateOne({ id }, {
    name: req.body.name,
    rating: req.body.rating,
    genere: req.body.genere,
    releaseDate: req.body.releaseDate
  })

  await cast.deleteMany({ movieId: id })

  const castList = req.body.cast

  for (const castName of castList) {
    const newCastData = new cast({
      name: castName,
      movieId: id
    })

    await newCastData.save()
  }

  res.redirect('/?msg=Success')
})

app.get("/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id

  if (!id) res.redirect('/')

  // res.json(data)
  await movieCollection.deleteOne({_id: id})

  await cast.deleteMany({movieId: id})

  res.redirect('/?msg=Success')
})

app.listen(process.env.PORT || 3000, () => {
  return console.log(`Listening at http://localhost:${process.env.PORT}`)
})