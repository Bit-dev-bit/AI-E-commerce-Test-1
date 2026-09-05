import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../slices/usersApiSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      setMessage(res.message);
    } catch (err) {
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="bg-card p-8 rounded-xl border shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm">
            {message}. Please <Link to="/reset-password" className="font-bold hover:underline">click here</Link> to enter your OTP.
          </div>
        )}
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
            {error?.data?.message || error.error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 px-4 shadow hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Remember your password?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
