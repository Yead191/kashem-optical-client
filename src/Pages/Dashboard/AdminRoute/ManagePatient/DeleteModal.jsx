import useAxiosSecure from "@/hooks/useAxiosSecure";
import React from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteModal = ({ isOpen, onClose, refetch, deletePatient }) => {
  const axiosSecure = useAxiosSecure();
  const handleConfirmDelete = async () => {
    await toast.promise(
      axiosSecure.delete(`/patient/delete/${deletePatient._id}`),
      {
        loading: "Deleting Patient...",
        success: <b>Patient deleted successfully!</b>,
        error: (error) => error.message,
      }
    );
    refetch();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Patient?</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-sm text-muted-foreground">
          This action will remove all items from your cart.
        </DialogDescription>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
          <Button variant="outline" onClick={() => onClose()}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
