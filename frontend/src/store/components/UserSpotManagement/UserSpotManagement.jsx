import {Spot} from "../../Spot"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../spots";

function UserSpotManagement() {

    const dispatch = useDispatch();
    let spotsByCurrent = dispatch(spotsActions.getSpotsByCurrent(session.user.id))


    const css = "UserSpotManagement";


return (<>


    <h1 id="UserSpotManagementH1">Manage Spots</h1>

    <div id="UserSpotManagementSpotsByCurrentUserContainer">


        {spotsByCurrent
        ? spotsByCurrent.map(spot => <Spot key={spot.id} spot={spot} />)
        : <div id="UserSpotManagementNoSpotsContainer">
                  <p>You have no spots.</p>
                  <NavLink to="/spots/new" id="UserSpotManagementNoSpotsContainerNavLinkToCreateNewSpot">Create a New Spot</NavLink>
         </div>
        }

    </div>



</>)

}


export default UserSpotManagement;
