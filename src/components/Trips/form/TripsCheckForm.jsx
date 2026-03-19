import React, { useState } from "react";

export default function CheckBudgetForm({ data, onClose, choferes, encargados, vehiculos }) {
  const [form, setForm] = useState({
    vehiculo: data?.vehiculo || "",
    chofer: data?.chofer || "",
    encargado: "",
    fecha: "",

    litros: 0,
    precioLitro: 0,
    horaSalida: "",
    horaLlegada: "",
    materia: "",
    docentes: "",
    sigla: "",
    nota: "",

    peajes: [{ nro: 0, precio: 0 }],
    viaticosProvincia: [{ _v: 0, _p: 0 }],
    viaticosFrontera: [{ _v: 0, _p: 0 }],
    viaticosCiudad: [{ dias: 0, precio: 0 }],
    mantenimiento: [{ _v: 0, _p: 0 }],
    garaje: [{ _v: 0, _p: 0 }],

    transporte: [{ ruta: "", personas: 0, costo: 0 }],
    flete: [{ vueltas: 0, costo: 0 }],
  });

  const [collapsed, setCollapsed] = useState({
    casilla1: true,
    casilla2: true,
    casilla3: true,
    casilla4: true,
  });

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleArrayChange = (field, index, key, value) => {
    const arr = [...form[field]];
    arr[index][key] = Number(value);
    setForm((prev) => ({ ...prev, [field]: arr }));
  };

  const addArrayItem = (field, template) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], template] }));
  };

  // Totales
  const combustible = (form.litros * form.precioLitro).toFixed(2);
  const combustibleTotal = Math.round(form.litros);

  const peajesTotal = form.peajes.reduce(
    (sum, p) => sum + (p.nro || 0) * (p.precio || 0),
    0
  );
  const viaticosCiudadTotal = form.viaticosCiudad.reduce(
    (sum, v) => sum + (v.dias || 0) * (v.precio || 0),
    0
  );
  const totalA = Number(combustible) + peajesTotal + viaticosCiudadTotal;

  const transporteTotal = form.transporte.reduce(
    (sum, t) => sum + t.personas * t.costo,
    0
  );
  const fleteTotal = form.flete.reduce(
    (sum, f) => sum + f.vueltas * f.costo,
    0
  );
  const totalB = transporteTotal + fleteTotal;
  const diferencia = totalA - totalB;

  const formatBs = (value) => `${value.toFixed(2)} Bs.`;

  const handleDelete = () => {
    if (confirm("¿Seguro que deseas eliminar este presupuesto?")) {
      console.log("El presupuesto ha sido eliminado");
      onClose();
    }
  };

  const handleUpdate = () => {
    console.log("Datos actualizados:", form);
    if (typeof data?.onUpdate === "function") {
      data.onUpdate(form);
    }
    onClose();
  };

  // Componente para inputs editables con lista
  const ComboInput = ({ label, value, onChange, options }) => (
    <div>
      <label className="block mb-1 text-gray-900 text-sm font-semibold">{label}</label>
      <input
        type="text"
        list={`${label}-options`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-1.5 rounded-md text-sm"
      />
      <datalist id={`${label}-options`}>
        {options?.map((opt) => (
          <option
            key={opt.id}
            value={opt.nombres ? `${opt.nombres} ${opt.apellidos}` : `${opt.tipog} ${opt.placa}`}
          />
        ))}
      </datalist>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[1200px] p-6 rounded-xl shadow-lg space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray font-bold bg-white-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold">
          Presupuesto del viaje ({data?.entidad || "Entidad"})
        </h2>

        {/* 1ra Casilla */}
        <Section
          title="1️⃣ Datos generales"
          collapsed={collapsed.casilla1}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla1: !prev.casilla1 }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            <ComboInput
              label="Vehículo"
              value={form.vehiculo}
              onChange={(v) => handleChange("vehiculo", v)}
              options={vehiculos}
            />
            <ComboInput
              label="Chofer"
              value={form.chofer}
              onChange={(v) => handleChange("chofer", v)}
              options={choferes}
            />
            <ComboInput
              label="Encargado del viaje"
              value={form.encargado}
              onChange={(v) => handleChange("encargado", v)}
              options={encargados}
            />
            <Input
              label="Fecha de solicitud"
              type="date"
              value={form.fecha}
              onChange={(v) => handleChange("fecha", v)}
            />
          </div>
        </Section>

        {/* 2da Casilla: Combustible y viaje */}
        <Section
          title="2️⃣ Combustible y viaje"
          collapsed={collapsed.casilla2}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla2: !prev.casilla2 }))
          }
        >
          <div className="grid grid-cols-3 gap-4 mt-2">
            <Input label="Gasolina/Diesel (L)" type="number" value={form.litros} onChange={(v) => handleChange("litros", Number(v))} />
            <Input label="Precio por litro (Bs)" type="number" value={form.precioLitro} onChange={(v) => handleChange("precioLitro", Number(v))} />
            <Input label="Combustible (Bs)" value={combustible} readOnly />
            <Input label="Combustible total (L)" value={combustibleTotal} readOnly />
            <Input label="Hora de salida" type="time" value={form.horaSalida} onChange={(v) => handleChange("horaSalida", v)} />
            <Input label="Hora de llegada" type="time" value={form.horaLlegada} onChange={(v) => handleChange("horaLlegada", v)} />
            <Input label="Materia" value={form.materia} onChange={(v) => handleChange("materia", v)} />
            <Input label="Docentes" value={form.docentes} onChange={(v) => handleChange("docentes", v)} />
            <Input label="Sigla" value={form.sigla} onChange={(v) => handleChange("sigla", v)} />
            <Input label="Nota" value={form.nota} onChange={(v) => handleChange("nota", v)} colSpan={3} />
          </div>
        </Section>

        {/* 3ra Casilla: Peajes y viáticos */}
        <Section
          title="3️⃣ Peajes y viáticos"
          collapsed={collapsed.casilla3}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla3: !prev.casilla3 }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            <ArrayInput title="Peajes ida y vuelta" array={form.peajes} onChange={(i, k, v) => handleArrayChange("peajes", i, k, v)} total={formatBs(peajesTotal)} />
            <ArrayInput title="Viáticos provincia" array={form.viaticosProvincia} onChange={(i, k, v) => handleArrayChange("viaticosProvincia", i, k, v)} total={formatBs(0)} />
            <ArrayInput title="Viáticos frontera" array={form.viaticosFrontera} onChange={(i, k, v) => handleArrayChange("viaticosFrontera", i, k, v)} total={formatBs(0)} />
            <ArrayInput title="Viáticos ciudad" array={form.viaticosCiudad} onChange={(i, k, v) => handleArrayChange("viaticosCiudad", i, k, v)} total={formatBs(viaticosCiudadTotal)} />
            <ArrayInput title="Mantenimiento vehicular" array={form.mantenimiento} onChange={(i, k, v) => handleArrayChange("mantenimiento", i, k, v)} total={formatBs(0)} />
            <ArrayInput title="Garaje del vehículo" array={form.garaje} onChange={(i, k, v) => handleArrayChange("garaje", i, k, v)} total={formatBs(0)} />

            <div className="col-span-2">
              <label className="font-semibold">Total (A)</label>
              <input readOnly value={formatBs(totalA)} className="border p-2 rounded w-full text-right bg-yellow-100" />
            </div>
          </div>
        </Section>

        {/* 4ta Casilla: Transporte público y flete */}
        <Section
          title="4️⃣ Transporte público y flete"
          collapsed={collapsed.casilla4}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla4: !prev.casilla4 }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            {form.transporte.map((t, i) => (
              <div key={i} className="border p-2 rounded space-y-2 relative">
                <button
                  onClick={() => {
                    const arr = [...form.transporte];
                    arr.splice(i, 1);
                    setForm((prev) => ({ ...prev, transporte: arr }));
                  }}
                  className="absolute top-1 right-1 text-red-600 font-bold px-2 py-0.5 rounded hover:bg-red-100"
                >
                  X
                </button>
                <Input label="Ruta" value={t.ruta} onChange={(v) => { const arr = [...form.transporte]; arr[i].ruta = v; setForm(prev => ({ ...prev, transporte: arr })); }} />
                <Input label="Personas" type="number" value={t.personas} onChange={(v) => { const arr = [...form.transporte]; arr[i].personas = Number(v); setForm(prev => ({ ...prev, transporte: arr })); }} />
                <Input label="Costo" type="number" value={t.costo} onChange={(v) => { const arr = [...form.transporte]; arr[i].costo = Number(v); setForm(prev => ({ ...prev, transporte: arr })); }} />
                <Input label="Total" type="text" readOnly value={formatBs(t.personas * t.costo)} />
              </div>
            ))}
            <button onClick={() => addArrayItem("transporte", { ruta: "", personas: 0, costo: 0 })} className="px-2 py-1 text-green-600 font-bold rounded border hover:bg-green-50 w-10 h-10 flex justify-center items-center">+</button>

            <div className="mt-4 col-span-2">
              <h4 className="font-semibold">Uso del flete por el camión</h4>
              {form.flete.map((f, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <Input label="Vueltas" type="number" value={f.vueltas} onChange={(v) => { const arr = [...form.flete]; arr[i].vueltas = Number(v); setForm(prev => ({ ...prev, flete: arr })); }} />
                  <Input label="Costo" type="number" value={f.costo} onChange={(v) => { const arr = [...form.flete]; arr[i].costo = Number(v); setForm(prev => ({ ...prev, flete: arr })); }} />
                  <Input label="Total" type="text" readOnly value={formatBs(f.vueltas * f.costo)} />
                </div>
              ))}
            </div>

            <div className="col-span-2 mt-2">
              <label className="font-semibold">Total (B)</label>
              <input readOnly value={formatBs(totalB)} className="border p-2 rounded w-full text-right bg-yellow-100" />
            </div>

            <div className="col-span-2 mt-2">
              <label className="font-semibold">Diferencia (A - B)</label>
              <input readOnly value={formatBs(diferencia)} className="border p-2 rounded w-full text-right bg-yellow-100" />
            </div>
          </div>
        </Section>

        {/* Botones acción */}
        <div className="flex justify-end gap-3">
          <button onClick={handleDelete} className="px-4 py-2 border rounded bg-red-600 text-white hover:bg-red-700">
            Eliminar
          </button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares
