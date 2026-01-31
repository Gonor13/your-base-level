import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Check if it's a frame request
    const buttonIndex = body.untrustedData?.buttonIndex || 1
    
    return NextResponse.json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: `${process.env.NEXT_PUBLIC_URL || 'https://your-base-level.vercel.app'}/og-image.png`,
        buttons: [
          {
            label: 'Check My Level',
            action: 'post',
          },
          {
            label: 'Open App',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_URL || 'https://your-base-level.vercel.app'}`,
          }
        ],
        postUrl: `${process.env.NEXT_PUBLIC_URL || 'https://your-base-level.vercel.app'}/api/frame`,
      },
    })
  } catch (error) {
    console.error('Frame API error:', error)
    return NextResponse.json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: `${process.env.NEXT_PUBLIC_URL || 'https://your-base-level.vercel.app'}/og-image.png`,
        buttons: [
          {
            label: 'Try Again',
            action: 'post',
          },
        ],
      },
    })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Frame endpoint for Your Base Level',
    instructions: 'POST to this endpoint with frame data',
  })
}
