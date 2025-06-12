import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function GenderSection() {
  const genders = [
    {
      id: 1,
      name: "Male",
      image: "https://5.imimg.com/data5/LM/NU/MY-36086933/men-sunglasses.jpg",
      link: "/men",
    },
    {
      id: 2,
      name: "Female",
      image:
        "https://goldfm.lk/life/fashion/1539860430_501674354542047_goldstyles.jpg",
      link: "/women",
    },
    {
      id: 3,
      name: "Kids",
      image:
        "https://www.zennioptical.com/blog/wp-content/uploads/2024/02/kids-2_850x850-Antoney-Blog-Featured-Image.jpg",
      link: "/women",
    },
    {
      id: 4,
      name: "Unisex",
      image:
        "https://img.freepik.com/premium-photo/strongest-relationship-couple-love-couple-man-woman-wear-fashion-glasses-love-relations-friendship-day-fashion-models-trendy-sun-glasses-friendship-relations-casually-handsome_265223-65947.jpg?semt=ais_hybrid&w=740",
      link: "/unisex",
    },
  ];

  return (
    <section className="w-full py-12 p-2 md:w-11/12 lg:w-10/12 mx-auto bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-start mb-8">
          Who are you shopping for?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {genders.map((gender, idx) => (
            <motion.div
              key={gender.id}
              // initial={{ opacity: 0, y: 20 }}
              // whileInView={{ opacity: 1, y: 1 }}
              // viewport={{ once: true }}
              // transition={{ duration: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <Link to={`/products?gender=${gender.name}`}>
                <img
                  src={gender.image}
                  alt={gender.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {gender.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GenderSection;
