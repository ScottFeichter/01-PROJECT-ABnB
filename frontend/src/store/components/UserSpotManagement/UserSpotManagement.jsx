import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import * as spotsActions from "../../spots";
import SpotForManage from "./SpotForManage/SpotForManage";
import './UserSpotManagement.css'


function UserSpotManagement() {
    // const dispatch = useDispatch();
    // const session = useSelector(state => state.session.user);

    const spotsByCurrent = useSelector(state => state.spots.spotsCurrentUser);


   // console.log("USERSPOTMANAGEMENT COMPONENT RAN");
    return (
        <>
        <h1 id="UserSpotManagementH1">Manage Spots</h1>
        <div id="UserSpotManagementSpotsByCurrentUserContainer">


            {spotsByCurrent.length
            ? spotsByCurrent.map(spot => <SpotForManage key={spot.id} spot={spot} />)
            : <div id="UserSpotManagementNoSpotsContainer">
                    <p id="UserSpotManagementNoSpotsP">You have no spots.</p>
                    <NavLink to="/spots/new" id="UserSpotManagementNoSpotsContainerNavLinkToCreateNewSpot">Create a New Spot</NavLink>
            </div>
            }

        </div>
    </>
    );

}


export default UserSpotManagement;
