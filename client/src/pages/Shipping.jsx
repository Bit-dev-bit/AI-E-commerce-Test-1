import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress?.fullName || '');
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [phone, setPhone] = useState(shippingAddress?.phone || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ fullName, address, city, postalCode, country, phone }));
    navigate('/payment');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-card p-8 rounded-xl border shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 px-4 mt-6 hover:bg-primary/90"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
