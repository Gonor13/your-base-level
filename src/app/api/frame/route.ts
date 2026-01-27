import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body
    
    // Если пользователь нажал кнопку - перенаправляем на главную
    return NextResponse.json({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: `${process.env.NEXT_PUBLIC_URL || 'https://your-base-level.vercel.app'}/frame-image.png`,
        buttons: [
          {
            label: 'Launch Your Base Level',
            action: 'post_redirect',
          },
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
        image: `${process.env.NEXT_PUBLIC_URL || 'https://your-base-level.vercel.app'}/frame-image.png`,
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
    message: 'Frame API is working',
    frame: {
      version: 'vNext',
      image: `${process.env.NEXT_PUBLIC_URL || 'https://your-base-level.vercel.app'}/frame-image.png`,
      buttons: [
        {
          label: 'Check My Base Level',
          action: 'post',
        },
      ],
    }
  })
}
