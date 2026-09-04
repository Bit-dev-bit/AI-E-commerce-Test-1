import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl">
      <CheckoutSteps step1 step2 step3 />
      <div className="bg-card p-8 rounded-xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
        
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-primary"
                name="paymentMethod"
                value="Razorpay"
                checked={paymentMethod === 'Razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="font-medium text-lg">Razorpay (Cards, UPI, NetBanking)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-primary"
                name="paymentMethod"
                value="CashOnDelivery"
                checked={paymentMethod === 'CashOnDelivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="font-medium text-lg">Cash On Delivery</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 px-4 hover:bg-primary/90"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
