const { CampingModel } = require('./models/CampModel');
const { ReviewModel } = require('./models/ReviewModel');

const logginMiddleware = (req, res, next) => {
    console.log("current logged in user: ", req.user) //retrived from session- user_id, username, email
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; //if not loggedin, this line will run- saving url i wanted to access in session
        req.flash('error', "You must be signed in")
        return res.redirect('/login')
    }
    next()
}

const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo)
        res.locals.returnTo = req.session.returnTo
    next()
}

const modifyCampAuth = async (req, res, next) => {
    const { id } = req.params
    const camp = await CampingModel.findById(id)
    if (!camp.author._id.equals(req.user._id)) {
        req.flash('error', "You do not have permissions to modify this post");
        return res.redirect(`/camping/${id}`)
    }
    next()
}

const modifyReviewAuth = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await ReviewModel.findById(reviewId)
    if (!review.author._id.equals(req.user._id)) {
        req.flash('error', "You do not have permissions to delete this review");
        return res.redirect(`/camping/${id}`)
    }
    next()
}

module.exports = {
    logginMiddleware,
    storeReturnTo,
    modifyCampAuth,
    modifyReviewAuth
}