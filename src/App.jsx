import { useState, useEffect, useRef, useCallback } from "react";
import { MonthCard } from "./components/monthCard"; // Asegurate de usar Mayúsculas si así se llama el archivo
import { ClientCard } from "./components/clientCard";

function App() {
  const URL_BACKEND = "https://app-gimnasio-pagos-backend.onrender.com";

  const [clientes, setClientes] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [cargando, setCargando] = useState(true);
  // Arrancamos en el mes real actual por defecto
  const fechaHoy = new Date();
  const mesInicial = `${fechaHoy.getFullYear()}-${(fechaHoy.getMonth() + 1).toString().padStart(2, "0")}`;
  const [mesActual, setMesActual] = useState(mesInicial);
  const cacheClientesPorMes = useRef({});

  const formatearMes = useCallback(
    (año, mes) => `${año}-${mes.toString().padStart(2, "0")}`,
    [],
  );

  const sumarMeses = useCallback(
    (mesBase, desplazamiento) => {
      const [añoStr, mesStr] = mesBase.split("-");
      const fecha = new Date(
        Number.parseInt(añoStr, 10),
        Number.parseInt(mesStr, 10) - 1,
        1,
      );
      fecha.setMonth(fecha.getMonth() + desplazamiento);
      return formatearMes(fecha.getFullYear(), fecha.getMonth() + 1);
    },
    [formatearMes],
  );

  const obtenerClientes = useCallback(async (mesObjetivo, opciones = {}) => {
    const { mostrarCarga = true, forzarRefetch = false } = opciones;

    // 1. Revisamos si ya está en caché
    if (!forzarRefetch && cacheClientesPorMes.current[mesObjetivo]) {
      if (mesObjetivo === mesActual) {
        setClientes(cacheClientesPorMes.current[mesObjetivo]);
        setCargando(false);
      }
      return cacheClientesPorMes.current[mesObjetivo];
    }

    if (mostrarCarga && mesObjetivo === mesActual) setCargando(true);
    
    try {
      const respuesta = await fetch(
        `${URL_BACKEND}/api/clientes?mes=${mesObjetivo}`,
      );
      if (!respuesta.ok) {
        cacheClientesPorMes.current[mesObjetivo] = [];
        if (mesObjetivo === mesActual) setClientes([]);
        return [];
      }
      
      const data = await respuesta.json();

      // --- 2. ORDENAMIENTO (Pendientes arriba, Pagados abajo, Alfabético) ---
      const dataOrdenada = data.sort((a, b) => {
        // Chequeamos si el estado es "pagado" (si en tu DB le pusiste otro nombre, cambialo acá)
        const aPagado = a.estado === "pagado";
        const bPagado = b.estado === "pagado";

        // Si 'a' pagó y 'b' no, empujamos 'a' para el final de la lista
        if (aPagado && !bPagado) return 1;
        // Si 'b' pagó y 'a' no, empujamos 'b' para el final de la lista
        if (!aPagado && bPagado) return -1;

        // Si ambos están en el mismo grupo, ordenamos por nombre de la A a la Z
        return a.nombre.localeCompare(b.nombre);
      });

      // 3. Guardamos en caché y seteamos el estado con la lista YA ordenada
      cacheClientesPorMes.current[mesObjetivo] = dataOrdenada;
      if (mesObjetivo === mesActual) setClientes(dataOrdenada);
      
      return dataOrdenada;
      
    } catch (error) {
      console.error("Error al buscar clientes", error);
      if (mesObjetivo === mesActual) setClientes([]);
      return [];
    } finally {
      if (mesObjetivo === mesActual) setCargando(false);
    }
  }, [mesActual]);

  useEffect(() => {
    obtenerClientes(mesActual, { mostrarCarga: true });

    // Prefetch de meses adyacentes para que la navegación sea instantánea.
    const mesAnterior = sumarMeses(mesActual, -1);
    const mesSiguiente = sumarMeses(mesActual, 1);
    obtenerClientes(mesAnterior, { mostrarCarga: false });
    obtenerClientes(mesSiguiente, { mostrarCarga: false });
  }, [mesActual, obtenerClientes, sumarMeses]);

  const agregarCliente = async () => {
    if (nuevoNombre.trim() === "") return;
    try {
      await fetch(`${URL_BACKEND}/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre }),
      });
      setNuevoNombre("");
      await obtenerClientes(mesActual, { forzarRefetch: true });
    } catch {
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
      await obtenerClientes(mesActual, { forzarRefetch: true });
    } catch {
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
      await obtenerClientes(mesActual, { forzarRefetch: true });
    } catch {
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
        <MonthCard
          key={mesActual}
          mesActual={mesActual}
          setMesActual={setMesActual}
        />

        {/* --- Lista de Clientes --- */}
        {/* gap-2 para separar un poco más las tarjetas en celu */}
        {/* --- Lista de Clientes --- */}
        <div className="flex flex-col gap-2.5 mt-4">
          {/* Mostramos esto SI está cargando */}
          {cargando ? (
            <div className="text-center text-blue-600 py-10 bg-white rounded-xl shadow-sm border border-slate-300 font-semibold animate-pulse">
              Cargando clientes... ⏳
            </div>
          ) : (
            /* Si NO está cargando, mostramos los clientes (o el mensaje de vacío) */
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
