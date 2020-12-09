import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from "./AppContainer";
import api from "../api";

const Edit = () =>{
    const {id} = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onEditSubmit = async() => {
        setLoading(true);
        try{
            await api.updatePost({
                title, description,
            }, id)
            history.push('/');
        }catch{
            alert('failed');
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        api.getOnePost(id).then(response => {

            const result = response.data;
            setTitle(result.data.title);
            setDescription(result.data.description);
        });
    }, []);

    return (
        <AppContainer
            title="Edit Post"
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
                    onClick={onEditSubmit}
                    disabled = {loading}
                    >
                        {loading ? 'Loading' : 'Submit'}
                    </button>
                </div>
                
            </form>
            
        </AppContainer>
    );
    
}

export default Edit;