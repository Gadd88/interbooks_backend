const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    favoriteGenres:{
        type:[String],
        default:[]
    },
    books:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[],
        ref:"books"
    }],
    country:{
        type:String,
        required:true
    },
    postalCode:{
        type:String,
        required:true
    },
    phoneNumber:{  
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    } 
})

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    userObject.id = userObject._id;
    delete userObject.password;
    delete userObject._id;
    delete userObject.__v;
    return userObject;
};

const UserModel = mongoose.model("users", userSchema, "users")

module.exports = UserModel