import useCategory from "@/hooks/useCategory";
import { Link } from "react-router-dom";

function CategoriesSection() {
  const [categories, categoriesLoading, refetch] = useCategory();

  //   const categories = [
  //     {
  //       id: 1,
  //       name: "Contact Lenses",
  //       image: "/placeholder.svg?height=200&width=200",
  //       link: "/category/contact-lenses",
  //       description: "Daily, weekly & monthly lenses",
  //     },
  //     {
  //       id: 2,
  //       name: "Eyeglasses",
  //       image: "/placeholder.svg?height=200&width=200",
  //       link: "/category/eyeglasses",
  //       description: "Prescription & fashion frames",
  //     },
  //     {
  //       id: 3,
  //       name: "Sunglasses",
  //       image: "/placeholder.svg?height=200&width=200",
  //       link: "/category/sunglasses",
  //       description: "UV protection & stylish designs",
  //     },
  //     {
  //       id: 4,
  //       name: "Reading Glasses",
  //       image: "/placeholder.svg?height=200&width=200",
  //       link: "/category/reading-glasses",
  //       description: "Various magnification options",
  //     },
  //   ];

  return (
    <section className="w-full py-12 bg-gray-50 ">
      <div className=" mx-auto px-4 p-2 md:w-11/12 lg:w-10/12 ">
        <h2 className="text-3xl font-bold text-start mb-8">
          Shop By Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category?.name}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-4 text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <img
                    src={category?.image || "/placeholder.svg"}
                    alt={category?.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category?.name}</h3>
                <p className="text-gray-600 text-sm">{category?.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
