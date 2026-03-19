export function ClientCard({
  cliente,
  mesActual,
  eliminarCliente,
  registrarPago,
}) {
  const fechaHoy = new Date();
  const mesReal = `${fechaHoy.getFullYear()}-${(fechaHoy.getMonth() + 1).toString().padStart(2, "0")}`;

  let colorBordeLeft = "";
  let colorTextoEstado = "";
  let textoEstado = "";

  if (cliente.estado === "pagado") {
    colorBordeLeft = "border-l-green-500";
    colorTextoEstado = "text-green-600";
    textoEstado = "Pagado";
  } else if (mesActual < mesReal) {
    colorBordeLeft = "border-l-red-500";
    colorTextoEstado = "text-red-600";
    textoEstado = "Debe el mes";
  } else {
    colorBordeLeft = "border-l-yellow-500";
    colorTextoEstado = "text-yellow-700";
    textoEstado = "Pendiente";
  }

  return (
    // flex-col en celu, sm:flex-row en PC. p-4 uniforme.
    <div
      className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-[6px] flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center transition-all hover:shadow-md ${colorBordeLeft}`}
    >
      {/* Info Cliente */}
      <div>
        <h3 className="font-bold text-slate-800 text-lg leading-tight">
          {cliente.nombre}
        </h3>
        <p className={`text-sm font-bold ${colorTextoEstado}`}>{textoEstado}</p>
      </div>

      {/* Botones Acciones */}
      {/* w-full y justify-end en celu para que los botones vayan a la derecha abajo */}
      <div className="flex gap-2 w-full sm:w-auto justify-end border-t border-slate-100 pt-3 sm:pt-0 sm:border-none">
        {cliente.estado !== "pagado" && (
          <button
            onClick={() => registrarPago(cliente.id)}
            // text-xs y padding chico en celu.
            className="text-green-700 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border border-green-200"
          >
            Marcar Pagado
          </button>
        )}

        <button
          onClick={() => eliminarCliente(cliente.id)}
          className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border border-transparent hover:border-red-100"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
