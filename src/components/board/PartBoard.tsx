import styled from 'styled-components';
import Link from 'next/link';
import BoardPageBar from './BoardPageBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SignUpButton, buttonCss } from '../auth/SignUp';




const Div = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
`;

const DivRow = styled.div`
  display: block;
  flex-direction: row;
  width:100%;
  
  justify-content: center;
  align-items: center;
  border: 2px solid #9C9C9C;
  border-left: none;
  border-right: none;
`;

const DivCell = styled.div`
  flex:1;
  padding: 16px 0 14px;
  text-decoration-line: none;
  text-align: center;

  &:first-child {
    border-left: 0px;
  }

  &:last-child {
    border-right: 0px;
  }
`;

const DivHeader = styled.div`
  flex:1;
  height: 48px;
  padding: 16px 0 14px;
  border: 2px solid #9C9C9C;
  border-top: 2px solid #9C9C9C;
  border-left: none;
  border-right: none;
  background-color: #E5F7FF;
  border-bottom: 2px solid #9C9C9C;

  &:first-child {
    border-left: 2px solid #9C9C9C;
  }

  &:last-child {
    border-right: 2px solid #9C9C9C;
  }
`;

const DivTable = styled.div`
  width: 100%;
  min-width: 850px;
  margin: 0 auto;
  margin-top: 20px;
  border-collapse: collapse;
  border: none;
  text-align: center;
`;






const InnerBox = styled.div`
  display: flex;
  flex-direction:row;
`;


const Divvv = styled.div`
   display: flex;
  flex-direction: row;
  width:100%;
  
  justify-content: center;
  align-items: center;
  border: 2px solid #9C9C9C;
  border-left: none;
  border-right: none;;
`;

const Divv = styled.div`
  margin: 0 auto;
`;

const Title = styled.h1` 
margin: 5px 0;
  font-size:2.5rem;
  margin-top: 90px;
  display:flex;
`;

const Explain = styled.p`
  margin: 5px 0;
  font-size:0.8rem;
`;


const BoardPostWrite=styled(Link)`
  justify-content:flex-end;
  ${buttonCss}{
    
  }
`;
const BoardBottomBox=styled(InnerBox)`
  justify-content:flex-end;
`

export interface Post{ // 게시글의 타입
  postid: number;
  title: string;
  content?:string;
  coment?: number;
  author: string; 
  date: string;
  views?: number;
  likes?: number;
  timestamp?: number;
};

const TableLink=styled(Link)`
  display:flex;
  flex-direction:row;
  text-decoration:none;
  color:black;
`;

type Props={
    data?:Post[],
    boardHeader?:boolean,
    boardTitle?:string,
    handlePost:any,
}

function PartBoard ({boardHeader=true,data: PostsData=[],boardTitle, handlePost}:Props) {
    return (  
      <InnerBox>                 
<Divv>
        {boardHeader&&(<>
        <Title>{boardTitle}게시판</Title>
        <Explain>{boardTitle}게시판입니다.</Explain>
        </>)}
        
        <DivTable>
          <Divvv>
            <DivHeader>번호</DivHeader>
            <DivHeader>제목</DivHeader>
            <DivHeader>작성자</DivHeader>
            <DivHeader>날짜</DivHeader>
            <DivHeader>조회수</DivHeader>
            <DivHeader>좋아요</DivHeader>
          </Divvv>
          {PostsData[0]?PostsData.map((data) =>(
            <DivRow key={data.postid}>
          <TableLink onClick={()=>{handlePost(data.postid)}} href={{pathname:`/post/[id]`,query:{id:data.postid}}}>
              <DivCell>{data.postid}</DivCell>
              <DivCell>
                {data.title}
                {data.coment && `[${data.coment}]`}
              </DivCell>
              <DivCell>{data.author}</DivCell>
              <DivCell>{data.date}</DivCell>
              <DivCell>{data.views || 0}</DivCell>
              <DivCell>{data.likes || 0}</DivCell>
          </TableLink>
          <Div/>
            </DivRow>
          )):<DivRow>
            <DivCell>더이상 글이 없습니다!</DivCell>
            <DivCell>새로운 글로 채워주세요</DivCell>
            </DivRow>}
            <BoardBottomBox>
            <BoardPostWrite href={'/post'} >글쓰기</BoardPostWrite>
            </BoardBottomBox>
            
        </DivTable>
      </Divv>
      
      </InnerBox>
     
     );
  }
  
  export default PartBoard ;