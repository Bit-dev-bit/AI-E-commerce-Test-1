import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ArrowLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      alert('Review submitted successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error?.data?.message || error.error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-muted rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-8">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-contain w-full h-full mix-blend-multiply"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.numReviews} Reviews</span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-extrabold">${product.discountPrice > 0 ? product.discountPrice : product.price}</span>
            {product.discountPrice > 0 && (
              <span className="text-xl text-muted-foreground line-through">${product.price}</span>
            )}
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-6 bg-muted/50 p-6 rounded-xl mb-8 border">
            <div className="flex justify-between items-center">
              <span className="font-medium">Status</span>
              <span className={`font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-medium">Quantity</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                    className="px-3 py-1 hover:bg-muted transition-colors"
                  >-</button>
                  <span className="px-4 py-1 font-medium border-x">{qty}</span>
                  <button 
                    onClick={() => setQty(qty < product.countInStock ? qty + 1 : qty)}
                    className="px-3 py-1 hover:bg-muted transition-colors"
                  >+</button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="w-full inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-14 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </button>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free Delivery over $100</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>1 Year Warranty</span>
            </div>
          </div>

          {/* Review Form */}
          <div className="mt-16 border-t pt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            {product.reviews.length === 0 && <p className="mb-4 text-muted-foreground">No reviews yet.</p>}
            <ul className="space-y-6 mb-8">
              {product.reviews.map((review) => (
                <li key={review._id} className="bg-muted/30 p-4 rounded-xl border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold">{review.name}</span>
                    <span className="text-muted-foreground text-sm">
                      {review.createdAt.substring(0, 10)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mb-4">Write a Customer Review</h3>
            {userInfo ? (
              <form onSubmit={submitReviewHandler} className="bg-card p-6 rounded-xl border shadow-sm max-w-2xl space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Comment</label>
                  <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 shadow hover:bg-primary/90 disabled:opacity-50"
                >
                  {loadingProductReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="bg-card p-6 rounded-xl border shadow-sm max-w-2xl">
                <p className="text-muted-foreground text-sm">Please <Link to="/login" className="text-primary hover:underline">sign in</Link> to write a review.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
