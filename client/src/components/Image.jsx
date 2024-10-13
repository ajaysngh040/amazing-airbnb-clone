/* eslint-disable react/prop-types */

export default function Image({ src, alt = "", ...rest }) {
  // Ensure that VITE_BASE_API_URL is defined
  const baseUrl = import.meta.env.VITE_DEV_URL || import.meta.env.VITE_PROD_URL;

  if (!baseUrl) {
    console.error("VITE_BASE_API_URL is not defined");
    return null;
  }

  // Handle cases where src is undefined or null
  const resolvedSrc =
    src && src.includes("https://") ? src : `${baseUrl}/uploads/${src}`;

  // If resolvedSrc is null, render nothing or a placeholder
  if (!resolvedSrc) {
    return (
      <img {...rest} src="/path/to/placeholder/image.jpg" alt="Placeholder" />
    );
  }

  return <img {...rest} src={resolvedSrc} alt={alt} />;
}
