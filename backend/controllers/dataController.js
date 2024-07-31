import { loadData, saveData } from '../utils/dataUtils.js';

export const addData = (req, res) => {
    const { type, name, category, month, saleStatus } = req.body;

    if (!['Change Request', 'Sitemap', 'Cms Training'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    const data = loadData();
    const newEntry = {
        name: name.toUpperCase(),
        category,
        month,
        year: new Date().getFullYear(),
        saleStatus: type === 'Sitemap' ? saleStatus : null
    };

    switch (type) {
        case 'Change Request':
            data.changeRequests.push(newEntry);
            break;
        case 'Sitemap':
            data.sitemaps.push(newEntry);
            break;
        case 'Cms Training':
            data.cmsTrainings.push(newEntry);
            break;
    }

    saveData(data);
    res.json({ message: 'เพิ่มข้อมูลสำเร็จ!', data: newEntry });
};

export const viewAllData = (req, res) => {
    const data = loadData();
    res.json(data);
};

export const viewSummary = (req, res) => {
    const data = loadData();
    const summary = {
        totalChangeRequests: data.changeRequests.length,
        totalSitemaps: data.sitemaps.length,
        totalCmsTrainings: data.cmsTrainings.length
    };
    res.json(summary);
};

export const editData = (req, res) => {
    const { type, index, name, category, month, saleStatus } = req.body;

    if (!['Change Request', 'Sitemap', 'Cms Training'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    const data = loadData();
    let items;

    switch (type) {
        case 'Change Request':
            items = data.changeRequests;
            break;
        case 'Sitemap':
            items = data.sitemaps;
            break;
        case 'Cms Training':
            items = data.cmsTrainings;
            break;
    }

    if (index < 0 || index >= items.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    const item = items[index];
    item.name = name.toUpperCase() || item.name;
    item.category = category || item.category;
    item.month = month || item.month;

    if (type === 'Sitemap') {
        item.saleStatus = saleStatus || item.saleStatus;
    }

    saveData(data);
    res.json({ message: 'แก้ไขข้อมูลสำเร็จ!', data: item });
};

export const deleteData = (req, res) => {
    const { type, index, password } = req.body;

    if (password !== process.env.DELETE_PASSWORD) {
        return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง!' });
    }

    if (!['Change Request', 'Sitemap', 'Cms Training'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    const data = loadData();
    let items;

    switch (type) {
        case 'Change Request':
            items = data.changeRequests;
            break;
        case 'Sitemap':
            items = data.sitemaps;
            break;
        case 'Cms Training':
            items = data.cmsTrainings;
            break;
    }

    if (index < 0 || index >= items.length) {
        return res.status(400).json({ error: 'Invalid index' });
    }

    items.splice(index, 1);
    saveData(data);
    res.json({ message: 'ลบข้อมูลสำเร็จ!' });
};
