import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditMaintenanceForm({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  listaInstituciones = [],
  listaTalleres = [],
}) {
  const [form, setForm] = useState({
    institucion_id: "",
    taller: "",
    descripcion: "",
    responsable: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        institucion_id: initialData.institucion?.id || "",
        taller: initialData.taller || "",
        descripcion: initialData.descripcion || "",
        responsable: initialData.responsable || "",
      });
      setErrors({});
    }
  }, [initialData]);

  if (!isOpen) return null;

  // 🔥 VALIDACIÓN CENTRAL
  const validate = (data) => {
    const err = {};

    if (!data.institucion_id) err.institucion_id = "Seleccione institución";
    if (!data.taller) err.taller = "Seleccione taller";

    if (!data.descripcion?.trim()) {
      err.descripcion = "Descripción obligatoria";
    } else if (data.descripcion.trim().length < 5) {
      err.descripcion = "Mínimo 5 caracteres";
    }

    if (!data.responsable?.trim()) {
      err.responsable = "Responsable obligatorio";
    } else if (data.responsable.trim().length < 3) {
      err.responsable = "Mínimo 3 caracteres";
    }

    return err;
  };

  // 🔥 HANDLE CHANGE
  const handleChange = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(newForm);
    setErrors(validate(newForm));
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      toast.error("Corrige los errores del formulario");
      return;
    }

    try {
      await onSave(form);
      toast.success("Actualizado correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  // 🔥 DELETE
  const handleDelete = async () => {
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
      try {
        await onDelete(initialData.id);
        toast.success("Eliminado correctamente");
        onClose();
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-xl shadow-lg p-6 relative">

        {/* CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 px-3 py-1 hover:bg-gray-200 rounded"
        >
          X
        </button>

        {/* TÍTULO */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Actualización de Datos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* INSTITUCIÓN */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Unidad solicitante
            </label>

            <select
              name="institucion_id"
              value={form.institucion_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Seleccione institución</option>
              {listaInstituciones.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.nombre}
                </option>
              ))}
            </select>

            {errors.institucion_id && (
              <p className="text-red-500 text-sm">
                {errors.institucion_id}
              </p>
            )}
          </div>

          {/* TALLER */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Taller
            </label>

            <select
              name="taller"
              value={form.taller}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Seleccione taller</option>
              {listaTalleres.map((t, i) => (
                <option key={i} value={t.nombre}>
                  {t.nombre}
                </option>
              ))}
            </select>

            {errors.taller && (
              <p className="text-red-500 text-sm">
                {errors.taller}
              </p>
            )}
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Descripción del trabajo
            </label>

            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.descripcion && (
              <p className="text-red-500 text-sm">
                {errors.descripcion}
              </p>
            )}
          </div>

          {/* RESPONSABLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Responsable
            </label>

            <input
              type="text"
              name="responsable"
              value={form.responsable}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.responsable && (
              <p className="text-red-500 text-sm">
                {errors.responsable}
              </p>
            )}
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-2 pt-4">

            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white
               hover:bg-red-700 active:scale-95 transition
               shadow-sm hover:shadow-md"
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white
               hover:bg-blue-700 active:scale-95 transition
               shadow-sm hover:shadow-md"
            >
              Actualizar
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}