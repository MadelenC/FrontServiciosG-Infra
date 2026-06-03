import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../zustand/AuthUsers";
import api from "../../helpers/axiosClient";
import { useUserStore } from "../../zustand/userStore";
import { toast } from "react-toastify";

import {
  FiMail,
  FiLock,
  FiCamera,
  FiPhone,
  FiShield,
  FiTool,
  FiSave,
  FiActivity,
} from "react-icons/fi";

export default function Profile() {

  const { user, updateUser } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const { updateUser: updateUserStore } = useUserStore();


  const [profile, setProfile] = useState({
    nombres: user?.nombres || "",
    apellidos: user?.apellidos || "",
    celular: user?.celular || "",
  });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  
  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

 
  const handlePasswordChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //  SUBIR AVATAR
  const handleImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

   
    if (!file.type.startsWith("image/")) {
      alert("Solo imágenes");
      return;
    }

    
    if (file.size > 2 * 1024 * 1024) {
      alert("Máximo 2MB");
      return;
    }

   
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await api.post(
        "/auth/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

     
      updateUser({
        avatar: res.data.url,
      });

      toast.success("Foto de perfil actualizada");

    } catch (error) {

      console.log(error);

      toast.error("Error al subir la imagen");
    }
  };

 
  const handleSaveProfile = async () => {
  setLoading(true);

  try {
    const result = await updateUserStore(user.id, {
      nombres: profile.nombres,
      apellidos: profile.apellidos,
      celular: profile.celular,
    });

    if (!result.ok) {
      throw new Error(result.error);
    }

  
    updateUser({
      nombres: profile.nombres,
      apellidos: profile.apellidos,
      celular: profile.celular,
    });

    toast.success("Perfil actualizado correctamente");

  } catch (error) {
    //console.error(error);
    toast.error(
      error?.response?.data?.message ||
      "Error al actualizar perfil"
    );
  } finally {
    setLoading(false);
  }
};

  //  CAMBIAR PASSWORD
 const handleChangePassword = async () => {

  if (form.newPassword !== form.confirmPassword) {
    toast.warning("Las contraseñas no coinciden");
    return;
  }

  if (form.newPassword.length < 6) {
    toast.warning("La contraseña debe tener al menos 6 caracteres");
    return;
  }

   const confirmacion = window.confirm(
    "¿Está seguro de cambiar su contraseña?"
  );

  if (!confirmacion) return;

  setLoading(true);

  try {

 await api.put(
  `/users/${user.id}/change-password`,
  {
    currentPassword: form.currentPassword,
    newPassword: form.newPassword,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

    alert("Contraseña actualizada");

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.log(error);
    alert("Error al cambiar contraseña");
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="min-h-screen bg-white dark:bg-[#0b1020] text-gray-900 dark:text-white p-6">

    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-[#131a2e] rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-white/5">
        <div className="flex flex-col items-center">

          <div className="relative">

            <img
              src={
                preview ||
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${user?.nombres}`
              }
              alt="avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500 shadow-xl"
            />

            <label className="absolute bottom-1 right-1 bg-cyan-500 hover:bg-cyan-400 transition p-3 rounded-full cursor-pointer shadow-lg">

              <FiCamera size={18} />

              <input
                type="file"
                className="hidden"
                onChange={handleImage}
              />

            </label>

          </div>

          <h1 className="mt-5 text-2xl font-bold text-center">
            {user?.nombres} {user?.apellidos}
          </h1>

          <div className="mt-3">

            <span className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold">

              {user?.tipo_serv}

            </span>

          </div>

        </div>

   
        <div className="mt-8 space-y-4">

          <div className="bg-gray-100 dark:bg-[#1a2238] p-4 rounded-2xl border border-gray-200 dark:border-white/5">

            <p className="text-gray-500 dark:text-gray-400 text-sm">Correo</p>

            <div className="flex items-center gap-2 mt-2">

              <FiMail className="text-cyan-500" />

              <span className="font-medium">{user?.email}</span>

            </div>

          </div>

          <div className="bg-gray-100 dark:bg-[#1a2238] p-4 rounded-2xl border border-gray-200 dark:border-white/5">

            <p className="text-gray-500 dark:text-gray-400 text-sm">Celular</p>

            <div className="flex items-center gap-2 mt-2">

              <FiPhone className="text-cyan-500" />

              <span className="font-medium">
                {profile?.celular || "Sin registrar"}
              </span>

            </div>

          </div>

          <div className="bg-gray-100 dark:bg-[#1a2238] p-4 rounded-2xl border border-gray-200 dark:border-white/5">

            <p className="text-gray-500 dark:text-gray-400 text-sm">Rol del sistema</p>

            <div className="flex items-center gap-2 mt-2">

              <FiShield className="text-cyan-500" />

              <span className="bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
                {user?.tipo_serv}
              </span>

            </div>

          </div>

          <div className="bg-gray-100 dark:bg-[#1a2238] p-4 rounded-2xl border border-gray-200 dark:border-white/5">

            <p className="text-gray-500 dark:text-gray-400 text-sm">Cargo</p>

            <div className="flex items-center gap-2 mt-2">

              <FiTool className="text-cyan-500" />

              <span className="font-medium">{user?.cargo || "No asignado"}</span>

            </div>

          </div>

          <div className="bg-gray-100 dark:bg-[#1a2238] p-4 rounded-2xl border border-gray-200 dark:border-white/5">

            <p className="text-gray-500 dark:text-gray-400 text-sm">Estado</p>

            <div className="mt-2">

              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                user?.active
                  ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400"
                  : "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
              }`}>
                {user?.active ? "Activo" : "Inactivo"}
              </span>

            </div>

          </div>

        </div>

      </div>

      
      <div className="lg:col-span-2 space-y-6">

        <div className="bg-white dark:bg-[#131a2e] rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-white/5">

          <h2 className="text-2xl font-bold mb-1">Información Personal</h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Actualiza tu información básica
          </p>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="nombres"
              placeholder="Nombres"
              value={profile.nombres}
              onChange={handleProfileChange}
              className="bg-gray-100 dark:bg-[#1a2238] text-gray-900 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={profile.apellidos}
              onChange={handleProfileChange}
              className="bg-gray-100 dark:bg-[#1a2238] text-gray-900 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <div className="md:col-span-2">

              <input
                type="text"
                name="celular"
                placeholder="Celular"
                value={profile.celular}
                onChange={handleProfileChange}
                className="w-full bg-gray-100 dark:bg-[#1a2238] text-gray-900 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
              />

            </div>

          </div>

          <button
            onClick={handleSaveProfile}
            disabled={loading}
            className="mt-6 bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg"
          >

            <FiSave />

            {loading ? "Guardando..." : "Guardar Cambios"}

          </button>

        </div>

        {/* SEGURIDAD */}
        <div className="bg-white dark:bg-[#131a2e] rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-white/5">

          <h2 className="text-2xl font-bold mb-6">Seguridad</h2>

          <div className="grid gap-4">

            <input
              type="password"
              name="currentPassword"
              placeholder="Contraseña actual"
              value={form.currentPassword}
              onChange={handlePasswordChange}
              className="bg-gray-100 dark:bg-[#1a2238] text-gray-900 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="Nueva contraseña"
              value={form.newPassword}
              onChange={handlePasswordChange}
              className="bg-gray-100 dark:bg-[#1a2238] text-gray-900 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChange={handlePasswordChange}
              className="bg-gray-100 dark:bg-[#1a2238] text-gray-900 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
            >

              <FiLock />

              {loading ? "Actualizando..." : "Cambiar Contraseña"}

            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}