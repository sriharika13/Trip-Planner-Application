const mongoose = require('mongoose')
const axios = require('axios');
const {ReviewModel} = require('../models/ReviewModel')
const seedData = require( '../data/seedPosts.json')


const campingSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 40
    },
    description: {
        type: String,
        minlength: 10
    },
    location: String,
    price: {
        type: Number,
        min: 0,
        default: 500
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'ReviewModel'
        }
    ],
    image: String
}) 


// findByIdAndDelete function of Model triggers findOneAndDelete middleware. once deleted camp, we get that camp object in doc.
// once camp object deleted, we delete ReviewModel documents where its id is found in camp's review array
// deleteMany is also funciton of Model
// post is method
campingSchema.post('findOneAndDelete', async(doc)=>{
    console.log("mongoose middleware ran")
    if(doc){
        await ReviewModel.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const CampingModel = mongoose.model('CampingModel', campingSchema)
 //mongoose will create collection/table: campingmodels.
// CampingModel is class returned from mongoose.model method. so can create instances



async function getImage() {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          page: 1,
          query: 'camping,nature,lake,forest',
          client_id: '0X_l_tMzs2F7g1F88lZKVmHpu1Py39YUC3_zyMcnic4',
          orientation: 'landscape'
        }
      });
      const data = response.data;
      const results = data.results;
      const randomIndex = Math.floor(Math.random() * results.length);
      const imgSrc = results[randomIndex].urls.raw;
    //   console.log(imgSrc)
      return imgSrc;
    } 
    catch (error) {
      console.log('Error in fetching image:', error.message);
    }
  }


async function seedPostData(seedData){
    const imgSrcArr=[];
    for(let i=1; i<=seedData.length; i++){
        imgSrcArr.push(await getImage())
    }
    let i=0;
    for(let camp of seedData){
        camp.image= imgSrcArr[i]
        i++;
    }
    CampingModel.insertMany(seedData)
    .then(data=> console.log("sucess! data seeded"))
    .catch(err=> console.log("seeding error: ", err))
}
// seedPostData(seedData)

module.exports={
    CampingModel
}