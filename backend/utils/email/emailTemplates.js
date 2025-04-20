export function getResetPasswordEmail(link) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Reset Your Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #0b192c; color: #ffffff; padding: 2rem; text-align: center;">
        <div style="max-width: 500px; margin: auto; background-color: #1e3e62; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
          <h1 style="color: #ff6500;">Reset Your Password</h1>
          <p style="font-size: 1rem; line-height: 1.5; margin: 1.5rem 0;">
            We received a request to reset your password. Click the button below to choose a new one.
          </p>
          <a href="${link}" style="display: inline-block; margin-top: 1rem; background-color: #ff6500; color: #fff; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 5px; font-weight: bold;">
            Reset Password
          </a>
          <p style="margin-top: 2rem;">If you didn’t request this, you can safely ignore this email.</p>
          <div style="margin-top: 2rem; font-size: 0.85rem; color: #ccc;">
            &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
}
