import {useState, useRef, useContext} from 'react';
import { DicContext } from '../App';

const DicDetail = ({id,word,content,category,createDate}) => {
    const {onRemove, onEdit} = useContext(DicContext);
    const [isEdit, setIsEdit] = useState(false);
    const textEdit = useRef();
    const [editExplain, setEditExplain] = useState(content);
    const editFunc = ()=>{
        setIsEdit(!isEdit);
    }
    const changeFunc = (e)=>{
        setEditExplain(e.target.value);
    }
    const removeFunc = ()=>{
        if(window.confirm(`${word}를 삭제 하시겠습니까?`)){
            onRemove(id);
        }
    }
    const cancelFunc = ()=>{
        if(window.confirm('취소 하시겠습니까?')){
            editFunc();
            setEditExplain(content);
        }
    }
    const saveFunc = ()=>{
        if(editExplain.length < 5){
            textEdit.current.focus();
            return ;
        }
        if(window.confirm(`${word}를 수정하시겠습니까?`)){
            onEdit(id, editExplain);
            editFunc();
        }
    }
    return (
         
        <div className="dicDetail">
            <h2>detail</h2>
            <div>
                <dl>
                    <dt>{word} <span> ( {category} )</span></dt>
                    <dd> {isEdit ? <textarea ref={textEdit} value={editExplain} onChange={changeFunc}></textarea> : (` : ${content}`)}
                    <span>{createDate}</span></dd>
                </dl>
                {isEdit ? 
                    <div>
                        <button onClick={saveFunc}>저장</button>
                        <button onClick={cancelFunc}>취소</button>
                    </div> :
                    <div>
                        <button onClick={editFunc}>수정</button>
                        <button onClick={removeFunc}>삭제</button>
                    </div>
                }
            </div>
        </div>
     );
}
 
export default DicDetail;