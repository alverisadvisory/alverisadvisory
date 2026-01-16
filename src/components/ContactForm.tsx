import { useState } from 'react';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

interface ContactFormProps {
  isEnglish?: boolean;
}

export function ContactForm({ isEnglish = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const labels = isEnglish
    ? {
        name: 'Name',
        company: 'Company',
        email: 'Email',
        message: 'Message',
        submit: 'Send message',
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email',
        successMessage: 'Thank you for your message. I will get back to you soon.',
      }
    : {
        name: 'Name',
        company: 'Unternehmen',
        email: 'E-Mail',
        message: 'Anliegen',
        submit: 'Nachricht senden',
        required: 'Dieses Feld ist erforderlich',
        invalidEmail: 'Bitte geben Sie eine gültige E-Mail ein',
        successMessage: 'Vielen Dank für Ihre Nachricht. Ich melde mich bald.',
      };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = labels.required;
    if (!formData.email.trim()) newErrors.email = labels.required;
    if (!formData.message.trim()) newErrors.message = labels.required;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = labels.invalidEmail;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: Connect to your email service or backend
      // For now, we log to console and show success message
      console.log('Contact form submission:', formData);

      // Uncomment when backend is ready:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Failed to submit form');

      setSubmitted(true);
      setFormData({ name: '', company: '', email: '', message: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-light-gray border-l-4 border-gold p-6 rounded text-center">
        <p className="text-navy font-medium text-lg">{labels.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label={labels.name}
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder={labels.name}
      />

      <Input
        label={labels.company}
        name="company"
        type="text"
        value={formData.company}
        onChange={handleChange}
        placeholder={labels.company}
      />

      <Input
        label={labels.email}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="name@example.com"
      />

      <Textarea
        label={labels.message}
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        placeholder={labels.message}
        rows={6}
      />

      {errors.submit && <p className="text-red-600 text-sm">{errors.submit}</p>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (isEnglish ? 'Sending...' : 'Wird gesendet...') : labels.submit}
      </Button>
    </form>
  );
}
