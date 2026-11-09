import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';

const NotFound = () => (
  <>
    <SEO title="Page not found" noIndex />
    <section className="wrap flex min-h-[80vh] flex-col justify-center pb-16 pt-32">
      <p className="stamp self-start">Error 404</p>
      <h1 className="serif mt-6 text-6xl leading-none sm:text-8xl">
        This page was <em className="text-accent">torn out</em>.
      </h1>
      <p className="hand mt-4 text-3xl">…or it was never written.</p>
      <p className="mt-6 max-w-[48ch] text-lg">The link may be old. Everything that does exist is one click away:</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" viewTransition className="btn">Return to Home</Link>
        <Link to="/projects/all" viewTransition className="btn-ghost">Projects</Link>
        <Link to="/blogs/all" viewTransition className="btn-ghost">Blog</Link>
      </div>
    </section>
  </>
);

export default NotFound;
