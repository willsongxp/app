import React, { useState } from 'react';
import { companyInfo, mockFormSubmission } from '../mock';
import { Send, Mail, MessageCircle, Instagram, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await mockFormSubmission(formData);
      if (result.success) {
        toast({
          title: "Sucesso!",
          description: result.message,
          duration: 5000,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre os serviços da RW Estratégia Digital.";
    const whatsappUrl = `${companyInfo.contact.whatsapp}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="dark-full-container py-32">
      <div className="dark-content-container">
        <div className="text-center mb-20">
          <h2 className="display-large mb-6">
            Pronto para <span className="gradient-text">vender mais</span>?
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Entre em contato conosco e descubra como podemos transformar sua presença digital
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-bg-secondary border-border-subtle">
            <CardHeader>
              <CardTitle className="heading-2 text-center">
                Solicite seu <span className="gradient-text">orçamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Seu WhatsApp"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full"
                  >
                    <option value="">Selecione o serviço de interesse</option>
                    <option value="site-institucional">Site Institucional</option>
                    <option value="site-ecommerce">Site E-commerce</option>
                    <option value="ia-whatsapp-iniciante">IA WhatsApp Iniciante</option>
                    <option value="ia-whatsapp-pro">IA WhatsApp Pro</option>
                    <option value="consultoria">Consultoria Personalizada</option>
                  </select>
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Conte-nos mais sobre seu projeto..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full dark-button-animate"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar solicitação
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-bg-secondary border-border-subtle">
              <CardContent className="p-8 text-center">
                <MessageCircle size={48} className="text-brand-primary mx-auto mb-4" />
                <h3 className="heading-3 mb-4">Fale conosco pelo WhatsApp</h3>
                <p className="body-medium text-text-secondary mb-6">
                  Atendimento rápido e personalizado para esclarecer todas suas dúvidas
                </p>
                <button 
                  onClick={handleWhatsAppClick}
                  className="btn-primary dark-button-animate"
                >
                  <MessageCircle size={18} />
                  Falar com especialista
                </button>
              </CardContent>
            </Card>
            
            <Card className="bg-bg-secondary border-border-subtle">
              <CardContent className="p-8 text-center">
                <Instagram size={48} className="text-brand-primary mx-auto mb-4" />
                <h3 className="heading-3 mb-4">Siga-nos no Instagram</h3>
                <p className="body-medium text-text-secondary mb-6">
                  Dicas, cases de sucesso e novidades do mundo digital
                </p>
                <a 
                  href={companyInfo.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary dark-button-animate"
                >
                  <Instagram size={18} />
                  @rw_0ficial
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-bg-secondary border-border-subtle">
              <CardContent className="p-8 text-center">
                <Mail size={48} className="text-brand-primary mx-auto mb-4" />
                <h3 className="heading-3 mb-4">E-mail para contato</h3>
                <p className="body-medium text-text-secondary mb-4">
                  {companyInfo.contact.email}
                </p>
                <p className="body-small text-text-muted">
                  Respondemos em até 24 horas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};