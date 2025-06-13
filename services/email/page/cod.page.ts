export function generarHtmlCodigo(nombre: string, codigo: string): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Código de Recuperación</title>
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
        .nombre {
          font-size: 2rem;
          color: #393a44;
          margin-bottom: 20px;
        }
        .codigo {
          font-size: 3.5rem;
          color: #e4c36f;
          font-weight: bold;
          letter-spacing: 10px;
          margin-bottom: 10px;
        }
        .mensaje {
          font-size: 1.1rem;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="nombre">${nombre}</div>
        <div class="codigo">${codigo}</div>
        <div class="mensaje">Este es tu código de recuperación. Úsalo para continuar con el proceso.</div>
      </div>
    </body>
    </html>
  `;
}
