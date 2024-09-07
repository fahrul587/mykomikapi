require("dotenv").config()
const axios = require("axios")
const cheerio = require("cheerio")
const baseUrl = process.env.BASE_URL

const recomendation = async (req, res) => {
    let recomendations = []
    let poster, type, title, endpoint, rating, chapter
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
            status: 200,
            message: "data berhasil diambil",
            data: recomendations
        })
    }).catch((err) => {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    })
}

const allSeries = async (req, res) => {
    const { genres, types, page = 1, status } = req.params
    let all = []
    let poster, type, title, endpoint, rating, chapter
    console.log(`${baseUrl}manga/?page=${page}&${genres}&${types}&${status}`)
    axios({
        url: `${baseUrl}manga/?page=${page}&${genres}&${types}&${status}`,
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
            status: 200,
            message: "data berhasil diambil",
            data: {
                prev: $(".l").length != 0 ? true : false,
                next: $(".r").length != 0 ? true : false,
                list: all
            }
        })
    }).catch((err) => {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    })
}

const populer = async (req, res) => {
    let weekly = []
    let monthly = []
    let allTime = []
    let poster, title, endpoint, rating, genres
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
            $(el).find("span a").map((i, g) => {
                const genre = {
                    name: $(g).text().trim(),
                    link: $(g).attr("href").replace("https://mangatale.co/genres", "").replace(/\//g, "")
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
                    link: $(g).attr("href").replace("https://mangatale.co/genres", "").replace(/\//g, "")
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
                    link: $(g).attr("href").replace("https://mangatale.co/genres", "").replace(/\//g, "")
                }
                genres.push(genre)
            })
            rating = parseFloat($(el).find(".numscore").text().trim())

            allTime.push({ endpoint, poster, title, genres, rating })
        })

        return res.json({
            status: 200,
            message: "data berhasil diambil",
            data: {
                weekly, monthly, allTime
            }
        })
    }).catch((err) => {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    })
}

const search = async (req, res) => {
    const { query, page = 1 } = req.params
    let searchResults = []
    let poster, type, title, endpoint, rating, chapter
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
        let pageFound;
        if ($(".next").length != 0) {
            pageFound = Number($(".next").prev().text().trim())
        } else if ($(".pagination").children()) {
            pageFound = Number($(".pagination").children().last().text())
        }
        return res.json({
            status: 200,
            message: "data berhasil diambil",
            data: {
                pageFound: pageFound == 0 ? 1 : pageFound,
                prev: $(".prev").length != 0 ? true : false,
                next: $(".next").length != 0 ? true : false,
                list: searchResults
            }
        })
    }).catch((err) => {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    })
}

