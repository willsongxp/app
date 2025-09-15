import React from 'react';
import { companyInfo } from '../mock';
import { Instagram, MessageCircle } from 'lucide-react';

export const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="dark-header">
      <div className="flex items-center">
        <img 
          src={companyInfo.logo} 
          alt={companyInfo.name}
          className="dark-logo"
        />
        <span className="ml-4 text-xl font-semibold text-white">
          {companyInfo.name}
        </span>
      </div>
      
      <nav className="dark-nav">
        <button 
          onClick={() => scrollToSection('services')}
          className="dark-nav-link"
        >
          Serviços
        </button>
        <button 
          onClick={() => scrollToSection('benefits')}
          className="dark-nav-link"
        >
          Benefícios 
        </button>
        <button 
          onClick={() => scrollToSection('testimonials')}
          className="dark-nav-link"
        >
          Depoimentos
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className="dark-nav-link"
        >
          Contato
        </button>
        
        <div className="flex items-center gap-4 ml-8">
          <a 
            href={companyInfo.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-primary transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a 
            href={companyInfo.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle size={18} />
            Fale Conosco
          </a>
        </div>
      </nav>
    </header>
  );
};