import mongoose, { Document, Types } from "mongoose";
import { Schema } from "mongoose";
import { ref } from "process";

interface files extends Document{
    owner: Types.ObjectId,
    createdAt: string,
    path: string,
    originalname: string,
    imageURL: string,
    fileType: string,
    fileSize: number,
    shareuser: string[]
}

const fileSchema: Schema <files> = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdAt:{
        type: String,
        default: () => {
    const now = new Date();
    // Convert UTC to IST (UTC + 5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istTime = new Date(now.getTime() + istOffset);
    return istTime.toISOString();
  },
    },
    path:{
        type: String,
        required: true
    },
    originalname:{
        type: String,
        required: true
    },
    imageURL:{
        type: String,
    },
    fileType:{
        type: String,
        required: true
    },
    fileSize:{
        type: Number,
        required: true
    },
    shareuser:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]

})

const file = mongoose.models.file || mongoose.model<files>('file', fileSchema);

export default file