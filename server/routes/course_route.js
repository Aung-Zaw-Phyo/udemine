const router = require('express').Router()
const {index, detail, search} = require('./../controllers/course_controller')

router.route('/').get(index)
router.route('/detail').get(detail)
router.route('/search').get(search)

module.exports = router