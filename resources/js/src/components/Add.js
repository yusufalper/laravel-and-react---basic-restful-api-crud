import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AppContainer from "./AppContainer";
import api from "../api";

const Add = () =>{
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onAddSubmit = async() => {
        setLoading(true);
        try{
            await api.addPost({
                title, description,
            })
            history.push('/');
        }catch{
            alert('failed');
        }finally{
            setLoading(false);
        }
    };
    return (
        <AppContainer
            title="Add Post"
        >
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        className="form-control col-md-4" 
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        className="form-control col-md-4" 
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"
                    onClick={onAddSubmit}
                    disabled = {loading}
                    >
                        {loading ? 'Loading' : 'Submit'}
                    </button>
                </div>
                
            </form>
            
        </AppContainer>
    );
    
}

export default Add;