import React, { useContext} from "react";
import { DicContext } from './../App';
import useInput from './../hook/useInput';
import { useNavigate } from "react-router-dom";

const DicWrite = () => {
    const [{word, content, category}, onChange, reset] = useInput({
        word: '',
        content:'',
        category:''
    })
    const {onCreate} = useContext(DicContext);
    const navigate = useNavigate();
    const onCreateBTN = ()=>{
        onCreate(word,content,category);
        reset();
        navigate('/');
    }
    return ( 
        
        <div className="dicWrite">
            <div>
                <p>단어</p>
                <input type="text" placeholder="단어" name='word' value={word} onChange={onChange} />
            </div>
            <div>
                <p>설명</p>
                <textarea placeholder="설명" name='content' value={content} onChange={onChange} />
            </div>
            <div>
                <p>종류</p>
                <select name='category' value={category} onChange={onChange}>
                    <option value='none' hidden>html</option>
                    <option value='html'>html</option>
                    <option value='css'>css</option>
                    <option value='js'>javascript</option>
                    <option value='node'>node</option>
                    <option value='react'>react</option>
                </select>
            </div>
            <div><button className='createBtn' onClick={onCreateBTN}>저장</button></div>
        </div>
     );
}
 
export default React.memo(DicWrite);