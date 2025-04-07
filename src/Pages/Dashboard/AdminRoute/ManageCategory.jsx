import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import Seo from "../../../components/Seo/Seo";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCategory from "../../../hooks/useCategory";
import { MdOutlineMoreHoriz } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import AddCategoryModal from "@/components/Modal/AddCategoryModal";
import UpdateCategoryModal from "@/components/Modal/UpdateCategory";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [categories, categoriesLoading, refetch] = useCategory();

  const handleAddCategory = async (newCategory) => {
    try {
      await axiosSecure.post("/categories", newCategory);
      refetch();
    } catch (error) {
      throw new Error("Could not add category");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axiosSecure.delete(`/categories/delete/${deleteId}`);
      toast.success("Successfully Deleted Category");
      refetch();
      setOpenDeleteDialog(false);
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const openConfirmation = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  return (
    <div className="my-10 container mx-auto p-2">
      <Seo title={"Category | Kashem Optical"} />
      <div className="mb-6 text-center">
        <h2 className="text-3xl xl:text-4xl font-bold pb-3">
          <span className="text-blue-600">Manage</span> Category
        </h2>
      </div>

      {/* Button to open add modal */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 "
        >
          <IoMdAddCircle className="text-lg" />
          Add New Category
        </Button>
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        onSubmit={handleAddCategory}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Category Modal */}
      {openUpdateModal && (
        <UpdateCategoryModal
          updateId={updateId}
          updateOpen={openUpdateModal}
          setUpdateOpen={setOpenUpdateModal}
          refetch={refetch}
        />
      )}

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              categories?.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              category?.image ||
                              "https://tinasbotanicals.com/wp-content/uploads/2025/01/No-Product-Image-Available.png"
                            }
                            alt={category.name}
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{category?.name}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MdOutlineMoreHoriz size={22} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => {
                            setUpdateId(category._id);
                            setOpenUpdateModal(true);
                          }}
                        >
                          <PencilIcon className="size-4 mr-2" />
                          Update Category
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openConfirmation(category._id)}
                          className="text-red-500"
                        >
                          <TrashIcon className="size-4 mr-2" />
                          Delete Category
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
  );
};

export default ManageCategory;
