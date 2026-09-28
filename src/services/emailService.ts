import emailjs from '@emailjs/browser';

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;

// Initialize EmailJS with the public key if configured
if (publicKey && publicKey !== 'your_public_key_here') {
  emailjs.init({ publicKey });
}

export interface OrderDetails {
  orderId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  paymentMethod: string;
  itemsList: string;
  subtotal: string;
  shipping: string;
  total: string;
}

export const sendOrderToAdmin = async (orderDetails: OrderDetails) => {
  if (!serviceId || !adminTemplateId || serviceId === 'your_service_id_here' || adminTemplateId === 'your_admin_template_id_here') {
    console.warn('EmailJS admin credentials are not set in .env. Skipping admin email dispatch.');
    return;
  }
  
  try {
    const params = {
      order_id: orderDetails.orderId || 'ORD-NEW',
      customer_name: orderDetails.customerName,
      name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      email: orderDetails.customerEmail,
      customer_phone: orderDetails.customerPhone,
      phone: orderDetails.customerPhone,
      customer_city: orderDetails.customerCity,
      city: orderDetails.customerCity,
      customer_address: orderDetails.customerAddress,
      address: orderDetails.customerAddress,
      payment_method: orderDetails.paymentMethod,
      items_list: orderDetails.itemsList,
      items: orderDetails.itemsList,
      subtotal: orderDetails.subtotal,
      shipping: orderDetails.shipping,
      total: orderDetails.total,
      order_total: orderDetails.total,
    };
    console.log('[EmailJS] Sending Admin Notification with Service:', serviceId, 'Template:', adminTemplateId);
    const result = await emailjs.send(serviceId, adminTemplateId, params, publicKey);
    console.log('[EmailJS] Admin email sent response:', result);
    return result;
  } catch (error: any) {
    console.error('[EmailJS] Failed to send order email to admin:', error);
    throw error;
  }
};

export const sendConfirmationToCustomer = async (orderDetails: OrderDetails) => {
  if (!serviceId || !customerTemplateId || serviceId === 'your_service_id_here' || customerTemplateId === 'your_customer_template_id_here') {
    console.warn('EmailJS customer credentials are not set in .env. Skipping customer email dispatch.');
    return;
  }

  try {
    const params = {
      order_id: orderDetails.orderId || 'ORD-NEW',
      customer_name: orderDetails.customerName,
      name: orderDetails.customerName,
      to_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      to_email: orderDetails.customerEmail,
      email: orderDetails.customerEmail,
      user_email: orderDetails.customerEmail,
      recipient: orderDetails.customerEmail,
      reply_to: 'organicflavouring@gmail.com',
      items_list: orderDetails.itemsList,
      items: orderDetails.itemsList,
      subtotal: orderDetails.subtotal,
      shipping: orderDetails.shipping,
      total: orderDetails.total,
      order_total: orderDetails.total,
      payment_method: orderDetails.paymentMethod,
      shipping_address: `${orderDetails.customerAddress}, ${orderDetails.customerCity}`,
    };
    console.log('[EmailJS] Sending Customer Confirmation with Service:', serviceId, 'Template:', customerTemplateId);
    const result = await emailjs.send(serviceId, customerTemplateId, params, publicKey);
    console.log('[EmailJS] Customer email sent response:', result);
    return result;
  } catch (error: any) {
    console.error('[EmailJS] Failed to send confirmation email to customer:', error);
    throw error;
  }
};

