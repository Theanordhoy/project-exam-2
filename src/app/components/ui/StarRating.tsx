import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
};

export function StarRating({ rating }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1 text-primary">
      <p className="sr-only">Rated {rating} out of 5</p>
      {stars.map((star) => (
        <Star
          key={star}
          fill={star <= rating ? "currentColor" : "none"}
          size={14}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
