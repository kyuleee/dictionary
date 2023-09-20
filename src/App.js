import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Header from './components/header';
import Main from './page/main';
import Write from './page/write';
import { useReducer, createContext, useCallback,useRef,useMemo } from 'react';

export const DicStateContext = createContext(null);
export const DicContext = createContext(null);
// export const DicWriteContext = createContext(null);

const initState = {
  inputs :{
    word : '',
    content :'',
    category:'html'
  },
  dics:[
    {
      id:1,
      word:'tag',
      content:'html에 사용하는 약속된 용어들로 요소를 만들 때 사용',
      category:'html',
      createDate:'2023-09-14'
    },
    {
      id:2,
      word:'background_color',
      content:'요소의 배경색을 설정합니다.',
      category:'css',
      createDate:'2023-09-14'
    },
    {
      id:3,
      word:'getTime',
      content:'인스턴스 메서드는 UTC 1970년 1월 1일 초 자정으로 정의되는 epochDate 이후 해당 날짜의 밀리초 수를 반환합니다.',
      category:'javaScript',
      createDate:'2023-09-14'
    },
    {
      id:4,
      word:'?',
      content:'JSX(JavaScript와 XML)라는 HTML-in-JavaScript 문법을 사용합니다. HTML와 JavaScript에 익숙하다면 JSX를 배우는 것에 도움이 됩니다. 또한 애플리케이션에서 발생하는 버그가 JavaScript와 관련이 있는지 아니면 React의 구체적인 도메인과 관련이 있는지 수월하게 식별하는 것에 도움이 됩니다.',
      category:'node',
      createDate:'2023-09-14'
    },
    {
      id:5,
      word:'React',
      content:'JSX(JavaScript와 XML)라는 HTML-in-JavaScript 문법을 사용합니다. HTML와 JavaScript에 익숙하다면 JSX를 배우는 것에 도움이 됩니다. 또한 애플리케이션에서 발생하는 버그가 JavaScript와 관련이 있는지 아니면 React의 구체적인 도메인과 관련이 있는지 수월하게 식별하는 것에 도움이 됩니다.',
      category:'react',
      createDate:'2023-09-14'
    },
    {
      id:6,
      word:'a',
      content:'Defines a hyperlink',
      category:'html',
      createDate:'2023-09-15'
    },
    {
      id:7,
      word:'box-sizing',
      content:'The CSS box-sizing property allows us to include the padding and border in an elements total width and height.',
      category:'css',
      createDate:'2023-09-15'
    },
    {
      id:8,
      word:'const',
      content:'Always declare a variable with const when you know that the value should not be changed.',
      category:'javaScript',
      createDate:'2023-09-15'
    },
    {
      id:9,
      word:'const',
      content:'Always declare a variable with const when you know that the value should not be changed.',
      category:'node',
      createDate:'2023-09-15'
    },
    {
      id:10,
      word:'const',
      content:'Always declare a variable with const when you know that the value should not be changed.',
      category:'react',
      createDate:'2023-09-15'
    },

  ]
}
const reducer = (state, action) => {
  switch(action.type){
    case 'change' :
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.name] : action.value
        }
      }
    case 'create' :
      return {
        inputs : initState.inputs,
        dics: state.dics.concat(action.dic)
      }
    case 'edit' :
      return {
        ...state,
        dics : state.dics.map((item) => item.id === action.id ? {...item, content:action.content} : item)
      }
    case 'remove' :
      return {
        ...state,
        dics: state.dics.filter((item)=>item.id !== action.id)
      }
    case 'search' :
      return{
        ...state,
        dics: state.dics.filter((item)=>{
          return(
            item.word.toLowerCase().includes(action.text.toLowerCase()) ||
            item.content.toLowerCase().includes(action.text.toLowerCase())
          )
        })
      }
    default :
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const {dics} = state;

  const {word,content,category} =state.inputs;
  const userId = useRef(5);
  const onCreate =useCallback((word,content,category)=>{
      const createDate = new Date().toISOString().slice(0,10); //new Date().toLocaleDateString()
      dispatch({
        type: 'create',
        dic : {
          word,content,category,createDate,
          id : userId.current
        }
      })
      userId.current += 1;
  },[word,content,category])
  
  const onEdit = (id,content)=>{
    dispatch({
      type: 'edit',
      id, content
    })
  }
  const onRemove = (id)=>{
    dispatch({
      type: 'remove',
      id
    })
  }
  const onSearch = (text) => {
    dispatch({
      type: 'search',
      text
    })
  }
  const memoizedDic = useMemo(()=>{
    return{
      onCreate, onEdit, onRemove, onSearch
    }
  },[])
  return (
    <div className="App">
      {/* <h1>프론트엔드 사전</h1> */}
      <Header />
      <DicStateContext.Provider value={dics} > 
      {/* list */}
        {/* <DicWriteContext.Provider value={dispatch}> */}
        <DicContext.Provider value={memoizedDic}>
          {/* onCreate, onEdit, onRemove */}
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/write' element={<Write />}></Route>
          </Routes>
        </DicContext.Provider>
        {/* </DicWriteContext.Provider> */}
      </DicStateContext.Provider>
    </div>
  );
}

export default App; 
