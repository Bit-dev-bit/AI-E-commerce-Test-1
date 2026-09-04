import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      navigate(redirect);
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <div className="w-full max-w-md bg-card p-8 rounded-xl border shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-sm text-muted-foreground mt-2">Join us to start shopping</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 px-4 shadow hover:bg-primary/90 disabled:opacity-50 mt-4"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
