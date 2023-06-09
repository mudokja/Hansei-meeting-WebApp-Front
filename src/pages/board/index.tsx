import BoardPageBar from "@/components/board/BoardPageBar";
import PartBoard, { Post } from "@/components/board/PartBoard";
import { useGetPostsData } from "@/hook/usePostsData";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { PostViewContainer } from "post[dynamic]";
import BoardHeader from "@/components/board/BoardHeader";




export default function newBoard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, isLoading, error ]= useGetPostsData({pageNumber:currentPage,count:10})
  const handlePageClick = (number :number) => {
    
    router.push({query:{...router.query}},undefined, { shallow: true});

    setCurrentPage(number);
    
  };
  function handlePostShow(postid:string|number|null): void{
    
    const show = data.find((post:any)=>post.postid===postid)
    //console.log(show)
    ;
  }
  return (
    <>
    <BoardHeader/>
    <PostViewContainer>
 {!isLoading&&(<PartBoard boardHeader={true} data={data} boardTitle="자유" handlePost={handlePostShow} />)}
      <BoardPageBar currentPage={currentPage} onClick={handlePageClick} />
    </PostViewContainer >
    </>
  )
}
export const getServerSideProps
= async ({req,res}:GetServerSidePropsContext) => {
  const query =req.headers.pragma
   const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
 const option ={
   method:'GET',
   headers:{
     cookie:seesionIDcookie
   },
 }
 const apiURL=`${process.env.URL}/api/${process.env.NEXT_PUBLIC_VAPI}/post`
 try{
   const res = await fetch(apiURL,option);
   const result = await res.json();
   console.log(result)
   return {props:{data:result}}
 }catch{
   return { props: {data: sortedPosts} };
 }
 
 
};



const posts: Post[] = [
  {
    postid: 1,
    title: '오늘 진짜 귀여운 고양이 봤어!!',
    coment:5,
    author: '박동주',
    date: '2023-04-10',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 2,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-11',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 3,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-12',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 4,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-13',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 5,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-14',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 6,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-15',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 7,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-16',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 8,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-17',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 9,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-18',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 10,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-19',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 11,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-20',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 12,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-21',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    postid: 13,
    title: '이번주 학식 완전 최고야!!',
    coment:5,
    author: '박동주',
    date: '2023-04-22',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },

];



const sortedPosts = [...posts].sort((a, b) => b.postid - a.postid);


