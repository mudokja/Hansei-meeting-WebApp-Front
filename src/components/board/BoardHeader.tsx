import LoginInfo from "@/components/main/LoginInfo";
import { TopBox, Logo, ButtonWrapper } from "@/components/main/Mainpage";
import Sublist2 from "@/components/main/Sublist2";
import Link from "next/link";
import { SignUpButton } from "@/components/auth/SignUp";

const majorlist = [
    { menuName: '신학부', 
    items: [
      { name: '신학과' },
      { name: '기독교교육상담학과' }
    ]},
    { menuName: '인문사화과학부', 
    items: [
      { name: '미디어영상광고학과' },
      { name: '경영학과' },
      { name: '경찰행정학과' },
      { name: '국제관광학과' },
      { name: '영어학과' },
      { name: '중국어학과' }
    ]},
    { menuName: 'IT학부', 
    items: [
      { name: '컴퓨터공학과' },
      { name: 'ICT융합학과' },
      { name: '산업보안학과' }
    ]},
    { menuName: '간호복지학부', 
    items: [
      { name: '간호학과' },
      { name: '사회복지학과' }
    ]},
    { menuName: '예술학부', 
    items: [
      { name: '음악학과' },
      { name: '공연예술학과' }
    ]},
    { menuName: '디자인학부', 
    items: [
      { name: '시각정보디자인학과' },
      { name: '실내건축디자인학과' },
      { name: '섬유패션디자인학과' }
    ]},
    { menuName: '계약학과', 
    items: [
      { name: '보건복지 사회적기업학과' },
      { name: '보건융합 사회적경제학과' },
      { name: '스마트콘텐츠마케팅학과' }
    ]}
  ];
  

function BoardHeader() {
    return <TopBox>
      <Link href={'/'}><Logo width={75} height={75} alt='' src="/logo2.png" /></Link>
      {majorlist.map(({ menuName, items }) => (
        <Sublist2 key={menuName} title={items} menuName={menuName} />
      ))}
      <ButtonWrapper>요청하기</ButtonWrapper>
      <LoginInfo />
    </TopBox>;
  }

  export default BoardHeader;


  