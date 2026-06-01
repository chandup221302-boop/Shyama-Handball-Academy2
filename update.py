import re

with open('d:/New Desktop/Shyama Handball Academy 02/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Welcome to Our Academy
html = re.sub(
    r'<section class="section impact-programs">[\s\S]*?<div class="grid-5 impact-grid">',
    '''<section class="section light-section">
        <div class="center-header">
            <span class="gold-subtitle-center">ACADEMY HIGHLIGHTS</span>
            <h2 class="section-title-center">WELCOME TO <span class="gold-text">OUR ACADEMY</span></h2>
            <div class="title-divider-gold-center"></div>
            <p class="center-desc" style="max-width: 800px;">Dedicated grassroots initiatives driving athletic mastery, corporate collaborations, and youth leadership in the sport of handball.</p>
        </div>
        <div class="grid-5 impact-grid">''',
    html
)

# 2. Built for Champions
html = re.sub(
    r'<section class="section dark-section">\s*<div class="grid-2-col">\s*<!-- Left Side -->\s*<div class="about-left">\s*<span class="gold-subtitle">ABOUT THE ACADEMY</span>\s*<h2 class="dark-section-title"><span class="white-text">BUILT FOR</span><br><span class="gold-text">CHAMPIONS</span></h2>\s*<div class="title-divider-gold"></div>',
    '''<section class="section dark-section">
        <div class="center-header">
            <span class="gold-subtitle-center">ABOUT THE ACADEMY</span>
            <h2 class="section-title-center">BUILT FOR <span class="gold-text">CHAMPIONS</span></h2>
            <div class="title-divider-gold-center"></div>
        </div>
        <div class="grid-2-col">
            <!-- Left Side -->
            <div class="about-left">''',
    html
)

# 3. Training Highlights
html = re.sub(
    r'<section class="section dark-section-alt">\s*<div class="center-header">\s*<span class="gold-subtitle-center">TRAINING PROGRAMS</span>\s*<h2 class="dark-section-title-center"><span class="white-text">TRAINING</span><br><span class="gold-text">HIGHLIGHTS</span></h2>\s*<div class="title-divider-gold-center\"></div>',
    '''<section class="section light-section">
        <div class="center-header">
            <span class="gold-subtitle-center">TRAINING PROGRAMS</span>
            <h2 class="section-title-center">TRAINING <span class="gold-text">HIGHLIGHTS</span></h2>
            <div class="title-divider-gold-center"></div>''',
    html
)

# 4. Achievements & Awards
html = re.sub(
    r'<section class="section dark-section">\s*<div class="center-header">\s*<span class="gold-subtitle-center">OUR RECORD</span>\s*<h2 class="dark-section-title-center"><span class="white-text">ACHIEVEMENTS</span><br><span class="gold-text">& AWARDS</span></h2>\s*<div class="title-divider-gold-center"></div>',
    '''<section class="section dark-section-alt">
        <div class="center-header">
            <span class="gold-subtitle-center">OUR RECORD</span>
            <h2 class="section-title-center">ACHIEVEMENTS <span class="gold-text">& AWARDS</span></h2>
            <div class="title-divider-gold-center"></div>''',
    html
)

# 5. Upcoming Events
html = re.sub(
    r'<section class="section dark-section-alt">\s*<div class="events-header-container">\s*<div>\s*<span class="gold-subtitle\">CALENDAR</span>\s*<h2 class="dark-section-title\">UPCOMING<br>EVENTS</h2>\s*<div class=\"title-divider-gold\"></div>\s*</div>\s*<div>\s*<a href=\"events.html\" class=\"btn-outline-white\">VIEW ALL EVENTS</a>\s*</div>\s*</div>',
    '''<section class="section light-section">
        <div class="gallery-header-container">
            <div class="center-header" style="text-align: left; margin-bottom: 0;">
                <span class="gold-subtitle-center" style="text-align: left;">CALENDAR</span>
                <h2 class="section-title-center">UPCOMING <span class="gold-text">EVENTS</span></h2>
                <div class="title-divider-gold-center" style="margin: 0 0 20px 0;"></div>
            </div>
            <div>
                <a href="events.html" class="btn-outline-white" style="color: #0f172a; border-color: #0f172a;">VIEW ALL EVENTS</a>
            </div>
        </div>''',
    html
)

# 6. Meet The Coaches
html = re.sub(
    r'<section class="section dark-section">\s*<div class="center-header">\s*<span class="gold-subtitle-center\">OUR TEAM</span>\s*<h2 class="dark-section-title-center\"><span class=\"white-text\">MEET THE</span><br><span class=\"gold-text\">COACHES</span></h2>\s*<div class=\"title-divider-gold-center\"></div>',
    '''<section class="section dark-section">
        <div class="center-header">
            <span class="gold-subtitle-center">OUR TEAM</span>
            <h2 class="section-title-center">MEET THE <span class="gold-text">COACHES</span></h2>
            <div class="title-divider-gold-center"></div>''',
    html
)

# 7. Photo Gallery
html = re.sub(
    r'<section class="dark-section\">\s*<div class="gallery-header-container\">\s*<div>\s*<span class="gold-subtitle\">MOMENTS</span>\s*<h2 class="dark-section-title\">PHOTO<br>GALLERY</h2>\s*<div class=\"title-divider-gold\"></div>\s*</div>\s*<div>\s*<a href=\"gallery.html\" class=\"btn-outline-white\">VIEW ALL PHOTOS</a>\s*</div>\s*</div>',
    '''<section class="light-section">
        <div class="gallery-header-container">
            <div class="center-header" style="text-align: left; margin-bottom: 0;">
                <span class="gold-subtitle-center" style="text-align: left;">MOMENTS</span>
                <h2 class="section-title-center">PHOTO <span class="gold-text">GALLERY</span></h2>
                <div class="title-divider-gold-center" style="margin: 0 0 20px 0;"></div>
            </div>
            <div>
                <a href="gallery.html" class="btn-outline-white" style="color: #0f172a; border-color: #0f172a;">VIEW ALL PHOTOS</a>
            </div>
        </div>''',
    html
)

# 8. Testimonials
html = re.sub(
    r'<section class="dark-section-alt\">\s*<div class="center-header\">\s*<span class="gold-subtitle-center\">WHAT THEY SAY</span>\s*<h2 class="dark-section-title-center\">TESTIMONIALS</h2>\s*<div class=\"title-divider-gold-center\"></div>',
    '''<section class="dark-section-alt">
        <div class="center-header">
            <span class="gold-subtitle-center">WHAT THEY SAY</span>
            <h2 class="section-title-center">TESTIMONIALS</h2>
            <div class="title-divider-gold-center"></div>''',
    html
)

# 9. Sponsors & Partners
html = re.sub(
    r'<section class="dark-section\">\s*<div class="center-header\">\s*<span class="gold-subtitle-center\">OUR PARTNERS</span>\s*<h2 class="dark-section-title-center\">SPONSORS &<br>PARTNERS</h2>\s*<div class=\"title-divider-gold-center\"></div>',
    '''<section class="light-section" style="padding-bottom: 120px;">
        <div class="center-header">
            <span class="gold-subtitle-center">OUR PARTNERS</span>
            <h2 class="section-title-center">SPONSORS <span class="gold-text">& PARTNERS</span></h2>
            <div class="title-divider-gold-center"></div>''',
    html
)

with open('d:/New Desktop/Shyama Handball Academy 02/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
