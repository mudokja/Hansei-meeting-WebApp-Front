import { Viewer } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';


type Props = {
    content:string,

};
const ViewerSSR =dynamic(()=>import("@toast-ui/react-editor").then((mod)=>mod.Viewer) ,{ssr:false});
function PostViewer({content=''}:Props) {
    
    return (
        <ViewerWapper>
            <ViewerSSR initialValue={content}/>
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