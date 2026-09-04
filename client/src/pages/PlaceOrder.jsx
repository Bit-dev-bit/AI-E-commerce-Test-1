import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { CheckCircle } from 'lucide-react';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      
      // Because we didn't add transformResponse in ordersApiSlice yet, we extract data from res.data
      const orderId = res.data ? res.data._id : res._id; 
      
      dispatch(clearCartItems());
      navigate(`/order/${orderId}`);
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Shipping</h2>
            <p className="text-muted-foreground">
              <strong>Name: </strong> {cart.shippingAddress.fullName}
            </p>
            <p className="text-muted-foreground">
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <p className="text-muted-foreground">
              <strong>Method: </strong> {cart.paymentMethod}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="divide-y">
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="py-4 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover bg-muted mix-blend-multiply" />
                    <Link to={`/product/${item._id}`} className="flex-grow hover:underline font-medium line-clamp-2">
                      {item.name}
                    </Link>
                    <div className="font-medium whitespace-nowrap">
                      {item.qty} x ${item.discountPrice > 0 ? item.discountPrice : item.price} = ${(item.qty * (item.discountPrice > 0 ? item.discountPrice : item.price)).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-muted/30 p-6 rounded-xl border sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">${cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">${cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">${cart.taxPrice}</span>
              </div>
              
              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-base">Total</span>
                <span className="font-bold text-2xl text-primary">${cart.totalPrice}</span>
              </div>
            </div>

            {error && <div className="bg-destructive/10 text-destructive p-3 rounded mb-4 text-sm">{error.data?.message}</div>}

            <button
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0 || isLoading}
              className="w-full inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors bg-primary text-primary-foreground h-14 shadow hover:bg-primary/90 disabled:opacity-50"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
