const directives = {
  'connect-src': [
    "'self'",
    'ws://localhost:*',
    'https://hcaptcha.com',
    'https://*.hcaptcha.com',
  ],
  'frame-src': [
    "'self'",
    'https://hcaptcha.com',
    'https://*.hcaptcha.com',
  ],
  'style-src': ["'self'", "'unsafe-inline'", 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://hcaptcha.com',
    'https://*.hcaptcha.com',
  ]
  
};