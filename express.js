var express = require('express')
var app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.use('/script', express.static('node_modules'))
app.use(express.static('public'))

app.listen(3000)
