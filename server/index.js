const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const emailjs = require('@emailjs/nodejs');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    emailjs.send(
        process.env.SERVICE_ID,
        process.env.TEMP_ID,
        {
            from_name: name,
            reply_to: email,
            subject: subject,
            message: message
        },
        process.env.EMAILJS_PUBLIC_KEY
    ).then(result => {
        res.status(200).send({ success: true });
    }).catch(error => {
        res.status(500).send({ success: false, error });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
