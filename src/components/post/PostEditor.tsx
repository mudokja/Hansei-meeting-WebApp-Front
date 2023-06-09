import React, { useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import styled from 'styled-components';

const EditorWraper= styled.div`
  width:100%;
`
type Props={
  content:string,
  editorRef:any,
  onChange:Function
}

function PostEditor({content ='', onChange, editorRef}:Props) {
    
    return (
      <EditorWraper className='#Editor'>
      
      <Editor
      initialValue={content}
      previewStyle="vertical"
      placeholder="글을 작성해주세요"
      height="auto"
      minHeight='200px'
      hideModeSwitch={true}
      onChange={()=>onChange(editorRef.current?.getInstance().getMarkdown())}
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      usageStatistics={false}
      ref={editorRef}
      language="ko-KR"
    />
    </EditorWraper>
    );
}

export default PostEditor;