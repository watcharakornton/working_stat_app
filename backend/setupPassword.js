import mongoose from 'mongoose';
import Password from './models/passwordModel.js';
import dotenv from 'dotenv';

dotenv.config();

const setupPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Create new password
    const existingPassword = await Password.findOne();
    if (!existingPassword) {
      const newPassword = new Password({
        password: 'Tonpol160240'
      });

      await newPassword.save();
      console.log('Password has been set up.');
    } else {
      console.log('Password already exists');
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error setting up password: ', error);
    mongoose.disconnect();
  }
};

setupPassword();
