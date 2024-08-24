const express = require("express")
const router = express.Router()
const { recomendation, allSeries, populer, search, details, bacaKomik, allByGenre, getListKomik } = require("../controller")

router.get("/api", (req, res) => {
    res.json({message: "ok"})
})
router.get("/api/recomendation", recomendation)
router.get("/api/all/:page?/:genres?/:types?", allSeries)
router.get("/api/populer", populer)
router.get("/api/s/:query/:page?", search)
router.get("/api/details/:endpoint/:ch?", details)
router.get("/api/komik/ch/:endpoint", bacaKomik)
router.get("/api/allby/:genre/:page?", allByGenre)
router.get("/api/filterlist", getListKomik)

module.exports = router