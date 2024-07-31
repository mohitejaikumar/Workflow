import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    deadline:{type:Date, required:true},
    status:{type:String,enum:["To do","In progress","Under review","Finished"], required:true},
    priority:{type:String,enum:["Low","Medium","Urgent"], required:true},
    createdDate:{type:Date, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
});

export const Todos = mongoose.model('Todos', TodoSchema);