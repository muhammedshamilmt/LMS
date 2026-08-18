import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
        })

        return Response.json({ token, expire, signature, publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY })
    } catch (error) {
        console.error("Failed to generate upload auth params:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
