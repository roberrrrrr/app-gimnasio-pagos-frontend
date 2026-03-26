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
  let año = Number.parseInt(yearStr, 10);
  let mes = Number.parseInt(monthStr, 10);

  // Fallback defensivo para evitar estados inválidos en navegadores móviles.
  if (!Number.isInteger(año) || !Number.isInteger(mes) || mes < 1 || mes > 12) {
    const fechaActual = new Date();
    año = fechaActual.getFullYear();
    mes = fechaActual.getMonth() + 1;
  }

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
    <div className="flex justify-between items-center bg-secondary p-2 sm:p-4 rounded-xl shadow-sm mb-5 border border-neutral-300 gap-2">
      {/* --- BOTÓN IZQUIERDO (Pasado) --- */}
      <button
        type="button"
        onClick={() => cambiarDeMes(añoAnterior, mesAnterior)}
        disabled={bloquearAnterior}
        className={`px-4 py-3 rounded-lg transition-all flex items-center justify-center ${
          bloquearAnterior
            ? "bg-neutral-50 text-neutral-300 cursor-not-allowed"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 shadow-sm"
        }`}
      >
        {/* Flecha más grande y gruesa */}
        <span className="text-2xl sm:text-3xl font-black leading-none -mt-1">
          &larr;
        </span>
        <span className="hidden sm:inline ml-2 text-sm font-medium">
          {nombresMeses[mesAnterior - 1]}
        </span>
      </button>

      {/* --- MES ACTUAL (Centro) --- */}
      <h2 className="text-lg sm:text-xl font-black text-neutral-800 whitespace-nowrap text-center flex-1">
        {nombresMeses[mes - 1]} {año}
      </h2>

      {/* --- BOTÓN DERECHO (Futuro) --- */}
      <button
        type="button"
        onClick={() => cambiarDeMes(añoSiguiente, mesSiguiente)}
        disabled={bloquearSiguiente}
        className={`px-4 py-3 rounded-lg transition-all flex items-center justify-center ${
          bloquearSiguiente
            ? "bg-neutral-50 text-neutral-300 cursor-not-allowed"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 shadow-sm"
        }`}
      >
        <span className="hidden sm:inline mr-2 text-sm font-medium">
          {nombresMeses[mesSiguiente - 1]}
        </span>
        {/* Flecha más grande y gruesa */}
        <span className="text-2xl sm:text-3xl font-black leading-none -mt-1">
          &rarr;
        </span>
      </button>
    </div>
  );
}
