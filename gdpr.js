/**
 * Duolingo Magic Carpet Experience
 * GDPR Consent Management
 */

// DOM Elements
const gdprBanner = document.getElementById('gdpr-banner');
const acceptAllBtn = document.getElementById('accept-all-cookies');
const essentialOnlyBtn = document.getElementById('essential-only-cookies');
const cookieSettingsBtn = document.getElementById('cookie-settings');
const privacySettingsBtn = document.getElementById('privacy-settings');

// Consent states
const CONSENT_STATES = {
  UNKNOWN: 'unknown',
  ACCEPTED: 'accepted',
  ESSENTIAL: 'essential',
  CUSTOM: 'custom'
};

// Check if consent has been given
function checkConsent() {
  const consentState = localStorage.getItem('cookieConsent');
  
  if (consentState === CONSENT_STATES.ACCEPTED) {
    hideBanner();
    enableAnalytics();
  } else if (consentState === CONSENT_STATES.ESSENTIAL) {
    hideBanner();
    // Only load essential cookies
  } else if (consentState === CONSENT_STATES.CUSTOM) {
    hideBanner();
    applyCustomConsent();
  } else {
    // Show GDPR banner if no consent state is saved
    showBanner();
  }
}

// Show GDPR banner
function showBanner() {
  if (gdprBanner) {
    gdprBanner.style.display = 'flex';
  }
}

// Hide GDPR banner
function hideBanner() {
  if (gdprBanner) {
    gdprBanner.style.display = 'none';
  }
}

// Enable all analytics and tracking
function enableAnalytics() {
  console.log('Analytics enabled - in production, this would initialize Google Analytics, etc.');
  // In production, initialize analytics here
  
  // Example of enabling Google Analytics (in production)
  /*
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  */
}

// Apply custom consent settings
function applyCustomConsent() {
  const consentSettings = JSON.parse(localStorage.getItem('consentSettings') || '{}');
  
  // Apply specific settings based on user choices
  if (consentSettings.analytics) {
    enableAnalytics();
  }
  
  if (consentSettings.marketing) {
    enableMarketingCookies();
  }
  
  if (consentSettings.preferences) {
    enablePreferenceCookies();
  }
}

// Enable marketing cookies
function enableMarketingCookies() {
  console.log('Marketing cookies enabled - in production, this would initialize marketing pixels');
  // In production, initialize marketing pixels and cookies here
}

// Enable preference cookies
function enablePreferenceCookies() {
  console.log('Preference cookies enabled - in production, this would save user preferences');
  // In production, initialize preference cookies here
}

// Open cookie settings modal
function openCookieSettings() {
  console.log('Cookie settings modal would open here');
  // In a real implementation, this would open a modal with detailed cookie settings
  
  // For demo purposes, show an alert with options
  const result = confirm(
    "Cookie Settings\n\n" +
    "Essential Cookies: Always active (required for site functionality)\n" +
    "Analytics Cookies: Help us improve our website\n" +
    "Marketing Cookies: Allow personalized recommendations\n" +
    "Preference Cookies: Remember your settings\n\n" +
    "Press OK to customize or Cancel to close"
  );
  
  if (result) {
    // In production, this would show a proper form with checkboxes
    let analytics = confirm("Allow Analytics Cookies?");
    let marketing = confirm("Allow Marketing Cookies?");
    let preferences = confirm("Allow Preference Cookies?");
    
    // Save custom settings
    const customSettings = {
      analytics,
      marketing,
      preferences
    };
    
    localStorage.setItem('consentSettings', JSON.stringify(customSettings));
    localStorage.setItem('cookieConsent', CONSENT_STATES.CUSTOM);
    
    // Apply the settings
    applyCustomConsent();
    
    // Hide the banner
    hideBanner();
  }
}

// Event Listeners
if (acceptAllBtn) {
  acceptAllBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', CONSENT_STATES.ACCEPTED);
    enableAnalytics();
    hideBanner();
  });
}

if (essentialOnlyBtn) {
  essentialOnlyBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', CONSENT_STATES.ESSENTIAL);
    hideBanner();
  });
}

if (cookieSettingsBtn) {
  cookieSettingsBtn.addEventListener('click', openCookieSettings);
}

if (privacySettingsBtn) {
  privacySettingsBtn.addEventListener('click', openCookieSettings);
}

// Check consent state on page load
document.addEventListener('DOMContentLoaded', checkConsent);