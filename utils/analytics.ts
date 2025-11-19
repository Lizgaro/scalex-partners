
// Analytics Service Abstraction
// Позволяет менять провайдеров аналитики (GA4, Amplitude, PostHog) без изменения компонентов

export const ANALYTICS_EVENTS = {
  CTA_CLICK: 'cta_click',
  PROJECT_VIEW: 'project_view',
  PROJECT_HOVER: 'project_hover',
  SCROLL_DEPTH: 'scroll_depth',
  FAQ_TOGGLE: 'faq_toggle',
};

export interface AnalyticsEventProps {
  category?: string;
  label?: string;
  value?: number;
  projectId?: string;
  projectTitle?: string;
  location?: string;
  [key: string]: any;
}

export const trackEvent = (eventName: string, props?: AnalyticsEventProps) => {
  // 1. Логирование в консоль для дебага (только в dev режиме, но здесь оставим для демонстрации)
  // В реальном проде проверять if (process.env.NODE_ENV !== 'production')
  console.groupCollapsed(`[Analytics] 📡 Event: ${eventName}`);
  console.log('Payload:', props);
  console.log('Timestamp:', new Date().toISOString());
  console.groupEnd();

  // 2. Точка интеграции для внешних систем
  // Пример для Google Analytics 4 (gtag)
  // if (typeof window.gtag === 'function') {
  //   window.gtag('event', eventName, props);
  // }

  // Пример для Amplitude / PostHog
  // if (window.posthog) window.posthog.capture(eventName, props);
};

export const trackPageView = (path: string) => {
  console.log(`[Analytics] 👁️ Pageview: ${path}`);
  // window.gtag('config', 'GA_MEASUREMENT_ID', { page_path: path });
};
