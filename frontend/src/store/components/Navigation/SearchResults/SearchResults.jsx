import { useSelector } from "react-redux";
import Spot from "../../Spot";
import './SearchResults.css';


const SearchResults = () => {

    const searchResults = useSelector(state => state.spots);
    const results = searchResults.spots;


    return (
    <>
    {console.log('SERACH RESULTS RETURN RENDERED I GUESS')}
    <div id="searchResults">
        {results ?
        results.map(result => <Spot key={result.id} spot={result} />) :
        <p>sorry, no results</p> }
    </div>

    </>
    );
}

export default SearchResults;
