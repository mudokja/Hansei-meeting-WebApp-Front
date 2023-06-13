import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
`;

const Number = styled.div<{active:boolean}>`
  padding: 10px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
`;
type Props={
    currentPage:number, 
    totalPages?:number, 
    onClick:(number:number)=>void,
}

const BoardPageBar = ({ currentPage, totalPages=10, onClick }:Props) => {
  const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Container>
      {numbers.map(number => (
        <Number
          key={number}
          active={number === currentPage}
          onClick={() => onClick(number)}
        >
          {number}
        </Number>
      ))}
    </Container>
  );
};

export default BoardPageBar;