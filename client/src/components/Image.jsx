/* eslint-disable react/prop-types */
export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : `${import.meta.env.VITE_BASE_API_URL}/uploads/${src}`;
  return <img {...rest} src={src} alt={""} />;
}
