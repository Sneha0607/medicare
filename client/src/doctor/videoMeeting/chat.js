import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { jsPDF } from "jspdf";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  //FETCHING MEETING CODE FROM URL
  const location = useLocation();
  const meetingCode = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const sendMessage = (e) => {
    e.preventDefault();

    //PUSHING MESSAGE IN DATABASE
    db.collection("meetings").doc(meetingCode).collection("chats").add({
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
    db.collection(`meetings/${meetingCode}/chats`)
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => doc.data()));
      });
  }, [meetingCode]);

  //FUNCTION TO EXPORT CHAT AS PDF
  // const exportChat = () => {
  //   var doc = new jsPDF("p", "pt");
  //   var i = 20;
  //   var j = 30;
  //   doc.setFontSize("15");
  //   doc.text(i, 20, "Meeting Chats");
  //   doc.setFontSize("10");

  //   chats.map((chat) => {
  //     doc.text(
  //       i,
  //       j,
  //       chat.senderEmail.substring(0, chat.senderEmail.indexOf("@"))
  //     );
  //     doc.text(i + 110, j, "-");
  //     doc.text(i + 115, j, chat.message);
  //     j = j + 20;
  //   });
  //   doc.save("meeting_chat.pdf");
  // };

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
          {/* EXPORT CHAT BUTTON */}

          {/* <Button
            onClick={exportChat}
            style={{
              backgroundColor: "#464775",
              textTransform: "none",
              color: "#ffffff",
              margin: "2%",
            }}
            startIcon={<ArrowDownwardIcon />}
          >
            Export Chat
          </Button> */}
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Chat;
