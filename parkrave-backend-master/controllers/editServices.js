import db from "../config/db.js";


export const updateUser = (req, res) => {
    const { id, name, email, password, phone_number, address, location } = req.body;

    const sql = "UPDATE users SET name = ?, email = ?, password = ?, phone_number = ?, address = ?, location = ? WHERE id = ?";
    const values = [name, email, password, phone_number, address, location,  id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating staff:', err);
            res.status(500).json({ error: 'Error updating staff' });
            return;
        }
        console.log('Staff updated successfully');
        res.status(200).json({ message: 'Staff updated successfully' });
    });
}

export const UpdateUserStatus = (req, res) => {
    const { id, status} = req.body;
    console.log(req.body)
    
    const sql = "UPDATE users SET status = ?  WHERE id = ?";
    const values = [  status,id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating staff:', err);
            res.status(500).json({ error: 'Error updating staff' });
            return;
        }
        console.log('Staff status updated successfully');
        res.status(200).json({ message: 'Status updated successfully' });
    });
}