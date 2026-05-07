// Vercel Serverless Function to handle email notifications
// You will need a service like Resend (resend.com) to send actual emails.
// Add your RESEND_API_KEY to your Vercel Environment Variables.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, usn, branch, phone } = req.body;

  console.log(`New Registration: ${name} (${email})`);

  try {
    // Using Resend API to send real emails
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer re_NRz21SUW_6PwTYxw2R4LGGtc1ArzFWF41',
      },
      body: JSON.stringify({
        from: 'IC2ST-27 Conference <onboarding@resend.dev>',
        to: [email, 'ashwath.m.2023.ece@atria.edu'],
        subject: 'Registration Confirmed: IC2ST-27 Conference',
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #b31b1b; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">IC2ST-27</h1>
              <p style="color: #fca5a5; margin: 10px 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">International Conference</p>
            </div>
            
            <div style="padding: 40px; background-color: #ffffff;">
              <h2 style="color: #b31b1b; margin-top: 0; font-size: 24px;">Registration Confirmed</h2>
              <p style="font-size: 16px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
              <p style="font-size: 16px; line-height: 1.6;">Congratulations! Your registration for the <strong>International Conference on Intelligence Computing, Communication and Sustainable Technologies (IC2ST-27)</strong> has been successfully received.</p>
              
              <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="margin-top: 0; color: #111827; font-size: 18px; border-bottom: 2px solid #b31b1b; padding-bottom: 10px; display: inline-block;">Candidate Information</h3>
                <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; width: 100px;"><strong>USN:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${usn}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Branch:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${branch}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #111827;">${phone}</td>
                  </tr>
                </table>
              </div>
              
              <p style="font-size: 15px; line-height: 1.6; color: #4b5563;">Further instructions regarding the conference schedule, venue details, and participation certificates will be shared with you via this email address as we approach the event date.</p>
              
              <div style="margin-top: 40px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                <p style="margin: 0; font-size: 14px; color: #111827;">Best Regards,</p>
                <p style="margin: 5px 0 0; font-size: 16px; font-weight: 700; color: #b31b1b;">Organizing Committee, IC2ST-27</p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">Atria Institute of Technology, Bangalore</p>
              </div>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6;">
              <p style="margin: 0;">This is an automated notification. Please do not reply directly to this email.</p>
            </div>
          </div>
        `,
      }),
    });

    const result = await response.json();
    console.log('Email sent:', result);

    return res.status(200).json({ message: 'Notifications sent' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send notifications' });
  }
}
