import { useSelector } from "react-redux";
import Spot from "../../Spot";
import './SearchResults.css';


const SearchResults = () => {

    const searchResults = useSelector(state => state.spots.Spots);
    // const results = searchResults.spots;
    console.log("searchReasults=========", searchResults)
    // console.log("results=========", results)

    console.log("SEARCH RESULTS COMPONENT RAN");
    return (
    <>
    {/* {console.log('SERACH RESULTS RETURN RENDERED')} */}
    <div id="searchResults">
        {searchResults ?
        searchResults.map(result => <Spot key={result.id} spot={result} />) :
        <p>sorry, no results</p> }
    </div>

    </>
    );
}

export default SearchResults;
