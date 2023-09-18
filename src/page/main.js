import DicList from "../components/dicList";
import DicSearch from "../components/dicSearch";

const Main = () => {
    return ( 
        <div className="main">
            {/* <h1>Main</h1> */}
            <DicSearch />
            <DicList />
        </div>
    );
}

export default Main;