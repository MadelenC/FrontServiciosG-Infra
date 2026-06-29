import { useState, useEffect } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useAuthStore } from "../../../zustand/AuthUsers";
import { useInstitutionStore } from "../../../zustand/useInstitutionStore";
import Select from "react-select";

const normalizeCi = (value = "") =>
  value.trim().replace(/\s+/g, "").toUpperCase();

const ciRegex = /^[0-9A-Z-]{5,15}$/;

export default function EncargadoForm({ onSubmit, onClose }) {
  const { users } = useUserStore();
  const { user } = useAuthStore();
  const { allInstitutions, fetchAllInstitutions } = useInstitutionStore();

  useEffect(() => {
    fetchAllInstitutions();
  }, [fetchAllInstitutions]);

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    cedula: "",
    celular: "",
    password: "",
    tipo_serv: "encargadoserv",
    instituciones: [],
  });

  const [errors, setErrors] = useState({});

  const validate = (data = formData) => {
    const err = {};
    const nombres = data.nombres.trim();
    const apellidos = data.apellidos.trim();
    const cedula = normalizeCi(data.cedula);
    const celular = data.celular.trim();
    const email = data.email.trim();
    const password = data.password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombres) err.nombres = "Nombre obligatorio";
    else if (nombres.length < 2) err.nombres = "Minimo 2 caracteres";

    if (!apellidos) err.apellidos = "Apellido obligatorio";
    else if (apellidos.length < 2) err.apellidos = "Minimo 2 caracteres";

    if (!cedula) {
      err.cedula = "CI obligatorio";
    } else if (!ciRegex.test(cedula)) {
      err.cedula = "CI invalido";
    } else {
      const exists = users.some(
        (u) => normalizeCi(u.cedula) === cedula
      );

      if (exists) {
        err.cedula = "El CI ya esta registrado";
      }
    }

    if (!celular) err.celular = "Celular obligatorio";
    else if (!/^[0-9]{7,12}$/.test(celular)) {
      err.celular = "Celular invalido";
    }

    if (email && !emailRegex.test(email)) {
      err.email = "Email invalido";
    }

    if (!password) err.password = "Password obligatorio";
    else if (password.length < 6) {
      err.password = "Minimo 6 caracteres";
    }

    if (data.instituciones.length === 0) {
      err.instituciones = "Seleccione al menos una institucion";
    }

    return err;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "celular") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (name === "nombres" || name === "apellidos") {
      value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    if (name === "cedula") {
      value = value.replace(/[^a-zA-Z0-9-]/g, "").toUpperCase();
    }

    const nextForm = {
      ...formData,
      [name]: value,
    };

    setFormData(nextForm);
    setErrors(validate(nextForm));
  };

  const handleInstitutionsChange = (selected) => {
    const nextForm = {
      ...formData,
      instituciones: selected ? selected.map((s) => s.value) : [],
    };

    setFormData(nextForm);
    setErrors(validate(nextForm));
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
      cedula: normalizeCi(formData.cedula),
      celular: formData.celular.trim(),
      email: formData.email.trim() || undefined,
      insertador:
        `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() ||
        "DESCONOCIDO",
    });
  };

  const inputStyle =
    "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  const fieldClass = "flex flex-col";

  const ErrorText = ({ children }) =>
    children ? (
      <span className="mt-1 text-xs font-medium text-red-500">
        {children}
      </span>
    ) : null;

  return (
    <form
<<<<<<< HEAD
  className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
  onSubmit={handleSubmit}
>
  <h3 className="text-center font-bold text-gray-800 dark:text-white md:col-span-2 text-xl mb-2">
    Registro Encargado
  </h3>

  {/* NOMBRES */}
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Nombres
    </label>
    <input
      name="nombres"
      value={formData.nombres}
      onChange={handleChange}
      placeholder="Ej: Juan Carlos"
      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-800 text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    {errors.nombres && (
      <span className="text-red-500 text-xs">{errors.nombres}</span>
    )}
  </div>

  {/* APELLIDOS */}
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Apellidos
    </label>
    <input
      name="apellidos"
      value={formData.apellidos}
      onChange={handleChange}
      placeholder="Ej: Pérez López"
      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-800 text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    {errors.apellidos && (
      <span className="text-red-500 text-xs">{errors.apellidos}</span>
    )}
  </div>

  {/* CÉDULA */}
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Cédula
    </label>
    <input
      name="cedula"
      value={formData.cedula}
      onChange={handleChange}
      placeholder="Ej: 8616821 o 1234567-1"
      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-800 text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    {errors.cedula && (
      <span className="text-red-500 text-xs">{errors.cedula}</span>
    )}
  </div>

  {/* CELULAR */}
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Celular
    </label>
    <input
      name="celular"
      value={formData.celular}
      onChange={handleChange}
      placeholder="Ej: 71234567"
      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-800 text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    {errors.celular && (
      <span className="text-red-500 text-xs">{errors.celular}</span>
    )}
  </div>

  {/* EMAIL */}
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Email (opcional)
    </label>
    <input
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Ej: usuario@gmail.com (opcional)"
      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-800 text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    {errors.email && (
      <span className="text-red-500 text-xs">{errors.email}</span>
    )}
  </div>

  {/* PASSWORD */}
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Password
    </label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Ingrese una contraseña segura"
      className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      bg-white dark:bg-gray-800 text-gray-800 dark:text-white
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
    {errors.password && (
      <span className="text-red-500 text-xs">{errors.password}</span>
    )}
  </div>

  {/* SELECT INSTITUCIONES */}
  <div className="md:col-span-2">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
      Instituciones
    </label>

    <div className="mt-1">
      <Select
        isMulti
        closeMenuOnSelect={false}
        placeholder="Seleccione instituciones..."
        options={allInstitutions.map((i) => ({
          value: i.id,
          label: i.nombre,
        }))}
        onChange={(selected) => {
          setFormData((prev) => ({
            ...prev,
            instituciones: selected
              ? selected.map((s) => s.value)
              : [],
          }));
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "transparent",
            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
            boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
            borderRadius: "10px",
            padding: "2px",
          }),
        }}
      />
    </div>

    {errors.instituciones && (
      <span className="text-red-500 text-xs">
        {errors.instituciones}
      </span>
    )}
  </div>

  {/* BOTONES */}
  <div className="md:col-span-2 flex justify-end gap-3 mt-4">
    <button
      type="button"
      onClick={onClose}
      className="px-5 py-2 rounded-lg border border-gray-300
      text-gray-700 hover:bg-gray-100 transition"
    >
      Cancelar
    </button>

    <button
      type="submit"
      className="px-6 py-2 rounded-lg bg-blue-600 text-white
      hover:bg-blue-700 shadow-md transition
      active:scale-95"
    >
      Registrar
    </button>
  </div>
</form>
=======
      className="w-full space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="border-b border-gray-200 pb-3">
        <h3 className="text-center text-lg font-bold text-gray-800">
          Registro Encargado
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={fieldClass}>
          <label className="text-sm font-semibold text-gray-700">
            Nombres
          </label>
          <input
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className={inputStyle}
          />
          <ErrorText>{errors.nombres}</ErrorText>
        </div>

        <div className={fieldClass}>
          <label className="text-sm font-semibold text-gray-700">
            Apellidos
          </label>
          <input
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className={inputStyle}
          />
          <ErrorText>{errors.apellidos}</ErrorText>
        </div>

        <div className={fieldClass}>
          <label className="text-sm font-semibold text-gray-700">
            CI
          </label>
          <input
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Ej: 1234567"
          />
          <ErrorText>{errors.cedula}</ErrorText>
        </div>

        <div className={fieldClass}>
          <label className="text-sm font-semibold text-gray-700">
            Celular
          </label>
          <input
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Ej: 71234567"
          />
          <ErrorText>{errors.celular}</ErrorText>
        </div>

        <div className={fieldClass}>
          <label className="text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Opcional"
          />
          <ErrorText>{errors.email}</ErrorText>
        </div>

        <div className={fieldClass}>
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={inputStyle}
          />
          <ErrorText>{errors.password}</ErrorText>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">
            Instituciones
          </label>
          <div className="mt-1">
            <Select
              isMulti
              closeMenuOnSelect={false}
              placeholder="Seleccione instituciones..."
              options={allInstitutions.map((i) => ({
                value: i.id,
                label: i.nombre,
              }))}
              onChange={handleInstitutionsChange}
            />
          </div>
          <ErrorText>{errors.instituciones}</ErrorText>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Registrar
        </button>
      </div>
    </form>
>>>>>>> 4423ebd (feat: descripción de los cambios)
  );
}
