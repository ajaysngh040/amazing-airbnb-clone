import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import { Skeleton } from "antd";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <>
      <div className="mt-24 sm:mt-1/4 mb-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative lg:gap-4 md:gap-5 sm:gap-3 px-2">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id} key={place._id}>
              <div className="bg-gray-500 mb-2 rounded-xl flex justify-center items-center">
                {place.photos?.[0] &&
                  (place.photos == null ? (
                    <Skeleton.Image />
                  ) : (
                    <Image
                      className="rounded-xl object-cover"
                      src={place.photos?.[0]}
                      alt=""
                    />
                  ))}
              </div>
              {place.title && place.address == null ? (
                Skeleton
              ) : (
                <div className="flex justify-between mt-2 ">
                  <p className="text-sm font-medium">
                    {place.title}, {place.address}
                  </p>
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
              )}
              {place.price == null ? (
                Skeleton
              ) : (
                <div className="mt-1">
                  <p className="gray-text">63 kilometers away</p>
                  <p className="gray-text">22-27 Jul</p>
                  <span className="font-base">${place.price}</span> per night
                </div>
              )}
            </Link>
          ))}
      </div>
    </>
  );
}

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Image from "../components/Image";
// // import Swiper core and required modules
// import { Autoplay, Pagination } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import IconTab from "../components/IconTab";
// import Footer from "../components/Footer";

// export default function Cards() {
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {
//     axios.get("/places").then((response) => {
//       setPlaces(response.data);
//     });
//   }, []);
//   return (
//     <div>
//       <IconTab />

//       <div className="wrapper mt-24 mb-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative lg:gap-4 md:gap-5 sm:gap-3 px-2">
//         {places.length > 0 &&
//           places.map((place) => (
//             <div className="flex flex-col w-full" key={place._id}>
//               {
//                 <Swiper
//                   modules={[Autoplay, Pagination]}
//                   pagination={true}
//                   autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                   }}
//                   className="w-full"
//                   loop={true}
//                 >
//                   {place.photos.map((photo, id) => (
//                     <SwiperSlide key={id}>
//                       <Image
//                         alt=""
//                         className="rounded-lg object-cover aspect-ractangle"
//                         src={photo}
//                       />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               }

//               <Link to={"/place/" + place._id} className="w-full">
//                 <div className="flex justify-between mt-2 ">
//                   <p className="text-sm font-medium">
//                     {place.title}, {place.address}
//                   </p>
//                   <div className="flex justify-center items-center gap-1">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                       className="w-4 h-4"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
//                         clipRule="evenodd"
//                       />
//                     </svg>

//                     <p className="text-sm font-light">5.0</p>
//                   </div>
//                 </div>
//                 <p className="gray-text">63 kilometers away</p>
//                 <p className="gray-text">22-27 Jul</p>
//                 <p className="text-sm font-medium mt-2">${place.price} night</p>
//               </Link>
//             </div>
//           ))}
//       </div>
//       <Footer />
//     </div>
//   );
// }
