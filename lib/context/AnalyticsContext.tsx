"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';

export interface Submission {
  region: string;
  country: string;
  timestamp: Date;
}

interface AnalyticsContextType {
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'timestamp'>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const addSubmission = useCallback((submission: Omit<Submission, 'timestamp'>) => {
    const newSubmission: Submission = {
      ...submission,
      timestamp: new Date(),
    };
    setSubmissions((prev) => [...prev, newSubmission]);
    // In a real app, you'd also send this to your backend.
    console.log("New listener submission:", newSubmission);
  }, []);

  const value = {
    submissions,
    addSubmission,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
