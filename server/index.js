const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const emailjs = require('@emailjs/nodejs');

dotenv.config();

// Initialize EmailJS with your keys
emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY, // You need to add this to your environment variables
});

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://portfolio-sharmaayush1009s-projects.vercel.app'
}));

app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        console.log('Received request:', { name, email, subject });
        console.log('Environment check:', {
            serviceId: !!process.env.SERVICE_ID,
            tempId: !!process.env.TEMP_ID,
            publicKey: !!process.env.EMAILJS_PUBLIC_KEY,
            privateKey: !!process.env.EMAILJS_PRIVATE_KEY
        });

        const result = await emailjs.send(
            process.env.SERVICE_ID,
            process.env.TEMP_ID,
            {
                from_name: name,
                reply_to: email,
                subject: subject,
                message: message
            }
        );
        
        console.log('Email sent successfully:', result);
        res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));