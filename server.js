const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fitnessSolutions')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// POST endpoint to handle contact form submissions
app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    const newContact = new Contact({ name, email, phone, message });

    try {
        await newContact.save();
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});