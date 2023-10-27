import React from 'react';
import "../css/PostDetail.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostDetail({item,toggleDetails}) {
    const navigate = useNavigate();

// Toast function
const notifyA = (msg)=> toast.error(msg)
const notifyB = (msg)=> toast.success(msg)


    const removePost = (postId)=>{
        if(window.confirm("Do you really want to delete this post ?")){
            fetch(`/deletePost/${postId}`,{
                method:"delete",
                headers:{
                    Authorization: "Bearer "+ localStorage.getItem("jwt"),
                  },
            })
            .then((res)=>res.json())
            .then((result)=>{
                console.log(result);
                toggleDetails();
                navigate("/");
                notifyB(result.message);
            });
        }
        
    }


  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img src={item.photo}
           alt="" />
        </div>
        <div className="details">
  
          {/* card header */}
       <div 
        className="card-header" 
        style={{borderBottom:"1px solid #00000029"}}
       >
        <div className="card-pic">
          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="" />
        </div>
        <h5>{item.postedBy.name}</h5>
        <div className="deletePost" onClick={()=>{removePost(item._id)}} >
        <span className="material-symbols-outlined">
delete
</span>
        </div>
       </div>
  
       {/*comment section*/}
       <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>
         {
         item.comments.map((comment)=>{
         return (<p className="comment-section">
                   <span className="commenter" style={{fontWeight:"bolder"}}>{comment.postedBy.name}{" "}</span>
                   <span className="commentText"> {comment.comment}</span>
                </p>)
         })}
       </div>
  
        {/* card content */}
      <div className="card-content">
      <p>{item.likes.length}Likes</p>
      <p>{item.body}</p>
      </div>
  
       {/* add comment */}
       <div className="add-comment">
      <span className="material-symbols-outlined">mood</span>
      <input type="text"  placeholder="Add a comment" 
      //value={comment} onChange={(e)=>{setComment(e.target.value);
     // }}
       />
      <button
        className="comment"
    //   onClick={()=>{makeComment(comment,item._id);
    //     toggleComment();
    //   }}
      >
        Post
      </button>
      </div>
  
        </div>
      </div>
      <div className="close-comment" 
     onClick={()=>{
        toggleDetails();
    }}
     >
        <span className="material-symbols-outlined material-symbols-outlined-comment"
    >
  close
  </span></div>
    </div>
  )
}
