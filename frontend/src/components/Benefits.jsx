import React from 'react';
import { benefits, whyChooseUs } from '../mock';
import { Zap, Target, Shield, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const iconMap = {
  Zap: Zap,
  Target: Target,
  Shield: Shield,
  TrendingUp: TrendingUp
};

export const Benefits = () => {
  return (
    <section id="benefits" className="dark-full-container py-32">
      <div className="dark-content-container">
        {/* Benefits Section */}
        <div className="text-center mb-20">
          <h2 className="display-large mb-6">
            Por que escolher a <span className="gradient-text">RW Estratégia Digital</span>?
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Resultados comprovados e soluções que transformam negócios
          </p>
        </div>
        
        {/* Why Choose Us Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {whyChooseUs.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <Card 
                key={index} 
                className="bg-bg-secondary border-border-subtle card-hover text-center"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 p-3 bg-brand-primary/10 rounded-full w-fit">
                    <IconComponent size={32} className="text-brand-primary" />
                  </div>
                  <CardTitle className="heading-3">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-small text-text-secondary">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Benefits Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Sites Benefits */}
          <div>
            <h3 className="heading-2 mb-8 text-center">
              Benefícios dos <span className="gradient-text">Sites</span>
            </h3>
            <div className="space-y-4">
              {benefits.sites.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle 
                    size={24} 
                    className="text-brand-primary mt-1 flex-shrink-0" 
                  />
                  <p className="body-medium text-text-secondary">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* AI Benefits */}
          <div>
            <h3 className="heading-2 mb-8 text-center">
              Benefícios da <span className="gradient-text">IA de WhatsApp</span>
            </h3>
            <div className="space-y-4">
              {benefits.ai.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle 
                    size={24} 
                    className="text-brand-primary mt-1 flex-shrink-0" 
                  />
                  <p className="body-medium text-text-secondary">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};