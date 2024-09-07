require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(require("./routes/api"))

const port = process.env.NODE_APP_PORT
app.listen(port, () => console.log(`server berjalan di localhost:${port}😎`))