const mongoose = require('mongoose')

const reviewSchema= new mongoose.Schema({
    rating: Number,
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})

const ReviewModel= mongoose.model('ReviewModel', reviewSchema)


module.exports={
    ReviewModel
}




// async function makeOneMovie() {
//     const m1 = new MovieModel({
//         title: "Barbie",
//         year: 2023,
//         score: 9.9,
//         rating: 'R',
//         comments: [{ body: "WTF movie", date: Date.now() }]
//       }
//     )
//     await m1.save()
// }

// // makeOneMovie()

// async function makeManyMovies(){
//     const data= await MovieModel.insertMany([
//         {
//             title: "Movie2",
//             year: "2022efwfw",
//             score: 8.1,
//             rating: 'U',
//             comments: [{ body: "nicesttt movie", date: Date.now() }]
//         },
//         {
//             title: "Movie3",
//             year: 1922,
//             score: 5.2,
//             rating: 'U',
//             comments: [{ body: "Ewwww movie", date: Date.now() }]
//         }
//     ])
//     return data

// }
// // makeManyMovies() //async function returns promise tht is resolved or rejected
// // .then((data)=> console.log(data))
// // .catch((err)=> console.log("mongoose err: ", err))

// MovieModel.findOneAndUpdate(
//     {rating:'U'},
//     {score: 0.8},
//     {new: true, runValidators:true}  //returns updated obj, runValidators validate the operation against the model's schema
// ).then(data=> console.log(data))



