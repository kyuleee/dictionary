import DicItem from "./dicItem";
import { DicStateContext } from '../App';
import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";

const sortList = [
    {value : 'All', name: '전체'},
    {value : 'html', name: 'html'},
    {value : 'css', name: 'css'},
    {value : 'js', name: 'javaScript'},
    {value : 'node', name: 'node'},
    {value : 'react', name: 'react'},
]
const SortSelect = ({value, onChange, sortList})=>{
    return(
        <select value={value} onChange={(e)=>onChange(e.target.value)}>
            {
                sortList.map((sort)=>(
                    <option value={sort.value}>{sort.name}</option>
                ))
            }
        </select>
    )
}

const DicList = () => {
    const datas=useContext(DicStateContext);
    const [sort, setSort] = useState('All');
    const [count, setCount] =useState(5);
    const btn = useRef();
    const getSortList = ()=>{
        const sortCallBack = (item)=>{
            if(sort === 'html'){
                return item.category === 'html'
            }else if(sort === 'css'){
                return item.category === 'css'
            }else if(sort === 'js'){
                return item.category === 'js'
            }else if(sort === 'node'){
                return item.category === 'node'
            }else{
                return item.category === 'react'
            }
        }
        const copyList = JSON.parse(JSON.stringify(datas));
        const sortList = sort === 'All' ? copyList : copyList.filter((item)=>sortCallBack(item));
        return sortList;
    }

    const moreBtn = ()=>{
        if(count < datas.length){
            setCount(count+5)
        }else{
            btn.current.style.display='none';
        }
    }

    return ( 
        <div className="dicList">
            {/* <h2>FRONTEND LIST</h2> */}
            <p><Link to='/write'>write</Link></p>

            <SortSelect value={sort} onChange={setSort} sortList={sortList} />
            <div>
                <ul>
                    <li>
                        <p>WORD</p>
                        <p>category</p>
                        <p>DATE</p>
                    </li>
                    {getSortList().map((data)=>
                        <DicItem key={data.id} {...data}/>
                    )}
                </ul>
                
                {/* <ul>
                    {getSortList().map((data)=>
                    <li >
                        <Link to={<DicItem key={data.id} {...data}/>}>{data.word} ({data.category})</Link>
                    </li>
                    )}
                </ul> */}
                {/* <ul>
                    {getSortList().map((data)=>
                        <li key={data.id}>
                            <Link to={<DicDetail/>}>{data.word} ({data.category})</Link>
                            <DicDetail key={data.id} {...data}/>
                        </li>
                    )}
                </ul> */}
            </div>
            <div><button ref={btn} onClick={moreBtn}>더보기&#9660;</button></div>
        </div>
    );
}
 
export default DicList;