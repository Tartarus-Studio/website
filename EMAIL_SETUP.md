# Email Configuration Guide

This guide explains how to configure email functionality for the Tartarus Studio website.

## Supported Email Providers

### Custom SMTP Provider
```env
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```
 
## Environment Variables Explained

- `STUDIO_MAIL_TO`: Where contact form submissions will be sent
- `SMTP_HOST`: Your email provider's SMTP server
- `SMTP_PORT`: Usually 587 for TLS or 465 for SSL
- `SMTP_SECURE`: Set to "true" if using port 465 (SSL)
- `SMTP_USER`: Your email address for authentication
- `SMTP_PASS`: Your email password or app password

## Testing Email Functionality

1. Configure your `.env` file with valid SMTP settings
2. Start the backend: `npm run dev`
3. Open the frontend in your browser
4. Fill out the contact form and submit
5. Check the destination email for the message

## Security Features

- **Honeypot Protection**: Hidden field to catch bots
- **Rate Limiting**: Prevents spam abuse
- **Input Validation**: Uses Zod for data validation
- **CORS Protection**: Restricts API access to allowed origins

## Troubleshooting

### Common Issues:
1. **"Authentication failed"**: Check username/password
2. **"Connection refused"**: Verify SMTP host and port
3. **"TLS/SSL errors"**: Try toggling `SMTP_SECURE` setting
4. **Gmail "Less secure apps"**: Use App Password instead

### Debug Steps:
1. Check server logs in terminal
2. Verify environment variables are loaded
3. Test with a simple email provider first
4. Check firewall/network restrictions
