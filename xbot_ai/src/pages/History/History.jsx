import { Typography, Box, Stack, Divider, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import ChatFilter from '../../components/ChatFilter/ChatFilter';
import ChatHistoryCard from '../../components/ChatHistoryCard/ChatHistoryCard';

export default function History(){
    
    const [chats, setChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
      const localChats = localStorage.getItem('chat') || [];
      if(localChats.length > 0){
        setChats(JSON.parse(localChats));
        setFilteredChats(JSON.parse(localChats));
      }
    }, [])

    return (
        <Box
        height={'100vh'}
        overflow={'hidden'}
        sx={{
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '10px',
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(151, 133, 186,0.4)',
                borderRadius: '8px'
            }
        }}
        >
         <Navbar />

         <Box>
              <Typography variant='h2' textAlign={'center'} mb={3}>
                    Conversation History
              </Typography>

                {chats.length > 0 && <ChatFilter allChats={chats} filterChats={setFilteredChats} />}

                {chats.length == 0 && (
                    <Typography
                        textAlign={'center'}
                        p={3}
                        bgcolor={'primary.light'}
                        borderRadius={2}
                    >
                        No saved chats.
                    </Typography>
                )}

               {chats.length > 0 && filteredChats.length == 0 && (
                    <Typography
                        textAlign={'center'}
                        p={3}
                        bgcolor={'primary.light'}
                        borderRadius={2}
                    >
                        No such chats.
                    </Typography>
                )} 


                {filteredChats.length > 0 && (
                   <Stack
                     spacing={4}
                     divider={<Divider sx={{ borderColor: 'primary.bg', opacity: 0.4 }} />}
                   >
                     {filteredChats.map((item, ind) => (
                        <ChatHistoryCard details={item} key={ind}/>
                     ))}  
                   </Stack>
                )}
         </Box>
        </Box>
    )
}