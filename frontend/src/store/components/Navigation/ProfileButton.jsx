import { LuUserCircle2 } from "react-icons/lu"
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import {NavLink} from "react-router-dom"

import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;
    // ulRef.current && this was in the if on line 27
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} id="profile-button">
        <LuUserCircle2 id="LuUserCircle2"/>
      </button>

      <ul className={ulClassName} id="houdini" ref={ulRef}>
        {user ? (
          <div id='houdiniLiWrapperDiv'>
            <li >Hello, {user.firstName} {user.lastName}</li>
            <li >{user.username}</li>
            <li >{user.email}</li>
            <li >
              <NavLink to="/manageSpots" id='manageSpotsNavLink'>Manage Spots</NavLink>
            </li>
            <li >
              <button onClick={logout} id="userLogoutButton">Log Out</button>
            </li>
          </div>
        ) : (
          <>
          <ul id="notLoggedIn">
            <li >
              <OpenModalButton
                className="notLoggedInButton"
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li >
              <OpenModalButton
                className="notLoggedInButton"
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            </ul>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