const Section = ({ title, children, collapsed, toggle }) => (
  <div className="border rounded p-4">
    <div className="flex justify-between items-center cursor-pointer" onClick={toggle}>
      <h3 className="font-semibold text-lg">{title}</h3>
      <span>{collapsed ? "+" : "-"}</span>
    </div>
    {!collapsed && <div className="mt-2">{children}</div>}
  </div>
);

const Input = ({ label, type = "text", value, onChange, readOnly, colSpan = 1 }) => (
  <div className={`col-span-${colSpan}`}>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      readOnly={readOnly}
      className={`border p-2 rounded w-full ${readOnly ? "bg-gray-100" : ""} text-right`}
    />
  </div>
);

const ArrayInput = ({ title, array, onChange, total }) => (
  <div className="border p-2 rounded space-y-2">
    <h4 className="font-semibold">{title}</h4>
    {array.map((item, i) => (
      <div key={i} className="flex gap-2">
        {Object.keys(item).map((key) => {
          let label = "";
          if (title.includes("Peajes")) {
            if (key === "nro") label = "Nro. Peajes";
            if (key === "precio") label = "Precio (c/u)";
          }
          if (title.includes("ciudad")) {
            if (key === "dias") label = "Nro. de Días";
            if (key === "precio") label = "Precio por Día";
          }
          return (
            <Input
              key={key}
              label={label}
              type="number"
              value={item[key] || 0}
              onChange={(v) => onChange(i, key, v)}
            />
          );
        })}
      </div>
    ))}
    <div>
      <label className="font-semibold">Total</label>
      <input readOnly value={total} className="border p-2 rounded w-full text-right bg-yellow-100" />
    </div>
  </div>
);