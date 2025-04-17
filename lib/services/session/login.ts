import { db } from "../../database/connect.ts";

const _db = await db();

const loginCli = async (ci: number, pass: string) => {
    try {
        const result = await _db.query(
            `SELECT ci, nombres, apellidos FROM clientes WHERE ci = ? AND pass = ? AND habilitado = 1`,
            [ci, pass]
        );

        return result.length > 0 ? result : null;
    } catch (err) {
        console.error("Error during CLIENT login:\n", err);
        throw new Error("Failed to login client.");
    }
};

const loginArq = async (codigo: string, pass: string) => {
    try {
        const result = await _db.query(
            `SELECT codigo, nombres, apellidos FROM arquitectos WHERE codigo = ? AND pass = ? AND habilitado = 1`,
            [codigo, pass]
        );

        return result.length > 0 ? result : null;
    } catch (err) {
        console.error("Error during ARCHITECT login:\n", err);
        throw new Error("Failed to login architect.");
    }
};

export { loginCli, loginArq };
