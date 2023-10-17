const express = require("express")
const router = express.Router()
const { recomendation, allSeries, populer, search, details, bacaKomik } = require("../controller")

router.get("/api", (req, res) => {
    res.json({message: "ok"})
})
router.get("/api/recomendation", recomendation)
router.get("/api/all/:page?", allSeries)
router.get("/api/populer", populer)
router.get("/api/s/:page?/:query", search)
router.get("/api/details/:endpoint/:ch?", details)
router.get("/api/komik/ch/:endpoint", bacaKomik)

module.exports = router