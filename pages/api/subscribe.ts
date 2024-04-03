import { Resend } from "resend";
import z from "zod";

const env = {
  RESEND_ADMIN_API_KEY: process.env.RESEND_ADMIN_API_KEY!,
  RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID!,
};

export const config = { runtime: "edge" };

const schema = z.object({
  email: z.string().email(),
});

const resend = new Resend(env.RESEND_ADMIN_API_KEY);

export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Not found", { status: 404 });
  }
  const requestBody = await request.json();
  const parsedBody = schema.safeParse(requestBody);

  if (parsedBody.success === false) {
    return new Response(parsedBody.error.message, { status: 400 });
  }

  try {
    resend.contacts.create({
      email: parsedBody.data.email,
      unsubscribed: false,
      audienceId: env.RESEND_AUDIENCE_ID!,
    });
    return new Response("Request received", { status: 202 });
  } catch (err) {
    console.log(err);
    return new Response("Service unavailable", { status: 503 });
  }
};
