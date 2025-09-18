'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, Plane } from 'lucide-react';
import { registrationSchema, type RegistrationData } from '@/lib/validations';

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Roll number validation: must be 15 digits or less
    if (!/^\d{1,15}$/.test(data.roll_no)) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage('Roll number should not be greater than 15 digits.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Registration Successful!</h2>
              <p className="text-gray-600">
                Welcome to NOTxRASA! A confirmation email has been sent to your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex flex-col items-center mb-4">
            <img src="/notxrasa.png" alt="NOTxRASA Logo" className="w-20 h-20 rounded-full mb-2 border-4 border-red-600 shadow-lg" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent mb-2">NOTxRASA</h1>
            <p className="text-lg text-black-200 font-medium">We bring togetherness out of nothingness</p>
          <p className="text-center text-sm text-gray-400 mt-2">Join NOTxRASA and take your first step into the world of creativity!</p>
          <div className="flex flex-row justify-center gap-4 mt-2">
            <a href="https://instagram.com/notxrasa" target="_blank" rel="noopener noreferrer">
              <img src="/insta.jpeg" alt="Instagram" className="w-8 h-8 rounded-full border-2 border-red-600 hover:scale-110 transition" />
            </a>
            <a href="https://www.linkedin.com/company/notxrasa" target="_blank" rel="noopener noreferrer">
              <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8 rounded-full border-2 border-red-600 hover:scale-110 transition" />
            </a>
            <a href="https://linktr.ee/notxrasa" target="_blank" rel="noopener noreferrer">
              <img src="/tree.png" alt="linktree" className="w-8 h-8 rounded-full border-2 border-red-600 hover:scale-110 transition" />
            </a>
          </div>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="roll_no">Roll Number</Label>
                <Input id="roll_no" {...register('roll_no')} />
                {errors.roll_no && <p className="text-red-500 text-sm">{errors.roll_no.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year</Label>
                <Select onValueChange={(value) => setValue('year', value as '1st' | '2nd')} defaultValue={watch('year')}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                  </SelectContent>
                </Select>
                {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input id="phone_number" {...register('phone_number')} />
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
              </div>
              <div>
                <Label htmlFor="hobbies">Hobbies</Label>
                <Input id="hobbies" {...register('hobbies')} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="why_interested">Why are you interested in joining?</Label>
                <Input id="why_interested" {...register('why_interested')} />
                {errors.why_interested && <p className="text-red-500 text-sm">{errors.why_interested.message}</p>}
              </div>
              <div>
                <Label htmlFor="why_hire">Why should we hire you?</Label>
                <Input id="why_hire" {...register('why_hire')} />
                {errors.why_hire && <p className="text-red-500 text-sm">{errors.why_hire.message}</p>}
              </div>
              <div>
                <Label htmlFor="best_work">What is your best work? (Graphic Designing, Video editing, Coding)</Label>
                <Input id="best_work" placeholder="Google Drive or Github repository public view link" {...register('best_work')} />
                {errors.best_work && <p className="text-red-500 text-sm">{errors.best_work.message}</p>}
              </div>
            </div>
            <div className="mt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Register'}
              </Button>
            </div>
            {submitStatus === 'error' && errorMessage && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}



