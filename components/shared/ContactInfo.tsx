import { MapPin, Mail, Phone } from 'lucide-react';
import React from 'react';
import { locations, feedbackContacts } from '@/data/contacts'; // Import data

export const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact & Feedback</h3>
      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.name}>
            <p className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {location.name}
            </p>
            <p className="text-sm text-muted-foreground pl-6">{location.address}</p>
            <p className="text-sm text-muted-foreground pl-6 flex items-center gap-2">
              <Phone className="h-3 w-3" />
              {location.phone}
            </p>
          </div>
        ))}
        <div className="pt-2">
          {feedbackContacts.map((contact) => (
            <div key={contact.email} className="mt-2">
              <a href={`mailto:${contact.email}`} className="font-medium flex items-center gap-2 group">
                <Mail className="h-4 w-4 text-primary" />
                <span className="group-hover:underline">{contact.email}</span>
              </a>
              <p className="text-sm text-muted-foreground pl-6">{contact.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
