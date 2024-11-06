const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use('/api', limiter);

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Login attempt recorded',
            timestamp: new Date().toISOString()
        });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});