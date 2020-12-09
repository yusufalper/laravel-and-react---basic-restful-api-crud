import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AppContainer from "./AppContainer";
import api from "../api"

const Home = () => {

    const [posts, setPosts] = useState(null);

    const fetchPosts = () =>{
        api.getAllPosts().then(response => {

            const result = response.data;
            setPosts(result.data);

        });
    }

    useEffect(()=>{
        fetchPosts();
    }, []);


    const renderPosts = () =>{

        if(!posts){
            return (
                <tr>
                    <td colSpan="4">
                        loading posts...
                    </td>
                </tr>
            );

        }

        if(posts === null){
            return (
                <tr>
                    <td colSpan="4">
                        there is no post yet..
                    </td>
                </tr>
            );

        }

        if(posts){
            return (posts.map((post)=>{
                return(
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                        <Link
                            className="btn btn-info"
                            to={`/edit/${post.id}`}>
                            Edit
                        </Link>
                        <button 
                            className="btn btn-danger ml-1"
                            onClick={() =>{
                                api.deletePost(post.id).then(fetchPosts).catch(err => {
                                    alert("failed");
                                });
                            }}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                );
            }));
        }
    }

    return(
        <AppContainer
        title="Laravel React Post"
        >
            <Link to="/add" className="btn btn-primary">Add Post</Link>
            <div className="table-responsive">
                <table className=" table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPosts()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
}

export default Home;