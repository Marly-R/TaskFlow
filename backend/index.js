import http from "http";

const servidor = http.createServer((peticion, respuesta) => {

    if (peticion.method === "POST" && peticion.url === "/tareas") {

        let datos = "";

        peticion.on("data", (parte) => {
            datos += parte;
        });

        peticion.on("end", () => {

            try {
                const tarea = JSON.parse(datos);

                if (!tarea.titulo || !tarea.prioridad) {
                    respuesta.statusCode = 400;

                    respuesta.setHeader("Content-Type", "application/json");

                    respuesta.end(JSON.stringify({
                        error: "La tarea necesita título y prioridad"
                    }));

                    return;
                }

                console.log("Título:", tarea.titulo);
                console.log("Prioridad:", tarea.prioridad);

                respuesta.setHeader("Content-Type", "application/json");

                respuesta.end(JSON.stringify({
                    mensaje: "Tarea recibida correctamente",
                    tarea: tarea
                }));

            } catch (error) {

                respuesta.statusCode = 400;

                respuesta.setHeader("Content-Type", "application/json");

                respuesta.end(JSON.stringify({
                    error: "El JSON enviado no es válido"
                }));
            }

        });

    } else {
        respuesta.statusCode = 404;
        respuesta.end("Ruta no encontrada");
    }

});

servidor.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});