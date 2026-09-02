'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { ContactFormSchema, type ContactFormData } from '@/lib/schemas';
import TextField from '@/components/form/TextField';
import TextArea from '@/components/form/TextArea';
import Button from '@/components/ui/Button';
import Alert from '@/components/feedback/Alert';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: '', email: '', message: '', website: '' }
  });

  async function onSubmit(values: ContactFormData) {
    setStatus('idle');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(data.error || 'Unexpected error');
        return;
      }
      setStatus('success');
      form.reset();
    } catch (e: unknown) {
      setStatus('error');
      const message = e instanceof Error ? e.message : 'Network error';
      setErrorMessage(message);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <p>Send an enquiry. This posts to the multi-tenant contact endpoint and will eventually forward to Raisuite ERP.</p>
      {status === 'success' && <Alert type="success" message="Enquiry submitted successfully." />}
      {status === 'error' && <Alert type="error" message={errorMessage || 'Failed to submit.'} />}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg"
        aria-describedby="form-help"
        noValidate
      >
        {/* Honeypot field for spam bots */}
        <div className="hidden" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...form.register('website')} />
        </div>
        <TextField
          label="Name"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />
        <TextField
          label="Email"
          type="email"
          {...form.register('email')}
          error={form.formState.errors.email?.message}
        />
        <TextArea
          label="Message"
          rows={5}
          {...form.register('message')}
          error={form.formState.errors.message?.message}
        />
        <Button type="submit" disabled={form.formState.isSubmitting} isLoading={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <div id="form-help" className="text-xs text-gray-500">
          We will respond as soon as possible. Please do not include sensitive credentials.
        </div>
      </form>
    </div>
  );
}