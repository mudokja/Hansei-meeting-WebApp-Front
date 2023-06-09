
import Board from '@/components/Board';
import PartBoard from '@/components/board/PartBoard';
import PostViewer from '@/components/post/PostViewer';
import useParsingDate from '@/hook/useParsingDate';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
const Viewer =dynamic(()=>import("@/components/post/PostViewer"),{ssr:false,loading: () => <p>글을 불러오는 중입니다</p>,})
function postView({data}:{data:any}) {
  const [isPost, setIsPost] = useState(null);
  const {postid,  author, title, date, content} = data;
  const [dateString, setDateString] = useParsingDate(date)
 
  // if (!isPost) {
  //   return <div>Loading...</div>;
//}

  return (
    <>
    <Header>상단 헤더</Header>
    <PostViewContainer>
      
      <ContentViewBox>
        <PostTitle>{title}</PostTitle>
        <Author>{author}</Author>
        <PostDate>
          <span onClick={()=>{setDateString()}} >{dateString}</span>
        </PostDate>
        <Viewer content={content} /> 
      </ContentViewBox>
      <Sidebar>
        <h2>다른 게시글 목록</h2>
      </Sidebar>
      <PartBoard boardTitle={false}/>
    </PostViewContainer>
    </>
    
  );
};
      

export const getServerSideProps
 = async ({params}:any) => {
  const option ={
    method:'GET',
    headers:{
    },
  }
  const id = params.id
  console.log(id)
  const apiURL=`${process.env.URL}/api/${process.env.NEXT_PUBLIC_VAPI}/post/${id}`
  try{
    const res = await fetch(apiURL,option);
    const result = await res.json();
    console.log(result)
    return {props:{data:result}}
  }catch{
    return { props: {data:{"내용":"내용이 존재하지 않습니다"}}};
  }
  
  
};

export default postView;

const PostTitle= styled.div`
 font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  
`
const Author = styled.div`
  font-size: 14px;
  color: #888;
`

const PostViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5%;
  margin-right:5%;
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentViewBox = styled.div`
  width: 100%;
  max-width: 850px;
  margin-top: 20px;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  padding: 20px;
`;
const PostDate=styled.div`
display:flex;
justify-content:end;
margin-right:30px;
padding:12px;
&>span{
  display:inline-block;
  font-weight:600;
  font-size:14px;
  color: #888;
}

`;