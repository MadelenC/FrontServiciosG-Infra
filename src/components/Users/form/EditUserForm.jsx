import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { useUserStore } from "../../../zustand/userStore";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import { VscCheck } from "react-icons/vsc";
import { LuTrash2 } from "react-icons/lu";

export default function EditUserForm({ user, onUpdate, onDelete, onClose }) {
  const { updateUser } = useUserStore();
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
      nombres: user.nombres ?? "",
      apellidos: user.apellidos ?? "",
      password: "",
      email: user.email ?? "",
      cedula: user.cedula ?? "",
      celular: user.celular ?? "",
      tipo: user.tipo ?? "",
    });

    setUserEntities({
      facultades: [...new Set(user.entidades?.map(e => e.facultad).filter(Boolean))],
      carreras: [...new Set(user.entidades?.map(e => e.carrera).filter(Boolean))],
      materias: [...new Set(user.entidades?.map(e => e.materia).filter(Boolean))],
      siglas: [...new Set(user.entidades?.map(e => e.sigla).filter(Boolean))],
    });
  }, [user]);

  
  const handleChange = ({ target }) => {
    setFormData(prev => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

 
  const options = useMemo(() => {
    const build = (field) =>
      [...new Set(entidades.map(e => e[field]).filter(Boolean))].map(v => ({
        label: v,
        value: v,
      }));

    return {
      facultad: build("facultad"),
      carrera: build("carrera"),
      materia: build("materia"),
      sigla: build("sigla"),
    };
  }, [entidades]);

 
  const handleSelectChange = (field, selected) => {
    setUserEntities(prev => ({
      ...prev,
      [field]: selected ? selected.map(s => s.value) : [],
    }));
  };

  const getValue = (field) =>
    userEntities[field].map(v => ({ label: v, value: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const entidadesPayload = userEntities.facultades.map(facultad => ({
        facultad,
        carrera: userEntities.carreras,
        materia: userEntities.materias,
        sigla: userEntities.siglas,
      }));

      await updateUser(user.id, {
        ...formData,
        password: formData.password || undefined,
        entidades: entidadesPayload,
      });

      onUpdate?.();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar usuario");
    }
  };


  return (
    <div className="fixed inset-0 top-11 bg-black bg-opacity-30 flex justify-center items-start overflow-auto p-12 z-50">

      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-md p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto"
      >

        {/* CLOSE */}
         <button
          onClick={onClose}
          className="absolute top-3 right-3 px-3 py-1 hover:bg-gray-200 rounded"
        >
          X
        </button>

        <h1 className="text-lg font-bold mb-4 text-center">
          Editar Usuario
        </h1>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">

          <Input label="Nombre" name="nombres" value={formData.nombres} onChange={handleChange} />
          <Input label="Apellido" name="apellidos" value={formData.apellidos} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Cédula" name="cedula" value={formData.cedula} onChange={handleChange} />
          <Input label="Celular" name="celular" value={formData.celular} onChange={handleChange} />

          <div className="flex flex-col">
            <label className="text-xs font-semibold">Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">Seleccione...</option>
              <option value="encargado">Encargado</option>
              <option value="administrador">Administrador</option>
              <option value="chofer">Chofer</option>
              <option value="supervisor">Supervisor</option>
              <option value="mecanico">Mecánico</option>
              <option value="mensajero">Mensajero</option>
            </select>
          </div>
        </div>

        {/* SELECTS */}
        <div className="grid grid-cols-2 gap-4 mt-4">

          <SelectField
            label="Facultades"
            options={options.facultad}
            value={getValue("facultades")}
            onChange={(v) => handleSelectChange("facultades", v)}
          />

          <SelectField
            label="Carreras"
            options={options.carrera}
            value={getValue("carreras")}
            onChange={(v) => handleSelectChange("carreras", v)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">

          <SelectField
            label="Materias"
            options={options.materia}
            value={getValue("materias")}
            onChange={(v) => handleSelectChange("materias", v)}
          />

          <SelectField
            label="Siglas"
            options={options.sigla}
            value={getValue("siglas")}
            onChange={(v) => handleSelectChange("siglas", v)}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6 pt-3 border-t">

          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
          >
            <VscCheck className="w-4 h-4" />
            Actualizar
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
          >
            <LuTrash2 className="w-4 h-4" />
            Eliminar
          </button>

        </div>
      </form>
    </div>
  );
}

/* COMPONENTES (igual pero limpio) */

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold">{label}</label>
    <input {...props} className="border rounded px-2 py-1 text-sm" />
  </div>
);

const SelectField = ({ label, options, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold mb-1">{label}</label>
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      className="text-sm"
    />
  </div>
);































