const { CampingModel } = require('../models/CampModel')

async function getPosts(req, res) {
  try {
    const campData = await CampingModel.find({});
    res.render('index', { campData });
  }
  catch (error) {
    console.log('getPost err', error);
    res.status(500).send('Error fetching posts');
  }
}

function getNewPost(req, res) {
  res.render('new')
}

async function postNewPost(req, res) {
  const newCamp = new CampingModel(req.body)
  newCamp.author = req.user._id;
  await newCamp.save()
  req.flash('success', 'successfully created a camp post');
  //flash msg created, stored in separate session store handled by connect-flash middleware. 
  // The msg is available only to 1 subsequent req-res cycle
  res.redirect(`/camping/${newCamp._id}`)
}

async function showPostById(req, res) {
  const { id } = req.params
  const post = await CampingModel
    .findById(id)
    .populate({
      path: 'reviews',
      populate: { path: 'author' } //first populate reviews then populate author on each review
    })
    .populate('author') //populate author on campPost
  if (!post) {
    req.flash('error', "Can't find that Camp Post")
    return res.redirect('/camping')
  }
  res.render('show', { post })
}

async function updatePostById(req, res) {
  const { id } = req.params
  const editedCamp = await CampingModel.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true })
  console.log(editedCamp)
  req.flash('success', 'Successfully updated Camp Post')
  res.redirect(`/camping/${id}`)
}

async function getEditPostForm(req, res) {
  const data = await CampingModel.findById(req.params.id);
  if (!data) {
    req.flash('error', "Can't find that Camp Post")
    return res.redirect('/camping')
  }
  res.render('edit', { data })
}
async function deletePost(req, res) {
  await CampingModel.findByIdAndDelete(req.params.id)
  req.flash('success', 'Successfully deleted a Camp Post!')
  res.redirect('/camping')
}


module.exports = {
  getPosts,
  getNewPost,
  postNewPost,
  showPostById,
  updatePostById,
  getEditPostForm,
  deletePost
};


