import { Viewer } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';


type Props = {
    content:string,
};



function PostViewer({content=''}:Props) {
    const [newContent, setNewContent]=useState(content)
    const plz=useRef<any>(null)
    useEffect(()=>{
        console.log(plz.current)
        plz.current.getInstance().setMarkdown(content)
    },[content])
    // const viewUpdate=()=>{
        
    // }
    return (
        <ViewerWapper>
            <Viewer initialValue={content} ref={plz} />
        </ViewerWapper>
    );
}

export default PostViewer;

const ViewerWapper =styled.div`
    width:100%;
    min-height:40vh;
    border:2px solid;
    border-color:gray;
    border-left:0px;
    border-right:0px;   
`