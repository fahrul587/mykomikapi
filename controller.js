require("dotenv").config()
const axios = require("axios")
const cheerio = require("cheerio")
const baseUrl = process.env.BASE_URL

const recomendation = async (req, res) => {
    let recomendations = []
    let poster, type, title, endpoint, rating, chapter

    try {
        axios({
            url: baseUrl,
            method: "get",
            headers: {
                "User-Agent": "Chrome",
            },
        }).then((result) => {
            const $ = cheerio.load(result.data)
            $(".hothome  .listupd .bs").each((i, el) => {
                endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
                type = $(el).find("span.type").text()
                poster = $(el).find("img").attr("src")
                title = $(el).find(".tt").text().trim()
                chapter = $(el).find(".epxs").text().trim()
                rating = parseFloat($(el).find(".numscore").text().trim())

                recomendations.push({ endpoint, type, poster, title, chapter, rating })
            })

            return res.json({
                message: "berhasil",
                results: {
                    data: recomendations
                }
            })
        }).catch((err) => {
            throw err
        })


    } catch (error) {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    }
}

const allSeries = async (req, res) => {
    const { page = 1 } = req.params
    let all = []
    let poster, type, title, endpoint, rating, chapter

    try {
        axios({
            url: `${baseUrl}/manga/?page=${page}`,
            method: "get",
            headers: {
                "User-Agent": "Chrome",
            },
        }).then((result) => {
            const $ = cheerio.load(result.data)
            $(".listupd .bs").each((i, el) => {
                endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
                type = $(el).find("span.type").text()
                poster = $(el).find("img").attr("src")
                title = $(el).find(".tt").text().trim()
                chapter = $(el).find(".epxs").text().trim()
                rating = parseFloat($(el).find(".numscore").text().trim())

                all.push({ endpoint, type, poster, title, chapter, rating })
            })
            return res.json({
                message: "berhasil",
                results: {
                    data: all
                }
            })
        }).catch((err) => {
            throw err
        })


    } catch (error) {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    }
}

const populer = async (req, res) => {
    let weekly = []
    let monthly = []
    let allTime = []
    let poster, title, endpoint, rating, genres

    try {
        axios({
            url: `${baseUrl}`,
            method: "get",
            headers: {
                "User-Agent": "Chrome",
            },
        }).then((result) => {
            const $ = cheerio.load(result.data)
            $(".wpop-weekly li").each((i, el) => {
                endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
                poster = $(el).find("img").attr("src")
                title = $(el).find("h2 > a").text().trim()
                genres = []
                $(el).find("span > a").each((i, g) => {
                    const genre = {
                        name: $(g).text().trim(),
                        link: $(g).attr("href")
                    }
                    genres.push(genre)
                })
                rating = parseFloat($(el).find(".numscore").text().trim())

                weekly.push({ endpoint, poster, title, genres, rating })
            })

            $(".wpop-monthly li").each((i, el) => {
                endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
                poster = $(el).find("img").attr("src")
                title = $(el).find("h2 > a").text().trim()
                genres = []
                $(el).find("span > a").each((i, g) => {
                    const genre = {
                        name: $(g).text().trim(),
                        link: $(g).attr("href")
                    }
                    genres.push(genre)
                })
                rating = parseFloat($(el).find(".numscore").text().trim())

                monthly.push({ endpoint, poster, title, genres, rating })
            })

            $(".wpop-alltime li").each((i, el) => {
                endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
                poster = $(el).find("img").attr("src")
                title = $(el).find("h2 > a").text().trim()
                genres = []
                $(el).find("span > a").each((i, g) => {
                    const genre = {
                        name: $(g).text().trim(),
                        link: $(g).attr("href")
                    }
                    genres.push(genre)
                })
                rating = parseFloat($(el).find(".numscore").text().trim())

                allTime.push({ endpoint, poster, title, genres, rating })
            })

            return res.json({
                message: "berhasil",
                results: {
                    weekly, monthly, allTime
                }
            })
        }).catch((err) => {
            throw err
        })


    } catch (error) {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    }
}

const search = async (req, res) => {
    const { query, page = 1 } = req.params
    let searchResults = []
    let poster, type, title, endpoint, rating, chapter

    try {
        axios({
            url: `${baseUrl}page/${page}/?s=${query}`,
            method: "get",
            headers: {
                "User-Agent": "Chrome",
            },
        }).then((result) => {
            const $ = cheerio.load(result.data)
            $(".listupd .bs").each((i, el) => {
                endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
                type = $(el).find("span.type").text()
                poster = $(el).find("img").attr("src")
                title = $(el).find(".tt").text().trim()
                chapter = $(el).find(".epxs").text().trim()
                rating = parseFloat($(el).find(".numscore").text().trim())

                searchResults.push({ endpoint, type, poster, title, chapter, rating })
            })
            return res.json({
                message: "berhasil",
                results: {
                    data: searchResults
                }
            })
        }).catch((err) => {
            throw err
        })


    } catch (error) {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    }
}

