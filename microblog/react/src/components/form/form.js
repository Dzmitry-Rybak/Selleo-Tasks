import { useState } from 'react';

import Modal from '../modal/modal';
import { useHttp } from '../hooks/http.hook';

import './form.scss';

const FormPage = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [showModal, setShowModal] = useState(false);
    const {request} = useHttp();

    const newPostSubmiting = async (e) => {
        e.preventDefault();

        const data = {
            name: name,
            title: title,
            descr: descr,
            likes: "0",
            dislikes: "0"
        }
        
        return await request('http://localhost:5000/newpost', "POST", JSON.stringify(data), {'Content-Type': 'application/json'})
            .then(() => {
                setShowModal(true)
                setTimeout(() => {
                    setName('');
                    setTitle('');
                    setDescr('');
                    setShowModal(false);
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (
        <>
            <form className="form" onSubmit={newPostSubmiting}>
                <p className="form-title">Create new post</p>
                <input 
                    required 
                    onChange={e => setName(e.target.value)}
                    value={name}
                    type="text" 
                    name="name" 
                    placeholder="Enter your name"/>
                <input 
                    required 
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type="text" 
                    name="title" 
                    placeholder="Enter title"/>
                <textarea 
                    required 
                    onChange={e => setDescr(e.target.value)}
                    value={descr}
                    name="text" 
                    placeholder="Enter text"></textarea>
                <button type="submit" className="submit">Post</button>
            </form>
            
            <Modal show={showModal}>
                <h2>Thank you!</h2>
                <br />
                <p>New post was added</p>
            </Modal>
        </>
    )
}

export default FormPage;