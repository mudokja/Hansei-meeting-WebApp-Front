import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';

const LOGINAPIURL='/user/login'
const APIURL= `${process.env.APIENDPOINT}${LOGINAPIURL}` as string
type Data = {

    succeed:boolean
    result?:any,
    user?:{
      userId?:number,
      username:string,
    }
    error?:string
}
const TestSessionId="oefwhahiaefhiefohieawfioawe9228983gweu"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    console.log("인증 요청받음");
    // console.log(reqDataJSON)
    if (req.method === 'GET'){
      const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
          const options = {
            method:'get',
            headers:{
              cookie:seesionIDcookie
            }
            
          };
          try {
            const response = await fetch(APIURL, options);
            try {
              if(response.ok)
              {
                const result = await response.json();
                if(result.succeed){
                  res.status(200).end();
                }
                  
              }else{
                console.log('로그인 확인실패')
                res.status(401).end();
              }
            } catch (error) {
                console.log(error,'데이터 파싱에러')
                res.status(401).end()
            }
            
          
          } catch (error) {}
      } else if (req.method === 'POST') {
      console.log(req.body)
      console.log(req.cookies)
      const {username, password} = req.body;
      let reqFormData= new URLSearchParams();
      reqFormData.append('id',username);
      reqFormData.append('pw',password)
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: reqFormData,
      };
      try {
        const response = await fetch(APIURL, options);
        try {
          if(response.ok)
          {
            console.log("로그인성공")
            const result = await response.json();
            res.setHeader('set-cookie', response.headers.get('set-cookie') as string)
            if(result.message==='정상로그인'){
              res.redirect(201,'/mainpage')
              console.log(`${result.id} 로그인함`)
            }else{
              console.log('뭔가의 오류')
              res.status(401).end()
              deleteCookie('sid',{req,res})
              console.log(result)
            }
            
          }else{
            const result = await response.json();
            console.error(result)
            res.status(401).end()
            console.log(result," 백엔드 요청에러")
          }
        } catch (error) {
            console.log(error,'데이터 파싱에러')
            res.status(401).end()
        }
        
      
      } catch (error) {
        console.log(error,"백엔드 연결 실패")
        if(process.env.NODE_ENV=='development'){
          console.log("임시데이터 반환")
          if(!(req.cookies?.sid)){
            if (username=='admin'&&password=='test'){
              setCookie('sid',TestSessionId,{req,res, httpOnly:true, maxAge:65536})
              res.redirect(201,'/mainpage')
              
            }else{
              res.status(401).end()
            }
          }else{
            if(req.cookies?.sid==TestSessionId){
              res.redirect(201,'/mainpage')
            }else{
              res.status(401).end()
            }
          }
        }
        
        
      }

      } else if(req.method==='DELETE'){
        console.log("삭제응답")
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
              if(response.status===204){
                deleteCookie('sid', {req,res})
                res.status(204).end();
              }
                
            }else{
              console.log('로그아웃 실패')
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