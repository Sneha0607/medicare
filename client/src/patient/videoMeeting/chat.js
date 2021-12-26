import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import {
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

const Chat = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    //PUSHING MESSAGE IN DATABASE
    db.collection("meetings")
      .doc(`${props.meetingID}`)
      .collection("chats")
      .add({
        message: message,
        senderEmail: currentUser.email,
        senderUid: currentUser.uid,
        sentAt: new Date(),
      });

    setMessage("");
  };

  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //FETCHING ALL MESSAGES FROM DATABASE
  useEffect(() => {
    db.collection(`meetings/${props.meetingID}/chats`)
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => doc.data()));
      });
  }, [`${props.meetingID}`]);

  return (
    <div>
      {/* CHAT BUTTON */}

      <Tooltip title="Chat" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <ChatIcon />
        </IconButton>
      </Tooltip>

      {/* CHAT DIALOG BOX */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">CHAT</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {chats.map((chat) => {
                return (
                  <>
                    <ListItem style={{ margin: "0" }}>
                      <Typography>
                        {chat.senderEmail}
                        <p>
                          <b>{chat.message}</b>
                        </p>
                      </Typography>
                    </ListItem>
                  </>
                );
              })}
            </List>
          </DialogContentText>

          {/* FORM TO SEND MESSAGE */}

          <form onSubmit={sendMessage}>
            <TextField
              id="filled-basic"
              color="primary"
              placeholder="Enter message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button type="submit" startIcon={<SendIcon />} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Chat;
