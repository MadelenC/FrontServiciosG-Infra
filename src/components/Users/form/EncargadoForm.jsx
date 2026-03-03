import React, { useState, useEffect, useRef } from "react";
import { useEntidadStore } from "../../../zustand/useEntidadStore";

export default function EncargadoForm({ onSubmit, onClose }) {
  const { entidades, fetchEntidades, loading } = useEntidadStore();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    cedula: "",
    celular: "",
    password: "",
    tipo: "encargado",
  });

  const [userEntities, setUserEntities] = useState({
    facultades: [],
    carreras: [],
    materias: [],
    siglas: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (entidades.length === 0) fetchEntidades();
  }, [entidades.length, fetchEntidades]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (["nombres", "apellidos", "celular", "password"].includes(name)) {
      if (!value.trim()) setErrors((prev) => ({ ...prev, [name]: "Campo obligatorio" }));
      else setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const getUniqueOptions = (field) =>
    entidades.length > 0 ? [...new Set(entidades.map((e) => e[field]).filter(Boolean))] : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nombres.trim()) newErrors.nombres = "Ingrese el nombre";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Ingrese el apellido";
    if (!formData.celular.trim()) newErrors.celular = "Ingrese el celular";
    if (!formData.password.trim()) newErrors.password = "Ingrese la contraseña";

    if (userEntities.facultades.length === 0) newErrors.facultades = "Seleccione al menos una facultad";
    if (userEntities.carreras.length === 0) newErrors.carreras = "Seleccione al menos una carrera";
    if (userEntities.materias.length === 0) newErrors.materias = "Seleccione al menos una materia";
    if (userEntities.siglas.length === 0) newErrors.siglas = "Seleccione al menos una sigla";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({ ...formData, entidades: userEntities });
  };

  if (loading && entidades.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition text-xl font-semibold"
          aria-label="Cerrar"
        >
          
        </button>
      </div>

      <h3 className="text-center font-bold text-gray-600">Registro Encargado</h3>

      <div className="grid grid-cols-2 gap-3">
        {["nombres", "apellidos", "cedula", "celular", "password", "email"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-600 text-xs capitalize">{field}:</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-2 border rounded text-sm w-full ${errors[field] ? "border-red-500" : ""}`}
              placeholder={`Ingrese ${field}`}
            />
            {errors[field] && <span className="text-red-500 text-xs">{errors[field]}</span>}
          </div>
        ))}
      </div>

      {/* AutocompleteMultiSelect */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <AutocompleteMultiSelect
          label="Facultad"
          options={getUniqueOptions("facultad")}
          value={userEntities.facultades}
          onChange={(v) => {
            setUserEntities((prev) => ({ ...prev, facultades: v }));
            if (errors.facultades) setErrors((prev) => ({ ...prev, facultades: false }));
          }}
          error={errors.facultades}
        />
        <AutocompleteMultiSelect
          label="Carrera"
          options={getUniqueOptions("carrera")}
          value={userEntities.carreras}
          onChange={(v) => {
            setUserEntities((prev) => ({ ...prev, carreras: v }));
            if (errors.carreras) setErrors((prev) => ({ ...prev, carreras: false }));
          }}
          error={errors.carreras}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <AutocompleteMultiSelect
          label="Materia"
          options={getUniqueOptions("materia")}
          value={userEntities.materias}
          onChange={(v) => {
            setUserEntities((prev) => ({ ...prev, materias: v }));
            if (errors.materias) setErrors((prev) => ({ ...prev, materias: false }));
          }}
          error={errors.materias}
        />
        <AutocompleteMultiSelect
          label="Sigla"
          options={getUniqueOptions("sigla")}
          value={userEntities.siglas}
          onChange={(v) => {
            setUserEntities((prev) => ({ ...prev, siglas: v }));
            if (errors.siglas) setErrors((prev) => ({ ...prev, siglas: false }));
          }}
          error={errors.siglas}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}

/* ---------------- AutocompleteMultiSelect ---------------- */
const AutocompleteMultiSelect = ({ label, options, value, onChange, error }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addValue = (val) => {
    const trimmed = val.trim();
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed]);
    setInputValue("");
    setOpen(false);
  };

  const removeValue = (val) => onChange(value.filter((v) => v !== val));

  const filteredOptions = options.filter(
    (opt) => !value.includes(opt) && opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="flex flex-col relative" ref={ref}>
      <label className="text-xs font-semibold text-gray-700">{label}</label>
      <div
        className={`border rounded px-2 py-1 flex flex-wrap items-center text-sm focus-within:ring-2 focus-within:ring-indigo-500 ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        onClick={() => setOpen(true)}
      >
        {value.map((v, i) => (
          <span key={i} className="bg-indigo-100 text-indigo-600 px-1 py-0.5 mr-1 rounded flex items-center">
            {v}{" "}
            <button type="button" onClick={() => removeValue(v)} className="ml-1 text-xs font-bold">
              ×
            </button>
          </span>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addValue(inputValue))}
          placeholder={`Ingrese ${label.toLowerCase()}`}
          className="flex-1 border-none focus:ring-0 focus:outline-none text-sm py-0.5"
        />
      </div>
      {open && filteredOptions.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto p-1">
          {filteredOptions.map((opt, i) => (
            <li key={i} className="px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => addValue(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
      {error && <span className="text-red-500 text-xs mt-2">{error}</span>}
    </div>
  );
};