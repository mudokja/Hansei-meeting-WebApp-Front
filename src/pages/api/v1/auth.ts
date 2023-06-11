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
      //회원정보
      if (req.method === 'POST') {
            const id ={id:req.body.userid};
            const bodyData=JSON.stringify(id)
            const options = {
            method: 'GET',
            headers: {
            },
            };
            try {
            const response = await fetch(`${APIURL}?userid=${id.id as string}`, options);

            try {
                if(response.ok)
                {
                    const result = await response.json();
                    res.status(200).end()
                    console.log(result.userpw)
                }else{
                const result = await response.json();
        
                console.log(result," 백엔드 요청에러")
                res.status(404).end()
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
          } else {
          console.log("비정상접근");
          res.status(400).end()
          
        }
    
  }