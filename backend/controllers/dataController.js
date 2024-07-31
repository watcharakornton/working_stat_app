import Data from '../models/dataModel.js';
import Password from '../models/passwordModel.js';

export const addData = async (req, res) => {
    const { type, name, category, month, saleStatus } = req.body;

    if (!['Change Request', 'Sitemap', 'Cms Training'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }
    
  try {
    const newEntry = new Data({
      type,
      name: name.toUpperCase(),
      category,
      month,
      year: new Date().getFullYear(),
      saleStatus: type === 'Sitemap' ? saleStatus : null
    });

    await newEntry.save();
    res.json({ message: 'เพิ่มข้อมูลสำเร็จ!', data: newEntry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add data' });
  }
};

export const viewAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export const viewSummary = async (req, res) => {
  try {
    const totalChangeRequests = await Data.countDocuments({ type: 'Change Request' });
    const totalSitemaps = await Data.countDocuments({ type: 'Sitemap' });
    const totalCmsTrainings = await Data.countDocuments({ type: 'Cms Training' });

    const summary = {
      totalChangeRequests,
      totalSitemaps,
      totalCmsTrainings
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

export const editData = async (req, res) => {
  const { id, name, category, month, saleStatus } = req.body;

  try {
    const updatedData = await Data.findByIdAndUpdate(
      id,
      {
        name: name.toUpperCase(),
        category,
        month,
        saleStatus
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json({ message: 'แก้ไขข้อมูลสำเร็จ!', data: updatedData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit data' });
  }
};

export const deleteData = async (req, res) => {
  const { id, password } = req.body;

  try {
    // get password from db
    const validPasswords = await Password.find();
    const passwordExists = validPasswords.some(pwd => pwd.password === password);

    if (!passwordExists) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ error: 'Data not found' })
    }

    res.json({ message: 'ลบข้อมูลสำเร็จ!' });
  } catch (error) {
    console.error('Error deleting data', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
};
