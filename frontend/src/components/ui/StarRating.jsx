import { Star } from "lucide-react";

export default function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={index < rating ? "text-yellow-500" : "text-gray-300"}
          size={20}
          fill={index < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}
