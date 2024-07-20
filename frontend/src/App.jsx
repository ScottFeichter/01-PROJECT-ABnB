import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from './store/components/Navigation/SearchResults';
import SpotDetails from './store/components/SpotDetails/SpotDetails';
import Layout from './store/components/Layout';



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
