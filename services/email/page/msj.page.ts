export function generarHTMLmsj(
  { nombre, tipo, mensaje }: msjProps
) {
  // Títulos según el tipo
  const titulos: Record<msjProps["tipo"], string> = {
    consulta: "Consulta de usuario",
    respuesta: "Respuesta a su consulta",
    problemas: "Reporte de problemas",
    proyecto: "Información de proyecto",
  };

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>${titulos[tipo]}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f7f7f7;
          padding: 40px;
          text-align: center;
        }
        .container {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: inline-block;
          padding: 40px 60px;
        }
        .titulo {
          font-size: 2rem;
          color: #393a44;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .nombre {
          font-size: 1.2rem;
          color: #658895;
          margin-bottom: 10px;
        }
        .mensaje {
          font-size: 1.1rem;
          color: #555;
          margin-top: 20px;
          white-space: pre-line;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="titulo">${titulos[tipo]}</div>
        <div class="nombre">De: ${nombre}</div>
        <div class="mensaje">${mensaje}</div>
      </div>
    </body>
    </html>
  `;
}

interface msjProps {
  nombre: string;
  tipo: "consulta" | "respuesta" | "problemas" | "proyecto" | string;
  mensaje: string;
}