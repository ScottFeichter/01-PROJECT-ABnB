

const getSpotsController = async (search, session, csrf = null) => {

  if(search) {
    const {where, checkIn, checkOut, who} = search;
  }


  // get all spots
  if(!session) {
    const response = await fetch("/api/spots");
    const data = await response.json();
    console.log('GETSPOTSCONTROLLER RAN - DATA: ', data);
    return data;
  }

  // get all spots owned by current user /api/spots/current
  if("true"){
    const response = await fetch("/api/spots");
    const data = await response.json();
    console.log('GETSPOTSCONTROLLER RAN - DATA: ', data);
    return true
  }

  // get details of a spot by id /api/spots/:spotId
  if("true"){
    const response = await fetch("/api/spots");
    const data = await response.json();
    console.log('GETSPOTSCONTROLLER RAN - DATA: ', data);
    return true
  }

  return null;
}

export default getSpotsController;
