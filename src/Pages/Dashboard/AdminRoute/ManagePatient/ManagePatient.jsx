import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, ScanEye } from "lucide-react";
import { PatientTable } from "./PatientTable";
import { AddPatientModal } from "./AddPatientModal";
import { useQuery } from "react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import { Input } from "@/components/ui/input";

export default function ManagePatient() {
  //   const [patients, setPatients] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [searchPhone, setSearchPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: patients = [],
    isLoading: patientLoading,
    refetch,
  } = useQuery({
    queryKey: ["patients", searchPhone],
    queryFn: async () => {
      const res = await axiosSecure.get(`/patients?search=${searchPhone}`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto ">
      <DashboardPagesHeader
        title={"Manage Patients"}
        icon={ScanEye}
        subtitle={"Quickly find and create your patients"}
      />

      <div className="flex justify-between items-center mt-12 mb-6 gap-4">
        <div className="lg:w-1/4">
          <Input
            type="text"
            placeholder="Search patient by Name / Phone no."
            className="w-full bg-base-100"
            onChange={(e) => setSearchPhone(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {patients.length > 0 ? (
        <PatientTable patients={patients} />
      ) : (
        <div className="text-center py-10 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            No patients added yet. Add your first patient to get started.
          </p>
        </div>
      )}

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />
    </div>
  );
}
