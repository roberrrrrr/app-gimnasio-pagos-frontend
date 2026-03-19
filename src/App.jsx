import { useState, useEffect } from "react";
import { MonthCard } from "./components/monthCard"; // Asegurate de usar Mayúsculas si así se llama el archivo
import { ClientCard } from "./components/mlientCard";

function App() {
  const URL_BACKEND = "https://app-gimnasio-pagos-backend.onrender.com";

  const [clientes, setClientes] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState("");

  // Arrancamos en el mes real actual por defecto
  const fechaHoy = new Date();
  const mesInicial = `${fechaHoy.getFullYear()}-${(fechaHoy.getMonth() + 1).toString().padStart(2, "0")}`;
  const [mesActual, setMesActual] = useState(mesInicial);

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch(
        `${URL_BACKEND}/api/clientes?mes=${mesActual}`,
      );
      if (!respuesta.ok) return setClientes([]); // Evita errores si el back falla
      const data = await respuesta.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al buscar clientes", error);
      setClientes([]);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, [mesActual]);

  const agregarCliente = async () => {
    if (nuevoNombre.trim() === "") return;
    try {
      await fetch(`${URL_BACKEND}/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre }),
      });
      setNuevoNombre("");
      obtenerClientes();
    } catch (error) {
      alert("Error al guardar cliente");
    }
  };

  const registrarPago = async (cliente_id) => {
    try {
      await fetch(`${URL_BACKEND}/api/pagos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente_id, mes: mesActual }),
      });
      obtenerClientes();
    } catch (error) {
      alert("Error al registrar el pago");
    }
  };

  const eliminarCliente = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés borrar a este cliente? Se borrará su historial completo.",
    );
    if (!confirmar) return;

    try {
      await fetch(`${URL_BACKEND}/api/clientes/${id}`, {
        method: "DELETE",
      });
      obtenerClientes();
    } catch (error) {
      alert("Error al eliminar cliente");
    }
  };

  return (
    // py-4 en celu, py-8 en pc. px-2 en celu, px-4 en pc.
    <div className="min-h-screen bg-cyan-900 py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* --- Formulario --- */}
        {/* flex-col (uno abajo del otro) por defecto. sm:flex-row (de costado) en PC */}
        <div className="mb-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm flex gap-2 border border-slate-300">
          <input
            type="text"
            placeholder="Nuevo cliente..."
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            // min-w-0 es la magia para que el input no empuje al botón fuera de la pantalla
            className="flex-1 min-w-0 bg-slate-50 border-2 border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-all font-medium text-sm sm:text-base"
          />
          <button
            onClick={agregarCliente}
            // whitespace-nowrap evita que el texto del botón se rompa en dos líneas
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
          >
            Agregar
          </button>
        </div>
        {/* --- Header de Mes --- */}
        <MonthCard mesActual={mesActual} setMesActual={setMesActual} />

        {/* --- Lista de Clientes --- */}
        {/* gap-2 para separar un poco más las tarjetas en celu */}
        <div className="flex flex-col gap-2.5 mt-4">
          {clientes.map((cliente) => (
            <ClientCard
              key={cliente.id}
              cliente={cliente}
              mesActual={mesActual}
              eliminarCliente={eliminarCliente}
              registrarPago={registrarPago}
            />
          ))}

          {clientes.length === 0 && (
            <div className="text-center text-slate-500 py-10 bg-white rounded-xl shadow-sm border border-dashed border-slate-300 px-4">
              No hay clientes anotados en este mes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
