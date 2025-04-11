// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Ellipsis, Edit, Trash2, FileDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useState } from "react";
// import {
//   PDFDownloadLink,
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
// } from "@react-pdf/renderer";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import toast from "react-hot-toast";

// // Styles for the PDF (adapted from InvoicePDF)
// // Styles for the PDF with adjustments
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontSize: 10, // Base font size reduced
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//     alignItems: "flex-start",
//   },
//   spaceY: {
//     marginBottom: 8,
//   },
//   title: {
//     fontSize: 16, // Reduced from 18
//     fontWeight: "bold",
//   },
//   textBold: {
//     fontWeight: "bold",
//   },
//   textRight: {
//     textAlign: "right",
//   },
//   billTo: {
//     fontSize: 12, // Reduced from 14
//     marginBottom: 4,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   box: {
//     borderWidth: 1,
//     borderColor: "#000",
//     padding: 8, // Reduced from 10
//     borderRadius: 4,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 4,
//   },
//   eyeSection: {
//     marginTop: 8, // Reduced from 10
//   },
//   eyeRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 4,
//     padding: 4, // Reduced from 5
//     borderWidth: 1,
//     borderColor: "#000",
//     borderRadius: 4,
//   },
//   text: {
//     fontSize: 10, // Reduced from 12
//     marginBottom: 3, // Reduced from 5
//   },
//   shopTitle: {
//     fontSize: 16, // Reduced from 20
//     fontWeight: "bold",
//   },
//   shopText: {
//     fontSize: 10, // Consistent with base size
//   },
// });

// // Modified PDF Document Component
// const PatientPDF = ({ patient }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {/* Header Section with Flexbox */}
//       <View style={styles.header}>
//         {/* Patient Info (Left) */}
//         <View style={styles.spaceY}>
//           <Text style={[styles.textBold, styles.billTo]}>
//             Patient Information
//           </Text>
//           <Text style={styles.text}>{patient?.name || "N/A"}</Text>
//           <Text style={styles.text}>{patient?.phone || "N/A"}</Text>
//           <Text style={styles.text}>Lakshmipur, Chittagong</Text>
//           <Text style={styles.text}>Bangladesh</Text>
//         </View>

//         {/* Shop Info (Right) */}
//         <View style={[styles.spaceY, styles.textRight]}>
//           <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
//             <Text style={styles.shopTitle}>
//               Kashem <Text style={{ color: "#2563EB" }}>Optical</Text>
//             </Text>
//           </View>
//           <Text style={styles.shopText}>Chakbazar</Text>
//           <Text style={styles.shopText}>Lakshmipur, Chittagong</Text>
//           <Text style={styles.shopText}>Bangladesh</Text>
//           <Text style={[styles.shopText, { marginTop: 4 }]}>
//             Date: {new Date(patient?.date).toLocaleString() || "N/A"}
//           </Text>
//         </View>
//       </View>

//       {/* Prescription Details */}
//       <View style={styles.section}>
//         <Text style={[styles.textBold, styles.billTo]}>
//           Prescription Details
//         </Text>
//         <View style={styles.box}>
//           <View style={styles.eyeSection}>
//             <View style={styles.eyeRow}>
//               <Text style={styles.text}>OD (Right Eye)</Text>
//               <Text style={styles.text}>
//                 SPH: {patient?.rightEye?.sph || "N/A"}
//               </Text>
//               <Text style={styles.text}>
//                 CYL: {patient?.rightEye?.cyl || "N/A"}
//               </Text>
//               <Text style={styles.text}>
//                 Axis: {patient?.rightEye?.axis || "N/A"}
//               </Text>
//               <Text style={styles.text}>
//                 Add: {patient?.rightEye?.add || "-"}
//               </Text>
//             </View>
//             <View style={styles.eyeRow}>
//               <Text style={styles.text}>OS (Left Eye)</Text>
//               <Text style={styles.text}>
//                 SPH: {patient?.leftEye?.sph || "N/A"}
//               </Text>
//               <Text style={styles.text}>
//                 CYL: {patient?.leftEye?.cyl || "N/A"}
//               </Text>
//               <Text style={styles.text}>
//                 Axis: {patient?.leftEye?.axis || "N/A"}
//               </Text>
//               <Text style={styles.text}>
//                 Add: {patient?.leftEye?.add || "-"}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Footer */}
//       <View style={{ marginTop: 15, textAlign: "center" }}>
//         <Text style={{ fontSize: 9 }}>
//           Thank you for choosing Kashem Optical! For inquiries, contact us at
//           support@kashemoptical.com
//         </Text>
//       </View>
//     </Page>
//   </Document>
// );

// export function PatientTable({
//   patients,
//   setIsDeleteModalOpen,
//   setDeletePatient,
// }) {
//   const handleEdit = (patient) => {
//     console.log("Edit patient:", patient);
//   };

//   const handleDelete = (patient) => {
//     setDeletePatient(patient);
//     // setIsDeleteModalOpen(true);
//   };

//   return (
//     <div className="border rounded-lg overflow-hidden">
//       <Table>
//         <TableHeader className="bg-base-200">
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Phone</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead>Eye</TableHead>
//             <TableHead>SPH</TableHead>
//             <TableHead>CYL</TableHead>
//             <TableHead>Axis</TableHead>
//             <TableHead>ADD</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {patients?.map((patient) => (
//             <>
//               <TableRow key={patient._id}>
//                 <TableCell rowSpan={2}>{patient.name}</TableCell>
//                 <TableCell rowSpan={2}>{patient.phone}</TableCell>
//                 <TableCell rowSpan={2} className="text-sm">
//                   {patient?.date
//                     ? new Date(patient.date).toLocaleString().split(",")[0]
//                     : "N/A"}
//                   <br />
//                   <span className="mt-[1px] text-xs hidden md:inline">
//                     {patient?.date
//                       ? new Date(patient.date).toLocaleString().split(",")[1]
//                       : "N/A"}
//                   </span>
//                 </TableCell>
//                 <TableCell>OD</TableCell>
//                 <TableCell>{patient.rightEye.sph}</TableCell>
//                 <TableCell>{patient.rightEye.cyl}</TableCell>
//                 <TableCell>{patient.rightEye.axis}</TableCell>
//                 <TableCell>{patient.rightEye.add || "-"}</TableCell>
//                 <TableCell rowSpan={2}>
//                   <div className="flex justify-end items-center">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button size="sm" variant="outline">
//                           <Ellipsis />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem asChild>
//                           <PDFDownloadLink
//                             document={<PatientPDF patient={patient} />}
//                             fileName={`${patient.name}-prescription.pdf`}
//                           >
//                             {({ loading }) => (
//                               <div className="flex items-center w-full">
//                                 <FileDown className="mr-2 h-4 w-4" />
//                                 {loading ? "Generating PDF..." : "Download PDF"}
//                               </div>
//                             )}
//                           </PDFDownloadLink>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleEdit(patient)}>
//                           <Edit className="mr-2 h-4 w-4" />
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={() => handleDelete(patient)}>
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </TableCell>
//               </TableRow>
//               <TableRow key={`${patient._id}-os`}>
//                 <TableCell>OS</TableCell>
//                 <TableCell>{patient.leftEye.sph}</TableCell>
//                 <TableCell>{patient.leftEye.cyl}</TableCell>
//                 <TableCell>{patient.leftEye.axis}</TableCell>
//                 <TableCell>{patient.leftEye.add || "-"}</TableCell>
//               </TableRow>
//             </>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
