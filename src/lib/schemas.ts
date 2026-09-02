import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email must be less than 254 characters')
    .toLowerCase()
    .trim(),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
    
  // Optional honeypot field for basic spam protection (hidden in UI)
  website: z.string().max(0, 'Spam detected').optional().or(z.literal(''))
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
