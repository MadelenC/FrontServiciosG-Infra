import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import Button from "../ui/button/Button";
import {useAuthStore } from "../../zustand/AuthUsers";
import { loginService } from "../../services/authService";


export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const module = params.get("module");

  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    cedula: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginService(formData);

      setUser(res.user);
      setToken(res.token);

      console.log("MODULE:", module);

      
      if (!module) {
        navigate("/");
        return;
      }

      switch (module) {
        case "mantenimiento":
          navigate("/dashboard");
          break;

        case "viajes":
          navigate("/viajes");
          break;

        case "servicios":
          navigate("/servicios");
          break;

        default:
          navigate("/");
      }

    } catch (err) {
      console.log(err.response);
      alert(err.response?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#F3F4F6]">

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Ingresa tu CI y contraseña para continuar
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* CÉDULA */}
          <div>
            <label className="text-sm text-gray-700">
              Cédula de Identidad
            </label>

            <input
              name="cedula"
              type="text"
              value={formData.cedula}
              onChange={handleChange}
              placeholder="12345678"
              required
              className="mt-1 w-full px-4 py-3 rounded-xl
              bg-white border border-gray-300
              text-gray-900 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#2563EB]
              focus:border-[#2563EB]
              transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-700">
              Contraseña
            </label>

            <div className="relative mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl
                bg-white border border-gray-300
                text-gray-900 placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#2563EB]
                focus:border-[#2563EB]
                transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-[#2563EB] transition"
              >
                <TbLockPassword className="size-5" />
              </button>
            </div>
          </div>

          {/* CHECKBOX */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[#2563EB]"
            />
            Mantener sesión activa
          </label>

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full py-3 rounded-xl
            bg-[#2563EB] text-white
            hover:bg-[#1D4ED8]
            active:scale-[0.99]
            transition"
          >
            Iniciar sesión
          </Button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-[#2563EB] font-medium hover:underline">
              Regístrate aquí
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}