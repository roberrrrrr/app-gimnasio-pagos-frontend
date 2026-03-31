// Función auxiliar para que la fecha se vea linda (DD/MM/YYYY)
// Usamos UTC para que no se desfase el día por la zona horaria
const formatearFecha = (fechaString) => {
  if (!fechaString) return "";
  const d = new Date(fechaString);
  const dia = d.getUTCDate().toString().padStart(2, "0");
  const mes = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const anio = d.getUTCFullYear();
  return `${dia}/${mes}/${anio}`;
};

export function ClientCard({
  cliente,
  mesActual,
  eliminarCliente,
  registrarPago,
  modificarMonto,
}) {
  const fechaHoy = new Date();
  const mesReal = `${fechaHoy.getFullYear()}-${(fechaHoy.getMonth() + 1).toString().padStart(2, "0")}`;

  let colorBordeLeft = "";
  let colorTextoEstado = "";
  let textoEstado = "";

  if (cliente.estado === "pagado") {
    colorBordeLeft = "border-l-success-500";
    colorTextoEstado = "text-success-600";
    textoEstado = "Pagado";
  } else if (mesActual < mesReal) {
    colorBordeLeft = "border-l-error-500";
    colorTextoEstado = "text-error-600";
    textoEstado = "Debe el mes";
  } else {
    colorBordeLeft = "border-l-warning-500";
    colorTextoEstado = "text-warning-700";
    textoEstado = "Pendiente";
  }

  return (
    // flex-col en celu, sm:flex-row en PC. p-4 uniforme.
    <div
      className={`bg-white p-4 rounded-xl shadow-sm border border-neutral-200 border-l-[6px] flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center transition-all hover:shadow-md ${colorBordeLeft}`}
    >
      {/* Info Cliente */}
      <div>
        <h3 className="font-bold text-neutral-800 text-lg leading-tight">
          {cliente.nombre}
        </h3>

        <div className="flex flex-col mt-1">
          <p className={`text-sm font-bold ${colorTextoEstado}`}>
            {textoEstado}{" "}
            {cliente.estado === "pagado" &&
              cliente.fecha_pago_actual &&
              `el ${formatearFecha(cliente.fecha_pago_actual)}`}
          </p>

          {/* Si está pagado, mostramos el monto abonado */}
          {cliente.estado === "pagado" && cliente.monto && (
            <p className="text-xs text-success-700 bg-success-50 inline-block px-2 py-0.5 rounded-md mt-1 w-fit border border-success-200 font-semibold">
              Abonó: ${Number(cliente.monto).toLocaleString("es-AR")}
            </p>
          )}

          {/* Si NO está pagado, mostramos cuándo fue la última vez */}
          {cliente.estado !== "pagado" && cliente.ultimo_pago && (
            <p className="text-xs text-neutral-500 font-medium mt-1">
              Último pago: {formatearFecha(cliente.ultimo_pago)}
            </p>
          )}
        </div>
      </div>

      {/* Botones Acciones */}
      {/* w-full y justify-end en celu para que los botones vayan a la derecha abajo */}
      <div className="flex gap-2 w-full sm:w-auto justify-end border-t border-neutral-100 pt-3 sm:pt-0 sm:border-none">
        {cliente.estado !== "pagado" && (
          <button
            onClick={() => registrarPago(cliente.id)}
            // text-xs y padding chico en celu.
            className="text-success-700 bg-success-50 hover:bg-success-100 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border border-success-200"
          >
            Marcar Pagado
          </button>
        )}
        {cliente.estado === "pagado" && (
          <button
            onClick={() => modificarMonto(cliente.id, cliente.monto)}
            className="text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border border-blue-200"
          >
            Editar Monto
          </button>
        )}
        <button
          onClick={() => eliminarCliente(cliente.id)}
          className="text-error-600 hover:bg-error-50 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors border border-transparent hover:border-error-100"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
