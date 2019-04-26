const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const validateParams = (req, res, next) => {
  
  const { age } = req.query
  
  if( !age ) {
    return res.redirect(`/`)
  }
	return next()
}

// Para o Express saber lidar com as informações de um formulário HTML
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('formAge')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age > 18) {
    return res.redirect(`/major/?age=` + age)
  } else {
    return res.redirect(`/minor/?age=` + age)
  }
})

app.get('/major/', validateParams, (req, res) => {
    return res.render(`majorAge`, { age : `${req.query.age}` } )
})

app.get('/minor/', validateParams, (req, res) => {
  return res.render(`minorAge`, { age : `${req.query.age}` } )
})


app.listen(3000)

