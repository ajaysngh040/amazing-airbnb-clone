/* eslint-disable react/prop-types */
import Image from "../components/Image";

export default function PlaceImg({
  place,
  index = 0,
  className = "object-cover",
}) {
  if (!place?.photos?.length) {
    return null; // Returning null instead of an empty string for better React practices
  }

  return (
    <Image
      className={className}
      src={place.photos[index]}
      alt={`Photo ${index + 1}`}
    />
  );
}
