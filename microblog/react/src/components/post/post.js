import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';

import './post.scss';
import iconPng from './dima.png';
import { useHttp } from '../hooks/http.hook';
import { useAppState } from '../utils/context';

const Post = () => {
    const [postsData, setPostsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const {request} = useHttp();
    const likeRefs = useRef([]);
    const dislikeRefs = useRef([]);

    const {setNumberOfPosts} = useAppState()

    const getPostsFromServer = async () => {
        try {
            const data = await request('http://localhost:5000/posts');
            setPostsData(data.posts);
            setNumberOfPosts(data.posts.length);
            setLoading(false);
        } catch (error) {
            console.error('Error: ', error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getPostsFromServer()
    }, []);

    const deletePost = async (postId) => {
        try {
            await request(`http://localhost:5000/deletepost/${postId}`, "DELETE");
            getPostsFromServer()
        } catch (error) {
            console.error('Error deleting post: ', error);
        }
    }

    const likesCounter = (index) => {
        const updatedPostsData = [...postsData];
        updatedPostsData[index].likes = parseInt(updatedPostsData[index].likes) + 1;
        if(updatedPostsData[index].likes === 5) {
            likeRefs.current[index].disabled = true;
        }
        setPostsData(updatedPostsData);
    }

    const dislikesCounter = (index) => {
        const updatedPostsData = [...postsData];
        updatedPostsData[index].dislikes = parseInt(updatedPostsData[index].dislikes) - 1;
        if(updatedPostsData[index].dislikes === -10) {
            dislikeRefs.current[index].disabled = true;
        }
        setPostsData(updatedPostsData);
    }
    
    return (
        <div>
            {!loading && postsData ? postsData.map((item, i) => {
                return (
                <section className="card" key={i}>
                    <h2 className="card-title">{item.title}</h2>
                    <hr />
                    <h4 className="card-descr">{item.descr}</h4>
                    <div className="author">
                        <div className="author-wrapper">
                            <img className="author-icon" src={iconPng} alt="user"/>
                            <span className="author-name">{item.name}</span>
                        </div>
                        <div className="react">
                            <span className='react-likes'>{item.likes}</span>
                            <button 
                                onClick={() => likesCounter(i)}
                                ref={(element) => likeRefs.current[i] = element}>
                                <svg className='like-icon' fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2,22H18.644a3.036,3.036,0,0,0,3-2.459l1.305-7a2.962,2.962,0,0,0-.637-2.439A3.064,3.064,0,0,0,19.949,9H15.178V5c0-2.061-2.113-3-4.076-3a1,1,0,0,0-1,1c0,1.907-.34,3.91-.724,4.284L6.593,10H2a1,1,0,0,0-1,1V21A1,1,0,0,0,2,22ZM8,11.421l2.774-2.7c.93-.907,1.212-3.112,1.3-4.584.542.129,1.109.38,1.109.868v5a1,1,0,0,0,1,1h5.771a1.067,1.067,0,0,1,.824.38.958.958,0,0,1,.21.8l-1.3,7A1.036,1.036,0,0,1,18.644,20H8ZM3,12H6v8H3Z"/></svg>
                            </button>
                            <span className='react-likes'>{item.dislikes}</span>
                            <button 
                                onClick={() => dislikesCounter(i)}
                                ref={(element) => dislikeRefs.current[i] = element}>
                                <svg className="dislike-icon" fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M2,22H18.644a3.036,3.036,0,0,0,3-2.459l1.305-7a2.962,2.962,0,0,0-.637-2.439A3.064,3.064,0,0,0,19.949,9H15.178V5c0-2.061-2.113-3-4.076-3a1,1,0,0,0-1,1c0,1.907-.34,3.91-.724,4.284L6.593,10H2a1,1,0,0,0-1,1V21A1,1,0,0,0,2,22ZM8,11.421l2.774-2.7c.93-.907,1.212-3.112,1.3-4.584.542.129,1.109.38,1.109.868v5a1,1,0,0,0,1,1h5.771a1.067,1.067,0,0,1,.824.38.958.958,0,0,1,.21.8l-1.3,7A1.036,1.036,0,0,1,18.644,20H8ZM3,12H6v8H3Z"/></g></svg>
                            </button>
                        </div>
                    </div>
                    <div className="delete" onClick={() => deletePost(i)}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="#fff" fillRule="evenodd" clipRule="evenodd"><path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>
                    </div>
                </section>
                )}): <Spinner/>}
        </div>
    )
}

export default Post;