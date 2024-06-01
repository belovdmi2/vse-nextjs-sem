import Link from 'next/link'

const NavLink = ({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) => {
  return (
    <Link
      href={href}
      className="font-semibold text-rose-950 transition duration-300 ease-in-ou p-2.5 rounded-md bg-white/50 backdrop-blur-sm hover:bg-white/70 hover:backdrop-blur-lg  w-24 text-center"
    >
      {children}
    </Link>
  )
}

export default NavLink
