import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { ErrorText } from '@/components/auth/Login';
import { useQueryClient } from '@tanstack/react-query';



const Div = styled.div` /*큰 틀*/
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 margin: 5px;
 margin-left: 100px;
 margin-right: 100px;
 height:100%;
`;

const TitleBox = styled.div` /*mytitle을 감싸는 레이아웃*/
width: 250px;
`;

const CategoryBox = styled.div`/*categorybox2, 3를 감싸는 레이아웃*/
  background-color: #F6FFF1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin: 10px;
  margin-left: 20px;
  padding: 20px;
  height: 500px;
  width: 800px;
`;

const CategoryBox2 = styled.div` /* content의 레이아웃*/
  background-color: #F6FFF1;
  flex-direction: column;
  border-radius: 0.5rem;
  margin-right: 90px;
`;
const CategoryBox3 = styled.div`  /* image의 레이아웃*/
 height: 66%;
 display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 50px;
`;

const CategoryBox4 = styled.div` /*button의 레이아웃*/
background-color: #F6FFF1;
  display: flex;
  /* align-items: center; */
  /* justify-content: center;  */
  border-radius: 0.5rem;
  margin-top: 10px;
  
  
`;

const ContentContainer = styled.div` /*content 타이틀과 글을 담고 있는 레이아웃*/
  background-color: #F6FFF1;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
`;



const ContentText = styled.p` /*content안의 글*/
  margin-bottom: 5px;
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const ContentTitle = styled.h3` /*내정보*/
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const ImageBox = styled.div` /*사진 넣는 곳*/
border: solid black;
margin-bottom: 10px;

`;

const Image = styled.img` /*사진*/
  width: 134.4px;
  height: 153.3px;
  margin-right: 12px;
  margin-left: 12px;
`;

const MyTitle = styled.h2` /*마이페이지*/
  margin-left: 40px;
  font-size: 2.1rem;
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  
`;


type Content = { /*이름, 학과, 아이디 타입지정*/
name?: string;
id: string;
department?: string;
grade?: number;
studentId?: string;
};

const Contents: Content =
  {
    name:'홍길동',
    id: 'Hong1234',
    department: 'ict',
    grade: 4,
    studentId: "123456789"
  }

const RequestButton = styled.button` /*정보변경 버튼*/
  width: 5rem;
  font-size: 1rem;
  font-weight:600;
  padding:8 px;
  align-self:center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right:10px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.5rem;
  word-break:keep-all;
  cursor: pointer;
`;


const Mypage = ({data}:{data:Content}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage]=useState('');
  const queryClient=useQueryClient()
  async function handleUserDelete(){
    const APIURL=`${process.env.NEXT_PUBLIC_URL}/api/${process.env.NEXT_PUBLIC_VAPI}/signup`
    const seesionIDcookie = `sid=${getCookie('sid') as string}`;
    
    const option ={
      method:'DELETE',
      headers:{
        cookie:seesionIDcookie
      },
    }
      const response = await fetch(APIURL,option)
      if(response.ok){
        try {
          
          const result = await response.text()
          switch(response.status){
            case 201:
              queryClient.removeQueries(['userInfo'])
              router.push(response.headers.get('Location') as string )
              break;
            case 404:
              const text=JSON.parse(result)
              setErrorMessage(text.error)
              break;
            }
        } catch (error) {
          console.log(error)
        }
        }
      }
  return (
       <Div>
      <TitleBox>
        <MyTitle>마이페이지</MyTitle>
      </TitleBox>
        <CategoryBox>
          <CategoryBox2>
            <ContentContainer>
              <ContentTitle>내 정보</ContentTitle>
              <ContentText>이름: {data.name||"정보없음"}</ContentText>
              <ContentText>아이디: {data.id||"미인증상태"}</ContentText>
              <ContentText>학과: {data.department||"정보없음"}</ContentText>
              <ContentText>학년: {data.grade||"정보없음"}</ContentText>
              <ContentText>학번: {data.studentId||"정보없음"}</ContentText>
            </ContentContainer>
          
          </CategoryBox2>
          <CategoryBox3>
          <ImageBox>
            <Image src="/meow.png" />
            </ImageBox>
            <CategoryBox4>
            <RequestButton onClick={()=>{alert("준비 중입니다")}}>정보변경</RequestButton>
            <RequestButton onClick={()=>{handleUserDelete(); setTimeout(()=>{setErrorMessage("")},5000 )}}>회원탈퇴</RequestButton>
            {errorMessage&&(<ErrorText>{errorMessage}</ErrorText>)}
            </CategoryBox4>
          </CategoryBox3>
          
        </CategoryBox>
        <RequestButton onClick={()=>router.back()}>돌아가기</RequestButton>
    </Div>
    
  );
  };
  export const getServerSideProps
 = async ({req,res}:GetServerSidePropsContext) => {
    const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
  const option ={
    method:'GET',
    headers:{
      cookie:seesionIDcookie
    },
  }
  const apiURL=`${process.env.URL}/api/${process.env.NEXT_PUBLIC_VAPI}/mypage`
  try{
    const res = await fetch(apiURL,option);
    const result = await res.json();
    return {props:{data:result}}
  }catch{
    return { props: {data: Contents} };
  }
  
  
};

export default Mypage;