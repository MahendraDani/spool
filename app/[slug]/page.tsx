import { WorkspacePageClient } from "@/components/workspace/workspace-page-client";

// @Param slug - workspace slug
export default async function Page({params} : {params : Promise<{
  slug : "string"
}>}){
  const {slug} = await params;
  return <WorkspacePageClient activeWorkspaceSlug={slug}/>
}