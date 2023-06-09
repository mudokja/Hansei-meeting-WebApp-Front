import React, { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { SignUpButton } from '../auth/SignUp';

const EditorSSR = dynamic(()=>import('@/components/post/PostEditor'),{ssr:false});


interface IPostInput {
  title:string;
  content:string;
  tag?:string;
}
  
type InputProps = {
  label: Path<IPostInput>;
  register: UseFormRegister<IPostInput>;
  required: boolean;
};

const PostWriteContainer=styled.div`
    display:block;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:100%;
    max-width:800px;
    margin-right:auto;
    margin-left:auto;

`;
const TextField = styled.input`
  width: 100%;
  padding: 4px;
  margin-top:8px;
  margin-bottom: 8px;
  border: 1px solid #bec3c7;
  border-left:0px;
  border-right:0px;
  box-sizing:border-box;
`;
const StyledLabel=styled.label`
`
const PostHeader= styled.div`
  display:flex;
  justify-content:left;
  flex-direction:column;
  width:100%;
`

const PostBottom = styled.div`
  display:flex;
  justify-content:right;
  width:100%;
`;

const Header = styled.div`
   
`
const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err, "err");
    }
  };

function post() {
  const router= useRouter()
  const [errorText, setErrorText]=useState('');
  const { register, formState:{errors,isSubmitting}, handleSubmit } = useForm<IPostInput>({mode:'onChange'});
  const ediRef=useRef<any>(null);
  const [content, setContent]=useState(' ')
  // const ViewerSSR =useMemo(()=>dynamic(()=>import("@/components/post/PostViewer"),{ssr:false}),[content]); //테스트코드
  const onSubmit: SubmitHandler<IPostInput> =useCallback(async (e)=>{
    const data={
      title:e.title,
      content:ediRef.current?.getInstance().getMarkdown(),
    }
    const JSONdata = JSON.stringify(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
    const apiURL=`/api/${process.env.NEXT_PUBLIC_VAPI}/post`
 
    const response = await fetch(apiURL, options);
    if(response.ok){
      try {
        switch(response.status){
          case 201:
            const {url}= await response.json()
            router.push(url)
            break;
          case 200:
            const result = await response.text();
            break;
          }
      } catch (error) {
        console.log(error)
      }
      
      }else{
        setErrorText("이메일 또는 비밀번호를 확인하세요");
      }
  },[]) 
   
    
   
     
    return (
      <PostWriteContainer>
      <div>
        둘만한 헤더가 있으면 위치할 영역 작성중인 게시판, 바로가기등
      </div>
      <h2>글쓰기</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <PostHeader>
              <StyledLabel >
                <TextField type='text' placeholder='글제목'
                {...register("title",{ required: "글제목을 입력해주세요" })}></TextField>
              </StyledLabel>
            </PostHeader>

            <EditorSSR content={content} onChange={setContent} editorRef={ediRef} />
             {/* <ViewerSSR content={content} /> 테스트코드 */}
            <SignUpButton type="submit">글쓰기</SignUpButton>
        </form>
        <PostBottom>
          
        </PostBottom>
      </PostWriteContainer>
    );
}

export default post;