import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const NEW_TALLER_VALUE = "__nuevo_taller__";

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
  const [nuevoTaller, setNuevoTaller] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        institucion_id: initialData.institucion?.id || "",
        taller: initialData.taller || "",
        descripcion: initialData.descripcion || "",
        responsable: initialData.responsable || "",
      });
      setNuevoTaller("");
      setErrors({});
    }
  }, [initialData]);

  if (!isOpen) return null;

 
  const validate = (data) => {
    const err = {};

    if (!data.institucion_id) err.institucion_id = "Seleccione institución";
    if (!data.taller) {
      err.taller = "Seleccione taller";
    } else if (data.taller === NEW_TALLER_VALUE) {
      const tallerNuevo = nuevoTaller.trim();

      if (!tallerNuevo) {
        err.taller = "Ingrese el nuevo taller";
      } else if (tallerNuevo.length < 3) {
        err.taller = "Minimo 3 caracteres";
      } else if (tallerNuevo.length > 80) {
        err.taller = "Maximo 80 caracteres";
      }
    }

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

  
  const handleChange = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(newForm);
    setErrors(validate(newForm));
  };

  const handleNuevoTallerChange = (e) => {
    setNuevoTaller(e.target.value);
    setErrors(validate(form));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      toast.error("Corrige los errores del formulario");
      return;
    }

    try {
      const tallerFinal =
        form.taller === NEW_TALLER_VALUE
          ? nuevoTaller.trim()
          : form.taller;

      await onSave({
        ...form,
        taller: tallerFinal,
      });
      toast.success("Actualizado correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };
 
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white dark:bg-gray-700 w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 px-3 py-1 hover:bg-gray-200 rounded"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Actualización de Datos
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Unidad solicitante
            </label>
            <select
              name="institucion_id"
              value={form.institucion_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:text-gray-500"
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

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Taller
            </label>

            <select
              name="taller"
              value={form.taller}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:text-gray-500"
            >
              <option value="">Seleccione taller</option>
              {listaTalleres.map((t, i) => (
                <option key={i} value={t.nombre}>
                  {t.nombre}
                </option>
              ))}

              <option value={NEW_TALLER_VALUE}>
                Agregar nuevo taller
              </option>
            </select>

            {form.taller === NEW_TALLER_VALUE && (
              <input
                type="text"
                value={nuevoTaller}
                onChange={handleNuevoTallerChange}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:text-gray-500"
                placeholder="Nombre del nuevo taller"
              />
            )}

            {errors.taller && (
              <p className="text-red-500 text-sm">
                {errors.taller}
              </p>
            )}
          </div>

        
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Descripción del trabajo
            </label>

            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg dark:text-gray-500"
            />

            {errors.descripcion && (
              <p className="text-red-500 text-sm">
                {errors.descripcion}
              </p>
            )}
          </div>

 
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Responsable
            </label>

            <input
              type="text"
              name="responsable"
              value={form.responsable}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg dark:text-gray-500"
            />

            {errors.responsable && (
              <p className="text-red-500 text-sm">
                {errors.responsable}
              </p>
            )}
          </div>

    
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
