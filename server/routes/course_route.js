const router = require('express').Router()
const {index, detail, search, categories} = require('./../controllers/course_controller')

router.route('/').get(index)
router.route('/detail').get(detail)
router.route('/search').get(search)
router.route('/categories').get(categories)

module.exports = router