import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react'; // Using MessageCircle for a generic social icon
import Image from 'next/image';
import Link from 'next/link';
import { ContactInfo } from './ContactInfo';
import { Platforms } from './Platforms';

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <Facebook className="h-5 w-5" /> },
  { name: 'Twitter', href: '#', icon: <Twitter className="h-5 w-5" /> },
  { name: 'Instagram', href: '#', icon: <Instagram className="h-5 w-5" /> },
  { name: 'Telegram', href: '#', icon: <MessageCircle className="h-5 w-5" /> },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Jesus Is Lord Radio" width={40} height={40} />
              <span className="text-xl font-bold">Jesus Is Lord Radio</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The Mightiest, Mightiest Prophet of the LORD, proclaiming the message of repentance and preparing the way for the glorious coming of the Messiah.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-4">
            <Platforms />
          </div>
          <div className="md:col-span-4">
            <ContactInfo />
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-bold">Important Notice</p>
            <p className="text-sm">Nobody should ask for any money in the name of the Prophet. These are conmen.</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jesus Is Lord Radio. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
