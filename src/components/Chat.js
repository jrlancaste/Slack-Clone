import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { selectRoomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { doc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { orderBy } from 'firebase/firestore'
import Message from './Message'

function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(selectRoomId)
    const [roomDetails, loading] = useDocument(
        roomId && doc(db, `rooms/${roomId}`)
    )
    const [roomMessages] = useCollection(
        roomId &&
        collection(db, `rooms/${roomId}/messages`)
    )
    const messageList = roomMessages?.docs
        .sort(function (x, y) {
            return x.data().timestamp - y.data().timestamp;
        })
        .map(doc => {
            const { message, timestamp, user, userImage } = doc.data();
            return <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
            />
        })
    React.useEffect(() => {
        console.log(roomId)
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [roomId, loading])

    return (
        <ChatContainer>

            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4><strong>#{roomDetails?.data().name}</strong></h4>
                            <StarBorderOutlined />
                        </HeaderLeft>
                        <HeaderRight>
                            <p>
                                <InfoOutlined /> Details
                            </p>
                        </HeaderRight>
                    </Header>
                    <ChatMessages>
                        {messageList}
                        <ChatBottom
                            id="bottom"
                            ref={chatRef} />
                    </ChatMessages>
                    <ChatInput
                        chatRef={chatRef}
                        channelName={roomDetails?.data().name}
                        channelId={roomId}
                    />
                </>)}
        </ChatContainer>
    )
}

const ChatBottom = styled.div`
    padding-bottom: 200px;
`
const ChatMessages = styled.div`

`
const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 70px;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4{
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 > .MuiSvgIcon-root{
        margin-left: 10px;
        font-size: 10px;
    }
`
const HeaderRight = styled.div`
    > p{
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    > p > .MuiSvgIcon-root{
        margin-right: 5px !important;
        font-size: 16px;
    }
`

export default Chat