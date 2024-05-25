import { useParams } from "react-router-dom";

import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import Profile from "../components/Profile";

export default function ProfilePage() {
  let { subpage } = useParams();

  return (
    <>
      <div className="relative">
        <AccountNav />
        <Profile />

        {subpage === "places" && (
          <>
            <PlacesPage />
          </>
        )}
      </div>
    </>
  );
}
