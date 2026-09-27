'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { href: '/', label: 'Overview', marker: 'OV' },
  { href: '/facilities', label: 'Facilities', marker: 'FC' },
  { href: '/inspections', label: 'Inspections', marker: 'IN' },
  { href: '/complaints', label: 'Complaints', marker: 'CO' }
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const activePage = navigation.find((item) => item.href === pathname)
    ?? navigation.find((item) => pathname.startsWith(item.href) && item.href !== '/');

  return (
    <div className="app-frame">
      <aside className={`sidebar${menuOpen ? ' sidebar--open' : ''}`}>
        <Link className="brand" href="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">S</span>
          <span>Steward<small>FACILITY OPERATIONS</small></span>
        </Link>
        <p className="nav-caption">WORKSPACE</p>
        <nav aria-label="Main navigation" className="main-navigation">
          {navigation.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'nav-link nav-link--active' : 'nav-link'}
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-marker">{item.marker}</span>{item.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer"><span className="service-indicator" />Local database connection</div>
      </aside>
      {menuOpen && <button aria-label="Close navigation" className="mobile-scrim" onClick={() => setMenuOpen(false)} />}
      <div className="main-column">
        <header className="topbar">
          <button aria-expanded={menuOpen} aria-label="Toggle navigation" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span /> <span />
          </button>
          <span className="breadcrumb">OPERATIONS <span>/</span> {activePage?.label.toUpperCase() ?? 'FACILITIES'}</span>
          <span className="topbar-note">FACILITY MANAGEMENT</span>
        </header>
        {children}
      </div>
    </div>
  );
}