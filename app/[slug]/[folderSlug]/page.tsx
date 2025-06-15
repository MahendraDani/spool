export default async function Page({
  params,
}: {
  params: Promise<{ username: "string"; slug: "string"; folderSlug: "string" }>;
}) {
  const {username,slug,folderSlug} = await params;
  // validations for auth, workspace permission and folder permissions
  return (
    <div>
      <p>{username} / {slug} / {folderSlug}</p>
    </div>
  )
}

