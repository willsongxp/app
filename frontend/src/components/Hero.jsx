import React from 'react';
import Spline from '@splinetool/react-spline';
import { companyInfo } from '../mock';
import { ArrowRight, Zap } from 'lucide-react';

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="dark-full-container min-h-screen flex items-center relative overflow-hidden">
      <div className="dark-content-container flex items-center justify-between w-full">
        {/* Left side - Content */}
        <div className="flex-1 pr-12">
          <div className="max-w-2xl">
            <h1 className="display-huge mb-8">
              {companyInfo.tagline}
            </h1>
            
            <p className="body-large mb-12 text-text-secondary">
              {companyInfo.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button 
                onClick={scrollToContact}
                className="btn-primary dark-button-animate"
              >
                <Zap size={20} />
                Solicite seu projeto agora
                <ArrowRight size={20} />
              </button>
              
              <button 
                onClick={scrollToServices}
                className="btn-secondary dark-button-animate"
              >
                Ver nossos serviços
              </button>
            </div>
            
            {/* Key stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="display-medium gradient-text mb-2">80%</div>
                <div className="body-small text-text-muted">Economia em custos</div>
              </div>
              <div className="text-center">
                <div className="display-medium gradient-text mb-2">24/7</div>
                <div className="body-small text-text-muted">Disponibilidade</div>
              </div>
              <div className="text-center">
                <div className="display-medium gradient-text mb-2">150%</div>
                <div className="body-small text-text-muted">+ Conversões</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Spline 3D Animation */}
        <div className="flex-1 flex justify-center items-center">
          <div 
            className="relative"
            style={{ 
              width: "700px", 
              height: "700px", 
              overflow: "visible"
            }}
          >
            <Spline 
              scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode"
            />
          </div>
        </div>
      </div>
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-bg-primary to-brand-primary/5 pointer-events-none"></div>
    </section>
  );
};