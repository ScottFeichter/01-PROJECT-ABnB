import { NavLink } from "react-router-dom";
import { useSelector} from "react-redux";
import ProfileButton from './ProfileButton';
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import LoginFormModal from "../LoginFormModal/LoginFormModal";
// import SignupFormModal from "../SignupFormModal/SignupFormModal";

import './Navigation.css';

const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);



    return(
     <header>
        <img id="logo" src="logo" alt="logo"></img>
        <div id="searchbar">Searchbar</div>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {isLoaded && (
            <li>
                <ProfileButton user={sessionUser} />
            </li>
            )}
        </ul>
    </header>
    );
}

export default Navigation;
