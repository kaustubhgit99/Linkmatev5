import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen hero-bg flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-display font-bold gradient-text mb-4">404</div>
      <h1 className="text-3xl font-display font-bold text-white mb-2">Page Not Found</h1>
      <p className="text-white/50 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="px-8 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all shadow-xl shadow-violet-500/30"
      >
        Go Home
      </Link>
    </div>
  )
}
