import Post from '@/components/post/PostForm';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Home() {    
  return (
    <>
      <Head>
        <meta name="title" content="다과회" />
        <meta property='og:title' content='다과회'/>
        <title>다과회 | 글쓰기</title>
      </Head>
        <main>
          <Post/>
        </main>
    </>
  )
}