import React, { useState, useEffect  } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useAuthStore } from "../../../zustand/AuthUsers"; 
import { useInstitutionStore } from "../../../zustand/useInstitutionStore";
import Select from "react-select";

export default function GeneralForm({ onSubmit }) {
  const { users } = useUserStore();
  const { user } = useAuthStore(); 
  const { allInstitutions,  fetchAllInstitutions,} = useInstitutionStore();

  useEffect(() => { fetchAllInstitutions();}, []);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    celular: "",
    tipo_serv: "",
    password: "",
    cargo: "",
    email: "",
    instituciones: [],
  });

  const [errors, setErrors] = useState({});

  const inputBase =
    "p-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400";
  const inputError = "border-red-500";

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "nombre" || name === "apellido") {
      value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    if (name === "celular") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (name === "cedula") {
      value = value.replace(/[^a-zA-Z0-9\-]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const nombre = formData.nombre.trim();
    const apellido = formData.apellido.trim();
    const cedula = formData.cedula.trim();
    const celular = formData.celular.trim();
    const password = formData.password.trim();
    const email = formData.email.trim();

    if (!nombre) newErrors.nombre = "Obligatorio";
    if (!apellido) newErrors.apellido = "Obligatorio";
    if (!cedula) newErrors.cedula = "Obligatorio";

    
    const exists = users.some(
      (u) => String(u.cedula).trim() === cedula
    );

    if (exists) {
      newErrors.cedula = "La cédula ya está registrada";
    }

    if (password.length < 6)
      newErrors.password = "Mínimo 6 caracteres";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.instituciones.length === 0) {
    newErrors.instituciones =
    "Seleccione al menos una institución";
   }

    onSubmit({
      ...formData,
      nombres: nombre,
      apellidos: apellido,
      cedula,
      celular,
      email: email || undefined,
      tipo_serv: formData.tipo_serv, 
      insertador:
        `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() ||
        "DESCONOCIDO",
    });
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full "
      onSubmit={handleSubmit}
    >
      <h3 className="md:col-span-3 text-center font-bold text-gray-600">
        Registro General
      </h3>

     
      {["nombre", "apellido", "password", "cedula", "celular"].map(
        (field) => (
          <div key={field} className="flex flex-col">
            <label className="text-xs text-gray-600 capitalize">
              {field}
            </label>

            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`${inputBase} ${
                errors[field] ? inputError : ""
              }`}
            />

            {errors[field] && (
              <span className="text-red-500 text-xs">
                {errors[field]}
              </span>
            )}
          </div>
        )
      )}

      <div className="flex flex-col">
        <label className="text-xs text-gray-600">Tipo</label>

        <select
          name="tipo_serv"
          value={formData.tipo_serv}
          onChange={handleChange}
          className={inputBase}
        >
          <option value="">Seleccione</option>
          <option value="administradorserv">Administrador</option>
          <option value="encargadoserv">Encargado</option>
          <option value="mensajero">mensajero</option>
          <option value="electricista">Operario</option>
          <option value="mgeneral">m. general</option>
          <option value="supervisor">supervisor</option>
          <option value="mantenimiento">mantenimiento</option>
          <option value="carpintero">carpintero</option>
          <option value="seguridad">seguridad</option>
          <option value="albañil">albañil</option>
          <option value="plomero">plomero</option>
          <option value="sergeneral">ser. generales</option>
        </select>
      </div>

      
      <div className="flex flex-col">
        <label className="text-xs text-gray-600">Cargo</label>

        <select
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
          className={inputBase}
        >
          <option value="">Seleccione</option>
          <option value="jefe">Jefe</option>
          <option value="personal">Personal</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs text-gray-600">Email</label>

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div className="flex flex-col md:col-span-3">
        <label className="text-xs text-gray-600">
          Instituciones
        </label>

        <Select
          isMulti
          closeMenuOnSelect={false}
          placeholder="Seleccione instituciones..."
          options={allInstitutions.map(i => ({
            value: i.id,
            label: i.nombre
          }))}
          onChange={(selected) => {
            setFormData(prev => ({
              ...prev,
              instituciones: selected
                ? selected.map(s => s.value)
                : []
            }));
          }}
        />

        {errors.instituciones && (
          <span className="text-red-500 text-xs">
            {errors.instituciones}
          </span>
        )}
      </div>

     
      <div className="md:col-span-3 flex justify-center mt-2">
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition">
          Registrar
        </button>
      </div>
    </form>
  );
}