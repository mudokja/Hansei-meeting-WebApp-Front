import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
  if(request.cookies.has('sid')){
    const cookie= `sid=${request.cookies.get('sid')?.value}`;
    const option ={
            method:'GET',
            headers:{
              cookie,
            },
          }
    const apiURL=`${process.env.URL}/api/${process.env.NEXT_PUBLIC_VAPI}/login`
  try{
    const res = await fetch(apiURL,option);
    
    if(res.status===200){
      return NextResponse.redirect(new URL('/mainpage', request.url));
    }
    if(res.status===401){
      console.log('로그인 인증실패')
      const response = NextResponse.next();
      response.cookies.delete('sid');
      return response;
    }
  }catch{}
    
  };
  
}

export const config = {
    matcher: ['/login/:path*'],
  };