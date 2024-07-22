import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from './store/components/Navigation/SearchResults';
import SpotDetails from './store/components/SpotDetails/SpotDetails';
import CreateNewSpot from "./store/components/CreateNewSpot/CreateNewSpot";
import CreateNewReviewModal from "./store/components/CreateNewReviewModal/CreateNewReviewModal";
import UpdateSpot from "./store/components/UpdateSpot/UpdateSpot";
import DeleteSpot from "./store/components/DeleteSpot/DeleteSpot.jsx";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from './store/session.js';
import * as spotsActions from './store/spots.js';
import Navigation from './store/components/Navigation';
import { Outlet } from "react-router-dom";
import UserSpotManagement from "./store/components/UserSpotManagement";

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
        path: '/spots/manage',
        element: <UserSpotManagement  />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails  />
      },
      {
        path: '/spots/new',
        element: <CreateNewSpot  />
      },
      {
        path: '/spots/update',
        element: <UpdateSpot  />
      },
      {
        path: '/spots/delete',
        element: <DeleteSpot  />
      },
      {
        path: '/spots/:spotId/reviews/new',
        element: <CreateNewReviewModal  />
      },


    ]
  }
]);


function App() {

  // console.log("APP COMPONENT RAN");
  return <RouterProvider router={router} />;
}

export default App;
