const { ReviewModel } = require('../models/ReviewModel')
const { CampingModel } = require('../models/CampModel')


async function postReview(req, res){
    const {id}= req.params;
    const camp= await CampingModel.findById(id); 
    const review= new ReviewModel(req.body)
    review.author= req.user._id
    await review.save()
    camp.reviews.push(review);
    await camp.save();
    req.flash('success', 'Created a new review')
    res.redirect(`/camping/${id}`)
  }
  
  async function deleteReview(req, res){
    const{reviewId, id}= req.params
    await CampingModel.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await ReviewModel.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review!')
    res.redirect(`/camping/${id}`)
  }

module.exports={
  postReview,
  deleteReview
}