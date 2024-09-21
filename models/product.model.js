import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Product name is required"]
        },

        quantity:{
            type: Number,
            required: [true],
            default: 0
        },

        price:{
            type: Number,
            required: [true],
            default: 0
        },
        
        img:{
            type:String,
            required: false
        }
     },
     { 
        timestamp: true // extra fields for tracking
     }
)

const Product = mongoose.model("Product", ProductSchema);

export default Product