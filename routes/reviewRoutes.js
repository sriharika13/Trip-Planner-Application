const express= require('express')
const reviewController= require('../controllers/reviews')
const {logginMiddleware, modifyReviewAuth} = require('../middlewares')

const router= express.Router({mergeParams:true}) //i get accesss to id param in server.js in this router

router.post('/', logginMiddleware, reviewController.postReview)
router.delete('/:reviewId', logginMiddleware, modifyReviewAuth, reviewController.deleteReview)

module.exports= router