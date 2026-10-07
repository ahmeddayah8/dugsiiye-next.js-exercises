"use client";

import { useActionState } from "react";
import { submitForm, type FormState } from "./actions";

const initialState: FormState = {
  error: "",
  message: "",
  greeting: "",
};

export default function UserForm() {
  const [state, formAction, pending] = useActionState(
    submitForm,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>

      <div aria-live="polite">
        {state.error && (
          <p style={{ color: "red" }}>{state.error}</p>
        )}

        {state.message && (
          <p style={{ color: "green" }}>{state.message}</p>
        )}

        {state.greeting && <h2>{state.greeting}</h2>}
      </div>
    </form>
  );
}