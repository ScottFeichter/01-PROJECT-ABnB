import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from '../../session.js';
import * as spotsActions from '../../spots.js';
import Navigation from '../Navigation';
import { Outlet } from "react-router-dom";

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
      dispatch(sessionActions.restoreUser()).then(()=> {
        setIsLoaded(true)
      });
    }, [dispatch]);


    // useEffect(() => {

       dispatch(spotsActions.search());
       console.log("DISPATCH LINE 24 APP.jsx");
  // }, [])



    // console.log("LAYOUT COMPONENT RAN");
    return (<>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>)
  }

  export default Layout;
