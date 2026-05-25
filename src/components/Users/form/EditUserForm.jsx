import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import { VscCheck } from "react-icons/vsc";
import { LuTrash2 } from "react-icons/lu";
import Select from "react-select";
import { toast } from "react-toastify";

export default function EditUserForm({ user, onUpdate, onDelete, onClose }) {

  const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#111827",
    borderColor: state.isFocused ? "#6366f1" : "#374151",
    borderRadius: "16px",
    minHeight: "48px",
    boxShadow: "none",
    padding: "2px",
    "&:hover": {
      borderColor: "#6366f1",
    },
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "#111827",
    borderRadius: "16px",
    overflow: "hidden",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "#1f2937"
      : "#111827",
    color: "#fff",
    cursor: "pointer",
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#312e81",
    borderRadius: "999px",
    padding: "2px 6px",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "#c7d2fe",
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: "#c7d2fe",
    ":hover": {
      backgroundColor: "#4338ca",
      color: "white",
    },
  }),

  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),

  input: (base) => ({
    ...base,
    color: "#fff",
  }),
};
  
  const { entidades } = useEntidadStore();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    password: "",
    email: "",
    cedula: "",
    celular: "",
    tipo: "",
  });

  const [userEntities, setUserEntities] = useState({
    facultades: [],
    carreras: [],
    materias: [],
    siglas: [],
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      nombres: user.nombres || "",
      apellidos: user.apellidos || "",
      password: "",
      email: user.email || "",
      cedula: user.cedula || "",
      celular: user.celular || "",
      tipo: user.tipo || "",
    });

    setUserEntities({
      facultades: [...new Set(user.entidades?.map(e => e.facultad).filter(Boolean))],
      carreras: [...new Set(user.entidades?.map(e => e.carrera).filter(Boolean))],
      materias: [...new Set(user.entidades?.map(e => e.materia).filter(Boolean))],
      siglas: [...new Set(user.entidades?.map(e => e.sigla).filter(Boolean))],
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getUniqueOptions = (field) =>
    [...new Set(entidades.map(e => e[field]).filter(Boolean))];

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const entidadesPayload = userEntities.facultades.map((facultad) => ({
      facultad,
      carrera: userEntities.carreras[0] || null,
      materia: userEntities.materias[0] || null,
      sigla: userEntities.siglas[0] || null,
    }));

  
    const result = await onUpdate?.({
      ...formData,
      password: formData.password || undefined,
      entidades: entidadesPayload,
    });
    console.log("RESULT UPDATE:", result);

      if (result?.ok === true) {
      toast.success("Usuario actualizado correctamente ✅");
      onClose?.();
    } else {
      toast.error(result?.error || "Error al actualizar usuario ❌");
    }

  } catch (err) {
    console.error(err);
    toast.error("Error inesperado al actualizar usuario ❌");
  }
};

  const MultiSelect = ({ label, options, value, onChange, chipColor }) => (
    <div className="flex flex-col space-y-1">
      <label className="text-xs font-semibold text-gray-900">{label}</label>
      <select
        multiple
        value={value}
        onChange={(e) =>
          onChange([...e.target.selectedOptions].map(o => o.value))
        }
        className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50 max-h-24 overflow-y-auto"
        style={{ minWidth: "150px" }}
      >
        {options.map((op, i) => (
          <option key={i} value={op}>{op}</option>
        ))}
      </select>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {value.map((item, i) => (
            <span
              key={i}
              className={`${chipColor} px-2 py-0.5 rounded-full text-xs`}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 top-11 flex justify-center items-start overflow-auto p-12 z-50 max-h-[100vh] bg-black/40 backdrop-blur-sm">
      
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-md p-12 max-w-xl w-full max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:text-gray-200"
      >
      
        <button
      
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-400"
          aria-label="Cerrar formulario"
        >
          X
        </button>
        <h1 className="text-lg font-bold mb-4 text-center">Editar Usuario</h1>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="flex flex-col ">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Nombre</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm dark:text-gray-700 "
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Apellido</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm dark:text-gray-700 "
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded px-2 py-1 text-sm dark:text-gray-700 "
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Email</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm dark:text-gray-700 "
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-200 ">Cédula</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm dark:text-gray-700 "
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-200 ">Celular</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm dark:text-gray-700 "
              name="celular"
              value={formData.celular}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-200">Tipo</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white dark:text-gray-700 "
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>

                <option value="administradorserv">Administrador</option>
                <option value="encargadoserv">Encargado</option>
                <option value="mensajeroserv">Mensajero</option>

                <option value="electricista">Electricista</option>
                <option value="sergeneral">Servicios generales</option>

                <option value="supervisor">Supervisor</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="carpintero">Carpintero</option>
                <option value="albañil">Albañil</option>
                <option value="plomero">Plomero</option>
                <option value="seguridad">Seguridad</option>
                </select>
          </div>
        </div>

    <div className="space-y-5 pt-4">

  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

  
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Facultad
      </label>

      <Select
        isMulti
        options={getUniqueOptions("facultad").map((item) => ({
          value: item,
          label: item,
        }))}
        value={(userEntities.facultades || []).map((item) => ({
          value: item,
          label: item,
        }))}
        onChange={(selected) =>
          setUserEntities((prev) => ({
            ...prev,
            facultades: selected.map((s) => s.value),
          }))
        }
        styles={customStyles}
        placeholder="Seleccionar facultades"
      />
    </div>

    
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Carrera
      </label>

      <Select
        isMulti
        options={getUniqueOptions("carrera").map((item) => ({
          value: item,
          label: item,
        }))}
        value={userEntities.carreras.map((item) => ({
          value: item,
          label: item,
        }))}
        onChange={(selected) =>
          setUserEntities((prev) => ({
            ...prev,
            carreras: selected.map((s) => s.value),
          }))
        }
        styles={customStyles}
        placeholder="Seleccionar carreras"
      />
    </div>

  </div>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Materia
      </label>

      <Select
        isMulti
        options={getUniqueOptions("materia").map((item) => ({
          value: item,
          label: item,
        }))}
        value={userEntities.materias.map((item) => ({
          value: item,
          label: item,
        }))}
        onChange={(selected) =>
          setUserEntities((prev) => ({
            ...prev,
            materias: selected.map((s) => s.value),
          }))
        }
        styles={customStyles}
        placeholder="Seleccionar materias"
      />
    </div>


    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sigla
      </label>

      <select
        className="
          w-full rounded-2xl
          border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-900
          px-4 py-3
          text-gray-700 dark:text-gray-200
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-sky-500
          focus:border-sky-500
          transition-all
        "
        value={userEntities.sigla}
        onChange={(e) =>
          setUserEntities((prev) => ({
            ...prev,
            sigla: e.target.value,
          }))
        }
      >
        <option value="">Seleccionar sigla</option>

        {getUniqueOptions("sigla").map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>

  </div>

</div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">

  
  <button
    type="submit"
    className="
      group flex items-center gap-2
      bg-indigo-600 hover:bg-indigo-700
      text-white
      px-5 py-2.5
      rounded-xl
      text-sm font-medium
      shadow-md shadow-indigo-500/20
      hover:shadow-lg hover:shadow-indigo-500/30
      transition-all duration-200
      active:scale-95
    "
  >
    <VscCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
    <span>Actualizar</span>
  </button>

  
  <button
    type="button"
    onClick={onDelete}
    className="
      group flex items-center gap-2
      bg-white dark:bg-gray-900
      border border-red-200 dark:border-red-800
      text-red-600 dark:text-red-400
      hover:bg-red-50 dark:hover:bg-red-950/40
      px-5 py-2.5
      rounded-xl
      text-sm font-medium
      shadow-sm
      hover:shadow-md
      transition-all duration-200
      active:scale-95
    "
  >
    <LuTrash2 className="w-4 h-4 transition-transform group-hover:rotate-6" />
    <span>Eliminar</span>
  </button>

</div>
      </form>
    </div>
  );
}
































