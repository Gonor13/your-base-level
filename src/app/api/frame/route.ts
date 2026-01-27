import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: 'https://your-base-level.vercel.app/frame-image.png',
        buttons: [
          {
            label: 'Base Level Checked!',
            action: 'post',
          },
        ],
      },
    })
  } catch (error) {
    console.error('Frame API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Frame API is working',
    instructions: 'POST to this endpoint with Farcaster frame data'
  })
}
