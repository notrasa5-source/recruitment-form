import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  roll_no: z.string()
    .min(2, 'Roll number is required')
    .max(15, 'Roll number should not be greater than 15 digits')
    .regex(/^\d+$/, 'Roll number must be digits only'),
  year: z.enum(['1st', '2nd'], { error: 'Year is required' }),
  email: z.string()
    .email('Invalid email format')
    .refine((val) => val.endsWith('@gmail.com'), 'Email must be a @gmail.com address'),
  phone_number: z.string()
    .min(13, 'Phone number must include country code and be at least 13 characters (e.g. +91XXXXXXXXXX)')
    .max(15, 'Phone number should not be greater than 15 characters')
    .regex(/^\+\d{1,3}\d{10}$/, 'Phone number must start with country code (e.g. +91) followed by 10 digits'),
  hobbies: z.string().optional(),
  why_interested: z.string().min(2, 'This field is required').refine(v => v.trim() !== '', 'Cannot be blank'),
  why_hire: z.string().min(2, 'This field is required').refine(v => v.trim() !== '', 'Cannot be blank'),
  best_work: z.string()
    .min(10, 'Please add a Google Drive public view link to your best work')
    .refine(
      (val) =>
        /^https:\/\/drive\.google\.com\/[^\s]+$/.test(val) || /^https:\/\/github\.com\/[^\s]+$/.test(val),
      'Please enter a valid Google Drive or Github public view link'
    ),
});

export type RegistrationData = z.infer<typeof registrationSchema>;


