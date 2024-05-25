import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const response = await axios.get("/user-places", {
          withCredentials: true, // Ensure credentials are included in requests
        });
        setPlaces(response.data);
      } catch (err) {
        console.error("Error fetching user places:", err);
        setError("Failed to fetch user places.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlaces();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="relative">
      <AccountNav />

      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex bg-primary text-white text-sm font-medium py-2 px-6 rounded-full gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Add new places
        </Link>
      </div>
      <div className="mt-4">
        {places.map((place) => (
          <Link
            key={place._id}
            to={"/account/places/" + place._id}
            className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-4 hover:bg-gray-200"
          >
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
              <PlaceImg place={place} />
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-lg font-medium">
                {place.title}, {place.address}
              </h2>
              <p className="text-sm font-light mt-2">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
