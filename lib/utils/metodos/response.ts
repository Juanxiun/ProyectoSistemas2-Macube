export const jsonSuccess = <T>(data: T, status = 200, headers?: HeadersInit): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: headers ? headers : {"Content-Type": "application/json"},
  });
};
