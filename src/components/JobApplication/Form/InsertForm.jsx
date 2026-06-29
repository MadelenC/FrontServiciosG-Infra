import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const NEW_TALLER_VALUE = "__nuevo_taller__";
const EQUIPMENT_FIELDS = [
  { name: "equipo", label: "Equipo" },
  { name: "marca", label: "Marca" },
  { name: "modelo", label: "Modelo" },
  { name: "numero", label: "N/s" },
  { name: "codigo", label: "Codigo" },
  { name: "otros", label: "Otros" },
];

const isMaintenanceWorkshop = (taller) =>
  taller?.trim().toLowerCase() === "mantenimiento";

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
    equipo: "",
    marca: "",
    modelo: "",
    numero: "",
    codigo: "",
    otros: "",
    descripcion: "",
    responsable: "",
  });

  const [errors, setErrors] = useState({});
  const [nuevoTaller, setNuevoTaller] = useState("");

  
  useEffect(() => {
    if (!isOpen) return;

    setForm({
      institucion_id:
        listaInstituciones.length === 1
          ? String(listaInstituciones[0].id)
          : "",
      taller: "",
      equipo: "",
      marca: "",
      modelo: "",
      numero: "",
      codigo: "",
      otros: "",
      descripcion: "",
      responsable: "",
    });

    setNuevoTaller("");
    setErrors({});
  }, [isOpen, listaInstituciones]);

  if (!isOpen) return null;

  
  const validate = (data) => {
    const err = {};

    const responsableRegex =
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    
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
    } else {
      const existeTaller = listaTalleres.some(
        (t) => t.nombre === data.taller
      );
      if (!existeTaller) {
        err.taller = "Taller inválido";
      }
    }


    if (isMaintenanceWorkshop(data.taller)) {
      EQUIPMENT_FIELDS.forEach(({ name, label }) => {
        const value = data[name]?.trim() || "";

        if (name === "otros" && !value) {
          return;
        }

        if (!value) {
          err[name] = `${label} obligatorio`;
        } else if (value.length > 80) {
          err[name] = "Maximo 80 caracteres";
        }
      });
    }

    const descripcion = data.descripcion?.trim() || "";

    if (!descripcion) {
      err.descripcion = "Descripción obligatoria";
    } else if (descripcion.length < 5) {
      err.descripcion = "Mínimo 5 caracteres";
    } else if (descripcion.length > 300) {
      err.descripcion = "Máximo 300 caracteres";
    }

    
    const responsable = data.responsable?.trim() || "";

    if (!responsable) {
      err.responsable = "Responsable obligatorio";
    } else if (responsable.length < 3) {
      err.responsable = "Mínimo 3 caracteres";
    } else if (responsable.length > 80) {
      err.responsable = "Máximo 80 caracteres";
    } else if (!responsableRegex.test(responsable.replace(/[.,]/g, ""))) {
      err.responsable = "Solo se permiten letras";
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
        equipo: form.equipo.trim(),
        marca: form.marca.trim(),
        modelo: form.modelo.trim(),
        numero: form.numero.trim(),
        codigo: form.codigo.trim(),
        otros: form.otros.trim(),
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

      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">

        
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

    
          <div>
            <label className="block text-sm font-medium mb-1">
              Unidad solicitante
            </label>

            <select
              name="institucion_id"
              value={form.institucion_id}
              onChange={handleChange}
              disabled={listaInstituciones.length === 1}
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

              <option value={NEW_TALLER_VALUE}>
                Agregar nuevo taller
              </option>
            </select>

            {form.taller === NEW_TALLER_VALUE && (
              <input
                type="text"
                value={nuevoTaller}
                onChange={handleNuevoTallerChange}
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                placeholder="Nombre del nuevo taller"
              />
            )}

            {errors.taller && (
              <p className="text-red-500 text-sm">
                {errors.taller}
              </p>
            )}
          </div>

          {isMaintenanceWorkshop(form.taller) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EQUIPMENT_FIELDS.map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>

                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />

                  {errors[name] && (
                    <p className="text-red-500 text-sm">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

  
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
