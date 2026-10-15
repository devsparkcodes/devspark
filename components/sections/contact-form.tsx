"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { contact } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success";

type ContactFormProps = {
  /** Preselected category (e.g. "project" from /contact?topic=project). */
  defaultCategory?: string;
};

const { form } = contact;

/** Mirrors the server-side limits in `app/api/contact/route.ts`. */
const NAME_MIN = 2;
const NAME_MAX = 100;
const EMAIL_MAX = 200;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Client-side budget for the submit request. The server applies its own
 * provider timeout; this only stops a stalled connection from leaving the
 * button stuck on "Sending…".
 */
const SUBMIT_TIMEOUT_MS = 25_000;

type FieldName = "name" | "email" | "category" | "message";

const FIELDS: FieldName[] = ["name", "email", "category", "message"];

function isCategory(value: string): boolean {
  return form.categories.some((category) => category.value === value);
}

/**
 * Contact form: client-side validation, loading state, and honest
 * success/error handling. A success confirmation is shown only after the
 * server responds with an accepted submission; failures keep the user's
 * input and surface the server's message for retry. Server-side field
 * errors are mapped back onto the matching control. Honeypot field for
 * basic spam protection (hidden from real users and assistive tech).
 */
export function ContactForm({ defaultCategory }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(() =>
    defaultCategory && isCategory(defaultCategory) ? defaultCategory : "general"
  );
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const successPanelRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation when it replaces the form, so keyboard
  // and screen-reader users land on the result instead of losing focus.
  useEffect(() => {
    if (status === "success") successPanelRef.current?.focus();
  }, [status]);

  /** Returns the validation message for one field, or `null` when valid. */
  function fieldMessage(field: FieldName): string | null {
    switch (field) {
      case "name": {
        const value = name.trim();
        if (value.length < NAME_MIN) return form.errors.required;
        if (value.length > NAME_MAX) return form.errors.nameLong;
        return null;
      }
      case "email": {
        const value = email.trim();
        if (value.length > EMAIL_MAX || !EMAIL_PATTERN.test(value))
          return form.errors.email;
        return null;
      }
      case "category":
        return isCategory(category) ? null : form.errors.category;
      case "message": {
        const value = message.trim();
        if (value.length < MESSAGE_MIN) return form.errors.messageShort;
        if (value.length > MESSAGE_MAX) return form.errors.messageLong;
        return null;
      }
    }
  }

  function focusFirstInvalid(next: Record<string, string>) {
    const first = FIELDS.find((field) => next[field]);
    if (first) document.getElementById(`contact-${first}`)?.focus();
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const field of FIELDS) {
      const message = fieldMessage(field);
      if (message) next[field] = message;
    }
    setErrors(next);
    focusFirstInvalid(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setServerError(null);
    if (!validate()) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          category,
          message: message.trim(),
          website,
        }),
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      });
      const data: {
        ok?: boolean;
        message?: string;
        fields?: Record<string, unknown>;
      } = await response.json().catch(() => ({}));

      // Success is shown only when the server confirms it accepted the
      // submission — never on a bare 2xx or an unreadable response.
      if (response.ok && data.ok === true) {
        setStatus("success");
        setErrors({});
        return;
      }
      setStatus("idle");

      // Field-level server errors are shown against their own controls.
      const flagged = data.fields ?? {};
      const next: Record<string, string> = {};
      for (const field of FIELDS) {
        if (flagged[field]) next[field] = fieldMessage(field) ?? form.errors.invalid;
      }
      if (Object.keys(next).length > 0) {
        setErrors(next);
        setServerError(null);
        focusFirstInvalid(next);
        return;
      }

      setServerError(data.message || form.errors.network);
    } catch (error) {
      setStatus("idle");
      const timedOut =
        error instanceof DOMException && error.name === "TimeoutError";
      setServerError(timedOut ? form.errors.timeout : form.errors.network);
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setCategory("general");
    setMessage("");
    setWebsite("");
    setErrors({});
    setServerError(null);
    setStatus("idle");
  }

  const contactEmail = siteConfig.links.contactEmail;

  const fieldError = (field: string) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1.5 text-body-sm font-medium text-danger">
        {errors[field]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div
        ref={successPanelRef}
        tabIndex={-1}
        role="status"
        className="rounded-card border border-border p-7 md:p-8 focus:outline-none"
      >
        <h2 className="text-title">Message submitted</h2>
        <p className="mt-3 text-[0.975rem] leading-relaxed text-secondary">
          {form.successBody}
        </p>
        <Button
          type="button"
          variant="onDark"
          className="mt-6"
          onClick={resetForm}
        >
          {form.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-describedby="contact-form-note"
      aria-busy={status === "submitting"}
      className="rounded-card border border-border p-7 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-title">{form.title}</h2>
        <span className="label rounded-full bg-accent px-2.5 py-1 text-[0.65rem] text-on-accent">
          {form.badge}
        </span>
      </div>
      <p id="contact-form-note" className="mt-3 text-body-sm text-secondary">
        {form.note}
      </p>

      {serverError ? (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-danger/60 bg-danger/10 px-4 py-3 text-body-sm text-text"
        >
          <p>{serverError}</p>
          {contactEmail ? (
            <p className="mt-2 text-secondary">
              You can also email us directly at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="link-underline cursor-pointer font-medium text-text"
              >
                {contactEmail}
              </a>
              .
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
        <div>
          <label
            className="label block text-label text-secondary"
            htmlFor="contact-name"
          >
            {form.fields.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn("input mt-2", errors.name && "border-danger")}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {fieldError("name")}
        </div>
        <div>
          <label
            className="label block text-label text-secondary"
            htmlFor="contact-email"
          >
            {form.fields.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn("input mt-2", errors.email && "border-danger")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {fieldError("email")}
        </div>
        <div>
          <label
            className="label block text-label text-secondary"
            htmlFor="contact-category"
          >
            {form.fields.category}
          </label>
          <select
            id="contact-category"
            name="category"
            required
            aria-invalid={errors.category ? true : undefined}
            aria-describedby={
              errors.category ? "contact-category-error" : undefined
            }
            className={cn("input mt-2", errors.category && "border-danger")}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {form.categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldError("category")}
        </div>
        <div>
          <label
            className="label block text-label text-secondary"
            htmlFor="contact-message"
          >
            {form.fields.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={cn("input mt-2", errors.message && "border-danger")}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {fieldError("message")}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="onDark"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? form.sending : form.submit}
        </Button>
        <span className="text-body-sm text-secondary">
          Replies go to your email address.
        </span>
      </div>
    </form>
  );
}
