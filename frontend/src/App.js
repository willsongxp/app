import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Benefits } from "./components/Benefits";
import { Statistics } from "./components/Statistics";
import { Testimonials } from "./components/Testimonials";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Statistics />
        <Services />
        <Benefits />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
