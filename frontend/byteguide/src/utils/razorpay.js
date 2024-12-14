export const initializeRazorpay = async (options) => {
    const Razorpay = await loadRazorpayScript();

    if (!Razorpay) {
        console.error('Failed to load Razorpay SDK');
        return;
    }

    const rzp = new Razorpay(options);
    rzp.open();
};

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(window.Razorpay);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};