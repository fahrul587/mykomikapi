require("dotenv").config()
const express = require("express")
const router = express.Router()
const { recomendation, allSeries, populer, search, details, bacaKomik, getListKomik, underated } = require("../controller")
const accessToken = process.env.ACCESS_TOKEN

const myMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    // Jika tidak ada token, kirim respon 401 (Unauthorized)
    if (!token || token !== accessToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    next(); // Panggil next() untuk melanjutkan ke middleware atau route handler berikutnya
};
router.use(myMiddleware)
router.get("/api/recomendation", recomendation)
router.get("/api/all/:page?/:genres?/:types?/:status?", allSeries)
router.get("/api/populer", populer)
router.get("/api/s/:query/:page?", search)
router.get("/api/details/:endpoint", details)
router.get("/api/komik/ch/:endpoint", bacaKomik)
router.get("/api/filterlist", getListKomik)
router.get("/api/underated", underated)

module.exports = router