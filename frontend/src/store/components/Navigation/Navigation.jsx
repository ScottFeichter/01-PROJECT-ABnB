import { NavLink } from "react-router-dom";
import { useSelector} from "react-redux";
import ProfileButton from './ProfileButton';

import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);

    const sessionLinks = sessionUser ? (
        <>
         <li>
            <ProfileButton user={sessionUser} />
         </li>
        </>
    ) : (
        <>
        <li>
            <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
            <NavLink to="/signup">Sign Up</NavLink>
        </li>
        </>
    );


    


    return(
     <header>
        <img id="logo" src="logo" alt="logo"></img>
        <div id="searchbar">Searchbar</div>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>

    </header>
    );
}

export default Navigation;
