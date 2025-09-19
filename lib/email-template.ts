export const getRegistrationEmailTemplate = (
  name: string,
  rollNo: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to NOTxRASA</title>
      <style>
        body { font-family: 'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #2d0b0b 0%, #f8fafc 100%); color: #22223b; margin: 0; padding: 0; }
        .container { background: #fff; border-radius: 20px; padding: 48px 32px; max-width: 650px; margin: 40px auto; box-shadow: 0 12px 32px rgba(220, 38, 38, 0.10), 0 2px 8px rgba(220, 38, 38, 0.08); border: 1px solid #e2e8f0; }
        .header { text-align: center; margin-bottom: 36px; }
        .social-links a.whatsapp {
          color: #25D366;
          font-weight: bold;
        }

        .whatsapp-text {
          color: #25D366; /* WhatsApp green */
          font-weight: 600;
        }
        .logo { width: 110px; height: 110px; margin: 0 auto 18px; border-radius: 50%; overflow: hidden; border: 4px solid #dc2626; box-shadow: 0 4px 16px rgba(220, 38, 38, 0.15); background: #f3f4f6; }
        .logo img { width: 100%; height: 100%; object-fit: cover; }
        .title { font-size: 34px; font-weight: 700; margin: 0; background: linear-gradient(135deg, #dc2626 0%, #000 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .subtitle { color: #b91c1c; font-size: 20px; margin: 10px 0 0 0; font-weight: 500; }
        .content { margin: 30px 0; }
        .welcome-section { background: linear-gradient(135deg, #dc2626 0%, #000 100%); color: white; padding: 32px; border-radius: 16px; text-align: center; margin: 32px 0; box-shadow: 0 4px 16px rgba(220, 38, 38, 0.18); }
        .welcome-section h2 { margin: 0 0 12px 0; font-size: 26px; font-weight: bold; letter-spacing: 1px; }
        .welcome-section p { margin: 0; opacity: 0.97; font-size: 17px; }
        .details-card { background: #f8fafc; padding: 28px; border-radius: 14px; margin: 28px 0; border-left: 5px solid #dc2626; }
        .details-card h3 { margin-top: 0; color: #1e293b; font-size: 19px; font-weight: 700; }
        .detail-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
        .detail-item:last-child { border-bottom: none; }
        .detail-label { font-weight: 600; color: #b91c1c; }
        .detail-value { color: #1e293b; font-weight: 500; }
        .footer { text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #e2e8f0; color: #b91c1c; }
        .footer-logo { font-size: 26px; font-weight: bold; background: linear-gradient(135deg, #dc2626 0%, #000 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
        .social-links { margin: 22px 0; }
        .social-links a { display: inline-block; margin: 0 18px; font-size: 22px; text-decoration: none; transition: transform 0.2s; }
        .social-links a.instagram { color: #e1306c; }
        .social-links a.linkedin { color: #0a66c2; }
        .social-links a:hover { transform: scale(1.15); }
        .disclaimer { font-size: 13px; color: #b91c1c; margin-top: 22px; line-height: 1.5; }
        @media (max-width: 650px) { .container { padding: 18px; } .title { font-size: 24px; } .welcome-section { padding: 16px; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">Welcome to NOTxRASA!</h1>
          <p class="subtitle">Thank you for registering</p>
        </div>
        <div class="content">
          <p style="font-size: 17px; color: #b91c1c;">Dear ${name},</p>
          <div class="welcome-section">
            <h2>Registration Successful!</h2>
            <p>Thank you for registering with NOTxRASA. We will contact you if your work looks good to us!</p>
          </div>
        </div>
        <div class="footer">
          <div class="footer-logo">NOTxRASA</div>
          <p style="font-weight: 600; color: #b91c1c; margin: 5px 0;">We bring togetherness out of nothingness</p>
          <div class="social-links">
            <a href="https://instagram.com/notxrasa" class="instagram" target="_blank">Instagram</a>
            <a href="https://linktr.ee/notxrasa" class="linktree" target="_blank">LinkTree</a>
            <a href="https://chat.whatsapp.com/Cxo9JP2Vx4R0ZuxEXYXEvk?mode=ems_copy_t" 
                 class="whatsapp" target="_blank">Whatsapp</a>
          </div>
          <div class="whatsapp-text">
              <p>Join our Whatsapp group for the further communications</p>
          </div>
          <div class="disclaimer">
            <p><strong>Important Notes:</strong></p>
            <p>• Keep this email for your records</p>
            <br>
            <p>This is an automated confirmation email. Please do not reply directly to this message. For any inquiries, use the contact information provided above.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

};





