import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

export function AddPatientModal({ isOpen, onClose, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: new Date().toISOString(), // Added date field
    rightEye: {
      sph: "",
      cyl: "",
      axis: "",
      add: "",
    },
    leftEye: {
      sph: "",
      cyl: "",
      axis: "",
      add: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the date right before submission to get the most current time
    const submissionData = {
      ...formData,
      date: new Date().toISOString(),
    };
    // console.log(submissionData);
    await toast.promise(axiosSecure.post("/patients", submissionData), {
      loading: "Adding New Patient...",
      success: <b>Patient Added Successfully!</b>,
      error: (error) => <b>{error.message}</b>,
    });
    refetch();
    onClose();
    // Reset form
    setFormData({
      name: "",
      phone: "",
      date: new Date().toISOString(), // Reset with new date
      rightEye: {
        sph: "",
        cyl: "",
        axis: "",
        add: "",
      },
      leftEye: {
        sph: "",
        cyl: "",
        axis: "",
        add: "",
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Fill out the patient's information and prescription details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Patient Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter Patient Phone no"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Optional: Add a read-only field to display the date */}
            {/* <div className="space-y-2">
              <Label>Date</Label>
              <Input
                value={new Date(formData.date).toLocaleString()}
                readOnly
                disabled
              />
            </div> */}

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Prescription Details</h3>

                <div className="grid grid-cols-5 md:grid-cols-6 gap-2 mb-2">
                  <div></div>
                  <div className="text-center font-medium">SPH</div>
                  <div className="text-center font-medium">CYL</div>
                  <div className="text-center font-medium">Axis</div>
                  <div className="text-center font-medium">ADD</div>
                </div>

                <div className="grid grid-cols-5 md:grid-cols-6 gap-2 mb-2">
                  <div className="flex items-center font-medium">OD</div>
                  <Input
                    name="rightEye.sph"
                    value={formData.rightEye.sph}
                    onChange={handleChange}
                    placeholder="-4.25"
                    required
                  />
                  <Input
                    Kopieren
                    name="rightEye.cyl"
                    value={formData.rightEye.cyl}
                    onChange={handleChange}
                    placeholder="-2.50"
                    required
                  />
                  <Input
                    name="rightEye.axis"
                    value={formData.rightEye.axis}
                    onChange={handleChange}
                    placeholder="179"
                    required
                  />
                  <Input
                    name="rightEye.add"
                    value={formData.rightEye.add}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>

                <div className="grid grid-cols-5 md:grid-cols-6 gap-2">
                  <div className="flex items-center font-medium">OS</div>
                  <Input
                    name="leftEye.sph"
                    value={formData.leftEye.sph}
                    onChange={handleChange}
                    placeholder="-4.25"
                    required
                  />
                  <Input
                    name="leftEye.cyl"
                    value={formData.leftEye.cyl}
                    onChange={handleChange}
                    placeholder="-2.50"
                    required
                  />
                  <Input
                    name="leftEye.axis"
                    value={formData.leftEye.axis}
                    onChange={handleChange}
                    placeholder="008"
                    required
                  />
                  <Input
                    name="leftEye.add"
                    value={formData.leftEye.add}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className={"flex flex-col-reverse md:flex-row gap-2"}>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Patient</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
