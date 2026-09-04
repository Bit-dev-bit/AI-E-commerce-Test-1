import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { User, Package, CheckCircle, XCircle } from 'lucide-react';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      alert('Profile updated successfully');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Profile Form */}
        <div className="md:w-1/3">
          <div className="bg-card p-6 rounded-xl border shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <User className="mr-2" /> User Profile
            </h2>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  placeholder="Leave blank to keep current"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  placeholder="Leave blank to keep current"
                />
              </div>
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 shadow hover:bg-primary/90 disabled:opacity-50 mt-4"
              >
                {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>

        {/* Orders List */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Package className="mr-2" /> My Orders
          </h2>
          {loadingOrders ? (
             <div className="animate-pulse space-y-4">
               {[1,2,3].map(i => <div key={i} className="h-16 bg-muted rounded-md w-full"></div>)}
             </div>
          ) : errorOrders ? (
             <div className="bg-destructive/10 text-destructive p-4 rounded-md">
               {errorOrders?.data?.message || errorOrders.error}
             </div>
          ) : orders.length === 0 ? (
             <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
               <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
               <p className="text-muted-foreground">You have no orders yet.</p>
               <Link to="/shop" className="text-primary hover:underline mt-2 inline-block">Start Shopping</Link>
             </div>
          ) : (
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-semibold">ID</th>
                      <th className="px-6 py-4 font-semibold">DATE</th>
                      <th className="px-6 py-4 font-semibold">TOTAL</th>
                      <th className="px-6 py-4 font-semibold">PAID</th>
                      <th className="px-6 py-4 font-semibold">DELIVERED</th>
                      <th className="px-6 py-4 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{order._id.substring(0, 10)}...</td>
                        <td className="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                        <td className="px-6 py-4 font-medium">${order.totalPrice.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          {order.isPaid ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {order.isDelivered ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
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
      </div>
    </div>
  );
};

export default Profile;
