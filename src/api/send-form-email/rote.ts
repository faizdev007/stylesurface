import { sendFormEmail } from "../../lib/mail";

export async function POST(req: Request) {
console.log("API Hit: send-form-email");
  try {
    const data = await req.json();

    await sendFormEmail(data, process.env.ADMIN_EMAIL!);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Mail Error:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}