"use client";
import { useForm } from "../hooks/use-form";
import { Button, Input, Label } from "./form";
import { Callout } from "./callout";

export function SignUpForm(props: { className?: string }) {
  const { formState, handleSubmit } = useForm();
  return (
    <div className={props.className}>
      <form onSubmit={handleSubmit}>
        {formState.type === "success" && (
          <Callout type="success" className="mb-4">
            Welcome on board{formState.name ? `, ${formState.name}` : ""}! Speak
            soon!
          </Callout>
        )}
        {formState.type === "error" && (
          <Callout type="alert" className="mb-4">
            {formState.message}
          </Callout>
        )}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Label className="sm:w-2/3">
            Email address*
            <Input name="email" type="email" required />
          </Label>
          <Button
            type="submit"
            className="w-full sm:max-w-[16rem]"
            size="sm"
            disabled={formState.type === "submitting"}
          >
            {formState.type === "submitting" ? "Submitting...." : "Subscribe"}
          </Button>
        </div>
        <div></div>
      </form>
    </div>
  );
}