const details = async (req, res) => {
    const { endpoint, ch = 0 } = req.params
    const newDetail = []
    let title, alternative_title, sysnopsis, released, author, artist, posted_on, update_on, poster, rating, status, type, followed, genres, chapter_list

    try {
        axios({
            url: `${baseUrl}manga/${endpoint}`,
            method: "get",
            headers: {
                "User-Agent": "Chrome",
            },
        }).then((result) => {
            const $ = cheerio.load(result.data)
            title = $(".bixbox ol").children().last().find("a span").text()
            poster = $(".thumb").find("img").attr("src")
            followed = $(".bmc").text().replace("Followed by", "").replace("people", "").trim()
            rating = parseFloat($(".num").text())
            status = $(".imptdt i").text()
            type = $(".imptdt a").text()
            alternative_title = $(".wd-full b").html() === "Alternative Titles" ? $(".wd-full span").first().text() : null
            sysnopsis = $(".wd-full .entry-content").text().trim()
            $(".fmed").each((i, el) => {
                if ($(el).find("b").html() === "Released") {
                    released = $(el).find("span").text().trim()
                }
                if ($(el).find("b").html() === "Author") {
                    author = $(el).find("span").text().trim()
                }
                if ($(el).find("b").html() === "Artist") {
                    artist = $(el).find("span").text().trim()
                }
                if ($(el).find("b").html() === "Posted On") {
                    posted_on = $(el).find("span").text().trim()
                }
                if ($(el).find("b").html() === "Updated On") {
                    update_on = $(el).find("span").text().trim()
                }
            })
            genres = []
            $(".wd-full").each((i, el) => {

                if ($(el).find("b").html() === "Genres") {
                    $(el).find(".mgen a").each((i, a) => {
                        genres.push($(a).text())
                    })
                }
            })
            chapter_list = []
            $("#chapterlist ul li").each((i, el) => {
                chapter_list.push({
                    name: $(el).find(".chapternum").text(),
                    release_on: $(el).find(".chapterdate").text(),
                    endpoint: $(el).find("a").attr("href").replace("https://mangatale.co", "").replace(/\//g, ""),
                })
            })

            if (chapter_list.length !== 0) {
                chapter_list.reverse()

                if (ch == 0) {
                    chapter_list[ch].current = true
                    chapter_list[ch + 1] ? chapter_list[ch + 1].next = true : null
                } else if (chapter_list.find((chapter) => chapter.endpoint === ch)) {
                    chapter_list.map((c, i) => {
                        if (c.endpoint === ch) {
                            chapter_list[i].current = true
                            chapter_list[i - 1] ? chapter_list[i - 1].prev = true : null
                            chapter_list[i + 1] ? chapter_list[i + 1].next = true : null
                        }
                    })
                } else {

                    throw new Error()
                }
            }

            newDetail.push({
                title,
                poster,
                followed,
                rating,
                status,
                type,
                alternative_title,
                sysnopsis,
                released,
                author,
                artist,
                posted_on,
                update_on,
                genres,
                chapter_list,
            })
            return res.json({ newDetail })
        }).catch((err) => {
            return res.json({
                message: "error ngab!",
                status: 404,
            })
        })

    } catch (error) {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    }
}

const bacaKomik = async (req, res) => {
    const { endpoint } = req.params
    const page = []
    let title, page_list
    try {
        axios({
            url: `${baseUrl}${endpoint}`,
            method: "get",
            headers: {
                "User-Agent": "Chrome",
            },
        }).then((result) => {
            const $ = cheerio.load(result.data)
            title = $(".entry-title").text()
            const data_src = $("#readerarea").text()
            const $2 = cheerio.load(data_src)
            page_list = []
            $2("p img").each((i, el) => {
                page_list.push($2(el).attr("src"))
            })

            page.push({
                title,
                page_list,
            })
            return res.json({ page })
        }).catch((err) => {
            return res.json({
                message: "error ngab!",
                status: 404,
            })
        })

    } catch (error) {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    }
}

const allByGenre = async (req, res) => {
    const { genre, page = 1 } = req.params
    const byGenre = {
        results: {
            page: parseInt(page),
            result: [],
        },
        pages: "",
    }
    let poster, type, title, endpoint, rating, chapter
    axios({
        url: `${baseUrl}genres/${genre}/page/${page}`,
        method: "get",
        headers: {
            "User-Agent": "Chrome",
        },
    }).then((result) => {
        const $ = cheerio.load(result.data)
        byGenre.pages = parseInt($(".dots").next().text())
        $(".listupd .bs").each((i, el) => {
            endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
            type = $(el).find("span.type").text()
            poster = $(el).find("img").attr("src")
            title = $(el).find(".tt").text().trim()
            chapter = $(el).find(".epxs").text().trim()
            rating = parseFloat($(el).find(".numscore").text().trim())

            byGenre.results.result.push({ endpoint, type, poster, title, chapter, rating })
        })
        return res.json({ byGenre })
    }).catch((err) => {
        res.json({ 
            message: "error", 
            status: 404
         })
    })
}



module.exports = {
    recomendation,
    allSeries,
    populer,
    search,
    details,
    bacaKomik,
    allByGenre
}