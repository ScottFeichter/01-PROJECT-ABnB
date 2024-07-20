import { useSelector } from "react-redux";
import Spot from "../../Spot";
import './SearchResults.css';


const SearchResults = () => {

    const searchResults = useSelector(state => state.spots.Spots);
    // console.log("searchReasults=========", searchResults)


    // console.log("SEARCH RESULTS COMPONENT RAN");
    return (
    <>
    <div id="searchResults">
        {searchResults ?
        searchResults.map(result => <Spot key={result.id} spot={result} />) :
        <p>sorry, no results</p> }
    </div>

    </>
    );
}

export default SearchResults;
