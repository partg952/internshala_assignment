import React from 'react'
import './Home.css';
import VideocamIcon from '@material-ui/icons/Videocam';
import CreateIcon from '@material-ui/icons/Create';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import CancelIcon from '@material-ui/icons/Cancel';
import firebase  from 'firebase';
import firebaseConfig from '../firebase';
import axios from 'axios';
export default function Home() {
    const [preview,setPreview] = React.useState()
    const [dataGif,setDataGif] = React.useState([])
    const [posts,setPosts] = React.useState([])
    const message_ref = React.useRef()
    const [num,setNum] = React.useState(0)
    function fetchGifs(){
        axios('https://api.giphy.com/v1/gifs/trending?api_key=PwUwrZ8QN986Gre2qroRxupQBIwLm58B')
        .then((res)=>{
            
            setDataGif(res.data.data)
            
        })
    }
    function getPosts(){
        axios('https://intern-api23.herokuapp.com/')
        .then((res)=>{
            
            setPosts(res.data.reverse())
        })
    }
    React.useEffect(()=>{
            getPosts();
            fetchGifs();
    },[num])
    const div_ref = React.useRef();
    const close_button = React.useRef();
    return (
        <div>
          <nav>
              <div>
              <span>
                <VideocamIcon/>
                <p>Live Video</p>
              </span>
              <span onClick={()=>{
                  div_ref.current.style.display = 'block';
                  close_button.current.style.visibility = 'visible'
              }}>
                <CreateIcon/>
                <p>Compose</p>
              </span>
              <span>
            <PhotoAlbumIcon/>
            <p>Photo Album</p>
              </span>
              <button id='close-button'  ref={close_button}  onClick={()=>{
                  div_ref.current.style.display = 'none';
                  close_button.current.style.visibility = 'hidden';
              }}>
                  <CancelIcon/>
              </button>
              </div>
          </nav>
          <main>
              <div id='post' ref={div_ref}>
                <span>
                    {
                    firebase.auth().currentUser!=null?
                    <>
                    <img src={firebase.auth().currentUser.photoURL} className='user-image' alt="" />
                    <strong>{firebase.auth().currentUser.displayName}</strong>
                    </>
                    :
                    <>
                    <img src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" className='user-image' alt="" />
                    <strong>Unknown User</strong>
                    </>
                }
                </span>
                <input type="text" name="" placeholder={`Whats On Your Mind?`} id='post-text' ref={message_ref} />
                <input type="text" placeholder='Search a Gif(Press Enter To Search)' id='gif-search' onKeyPress={(e)=>{
                    if(e.key === 'Enter'){
                        if(e.target.value.length!=0){
                            axios('https://api.giphy.com/v1/gifs/search?api_key=PwUwrZ8QN986Gre2qroRxupQBIwLm58B&q='+e.target.value)
                            .then((res)=>{
                                setDataGif(res.data.data)
                            })
                        }
                        else{
                            fetchGifs();
                        }
                    }
                   
                }}/>
                <div id="gifs">
                    {
                        dataGif.lenght!=0?
                        dataGif.map((items)=>{
                            return(
                                <>
                                <img src={items.images.preview_gif.url} alt="" onClick={(e)=>{
                                    setPreview(e.target.src)
                                }}/>
                                </>
                            )
                        })
                        :
                        <p>Loading...</p>
                    }
                    
                </div>
                <img src={preview} alt="" id="gif-preview" />
                <button id="post-button" onClick={()=>{
                    axios.post('https://intern-api23.herokuapp.com/save-data',{
                        message:message_ref.current.value,
                        gif:preview,
                        user_name:firebase.auth().currentUser!=null?firebase.auth().currentUser.displayName:'Unkown User',
                        user_image:firebase.auth().currentUser!=null?firebase.auth().currentUser.photoURL:'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'
                    }).then((posted)=>{
                        var rand = Math.random()*100
                        alert('posted!')
                        setNum(rand)
                    })
                }}>POST</button>
              </div>
              {
                  posts.map((items)=>{
                      return(
                    <div id='messages'>
                        <span>
                            <img src={items.user_image} className='user-image' alt="" />
                            <strong>{items.user_name}</strong>
                        </span>
                        <h4>{items.message}</h4>
                        <img src={items.gif_url} alt="" id='messages-img'/>
                    </div>
                      )
                  })
              }
          </main>
        </div>
    )
}
