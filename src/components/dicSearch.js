import {useState, useContext} from 'react';
import { DicContext } from './../App';

const DicSearch = () => {
    const [searchInput, setSearchInput] = useState();
    const {onSearch} = useContext(DicContext);
    const inputTxt = (e) =>{
        setSearchInput(e.target.value);
    }
    const searchFunc = ()=>{
        onSearch(searchInput);
    }
    return ( 
        <div className="dicSearch">
            <div>
                <input type="text" name='word' value={searchInput} onChange={inputTxt} placeholder="검색어 입력"></input>
                <button className='searchBtn' onClick={searchFunc}></button>
            </div>
        </div>
     );
}
 
export default DicSearch;