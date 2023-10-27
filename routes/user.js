const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");

// router.get("/user/:id",(req,res)=>{
//     USER.findOne({_id: req.params.id})
//     .select("-password")
//     .then(user =>{
//         POST.find({postedBy:req.params.id})
//         .populate("postedBy","_id")
//         .exec((err,post)=>{
//             if(err){
//                 return res.status(422).json({error:err})
//             }
//             res.status(200).json({user,post})
//         })
//     }).catch(err =>{
//         return res.status(404).json({error:"User not found"})
//     })
// })

// to get user profile
router.get("/user/:id", async (req, res) => {
    try {
      const user = await USER.findOne({ _id: req.params.id }).select("-password");
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const posts = await POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id")
        .exec();
  
      res.status(200).json({ user, post: posts });
    } catch (error) {
      return res.status(422).json({ error: error.message });
    }
  });
  
// // to follow user

// To follow a user
router.put("/follow", requireLogin, async (req, res) => {
    try {
      // Add the current user to the user they want to follow's followers list
      const userToFollow = await USER.findByIdAndUpdate(
        req.body.followId,
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      );
  
      // Add the user they want to follow to the current user's following list
      const currentUser = await USER.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      );
  
      res.json(currentUser);
    } catch (error) {
      return res.status(422).json({ error: error.message });
    }
  });

  
  
// router.put("/follow",requireLogin,(req,res)=>{
//     USER.findByIdAndUpdate(req.body.followId,{
//         $push:{followers:req.user._id}
//     },{
//         new:true
//     },(err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//         USER.findByIdAndUpdate(req.user._id,{
//             $push:{following:req.body.followId}  
//         },{
//             new: true
//         }).then(result => res.json(result))
//         .catch(err => {return res.status(422).json({error:err})})
//     }
//     )
// })


// // to unfollow user
// router.put("/unfollow",requireLogin,(req,res)=>{
//     USER.findByIdAndUpdate(req.body.followId,{
//         $pull:{followers:req.user._id}
//     },{
//         new:true
//     },(err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//         USER.findByIdAndUpdate(req.user._id,{
//             $pull:{following:req.body.followId}  
//         },{
//             new: true
//         }).then(result => res.json(result))
//         .catch(err => {return res.status(422).json({error:err})})
//     }
//     )
// })


// To unfollow a user
router.put("/unfollow", requireLogin, async (req, res) => {
    try {
      // Remove the follower from the user's followers list
      const userToUpdate = await USER.findByIdAndUpdate(
        req.body.followId,
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      );
  
      // Remove the user from the current user's following list
      const currentUser = await USER.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.followId },
        },
        { new: true }
      );
  
      res.json(currentUser);
    } catch (error) {
      return res.status(422).json({ error: error.message });
    }
  });
  
//to upload profile pic
// router.put("/uploadProfilePic",requireLogin,(req,res)=>{
//   USER.findByIdAndUpdate(req.user._id,{
//     $set:{Photo:req.body.pic}
//   },{
//     new:true
//   }).exec((err,result)=>{
//     if(err){
//       return res.status(422).json({error:err})
//     }else{
//       res.json(result)
//     }
//   })
// })


router.put("/uploadProfilePic", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { Photo: req.body.pic }
    },
    {
      new: true
    }
  )
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.status(422).json({ error: err });
  });
});


module.exports = router;