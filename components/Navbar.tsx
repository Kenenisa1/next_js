import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/event.jpg'

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full z-50 transition-all duration-300">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <nav className="flex items-center justify-between bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl px-6 py-3 shadow-sm">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="overflow-hidden rounded-lg border border-gray-100">
              <Image src={logo} alt="Event Logo" width={32} height={32} className="object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
              Evently
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <Link 
              href="/events" 
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              Explore Events
            </Link>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar