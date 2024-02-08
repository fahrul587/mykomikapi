require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const qrcode = require('qrcode-terminal');
const { default: axios } = require("axios");

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
	if (message.body === '!ping') {
		await message.reply('hell yeah');
	} else if (message.hasMedia && message.type === "image" || message.type === "document" && message.body.startsWith("#sticker")) {
        const media = await message.downloadMedia()
        if (!media.mimetype.includes("image")) {
            message.reply("Mohon kirim gambar atau GIF untuk dibuat stiker.")
            return
        }
        message.reply(media, undefined, {sendMediaAsSticker: true})
    }
});

client.initialize();

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