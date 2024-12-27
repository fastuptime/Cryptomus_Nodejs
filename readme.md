# 💎 Cryptomus NodeJS Integration

A powerful Node.js integration for the Cryptomus payment system, enabling seamless cryptocurrency payments in your applications! 🚀

## ✨ Features

- 💳 Create cryptocurrency payments with ease
- 📊 Real-time payment status tracking
- 🔔 Secure webhook handling with signature verification
- 🧪 Built-in webhook testing functionality
- 🌐 Support for multiple cryptocurrencies and networks

## 🚀 Installation

```bash
npm install axios crypto express body-parser multer
```

## ⚙️ Configuration

Create a `.env` file in your project root and add your Cryptomus credentials:

```env
MERCHANT_ID=your_merchant_id
PAYMENT_KEY=your_payment_key
```

## 📘 Usage

### 🔑 Initialize Cryptomus

```javascript
const Cryptomus = require('./cryptomus');
const cryptomus = new Cryptomus(process.env.MERCHANT_ID, process.env.PAYMENT_KEY);
```

### 💰 Create a Payment

```javascript
const payment = await cryptomus.createPayment({
    orderId: 'unique_order_id',
    amount: '100',
    currency: 'USD',
    network: 'ETH',
    callbackUrl: 'https://your-domain.com/webhook',
    returnUrl: 'https://your-domain.com/return'
});
```

### 🔍 Check Payment Status

```javascript
const status = await cryptomus.getPaymentStatus('order_id');
```

### 📡 Handle Webhooks

```javascript
app.post('/webhook', (req, res) => {
    const isValid = cryptomus.verifyWebhook(req.body, req.body.sign);
    if (isValid) {
        // Handle the webhook
        console.log('Valid webhook received:', req.body);
        res.status(200).send('OK');
    }
});
```

### 🧪 Test Webhook

```javascript
const webhook = await cryptomus.testWebhook({
    uuid: 'test-uuid',
    currency: 'ETH',
    url_callback: 'https://your-domain.com/webhook',
    network: 'eth',
    status: 'paid'
});
```

## 📦 Webhook Payload Example

```javascript
{
    type: 'payment',
    uuid: 'payment-uuid',
    order_id: 'order-id',
    amount: '100',
    payment_amount: '100',
    payment_amount_usd: '100',
    merchant_amount: '98',
    commission: '2',
    is_final: true,
    status: 'paid',
    network: 'eth',
    currency: 'ETH',
    payer_currency: 'ETH',
    payer_amount: '0.05',
    txid: 'transaction-id',
    sign: 'webhook-signature'
}
```

## 🔒 Security Best Practices

- 🛡️ Always verify webhook signatures
- 🔐 Store credentials in environment variables
- 🌐 Use HTTPS for all callback URLs
- ⚠️ Implement proper error handling and logging
- 🔍 Regularly monitor transaction status

## 🤝 Contributing

We love your input! Here's how you can contribute:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. ✍️ Commit your changes (`git commit -am 'Add some amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🎉 Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Support

Like this project? Give it a ⭐️ to show your support!

## 🤔 Questions?

Having troubles? Check out our [issues](https://github.com/fastuptime/Cryptomus_Nodejs/issues) page or create a new issue!

---
Made with ❤️ by [FastUptime & SpeedSMM % QuickPos]
