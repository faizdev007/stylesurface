import nodemailer from "nodemailer";

interface FormData {
  fullName: string;
  phone: string;
  userType: string;
  requirement: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendFormEmail(formData: FormData, adminEmail: string) {
  const emailContent = `
    <h2>New Form Submission</h2>
    ${Object.entries(formData)
      .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
      .join("")}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: "New Form Submission",
    html: emailContent,
  });
}
