const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const FileController = require('../controllers/fileController')

router.post('', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.getFiles)
router.get('/download', authMiddleware, FileController.downloadFile)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.delete('/', authMiddleware, FileController.deleteFile)

module.exports = router
