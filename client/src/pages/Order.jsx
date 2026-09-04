import { useParams, Link } from 'react-router-dom';
import { useGetOrderDetailsQuery, usePayOrderMutation } from '../slices/ordersApiSlice';
import { CheckCircle, XCircle } from 'lucide-react';

const Order = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const handleFakePayment = async () => {
    try {
      await payOrder({ orderId, details: { id: 'fake_payment_id', status: 'COMPLETED', update_time: new Date().toISOString(), email_address: order.user.email } });
      refetch();
    } catch (err) {
      alert('Payment failed');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12"><div className="bg-destructive/10 text-destructive p-4 rounded-md">{error?.data?.message || error.error}</div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Order: {order._id}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Shipping</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Name: </strong> {order.user.name} <br />
              <strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-primary hover:underline">{order.user.email}</a> <br />
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="bg-green-100 text-green-800 p-3 rounded-md flex items-center text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" /> Delivered on {new Date(order.deliveredAt).toLocaleString()}
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 p-3 rounded-md flex items-center text-sm font-medium">
                <XCircle className="w-4 h-4 mr-2" /> Not Delivered (Status: {order.status})
              </div>
            )}
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="bg-green-100 text-green-800 p-3 rounded-md flex items-center text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" /> Paid on {new Date(order.paidAt).toLocaleString()}
              </div>
            ) : (
              <div className="bg-red-100 text-red-800 p-3 rounded-md flex items-center text-sm font-medium">
                <XCircle className="w-4 h-4 mr-2" /> Not Paid
              </div>
            )}
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <ul className="divide-y">
              {order.orderItems.map((item, index) => (
                <li key={index} className="py-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover bg-muted mix-blend-multiply" />
                  <Link to={`/product/${item.product}`} className="flex-grow hover:underline font-medium line-clamp-2">
                    {item.name}
                  </Link>
                  <div className="font-medium whitespace-nowrap">
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-muted/30 p-6 rounded-xl border sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">${order.taxPrice.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-base">Total</span>
                <span className="font-bold text-2xl text-primary">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {!order.isPaid && (
              <div>
                <button
                  onClick={handleFakePayment}
                  disabled={loadingPay}
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 shadow hover:bg-primary/90 disabled:opacity-50 mt-4"
                >
                  {loadingPay ? 'Processing...' : 'Simulate Payment'}
                </button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Click above to simulate a successful payment transaction (Razorpay mock).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
