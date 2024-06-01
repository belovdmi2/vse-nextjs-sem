import NavLink from './commons/buttons/NavLink'

const Menu = () => {
  return (
    <div className="flex justify-between pb-5">
      <h1 className="font-bold text-2xl pt-2">Velocity</h1>
      <div className="flex gap-5">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/car/new/">Add Car</NavLink>
      </div>
    </div>
  )
}

export default Menu
