// Lab page: StarRating to set (click the same star to clear, keys 0–5), small, and read-only.

import { useState } from "react";
import { StarRating } from "./StarRating";

export default function StarRatingLab() {
  const [rating, setRating] = useState(3);

  return (
    <div className="lab-stack">
      <StarRating value={rating} onValueChange={setRating} label="Rating" />
      <StarRating value={rating} onValueChange={setRating} size="sm" label="Rating (small)" />
      <StarRating value={4} readOnly />
      <p className="lab-hint">Rating: {rating}. Click the picked star to clear it; when focused, 0–5 set it.</p>
    </div>
  );
}
