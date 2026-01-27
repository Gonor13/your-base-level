import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Обрабатываем события Base
  const body = await request.json()
  console.log('Webhook received:', body)
  return NextResponse.json({ success: true }, { status: 200 })
}
