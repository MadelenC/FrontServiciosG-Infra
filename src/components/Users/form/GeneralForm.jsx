import React, { useState } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useAuthStore } from "../../../zustand/AuthUsers"; // 👈 AGREGADO

export default function GeneralForm({ onSubmit }) {
  const { users } = useUserStore(); // 👈 se queda igual
  const { user } = useAuthStore(); // 👈 usuario logueado

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    celular: "",
    tipo: "",
    password: "",
    cargo: "",
    email: "",
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

    // 🔥 VALIDACIÓN CÉDULA DUPLICADA
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

    console.log("USER LOGUEADO:", user);
    console.log("INSERTADOR QUE SE ENVÍA:", user?.nombres);

    onSubmit({
      ...formData,
      nombres: nombre,
      apellidos: apellido,
      cedula,
      celular,
      email: email || undefined,

      // 🔥 INSERTADOR (USUARIO LOGUEADO)
      insertador:
        `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() ||
        "DESCONOCIDO",
    });
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
      onSubmit={handleSubmit}
    >
      {/* TITULO */}
      <h3 className="md:col-span-3 text-center font-bold text-gray-600">
        Registro General
      </h3>

      {/* CAMPOS */}
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

      {/* TIPO */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-600">Tipo</label>

        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={inputBase}
        >
          <option value="">Seleccione</option>
          <option value="administrador">Administrador</option>
          <option value="chofer">Chofer</option>
        </select>
      </div>

      {/* CARGO */}
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

      {/* EMAIL */}
      <div className="flex flex-col">
        <label className="text-xs text-gray-600">Email</label>

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {/* BOTÓN */}
      <div className="md:col-span-3 flex justify-center mt-2">
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition">
          Registrar
        </button>
      </div>
    </form>
  );
}