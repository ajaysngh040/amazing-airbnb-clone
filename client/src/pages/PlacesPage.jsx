import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Skeleton } from "antd";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const response = await axios.get("/places/", {
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

  const handleDelete = async (placeId) => {
    try {
      await axios.delete(`/places/update/${placeId}`, {
        withCredentials: true,
      });
      // Remove the deleted place from the state
      setPlaces(places.filter((place) => place._id !== placeId));
    } catch (err) {
      console.error("Error deleting place:", err);
      setError("Failed to delete place.");
    }
  };

  if (loading) {
    return <Skeleton />;
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
          <div
            key={place._id}
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
              <div className="flex justify-end mt-3 mr-4 p-2">
                <Link
                  to={"/account/places/" + place._id}
                  className=" text-black pr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(place._id)}
                  className="text-black bg-transparent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
