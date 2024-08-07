import Data from '../models/dataModel.js';
import Password from '../models/passwordModel.js';

export const addData = async (req, res) => {
    const { type, name, category, month, saleStatus } = req.body;

    if (!['Change Request', 'Sitemap', 'CMS Training'].includes(type)) {
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

export const addMultipleData = async (req, res) => {
  const dataEntries = req.body.dataEntries;

  // Validate input
  if (!Array.isArray(dataEntries) || dataEntries.length === 0) {
    return res.status(400).json({ error: 'Invalid data entries' });
  }

  try {
    // Prepare the data for insertion
    const entriesToInsert = dataEntries.map(entry => ({
      type: entry.type,
      name: entry.name.toUpperCase(),
      category: entry.category,
      month: entry.month,
      year: entry.year || new Date().getFullYear(), // Use provided year or current year
      saleStatus: entry.type === 'Sitemap' ? entry.saleStatus : null
    }));

    // Insert multiple documents
    const result = await Data.insertMany(entriesToInsert);

    res.json({ message: 'Data added successfully!', data: result });
  } catch (error) {
    console.error('Error adding multiple data entries', error);
    res.status(500).json({ error: 'Failed to add multiple data entries' });
  }
};

export const viewAllData = async (req, res) => {
  try {
    const data = await Data.aggregate([
      {
        $addFields: {
          monthIndex: {
            $indexOfArray: [
              ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              "$month"
            ]
          },
          typeIndex: {
            $indexOfArray: [
              ["Change Request", "Sitemap", "Cms Training"],
              "$type"
            ]
          },
          wdIrIndex: {
            $indexOfArray: [
              ["WD", "IR"],
              "$category" // Assuming the category field indicates WD or IR
            ]
          }
        }
      },
      {
        $sort: {
          monthIndex: 1,   // จัดเรียงตามเดือน
          typeIndex: 1,    // จัดเรียงตามประเภทงาน
          wdIrIndex: 1,    // จัดเรียงตามประเภทภายใน WD หรือ IR
        }
      },
      {
        $project: {
          monthIndex: 0,
          typeIndex: 0,
          wdIrIndex: 0
        }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

export const viewSummary = async (req, res) => {
  try {
    const totalChangeRequests = await Data.countDocuments({ type: 'Change Request' });
    const totalSitemaps = await Data.countDocuments({ type: 'Sitemap' });
    const totalCmsTrainings = await Data.countDocuments({ type: 'CMS Training' });

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

export const viewSummaryByMonth = async (req, res) => {
  try {
    // Aggregate to calculate the monthly summary
    const monthlySummary = await Data.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            month: '$month',
            year: '$year',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            month: '$_id.month',
            year: '$_id.year',
          },
          data: {
            $push: {
              type: '$_id.type',
              count: '$count',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $indexOfArray: [
              ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              "$_id.month"
            ]
          },
          year: "$_id.year",
          date: { $concat: [ { $substr: ["$_id.month", 0, 3] }, " ", { $substr: ["$_id.year", 2, 2] } ] },
          data: 1,
        },
      },
      {
        $addFields: {
          "Change Requests": {
            $let: {
              vars: {
                item: { $arrayElemAt: [ { $filter: { input: "$data", as: "item", cond: { $eq: ["$$item.type", "Change Request"] } } }, 0 ] },
              },
              in: { $ifNull: [ "$$item.count", 0 ] },
            },
          },
          "Sitemaps": {
            $let: {
              vars: {
                item: { $arrayElemAt: [ { $filter: { input: "$data", as: "item", cond: { $eq: ["$$item.type", "Sitemap"] } } }, 0 ] },
              },
              in: { $ifNull: [ "$$item.count", 0 ] },
            },
          },
          "CMS Trainings": {
            $let: {
              vars: {
                item: { $arrayElemAt: [ { $filter: { input: "$data", as: "item", cond: { $eq: ["$$item.type", "CMS Training"] } } }, 0 ] },
              },
              in: { $ifNull: [ "$$item.count", 0 ] },
            },
          },
        },
      },
      {
        $project: {
          data: 0,
        },
      },
      {
        $sort: {
          year: 1,     // จัดเรียงตามปี
          month: 1,    // จัดเรียงตามเดือน
        },
      },
    ]);

    // Calculate cumulative data
    const cumulativeData = [];
    let cumulative = {
      "Change Requests": 0,
      "Sitemaps": 0,
      "CMS Trainings": 0,
    };

    for (const entry of monthlySummary) {
      cumulative["Change Requests"] += entry["Change Requests"];
      cumulative["Sitemaps"] += entry["Sitemaps"];
      cumulative["CMS Trainings"] += entry["CMS Trainings"];

      cumulativeData.push({
        date: entry.date,
        "Change Requests": cumulative["Change Requests"],
        "Sitemaps": cumulative["Sitemaps"],
        "CMS Trainings": cumulative["CMS Trainings"],
      });
    }

    res.json(cumulativeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewTotalByMonth = async (req, res) => {
  try {
    // ใช้ Aggregation เพื่อคำนวณจำนวนข้อมูลรายเดือน
    const monthlySummary = await Data.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            month: '$month',
            year: '$year',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            month: '$_id.month',
            year: '$_id.year',
          },
          data: {
            $push: {
              type: '$_id.type',
              count: '$count',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $indexOfArray: [
              ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              "$_id.month"
            ]
          },
          year: "$_id.year",
          date: { $concat: [ { $substr: ["$_id.month", 0, 3] }, " ", { $substr: ["$_id.year", 2, 2] } ] },
          data: 1,
        },
      },
      {
        $addFields: {
          "Change Requests": {
            $let: {
              vars: {
                item: { $arrayElemAt: [ { $filter: { input: "$data", as: "item", cond: { $eq: ["$$item.type", "Change Request"] } } }, 0 ] },
              },
              in: { $ifNull: [ "$$item.count", 0 ] },
            },
          },
          "Sitemaps": {
            $let: {
              vars: {
                item: { $arrayElemAt: [ { $filter: { input: "$data", as: "item", cond: { $eq: ["$$item.type", "Sitemap"] } } }, 0 ] },
              },
              in: { $ifNull: [ "$$item.count", 0 ] },
            },
          },
          "CMS Trainings": {
            $let: {
              vars: {
                item: { $arrayElemAt: [ { $filter: { input: "$data", as: "item", cond: { $eq: ["$$item.type", "CMS Training"] } } }, 0 ] },
              },
              in: { $ifNull: [ "$$item.count", 0 ] },
            },
          },
        },
      },
      {
        $project: {
          data: 0,
        },
      },
      {
        $sort: {
          year: 1,     // จัดเรียงตามปี
          month: 1,    // จัดเรียงตามเดือน
        },
      },
    ]);

    res.json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewSummaryByType = async (req, res) => {
  try {
    // ใช้ Aggregation เพื่อคำนวณจำนวนรวมของแต่ละประเภท
    const summaryByType = await Data.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$total"
        }
      }
    ]);

    // ลำดับที่ต้องการ
    const order = ["Change Request", "Sitemap", "CMS Training"];

    // แปลงชื่อให้ตรงตามที่ต้องการ
    const formattedSummary = summaryByType.map(entry => {
      let formattedName = entry.name;

      if (entry.name === "CMS Training") {
        formattedName = "CMS Training";
      } else if (entry.name === "Change Request") {
        formattedName = "Change Request";
      } else if (entry.name === "Sitemap") {
        formattedName = "Sitemap";
      }

      return {
        name: formattedName,
        value: entry.value
      };
    });

    // จัดเรียงข้อมูลตามลำดับที่กำหนด
    const sortedSummary = formattedSummary.sort((a, b) => {
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

    // ส่งผลลัพธ์ที่เรียงตามลำดับที่กำหนด
    res.json(sortedSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewSummaryByTypeAndCategory = async (req, res) => {
  try {
    // ใช้ Aggregation เพื่อคำนวณจำนวนรวมของแต่ละประเภท และแยกตามหมวดหมู่
    const summaryByType = await Data.aggregate([
      {
        $group: {
          _id: { type: "$type", category: "$category" },
          total: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.type",
          value_wd: {
            $sum: {
              $cond: [{ $eq: ["$_id.category", "WD"] }, "$total", 0]
            }
          },
          value_ir: {
            $sum: {
              $cond: [{ $eq: ["$_id.category", "IR"] }, "$total", 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value_wd: 1,
          value_ir: 1
        }
      },
      {
        $sort: {
          name: 1 // จัดเรียงตามชื่อประเภท
        }
      }
    ]);

    // ลำดับที่ต้องการ
    const order = ["Change Request", "Sitemap", "CMS Training"];

    // จัดเรียงข้อมูลตามลำดับที่กำหนด
    const sortedSummary = summaryByType.sort((a, b) => {
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

    // ส่งผลลัพธ์ที่เรียงตามลำดับที่กำหนด
    res.json(sortedSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export const deleteAllData = async (req, res) => {
  const { password } = req.body;

  try {
    // Get valid passwords from the database
    const validPasswords = await Password.find();
    const passwordExists = validPasswords.some(pwd => pwd.password === password);

    if (!passwordExists) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Delete all documents in the Data collection
    await Data.deleteMany({});

    res.json({ message: 'All data has been successfully deleted!' });
  } catch (error) {
    console.error('Error deleting all data', error);
    res.status(500).json({ error: 'Failed to delete all data' });
  }
};
