import Menu from '../models/Menu.js';
import Restaurant from '../models/Restaurant.js';

// @desc Add a new menu item
// @route POST /restaurants/:restaurantId/menu
// @access Private (Admin/Owner)
export const addMenuItem = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (restaurant) {
      const menuItem = new Menu({
        restaurant: req.params.restaurantId,
        name,
        price,
        description,
      });

      const createdMenuItem = await menuItem.save();
      res.status(201).json(createdMenuItem);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create menu item' });
  }
};

// @desc Get all menu items for a restaurant
// @route GET /restaurants/:restaurantId/menu
// @access Public
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find({ restaurant: req.params.restaurantId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items' });
  }
};

// @desc Update menu item
// @route PUT /restaurants/:restaurantId/menu/:menuItemId
// @access Private (Admin/Owner)
export const updateMenuItem = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const menuItem = await Menu.findById(req.params.menuItemId);

    if (menuItem) {
      menuItem.name = name || menuItem.name;
      menuItem.price = price || menuItem.price;
      menuItem.description = description || menuItem.description;

      const updatedMenuItem = await menuItem.save();
      res.json(updatedMenuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update menu item' });
  }
};

// @desc Delete menu item
// @route DELETE /restaurants/:restaurantId/menu/:menuItemId
// @access Private (Admin/Owner)
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.menuItemId);

    if (menuItem) {
      await menuItem.remove();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete menu item' });
  }
};
