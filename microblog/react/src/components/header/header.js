import {NavLink} from 'react-router-dom';
import { useAppState } from '../utils/context';

import './header.scss';

const Header = () => {
    const {numberOfPosts} = useAppState()

    return (
        <header>
            <div className="header-wrapper">
                <NavLink 
                    style={({isActive}) => ({'color': isActive ? '#9f0013' : 'inherit'})} 
                    to="/"><h1 className="header-title">MicroBlog</h1></NavLink>
                <div>NUMBER OF POSTS: {numberOfPosts}</div>
                <NavLink 
                    style={({isActive}) => ({'color': isActive ? '#9f0013' : 'inherit'})} 
                    to="/new_post"><span>New post</span></NavLink>
            </div>
            <hr/>
        </header>
    )
}
 export default Header;