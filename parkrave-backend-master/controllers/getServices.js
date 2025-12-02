import db from "../config/db.js";

export const getStaff = (req,res)=>{
    const { userType } = req.body;

    const sql = "Select * from users where user_type =  ?";
    const values = [userType];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error getting staff:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      console.log('Staff retrieved');
      res.status(200).json({ data:result });
    });
}

export const getAllproducts = (req,res)=>{
    const sql = "Select * from products ";
    db.query(sql,(err, result) => {
      if (err) {
        console.error('Error getting products:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
    });
}
export const getAllPlots = (req,res)=>{
    const sql = "Select * from plots ";
    db.query(sql,(err, result) => {
      if (err) {
        console.error('Error getting plots:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
    });
}
export const getPlotSlotsByIdAndType = (req, res) => {
  const { plot_id, vehicle_type } = req.query; // Read from req.query
  console.log(req.query);
  

  const sql = "SELECT * FROM plot_slots WHERE plot_id = ? AND vehicle_type = ?";

  db.query(sql, [plot_id, vehicle_type], (err, result) => {
    if (err) {
      console.error("Error retrieving plot slots:", err);
      res.status(500).json({ error: "Error retrieving plot slots." });
      return;
    }
    res.status(200).json({ data: result });
  });
};

export const getOwnerPlots = (req,res)=>{
  const {id} = req.params
    const sql = "Select * from plots where owner_id =? ";
    db.query(sql,[id],(err, result) => {
      if (err) {
        console.error('Error getting plots:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
    });
}
export const getAllseats = (req,res)=>{
    const sql = "Select * from seats ";
    db.query(sql,(err, result) => {
      if (err) {
        console.error('Error getting seats:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      res.status(200).json({ data:result });
    });
}

export const getAllUsers = (req,res)=>{
    const sql = "Select * from users ";
    db.query(sql,(err, result) => {
      if (err) {
        console.error('Error getting products:', err);
        res.status(500).json({ error: 'Error ' });
        return;
      }
      // console.log('all users successfully ');
      res.status(200).json({ data:result });
    });
}



export const getAllSlotBookings = (req, res) => {
  const bookingquery = "SELECT * FROM slot_bookings";

  db.query(bookingquery, (error, results) => {
    if (error) {
      console.error('Error retrieving bookings:', error);
      res.status(500).json({ error: 'Error retrieving bookings' });
      return;
    }

    res.status(200).json({ data:results });
  });
};

