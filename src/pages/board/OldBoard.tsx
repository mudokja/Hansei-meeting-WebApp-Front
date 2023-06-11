import Board from "@/components/Board";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";


export default function Home() {
  return (
    <>
 <Board data={[]}/>
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

interface Post{ // 게시글의 타입
  id: number;
  title: string;
  coment: number;
  author: string;
  date: string;
  views: number;
  likes: number;
  timestamp: number;
};

const posts: Post[] = [
  {
    id: 1,
    title: '오늘 진짜 귀여운 고양이 봤어!!',
    coment:5,
    author: '박동주',
    date: '2023-04-10',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 2,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-11',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 3,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-12',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 4,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-13',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 5,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-14',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 6,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-15',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 7,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-16',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 8,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-17',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 9,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-18',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 10,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-19',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 11,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-20',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 12,
    title: '오늘 ',
    coment:5,
    author: '박동주',
    date: '2023-04-21',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },
  {
    id: 13,
    title: '이번주 학식 완전 최고야!!',
    coment:5,
    author: '박동주',
    date: '2023-04-22',
    views: 199,
    likes: 6,
    timestamp: Date.now(),
  },

];


const sortedPosts = [...posts].sort((a, b) => b.id - a.id);