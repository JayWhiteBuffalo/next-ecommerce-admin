const { Schema, model, models, default: mongoose } = require("mongoose");


const CategorySchema = new Schema({
    name: {type:String, required:true},
    parent:{type: mongoose.Types.ObjectId, ref:'Category'},
    image: [{type: String}],
    properties: [{type:Object}]
});

 const Category = models?.Category ||  model('Category', CategorySchema);

 module.exports = Category;