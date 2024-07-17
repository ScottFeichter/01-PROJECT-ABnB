import { useSelector } from "react-redux";
import Spot from "../../Spot";


const SearchResults = () => {

    const searchResults = useSelector(state => state.spots);
    const results = searchResults.spots;


    return (
    <>
    {console.log('SERACH RESULTS RETURN RENDERED I GUESS')}
    <h2>search resultssssss</h2>
    <div id="searchResults">
        {results ?
        results.map(result => <Spot key={result.id} spot={result} />) :
        <p>sorry, no results</p> }
    </div>

    </>
    );
}

export default SearchResults;
