import Image from "next/image";

const SingleResource = ({ title, image, info }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Image Section */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 border border-gray-300 shadow-lg">
            <Image
              src={image}
              alt="Resource image"
              width={400}
              height={150} // ✅ Set a shorter height
              objectFit="cover" // ✅ Ensures no distortion
              className="w-full h-48 md:h-56 object-cover" // ✅ Tailwind height control
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left items-center ">
          <h2 className="text-2xl text-center md:text-3xl text-red-600 font-semibold">
            {title}
          </h2>
          <p className="text-black text-center font-light mt-2">{info}</p>
        </div>
      </div>
    </>
  );
};

export default SingleResource;
