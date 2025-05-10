// @Param slug - workspace slug
export default async function Page({params} : {params : Promise<{
  username : "string",
  slug : "string"
}>}){
  const {username,slug} = await params;

  // check if the user is auth?
  // check if user is the owner of workspace

  return(
    <div className="container">
      <p>{username}</p>
      <p>{slug}</p>
    </div>
  )
}