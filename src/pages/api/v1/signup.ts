import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';

const LOGINAPIURL='/user/join'
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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) 
  {
    const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
      //회원정보
      if (req.method === 'POST') {
            const {email:id,password:pw,studentNumber:studentId,userMajor:department,firstName,lastName} = req.body;
            console.log(req.body)
            const date =new Date().toISOString()
            const reqFormData= new URLSearchParams();
            reqFormData.append('id',id)
            reqFormData.append('pw',pw)
            reqFormData.append('department',department)
            reqFormData.append('studentId',studentId)
            reqFormData.append('firstName',firstName)
            reqFormData.append('lastName',lastName)
            reqFormData.append('creatAt',date)
            const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: reqFormData,
            };
            try {
            const response = await fetch(`${APIURL}`, options);
            try {
                if(response.ok)
                {
                    const result = await response.json();
                    console.log(result.message)
                    res.status(201).redirect('/')
                
                }else{
                const result = await response.json();
        
                console.log(result," 백엔드 요청에러")
                res.status(500).end()
                }
            } catch (error) {
                console.log(error,'데이터 파싱에러')
                res.status(401).end()
            }
            
            
            } catch (error) {
            console.log(error,"백엔드 연결 실패")
            if(process.env.NODE_ENV=='development'){
                console.log("임시데이터 반환")
                res.status(400).end()
            }else{
                    res.status(400).end()
                }
                
                }
          }else if(req.method==='DELETE'){
          console.log("게시글 삭제응답")
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