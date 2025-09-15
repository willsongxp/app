# RW Estratégia Digital - Backend Integration Contracts

## Dados Atualmente Mockados (mock.js)

### 1. Contact Form Submission
**Frontend Mock:** `mockFormSubmission(formData)`
**Backend Need:** Real email sending functionality

**Contract:**
- **Endpoint:** `POST /api/contact`
- **Payload:**
```json
{
  "name": "string",
  "email": "string", 
  "phone": "string",
  "service": "string",
  "message": "string"
}
```
- **Response:**
```json
{
  "success": boolean,
  "message": "string",
  "id": "string" (optional)
}
```
- **Backend Action:** Send email to `testgyminspirebyaquiles@gmail.com`

### 2. Services Data (Currently Static)
**Frontend Mock:** Static services array in mock.js
**Backend Need:** Dynamic services management (optional for MVP)

### 3. Testimonials Data (Currently Static)  
**Frontend Mock:** Static testimonials array
**Backend Need:** Dynamic testimonials management (optional for MVP)

## Backend Implementation Plan

### Phase 1: Contact Form Integration (Priority)
1. **MongoDB Model:** Contact submissions
2. **Email Service:** SMTP/SendGrid integration for sending emails
3. **API Endpoint:** POST /api/contact
4. **Validation:** Input sanitization and validation
5. **Error Handling:** Proper error responses

### Phase 2: Admin Dashboard (Future Enhancement)
- Services management
- Testimonials management  
- Contact submissions viewing
- Statistics tracking

## MongoDB Models Required

### ContactSubmission Model
```python
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    message: str
    status: str = "new"  # new, contacted, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

## Frontend Integration Changes

### Remove Mock Dependencies
1. Remove `mockFormSubmission` from mock.js
2. Update ContactForm.jsx to use real API endpoint
3. Add proper error handling for API failures
4. Keep static data (services, testimonials) for now

### API Integration
```javascript
// ContactForm.jsx changes needed
const submitForm = async (formData) => {
  const response = await fetch(`${BACKEND_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  return response.json();
};
```

## Email Configuration Required

### Environment Variables (.env)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=testgyminspirebyaquiles@gmail.com
```

### Email Template
- Professional HTML template
- Include all form data
- Company branding
- Auto-reply to customer (optional)

## Testing Checklist

### Backend Testing
- [ ] Contact form submission saves to database
- [ ] Email sending works correctly
- [ ] Input validation prevents malicious data
- [ ] Error responses are properly formatted
- [ ] CORS configuration allows frontend requests

### Frontend Integration Testing
- [ ] Form submission shows success message
- [ ] Error handling displays appropriate messages
- [ ] Loading states work correctly
- [ ] Toast notifications function properly
- [ ] WhatsApp and Instagram links still work

## Implementation Priority

1. **High Priority:** Contact form backend integration
2. **Medium Priority:** Enhanced error handling and logging
3. **Low Priority:** Admin dashboard for managing content

## Notes

- Keep services and testimonials static for now (good for MVP)
- Focus on contact form as main conversion point
- Ensure email delivery is reliable
- Maintain existing WhatsApp integration (primary CTA)
- All backend routes must use `/api` prefix for proper routing