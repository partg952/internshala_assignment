import React from 'react';
import firebase from 'firebase'; 
import firebaseConfig from '../firebase';
import {useHistory} from 'react-router-dom'
import './Login.css';
const Login = () => {
    var history = useHistory();
    const GoogleAuth = new firebase.auth.GoogleAuthProvider();
    return (
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="" />
            <h1>Facebook</h1>
            <button id='sign-in-button' onClick={()=>{
                firebase.auth().signInWithPopup(GoogleAuth)
                .then((user)=>{
                    history.push('/home')
                    console.log(user.user)
                }).catch((err)=>{
                    alert(err)
                })
            }}>Sign In</button>
        </div>
    );
}

export default Login;
