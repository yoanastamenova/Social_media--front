import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Twitter
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user);
  const currentUserID = currentUser ? currentUser._id : null;

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
      setEditableUser({
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
        occupation: data.occupation,
      });
    };
    getUser();
  }, [userId, token]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is valid and not expired
        },
        body: JSON.stringify({
          firstName: editableUser.firstName,
          lastName: editableUser.lastName,
          location: editableUser.location,
          occupation: editableUser.occupation,
          email: editableUser.email, // Add other fields as per your user model
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const cancelChanges = () => {
    setEditableUser({
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      occupation: user.occupation,
    });
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            {isEditing ? (
              <Box>
                <input
                  type="text"
                  value={editableUser.firstName}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      firstName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editableUser.lastName}
                  onChange={(e) =>
                    setEditableUser({
                      ...editableUser,
                      lastName: e.target.value,
                    })
                  }
                />
              </Box>
            ) : (
              <Typography
                variant="h4"
                color={palette.neutral.dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate(`/profile/${userId}`)}
              >
                {user.firstName} {user.lastName}
              </Typography>
            )}
            <Typography color={palette.neutral.medium}>
              {user.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        {currentUserID === userId && (
          <ManageAccountsOutlined
            sx={{ cursor: "pointer" }}
            onClick={toggleEditMode}
          />
        )}
      </FlexBetween>
      <Divider />
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="large"
            sx={{ color: palette.neutral.main }}
          />
          {isEditing ? (
            <input
              type="text"
              value={editableUser.location}
              onChange={(e) =>
                setEditableUser({ ...editableUser, location: e.target.value })
              }
            />
          ) : (
            <Typography color={palette.neutral.medium}>
              {user.location}
            </Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{ color: palette.neutral.main }}
          />
          {isEditing ? (
            <input
              type="text"
              value={editableUser.occupation}
              onChange={(e) =>
                setEditableUser({ ...editableUser, occupation: e.target.value })
              }
            />
          ) : (
            <Typography color={palette.neutral.medium}>
              {user.occupation}
            </Typography>
          )}
        </Box>
      </Box>
      {isEditing && (
        <FlexBetween width="100%" justifyContent="flex-end" mb="0.5rem">
          <Button
            variant="contained"
            color="primary"
            onClick={saveChanges}
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={cancelChanges}>
            Cancel
          </Button>
        </FlexBetween>
      )}
      <Divider />
      {/* Social Profiles Section Reintegration */}
      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={palette.neutral.main}
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={palette.neutral.main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={palette.neutral.medium}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          {currentUserID === userId && (
            <EditOutlined sx={{ color: palette.neutral.main }} />
          )}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedInIcon />
            <Box>
              <Typography color={palette.neutral.main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={palette.neutral.medium}>
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          {currentUserID === userId && (
            <EditOutlined sx={{ color: palette.neutral.main }} />
          )}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
