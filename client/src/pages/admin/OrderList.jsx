import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-md w-full"></div>)}
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">USER</th>
                  <th className="px-6 py-4 font-semibold">DATE</th>
                  <th className="px-6 py-4 font-semibold">TOTAL</th>
                  <th className="px-6 py-4 font-semibold text-center">PAID</th>
                  <th className="px-6 py-4 font-semibold text-center">DELIVERED</th>
                  <th className="px-6 py-4 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{order._id.substring(0, 10)}...</td>
                    <td className="px-6 py-4 font-medium">{order.user && order.user.name}</td>
                    <td className="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 font-medium">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      {order.isPaid ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {order.isDelivered ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/order/${order._id}`} className="text-primary hover:underline text-xs font-medium bg-primary/10 px-3 py-1.5 rounded-full transition-colors hover:bg-primary/20">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
