import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

export function UpdatePatientModal({ isOpen, onClose, refetch, patientData }) {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
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

  // Initialize form with patient data when modal opens
  useEffect(() => {
    if (patientData && isOpen) {
      setFormData({
        name: patientData.name || "",
        phone: patientData.phone || "",
        date: patientData.date || "",
        rightEye: {
          sph: patientData.rightEye?.sph || "",
          cyl: patientData.rightEye?.cyl || "",
          axis: patientData.rightEye?.axis || "",
          add: patientData.rightEye?.add || "",
        },
        leftEye: {
          sph: patientData.leftEye?.sph || "",
          cyl: patientData.leftEye?.cyl || "",
          axis: patientData.leftEye?.axis || "",
          add: patientData.leftEye?.add || "",
        },
      });
    }
  }, [patientData, isOpen]);

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
    try {
      toast.promise(
        axiosSecure.patch(`/patients/${patientData._id}`, formData),
        {
          loading: "Updating Patient...",
          success: () => {
            refetch();
            onClose();
            return <b>Patient Updated Successfully!</b>;
          },
          error: (error) => <b>{error.message}</b>,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-[600px]">
        <h2 className="text-lg font-semibold mb-4">Edit Patient</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Update the patient's information and prescription details below.
        </p>
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

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="pointer-events-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="pointer-events-auto">
              Update Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
