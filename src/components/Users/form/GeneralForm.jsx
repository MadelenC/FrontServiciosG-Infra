import React, { useState } from "react";

export default function GeneralForm({ onSubmit }) {
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

  const inputBase = "p-2 border rounded text-sm w-full";
  const inputError = "border-red-500";

  const requiredFields = ["nombre", "apellido", "cedula", "celular", "tipo", "password"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (requiredFields.includes(name) && !value?.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = "Este campo es obligatorio";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.warning("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const userPayload = {
      nombres: formData.nombre.trim(),
      apellidos: formData.apellido.trim(),
      cedula: formData.cedula.trim(),
      celular: formData.celular.trim(),
      tipo: formData.tipo,
      password: formData.password.trim(),
      cargo: formData.cargo.trim() || undefined,
      email: formData.email.trim() || undefined,
    };

    console.log("PAYLOAD FINAL:", userPayload);
    onSubmit(userPayload);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <h3 className="text-center font-bold text-gray-600">Registro General</h3>

      <div className="grid grid-cols-3 gap-3">
        {["nombre", "apellido", "password", "cedula", "celular"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-600 text-xs capitalize">{field}:</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors[field] ? inputError : ""}`}
              placeholder={`Ingrese ${field}`}
            />
            {errors[field] && (
              <span className="text-red-500 text-xs">{errors[field]}</span>
            )}
          </div>
        ))}

        {/* Tipo de usuario */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-xs">Tipo de Usuario:</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${errors.tipo ? inputError : ""}`}
          >
            <option value="">Seleccione un tipo</option>
            <option value="administrador">Administrador</option>
            <option value="supervisor">Supervisor</option>
            <option value="chofer">Chofer</option>
            <option value="mecánico">Mecánico</option>
            <option value="mensajero">Mensajero</option>
          </select>
          {errors.tipo && <span className="text-red-500 text-xs">{errors.tipo}</span>}
        </div>
      </div>

      {/* Campos opcionales */}
      <div className="flex flex-col mt-2">
        <label className="text-gray-600 text-xs">Cargo (opcional):</label>
        <input
          type="text"
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
          className={inputBase}
          placeholder="Cargo"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-gray-600 text-xs">Email (opcional):</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputBase}
          placeholder="Email"
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

