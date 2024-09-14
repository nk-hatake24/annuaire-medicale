const User = require("./userModel");
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const doctorSchema = new Schema({
//   speciality: {
//     type: String,
//     required: [true, 'Speciality is required'],
//     trim: true
//   },
//   licenseNumber: {
//     type: String,
//     required: [true, 'License number is required'],
//     unique: true,
//     trim: true
//   },
//   healthCenter: {
//     type: String,
//   }
// });

// const DoctorModel = User.discriminator('Doctor', doctorSchema);

// module.exports = DoctorModel;
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    licenseNumber: { type: String, unique: true, required: true },
    speciality: { type: String, required: true },
    healthCenter: {
      type: String,
    },
    town: {
      type: String,
    },
    email: {
      type: String,
      // required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      // required: [true, 'Password is required'],
      minlength: [6, "Password must be at least 6 characters"],
    },
    phoneNumber: {
      type: String,
      // required: [true, 'Phone number is required'],
      validate: {
        validator: function (v) {
          return /^\d{20}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      // required: [true, 'Address is required']
    },
    dateOfBirth: {
      type: Date,
      // required: [true, 'Date of birth is required']
    },
  },
  {
    discriminatorKey: "role",
    timestamps: true,
  }
);

doctorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

doctorSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // Si 'paid' est mis à jour à true, met à jour également 'paidAt'
  if (update.paid === true) {
    update.paidAt = Date.now();
  }
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);
// const DoctorModel = User.discriminator('Doctor', doctorSchema);

module.exports = Doctor;
