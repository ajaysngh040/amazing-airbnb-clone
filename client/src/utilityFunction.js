// Function to get the value of a cookie by name
// export function getCookie(name) {
//   const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
//   return match ? decodeURIComponent(match[2]) : null;
// }

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}
