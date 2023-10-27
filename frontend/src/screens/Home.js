// import React,{useEffect,useState } from 'react'
// import "./Home.css";
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// export default function Home() {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [comment, setComment] = useState("");
//   const [show, setShow] = useState(false);
//   const [item, setItem] = useState([]);

// // Toast function
//   const notifyA = (msg)=> toast.error(msg)
//   const notifyB = (msg)=> toast.success(msg)

//   useEffect(() => {
//   const token = localStorage.getItem("jwt");
//   if(!token){
//     navigate("./signup")
//   }
// // Fetching All posts
// fetch("http://localhost:5000/allposts",{
//   headers:{
//     Authorization: "Bearer "+ localStorage.getItem("jwt"),
//   },
// })
// .then(res=>res.json())
// .then(result => {
//   console.log(result);
//   setData(result)})
// .catch(err=> console.log(err))

//   }, []);

//   // to show and hide comments 
//   const toggleComment=(posts)=>{
//     if(show){
//       setShow(false);
//     } else{
//       setShow(true);
//       setItem(posts);
//       console.log(item)
//     }
//   }


//   const likePost =(id)=>{
//     fetch("http://localhost:5000/like",{
//       method:"put",
//       headers:{
//         "Content-Type":"application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         postId: id,
//       })
//     }).then(res=>res.json())
//     .then((result)=>{
//       const newData = data.map((posts)=>{
//         if(posts._id == result._id){
//           return result
//         }else{
//           return posts
//         }
//       })
//       setData(newData)
//       console.log(result)
//     })
//   }

//   const unlikePost =(id)=>{
//     fetch("http://localhost:5000/unlike",{
//       method:"put",
//       headers:{
//         "Content-Type":"application/json",
//         Authorization: "Bearer "+ localStorage.getItem("jwt")
//       },
//       body:JSON.stringify({
//         postId: id,
//       })
//     }).then(res=>res.json())
//     .then((result)=>{
//       const newData = data.map((posts)=>{
//         if(posts._id == result._id){
//           return result
//         }else{
//           return posts
//         }
//       })
//       setData(newData)
//       console.log(result)
//     });
//   };
  
//   // function to make comment
//   const makeComment =(text,id)=>{
//     fetch("http://localhost:5000/comment",{
//       method:"put",
//       headers:{
//         "Content-Type":"application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         text: text,
//         postId: id,
//       }),
//     })
//     .then(res=>res.json())
//     .then((result)=>{
//       const newData = data.map((posts)=>{
//         if(posts._id == result._id){
//           return result
//         }else{
//           return posts
//         }
//       })
//       setData(newData)
//       setComment("");
//       notifyB("Comment Posted")
//       console.log(result);
//     });
//   };
  
//   return (
//      <div className="home">
//     {/* card */}
//     {data.map((posts)=>{
//       return (
//         <div className="card">
//      {/* card header */}
//      <div className="card-header">
//       <div className="card-pic">
//         <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="" />
//       </div>
//       <h5>
//         <Link to={`/profile/${posts.postedBy._id}`}>
//         {posts.postedBy.name}
//         </Link>
     
//         </h5>
//      </div>
//     {/* card image */}
//     <div className="card-image">
//       <img src={posts.photo} alt="" />
//     </div>

//     {/* card content */}
//     <div className="card-content">
//       {
//         posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?(<span className="material-symbols-outlined 
//         material-symbols-outlined-red" onClick={()=>{unlikePost(posts._id)}}>favorite</span>)
//         :( <span className="material-symbols-outlined" onClick={()=>{likePost(posts._id)}}>favorite</span>)
//       }
   
    
//     <p>{posts.likes.length} Likes</p>
//     <p>{posts.body} </p>
//     <p style={{fontWeight:"bold", cursor:"pointer"}}
//     onClick={()=>{toggleComment(posts)}}>
//       View all comments </p>
//     </div>
//      {/* add comment */}
//     <div className="add-comment">
//     <span className="material-symbols-outlined">mood</span>
//     <input type="text"  placeholder="Add a comment" value={comment} onChange={(e)=>{setComment(e.target.value);
//     }} />
//     <button className="comment" onClick={()=>{makeComment(comment,posts._id);
//     }}>Post</button>
//     </div>
//     </div>
//       );
//     })}

