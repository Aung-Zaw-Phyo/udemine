const axios = require('axios')
const cheerio = require('cheerio')
const response = require("../utils/response");
let url = process.env.URL

const index = async (req, res, next) => {
    try {
        let page = req.query.page
        let category = req.query.category
        if(page){
            url = `${process.env.URL}page/${page}`
        }else{
            url = `${process.env.URL}`
        }
        if(category){
            page ? 
            url = `${process.env.URL}/category/${category}/page/${page}` : 
            url = `${process.env.URL}/category/${category}`
            
        }else{
            page ? 
            url = `${process.env.URL}/page/${page}` : 
            url = `${process.env.URL}`
        }
        console.log(url)
        const result = await axios.get(url)
        const html = result.data
        const $ = cheerio.load(html)
        const list = $('article', html)//post-thumbnail
        const data = []
        for (let i = 0; i < list.length; i++) {
            const el = list[i];
            const cover = $('.post-thumbnail img', el).attr('src')
            const categories = $('.category-list a', el)
            let cat_text = ''
            for (let i = 0; i < categories.length; i++) {
                const el = categories[i];
                i === 0 ? cat_text += $(categories[i]).text() : cat_text += ' / ' + $(categories[i]).text()
            }
    
            const title = $('.entry-title a', el).text()
            const time = $('.entry-meta .published', el).text()
            const description = $('.entry-summary p', el).text()
            const detail_link = $('.entry-title a', el).attr('href')
            data.push({
                cover,
                category: cat_text,
                title,
                createdAt: time,
                description,
                detail_link
            })
        }
        response.success(res, { message: "courses", data: data });
    } catch (error) {
        next(error);
    }
}

const detail = async (req, res, next) => {
    try {
        const link = req.query.link
        if(!link){
            response.throwError({ status: 400, message: 'Invalid data' });
        }
        const result = await axios.get(link)
        const html = result.data
        const $ = cheerio.load(html)
        const title = $('.entry-title', html).text()
        const categories = $('.category-list a', html).text()
        const time = $('.entry-meta .posted-on a .published', html).text()
        const cover = $('.entry-content .wp-block-image img', html).attr('src')
        const  desc = $('.entry-content > p', html).text()
        const download_link = $('.entry-content > .wp-block-quote > p > a', html).attr('href')
        const download_text_list = $('.entry-content > .wp-block-quote > p > a', html)
        const download_text = $(download_text_list[0]).text()

        const list = $('.related-post', html)
        let courses = []
        for (let i = 0; i < list.length; i++) {
            const el = list[i];
            const cover = $('.related-post-thumbnail a img', el).attr('src')
            const title = $('.related-post-title a', el).attr('title')
            const link = $('.related-post-title a', el).attr('href')
            const time = $('.related-post-meta a .published', el).text()
            courses.push({
                cover,
                title,
                detail_link: link,
                createdAt: time
            })
        }

        const top_posts_list = $('#top-posts-3 ul li', html)
        let top_posts = []
        for (let i = 0; i < top_posts_list.length; i++) {
            const el = top_posts_list[i];
            top_posts.push({
                title: $('a', el).attr('title'),
                detail_link: $('a', el).attr('href'),
                cover: $('a img', el).attr('src')
            })
        }

        let data = {
            title: title,
            categories: categories,
            createdAt: time,
            cover: cover,
            download_link: download_link,
            download_text: download_text,
            desc: desc,
            courses: courses,
            top_posts: top_posts
        }

        response.success(res, { message: "courses", data: data });
    } catch (error) {
        next(error);
    }
}

const search = async (req, res, next) => {
    try {
        const key = req.query.key
        if(!key){
            response.throwError({ status: 400, message: 'Invalid data' });
        }
        let url = `https://tutsnode.net/?s=${key}`
        if(req.query.page){
            url = `https://tutsnode.net/page/${req.query.page}/?s=${key}`
        }
        console.log(url)
        const result = await axios.get(url)
        const html = result.data
        const $ = cheerio.load(html)
        const list = $('article', html)//post-thumbnail
        const data = []
        for (let i = 0; i < list.length; i++) {
            const el = list[i];
            const cover = $('.post-thumbnail img', el).attr('src')
            const categories = $('.category-list a', el)
            let cat_text = ''
            for (let i = 0; i < categories.length; i++) {
                const el = categories[i];
                i === 0 ? cat_text += $(categories[i]).text() : cat_text += ' / ' + $(categories[i]).text()
            }
    
            const title = $('.entry-title a', el).text()
            const time = $('.entry-meta .published', el).text()
            const description = $('.entry-summary p', el).text()
            const detail_link = $('.entry-title a', el).attr('href')
            data.push({
                cover,
                category: cat_text,
                title,
                createdAt: time,
                description,
                detail_link
            })
        }
        response.success(res, { message: "courses", data: data });
    } catch (error) {
        next(error)
    }
}

const categories = async (req, res, next) => {
    try {
        const result = await axios.get(process.env.URL)
        const html = result.data
        const $ = cheerio.load(html)
        const list = $('.menu-item-has-children > ul a', html)
        const categories = []
        let top = ''
        for (let i = 0; i < list.length; i++) {
            const el = list[i];
            if($(el).text().toLowerCase() === top){
                break;
            }
            i === 0 ? top = $(el).text().toLowerCase() : null

            let arr = $(el).attr('href').split('/')
            let cat = arr[arr.length-2]
            const category = {
                text: $(el).text(),
                category: cat
            }
            categories.push(category)
        }
        response.success(res, { message: "categories", data: categories });
    } catch (error) {
        next(error)
    }
}

module.exports = {index, detail, search, categories}