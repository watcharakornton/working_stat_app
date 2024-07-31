import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const path = process.env.DATA_FILE;

export const loadData = () => {
	if (fs.existsSync(path)) {
		const rawData = fs.readFileSync(path);
		return JSON.parse(rawData);
	}
	return {changeRequests: [], sitemaps: [], cmsTrainings: []};
};

export const saveData = (data) => {
	fs.writeFileSync(path, JSON.stringify(data, null, 2));
};
