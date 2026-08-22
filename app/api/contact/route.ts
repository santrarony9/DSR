import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the data for now
    console.log('Received contact form submission:', data);

    // TODO: Integrate with Google Sheets API
    // 1. Set up Google Cloud project and enable Sheets API
    // 2. Create a service account and download credentials
    // 3. Share your Google Sheet with the service account email
    // 4. Install googleapis: npm install googleapis
    // 5. Add GOOGLE_SHEETS_ID and GOOGLE_SERVICE_ACCOUNT_KEY to .env

    return NextResponse.json({ success: true, message: 'Message received successfully' });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    );
  }
}
