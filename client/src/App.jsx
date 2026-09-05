import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AdminRoute, PrivateRoute } from './components/RouteGuards';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';

import OrderList from './pages/admin/OrderList';
import UserList from './pages/admin/UserList';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased text-foreground">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="" element={<PrivateRoute />}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="productlist" element={<ProductList />} />
            <Route path="product/:id/edit" element={<ProductEdit />} />
            <Route path="orderlist" element={<OrderList />} />
            <Route path="userlist" element={<UserList />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
