import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function InsertForm({
  isOpen,
  onClose,
  onSave,
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

  // reset al abrir
  useEffect(() => {
    if (!isOpen) return;

    setForm({
      institucion_id: "",
      taller: "",
      descripcion: "",
      responsable: "",
    });

    setErrors({});
  }, [isOpen]);

  if (!isOpen) return null;

  // VALIDACIÓN COMPLETA
  const validate = (data) => {
    const err = {};

    const responsableRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // institución (validación contra lista real)
    if (!data.institucion_id) {
      err.institucion_id = "Seleccione institución";
    } else {
      const existeInst = listaInstituciones.some(
        (i) => String(i.id) === String(data.institucion_id)
      );
      if (!existeInst) {
        err.institucion_id = "Institución inválida";
      }
    }

    // taller (validación contra lista real)
    if (!data.taller) {
      err.taller = "Seleccione taller";
    } else {
      const existeTaller = listaTalleres.some(
        (t) => t.nombre === data.taller
      );
      if (!existeTaller) {
        err.taller = "Taller inválido";
      }
    }

    // descripción
    const descripcion = data.descripcion?.trim() || "";

    if (!descripcion) {
      err.descripcion = "Descripción obligatoria";
    } else if (descripcion.length < 5) {
      err.descripcion = "Mínimo 5 caracteres";
    } else if (descripcion.length > 300) {
      err.descripcion = "Máximo 300 caracteres";
    }

    // responsable
    const responsable = data.responsable?.trim() || "";

    if (!responsable) {
      err.responsable = "Responsable obligatorio";
    } else if (responsable.length < 3) {
      err.responsable = "Mínimo 3 caracteres";
    } else if (responsable.length > 80) {
      err.responsable = "Máximo 80 caracteres";
    } else if (!responsableRegex.test(responsable)) {
      err.responsable = "Solo se permiten letras";
    }

    return err;
  };

  // cambio de inputs
  const handleChange = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(newForm);
    setErrors(validate(newForm));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      toast.error("Corrige los errores del formulario");
      return;
    }

    try {
      await onSave({
        ...form,
        descripcion: form.descripcion.trim(),
        responsable: form.responsable.trim(),
      });

      toast.success("Registrado correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al registrar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

        {/* cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 px-3 py-1 hover:bg-gray-200 rounded"
        >
          X
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Registro de Solicitud de Trabajo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* UNIDAD SOLICITANTE */}
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
              <option value="">Seleccione Seccion</option>

              {listaInstituciones.length > 0 ? (
                listaInstituciones.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.nombre}
                  </option>
                ))
              ) : (
                <option disabled>
                  No hay Secciones disponibles
                </option>
              )}
            </select>

            {errors.institucion_id && (
              <p className="text-red-500 text-sm">
                {errors.institucion_id}
              </p>
            )}
          </div>

          {/*  TALLER */}
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

          {/*  DESCRIPCIÓN */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Descripción del trabajo a realizar
            </label>

            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />

            {errors.descripcion && (
              <p className="text-red-500 text-sm">
                {errors.descripcion}
              </p>
            )}
          </div>

          {/*  RESPONSABLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Responsable
            </label>

            <input
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

          {/* BOTÓN */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
          >
            Registrar
          </button>

        </form>
      </div>
    </div>
  );
}