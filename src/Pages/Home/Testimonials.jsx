"use client";

import { useState } from "react";

// Utility function to conditionally join classNames
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    content:
      "I enjoyed a wonderful experience at Kashem Optical. The service was quick, and the selection of frames was impressive. The staff helped me find the perfect pair that suits my face shape. A must-visit for anyone looking for quality eyewear.",
    name: "Asif Mahamud Bijoy",
    role: "Gamer",
    avatar: "https://i.ibb.co.com/6RpbPDkJ/photo-2025-04-15-15-14-17.jpg",
  },
  {
    id: 2,
    content:
      "Loved the variety of frames available. The staff is knowledgeable and helped me pick a new favorite—Ray-Ban Aviators! The eye examination was thorough and the optometrist explained everything clearly. Highly recommend!",
    name: "Asadur Rahaman Yead",
    role: "Full Stack Developer",
    avatar: "https://i.ibb.co.com/mFFhcBM/IMG-1355.png",
  },
  {
    id: 3,
    content:
      "As someone who wears glasses daily, finding the right pair is essential. Kashem Optical made the process easy and enjoyable. The transition lenses I purchased are perfect for my lifestyle—clear indoors and automatically tinted outdoors.",
    name: "Sazzad H Sojol",
    role: "Esports Player",
    avatar:
      "https://i.ibb.co.com/3zbd4Gk/473052915-3949075645351178-3792355090660896013-n.jpg",
  },
];

export default function Testimonials() {
  // State to track which testimonial is active (default to the first one)
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  return (
    <div className="w-full p-2 md:w-11/12 lg:w-10/12 mx-auto bg-gradient-to-r from-blue-500 via-sky-400 to-blue-400 py-16 px-4 md:px-8 rounded-xl my-12">
      <div className=" w-11/12 mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left Side: Heading and Description */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Super Clients
          </h2>
          <p className="text-white/90 max-w-lg">
            Our clients love their experience at Kashem Optical. We pride
            ourselves on providing exceptional service, quality eyewear, and
            professional eye care that keeps our customers coming back and
            recommending us to their friends and family.
          </p>
          <button className="mt-6 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition-colors">
            Show All
          </button>
        </div>

        {/* Right Side: Testimonial Cards */}
        <div className="w-full md:w-1/2 relative min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            {testimonials?.map((testimonial) => (
              <div
                key={testimonial.id}
                className={classNames(
                  "relative max-w-md rounded-lg shadow-lg p-6 transition-all duration-300 cursor-pointer",
                  activeTestimonial === testimonial.id
                    ? "bg-white text-gray-800 scale-105 z-20 opacity-100"
                    : "bg-white/30 backdrop-blur-md text-white scale-95 opacity-70 hover:opacity-90 hover:scale-100 hover:z-10"
                )}
                onMouseEnter={() => setActiveTestimonial(testimonial.id)}
                style={{
                  transform: `translateX(${
                    activeTestimonial === testimonial.id
                      ? 0
                      : testimonial.id > activeTestimonial
                      ? 20
                      : -20
                  }px)`,
                }}
              >
                <p className="mb-4">{testimonial.content}</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className={classNames(
                        "w-[50px] h-[50px] rounded-full border-2",
                        activeTestimonial === testimonial.id
                          ? "border-blue-500"
                          : "border-white"
                      )}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p
                      className={classNames(
                        "text-sm",
                        activeTestimonial === testimonial.id
                          ? "text-gray-600"
                          : "text-white/80"
                      )}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
