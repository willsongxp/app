import React from 'react';
import { statistics } from '../mock';

export const Statistics = () => {
  return (
    <section className="dark-full-container py-20 bg-bg-secondary">
      <div className="dark-content-container">
        <div className="text-center mb-12">
          <h2 className="display-medium mb-4">
            Resultados que <span className="gradient-text">Comprovam</span>
          </h2>
          <p className="body-large text-text-secondary">
            Números que demonstram o impacto das nossas soluções
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="display-large gradient-text mb-2">
                {stat.number}
              </div>
              <h4 className="heading-3 mb-2 text-white">
                {stat.label}
              </h4>
              <p className="body-small text-text-muted">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};