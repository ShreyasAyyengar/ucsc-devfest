import { createElement } from "react";
import { render } from "react-email";
import RegistrationConfirmationEmail, { type RegistrationConfirmationEmailProps } from "../emails/registration-confirmation.js";

export async function renderRegistrationConfirmationEmail(props: RegistrationConfirmationEmailProps) {
  const email = createElement(RegistrationConfirmationEmail, props);
  const [html, text] = await Promise.all([render(email, { pretty: true }), render(email, { plainText: true })]);

  return { html, text };
}
