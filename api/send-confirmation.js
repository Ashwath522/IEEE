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
        from: 'IC2ST-27 <onboarding@resend.dev>', // Note: Resend requires a verified domain or using their test email
        to: [email, 'ashwath.m.2023.ece@atria.edu'], // Sending to user and your professional email
        subject: 'Registration Confirmed - IC2ST-27',
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #b31b1b; padding: 20px; text-align: center;">
              <h1 style="color: #fff; margin: 0;">IC2ST-27</h1>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #b31b1b;">Registration Successful!</h2>
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for registering for the International Conference on Intelligence Computing, Communication and Sustainable Technologies (IC2ST-27).</p>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Your Details:</h3>
                <p style="margin: 5px 0;"><strong>USN:</strong> ${usn}</p>
                <p style="margin: 5px 0;"><strong>Branch:</strong> ${branch}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
              </div>
              <p>We look forward to seeing you at <strong>Atria Institute of Technology</strong>!</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #666;">
              <p>&copy; 2027 IC2ST-27 Conference Committee</p>
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
