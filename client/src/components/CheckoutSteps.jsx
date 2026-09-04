import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-8">
      {/* Step 1 */}
      <div className="flex items-center">
        {step1 ? (
          <Link to="/login" className="flex items-center text-primary font-medium">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2"><Check className="w-3 h-3" /></span>
            <span className="hidden sm:inline">Sign In</span>
          </Link>
        ) : (
          <div className="flex items-center text-muted-foreground font-medium">
            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs mr-2">1</span>
            <span className="hidden sm:inline">Sign In</span>
          </div>
        )}
      </div>

      <div className={`w-8 sm:w-16 h-1 ${step1 ? 'bg-primary' : 'bg-muted'} rounded`} />

      {/* Step 2 */}
      <div className="flex items-center">
        {step2 ? (
          <Link to="/shipping" className="flex items-center text-primary font-medium">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">{step3 ? <Check className="w-3 h-3" /> : '2'}</span>
            <span className="hidden sm:inline">Shipping</span>
          </Link>
        ) : (
          <div className="flex items-center text-muted-foreground font-medium">
            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs mr-2">2</span>
            <span className="hidden sm:inline">Shipping</span>
          </div>
        )}
      </div>

      <div className={`w-8 sm:w-16 h-1 ${step2 ? 'bg-primary' : 'bg-muted'} rounded`} />

      {/* Step 3 */}
      <div className="flex items-center">
        {step3 ? (
          <Link to="/payment" className="flex items-center text-primary font-medium">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">{step4 ? <Check className="w-3 h-3" /> : '3'}</span>
            <span className="hidden sm:inline">Payment</span>
          </Link>
        ) : (
          <div className="flex items-center text-muted-foreground font-medium">
            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs mr-2">3</span>
            <span className="hidden sm:inline">Payment</span>
          </div>
        )}
      </div>

      <div className={`w-8 sm:w-16 h-1 ${step3 ? 'bg-primary' : 'bg-muted'} rounded`} />

      {/* Step 4 */}
      <div className="flex items-center">
        {step4 ? (
          <div className="flex items-center text-primary font-medium">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">4</span>
            <span className="hidden sm:inline">Place Order</span>
          </div>
        ) : (
          <div className="flex items-center text-muted-foreground font-medium">
            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs mr-2">4</span>
            <span className="hidden sm:inline">Place Order</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
