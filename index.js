require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")


app.use(cors())
app.use(require("./routes/api"))

app.get("/", (req, res) => {

    res.json({
        status: 200,
        message:
            "This API works!",
    });
})

const port = process.env.NODE_APP_PORT
const host = "192.168.1.125"
app.listen(port, () => console.log(`server berjalan di host:${host} port:${port}😎`))