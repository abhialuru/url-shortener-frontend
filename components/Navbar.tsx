function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-5 md:p-10">
      <div className="italic text-xl font-bold">*shortenUp</div>
      <a
        href="https://github.com/abhialuru/url_shortner_backend"
        target="_blank"
        className="px-5 py-1 rounded-md bg-zinc-950 text-white transition-all duration-200 ease-in cursor-pointer hover:scale-105"
      >
        Github
      </a>
    </nav>
  );
}

export default Navbar;
