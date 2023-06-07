import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const MainBox = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 70px;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #464444;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`;

const MajorBox = styled.div`
  width: 200px;
  height: 50px;
  background-color: #F2FCFF;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 350px;
  margin-bottom: 30px;
  border-radius: 0.9375rem;
  border: none;
`;

const Button = styled.button`
  margin: 85px;
  margin-top: 50px;
  width: 6.875rem;
  height: 2.5rem;
  background-color: #e5f7ff;
  border-radius: 0.9375rem;
  border: none;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  font-weight: bold;
`;

const BottomWrapper = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: space-between; 
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Center the CategoryBox horizontally */

`;

const CategoryBox = styled.div` //활동멤버 카테고리 박스
  background-color: #F6FFF1;
  display: flex;
  width: 180px;
  flex-direction: column;
  align-items: center;
  //justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-left: 20px;
  margin-right: 20px; /* Adjust the margin-right to center the box */
  margin-top: 70px;
  padding-left: 50px;
  padding-right: 50px;
  overflow: auto;
`;

const CategoryContent = styled.div` //활동멤버 카테고리 박스 높이
  height: 300px; /* Adjust the height to your preference */
  overflow: auto;
`;

const CategoryBox2 = styled.div` //학과별 자유게시판 카테고리 박스
  background-color: #F6FFF1;
  display: flex;
  width: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid gray;
  border-radius: 0.5rem;
  margin-right: 50px;
  //margin-left: 150px;
  margin-top: 70px;
  padding-left: 50px;
  padding-right: 50px;
`;

const InnerBox = styled.div`
  text-decoration-line: none;
  font-size: smaller;
  width: 200px;
  height: 30px;
  background-color: #FFFFF2;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 15px;
  padding: 3px;
  margin-left: 7px;
`;

const InnerBox2 = styled(Link)`
  text-decoration-line:none;
  font-size: smaller;
  width: 500px;
  height: 30px;
  background-color: #FFFFF2;
  margin-top: 10px;
  margin-bottom: 10px; /* 각 InnerBox의 아래쪽 간격을 0.5rem으로 설정 */
  border-radius: 15px;
  padding: 3px;
`;

const CategoryTitle = styled.div`
  padding-bottom: 50px;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 20px;
`;

const CategoryTitle2 = styled.div`
  padding-bottom: 55px;
  font-size: 1.5rem;
  font-weight: bolder;
  margin-top: 30px;
`;

const RequestButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const postdata = [
  {
    title: '제목1',
    content: '내용1',
    url: '/제목1'
  },
  {
    title: '제목2',
    content: '내용2',
    url: '/제목2'
  },
  {
    title: '제목3',
    content: '내용3',
    url: '/제목3'
  },
  {
    title: '제목4',
    content: '내용4',
    url: '/제목4'
  },
  {
    title: '제목5',
    content: '내용5',
    url: '/제목5'
  }
];

interface Data {
  title: string;
  content: string;
  url: string;
}

const MajorBoard = ({ data }: { data: Data[] }) => {
  const router = useRouter();
  const majorname = router.query.Major;

  const Logo = styled(Image)`
  margin-right: 20px;
  margin-bottom: 28px;
`;


  return (
    
    <MainBox>
      <Container>
          <Link href={'/mainpage'}><Logo width={75} height={75} alt='' src="/logo2.png" /></Link>
        <MajorBox>{majorname}</MajorBox>
        <Link href={'/review'}><Button>후기</Button></Link>
        <Button>요청하기</Button>
        <Button>수락하기</Button>
        
      </Container>

      <BottomWrapper>
        <CategoryContainer>
        <CategoryBox>
      <CategoryTitle>활동 멤버</CategoryTitle>
      <CategoryContent>
        <InnerBox>정지훈</InnerBox>
        <InnerBox>박동주</InnerBox>
        <InnerBox>변혜림</InnerBox>
        <InnerBox>김경영</InnerBox>
        <InnerBox>지윤식</InnerBox>
        <InnerBox>이찬우</InnerBox>
        <InnerBox>헬로우</InnerBox>
        <InnerBox>아무나</InnerBox>
        <InnerBox>다과회</InnerBox>
        <InnerBox>들어와</InnerBox>
      </CategoryContent>
      </CategoryBox>
  
      <CategoryBox2>
          <CategoryTitle2>{majorname} 게시판</CategoryTitle2>
          {data.map((data: Data) => (
          <InnerBox2 href={data.url} key={data.title}>{data.title}</InnerBox2>))}
          <Link href={'/board'}><RequestButton>더보기</RequestButton></Link>
          </CategoryBox2>
      </CategoryContainer>
      </BottomWrapper>
    </MainBox>
    
  );
};

export const getServerSideProps
 = async () => {
  //const res = await fetch('https://api.github.com/repos/vercel/next.js');
  //const repo = await res.json();
  return { props: {data: postdata } };
};

export default MajorBoard;