import { getUserInfo } from '@/pages/mainpage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin:0 auto;
  height: 90vh;
  word-break:keep-all;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: black;
  border: none;
  border-radius: 4px;
  text-decoration:none;
  cursor: pointer
`;

const SignUpEnd = () => {
  const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: getUserInfo})
    if(isLoading){
      return(<Container>
      <Message>회원가입 처리중입니다...</Message>
      </Container>)
    }
  return (
    <Container>
      <Title>회원가입 완료!</Title>
      <Message>{data?.id}님 회원가입이 성공적으로 완료되었습니다.</Message>
      <Button href={'/mainpage'}>메인으로 이동</Button>
    </Container>
  );
};

export default SignUpEnd;