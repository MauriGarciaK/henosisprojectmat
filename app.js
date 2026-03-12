document.addEventListener("DOMContentLoaded", () => {
  const btnProcesar = document.getElementById("btnProcesar");
  const resultadoTexto = document.getElementById("resultadoTexto");

  if (!btnProcesar || !resultadoTexto) return;

  btnProcesar.addEventListener("click", () => {
    const archivoInput = document.getElementById("archivo");
    const tipoDocumento = document.getElementById("tipoDocumento")?.value || "";
    const accion = document.getElementById("accion")?.value || "";
    const tono = document.getElementById("tono")?.value || "";
    const salida = document.getElementById("salida")?.value || "";
    const instrucciones = document.getElementById("instrucciones")?.value || "";

    const nombreArchivo = archivoInput?.files?.[0]?.name || "Sin archivo seleccionado";

    resultadoTexto.textContent =
      `Archivo: ${nombreArchivo}\n` +
      `Tipo de documento: ${tipoDocumento}\n` +
      `Acción: ${accion}\n` +
      `Estilo: ${tono}\n` +
      `Tipo de salida: ${salida}\n` +
      `Instrucciones: ${instrucciones || "Sin instrucciones"}\n\n` +
      `Frontend listo para conectarse al backend.`;
  });
});
