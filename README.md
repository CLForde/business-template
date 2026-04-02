# Website Template Instructions

## How to create your website

1. Copy `data/clients/template.ts`
2. Rename it to your business name:
   Example:
   barima-venture.ts

3. Fill in your business details:
   - Name
   - Phone
   - WhatsApp
   - Services
   - Images

4. Add your images to:
   /public/images/

5. Register your client:

Open:
data/getClient.ts

Add:

case 'your-business-name':
return yourFileName;

6. Visit your site:

/your-business-name

## Environment Variables (Optional)

This project currently does NOT require any environment variables.

If you later add features like:

- Contact forms
- Payments
- Authentication

You may need to create a `.env.local` file.

Example:

NEXT_PUBLIC_API_URL=your_api_url_here
