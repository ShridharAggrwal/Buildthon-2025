import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Guardian Number Schema
const guardianSchema = new mongoose.Schema({
    guardianNumber: {
        type: String,
        required: true,
    }
});

const Guardian = mongoose.model('Guardian', guardianSchema);

// API Endpoint to store Guardian Number
app.post('/api/guardian', async (req, res) => {
    try {
        console.log('Received request:', req.body); // Debugging log

        const { guardianNumber } = req.body;

        if (!guardianNumber) {
            return res.status(400).json({ message: 'Guardian Number is required' });
        }

        const newGuardian = new Guardian({ guardianNumber });
        await newGuardian.save();

        res.status(201).json({ message: 'Guardian Number saved successfully' });
    } catch (error) {
        console.error('Error saving guardian number:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
