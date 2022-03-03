'use strict'

const express = require('express')
const {upload} = require('../helpers/filehelper')
const { protect,isAdmin } = require('../middleware/auth')
const {singleFileUpload,multipleFileUpload,multipleFileUpload2,getallSingleFiles,getallMultipleFiles} = require('../controllers/fileuploaderController')
const router = express.Router();

router.post('/singleFile',upload.single('file'),singleFileUpload);
router.post('/multipleFiles',upload.array('files'),multipleFileUpload);
router.post('/multipleFiles2',multipleFileUpload2);
router.get('/getallSingleFiles',protect,isAdmin,getallSingleFiles)
router.get('/getallMultipleFiles',getallMultipleFiles)

module.exports = router
