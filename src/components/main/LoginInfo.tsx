import { getUserInfo } from '@/pages/mainpage';
import { useQuery } from '@tanstack/react-query';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import Link  from 'next/link';
import styled from 'styled-components';
import { hasCookie } from 'cookies-next';

function LoginInfo() {
  const { data, isFetched, isStale,isError,isFetchedAfterMount, remove } = useQuery({ queryKey: ['userInfo'],staleTime:30000 ,queryFn:getUserInfo, retryDelay:30000, initialData:null, initialDataUpdatedAt:0})

    const [isLogIn, setIsLogIn]=useState<boolean>((isStale||isFetched));
    const handleLogout = async () => {
        const res = await fetch(`/api/${process.env.NEXT_PUBLIC_VAPI}/login`,{method:"DELETE"})
        if(res.status===404){
          remove();
          setIsLogIn(false)
        }
        if(res.status===204){
          remove();
          setIsLogIn(false)
        }

      }
      
      const handleLogin=()=>{
        if(data?.id&&true){
            if(data.id==="로그인실패")
            {
                router.push('/login')
            }
          setIsLogIn(true)
        }else{
          router.push('/login')
        }
    }
      
    return (
        <LoginContainer>
          {isLogIn?(
            <>
              <Link href={'/mypage'}><Username>{data?.id}</Username></Link>
              <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
            </>
          ):(
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          )}
        </LoginContainer>
    );
}

export default LoginInfo;

const LoginContainer = styled.div`
  display: block;
  width:150px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  background-color: transparent;
  a {text-decoration: none;};
`;

const Username = styled.span`
  font-size: 14px;
  margin-left: 10px;
  font-weight:600;
  word-break:keep-all;
  color:white;
  text-decoration: none;
`;

const LoginButton = styled.button`
  padding: 10px;
  font-weight:1000;
  font-style:bold;
  box-sizing:border-box;
  color:white;
  word-break:keep-all;
  background-color: transparent;
  border: none;
  
`;