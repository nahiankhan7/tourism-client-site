import React from "react";
import aboutImg from "../../assets/images/about-img.jpg";

const About = () => {
  return (
    <div className="bg-gray-100 px-6 py-12 mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-10 place-content-center place-items-center">
          <div className="col-span-1 md:col-span-2">
            <img
              src={aboutImg}
              alt="About Us"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <div className="flex flex-col items-center justify-center p-6 md:p-12 md:items-start">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center md:text-left">
                About Us
              </h2>
              <h3 className="text-lg text-gray-800 md:text-2xl font-medium mb-2 text-center md:text-left">
                Welcome to TripNest!
              </h3>
              <p className="text-base md:text-lg text-gray-700 mb-4 text-center md:text-left">
                At TripNest, we believe the world is full of incredible places
                waiting to be explored. Our mission is to create a vibrant
                community where travelers can discover, share, and celebrate the
                beauty of tourist spots around the globe.
              </p>
              <p className="text-base md:text-lg text-gray-700 mb-4 text-center md:text-left">
                Whether you’re a seasoned adventurer or a curious wanderer, our
                platform invites you to contribute your favorite destinations
                and experiences. By sharing your recommendations, you help
                others find hidden gems and must-see attractions.
              </p>
              <p className="text-base md:text-lg text-gray-700 mb-4 text-center md:text-left">
                Join us in building a comprehensive guide to the world’s most
                enchanting places. Together, we can inspire travel, foster
                connections, and create unforgettable memories.
              </p>
              <p className="text-base md:text-lg text-gray-700 text-center md:text-left">
                Explore, contribute, and let the adventure begin!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
