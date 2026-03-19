export function MonthCard({ mesActual, setMesActual }) {
  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [yearStr, monthStr] = mesActual.split("-");
  let año = parseInt(yearStr);
  let mes = parseInt(monthStr);

  let mesAnterior = mes - 1 === 0 ? 12 : mes - 1;
  let añoAnterior = mes - 1 === 0 ? año - 1 : año;

  let mesSiguiente = mes + 1 === 13 ? 1 : mes + 1;
  let añoSiguiente = mes + 1 === 13 ? año + 1 : año;

  const cambiarDeMes = (nuevoAño, nuevoMes) => {
    const mesFormateado = nuevoMes.toString().padStart(2, "0");
    setMesActual(`${nuevoAño}-${mesFormateado}`);
  };

  const fechaActual = new Date();
  const añoReal = fechaActual.getFullYear();
  const mesReal = fechaActual.getMonth() + 1;

  const fechaMostradaAnterior = new Date(añoAnterior, mesAnterior - 1);
  const difMeses =
    (añoReal - fechaMostradaAnterior.getFullYear()) * 12 +
    (mesReal - 1 - fechaMostradaAnterior.getMonth());
  const bloquearAnterior = difMeses >= 6;

  const bloquearSiguiente =
    añoSiguiente > añoReal ||
    (añoSiguiente === añoReal && mesSiguiente > mesReal);

  return (
    <div className="flex justify-between items-center bg-slate-100 p-3 sm:p-4 rounded-xl shadow-inner mb-4 border border-slate-300 gap-2">
      <button
        onClick={() => cambiarDeMes(añoAnterior, mesAnterior)}
        disabled={bloquearAnterior}
        // flex-1 asegura que los botones tengan el mismo ancho y el título quede centrado
        className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base flex-1 flex justify-start ${bloquearAnterior ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-slate-900 hover:bg-white"}`}
      >
        &larr;{" "}
        <span className="hidden sm:inline ml-1">
          {nombresMeses[mesAnterior - 1]} {añoAnterior}
        </span>
      </button>

      <h2 className="text-base sm:text-xl font-bold text-slate-900 whitespace-nowrap px-2">
        {nombresMeses[mes - 1]} {año}
      </h2>

      <button
        onClick={() => cambiarDeMes(añoSiguiente, mesSiguiente)}
        disabled={bloquearSiguiente}
        className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base flex-1 flex justify-end ${bloquearSiguiente ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-slate-900 hover:bg-white"}`}
      >
        <span className="hidden sm:inline mr-1">
          {nombresMeses[mesSiguiente - 1]} {añoSiguiente}
        </span>{" "}
        &rarr;
      </button>
    </div>
  );
}
