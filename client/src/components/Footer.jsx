function Footer() {
  return (
    <footer className="h-6 fixed bottom-0 w-screen bg-white justify-between items-center z-50 hidden sm:block">
      <div className="flex space-x-2 text-sm font-base ">
        <p>© 2024 Airbnb, Inc.</p>
        <p>·</p>
        <p>Privacy</p>
        <p>·</p>
        <p>Terms</p>
        <p>·</p>
        <p>Sitemap</p>
        <p>·</p>
        <p>Company details</p>
      </div>
      {/* <div className="flex space-x-4 text-sm font-base mr-20">
        <span className="material-symbols-outlined">Language</span>
        <p>English(IN)</p>
        <p>₹ INR</p>
        <p>Support</p>
      </div> */}
    </footer>
  );
}

export default Footer;
