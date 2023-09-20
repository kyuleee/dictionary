import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <div className="header">
            <Link to='/'><h1>LOGO</h1></Link>
            <nav>
                <ul>
                    {/* <li><Link to='/write'>write</Link></li> */}
                </ul>
            </nav>
        </div>
     );
}
 
export default Header;