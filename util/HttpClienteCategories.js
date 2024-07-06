import axios from "axios";
const URL = "https://login-g-50d70-default-rtdb.firebaseio.com";

const getCategory = async () => {
  const category = [];
  const response = await axios.get(`${URL}/category.json`);

  for (const key in response.data) {
    category.push({
      id: key,
      namecategory: response.data[key].namecategory,
    });
  }
  return category;
};

const addCategory = async (category) => {
  const response = await axios.post(`${URL}/category.json`, category);
  const id = response.data.namecategory;
  return id;
};

const updateCategory = (id, category) => {
  return axios.put(`${URL}/category/${id}.json`, category);
};

const deleteCategory = (id) => {
  return axios.delete(`${URL}/category/${id}.json`);
};

export { getCategory, addCategory, updateCategory, deleteCategory };