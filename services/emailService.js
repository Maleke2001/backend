import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOrderConfirmation = async (order, userEmail) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Order Confirmation #${order._id}`,
        html: `
            <h1>Thank you for your order!</h1>
            <p>Order ID: ${order._id}</p>
            <p>Total: $${order.totalPrice}</p>
            <h2>Items:</h2>
            ${order.orderItems.map(item => `
                <div>
                    <p>${item.name} - Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price}</p>
                </div>
            `).join('')}
        `
    };

    await transporter.sendMail(mailOptions);
};