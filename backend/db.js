const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/notebook"
const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connect success");
    })
}
module.exports = connectToMongo;