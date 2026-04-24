import React, { useState, useEffect } from "react";
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
      const entidadesPayload = userEntities.facultades.map(facultad => ({
        facultad,
        carrera: userEntities.carreras[0] || null,
        materia: userEntities.materias[0] || null,
        sigla: userEntities.siglas[0] || null,
      }));

      await updateUser(user.id, {
        ...formData,
        password: formData.password || undefined,
        entidades: entidadesPayload,
      });

      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar usuario");
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
    <div className="fixed inset-0 top-11 bg-black bg-opacity-30 flex justify-center items-start overflow-auto p-12 z-50 max-h-[100vh]">
      {/* Contenedor compacto del formulario */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-md p-12 max-w-xl w-full max-h-[80vh] overflow-y-auto"
      >
       {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
          aria-label="Cerrar formulario"
        >
          X
        </button>
        <h1 className="text-lg font-bold mb-4 text-center">Editar Usuario</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Nombre</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Apellido</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Email</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Cédula</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Celular</label>
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Tipo</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
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

        <div className="grid grid-cols-2 gap-4 pt-4 " >
          <MultiSelect
            label="Facultad"
            options={getUniqueOptions("facultad")}
            value={userEntities.facultades}
            onChange={(v) => setUserEntities(prev => ({ ...prev, facultades: v }))}
            chipColor="bg-indigo-100 text-indigo-600"
            
          />

          <MultiSelect
            label="Carrera"
            options={getUniqueOptions("carrera")}
            value={userEntities.carreras}
            onChange={(v) => setUserEntities(prev => ({ ...prev, carreras: v }))}
            chipColor="bg-emerald-100 text-emerald-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <MultiSelect
            label="Materia"
            options={getUniqueOptions("materia")}
            value={userEntities.materias}
            onChange={(v) => setUserEntities(prev => ({ ...prev, materias: v }))}
            chipColor="bg-amber-100 text-amber-700"
          />

          <MultiSelect
            label="Sigla"
            options={getUniqueOptions("sigla")}
            value={userEntities.siglas}
            onChange={(v) => setUserEntities(prev => ({ ...prev, siglas: v }))}
            chipColor="bg-sky-100 text-sky-700"

          />
        </div>

        <div className="flex justify-between items-center mt-4 pt-2 border-t">
         <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
        >
          <VscCheck className="w-4 h-4 " />
          <span>Actualizar</span>
        </button>


          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
          >
           <LuTrash2 className="w-4 h-4" />
           <span>Eliminar </span>
          </button>
        </div>
      </form>
    </div>
  );
}
































