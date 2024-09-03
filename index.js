require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const sharp = require("sharp")
const axios = require("axios")


app.use(cors())
app.use(require("./routes/api"))

const fetchAndOptimizeImage = async (imageUrl, width, quality) => {
    try {
        // Fetch the image from a remote source using axios
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });

        // Process the image in memory, converting it to WebP
        const optimizedImage = await sharp(response.data)
            .resize({ width })
            .webp({ quality }) // Convert to WebP with the desired quality
            .toBuffer();

        return optimizedImage;
    } catch (error) {
        throw new Error('Error fetching or processing image');
    }
};

app.get("/", (req, res) => {

    res.json({
        status: 200,
        message:
            "This API works!",
    });
})

app.get('/optimize', async (req, res) => {
    const { url, w, q } = req.query; // Image URL and width query parameters

    if (!url) {
        return res.status(400).send('Image URL is required');
    }

    const width = parseInt(w, 10) || 800; // Default to 800px
    const quality = parseInt(q, 10) || 75

    try {
        const optimizedImage = await fetchAndOptimizeImage(url, width, quality);

        // Set the content type to WebP
        res.set('Content-Type', 'image/webp');
        res.send(optimizedImage);
    } catch (error) {
        res.status(500).send('Error processing image');
    }
});

const port = process.env.NODE_APP_PORT
const host = "192.168.1.125"
app.listen(port, () => console.log(`server berjalan di host:${host} port:${port}😎`))