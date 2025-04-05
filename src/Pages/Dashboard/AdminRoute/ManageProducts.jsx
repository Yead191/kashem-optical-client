import React, { useEffect, useState } from "react";
import Seo from "../../../components/Seo/Seo";
import { IoMdAddCircle } from "react-icons/io";
import AddProductModal from "../../../components/Modal/AddProductModal";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Swal from "sweetalert2";
import UpdateProductModal from "../../../components/Modal/UpdateProductModal";
import { Filter } from "lucide-react";
import useCategory from "../../../hooks/useCategory";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilIcon } from "lucide-react";
import { TrashIcon } from "@heroicons/react/16/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // ShadCN Table components
import { MoreHorizontal } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [categories, categoriesLoading] = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", searchTerm, selectedCategory],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?search=${searchTerm}&category=${selectedCategory}`
      );
      return res.data;
    },
  });
  console.log(products);

  useEffect(() => {
    refetch();
  }, [searchTerm, selectedCategory, refetch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
  };

  const handleClearFilter = () => {
    setSelectedCategory("");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/product/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const [updateItem, setUpdateItem] = useState({});

  const handleUpdateProduct = (id) => {
    setUpdateItem(id);
    setUpdateModalOpen(true);
  };

  return (
    <div className="my-10 p-2 container mx-auto">
      <Seo title={"Manage Products | Kashem Optical"} />
      <div className="mb-6 text-center">
        <h2 className="text-3xl xl:text-4xl font-bold pb-3">
          Manage <span className="text-blue-600">Products</span>
        </h2>
      </div>

      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-row-reverse gap-2 items-center">
          <div className="join flex justify-center items-center relative">
            <div className="relative">
              <input
                className="input input-sm input-bordered min-w-64 md:min-w-96"
                placeholder="Search By Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button
                      className={`btn btn-sm flex items-center gap-2 ${
                        selectedCategory && "btn-neutral"
                      }`}
                    >
                      <span className="hidden md:flex">Filter</span>
                      <Filter className="inline-flex" />
                    </Menu.Button>

                    {open && (
                      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                        <Menu.Items className="p-2">
                          {categoriesLoading ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              Loading...
                            </div>
                          ) : categories.length > 0 ? (
                            categories?.map((category, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      handleCategorySelect(category)
                                    }
                                    className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                                      selectedCategory === category?.name
                                        ? "bg-gray-200"
                                        : "hover:bg-base-300"
                                    }`}
                                  >
                                    {category?.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No categories found
                            </div>
                          )}
                          <div className="mt-2">
                            <button
                              onClick={handleClearFilter}
                              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                            >
                              Clear Filter
                            </button>
                          </div>
                        </Menu.Items>
                      </div>
                    )}
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <IoMdAddCircle className="text-lg" />
          Add New Product
        </Button>
      </div>

      {/* Modal Components */}
      <AddProductModal
        refetch={refetch}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <UpdateProductModal
        id={updateItem}
        refetch={refetch}
        isOpen={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      />

      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Brand Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products?.map((product, index) => (
                  <TableRow key={product._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                product?.image
                                  ? product.image
                                  : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                              }
                              alt="Product Image"
                            />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.brandName}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.gender}</TableCell>
                    <TableCell>{product.origin}</TableCell>
                    <TableCell>
                      {product.price?.discount?.discountedAmount > 0 ? (
                        <div>
                          <span className="mr-2">
                            ৳{product.price?.discount?.discountedAmount}{" "}
                          </span>

                          <span className="line-through text-gray-500 ">
                            ৳{product.price.amount}
                          </span>
                        </div>
                      ) : (
                        <span>৳{product.price.amount}</span>
                      )}
                    </TableCell>
                    <TableCell
                      className={
                        product.status === "In Stock"
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {product.status}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="btn btn-sm btn-ghost">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <Link
                            to={`/product/${product._id}`}
                            className="flex items-center w-full"
                          >
                            <DropdownMenuItem className="w-full">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Details</span>
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            onClick={() => handleUpdateProduct(product._id)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Update Product</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Product</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
