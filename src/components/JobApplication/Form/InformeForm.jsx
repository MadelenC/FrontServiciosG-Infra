import { useState } from "react";
import { toast } from "react-toastify";

export default function InformeForm({
  isOpen,
  onClose,
  onSave,
}) {

  const [form, setForm] = useState({
    tarea: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = (data) => {

    const err = {};

    const tarea = data.tarea?.trim() || "";

    if (!tarea) {

      err.tarea = "La tarea es obligatoria";

    } else if (tarea.length < 5) {

      err.tarea = "Mínimo 5 caracteres";

    } else if (tarea.length > 500) {

      err.tarea = "Máximo 500 caracteres";

    }

    return err;
  };

  const handleChange = (e) => {

    const newForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(newForm);

    setErrors(validate(newForm));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validation = validate(form);

    setErrors(validation);

    if (Object.keys(validation).length > 0) {

      toast.error("Corrige los errores");

      return;
    }

    try {

      await onSave({
        tarea: form.tarea.trim(),
      });

      toast.success("Informe registrado");

      setForm({
        tarea: "",
      });

      onClose();

    } catch (error) {

      toast.error("Error al registrar");
    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">

        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            w-8 h-8 rounded-full
            hover:bg-gray-200
            flex items-center justify-center
            text-gray-600
          "
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">

          Realizar Informe

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-semibold mb-2 text-gray-700">

              Tarea realizada

            </label>

            <textarea
              name="tarea"
              value={form.tarea}
              onChange={handleChange}
              rows={6}
              placeholder="Describa la tarea realizada..."
              className="
                w-full border rounded-xl
                px-4 py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            {errors.tarea && (

              <p className="text-red-500 text-sm mt-1">
                {errors.tarea}
              </p>

            )}

          </div>

          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              bg-gradient-to-r
              from-blue-600 to-blue-500
              hover:from-blue-700 hover:to-blue-600
              text-white font-semibold
              shadow-lg transition
            "
          >
            Registrar
          </button>

        </form>

      </div>

    </div>
  );
}