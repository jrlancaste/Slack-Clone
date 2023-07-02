import React from 'react'
import { styled } from 'styled-components'

function Message({ message, user, userImage, timestamp }) {
    return (
        <MessageContainer>
            <img src={userImage} />
            <MessageInfo>
                <h4>
                    {user}{' '}
                    <span>
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                    <p>{message}</p>
                </h4>
            </MessageInfo>
        </MessageContainer>
    )
}

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    >img{
        height: 50px;
        border-radius: 8px;
    }
`
const MessageInfo = styled.div`
    padding-left: 10px;

    >h4 > span{
        color: gray;
        font-size: 10;
        font-weight: 300;
        margin-left: 4px;
    }
`

export default Message