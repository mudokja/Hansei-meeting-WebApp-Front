import SignUpEnd from '@/components/auth/SignUpEnd';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import React from 'react';
import { getUserInfo } from '../mainpage';

function singing() {
  const { data } = useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo ,})
  console.log(data)
    return (
        <div>
            <SignUpEnd/>
        </div>
    );
}
export async function getStaticProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({queryKey:['userInfo'], queryFn:getUserInfo})
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
export default singing;