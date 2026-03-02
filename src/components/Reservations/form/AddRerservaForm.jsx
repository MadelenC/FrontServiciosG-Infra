import React, { useState, useEffect } from "react";

export default function ReservaModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  users = [], // todos los usuarios desde el store
}) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    user_id: "",
    fechaInicial: "",
    fechaFinal: "",
    entidad: "",
    objetivo: "",
    pasajeros: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);

  // Inicializa el form cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          user_id: initialData.user?.id || "", // <-- selecciona el encargado actual
          fechaInicial: initialData.fecha_inicial?.slice(0, 16) || "",
          fechaFinal: initialData.fecha_final?.slice(0, 16) || "",
          entidad: initialData.entidad || "",
          objetivo: initialData.objetivo || "",
          pasajeros: initialData.pasajeros || "",
        });
      } else {
        resetForm();
      }
    }
  }, [isOpen, initialData]);

  const resetForm = () => {
    setFormData({
      user_id: "",
      fechaInicial: "",
      fechaFinal: "",
      entidad: "",
      objetivo: "",
      pasajeros: "",
    });
    setErrors({});
    setTouched({});
  };

  if (!isOpen) return null;

  // Validaciones individuales
  const validateField = (name, value) => {
    switch (name) {
      case "user_id":
      case "entidad":
      case "objetivo":
        if (!value || value.toString().trim() === "") return "Este campo es obligatorio";
        break;
      case "pasajeros":
        if (!value) return "Campo obligatorio";
        if (Number(value) <= 0) return "Debe ser mayor a 0";
        break;
      case "fechaInicial":
      case "fechaFinal":
        if (!value) return "Campo obligatorio";
        break;
      default:
        return null;
    }
    return null;
  };

  // Validación del formulario completo
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (
      formData.fechaInicial &&
      formData.fechaFinal &&
      new Date(formData.fechaFinal) <= new Date(formData.fechaInicial)
    ) {
      newErrors.fechaFinal = "Debe ser mayor que la fecha inicial";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      user_id: formData.user_id,
      fecha_inicial: formData.fechaInicial,
      fecha_final: formData.fechaFinal,
      entidad: formData.entidad,
      objetivo: formData.objetivo,
      pasajeros: Number(formData.pasajeros),
    };

    setSaving(true);
    const response = await onSave(payload);
    setSaving(false);

    if (!response?.ok) {
      alert(response?.error || "Error al guardar");
    } else {
      resetForm();
      onClose();
    }
  };

  // Cambia el borde si hay error
  const inputStyle = (name) =>
    `w-full border px-3 py-2 rounded-md transition ${
      touched[name] && errors[name]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-blue-400"
    }`;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {isEditMode ? "Editar Reserva" : "Nueva Reserva"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Encargado */}
          <div>
            <label className="font-semibold">Encargado</label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle("user_id")}
            >
              <option value="">Seleccione encargado</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nombres} {user.apellidos}
                </option>
              ))}
            </select>
            {touched.user_id && errors.user_id && (
              <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>
            )}
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Fecha Inicial</label>
              <input
                type="datetime-local"
                name="fechaInicial"
                value={formData.fechaInicial}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputStyle("fechaInicial")}
              />
              {touched.fechaInicial && errors.fechaInicial && (
                <p className="text-red-500 text-sm">{errors.fechaInicial}</p>
              )}
            </div>

            <div>
              <label>Fecha Final</label>
              <input
                type="datetime-local"
                name="fechaFinal"
                value={formData.fechaFinal}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputStyle("fechaFinal")}
              />
              {touched.fechaFinal && errors.fechaFinal && (
                <p className="text-red-500 text-sm">{errors.fechaFinal}</p>
              )}
            </div>
          </div>

          {/* Otros campos */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="entidad"
              placeholder="Entidad"
              value={formData.entidad}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle("entidad")}
            />
            <input
              type="text"
              name="objetivo"
              placeholder="Objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle("objetivo")}
            />
            <input
              type="number"
              name="pasajeros"
              placeholder="Pasajeros"
              value={formData.pasajeros}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle("pasajeros")}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-5 py-2 rounded-md"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-700 text-white px-5 py-2 rounded-md"
            >
              {saving ? "Guardando..." : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}