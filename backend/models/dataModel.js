import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
	},
})
