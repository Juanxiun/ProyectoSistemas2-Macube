import { Handlers } from "$fresh/server.ts";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { isValidNumber } from "$std/semver/_shared.ts";
import { hashpassword } from "../../../lib/utils/passwordMet.ts";
import { jsonSuccess } from "../../../lib/utils/response.ts";
import { valRegister } from "../../../lib/utils/userVal.ts";
import { clientEn, returnClient } from "../../../services/usuarios/account.ts";
import { newArq, newCli } from "../../../services/usuarios/registro.ts";
import { uptArq, uptCli } from "../../../services/usuarios/upUser.ts";

export const handler: Handlers = {
  /*--- BUSCAR USUARIO---*/
  async GET(req) {
    try {
      //constantes necesarias
      const url = new URL(req.url);
      const id = url.searchParams.get("id")?.toString() ?? "";
      const cookie = getCookies(req.headers);

      if (!cookie || !cookie.auth) {
        return jsonSuccess({ error: "No se encontró la sesion" }, 400);
      }

      //mandar al servicio
      const result = id ? await clientEn(id) : await returnClient();

      if (result) return jsonSuccess({ result: result }, 200);
      else return jsonSuccess({ message: "Datos perdidos..." }, 400);
    } catch (error) {
      console.log(error);
      return jsonSuccess({ error: `ERROR. ${error}` }, 200);
    }
  },

  /*-- REGISTRAR USUARIO --*/
  async POST(req) {
    try {
      //variables necesarias
      const formData = await req.formData();
      //obtener de formulario
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const cod = data.codigo ? data.codigo : null;

      const val = await valRegister({
        codigo: data.codigo ? data.codigo : "",
        ci: parseInt(data.ci),
        nombre: data.nombre,
        apellido: data.apellido,
        direccion: data.direccion ? data.direccion : "",
        telefono: parseInt(data.telefono),
        correo: data.correo,
        contra: data.contra,
      });

      if (val.includes("ERROR.")) return jsonSuccess({ error: val }, 400);

      const pass = await hashpassword(data.contra);
      let registro;

      if (cod) {
        registro = await newArq({
          codigo: data.codigo,
          ci: parseInt(data.ci),
          extension: data.extension,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: parseInt(data.telefono),
          correo: data.correo,
          contra: pass,
        });
      } else {
        registro = await newCli({
          ci: parseInt(data.ci),
          extension: data.extension,
          nombre: data.nombre,
          apellido: data.apellido,
          departamento: data.departamento,
          direccion: data.direccion,
          telefono: parseInt(data.telefono),
          correo: data.correo,
          contra: pass,
        });
      }

      if (registro.includes("ERROR.")) {
        return jsonSuccess({ error: registro }, 400);
      }

      const nombreFull = data.nombre + " " + data.apellido;
      const headers = new Headers();
      const url = new URL(req.url);
      const codigUsr = data.codigo ? data.codigo : data.ci;
      const rol = cod ? "arq" : "cli";

      const valueCook = encodeURIComponent(
        JSON.stringify({ nombre: nombreFull, codigo: codigUsr, rol: rol }),
      );

      await setCookie(headers, {
        name: "auth",
        value: valueCook,
        maxAge: 60 * 60 * 24,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: url.protocol === "https:",
        httpOnly: true,
      });
      headers.set("Content-Type", "application/json");
      return jsonSuccess(
        { message: `REGISTRO COMPLETADO ${nombreFull}` },
        200,
        headers,
      );
    } catch (error) {
      console.log(error);
      return jsonSuccess({ error: `ERROR. ${error}` }, 400);
    }
  },

  /*-- ACTUALIZAR USUARIO --*/
  async PUT(req) {
    try {
      //constantes necesarias
      const formData = await req.formData();
      const cookie = getCookies(req.headers);
      let id: string = "";

      //validar Cookie
      if (!cookie || !cookie.auth) {
        return jsonSuccess({ error: "No se encontró la cookie." }, 400);
      }
      const decodedAuth = await decodeURIComponent(cookie.auth);
      const authData = JSON.parse(decodedAuth);
      if (!authData || !authData.codigo) {
        return jsonSuccess({ error: "No se encontró el codigo." }, 400);
      } else {
        id = authData.codigo;
      }

      //obtener de formulario
      const data: Record<string, string> = {};
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      console.log(data, " ", id);
      let actualizar;

      if (!isValidNumber(parseInt(id))) {
        actualizar = await uptArq({
          codigo: id,
          nombre: data.nombre?.toString(),
          apellido: data.apellido?.toString(),
          telefono: parseInt(data.telefono?.toString()),
          correo: data.correo?.toString(),
        });
      } else {
        actualizar = await uptCli({
          ci: parseInt(data.ci?.toString()),
          nombre: data.nombre?.toString(),
          apellido: data.apellido?.toString(),
          departamento: data.departamento?.toString(),
          direccion: data.direccion?.toString(),
          telefono: parseInt(data.telefono?.toString()),
          correo: data.correo?.toString(),
        });
      }

      if (actualizar.includes("ERROR.")) {
        return jsonSuccess({ error: actualizar }, 400);
      }

      const nombreFull = data.nombre + " " + data.apellido;
      const codigUsr = data.codigo ? data.codigo : data.ci;
      const rol = id ? "arq" : "cli";

      // Crear el valor de la cookie
      const cookieValue = JSON.stringify({
        nombre: nombreFull,
        codigo: codigUsr,
        rol: rol,
      });

      // Crear la respuesta
      const response = jsonSuccess({
        success: "Datos actualizados correctamente",
      });

      // Configurar la cookie en los headers de la respuesta
      response.headers.append(
        "Set-Cookie",
        `auth=${encodeURIComponent(cookieValue)}; ` +
          `Path=/; ` +
          `HttpOnly; ` +
          `Secure; ` +
          `SameSite=Lax; ` +
          `Max-Age=${60 * 60 * 24}`,
      );

      return jsonSuccess({ message: "completado", response }, 200);
    } catch (error) {
      console.log(error);
      return jsonSuccess({ error: `ERROR. ${error}` }, 400);
    }
  },

  /*-- BORRAR USUARIO --*/
  DELETE(req: Request) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id")?.toString() ?? "";
      if (!id) return jsonSuccess({ error: "No se encontro el id" }, 400);

      let eliminar;

      return jsonSuccess({ message: "completado", eliminar }, 200);
    } catch (error) {
      console.log(error);
      return jsonSuccess({ error: `ERROR. ${error}` }, 400);
    }
  },
};
