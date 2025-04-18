import { Stack, Box, Snackbar, Button, TextField} from "@mui/material";
import { useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";

export default function ChatInput({generateResponse, setScroll, chat, clearChat}){

    const [input, setInput] = useState('');
    const inputRef = useRef(null)
    const [showSnackbar, setShowSnackbar] = useState(false);


    const handleClick = (e) => {
       e.preventDefault();
       generateResponse(input);
       setInput('');
       setScroll((prev) => !prev)
    }

    const handleSave = () => {
        const chatHistory = JSON.parse(localStorage.getItem('chat')) || [];

        const date = new Date();

        localStorage.setItem('chat', JSON.stringify([{chat: chat, datetime: date}, ...chatHistory]));

        clearChat();

        setShowSnackbar(true);
     }

    useEffect(() => {
        inputRef.current.focus();
    }, []);
 
   return(
    <Box>
    <Box component={"form"} onSubmit={handleClick}> 
        <Stack direction={"row"} spacing={{xs:0.5, md:2}} padding={2}>
            <TextField
            //  fullWidth
              placeholder="Message Bot AI..."
              sx={{
                width: "100%",
                bgcolor: "primary.light",
                borderRadius: 1,
                "& input":{
                    fontSize: { xs: 12, md: 16 },
                    paddingLeft: { xs: 1, md: 2 },
                    paddingRight: { xs: 1, md: 2 },
                },
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              inputRef={inputRef}
            />
             <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            Ask
          </Button>
            <Button
            variant="outlined"
            onClick={handleSave}
            disabled={!chat.length > 0}
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            Save
          </Button>
        </Stack>
    </Box>  
      <Snackbar
        open={showSnackbar}
        message={"Chat saved."}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={5000}
        action={
          <Link to="/history">
            <Button size="small">See past conversations</Button>
          </Link>
        }
      />
    </Box>
   )
}