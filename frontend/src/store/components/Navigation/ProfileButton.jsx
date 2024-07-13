import { FaHouseChimneyUser } from "react-icons/fa6"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button>
        <FaHouseChimneyUser />
      </button>
      <ul className="profile-dropdown">
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}


export default ProfileButton;
