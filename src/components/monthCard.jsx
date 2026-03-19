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

  // Obtenemos la fecha real de hoy
  const fechaActual = new Date();
  const añoReal = fechaActual.getFullYear();
  const mesReal = fechaActual.getMonth() + 1; // Le sumamos 1 porque en JS enero es 0

  // Lógica de bloqueo hacia el PASADO (6 meses)
  const fechaMostradaAnterior = new Date(añoAnterior, mesAnterior - 1);
  const difMeses =
    (añoReal - fechaMostradaAnterior.getFullYear()) * 12 +
    (mesReal - 1 - fechaMostradaAnterior.getMonth());
  const bloquearAnterior = difMeses >= 6;

  // NUEVA Lógica de bloqueo hacia el FUTURO
  // Bloqueamos si el año siguiente es mayor al real, o si estamos en el mismo año pero el mes es mayor al real.
  const bloquearSiguiente =
    añoSiguiente > añoReal ||
    (añoSiguiente === añoReal && mesSiguiente > mesReal);

  return (
    // Agregamos border y border-slate-300 para marcarlo más
    <div className="flex justify-between items-center bg-indigo-200 p-4 rounded-xl shadow-sm mb-2 border border-slate-300">
      <button
        onClick={() => cambiarDeMes(añoAnterior, mesAnterior)}
        disabled={bloquearAnterior}
        className={`px-4 py-2 rounded-lg transition-colors font-medium ${bloquearAnterior ? "text-slate-300 cursor-not-allowed" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
      >
        &larr; {nombresMeses[mesAnterior - 1]} {añoAnterior}
      </button>

      <h2 className="text-xl font-bold text-slate-800">
        {nombresMeses[mes - 1]} {año}
      </h2>

      <button
        onClick={() => cambiarDeMes(añoSiguiente, mesSiguiente)}
        disabled={bloquearSiguiente}
        className={`px-4 py-2 rounded-lg transition-colors font-medium ${bloquearSiguiente ? "text-slate-300 text-xl cursor-not-allowed" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
      >
        {nombresMeses[mesSiguiente - 1]} {añoSiguiente} &rarr;
      </button>
    </div>
  );
}
