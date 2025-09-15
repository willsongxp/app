from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import yagmail
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import asyncio
from concurrent.futures import ThreadPoolExecutor


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email configuration
ADMIN_EMAIL = "testgyminspirebyaquiles@gmail.com"

# Thread pool for email sending
executor = ThreadPoolExecutor(max_workers=3)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service: str
    message: str
    status: str = "new"  # new, contacted, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    service: str = Field(..., min_length=1, max_length=100)
    message: str = Field(..., min_length=10, max_length=1000)


# Email sending function
def send_contact_email(contact_data: dict):
    """Send contact form email using yagmail"""
    try:
        # Create email content
        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #00FFD1; border-bottom: 2px solid #00FFD1; padding-bottom: 10px;">
                    Nova Solicitação - RW Estratégia Digital
                </h2>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Dados do Cliente:</h3>
                    <p><strong>Nome:</strong> {contact_data['name']}</p>
                    <p><strong>E-mail:</strong> {contact_data['email']}</p>
                    <p><strong>WhatsApp:</strong> {contact_data['phone']}</p>
                    <p><strong>Serviço de Interesse:</strong> {contact_data['service']}</p>
                </div>
                
                <div style="background: #fff; padding: 20px; border-left: 4px solid #00FFD1; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #333;">Mensagem:</h3>
                    <p style="line-height: 1.6;">{contact_data['message']}</p>
                </div>
                
                <div style="margin-top: 30px; padding: 15px; background: #e8f5ff; border-radius: 8px;">
                    <p style="margin: 0; font-size: 14px; color: #666;">
                        <strong>Enviado em:</strong> {contact_data['created_at'].strftime('%d/%m/%Y às %H:%M')}
                    </p>
                    <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">
                        <strong>ID da Solicitação:</strong> {contact_data['id']}
                    </p>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <a href="https://api.whatsapp.com/send?phone=48999376241&text=Olá! Vi sua solicitação de {contact_data['name']} e gostaria de conversar sobre o projeto." 
                       style="display: inline-block; padding: 12px 24px; background: #00FFD1; color: #000; text-decoration: none; border-radius: 4px; font-weight: bold;">
                        Responder via WhatsApp
                    </a>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Simple text fallback
        text_content = f"""
        Nova Solicitação - RW Estratégia Digital
        
        Nome: {contact_data['name']}
        E-mail: {contact_data['email']}
        WhatsApp: {contact_data['phone']}
        Serviço: {contact_data['service']}
        
        Mensagem:
        {contact_data['message']}
        
        Enviado em: {contact_data['created_at'].strftime('%d/%m/%Y às %H:%M')}
        ID: {contact_data['id']}
        """
        
        # Configure yagmail with Gmail
        # Note: For production, use environment variables for email credentials
        yag = yagmail.SMTP('testgyminspirebyaquiles@gmail.com')
        
        yag.send(
            to=ADMIN_EMAIL,
            subject=f"Nova Solicitação: {contact_data['service']} - {contact_data['name']}",
            contents=[text_content, html_content]
        )
        
        return True
        
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
        return False


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "RW Estratégia Digital API - Running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact")
async def submit_contact_form(contact_input: ContactSubmissionCreate):
    try:
        # Create contact submission object
        contact_dict = contact_input.dict()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Save to database
        await db.contact_submissions.insert_one(contact_obj.dict())
        
        # Send email in background
        loop = asyncio.get_event_loop()
        email_sent = await loop.run_in_executor(
            executor, 
            send_contact_email, 
            contact_obj.dict()
        )
        
        if email_sent:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Formulário enviado com sucesso! Entraremos em contato em breve.",
                    "id": contact_obj.id
                }
            )
        else:
            # Even if email fails, we saved to database
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Formulário enviado com sucesso! Entraremos em contato em breve.",
                    "id": contact_obj.id,
                    "note": "Email notification may be delayed"
                }
            )
            
    except Exception as e:
        logging.error(f"Contact form submission error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erro interno do servidor. Tente novamente mais tarde."
        )

@api_router.get("/contact-submissions", response_model=List[ContactSubmission])
async def get_contact_submissions(skip: int = 0, limit: int = 100):
    """Get contact submissions (for admin use)"""
    try:
        submissions = await db.contact_submissions.find().skip(skip).limit(limit).to_list(limit)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao buscar dados")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
