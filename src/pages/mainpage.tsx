import Mainpage from '@/components/main/Mainpage';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useGetPostsData } from '@/hook/usePostsData';
import { Post } from '@/components/board/PartBoard';

export async function getUserInfo(){
    const APIURL=`${process.env.NEXT_PUBLIC_URL}/api/${process.env.NEXT_PUBLIC_VAPI}/mypage`
    const response = await fetch(APIURL)
    try {
        if(response.ok){
            const result = await response.json()
            console.log(result)
            return result   
        }else{
            throw new Error()
        }
    } catch (error) {
        return null
    }
    
}

function mainpage() {
    const [freeData, isLoading, error ]= useGetPostsData({count:10});
    return (
        <Mainpage freeData={freeData}/>
    );
}
// export async function getStaticProps() {
//     const queryClient = new QueryClient()
//     await queryClient.prefetchQuery({
//         queryKey: ['userInfo'],
//         queryFn: getUserInfo,
//         initialData:"로그인실패",
//         staleTime:0,
//       })
//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     }
//   }

export default mainpage;