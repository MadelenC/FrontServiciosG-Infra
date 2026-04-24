import React, { useState } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useAuthStore } from "../../../zustand/AuthUsers"; // 👈 NUEVO

export default function EncargadoForm({ onSubmit, onClose }) {
  const { users } = useUserStore(); 
  const { user } = useAuthStore(); // 👈 NUEVO (usuario logueado)

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    cedula: "",
    celular: "",
    password: "",
    tipo: "encargado",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "celular") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (name === "nombres" || name === "apellidos") {
      value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    if (name === "cedula") {
      value = value.replace(/[^a-zA-Z0-9\-]/g, "");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const err = {};

    const nombres = formData.nombres.trim();
    const apellidos = formData.apellidos.trim();
    const cedula = formData.cedula.trim();
    const celular = formData.celular.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombres) err.nombres = "Nombre obligatorio";
    if (!apellidos) err.apellidos = "Apellido obligatorio";

    if (!cedula) {
      err.cedula = "Cédula obligatoria";
    } else if (cedula.length < 5) {
      err.cedula = "Cédula inválida";
    } else {
      const exists = users.some(
        (u) => String(u.cedula).trim() === cedula
      );

      if (exists) {
        err.cedula = "La cédula ya está registrada";
      }
    }

    if (!celular) err.celular = "Celular obligatorio";
    else if (celular.length < 7) err.celular = "Celular inválido";

    if (email && !emailRegex.test(email)) {
      err.email = "Email inválido";
    }

    if (!password) err.password = "Password obligatorio";
    else if (password.length < 6)
      err.password = "Mínimo 6 caracteres";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    onSubmit({
      ...formData,
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      cedula: formData.cedula.trim(),
      celular: formData.celular.trim(),
      email: formData.email.trim(),

      // 🔥 AQUÍ ESTÁ EL INSERTADOR
      insertador:
        `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() ||
        "DESCONOCIDO",
    });
  };

  const inputStyle =
    "p-2 border border-gray-300 rounded-md w-full text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200";

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center font-bold text-gray-700 md:col-span-2 text-lg">
        Registro Encargado
      </h3>

      <div>
        <label className="text-sm font-bold text-gray-700">
          Nombres
        </label>
        <input
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.nombres && (
          <span className="text-red-500 text-xs">{errors.nombres}</span>
        )}
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700">
          Apellidos
        </label>
        <input
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700">
          Cédula
        </label>
        <input
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          className={inputStyle}
        />
        {errors.cedula && (
          <span className="text-red-500 text-xs">{errors.cedula}</span>
        )}
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700">
          Celular
        </label>
        <input
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700">
          Email (opcional)
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>

      <div>
        <label className="text-sm font-bold text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={inputStyle}
        />
      </div>

      <div className="flex justify-center gap-3 md:col-span-2 mt-5">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}