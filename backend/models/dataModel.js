import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
	},
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  saleStatus: {
    type: String,
    default: null
  },
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
