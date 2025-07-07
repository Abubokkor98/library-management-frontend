import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
        <h1>Navbar</h1>
        <Outlet/>
        <h1>Footer</h1>
    </div>
  )
}
