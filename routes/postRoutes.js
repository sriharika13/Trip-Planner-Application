const express= require('express')
const postController= require('../controllers/posts')
const {logginMiddleware, modifyCampAuth}= require('../middlewares')

const router= express.Router()

router.get('/', postController.getPosts)
router.get('/new', logginMiddleware, postController.getNewPost)
router.post('/', logginMiddleware, postController.postNewPost)
router.get('/:id', postController.showPostById)
router.patch('/:id', logginMiddleware, modifyCampAuth, postController.updatePostById)
router.get('/:id/edit', logginMiddleware, modifyCampAuth, postController.getEditPostForm)
router.delete('/:id', logginMiddleware, modifyCampAuth, postController.deletePost)

module.exports= router