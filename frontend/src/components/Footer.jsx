import React from 'react';
import { companyInfo } from '../mock';
import { Instagram, MessageCircle, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="dark-full-container py-16 bg-bg-secondary border-t border-border-subtle">
      <div className="dark-content-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={companyInfo.logo} 
                alt={companyInfo.name}
                className="h-8 mr-3"
              />
              <span className="heading-3 text-white">
                {companyInfo.name}
              </span>
            </div>
            <p className="body-medium text-text-secondary mb-6 max-w-md">
              Transformamos negócios através da tecnologia, criando sites que vendem e IAs que convertem. 
              Sua presença digital de impacto começa aqui.
            </p>
            <div className="flex gap-4">
              <a 
                href={companyInfo.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-black transition-all duration-300 rounded-lg"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={companyInfo.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-black transition-all duration-300 rounded-lg"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href={`mailto:${companyInfo.contact.email}`}
                className="p-2 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-black transition-all duration-300 rounded-lg"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="heading-3 text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="body-medium text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="body-medium text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Benefícios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="body-medium text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Depoimentos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="body-medium text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="heading-3 text-white mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li className="body-medium text-text-secondary">Sites Institucionais</li>
              <li className="body-medium text-text-secondary">Sites E-commerce</li>
              <li className="body-medium text-text-secondary">IA WhatsApp Iniciante</li>
              <li className="body-medium text-text-secondary">IA WhatsApp Pro</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle text-center">
          <p className="body-small text-text-muted">
            © {currentYear} {companyInfo.name}. Todos os direitos reservados.
          </p>
          <p className="body-small text-text-muted mt-2">
            Feito com <Heart size={16} className="inline text-brand-primary" /> para transformar negócios
          </p>
        </div>
      </div>
    </footer>
  );
};