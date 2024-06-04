const mongoose = require("mongoose");
const Product = require('./Product')
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "minimum length 6 "],
  },
  firstName: {
    type: String,
    required: [true, "Please enter valid name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter valid lastName"],
  },
  created: {
    type: [mongoose.Schema.Types.ObjectId], ref: Product,
    default: []
  },
  bought: {
    type: [mongoose.Schema.Types.ObjectId], ref: Product,
    default: []
  }
});

// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     console.error(err.message)

//   }
// });

const User = mongoose.model("user", userSchema);
module.exports = User;