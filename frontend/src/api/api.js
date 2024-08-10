import axios from 'axios'

export const getData = async (path) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}${path}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data: ', error);
  };
};

export const postData = async (path, data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}${path}`, data)
    return response.data
  } catch (error) {
    console.error('Error adding data: ', error);
  }
}

export const deleteData = async (path, id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}${path}/?id=${id}`) ;
    return response.data
  } catch (error) {
    console.error('Error deleting data: ', error);
  }
}

export const updateData = async (path, id, data) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}${path}/?id=${id}`, data);
    return response.data
  } catch (error) {
    console.error('Error editing data: ', error);
  }
}
