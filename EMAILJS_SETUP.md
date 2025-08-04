# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form functionality on your portfolio website.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

Hello,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Save the template and note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

## Step 5: Update Configuration

1. Open `src/services/emailService.ts`
2. Replace the placeholder values with your actual EmailJS credentials:

```typescript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Go to the Contact page
3. Fill out and submit the form
4. Check your email to confirm the message was received

## Troubleshooting

- **Form not sending**: Check that all EmailJS credentials are correct
- **CORS errors**: Make sure you're using the correct public key
- **Template variables not working**: Ensure your template uses the exact variable names: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`

## Security Notes

- The public key is safe to include in your frontend code
- EmailJS handles the email sending securely
- No server-side code required
- Free tier allows 200 emails per month

## Alternative Setup

If you prefer not to use EmailJS, you can:

1. Use a different email service (SendGrid, Mailgun, etc.)
2. Set up a simple backend API
3. Use a form service like Formspree or Netlify Forms

The current implementation includes a fallback function that simulates email sending for development purposes. 