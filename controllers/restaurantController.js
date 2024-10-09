import Restaurant from '../models/Restaurant.js';

// @desc Add a new restaurant
// @route POST /restaurants
// @access Private (Admin only)
export const addRestaurant = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    const restaurant = new Restaurant({
      name,
      address,
      phone,
      owner: req.user._id, // The admin/owner creating the restaurant
    });

    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create restaurant' });
  }
};

// @desc Get all restaurants
// @route GET /restaurants
// @access Public
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};

// @desc Get restaurant by ID
// @route GET /restaurants/:restaurantId
// @access Public
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch restaurant' });
  }
};

// @desc Update restaurant
// @route PUT /restaurants/:restaurantId
// @access Private (Admin/Owner)
export const updateRestaurant = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (restaurant) {
      restaurant.name = name || restaurant.name;
      restaurant.address = address || restaurant.address;
      restaurant.phone = phone || restaurant.phone;

      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update restaurant' });
  }
};

// @desc Delete restaurant
// @route DELETE /restaurants/:restaurantId
// @access Private (Admin/Owner)
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (restaurant) {
      await restaurant.remove();
      res.json({ message: 'Restaurant removed' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete restaurant' });
  }
};
