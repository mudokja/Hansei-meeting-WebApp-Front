
import Board from '@/components/Board';
import { SignUpButton } from '@/components/auth/SignUp';
import BoardPageBar from '@/components/board/BoardPageBar';
import PartBoard, { Post } from '@/components/board/PartBoard';
import PostViewer from '@/components/post/PostViewer';
import useParsingDate from '@/hook/useParsingDate';
import { useGetPostsData } from '@/hook/usePostsData';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { getUserInfo } from '../mainpage';
import { getCookie } from 'cookies-next';
import BoardHeader from '@/components/board/BoardHeader';



//const Viewer=dynamic(()=>import("@/components/post/PostViewer"),{ssr:false,loading: () => <p>글을 불러오는 중입니다</p>,})
function postView({data: postData}:{data:any}) {
  const [isPost, setIsPost] = useState(null);
  const { postid, author, title, date, content} = postData;
  const queryClient=useQueryClient()
  let viewContent = content;
  const [dateString, setDateString] = useParsingDate(date)
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, isLoading, error ]= useGetPostsData({pageNumber:currentPage})
  const { data:userData } = useQuery({ queryKey: ['userInfo'],staleTime:30000 ,queryFn:getUserInfo, retryDelay:300000, initialData:null, initialDataUpdatedAt:0})
  const handlePageClick = (number :number) => {
    
    router.push({query:{...router.query}},undefined, { shallow: true});

    setCurrentPage(number);
    
  };
  async function handlePostDelete(){
    const APIURL=`${process.env.NEXT_PUBLIC_URL}/api/${process.env.NEXT_PUBLIC_VAPI}/post/${postid}`
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
            case 200:
              queryClient.invalidateQueries(['viewPosts'])
              alert("게시글 삭제성공")
              router.push('/board')
              break;
            case 404:
            alert("게시글 삭제에 실패했습니다")
              break;
            }
        } catch (error) {
          console.log(error)
        }
        }
      }
  function handlePostShow(postid:string|number|null): void{
    
    const show = data.find((post:any)=>post.postid===postid)
    //console.log(show)
    viewContent=show.content
    
    
    ;
  }
  // if (!isPost) {
  //   return <div>Loading...</div>;
//}
  const Viewer=useMemo(()=>dynamic(()=>import("@/components/post/PostViewer"),{ssr:false,loading: () => <p>글을 불러오는 중입니다</p>,}),[])

  return (
    <>
    <BoardHeader/>
    <PostViewContainer>
      
      <ContentViewBox>
        <PostTitle>{title}</PostTitle>
        <Author>{author}</Author>
        <PostDate>
          <span onClick={()=>{setDateString()}} >{dateString}</span>
        </PostDate>
        <Viewer content={viewContent}/>
        {userData?.id===author&&
        <SignUpButton onClick={handlePostDelete}>삭제</SignUpButton>
        }
      </ContentViewBox>
      <Sidebar>
        <h2>다른 게시글 목록</h2>
      </Sidebar>
      {!isLoading&&(<PartBoard boardHeader={false} data={data} handlePost={handlePostShow} />)}
      <BoardPageBar currentPage={currentPage} onClick={handlePageClick} />
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
  console.log("서버사이드")
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

export const PostViewContainer = styled.div`
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