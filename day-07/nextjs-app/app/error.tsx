'use client';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="page-shell"><section className="panel status"><h1>Something went wrong</h1><p>We could not load this page. Check the API and try again.</p><button className="button primary" onClick={reset}>Try again</button></section></main>;
}
