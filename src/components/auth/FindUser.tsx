import React, { useState } from 'react';
import { ErrorText, Field, LoginCard, LoginContainer, StyledLabel } from './Login';
import styled from 'styled-components';
import { buttonCss as buttonCSS } from './SignUp';


const onSubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const form = new FormData(e.target as HTMLFormElement)
  const data={
    userid:form.get('userId')
  }
    console.log(data)
  const JSONdata = JSON.stringify(data);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  };
  console.log(data)
  const apiURL=`/api/${process.env.NEXT_PUBLIC_VAPI}/auth`

  const response = await fetch(apiURL, options);
  if(response.ok){
    try {
      switch(response.status){
        case 201:
          break;
        case 200:
          const result = await response.json();
          break;
        }
    } catch (error) {
      console.log(error)
    }
    
    }else{
    }
  }


function FindUser({findType}:{findType:'id'|'pw'}) {

    return (
        <LoginContainer>
            <LoginCard>
                <form onSubmit={onSubmit}>
                    <StyledLabel>{findType=='id'?'아이디 찾기':findType==='pw'&&'임시 비밀번호 찾기'}</StyledLabel>
                    {findType=='id'?<div>준비 중 입니다</div>:findType==='pw'&&<><Field type='text' placeholder='비밀번호를 찾을 아이디' name='userId' /><FindButton type='submit'>비밀번호 찾기</FindButton></>}
                </form>
                
            </LoginCard>
        </LoginContainer>
    );
}

const FindButton=styled.button`
  ${buttonCSS}
`;

export default FindUser;