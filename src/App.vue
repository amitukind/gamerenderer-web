<script setup>
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import WorkSection from './components/WorkSection.vue'
import WhyUsSection from './components/WhyUsSection.vue'
import IndustriesSection from './components/IndustriesSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import FaqSection from './components/FaqSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProcessSection />
    <WorkSection />
    <WhyUsSection />
    <IndustriesSection />
    <TestimonialsSection />
    <FaqSection />
    <ContactSection />
  </main>
  <AppFooter />
  <BackToTop />
</template>
