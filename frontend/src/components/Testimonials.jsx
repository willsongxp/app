import React from 'react';
import { testimonials } from '../mock';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="dark-full-container py-32">
      <div className="dark-content-container">
        <div className="text-center mb-20">
          <h2 className="display-large mb-6">
            O que nossos <span className="gradient-text">clientes</span> dizem
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Depoimentos reais de empresas que transformaram seus resultados conosco
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="bg-bg-secondary border-border-subtle card-hover relative"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <Quote size={32} className="text-brand-primary mb-4" />
                  <p className="body-medium text-text-secondary italic">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="heading-3 text-white mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="body-small text-text-muted">
                      {testimonial.company}
                    </p>
                  </div>
                  
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="text-brand-primary fill-current" 
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};