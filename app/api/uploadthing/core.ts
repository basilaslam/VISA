import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "4MB",maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
        const session = await getServerSession(authOptions)
        const user = session?.user
      // If you throw, the user will not be able to upload
      if(!user || !user._id) throw new Error("Unauthorized")
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: user._id};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
 
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;