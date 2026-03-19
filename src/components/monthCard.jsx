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
    // Fondo más sutil. p-3 en celu, p-4 en PC.
    <div className="flex justify-between items-center bg-slate-100 p-3 sm:p-4 rounded-xl shadow-inner mb-4 border border-slate-300 gap-1">
      <button
        onClick={() => cambiarDeMes(añoAnterior, mesAnterior)}
        disabled={bloquearAnterior}
        // text-xs en celu, px-2.
        className={`px-2 sm:px-4 py-2 rounded-lg transition-colors font-medium text-xs sm:text-base ${bloquearAnterior ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-slate-900 hover:bg-white"}`}
      >
        &larr;{" "}
        <span className="hidden xs:inline">
          {nombresMeses[mesAnterior - 1]}
        </span>{" "}
        {añoAnterior}
      </button>

      {/* text-base en celu, text-xl en PC */}
      <h2 className="text-base sm:text-xl font-bold text-slate-900 whitespace-nowrap">
        {nombresMeses[mes - 1]} {año}
      </h2>

      <button
        onClick={() => cambiarDeMes(añoSiguiente, mesSiguiente)}
        disabled={bloquearSiguiente}
        className={`px-2 sm:px-4 py-2 rounded-lg transition-colors font-medium text-xs sm:text-base ${bloquearSiguiente ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:text-slate-900 hover:bg-white"}`}
      >
        <span className="hidden xs:inline">
          {nombresMeses[mesSiguiente - 1]}
        </span>{" "}
        {añoSiguiente} &rarr;
      </button>
    </div>
  );
}
