import emailjs from "@emailjs/browser";

// Initialize EmailJS with public key
emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
});

export async function sendEmail(form: HTMLFormElement) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    throw new Error("EmailJS environment variables are not configured");
  }

  // Extract form data manually for better debugging
  const formData = new FormData(form);
  const templateParams = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    title: "Portfolio Contact",
  };

  console.log("Sending with:", { serviceId, templateId, templateParams });

  return emailjs.send(serviceId, templateId, templateParams);
}