const details = async (req, res) => {
    const { endpoint } = req.params
    const { ch } = req.query

    let title, alternative_title, sysnopsis, released, author, artist, posted_on, update_on, poster, rating, status, type, followed, genres, chapter_list


    axios({
        url: `${baseUrl}manga/${endpoint}`,
        method: "get",
        headers: {
            "User-Agent": "Chrome",
        },
    }).then((result) => {
        const $ = cheerio.load(result.data)
        if (!ch || ch === "false") {
            title = $("h1.entry-title").text()
            poster = $(".thumb").find("img").attr("src")
            followed = parseFloat($(".bmc").text().split(" ").filter((str) => !isNaN(parseFloat(str))))
            rating = parseFloat($(".num").text())
            status = $(".imptdt i").text()
            type = $(".imptdt a").text()
            alternative_title = $(".wd-full b").html() === "Alternative Titles" || $(".wd-full").prev().hasClass("socialts") ? $(".wd-full span").first().text() : null
            sysnopsis = $(".wd-full .entry-content").text().trim()
            $(".fmed").each((i, el) => {
                if ($(el).find("b").html() === "Dirilis") {
                    released = $(el).find("span").text().trim()
                }
                if ($(el).find("b").html() === "Penulis") {
                    author = $(el).find("span").text().trim()
                }
                if ($(el).find("b").html() === "Artist") {
                    artist = $(el).find("span").text().replace("[Add, ]", "").trim()
                }
                if ($(el).find("b").html() === "Diposting Pada") {
                    posted_on = $(el).find("span").text().trim()
                }
                if ($(el).find("b").html() === "Diperbarui Pada") {
                    update_on = $(el).find("span").text().trim()
                }
            })
            genres = []
            $(".wd-full").each((i, el) => {
                $(el).find(".mgen a").each((i, a) => {
                    const genre = {
                        name: $(a).text(),
                        link: $(a).attr("href").replace("https://mangatale.co/genres", "").replace(/\//g, "")
                    }
                    genres.push(genre)
                })
            })
        }

        if (ch !== "false") {

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
                if (chapter_list.find((chapter) => chapter.endpoint === ch)) {
                    chapter_list.map((c, i) => {
                        if (c.endpoint === ch) {
                            chapter_list[i].current = true
                            chapter_list[i - 1] ? chapter_list[i - 1].prev = true : null
                            chapter_list[i + 1] ? chapter_list[i + 1].next = true : null
                        }
                    })
                }
            }
        }

        return res.json({
            status: 200,
            message: "data berhasil diambil",
            data: {
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
            }
        })
    }).catch((err) => {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    })
}

const bacaKomik = async (req, res) => {
    const { endpoint } = req.params
    let title, page_list
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

        return res.json({
            status: 200,
            message: "data berhasil diambil",
            data: {
                title,
                page_list,
            }
        })

    }).catch((err) => {
        return res.json({
            message: "error ngab!",
            status: 404,
        })
    })
}

const getListKomik = async (req, res) => {
    let genres = []
    let types = []
    let status = []
    axios({
        url: `${baseUrl}manga`,
        method: "get",
        headers: {
            "User-Agent": "Chrome",
        },
    }).then((result) => {
        const $ = cheerio.load(result.data)
        $(".genrez li").each((i, el) => {
            let genre = {
                name: $(el).text().trim(),
                value: $(el).find("input").val()
            }
            genres.push(genre)
        })
        $("[name=type]").each((i, el) => {
            let type = {
                name: $(el).next().text().trim(),
                value: $(el).val()
            }
            $(el).text().trim()
            types.push(type)
        })
        $("[name=status]").each((i, el) => {

            let stat = {
                name: $(el).next().text().trim(),
                value: $(el).val()
            }
            $(el).text().trim()
            status.push(stat)
        })
        genres = genres.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.name === item.name && t.value === item.value
            ))
        );
        types = types.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.name === item.name && t.value === item.value
            ))
        );
        status = status.filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.name === item.name && t.value === item.value
            ))
        );
        status.shift()
        types.shift()
        genres.shift()
        return res.json({
            status: 200,
            message: "data berhasil diambil",
            data: {
                genres,
                types,
                status
            }
        })
    }).catch((err) => {
        res.json({
            message: "error ngabs",
            status: 404
        })
    })
}

const underated = async (req, res) => {
    let underateds = []
    let poster, type, title, endpoint, rating, chapter
    axios({
        url: `${baseUrl}`,
        method: "get",
        headers: {
            "User-Agent": "Chrome",
        },
    }).then((result) => {
        const $ = cheerio.load(result.data)
        $(".tab-pane .bs:first-child").map((i, el) => {
            endpoint = $(el).find("a").attr("href").replace("https://mangatale.co/manga", "").replace(/\//g, "")
            type = $(el).find("span.type").text()
            poster = $(el).find("img").attr("src")
            title = $(el).find(".tt").text().trim()
            chapter = $(el).find(".epxs").text().trim()
            rating = parseFloat($(el).find(".numscore").text().trim())

            underateds.push({ endpoint, type, poster, title, chapter, rating })
        })

        return res.json({
            status: 200,
            message: "data berhasil diambil",
            data: underateds
        })
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
    getListKomik,
    underated,
}