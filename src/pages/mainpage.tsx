import Mainpage from '@/components/main/Mainpage';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

export async function getUserInfo(){
    const APIURL=`${process.env.NEXT_PUBLIC_URL}/api/${process.env.NEXT_PUBLIC_VAPI}/mypage`
    const response = await fetch(APIURL)
    try {
        if(response.ok){
            const result = await response.json()
            return result.user
        }else{
            return {}
        }
    } catch (error) {
        console.log("에러")
    }
    
}

function mainpage() {
    const { data } = useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo ,})
    return (
        <Mainpage userData={data}/>
    );
}
export async function getStaticProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({queryKey:['userInfo'], queryFn:()=>{return {}},})
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

export default mainpage;