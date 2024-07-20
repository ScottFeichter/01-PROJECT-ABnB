import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from './store/components/Navigation';
import * as sessionActions from './store/session';
import * as spotsActions from './store/spots'
import SearchResults from './store/components/Navigation/SearchResults';
import SpotDetails from './store/components/SpotDetails/SpotDetails';

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

  console.log("LAYOUT COMPONENT RAN");
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

  console.log("APP COMPONENT RAN");
  return <RouterProvider router={router} />;
}

export default App;
