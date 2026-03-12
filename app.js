document.addEventListener("DOMContentLoaded", () => {
  const btnProcesar = document.getElementById("btnProcesar");
  const resultadoTexto = document.getElementById("resultadoTexto");

  if (!btnProcesar || !resultadoTexto) return;

  btnProcesar.addEventListener("click", async () => {
    const archivoInput = document.getElementById("archivo");
    const tipoDocumento = document.getElementById("tipoDocumento")?.value || "";
    const accion = document.getElementById("accion")?.value || "";
    const tono = document.getElementById("tono")?.value || "";
    const salida = document.getElementById("salida")?.value || "";
    const instrucciones = document.getElementById("instrucciones")?.value || "";

    const archivo = archivoInput?.files?.[0];

    if (!archivo) {
      resultadoTexto.textContent = "Selecciona un archivo antes de procesar.";
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("tipo_documento", tipoDocumento);
    formData.append("accion", accion);
    formData.append("tono", tono);
    formData.append("salida", salida);
    formData.append("instrucciones", instrucciones);

    resultadoTexto.textContent = "Procesando documento...";

    try {
      const response = await fetch("http://127.0.0.1:8000/procesar", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("No se pudo procesar el documento");
      }

      const data = await response.json();
      resultadoTexto.textContent = data.resultado;
    } catch (error) {
      console.error(error);
      resultadoTexto.textContent = "Error de conexión con el backend.";
    }
  });
});
