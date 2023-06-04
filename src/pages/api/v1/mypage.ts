import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, hasCookie, setCookie } from 'cookies-next';

const LOGINAPIURL='/user/mypage'
const APIURL= `${process.env.APIENDPOINT}${LOGINAPIURL}` as string
type Data = {
    data:any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    const seesionIDcookie = `sid=${getCookie('sid',{req,res}) as string}`;
    if (req.method === 'GET') {
        const options = {
          method:'get',
          headers:{
            cookie:seesionIDcookie
          }
          
        };
        try {
          const response = await fetch(APIURL, options);
          try {
            if(response?.ok)
            {
              const result = await response.json();
              res.status(200).json(result);
            }else{
              console.log("백엔드 인증실패")
              res.status(401).end()
            }
           
          } catch (error) {
              console.log(error,'데이터 파싱에러')
              res.status(401).end()
          }
          
          
        } catch (error) {console.log('뭔가의 에러')}
        
    }
    
  
}