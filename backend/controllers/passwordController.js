import Password from '../models/passwordModel.js';

// Create new password
export const createPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    // Check if a password already exists
    const existingPassword = await Password.findOne({ password });
    if (existingPassword) {
      return res.status(400).json({ error: 'Password already exists' });
    }

    const newPassword = new Password({ password });
    await newPassword.save();
    res.status(201).json({ message: 'Password created successfully', data: newPassword });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create password' });
  }
};

// View the existing password
export const viewPassword = async (req, res) => {
  try {
    const password = await Password.find();
    if (!password) {
      return res.status(404).json({ error: 'Password not found' });
    }
    res.json({ data: password });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch password' });
  }
};

// Delete the password
export const deletePassword = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedPassword = await Password.findByIdAndDelete(id);

    if (!deletedPassword) {
      return res.status(404).json({ error: 'Password not found' })
    }
    
    res.json({ message: 'ลบรหัสผ่านสำเร็จ!' })
  } catch (error) {
    console.error('Error deleting password', error);
    res.status(500).json({ error: 'Failed to delete password' });
  }
};
