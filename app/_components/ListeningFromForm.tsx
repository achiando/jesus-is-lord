"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnalytics } from '@/lib/context/AnalyticsContext';
import { CheckCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
  region: z.string().min(2, { message: 'Region/State must be at least 2 characters.' }),
  place: z.string().min(2, { message: 'City/Place must be at least 2 characters.' }),
});

export const ListeningFromForm: React.FC = () => {
  const { addSubmission } = useAnalytics();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', country: '', region: '', place: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addSubmission({ region: values.region, country: values.country });
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <section className="w-full py-12 bg-secondary/50">
        <div className="container mx-auto text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 flex flex-col items-center gap-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-2xl font-bold">Thank You!</h3>
              <p className="text-muted-foreground">Your location has been submitted. We are blessed to have you listening with us.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 bg-secondary/50">
      <div className="container mx-auto">
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Where Are You Listening From?</CardTitle>
            <CardDescription>
              This helps us understand our global reach.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl><Input placeholder="e.g., Kenya" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region/State</FormLabel>
                        <FormControl><Input placeholder="e.g., Nairobi" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">Submit Location</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
