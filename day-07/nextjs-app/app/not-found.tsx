import Link from 'next/link';

export default function NotFound() { return <main className="page-shell"><section className="panel status"><h1>Employee not found</h1><p>That employee does not exist or may have been removed.</p><Link className="button primary" href="/employees">Back to employees</Link></section></main>; }
