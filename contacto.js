// Inicializar EmailJS
(function () {
  emailjs.init("o9d7g6jVI1wUO2Dzd"); // Reemplaza con tu clave pública
})();

// Referencias al DOM
const formulario = document.getElementById("contactForm");
const botonEnviar = formulario.querySelector("button[type='submit']");

// Campos del formulario
const campos = {
  nombre: document.getElementById("nombre"),
  email: document.getElementById("email"),
  telefono: document.getElementById("telefono"),
  asunto: document.getElementById("asunto"),
  mensaje: document.getElementById("mensaje"),
};

// Validar formulario
function validarFormulario() {
  let esValido = true;

  // Campos obligatorios
  ["nombre", "email", "asunto", "mensaje"].forEach((campo) => {
    if (!campos[campo].value.trim()) {
      campos[campo].classList.add("campo-error");
      esValido = false;
    } else {
      campos[campo].classList.remove("campo-error");
    }
  });

  // Validar email básico
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value);
  if (!emailValido) {
    campos.email.classList.add("campo-error");
    esValido = false;
  }

  return esValido;
}

// Limpiar formulario
function limpiarFormulario() {
  formulario.reset();
  Object.values(campos).forEach((campo) => campo.classList.remove("campo-error"));
}

// Enviar email
function enviarEmail(datos) {
  const parametros = {
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono || "No proporcionado",
    sujeto: datos.asunto,
    mensaje: datos.mensaje,
  };

  return emailjs.send("service_fngkzgm", "template_cgnj84l", parametros);
}

// Evento submit
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validarFormulario()) {
    alert("Por favor completá todos los campos obligatorios.");
    return;
  }

  botonEnviar.disabled = true;
  botonEnviar.textContent = "Enviando...";

  const datos = {
    nombre: campos.nombre.value.trim(),
    email: campos.email.value.trim(),
    telefono: campos.telefono.value.trim(),
    asunto: campos.asunto.value.trim(),
    mensaje: campos.mensaje.value.trim(),
  };

  enviarEmail(datos)
    .then(() => {
      alert("¡Mensaje enviado correctamente!");
      limpiarFormulario();
    })
    .catch((error) => {
      alert("Hubo un error al enviar el mensaje. Intentalo de nuevo.");
      console.error("Error:", error);
    })
    .finally(() => {
      botonEnviar.disabled = false;
      botonEnviar.textContent = "Enviar mensaje";
    });
});
