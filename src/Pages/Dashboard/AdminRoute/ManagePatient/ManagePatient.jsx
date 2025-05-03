import { useState } from "react";
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
import {
  PlusIcon,
  ScanEye,
  Ellipsis,
  Edit,
  Trash2,
  FileDown,
} from "lucide-react";
import { useQuery } from "react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import { Input } from "@/components/ui/input";
import Seo from "@/components/Seo/Seo";

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import toast from "react-hot-toast"; // Added for feedback
import { AddPatientModal } from "./AddPatientModal";
import { UpdatePatientModal } from "./UpdatePatientModal";
import { PatientDetailsModal } from "./PatientDetailsModal";
import { Eye } from "lucide-react";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  spaceY: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textBold: {
    fontWeight: "bold",
  },
  textRight: {
    textAlign: "right",
  },
  billTo: {
    fontSize: 12,
    marginBottom: 4,
  },
  section: {
    marginBottom: 15,
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  eyeSection: {
    marginTop: 8,
  },
  eyeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  shopTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shopText: {
    fontSize: 10,
  },
});

// PDF Document Component
const PatientPDF = ({ patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.spaceY}>
          <Text style={[styles.textBold, styles.billTo]}>
            Patient Information
          </Text>
          <Text style={styles.text}>{patient?.name || "N/A"}</Text>
          <Text style={styles.text}>{patient?.phone || "N/A"}</Text>
          <Text style={styles.text}>Lakshmipur, Chittagong</Text>
          <Text style={styles.text}>Bangladesh</Text>
        </View>
        <View style={[styles.spaceY, styles.textRight]}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.shopTitle}>
              Kashem <Text style={{ color: "#2563EB" }}>Optical</Text>
            </Text>
          </View>
          <Text style={styles.shopText}>Chakbazar</Text>
          <Text style={styles.shopText}>Lakshmipur, Chittagong</Text>
          <Text style={styles.shopText}>Bangladesh</Text>
          <Text style={[styles.shopText, { marginTop: 4 }]}>
            Date: {new Date(patient?.date).toLocaleString() || "N/A"}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.textBold, styles.billTo]}>
          Prescription Details
        </Text>
        <View style={styles.box}>
          <View style={styles.eyeSection}>
            <View style={styles.eyeRow}>
              <Text style={styles.text}>OD (Right Eye)</Text>
              <Text style={styles.text}>
                SPH: {patient?.rightEye?.sph || "N/A"}
              </Text>
              <Text style={styles.text}>
                CYL: {patient?.rightEye?.cyl || "N/A"}
              </Text>
              <Text style={styles.text}>
                Axis: {patient?.rightEye?.axis || "N/A"}
              </Text>
              <Text style={styles.text}>
                Add: {patient?.rightEye?.add || "-"}
              </Text>
            </View>
            <View style={styles.eyeRow}>
              <Text style={styles.text}>OS (Left Eye)</Text>
              <Text style={styles.text}>
                SPH: {patient?.leftEye?.sph || "N/A"}
              </Text>
              <Text style={styles.text}>
                CYL: {patient?.leftEye?.cyl || "N/A"}
              </Text>
              <Text style={styles.text}>
                Axis: {patient?.leftEye?.axis || "N/A"}
              </Text>
              <Text style={styles.text}>
                Add: {patient?.leftEye?.add || "-"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 15, textAlign: "center" }}>
        <Text style={{ fontSize: 9 }}>
          Thank you for choosing Kashem Optical! For inquiries, contact us at
          support@kashemoptical.com
        </Text>
      </View>
    </Page>
  </Document>
);

// Sample DeleteModal Component
const DeleteModal = ({ isOpen, onClose, deletePatient, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/patient/delete/${deletePatient._id}`);
      toast.success("Patient deleted successfully");
      refetch();
      onClose(); // Close modal after deletion
    } catch (error) {
      toast.error("Failed to delete patient");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete {deletePatient.name}?
        </p>
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="pointer-events-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="pointer-events-auto"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ManagePatient() {
  const axiosSecure = useAxiosSecure();
  const [searchPhone, setSearchPhone] = useState("");
  const [deletePatient, setDeletePatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsPatientModalOpen(true);
  };
  const handleEdit = (patient) => {
    setEditPatient(patient);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditPatient(null);
  };

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

  const handleDelete = (patient) => {
    setDeletePatient(patient);
    setIsDeleteModalOpen(true);
  };

  // Ensure modal closes cleanly
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletePatient(null);
  };
  const closePatientModal = () => {
    setIsPatientModalOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="container mx-auto">
      <Seo title="Manage Patients | Kashem Optical" />
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
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-base-200">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Eye</TableHead>
                <TableHead>SPH</TableHead>
                <TableHead>CYL</TableHead>
                <TableHead>Axis</TableHead>
                <TableHead>ADD</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients?.map((patient) => (
                <>
                  <TableRow key={patient._id}>
                    <TableCell rowSpan={2}>{patient.name}</TableCell>
                    <TableCell rowSpan={2}>{patient.phone}</TableCell>
                    <TableCell rowSpan={2} className="text-sm">
                      {patient?.date
                        ? new Date(patient.date).toLocaleString().split(",")[0]
                        : "N/A"}
                      <br />
                      <span className="mt-[1px] text-xs hidden md:inline">
                        {patient?.date
                          ? new Date(patient.date)
                              .toLocaleString()
                              .split(",")[1]
                          : "N/A"}
                      </span>
                    </TableCell>
                    <TableCell>OD</TableCell>
                    <TableCell>{patient.rightEye.sph}</TableCell>
                    <TableCell>{patient.rightEye.cyl}</TableCell>
                    <TableCell>{patient.rightEye.axis}</TableCell>
                    <TableCell>{patient.rightEye.add || "-"}</TableCell>
                    <TableCell rowSpan={2}>
                      <div className="flex justify-end items-center">
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Ellipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <PDFDownloadLink
                                document={<PatientPDF patient={patient} />}
                                fileName={`${patient.name}-prescription.pdf`}
                              >
                                {({ loading }) => (
                                  <div className="flex items-center w-full">
                                    <FileDown className="mr-2 h-4 w-4" />
                                    {loading
                                      ? "Generating PDF..."
                                      : "Download PDF"}
                                  </div>
                                )}
                              </PDFDownloadLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(patient)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(patient)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(patient)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow key={`${patient._id}-os`}>
                    <TableCell>OS</TableCell>
                    <TableCell>{patient.leftEye.sph}</TableCell>
                    <TableCell>{patient.leftEye.cyl}</TableCell>
                    <TableCell>{patient.leftEye.axis}</TableCell>
                    <TableCell>{patient.leftEye.add || "-"}</TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            No patients added yet. Add your first patient to get started.
          </p>
        </div>
      )}
      <PatientDetailsModal
        patient={selectedPatient}
        isOpen={isPatientModalOpen}
        onClose={closePatientModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        deletePatient={deletePatient}
        refetch={refetch}
      />

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />
      <UpdatePatientModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        refetch={refetch}
        patientData={editPatient}
      />
    </div>
  );
}
