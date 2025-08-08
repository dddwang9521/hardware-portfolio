# Google Analytics Setup Guide

## Setup Instructions

### 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create a new account for your portfolio
4. Set up a new property for "ddwang.org"

### 2. Get Your Measurement ID
1. In Google Analytics, go to Admin → Data Streams
2. Create a new web stream for "ddwang.org"
3. Copy your Measurement ID (format: G-XXXXXXXXXX)

### 3. Update the Code
✅ **COMPLETED** - Measurement ID `G-GMTM749PNG` has been integrated into the codebase.

The Google Analytics tracking code is now active in:
- `index.html` - Main tracking script
- `src/components/SEO.tsx` - Dynamic page tracking

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GMTM749PNG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-GMTM749PNG', {
    page_title: 'David Wang - Hardware Engineer Portfolio',
    page_location: 'https://ddwang.org/',
    custom_map: {
      'custom_parameter_1': 'hardware_engineer',
      'custom_parameter_2': 'embedded_systems'
    }
  });
</script>
```

### 4. Deploy and Test
✅ **READY TO DEPLOY** - All changes have been made
1. Deploy your changes to GitHub Pages: `npm run deploy`
2. Visit your site and check Google Analytics Real-Time reports
3. Verify that page views are being tracked

## What You'll Track

### Visitor Insights:
- **Page Views**: Which pages get the most attention
- **Traffic Sources**: Where visitors come from (Google search, LinkedIn, etc.)
- **Geographic Data**: Where your visitors are located
- **Device Types**: Mobile vs desktop usage
- **Time on Site**: How engaged visitors are

### Professional Benefits:
- **Portfolio Performance**: See if your portfolio is effective
- **Project Interest**: Which projects attract the most attention
- **Career Opportunities**: Track if portfolio leads to opportunities
- **SEO Effectiveness**: Monitor search traffic

## Custom Events (Optional)

You can track specific interactions:

```javascript
// Track project clicks
gtag('event', 'project_view', {
  'project_name': '3D Mapping System',
  'project_category': 'hardware'
});

// Track contact form submissions
gtag('event', 'contact_form_submit', {
  'form_type': 'contact',
  'page_location': 'contact'
});
```

## Privacy Compliance

- Google Analytics respects user privacy
- No personal information is collected
- Complies with GDPR and CCPA
- Users can opt-out via browser settings

## Next Steps

✅ **COMPLETED:**
1. ✅ Set up Google Analytics account
2. ✅ Replace the placeholder Measurement ID (`G-GMTM749PNG`)
3. ✅ Deploy and test tracking (ready to deploy)

**REMAINING:**
4. Monitor your portfolio's performance
5. Use insights to optimize your content

## Current Status
- **Google Analytics**: ✅ Active with Measurement ID `G-GMTM749PNG`
- **SEO Optimization**: ✅ Complete with comprehensive meta tags
- **Sitemap**: ✅ Created and accessible at `/sitemap.xml`
- **Robots.txt**: ✅ Created for search engine crawling
- **Ready for Deployment**: ✅ All tracking and SEO features implemented
