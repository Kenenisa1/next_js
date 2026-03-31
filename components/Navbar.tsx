import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <div>
        <header>
          <nav className='flex justify-between m-2'>
            <Link href='/'> 
              <Image src="@/public/next.svg" alt="" width={24} height={24} />
            </Link> 
            <ul className='space-2 p-x-3 gap-2 justify-between '>
            <Link href='/'>Home</Link>
            <Link href='/home'>Contact</Link>
            <Link href='/about'>About</Link>
          </ul>
          </nav>
         
        </header>
    </div>
  )
}

export default Navbar