import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/users.js';
import restaurantRoutes from './routes/restaurants.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';

dotenv.config();
//connect to MongoDB
mongoose.connect('mongodb+srv://DPdPBNfeciiWuGSL:DPdPBNfeciiWuGSL@cluster0.hds3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const app = express();
app.use(express.json());

//routes 
app.use('/users', userRoutes);
app.use('/restaurants',restaurantRoutes);
app.use('/menu',menuRoutes);
app.use('/orders',orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
