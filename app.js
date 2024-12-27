console.log("Inicio de app.js");  // Verifica que app.js se está ejecutando

// Asegúrate de que EmailJS se inicializa cuando la página haya cargado
window.addEventListener("load", () => {
    console.log("La página ha cargado correctamente.");
    
    if (emailjs) {
        emailjs.init("6oGbdE8qvz1kwpN45");  // Reemplaza con tu User ID de EmailJS
        console.log("EmailJS inicializado correctamente.");
    } else {
        console.error("Error: EmailJS no está definido.");
    }

    // Manejo del envío del formulario
    const form = document.getElementById('cotizacionForm');
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            console.log("Formulario enviado.");

            // Capturar productos seleccionados
            const productosSeleccionados = [];
            document.querySelectorAll('input[name="producto"]:checked').forEach((item) => {
            // Encuentra el contenedor padre (label) y busca el texto del producto
            const productoNombre = item.closest('.producto-item').querySelector('strong').innerText;
            productosSeleccionados.push(productoNombre);
            });
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const celular = document.getElementById('celular').value;
            const mensaje = document.getElementById('mensaje').value || "Sin mensaje adicional";

            // Validar que al menos un producto esté seleccionado
            if (productosSeleccionados.length === 0) {
                alert("Please select at least one product.");
                return;
            }

            // Crear lista de productos en texto
            const productosTexto = productosSeleccionados.join(", ");

            // Crear los parámetros para enviar a EmailJS
            const templateParams = {
                to_name: "Equipo de Ventas",
                from_name: nombre,
                email: email,
                celular: celular,
                message: `Productos solicitados: ${productosTexto}\nMensaje: ${mensaje}`
            };

            // Log de verificación
            console.log("templateParams a enviar:", templateParams);

            // Enviar el correo usando EmailJS
            emailjs.send("service_x5uffdr", "template_2k1aka3", templateParams)
            .then((response) => {
                console.log("Respuesta de EmailJS:", response);
                alert("Request sent successfully. We will contact you.");
                form.reset();
            })
            .catch((error) => {
                console.error("Error al enviar:", error);
                alert("Hubo un error, por favor intenta de nuevo.");
            });
            
        };
    } else {
        console.error("Error: No se encontró el formulario con el ID 'cotizacionForm'.");
    }
});
