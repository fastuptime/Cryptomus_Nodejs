const express = require('express');
const bodyParser = require('body-parser');
const Cryptomus = require('./cryptomus');

const app = express();
app.use(require('multer')().none());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Cryptomus with your credentials
const cryptomus = new Cryptomus('YOUR_MERCHANT_ID', 'YOUR_PAYMENT_KEY');

// Webhook endpoint
app.post('/webhook', (req, res) => {
    const isValid = cryptomus.verifyWebhook(req.body, req.body.sign);
    if (isValid) {
        // Handle the webhook
        console.log('Valid webhook received:', req.body);
        res.status(200).send('OK');
    } else {
        res.status(400).send('Invalid signature');
    }
});

// Example payment creation endpoint
app.post('/create-payment', async (req, res) => {
    try {
        const payment = await cryptomus.createPayment({
            orderId: Math.random().toString(36).substring(7),
            amount: req.body.amount,
            currency: req.body.currency || 'USD',
            network: req.body.network || 'ETH',
            callbackUrl: 'https://your-domain.com/webhook',
            returnUrl: 'https://your-domain.com/return'
        });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
