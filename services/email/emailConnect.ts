import Brevo from "npm:@getbrevo/brevo";

const apiInst = new Brevo.TransactionalEmailsApi();

apiInst.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  Deno.env.get("EMAIL_API") ?? "",
);

const sendEMTP = new Brevo.SendSmtpEmail();

export { apiInst, sendEMTP };