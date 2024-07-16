import './Spot.css';


function Spot({spot}) {

const spotKeys = Object.keys(spot);
const spotValues = Object.values(spot);
// const spotEntries = Object.entries(spot);


    return (
        <>

        <div id="spotContainer">
            <div className="detailContainer"><p className="key">{spotKeys[8]}</p><p className="value">{spotValues[8]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[14]}</p><p className="value">{spotValues[14]}</p></div>

            <div className="detailContainer"><p className="key">{spotKeys[2]}</p><p className="value">{spotValues[2]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[3]}</p><p className="value">{spotValues[3]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[4]}</p><p className="value">{spotValues[4]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[5]}</p><p className="value">{spotValues[5]}</p></div>


            <div className="detailContainer"><p className="key">{spotKeys[9]}</p><p className="value">{spotValues[9]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[10]}</p><p className="value">{spotValues[10]}</p></div>

            <div className="detailContainer"><p className="key">{spotKeys[13]}</p><p className="value">{spotValues[13]}</p></div>

            <div className="detailContainer"><p className="key">{spotKeys[0]}</p><p className="value">{spotValues[0]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[1]}</p><p className="value">{spotValues[1]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[6]}</p><p className="value">{spotValues[6]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[7]}</p><p className="value">{spotValues[7]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[11]}</p><p className="value">{spotValues[11]}</p></div>
            <div className="detailContainer"><p className="key">{spotKeys[12]}</p><p className="value">{spotValues[12]}</p></div>
        </div>

        </>

    )
}

export default Spot;
