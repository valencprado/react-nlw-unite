import icon from '../assets/img/nlw-unite-icon.svg';
import { NavLink } from './nav-link';
export default function Header() {
    return (
        <div className='flex items-center gap-5 py-2'>

            <img src={icon} alt="" />
            <nav className='flex items-center gap-5'>
             <NavLink href='#'>Eventos</NavLink>
                <NavLink href='#'>Participantes</NavLink>
            </nav>
        </div>
    );

}