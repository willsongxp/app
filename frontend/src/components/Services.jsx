import React from 'react';
import { services } from '../mock';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export const Services = () => {
  const handleServiceClick = (service) => {
    const whatsappMessage = `Olá! Tenho interesse no serviço ${service.name}. Gostaria de saber mais informações.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=48999376241&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="dark-full-container py-32">
      <div className="dark-content-container">
        <div className="text-center mb-20">
          <h2 className="display-large mb-6">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Soluções completas para transformar sua presença digital e automatizar seu atendimento
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="bg-bg-secondary border-border-subtle card-hover relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-brand-primary text-black font-semibold">
                    <Star size={14} className="mr-1" />
                    POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="heading-2 mb-2">
                  {service.name}
                </CardTitle>
                <CardDescription className="body-medium text-text-secondary">
                  {service.description}
                </CardDescription>
                
                <div className="mt-4">
                  {service.type === 'site' ? (
                    <div className="display-medium gradient-text">
                      {service.price}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="body-small text-text-muted">Setup:</span>
                        <span className="heading-3 text-brand-primary">
                          {service.setupPrice}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="body-small text-text-muted">Mensal:</span>
                        <span className="heading-3 text-brand-primary">
                          {service.monthlyPrice}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check 
                        size={18} 
                        className="text-brand-primary mt-1 flex-shrink-0" 
                      />
                      <span className="body-small text-text-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleServiceClick(service)}
                  className="btn-primary w-full dark-button-animate"
                >
                  Escolher este plano
                  <ArrowRight size={18} />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};