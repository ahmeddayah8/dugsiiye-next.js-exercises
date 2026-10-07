"use server";

export type FormState = {
  error: string;
  message: string;
  greeting: string;
};

export async function submitForm(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();

  if (!email || !firstName || !lastName) {
    return {
      error: "Please fill in all required fields.",
      message: "",
      greeting: "",
    };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters.",
      message: "",
      greeting: "",
    };
  }

  // Wuxuu ka muuqanayaa terminal-ka server-ka.
  console.log("Submitted email:", email);

  return {
    error: "",
    message: "Thanks for submitting!",
    greeting: `Hello, ${firstName} ${lastName}!`,
  };
}