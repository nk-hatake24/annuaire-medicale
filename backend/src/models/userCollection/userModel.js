const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{20}$/.test(v);  
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  }
}, {
  discriminatorKey: 'role', 
  timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10); 
    }
    next();
  });

  userSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    
    // Si 'paid' est mis à jour à true, met à jour également 'paidAt'
    if (update.paid === true) {
      update.paidAt = Date.now();
    }
    next();
  });
  

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