//     {/*show Comments*/}
//     {show && item && (
//       <div className="showComment">
//       <div className="container">
//         <div className="postPic">
//           <img src={item.photo}
//            alt="" />
//         </div>
//         <div className="details">
  
//           {/* card header */}
//        <div 
//         className="card-header" 
//         style={{borderBottom:"1px solid #00000029"}}
//        >
//         <div className="card-pic">
//           <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="" />
//         </div>
//         <h5>{item.postedBy.name}</h5>
//        </div>
  
//        {/*comment section*/}
//        <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>
//          {
//          item.comments.map((comment)=>{
//          return (<p className="comment-section">
//                    <span className="commenter" style={{fontWeight:"bolder"}}>{comment.postedBy.name}{" "}</span>
//                    <span className="commentText"> {comment.comment}</span>
//                 </p>)
//          })}
//        </div>
  
//         {/* card content */}
//       <div className="card-content">
//       <p>{item.likes.length}Likes</p>
//       <p>{item.body}</p>
//       </div>
  
//        {/* add comment */}
//        <div className="add-comment">
//       <span className="material-symbols-outlined">mood</span>
//       <input type="text"  placeholder="Add a comment" value={comment} onChange={(e)=>{setComment(e.target.value);
//       }}
//        />
//       <button
//         className="comment"
//       onClick={()=>{makeComment(comment,item._id);
//         toggleComment();
//       }}
//       >
//         Post
//       </button>
//       </div>
  
//         </div>
//       </div>
//       <div className="close-comment" 
//       onClick={()=>{toggleComment()}}><span className="material-symbols-outlined material-symbols-outlined-comment"
//     >
//   close
//   </span></div>
//     </div>
//     )} 
//   </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Home() {
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  // Toast function
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('./signup');
    }
    // Fetching All posts
    fetch('/allposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  // function to make a comment
  const makeComment = (text, id) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
        setComment('');
        notifySuccess('Comment Posted');
      })
      .catch((err) => {
        notifyError('Failed to post comment');
        console.log(err);
      });
  };

  return (
    <div className="home">
      {/* card */}
      {data.map((post) => (
        <div className="card" key={post._id}>
          {/* card header */}
          <div className="card-header">
            <div className="card-pic">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                alt=""
              />
            </div>
            <h5>
              {post.postedBy ? (
                <Link to={`/profile/${post.postedBy._id}`}>
                  {post.postedBy.name}
                </Link>
              ) : (
                'Unknown User'
              )}
            </h5>
          </div>
          {/* card image */}
          <div className="card-image">
            <img src={post.photo} alt="" />
          </div>
          {/* card content */}
          <div className="card-content">
            {post.likes.includes(
              JSON.parse(localStorage.getItem('user'))._id
            ) ? (
              <span
                className="material-symbols-outlined material-symbols-outlined-red"
                onClick={() => unlikePost(post._id)}
              >
                favorite
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => likePost(post._id)}
              >
                favorite
              </span>
            )}
            <p>{post.likes.length} Likes</p>
            <p>{post.body}</p>
            <p
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => toggleComment(post)}
            >
              View all comments
            </p>
          </div>
          {/* add comment */}
          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="comment"
              onClick={() => {
                makeComment(comment, post._id);
              }}
            >
              Post
            </button>
          </div>
        </div>
      ))}

      {/* show Comments */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: '1px solid #00000029' }}
              >
                <div className="card-pic">
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60"
                    alt=""
                  />
                </div>
                <h5>{item.postedBy ? item.postedBy.name : 'Unknown User'}</h5>
              </div>
              {/* comment section */}
              <div className="comment-section" style={{ borderBottom: '1px solid #00000029' }}>
                {item.comments.map((comment, index) => (
                  <p className="comment-section" key={index}>
                    <span className="commenter" style={{ fontWeight: 'bolder' }}>
                      {comment.postedBy ? comment.postedBy.name : 'Unknown User'}{' '}
                    </span>
                    <span className="commentText"> {comment.comment}</span>
                  </p>
                ))}
              </div>
              {/* card content */}
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>
              {/* add comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className="close-comment" onClick={() => toggleComment()}>
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
