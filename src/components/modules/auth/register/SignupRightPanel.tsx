"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, X, ArrowLeft, Plus } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

const SignupRightPanel = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email is required"),
    password: z.string(),
    role: z.string(),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async (values) => {
      const toastId = toast.loading("Please wait...");
      setLoading(true);

      const { name, email, password, role } = values.value;

      try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        });

        const result = await res.json();

        if (!result.success) {
          setLoading(false);
          throw new Error(result.message || "Registration failed");
        }

        toast.success("Signup successfully!", {
          id: toastId,
        });

        await authClient.signIn.email({
          email: values.value.email,
          password: values.value.password,
        });

        setLoading(false);
        router.push("/");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Signup Failed", {
          id: toastId,
        });
      }
    },
  });

  const handleNextStep = () => {
    const { name, email } = form.state.values;

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setStep(2);
  };

  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-center  px-6 sm:px-12 lg:px-20 py-12 mx-auto">
      <Link href="/" className="absolute top-6 right-6 z-50 ...">
        <X size={24} />
      </Link>
      <div className="w-full max-w-md space-y-8 mx-auto lg:mx-0">
        {/* Step indicator + header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s
                      ? "bg-foodhub-maroon text-white shadow-md shadow-foodhub-maroon/30"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > s ? <Check size={13} /> : s}
                </div>
                {s < 2 && (
                  <div
                    className={`w-10 h-px transition-colors ${step > s ? "bg-foodhub-maroon" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
            <span className="text-foodhub-muted text-xs ml-2">
              {step === 1 ? "Basic info" : "Set password"}
            </span>
          </div>

          <div>
            <h1 className="text-foodhub-dark text-3xl font-black">
              {step === 1 ? "Create account 🍽️" : "Secure your account 🔒"}
            </h1>
            <p className="text-foodhub-muted text-sm mt-1">
              {step === 1
                ? "Start ordering in under a minute"
                : "Choose a strong password"}
            </p>
          </div>
        </div>

        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {step === 1 && (
            <>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-1.5">
                      <FieldLabel
                        htmlFor="name"
                        className="text-foodhub-dark text-sm font-semibold uppercase tracking-wider"
                      >
                        Full name
                      </FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-5 text-foodhub-dark placeholder-gray-300 text-sm focus:outline-none focus:border-foodhub-maroon focus:ring-2 focus:ring-foodhub-maroon/10 transition"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-1.5">
                      <FieldLabel
                        htmlFor="email"
                        className="text-foodhub-dark text-sm font-semibold uppercase tracking-wider"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-5 text-foodhub-dark placeholder-gray-300 text-sm focus:outline-none focus:border-foodhub-maroon focus:ring-2 focus:ring-foodhub-maroon/10 transition"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </>
          )}

          {step === 2 && (
            <>
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-1.5">
                      <FieldLabel
                        htmlFor="password"
                        className="text-foodhub-dark text-xs font-semibold uppercase tracking-wider"
                      >
                        Password
                      </FieldLabel>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-5 text-foodhub-dark placeholder-gray-300 text-sm focus:outline-none focus:border-foodhub-maroon focus:ring-2 focus:ring-foodhub-maroon/10 transition "
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="role"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  const roles = [
                    {
                      value: "CUSTOMER",
                      title: "Customer",
                      desc: "Order food & enjoy delivery",
                    },
                    {
                      value: "PROVIDER",
                      title: "Provider",
                      desc: "Sell food & manage restaurant",
                    },
                  ];

                  return (
                    <Field className="space-y-2">
                      <FieldLabel className="text-foodhub-dark text-xs font-semibold uppercase tracking-wider">
                        Select Role
                      </FieldLabel>

                      <div className="grid grid-cols-1 gap-3">
                        {roles.map((role) => {
                          const isSelected = field.state.value === role.value;

                          return (
                            <button
                              key={role.value}
                              type="button"
                              onClick={() => field.handleChange(role.value)}
                              className={`text-left rounded-2xl border px-4 py-4 transition-all shadow-sm
                  ${
                    isSelected
                      ? "border-foodhub-maroon bg-foodhub-maroon/5 ring-2 ring-foodhub-maroon/20"
                      : "border-gray-200 bg-white hover:border-foodhub-maroon/40"
                  }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-semibold text-foodhub-dark">
                                    {role.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {role.desc}
                                  </p>
                                </div>

                                <div
                                  className={`h-4 w-4 rounded-full border flex items-center justify-center
                    ${
                      isSelected
                        ? "border-foodhub-maroon bg-foodhub-maroon"
                        : "border-gray-300"
                    }`}
                                >
                                  {isSelected && (
                                    <div className="h-2 w-2 bg-white rounded-full" />
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </>
          )}

          {step === 1 ? (
            <Button
              type="button"
              onClick={() => handleNextStep()}
              className="w-full bg-foodhub-maroon hover:bg-foodhub-maroon/90 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-foodhub-maroon/20 mt-2"
            >
              Continue <ArrowRight size={16} />
            </Button>
          ) : (
            <div className="flex items-center gap-4 w-full">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-white hover:bg-white/90 text-foodhub-maroon font-bold py-5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-foodhub-maroon/20 mt-2 border border-gray-200"
              >
                <ArrowLeft size={16} />
                Back
              </Button>

              <Button
                form="register-form"
                type="submit"
                disabled={loading}
                className="flex-1 bg-foodhub-maroon hover:bg-foodhub-maroon/90 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-foodhub-maroon/20 mt-2"
              >
                Create Account <Plus size={16} />
              </Button>
            </div>
          )}
        </form>

        {/* Social (step 1 only) */}
        {step === 1 && (
          <>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs">or sign up with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              {["Google"].map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => signIn()}
                  className="flex items-center justify-center gap-2 border cursor-pointer border-gray-200 bg-white rounded-xl py-3 text-foodhub-dark text-sm font-medium hover:border-gray-300 hover:shadow-sm transition"
                >
                  {provider === "Google" ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {provider}
                </button>
              ))}
            </div>
          </>
        )}

        <p className="text-center text-foodhub-muted text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foodhub-maroon font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupRightPanel;
