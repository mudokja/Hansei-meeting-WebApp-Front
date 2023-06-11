import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';

const POSTAPIURL='/post'
const APIURL= `${process.env.APIENDPOINT}${POSTAPIURL}` as string
type Data = {

    // succeed:boolean
    // result?:any,
    // user?:{
    //   userId?:number,
    //   username:string,
    // }
    // error?:string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) 
  {
    const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
    const {id} =req.query  
    console.log("게시글요청");
      // console.log(reqDataJSON)
      // if(req.headers.location){
      //   res.redirect(req.headers.location)
      // }
      if (req.method === 'GET'){
        
        console.log('게시글보기')
            const options = {
              method:'get',
              headers:{
              }
              
            };
            try {
              
              const response = await fetch(`${APIURL}/${id}`, options);
              try {
                if(response.ok)
                {
                  const result = await response.json();
                  if(result.succeed){
                    console.log(result)

                    const passResult= {
                      postid:result.data._id,
                      author:result.data["작성자"],
                      title:result.data["제목"],
                      date: result.data["날짜"],
                      content:result.data['내용']
                    }
                    res.status(200).json(passResult);
                  }
                  res.status(404).end()
                }else{
                  res.status(401).end();
                }
              } catch (error) {
                  console.log(error,'데이터 파싱에러')
                  res.status(401).end()
              }
              
            
            } catch (error) {}
          }else if(req.method==='DELETE'){
          console.log("게시글 삭제응답")
          const options = {
            method:'DELETE',
            headers:{
              cookie:seesionIDcookie
            }
            
          };
          try {
            const response = await fetch(`${APIURL}/${id}`, options);
            try {
              if(response.ok)
              {
                console.log("게시글 삭제성공")
                res.status(200).end()
              }else{
                console.log("게시글삭제실패 ")
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