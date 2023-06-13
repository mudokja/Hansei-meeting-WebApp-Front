import React, { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { SignUpButton } from '../auth/SignUp';
import BoardHeader from '../board/BoardHeader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/dist/server/api-utils';

const LoadingArea=styled.div`
  max-width:823px;
  width:630px;
  min-height:400px;
  background-color:white;
`;

const EditorSSR = dynamic(()=>import('@/components/post/PostEditor'),{ssr:false, loading: () => <LoadingArea></LoadingArea>});


interface IPostInput {
  title:string;
  content:string;
  tag?:string;
}

const PostWriteContainer=styled.div`
    display:flex;
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
  margin-bottom: 12px;
  border: 1px solid #bec3c7;
  border-left:0px;
  font-size:16px;
  border-right:0px;
  box-sizing:border-box;
  &:focus-visible{
    outline-style:none;
  }
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

function post({editMode=false, postData, handleEdit}:{editMode?:boolean,postData?:any, handleEdit?:any}) {
  const router= useRouter()
  const queryClient=useQueryClient()
  const [errorText, setErrorText]=useState('');
  const { register, formState:{errors,isSubmitting}, handleSubmit } = useForm<IPostInput>({mode:'onChange'});
  const ediRef=useRef<any>(null);
  const [content, setContent]=useState(editMode?postData.content:' ')
  // const ViewerSSR =useMemo(()=>dynamic(()=>import("@/components/post/PostViewer"),{ssr:false}),[content]); //테스트코드
  const onSubmit: SubmitHandler<IPostInput> =useCallback(async (e)=>{
    const data={
      title:e.title,
      content:ediRef.current?.getInstance().getMarkdown(),
    }
    const JSONdata = JSON.stringify(data);
    const options = {
      method: editMode?'PUT':'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };
    const apiURL=editMode?`/api/${process.env.NEXT_PUBLIC_VAPI}/post/${postData.postid}`:`/api/${process.env.NEXT_PUBLIC_VAPI}/post`
    
    const response = await fetch(apiURL, options);
      try {
        if(response.ok){
          const result= await response.text()
          switch(response.status){
            case 201:
              router.push(result)
              break;
            case 200:
              queryClient.invalidateQueries(['viewPosts'])
              handleEdit(false)
              router.push(`/post/edit-load-path`)
              setTimeout(()=>{router.push(`/post/${postData.postid}`)},300)
              break;
            default:;
          }
          } else{
            alert("권한이없습니다")
            router.back()
          }
      } catch (error) {
        console.log(error)
      }
  },[]) 
   
    
   
     
    return (
      <>
      {editMode||(<BoardHeader/>)}
      <PostWriteContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
        {editMode||(<TempHeader>{"자유"}게시판 글쓰기</TempHeader>)}
            <PostHeader>
              <StyledLabel >
                <TextField type='text' placeholder='글제목'
                {...register("title",{ value:postData.title, required: "글제목을 입력해주세요" })}></TextField>
              </StyledLabel>
            </PostHeader>

            <EditorSSR content={content} onChange={setContent} editorRef={ediRef} />
             {/* <ViewerSSR content={content} /> 테스트코드 */}
            <SignUpButton type="submit">{editMode?'글수정하기':'글쓰기'}</SignUpButton>
        </form>
        {editMode||(<PostBottom>
          
        </PostBottom>)}
      </PostWriteContainer>
      </>
    );
}

export default post;

const TempHeader= styled.div`
  margin-top:18px;
  margin-bottom:18px;
  font-size:20px;
`