import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { TbLockPassword } from "react-icons/tb";

import Button from "../ui/button/Button";

import { useAuthStore } from "../../zustand/AuthUsers";

import { loginService } from "../../services/authService";

export default function LoginForm() {

  const navigate = useNavigate();

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const module = params.get("module");

  const setUser =
    useAuthStore((state) => state.setUser);

  const setToken =
    useAuthStore((state) => state.setToken);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    cedula: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

  
    if (module !== "servicios") {

      alert("Módulo no disponible");

      navigate("/");

      return;

    }

    const res =
      await loginService(formData);

    setUser(res.user);

    setToken(res.token);

  
    navigate("/dashboard");

  } catch (err) {

    alert(
      err.response.data.message ||
      "Error al iniciar sesión"
    );

  }

};

  return (

    <div className="
      min-h-screen
      relative
      flex items-center
      justify-center
      overflow-hidden
    ">
      <img
        src="https://infraestructura.uatf.edu.bo/img/tres.jpg"
        alt="UATF"
        className="
          absolute inset-0
          w-full h-full
          object-cover
        "
      />

      <div className="
        absolute inset-0
        bg-black/90
      " />

     
      <div className="
        absolute
        top-0 left-0
        w-full h-full
        bg-gradient-to-br
        from-indigo-900/20
        via-black/20
        to-black/40
      " />

   

      <div className="
        relative z-10
        w-full max-w-md 
        mx-5
      ">

        <div className="
        backdrop-blur-2xl
        bg-[#0F172A]/75
        border border-white/10
        shadow-2xl
        rounded-[32px]
        p-3
      ">
       

          <div className="flex justify-center">

            <div className="
              w-28 h-28
              rounded-full
              overflow-hidden
              border-4 border-white/30
              shadow-2xl
              bg-white
            ">

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzIA0oXO4nlNelb3xVEbIz4kbVTczb4UIGfA&s"
                alt="Logo"
                className="
                  w-full h-full
                  object-cover
                "
              />

            </div>

          </div>

          <div className=" text-center  mt-6 mb-8  ">
            <h1 className=" text-3xl  font-bold text-white  ">
              Bienvenido
            </h1>
            <p className=" mt-2 text-sm text-white/70  ">
              Sistema Administrativo U.A.T.F.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5"  >
            <div>
              <label className="  text-sm  text-white/80 ">
                Cédula de Identidad
              </label>

              <input
                name="cedula"
                type="text"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="12345678"
                required
                className="
                  mt-2
                  w-full
                  px-4 py-3
                  rounded-2xl

                  bg-white/10
                  border border-white/15

                  text-white
                  placeholder:text-white/40

                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500

                  transition
                "
              />

            </div>

           

            <div>

              <label className="
                text-sm
                text-white/80
              ">
                Contraseña
              </label>

              <div className="
                relative
                mt-2
              ">

                <input
                  name="password"
                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="
                    w-full
                    px-4 py-3
                    rounded-2xl

                    bg-white/10
                    border border-white/15

                    text-white
                    placeholder:text-white/40

                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500

                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-4 top-1/2
                    -translate-y-1/2

                    text-white/50
                    hover:text-white
                  "
                >

                  <TbLockPassword
                    className="size-5"
                  />

                </button>

              </div>

            </div>

            

            <Button
              type="submit"
              className="
                w-full
                py-3
                rounded-2xl

                bg-indigo-600
                hover:bg-indigo-700

                text-white
                font-semibold

                shadow-lg
                shadow-indigo-500/30

                transition-all
                duration-300
              "
            >

              Iniciar sesión

            </Button>

            

            <p className="
              text-center
              text-sm
              text-white/60
            ">

              ¿No tienes cuenta?{" "}

              <Link
                to="/signup"
                className="
                  text-indigo-300
                  hover:text-white
                  transition
                "
              >
                Regístrate
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>

  );

}