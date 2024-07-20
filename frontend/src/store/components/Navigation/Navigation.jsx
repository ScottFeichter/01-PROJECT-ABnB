import './Navigation.css';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from './Logo/scottbnb.png';
import ProfileButton from './ProfileButton';
import { IoHome } from "react-icons/io5";

// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import LoginFormModal from "../LoginFormModal/LoginFormModal";
// import SignupFormModal from "../SignupFormModal/SignupFormModal";



const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state => state.session.user);

    console.log("NAVIGATION COMPONENT RAN");
    return(
     <header>
        <a href="/">
            <img id="logo" src={logo} alt="logo"></img>
        </a>
        {/* <SearchBar /> */}
        <ul>
            <li id="homeLi">
                <NavLink to="/" id="NavLinkToHome"><IoHome id="IoHome"/></NavLink>
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
