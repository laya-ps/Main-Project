import express from 'express';
import cors from 'cors';
import addRoutes from './routes/addRoute.js'
import authRoutes from './routes/authRoutes.js'
import getRoutes from './routes/getRoute.js'
import deleteRoutes from './routes/deleteRoute.js'
import updateRoutes from './routes/updateRoute.js'
import multer from "multer";
import db from './config/db.js';// Ensure the path to db.js is correct
import path from "path";
import { getAllproducts } from './controllers/getServices.js';

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:['GET , POST ,PUT','DELETE'],
        credentials:true
      }
      ))
      
app.use('/api/auth',authRoutes)
app.use('/api/add', addRoutes)
app.use('/api/get', getRoutes)
app.use('/api/update', updateRoutes)
app.use('/api/delete', deleteRoutes)



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../canteen/src/uploads'); // Save uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp + file extension as filename
    }
  });
  
const upload = multer({ storage: storage });




app.post('/addProduct', upload.single('productImage'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "No image file uploaded." });
        return;
    }

    const { productName, category, price, quantity } = req.body;  
    // Get only the filename without the path
    const imagePath = req.file.filename;

    const sql = "INSERT INTO products (name, category, price, quantity, image_url) VALUES (?, ?, ?, ?, ?)";
    const values = [productName, category, price, quantity, imagePath];  
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding service:', err);
            res.status(500).json({ error: 'Error adding service' });
            return;
        }
        console.log('Service added successfully');
        res.status(200).json({ message: 'Service added successfully' });
    });
});
// Import necessary modules and configurations

app.post('/updateProduct', upload.single('productImage'), (req, res) => {
  if (!req.file) {
      res.status(400).json({ message: "No image file uploaded." });
      return;
  }

  const { productName,  price, quantity, id } = req.body;  
  const imagePath = req.file.filename;

  const sql = "UPDATE products SET name = ?,  price = ?, quantity = ?, image_url = ? WHERE id = ?";
  const values = [productName, price, quantity, imagePath, id];  

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error updating product:', err);
          res.status(500).json({ error: 'Error updating product' });
          return;
      }
      console.log('Product updated successfully');
      res.status(200).json({ message: 'Product updated successfully' });
  });
});



app.listen(8081, () => {
  console.log('Server is running');
});
