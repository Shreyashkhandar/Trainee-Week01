'use client';

export default function EmployeesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main className="page-shell"><section className="panel status"><h1>Unable to load employees</h1><p>The backend may be offline. Start it and retry.</p><button className="button primary" onClick={reset}>Retry</button></section></main>; }
