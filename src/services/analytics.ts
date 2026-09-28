import { AnalyticsEvent, EventName } from '../types';

const ANALYTICS_STORAGE_KEY = 'chb_analytics_events_v1';
const SESSION_ID_KEY = 'chb_session_id';

function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export function trackEvent(
  eventName: EventName,
  pageUrl: string = window.location.pathname,
  productId?: string,
  productName?: string,
  categoryId?: string,
  metadata?: Record<string, any>
): void {
  try {
    const anonymousId = getSessionId();
    const event: AnalyticsEvent = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      eventName,
      pageUrl,
      productId,
      productName,
      categoryId,
      anonymousId,
      metadata,
      timestamp: new Date().toISOString(),
    };

    const saved = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const existing: AnalyticsEvent[] = saved ? JSON.parse(saved) : [];
    // Retain up to 2000 most recent events locally
    const updated = [event, ...existing.slice(0, 1999)];
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    // Fail silently so analytics issues never break website behavior
    console.warn('Analytics tracking warning:', err);
  }
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  try {
    const saved = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
}

export function getConversionFunnel(events: AnalyticsEvent[]) {
  const pageViews = events.filter(e => e.eventName === 'page_view').length;
  const productViews = events.filter(e => e.eventName === 'product_view').length;
  const cartAdds = events.filter(e => e.eventName === 'cart_add').length;
  const checkouts = events.filter(e => e.eventName === 'checkout_start').length;
  const orders = events.filter(e => e.eventName === 'order_created').length;
  const whatsappClicks = events.filter(e => e.eventName === 'whatsapp_click').length;

  return {
    pageViews,
    productViews,
    cartAdds,
    checkouts,
    orders,
    whatsappClicks,
    conversionRate: checkouts > 0 ? ((orders / checkouts) * 100).toFixed(1) + '%' : '0.0%',
  };
}
