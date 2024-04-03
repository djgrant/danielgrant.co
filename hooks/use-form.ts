import { FormEvent, useState } from "react";

function createHandleSubmit(cbs: {
  onSuccess: () => void;
  onError: (err: any) => void;
  onSubmitting: () => void;
}) {
  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cbs.onSubmitting();

    const currentTarget = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        cbs.onSuccess();
        currentTarget.reset();
        currentTarget
          .querySelectorAll("input")
          .forEach((input) =>
            input.removeAttribute("data-com-onepassword-filled")
          );
      } else {
        const resBody = await response.json();
        const message = resBody.map((err: any) => err.message).join("\n");
        cbs.onError(message);
      }
    } catch (error) {
      console.log(error);
      cbs.onError(
        "Something went wrong at our end. So sorry about this. Please try again."
      );
    }
  };
}

export const useForm = () => {
  const [formState, setFormState] = useState<FormState>({ type: "ready" });
  const handleSubmit = createHandleSubmit({
    onSubmitting: () => setFormState({ type: "submitting" }),
    onError: (message) => setFormState({ type: "error", message }),
    onSuccess: () => setFormState({ type: "success" }),
  });
  return { formState, handleSubmit };
};

type FormState =
  | { type: "ready" }
  | { type: "submitting" }
  | { type: "error"; message: string }
  | { type: "success"; name?: string };
