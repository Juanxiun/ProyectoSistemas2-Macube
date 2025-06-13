import { compare, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const hashpassword = async (code: string): Promise<string> => {
  const passhash: string = await hash(code);
  return passhash;
};

export const comparePass = async (
  pass: string,
  hashedPass: string,
): Promise<boolean> => {
  const passhash = hashedPass.toString();
  const isPass = await compare(pass, passhash);
  console.log(isPass);

  return isPass;
};
