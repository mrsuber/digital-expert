const express = require('express')
const {downloadview, generatePdf} = require('../controllers/downloadController')

const router = express.Router()

router.get('/downloadview', downloadview)
router.get('/download', generatePdf)

module.exports = {
    routes:router
}