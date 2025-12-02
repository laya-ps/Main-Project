import db from "../config/db.js";

export const deleteStaff = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Missing staff ID' });
    }

    const sql = "DELETE FROM users WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting staff:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Staff deleted');
        res.status(200).json({ message: "User deleted successfully" });
    });
};

export const deletePlot = (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    

    if (!id) {
        return res.status(400).json({ error: 'Missing plot ID' });
    }

    // First delete slots related to the plot
    const deleteSlotsQuery = "DELETE FROM plot_slots WHERE plot_id = ?";
    db.query(deleteSlotsQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting plot slots:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Once slots are deleted, delete the plot
        const deletePlotQuery = "DELETE FROM plots WHERE plot_id = ?";
        db.query(deletePlotQuery, [id], (err, result) => {
            if (err) {
                console.error('Error deleting plot:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log('Plot and associated slots deleted');
            res.status(200).json({ message: "Plot and associated slots deleted successfully" });
        });
    });
};


export const deleteProduct = (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Missing product ID' });
    }

    const sql = "DELETE FROM products WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Product deleted');
        res.status(200).json({ message: "Product deleted successfully" });
    });
};
export const deleteTable = (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    
    if (!id) {
        return res.status(400).json({ error: 'Missing table ID' });
    }

    const sql = "DELETE FROM seats WHERE table_number = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting Table:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Table deleted');
        res.status(200).json({ message: "Table deleted successfully" });
    });
};
