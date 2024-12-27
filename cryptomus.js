const crypto = require('crypto');
const axios = require('axios');

class Cryptomus {
    constructor(merchantId, paymentKey) {
        this.merchantId = merchantId;
        this.paymentKey = paymentKey;
        this.apiUrl = 'https://api.cryptomus.com/v1';
    }

    createSignature(payload) {
        const data = Buffer.from(JSON.stringify(payload)).toString('base64');
        return crypto.createHash('md5').update(data + this.paymentKey).digest('hex');
    }

    async createPayment(options) {
        const payload = {
            merchant_id: this.merchantId,
            order_id: options.orderId,
            amount: options.amount,
            currency: options.currency || 'USD',
            network: options.network || 'ETH',
            url_callback: options.callbackUrl,
            url_return: options.returnUrl,
            is_payment_multiple: false,
            lifetime: options.lifetime || 3600,
            to_currency: options.toCurrency || 'ETH'
        };

        const sign = this.createSignature(payload);

        try {
            const response = await axios.post(`${this.apiUrl}/payment`, payload, {
                headers: {
                    'merchant': this.merchantId,
                    'sign': sign
                }
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async getPaymentStatus(orderId) {
        const payload = {
            merchant_id: this.merchantId,
            order_id: orderId
        };

        const sign = this.createSignature(payload);

        try {
            const response = await axios.post(`${this.apiUrl}/payment/status`, payload, {
                headers: {
                    'merchant': this.merchantId,
                    'sign': sign
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Payment status query error: ${error.message}`);
        }
    }

    async testWebhook(payload) {
        const sign = this.createSignature(payload);

        try {
            const response = await axios.post(`${this.apiUrl}/test-webhook/payment`, payload, {
                headers: {
                    'merchant': this.merchantId,
                    'sign': sign
                }
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Test webhook error: ${error.message}`);
        }
    }

    verifyWebhook(payload, signature) {
        if (payload?.sign) delete payload.sign;
        const data = Buffer.from(JSON.stringify(payload)).toString('base64');
        const hash = crypto.createHash('md5').update(data + this.paymentKey).digest('hex');
        return hash === signature;
    }
}

module.exports = Cryptomus;
