

const express = require('express');



const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const mysql = require('mysql');
const cors = require('cors');
//app.use(cors()); // Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3005'
}));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'task',
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to the database');
    }
});



// Get all tasks
app.get('/api/GetAllTasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Its not working' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/tasks1', (req, res) => {
    res.json("Hello")
});



app.post('/api/CreateTasks', async (req, res) => {
    try {
        const query = 'INSERT INTO tasks SET ?';
        // Execute the insert query
        connection.query(query, req.body, (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
            } else {
                console.log('Data inserted successfully');
                console.log('Inserted ID:', results.insertId);
            }

            // Close the connection to the MySQL server
            res.status(201).json(results.insertId);
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the task' });
    }
});


app.put('/api/UpdateTasks:inputId', async (req, res) => {
    try {
        const query = 'UPDATE tasks SET ? WHERE id = ?';
        const inputId = req.params.inputId.replace(':', '');
        // Execute the update query
        connection.query(query, [req.body, inputId], (error, results) => {
            if (error) {
                console.error('Error updating record:', error);
            } else {
                console.log('Record updated successfully');
                console.log('Affected rows:', results.affectedRows);
            }

            // Close the connection to the MySQL server
            res.status(201).json(req.params.id);
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the task' });
    }
});


// Delete a task by ID
app.delete('/api/DeleteTasks:inputId', async (req, res) => {
    try {
        const query = 'DELETE FROM tasks WHERE id = ?';
        const inputId = req.params.inputId.replace(':', '');
        // Execute the update query
        connection.query(query, [inputId], (error, results) => {
            if (error) {
                console.error('Error updating record:', error);
            } else {
                console.log('Record deleted successfully');
                console.log('Affected rows:', results.affectedRows);
            }

            // Close the connection to the MySQL server
            res.status(201).json(req.params.id);
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the task' });
    }
});

