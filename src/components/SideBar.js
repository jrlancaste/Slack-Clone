import React from 'react'
import styled from 'styled-components'
import SideBarOption from './SideBarOption'
import { FiberManualRecord } from '@mui/icons-material'
import { Create } from '@mui/icons-material'
import { InsertComment } from '@mui/icons-material'
import { Inbox } from '@mui/icons-material'
import { Drafts } from '@mui/icons-material'
import { BookmarkBorder } from '@mui/icons-material'
import { FileCopy } from '@mui/icons-material'
import { PeopleAlt } from '@mui/icons-material'
import { Apps } from '@mui/icons-material'
import { ExpandLess } from '@mui/icons-material'
import { ExpandMore } from '@mui/icons-material'
import { Add } from '@mui/icons-material'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


function SideBar() {
    const [channels, loading, error] = useCollection(collection(db, "rooms"))
    const [user] = useAuthState(auth);

    return (
        <SideBarContainer>
            <SideBarHeader>
                <SideBarInfo>
                    <h2>Slack Clone</h2>
                    <h3>
                        <FiberManualRecord />
                        {user.displayName}
                    </h3>
                </SideBarInfo>
                <Create />
            </SideBarHeader>
            <SideBarOption Icon={InsertComment} title="Threads" />
            <SideBarOption Icon={Inbox} title="Mentions & reactions" />
            <SideBarOption Icon={Drafts} title="Saved items" />
            <SideBarOption Icon={BookmarkBorder} title="Channel browser" />
            <SideBarOption Icon={PeopleAlt} title="People & user groups" />
            <SideBarOption Icon={Apps} title="Apps" />
            <SideBarOption Icon={FileCopy} title="File browser" />
            <SideBarOption Icon={ExpandLess} title="Show less" />
            <hr />
            <SideBarOption Icon={ExpandMore} title="Channels" />
            <hr />
            <SideBarOption Icon={Add} title="Add channel" addChannelOption />
            {channels?.docs.map(doc =>
                <SideBarOption key={doc.id} id={doc.id} title={doc.data().name}></SideBarOption>
            )}
        </SideBarContainer>
    )
}

const SideBarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;
    > hr{
        margin: 10px 0;
        border: 1px solid #49274b;
    }
`
const SideBarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;
    > .MuiSvgIcon-root{
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 100%;
    }
`

const SideBarInfo = styled.div`
    flex: 1;
    > h2{
        margin-bottom: 5px;
        font-size: 15px;
        font-weight: 900; 
    }
    >h3{
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }
    >h3 > .MuiSvgIcon-root{
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;   
    }
`

export default SideBar