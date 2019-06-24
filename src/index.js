const express = require('express')
const cors = require('cors')
const app = express()

const { mongoose } = require('./database')

app.set('port', process.env.PORT || 3000)

app.use(cors({origin: 'http://localhost:4200'}))
app.use(express.json())



// Routes
app.use('/api/auth', require('./routes/auth.routes'))



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})