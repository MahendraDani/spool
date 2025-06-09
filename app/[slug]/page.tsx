// @Param slug - workspace slug
export default async function Page({params} : {params : Promise<{
  username : "string",
  slug : "string"
}>}){
  const {username,slug} = await params;

  return(
    <div>
      <p>{username}</p>
      <p>{slug}</p>
    </div>
  )
}