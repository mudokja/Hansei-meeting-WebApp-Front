import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';

const LOGINAPIURL='/post'
const APIURL= `${process.env.APIENDPOINT}${LOGINAPIURL}` as string
type Data = {

    // succeed:boolean
    // result?:any,
    // user?:{
    //   userId?:number,
    //   username:string,
    // }
    // error?:string
}

function parsingDate(dateString:string){
  const now = new Date();
  const postDate=Date.parse(dateString)
if (!isNaN(postDate)) {
    const isToday = new Date(postDate).toISOString().slice(0, 10) === now.toISOString().slice(0, 10);
    
    const formattedDate = isToday
    ? new Date(postDate).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' })
    : new Date(postDate).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' });
    return formattedDate
}else{
    return dateString;
}
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) 
  {
    const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
      // console.log(reqDataJSON)
      
      if (req.method === 'GET'){
          const {pages,licf} =req.query 
            const options = {
              method:'get',
              headers:{
              }
              
            };
            try {
              
              const response = await fetch(`${APIURL}?page=${pages ||1}&listcount=${licf ||20}`, options);
              try {
                if(response.ok)
                {
                  const result = await response.json();
                    const passResult:any[]= result.data.map((post:any)=>{
                     return {postid:post._id,
                      author:post["작성자"],
                      title:post["제목"],
                      date:parsingDate(post["날짜"]),
                      content:post['내용'],}
                    })
                    res.status(200).json(passResult);
                  }
                    
              } catch (error) {
                  console.log(error,'데이터 요청에러')
                  res.status(401).end()
              }
              
            
            } catch (error) {console.log(error, "게시글 요청에러"), res.status(400).end()}
        } else 
        if (req.method === 'POST') {
            const {title,content} = req.body;
            const date =new Date().toISOString()
            console.log(date)
            const reqFormData= new URLSearchParams();
            reqFormData.append('title',title)
            reqFormData.append('date',date)
            reqFormData.append('content',content)
            const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                cookie:seesionIDcookie
            },
            body: reqFormData,
            };
            try {
            const response = await fetch(`${APIURL}`, options);
            try {
                if(response.ok)
                {
                    const result = await response.json();
                    console.log('글쓰기 성공')
                    res.status(201).json({url:'/post/'+result.postId})
                
                }else{
                const result = await response.json();
        
                console.log(result," 백엔드 요청에러")
                res.status(401).end()
                }
            } catch (error) {
                console.log(error,'데이터 파싱에러')
                res.status(401).end()
            }
            
            
            } catch (error) {
            console.log(error,"백엔드 연결 실패")
            if(process.env.NODE_ENV=='development'){
                console.log("임시데이터 반환")
            }else{
                    res.status(401).end()
                }
                }
          }else if(req.method==='DELETE'){
            res.status(405).end()
            return;
          const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
          const options = {
            method:'DELETE',
            headers:{
              cookie:seesionIDcookie
            }
            
          };
          try {
            const response = await fetch(APIURL, options);
            try {
              if(response.ok)
              {
             
              }else{
                res.status(404).end();
              }
            } catch (error) {
                console.log('데이터 파싱에러')
                res.status(401).end()
            }
        } catch{res.status(404).end();}
      } else {
          console.log("비정상접근");
          res.status(400).end()
          
        }
    
  }