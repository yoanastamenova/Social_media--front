import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteForeverOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  onDelete,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Post deleted successfully");
        if (onDelete) {
          onDelete(postId); // Notify parent component to update the UI
        }
      } else {
        const errorData = await response.json();
        alert("Failed to delete the post: " + errorData.message);
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
      alert("Network error while deleting post");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: editedDescription }),
      });
      const updatedPost = await response.json();
      if (response.ok) {
        dispatch(setPost({ post: updatedPost }));
        setEditMode(false);
      } else {
        const errorData = await response.json();
        alert("Failed to update the post: " + errorData.message);
      }
    } catch (error) {
      console.error("Error while updating post:", error);
      alert("Network error while updating post");
    }
  };

  const handleCancel = () => {
    setEditedDescription(description);
    setEditMode(false);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Box sx={{ mt: "1rem" }}>
        {editMode ? (
            <TextField
                fullWidth
                multiline
                variant="outlined"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
            />
        ) : (
            <Typography color={main}>
                {description}
            </Typography>
        )}
      </Box>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>

          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography>{comments.length}</Typography>
        </FlexBetween>

        {loggedInUserId === postUserId && (
          <FlexBetween gap="1rem">
            {editMode ? (
                <>
                    <IconButton onClick={handleSave}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                        <CancelIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    <IconButton onClick={handleEdit}>
                        <EditOutlined />
                    </IconButton>
                    <IconButton onClick={() => handleDeletePost(postId)}>
                        <DeleteForeverOutlined />
                    </IconButton>
                </>
            )}
          </FlexBetween>
        )}
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, index) => (
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;