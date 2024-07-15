import { NavLink } from "react-router-dom";
import { useSelector} from "react-redux";
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";

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
            <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            />
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
