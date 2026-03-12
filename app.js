document.addEventListener("DOMContentLoaded", () => {
  const btnProcesar = document.getElementById("btnProcesar");
  const resultadoTexto = document.getElementById("resultadoTexto");
  const btnDescargar = document.getElementById("btnDescargar");

  if (!btnProcesar || !resultadoTexto) return;

  btnProcesar.addEventListener("click", async () => {
    const archivoInput = document.getElementById("archivo");
    const tipoDocumento = document.getElementById("tipoDocumento");
    const accion = document.getElementById("accion");
    const tono = document.getElementById("tono");
    const salida = document.getElementById("salida");
    const instrucciones = document.getElementById("instrucciones");

    const archivo = archivoInput?.files?.[0];

    if (!archivo) {
      resultadoTexto.textContent = "Selecciona un archivo antes de procesar.";
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("tipo_documento", tipoDocumento ? tipoDocumento.value : "");
    formData.append("accion", accion ? accion.value : "");
    formData.append("tono", tono ? tono.value : "");
    formData.append("salida", salida ? salida.value : "");
    formData.append("instrucciones", instrucciones ? instrucciones.value : "");

    resultadoTexto.textContent = "Procesando documento...";
    if (btnDescargar) {
      btnDescargar.style.display = "none";
      btnDescargar.removeAttribute("href");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/procesar", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        resultadoTexto.textContent = "Error del backend: " + JSON.stringify(data);
        return;
      }

      resultadoTexto.textContent = data.resultado || "Proceso completado.";

      if (btnDescargar && data.descarga_url) {
        btnDescargar.href = data.descarga_url;
        btnDescargar.style.display = "inline-flex";
      }
    } catch (error) {
      console.error("Error:", error);
      resultadoTexto.textContent = "Error de conexión con el backend.";
    }
  });
});
