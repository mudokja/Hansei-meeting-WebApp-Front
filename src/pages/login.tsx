import Login from '@/components/auth/Login';
import Head from 'next/head';
import React from 'react';

function login() {
    
    return (
        <>
        <Head>
            <title>로그인</title>
            <meta name="description" content="login" />
        </Head>
        <Login />
        </>
    );
}

export default login;