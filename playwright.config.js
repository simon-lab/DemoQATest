{import('@playwright/test').PlaywrightTestConfig};

const config = {
    retries: 0,
    timout: 30000,
    reporter: './reporter.js',
    use: {
        headless: false,
         viewport: { width: 1280, height: 720 },
         video: 'on',
         screenshot: "only-on-failure",
         trace: 'on'
    },


    projects: [
        {
            name: 'Chrome',
            use: {browserName: 'chromium'}
        },
    ]
  };
  
  module.exports = config;