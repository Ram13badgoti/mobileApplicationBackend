import mongoose from "mongoose";


const  MobileSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
price:
{
    type: String,
    required: true,
},
type:
{
    type: String,
    required: true,
},
processor:
{
    type: String,
    required: true,
},
memory:
{
    type: String,
    required: true,
},
os:
{
    type:String,
required:true,
},
img:{
    type: String,
        data: Buffer,
        required: false,
}





});



const post = mongoose.model("mobile",PostSchema);

export default modile;