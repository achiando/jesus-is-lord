"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
  region: z.string().min(2, { message: 'Region must be at least 2 characters.' }),
  place: z.string().min(2, { message: 'Place must be at least 2 characters.' }),
});

interface ListeningFromFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: z.infer<typeof formSchema>) => void;
}

export const ListeningFromForm: React.FC<ListeningFromFormProps> = ({ isOpen, onClose, onSave }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      country: '',
      region: '',
      place: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Where Are You Listening From?</DialogTitle>
          <DialogDescription>
            Please tell us where you are listening from. This helps us understand our global reach.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Country" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="Your Region/State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Place</FormLabel>
                  <FormControl>
                    <Input placeholder="Your City/Place" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Details</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
