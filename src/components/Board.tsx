import styled from 'styled-components';
import Link from 'next/link';
import { Post } from './board/PartBoard';

const InnerBox = styled.div`
  display: flex;
`;

const Div = styled.div`
  margin: 0 auto;
`;

const Title = styled.h1` 
margin: 5px 0;
  font-size:2.5rem;
  margin-top: 90px;
  display:flex;
`;

const Explain = styled.p`
  margin: 5px 0;
  font-size:0.8rem;
`;

const Table = styled.table`
 width: 1300px;
 margin: 0 auto;
 margin-top: 20px;
border-collapse: collapse;
border: none;
text-align: center;
`;

const Tbody = styled.tbody`
 border: none;
`;

type Board = { // 게시판 제목 타입
  title: string;
};


const Td = styled.td` // 게시글의 내용 부분
  height: 48px;
  padding: 16px 0 14px;
  border: 2px solid #9C9C9C;
  border-left: none;
  border-right: none;

  &:first-child {
    border-left: 2px solid #9C9C9C;
  }
  &:last-child {
    border-right: 2px solid #9C9C9C;
  }

  a {
  text-decoration: none;
  color: inherit;
}
`;

const Th = styled.th` // 게시글의 윗 머리 부분
  height: 48px;
  padding: 16px 0 14px;
  border: 2px solid #9C9C9C;
  border-top: 2px solid #9C9C9C;
  border-left: none;
  border-right: none; 
  background-color: #E5F7FF; 
  border-bottom: 2px solid #9C9C9C;
  &:first-child {
    border-left: 2px solid #9C9C9C;   
  }

  &:last-child {
    border-right: 2px solid #9C9C9C;
  }
`;

function Board ({data}:{data:Post[]}) {
    return (  
      <InnerBox>                 
      <Div>
        <Title>자유게시판</Title>
        <Explain>다과회의 자유게시판입니다.</Explain>
        <Table>
        <Tbody>
          <tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>날짜</Th>
            <Th>조회수</Th>
            <Th>좋아요</Th>
          </tr>
          {data.map((post :any) => (
          <tr key={post.id}>
            <Td>{post.id}</Td>
            <Td>
              <Link href={`/post/${post.id}`} passHref>
                {post.title}[{post.coment}]
              </Link>
            </Td>
            <Td>{post.author}</Td>
            <Td>{post.date}</Td>
            <Td>{post.views}</Td>
            <Td>{post.likes}</Td>
          </tr>
        ))}
          
        </Tbody>
        </Table>
      </Div>
      </InnerBox>
     
     );
  }
  
  export default Board ;