import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

export function PatientDetailsModal({ patient, isOpen, onClose }) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Patient Details</DialogTitle>
          <DialogDescription>
            View the detailed information and prescription for the patient.
          </DialogDescription>
        </DialogHeader>
        {patient && (
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <p>
                  <strong>Name:</strong> {patient.name}
                </p>
                <p>
                  <strong>Phone:</strong> {patient.phone}
                </p>
              </div>
              <p>
                <strong>Date:</strong> {new Date(patient.date).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Prescription Details</p>
              <div className="space-y-2">
                <div className="border rounded-md p-2 flex justify-between items-center">
                  <span>OD</span>
                  <span>SPH: {patient.rightEye.sph}</span>
                  <span>CYL: {patient.rightEye.cyl}</span>
                  <span>Axis: {patient.rightEye.axis}</span>
                  <span>Add: {patient.rightEye.add || "-"}</span>
                </div>
                <div className="border rounded-md p-2 flex justify-between items-center">
                  <span>OS</span>
                  <span>SPH: {patient.leftEye.sph}</span>
                  <span>CYL: {patient.leftEye.cyl}</span>
                  <span>Axis: {patient.leftEye.axis}</span>
                  <span>Add: {patient.leftEye.add || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
