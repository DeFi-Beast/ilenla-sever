import mongoose from "mongoose";

/**** Post Schema */

const dealSchema = mongoose.Schema({
  title: String,
  location: [String],
  property: String,
  listing: [],
  rooms:Number,
  name:String,
  creator: String,
  tags: [String],
  selectedFiles: [String],
  likes: {
    type: [String],
    default: [],
  },
  comments:{
    type: [String],
    default: [],
  },
  sold:{type:Boolean, default:false},
  available:{type:Boolean, default:true},
  negotiable:{type:Boolean, default:false},
  price:{type:Number},
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Deal = mongoose.model("iledeals", dealSchema);

export default Deal;
