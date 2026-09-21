import emailjs from '@emailjs/browser';

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
const customerTemplateId = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;

// Initialize EmailJS with the public key
if (publicKey && publicKey !== 'your_public_key_here') {
  emailjs.init(publicKey);
}

export interface OrderDetails {
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
  if (!serviceId || !adminTemplateId || serviceId === 'your_service_id_here') {
    console.warn('EmailJS credentials are not set. Skipping admin email dispatch.');
    return;
  }
  
  try {
    await emailjs.send(serviceId, adminTemplateId, {
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      customer_phone: orderDetails.customerPhone,
      customer_city: orderDetails.customerCity,
      customer_address: orderDetails.customerAddress,
      payment_method: orderDetails.paymentMethod,
      items_list: orderDetails.itemsList,
      subtotal: orderDetails.subtotal,
      shipping: orderDetails.shipping,
      total: orderDetails.total,
    });
  } catch (error) {
    console.error('Failed to send order email to admin:', error);
    throw new Error('Failed to send admin notification');
  }
};

export const sendConfirmationToCustomer = async (orderDetails: OrderDetails) => {
  if (!serviceId || !customerTemplateId || serviceId === 'your_service_id_here') {
    console.warn('EmailJS credentials are not set. Skipping customer email dispatch.');
    return;
  }

  try {
    await emailjs.send(serviceId, customerTemplateId, {
      customer_name: orderDetails.customerName,
      customer_email: orderDetails.customerEmail,
      items_list: orderDetails.itemsList,
      total: orderDetails.total,
      payment_method: orderDetails.paymentMethod,
    });
  } catch (error) {
    console.error('Failed to send confirmation email to customer:', error);
    throw new Error('Failed to send customer confirmation');
  }
};
