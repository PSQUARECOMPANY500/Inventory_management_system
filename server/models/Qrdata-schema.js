import mongoose from "mongoose";

const qrdataSchema = mongoose.Schema({
  componentName: String,
  receivedDate: {
    type: Date,
    default: new Date(),
  },
  dispatchedDate: {
    type: Date,
    default: null,
  },
  quantity: Number,
  dispatchedQuantity: { type: Number, default: 0 },
});

const qrdata = mongoose.model("qrcomponentData", qrdataSchema);

export default qrdata;
