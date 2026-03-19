export function ClientCard({
  cliente,
  mesActual,
  eliminarCliente,
  registrarPago,
}) {
  const fechaHoy = new Date();
  const mesReal = `${fechaHoy.getFullYear()}-${(fechaHoy.getMonth() + 1).toString().padStart(2, "0")}`;

  let colorBorde = "";
  let colorTexto = "";
  let textoEstado = "";

  // Ajustamos las clases para que solo pinten el borde izquierdo,
  // ya que el resto de la caja va a tener un borde gris
  if (cliente.estado === "pagado") {
    colorBorde = "border-l-green-500";
    colorTexto = "text-green-600";
    textoEstado = "Pagado";
  } else if (mesActual < mesReal) {
    colorBorde = "border-l-red-500";
    colorTexto = "text-red-600";
    textoEstado = "Debe el mes";
  } else {
    colorBorde = "border-l-yellow-400";
    colorTexto = "text-yellow-600";
    textoEstado = "Pendiente";
  }

  return (
    // Agregamos border, border-slate-300 y engrosamos el borde izquierdo a 6px
    <div
      className={`bg-white p-4 rounded-xl shadow-sm border border-slate-300 border-l-[6px] flex justify-between items-center transition-all hover:shadow-md ${colorBorde}`}
    >
      <div>
        <h3 className="font-bold text-slate-800 text-lg">{cliente.nombre}</h3>
        <p className={`text-sm font-bold ${colorTexto}`}>{textoEstado}</p>
      </div>

      <div className="flex gap-2">
        {cliente.estado !== "pagado" && (
          <button
            onClick={() => registrarPago(cliente.id)}
            className="text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-green-300"
          >
            Marcar Pagado
          </button>
        )}

        <button
          onClick={() => eliminarCliente(cliente.id)}
          className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border border-transparent hover:border-red-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
