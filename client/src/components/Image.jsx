/* eslint-disable react/prop-types */
export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "https://amazing-airbnb-clone.onrender.com/uploads/" + src;
  return <img {...rest} src={src} alt={""} />;
}
