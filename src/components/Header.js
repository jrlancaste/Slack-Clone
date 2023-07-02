import React from 'react'
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { HelpOutline } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';


function Header() {
    const [user] = useAuthState(auth);

    return (
        <HeaderComponent>
            <HeaderLeft>
                <HeaderAvatar
                    onClick={() => signOut(auth)}
                    src={user?.photoURL}
                />
                <AccessTime />
            </HeaderLeft>
            <HeaderSearch>
                <Search />
                <input placeholder='Search'></input>
            </HeaderSearch>
            <HeaderRight>
                <HelpOutline />
            </HeaderRight>
        </HeaderComponent>
    )
}

export default Header;

const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: end;

    >.MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 20px;
    }

`

const HeaderComponent = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color: white;
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #421f44;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px solid gray;

    > input{
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 30vw;
        outline: none;
        color: white;
    }
`;