import { Post } from "@/components/board/PartBoard"
import { useQuery, useQueryClient } from "@tanstack/react-query"



export async function getPostsData(pageNumber:number|null|undefined, count:number|null|undefined){
    const APIURL=`${process.env.NEXT_PUBLIC_URL}/api/${process.env.NEXT_PUBLIC_VAPI}/post?pages=${pageNumber||1}${count&&`&licf=${count}`}`
    const response = await fetch(APIURL)
    try {
        if(response.ok){
            const result = await response.json()
            return result   
        }else{
            throw new Error()
        }
    } catch (error) {
        console.log("에러")
    }
    
  }

export const useGetPostsData = ({pageNumber, count}:{pageNumber?:number|null|undefined, count?:number|null|undefined}):[postsData:any,isLoading:boolean,error:any] =>{
    const queryClient = useQueryClient()
const { data:postsData, isLoading, isError } = useQuery<Post[]>({queryKey:['viewPosts',pageNumber,count], queryFn:()=>getPostsData(pageNumber,count), staleTime:600000});
  

return [postsData,isLoading,isError];
}