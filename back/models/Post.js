import { timeStamp } from "console";
import mongoose from "mongoose";
const  PostSchema = new mongoose.Schema({
 title : {
    type:String,
    required:true,
 },
 text1 : {
    type:String,
    required:true,
 },
//  text2 : {
//    type:String,
//    required:true,
// },
 price : {
    type:Number,
    required:true,
    default:0,
 },
 category : {
   type:String,
   required:true,
},
  imgmain:String,
  imagesSlider: [String], 
//   imgsecond:String,
//   imgthird:String
// ids : {
//    type:Number,
//    required:true,
// },
//  user : {
//    type : mongoose.Schema.Types.ObjectId,
//    ref: "User",
//    required:true,
//  },
},
{
timestamps:true,
}
)
export default mongoose.model("Post", PostSchema)