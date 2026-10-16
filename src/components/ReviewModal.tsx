import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Star, Sparkles } from 'lucide-react';
import { supabaseService } from '@/lib/supabase';

interface ReviewModalProps {
  onAddReview: (review: { author: string; initials: string; location: string; rating: number; comment: string }) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ onAddReview }) => {
  const { isReviewModalOpen, setIsReviewModalOpen, showToast, setUserPoints } = useApp();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Dhanmondi, Dhaka');
  const [comment, setComment] = useState('');

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      showToast('Missing Fields', 'Please fill in your name and comment.', 'warning');
      return;
    }
    const initials = author
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    onAddReview({
      author,
      initials: initials || 'CB',
      location,
      rating,
      comment,
    });

    // Persist to Supabase if configured
    supabaseService.submitReview({
      author,
      location,
      rating,
      comment,
    });

    setUserPoints((prev) => prev + 50);
    showToast('Review Submitted!', 'Thank you! +50 Loyalty Points credited to your account.', 'success');
    setIsReviewModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-2xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Write a Verified Review</h3>
            <p className="text-[11px] text-neutral-500">Pran UHT Full Cream Milk 1L · Batch BNG-2024-089</p>
          </div>
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Your Freshness Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-neutral-300 transition-colors hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-neutral-700">{rating} out of 5</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mahfuzur Rahman"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Dhaka Neighborhood</label>
            <input
              type="text"
              required
              placeholder="e.g. Dhanmondi, Dhaka"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Review & FEFO Freshness Experience</label>
            <textarea
              rows={3}
              required
              placeholder="Tell others about freshness, packaging seal, and fast delivery..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:border-emerald-500 outline-none resize-none"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-[11px] text-amber-800 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Earn <strong>+50 Bengal Club Loyalty Points</strong> automatically when your review is published!</span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="flex-1 py-2.5 text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
