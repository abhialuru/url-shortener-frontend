function Hero() {
  return (
    <main className="w-full mb-20 px-5">
      <div className="flex flex-col gap-5 justify-center items-center mt-10 md:mt-0">
        <div className="text-sm rounded-full py-1 bg-gray-100 px-3 border-2 border-gray-300">
          Simple • Fast • Free
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Short links, instantly
        </h1>
        <p className="text-base md:text-2xl text-gray-600 text-center w-[80%]">
          Paste your URL and get a clean, shareable link instantly.
        </p>
      </div>
    </main>
  );
}

export default Hero;
