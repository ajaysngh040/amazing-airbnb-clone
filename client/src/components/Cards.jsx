/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import Image from "../components/Image";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <>
      <div className="mt-24 sm:mt-1/4 mb-12 grid sx:grid-col-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative px-2 mx-auto">
        {places.length > 0
          ? places.map((place) => (
              <Link to={`/place/${place._id}`} key={place._id} className="p-2">
                {/* Image container */}
                <div className="bg-transparent mb-2 rounded-xl flex justify-center items-center">
                  {place.photos?.[0] ? (
                    <ImageWithSkeleton
                      src={place.photos[0]}
                      alt={place.title || "Place image"}
                      height={200}
                      width={300}
                    />
                  ) : (
                    <Skeleton.Image style={{ height: 200, width: 300 }} />
                  )}
                </div>

                {/* Title and address */}
                <div className="flex justify-between mt-2">
                  {!place.title || !place.address ? (
                    <Skeleton.Input style={{ width: 200 }} active />
                  ) : (
                    <p className="text-sm font-medium">
                      {place.title}, {place.address}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex justify-center items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-light">5.0</p>
                  </div>
                </div>

                {/* Price, distance, and date */}
                {!place.price ? (
                  <Skeleton.Input style={{ width: 100 }} active />
                ) : (
                  <div className="mt-1">
                    <p className="gray-text">63 kilometers away</p>
                    <p className="gray-text">22-27 Jul</p>
                    <span className="font-base">${place.price}</span> per night
                  </div>
                )}
              </Link>
            ))
          : Array(4) // Display skeleton loaders when there is no data
              .fill(0)
              .map((_, index) => (
                <div key={index} className="p-2">
                  <Skeleton.Image style={{ height: 200, width: 300 }} />
                  <Skeleton.Input style={{ width: 200 }} active />
                  <Skeleton.Input style={{ width: 100 }} active />
                </div>
              ))}
      </div>
    </>
  );
}

function ImageWithSkeleton({ src, alt, height, width }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="relative" style={{ height, width }}>
      {/* Skeleton loader while image is loading */}
      {loading && <Skeleton.Image style={{ height, width }} />}

      {/* Optimized image */}
      <Image
        className={`rounded-xl object-cover transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        src={src}
        alt={alt}
        style={{ height, width }}
        loading="lazy" // Lazy loading for better performance
        onLoad={handleImageLoaded}
        onError={() => setLoading(false)} // Ensures skeleton hides even if image fails
      />
    </div>
  );
}
