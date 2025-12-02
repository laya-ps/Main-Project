import db from '../config/db.js'



export const addPlotOwner = (req,res)=>{
    const { name, email, password, phone  } = req.body;
  const userType ='Plot Owner'
    const sql = "INSERT INTO users (name, email, password, phone_number, user_type) VALUES ( ?, ?, ?, ?, ?)";
    const values = [name, email, password, phone, userType];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding staff:', err);
        res.status(500).json({ error: 'Error adding staff' });
        return;
      }
      console.log('Staff added successfully');
      res.status(200).json({ message: 'Staff added successfully' });
    });
}

export const addUser = (req,res)=>{
  const { name, email, password, phone} = req.body;
  const userType ='User'

  const sql = "INSERT INTO users (name, email, password, phone_number, user_type) VALUES ( ?, ?, ?, ?, ?)";
  const values = [name, email, password, phone, userType];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding User:', err);
      res.status(500).json({ error: 'Error adding User' });
      return;
    }
    console.log('User added successfully');
    res.status(200).json({ message: 'User added successfully' });
  });
}

export const addSeats = (req, res) => {
  const { totalSeats } = req.body;

  // Query to get the last added table and seat number
  const getLastSeatQuery = 'SELECT table_number, seat_number FROM seats ORDER BY id DESC LIMIT 1';

  db.query(getLastSeatQuery, (err, results) => {
    if (err) {
      console.error('Error fetching last seat:', err);
      res.status(500).json({ error: 'Error fetching last seat' });
      return;
    }

    // Determine the starting table and seat number
    let lastTableNumber = 0;
    let lastSeatNumber = 0;

    if (results.length > 0) {
      lastTableNumber = results[0].table_number;
      lastSeatNumber = results[0].seat_number;
    }

    const maxSeatsPerTable = 6;
    const values = [];

    for (let i = 0; i < totalSeats; i++) {
      if (lastSeatNumber === maxSeatsPerTable) {
        // Move to the next table
        lastTableNumber++;
        lastSeatNumber = 1;
      } else {
        // Increment the seat number
        lastSeatNumber++;
      }
      values.push([lastTableNumber, lastSeatNumber, 'available']);
    }

    // Insert new seats into the database
    const insertSeatsQuery = 'INSERT INTO seats (table_number, seat_number, status) VALUES ?';

    db.query(insertSeatsQuery, [values], (err, result) => {
      if (err) {
        console.error('Error adding seats:', err);
        res.status(500).json({ error: 'Error adding seats' });
        return;
      }
      res.status(200).json({ success: true, message: 'Seats added successfully' });
    });
  });
};

export const addPlotWithSlots = async (req, res) => {
  const { ownerId, location, locationUrl, vehicleTypes } = req.body;
  console.log(req.body, "Body");

  // Calculate total slots
  let totalSlots = 0;
  Object.values(vehicleTypes).forEach(type => {
    totalSlots += parseInt(type.slots);
  });

  // Insert plot details
  try {
    const insertPlotQuery = 'INSERT INTO plots (owner_id, location, location_url, total_slots, vehicle_types) VALUES (?, ?, ?, ?, ?)';
    db.query(insertPlotQuery, [ownerId, location, locationUrl, totalSlots, JSON.stringify(vehicleTypes)], (err, result) => {
      if (err) {
        console.error('Error adding plot details:', err);
        return res.status(500).json({ error: 'Error adding plot details' });
      }

      const plotId = result.insertId;
      const values = [];

      Object.keys(vehicleTypes).forEach(vehicleType => {
        const { slots, price } = vehicleTypes[vehicleType];
        
        for (let i = 1; i <= slots; i++) {
          values.push([plotId, vehicleType, i, price]);
        }
      });

      const insertSlotsQuery = 'INSERT INTO plot_slots (plot_id, vehicle_type, slot_number, price) VALUES ?';
      db.query(insertSlotsQuery, [values], (err, result) => {
        if (err) {
          console.error('Error adding plot slots:', err);
          return res.status(500).json({ error: 'Error adding plot slots' });
        }

        res.status(200).json({ success: true, message: 'Plot and slots added successfully' });
      });
    });
  } catch (error) {
    console.error('Error in addPlotWithSlots function:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export const bookSlot = (req, res) => {
  const { slot_id, plot_id, booking_date, time_slot, user_id, vehicle_type,vehicle_number, location, price } = req.body;
console.log(req.body);

  const sql = `
    INSERT INTO slot_bookings (
      slot_id, plot_id, booking_date, time_slot, user_id, vehicle_type,vehicle_number, location, price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [slot_id, plot_id, booking_date, time_slot, user_id, vehicle_type,vehicle_number, location, price];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error booking slot:', err);
      res.status(500).json({ error: 'Error booking slot' });
      return;
    }

    console.log('Slot booked successfully:', result);
    res.status(200).json({ message: 'Slot booked successfully', booking_id: result.insertId });
  });
};





