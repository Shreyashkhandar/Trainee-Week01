import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Employee Management', description: 'Day 7 full-stack employee management app' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
