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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#061124]/75 backdrop-blur-2xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-blue-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-blue-100 flex items-center justify-between bg-blue-50/70">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Write a Verified Review</h3>
            <p className="text-[11px] text-slate-500">Pran UHT Full Cream Milk 1L · Batch BNG-2024-089</p>
          </div>
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-blue-100/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Freshness Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-slate-300 transition-colors hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-slate-700">{rating} out of 5</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mahfuzur Rahman"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-blue-50/20 border border-slate-300 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Dhaka Neighborhood</label>
            <input
              type="text"
              required
              placeholder="e.g. Dhanmondi, Dhaka"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-blue-50/20 border border-slate-300 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review & FEFO Freshness Experience</label>
            <textarea
              rows={3}
              required
              placeholder="Tell others about freshness, packaging seal, and fast delivery..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-blue-50/20 border border-slate-300 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-500/20 outline-none resize-none"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-[11px] text-blue-900 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Earn <strong>+50 Bengal Club Loyalty Points</strong> automatically when your review is published!</span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 rounded-xl shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
