import React, { useRef } from 'react'
import { styled } from 'styled-components'
import { Button } from '@mui/material';
import { db } from '../firebase';
import { collection, getDoc, doc, addDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';


function ChatInput({ channelName, channelId, chatRef }) {
    const [input, setInput] = React.useState('');
    const [user] = useAuthState(auth)
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!channelId) return false;

        addDoc(collection(db, `rooms/${channelId}/messages`), {
            message: input,
            timestamp: Timestamp.fromDate(new Date()),
            user: user.displayName,
            userImage: user.photoURL
        })
        setInput('')
    }
    chatRef?.current?.scrollIntoView({
        behavior: 'smooth'
    })

    return (
        <ChatInputContainer>
            <form>
                <input onChange={(e) => setInput(e.target.value)} value={input} placeholder={`Message #${channelName}`} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form{
        position: relative;
        display: flex;
        justify-content: center;

    }
    > form > input{
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none; 
    }
    > form > button{
        display: none !important;
    }
`

export default ChatInput