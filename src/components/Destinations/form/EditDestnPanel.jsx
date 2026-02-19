import React, { useEffect } from "react";
import EditDestForm from "./EditDestnForm";

export default function EditDestPanel({ open, onClose, destino }) {
  if (!open) return null;

  return (
    <EditDestForm
      destino={destino}
      onClose={onClose}
    />
  );
}
