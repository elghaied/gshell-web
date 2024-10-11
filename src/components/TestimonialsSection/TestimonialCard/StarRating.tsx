import { Star as StarIcon } from "lucide-react";

export default function StarRating({ rating }) {
  const totalStars = 5;

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-5 h-5 text-transparent ${
            index < parseInt(rating)
              ? " fill-yellow-400"
              : "fill-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
