import React, { useState } from "react";
import Seo from "../../../components/Seo/Seo";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  ChevronDown,
  Edit,
  Trash2,
  Ellipsis,
  TicketSlash,
} from "lucide-react";
import { useQuery } from "react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {toast} from "sonner";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdAddCircle } from "react-icons/io";
import AddBannerModal from "@/components/Modal/AddBannerModal";

// Placeholder for AddBannerModal, adapted to shadcn Dialog
// const AddBannerModal = ({ isOpen, onClose, refetch }) => {
//   // Assuming AddBannerModal has a form; this is a placeholder
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add New Banner</DialogTitle>
//         </DialogHeader>
//         {/* Placeholder form; replace with actual AddBannerModal content */}
//         <div className="p-4">
//           <p>Form to add banner goes here</p>
//           <Button
//             onClick={() => {
//               refetch();
//               onClose();
//             }}
//           >
//             Save
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

const ManageBanners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "added" ? "removed" : "added";
    await toast.promise(
      axiosSecure.patch(`/banner/status/${id}`, { status: newStatus }),
      {
        loading: "Updating Status...",
        success: ()=>{
          refetch()
          return <b>Status Updated Successfully!</b>
        },
        error: "Could not Update!",
      }
    );
    // refetch();
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
        axiosSecure.delete(`/banner/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Banner has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-2">
      <Seo title={"Banners | Kashem Optical"} />
      <DashboardPagesHeader
        icon={TicketSlash}
        title={"Manage Banners"}
        subtitle={"Create, edit, and showcase promotional banners"}
      />
      <div className="flex justify-end">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-black py-1.5 px-3 text-sm/6 font-normal text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white "
        >
          <IoMdAddCircle />
          Add New Banner
        </Button>
      </div>
      <div className="my-8">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Banner Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners?.reverse().map((banner, idx) => (
                <TableRow key={banner._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-20">
                        <img
                          src={banner?.image}
                          alt="Banner"
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{banner?.title}</TableCell>
                  <TableCell>{banner?.createdAt}</TableCell>
                  <TableCell>
                    <Switch
                      checked={banner?.status === "added"}
                      onCheckedChange={() =>
                        handleStatusToggle(banner._id, banner?.status)
                      }
                      className="data-[state=checked]:bg-green-500"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="inline-flex items-center gap-2"
                        >
                          <Ellipsis className="h-5 w-5" />
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-5 w-5 mr-2" />
                          Update Banner
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(banner._id)}
                        >
                          <Trash2 className="h-5 w-5 mr-2" />
                          Delete Banner
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddBannerModal
        refetch={refetch}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ManageBanners;
