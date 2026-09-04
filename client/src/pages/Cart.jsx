import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-11 px-8 shadow hover:bg-primary/90">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li key={item._id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <Link to={`/product/${item._id}`} className="shrink-0 w-24 h-24 bg-muted rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </Link>
                    
                    <div className="flex-grow">
                      <Link to={`/product/${item._id}`} className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1 mb-1">
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                      <p className="font-bold text-lg">${item.discountPrice > 0 ? item.discountPrice : item.price}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => addToCartHandler(item, item.qty - 1)}
                          disabled={item.qty === 1}
                          className="px-3 py-1 hover:bg-muted transition-colors disabled:opacity-50"
                        >-</button>
                        <span className="px-4 py-1 font-medium border-x text-sm">{item.qty}</span>
                        <button 
                          onClick={() => addToCartHandler(item, item.qty + 1)}
                          disabled={item.qty === item.countInStock}
                          className="px-3 py-1 hover:bg-muted transition-colors disabled:opacity-50"
                        >+</button>
                      </div>

                      <button 
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-destructive/70 hover:text-destructive transition-colors p-2 bg-destructive/10 rounded-md"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-muted/30 rounded-xl border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                  <span className="font-medium">${itemsPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shippingPrice === '0.00' ? 'Free' : `$${shippingPrice}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${taxPrice}</span>
                </div>
                
                <div className="border-t pt-4 mt-4 flex justify-between items-center">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-2xl text-primary">${totalPrice}</span>
                </div>
              </div>

              <button 
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors bg-primary text-primary-foreground h-14 shadow hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Proceed To Checkout
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
