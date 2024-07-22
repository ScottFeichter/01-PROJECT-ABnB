import "./SpotToManageUpdateButton.css";
import { useNavigate } from "react-router-dom";

function SpotToManageUpdateButton({spot}) {

  console.log("SPOT FROM UPDATE BUTTON COMPONENT", spot);
  
    const navigate = useNavigate()

    const handleSpotUpdate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/spots/update')

    }


  // console.log('SPOT TO UPDATE BUTTON COMPONENT RAN')
  return (

    <button id="spotToManageUpdateButton" onClick={handleSpotUpdate}>Update</button>

  );
}

export default SpotToManageUpdateButton;
