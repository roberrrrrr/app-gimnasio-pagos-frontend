import { useState, useEffect } from "react";
import { MonthCard } from "./components/monthCard";
import { ClientCard } from "./components/clientCard";

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
      const data = await respuesta.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al buscar clientes", error);
    }
  };

  // Se vuelve a disparar cada vez que cambiamos de mes en el Header
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
      obtenerClientes(); // Recargamos la lista
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
      obtenerClientes(); // Recargamos para que se ponga en verde
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
      await fetch(`h${URL_BACKEND}/api/clientes/${id}`, {
        method: "DELETE",
      });
      obtenerClientes(); // Recargamos la lista
    } catch (error) {
      alert("Error al eliminar cliente");
    }
  };

  return (
    <div className="min-h-screen bg-amber-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Formulario ARRIBA de la lista */}
        {/* Formulario ARRIBA de la lista */}
        <div className="mb-4 bg-white p-4 rounded-xl shadow-sm flex gap-2 border border-slate-300">
          <input
            type="text"
            placeholder="Nombre del nuevo cliente..."
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-all font-medium"
          />
          <button
            onClick={agregarCliente}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Agregar
          </button>
        </div>
        <MonthCard mesActual={mesActual} setMesActual={setMesActual} />
        {/* Lista de Clientes */}
        <div className="flex flex-col gap-1">
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
            <div className="text-center text-slate-500 py-8 bg-white rounded-xl shadow-sm border border-dashed border-slate-300">
              No hay clientes anotados .
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
