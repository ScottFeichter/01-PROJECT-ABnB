import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from './store/components/Navigation/SearchResults';
import SpotDetails from './store/components/SpotDetails/SpotDetails';
// import Layout from './store/components/Layout';
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from './store/session.js';
import * as spotsActions from './store/spots.js';
import Navigation from './store/components/Navigation';
import { Outlet } from "react-router-dom";

function Layout() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
      dispatch(sessionActions.restoreUser()).then(()=> {
        setIsLoaded(true)
      });
    }, [dispatch]);


    useEffect(() => {
       dispatch(spotsActions.search());
      //  console.log("DISPATCH LINE 21 LAYOUT.jsx");
     },)



    // console.log("LAYOUT COMPONENT RAN");
    return (<>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>)
  }



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SearchResults />,
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails  />
      }
    ]
  }
]);


function App() {

  // console.log("APP COMPONENT RAN");
  return <RouterProvider router={router} />;
}

export default App;
