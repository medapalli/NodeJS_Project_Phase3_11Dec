const mongoose = require("mongoose"),

  { Schema } = require("mongoose");

    var vacationSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim:true
      },
      heroImage: {
        type: String,
        default: "./imeges/heroimages/images1.jpg"
      },
      cuisine: {
        type: [String],
        required: true
      },
      cost: {
        type: Number,
        default: 0,
        min: [0, "Vacation packages cannot have a negative cost"]
      },
      maxTravelers: {
        type: Number,
        default: 0,
        max:[25,"Vacation packages cannot have more than 25 travelers"],
        min: [0, "Vacation packages cannot have a negative cost"]
      },
      destination: {
        type: String,
        default:"None specified",
        required: true
      },
      departureLocation: {
        type: [String],
        required: true
      },
      departureDate: {
        type: Date,
        default:Date.now,
        required: true
      },
      returnDate: {
        type: Date,
        default:Date.now,
        required: true
      }
    },
  
  );   //var vacationSchema
  


  module.exports = mongoose.model("Vacation", vacationSchema);
   