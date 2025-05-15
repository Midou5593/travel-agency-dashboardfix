import { Link, NavLink } from "react-router"
import { sidebarItems } from "~/constants"
import { cn } from "~/lib/utils"


const NavItems = ({handleClick}: {handleClick?: () => void}) => {
    const user = {
        name: "Sethu",
        email: "uYfY1@example.com",
        imageUrl:"/assets/images/david.webp"
    }
  return (
    <section className="nav-items">
      <Link to = "/" className="link-logo">
      <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
      <h1>Tourvistor</h1>
      </Link>
      <div className="container">
       <nav>
        {sidebarItems.map(({id,href, icon, label}) => (
         <div key={id} >
            <NavLink to={href} key={id}>
             {({isActive}:{isActive: boolean})=>(
               <div
               className={cn('group nav-item',{
                'bg-primary-100 !text-white': isActive
               })}
               onClick={handleClick}
               >
                <img
                 src={icon}
                
                  alt={label} 
                  className={` group-hover:brightness-0 size-5 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`} 
                  />
                {label}
               </div>
             )}
            </NavLink>
         </div>
        ))}
       </nav>
       <footer className="nav-footer">
        <img src={user?.imageUrl || '/assets/images/david.webp'} alt={user?.name || 'user'} />
        <article>
            <h2>{user?.name || 'User'}</h2>
            <p>{user?.email || 'uYfY1@example.com'}</p>
        </article>
        <button
        type="button"
        onClick={() => {
            console.log('logout')
        }}
        className="cursor-pointer"
        >
            <img 
            src="/assets/icons/logout.svg"
             alt="logout"
             className="size-6"
              />
        </button>
       </footer>
      </div>
    </section>
  )
}

export default NavItems
