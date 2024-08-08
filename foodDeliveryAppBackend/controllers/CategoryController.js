const Category = require('../modals/Category');

// Function to fetch all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new category
const createCategory = async (req, res) => {
  const { name, image } = req.body;

  if (!name || !image) {
    return res.status(400).json({ message: 'Name and image are required' });
  }

  const category = new Category({
    name,
    image,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
