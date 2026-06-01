const fs = require('fs');

try {
    const indexHtml = fs.readFileSync('index.html', 'utf8');
    const contactOldHtml = fs.readFileSync('shyama-handball-contact.html', 'utf8');

    // 1. Extract Head, TopBar, NavBar from index.html
    let headAndNav = indexHtml.split('</nav>')[0] + '</nav>';
    headAndNav = headAndNav.replace('<li><a href="index.html" class="active">Home</a></li>', '<li><a href="index.html">Home</a></li>');
    headAndNav = headAndNav.replace('<li><a href="contact.html">Contact Us</a></li>', '<li><a href="contact.html" class="active">Contact Us</a></li>');
    
    // Add Tabler Icons to head
    headAndNav = headAndNav.replace('</head>', '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"/>\n</head>');

    // 2. Extract Styles from contactOldHtml
    let styles = contactOldHtml.match(/<style>([\s\S]*?)<\/style>/)[0];
    
    // Transform dark theme colors to light theme to match index.html
    styles = styles.replace(/--primary:\s*#[0-9A-Fa-f]+;/g, '--primary: #0f172a;'); // Navy
    styles = styles.replace(/--primary-dark:\s*#[0-9A-Fa-f]+;/g, '--primary-dark: #1e293b;');
    styles = styles.replace(/--primary-light:\s*#[0-9A-Fa-f]+;/g, '--primary-light: #3b82f6;'); // Blue accent
    styles = styles.replace(/--gold:\s*#[0-9A-Fa-f]+;/g, '--gold: #f59e0b;');
    styles = styles.replace(/--gold-light:\s*#[0-9A-Fa-f]+;/g, '--gold-light: #fbbf24;');
    styles = styles.replace(/--dark:\s*#[0-9A-Fa-f]+;/g, '--dark: #f7f8fc;'); // Background
    styles = styles.replace(/--dark-2:\s*#[0-9A-Fa-f]+;/g, '--dark-2: #e2e8f0;'); // Light grey
    styles = styles.replace(/--dark-3:\s*#[0-9A-Fa-f]+;/g, '--dark-3: #ffffff;'); // Inputs background
    styles = styles.replace(/--surface:\s*#[0-9A-Fa-f]+;/g, '--surface: #ffffff;'); // Cards background
    styles = styles.replace(/--surface-2:\s*#[0-9A-Fa-f]+;/g, '--surface-2: #f1f5f9;');
    styles = styles.replace(/--border:\s*rgba[^;]+;/g, '--border: rgba(0,0,0,0.1);');
    styles = styles.replace(/--text:\s*#[0-9A-Fa-f]+;/g, '--text: #0f172a;');
    styles = styles.replace(/--text-muted:\s*#[0-9A-Fa-f]+;/g, '--text-muted: #475569;');
    styles = styles.replace(/--text-dim:\s*#[0-9A-Fa-f]+;/g, '--text-dim: #64748b;');
    
    // Fix specific hardcoded backgrounds in original CSS that assumed a dark theme
    styles = styles.replace(/rgba\(255,255,255,0.1\)/g, 'rgba(0,0,0,0.1)'); // Input borders
    styles = styles.replace(/rgba\(200,16,46,/g, 'rgba(15,23,42,'); // Map icon background & hover borders

    // Hide conflicting old HTML tags like body, html, etc.
    styles = styles.replace(/body\s*{[^}]*}/g, '');
    styles = styles.replace(/html\s*{[^}]*}/g, '');
    styles = styles.replace(/\.hero\s*{[^}]*}/g, ''); // We won't use the old hero
    styles = styles.replace(/\.hero::before\s*{[^}]*}/g, '');

    // 3. Hero Section (Matched with About Us & Training style)
    const heroSection = `
    <!-- Hero Banner -->
    <section class="hero-slider-section" style="height: 50vh; min-height: 400px; display: flex; align-items: center; justify-content: center; background: url('assets/Images/hero_handball.png') top center/cover no-repeat; position: relative;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(11, 17, 32, 0.6), rgba(11, 17, 32, 0.9));"></div>
        <div style="position: relative; z-index: 10; text-align: center; padding: 0 20px;">
            <h1 style="color: #fff; font-size: 3.5rem; font-weight: 900; margin-bottom: 15px; letter-spacing: 2px;">CONTACT <span class="gold-text">US</span></h1>
            <div style="width: 100px; height: 4px; background: #f59e0b; margin: 0 auto 20px;"></div>
            <p style="color: #e2e8f0; font-size: 1.2rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">We're ready to welcome you on the court. Reach out to join Varanasi's premier handball training centre.</p>
        </div>
    </section>
    `;

    // 4. Extract Main Content
    // We want everything from <section class="contact-section"> down to the closing script tag
    const mainContentMatch = contactOldHtml.match(/<section class="contact-section">([\s\S]*?)<\/body>/);
    let mainContent = mainContentMatch ? mainContentMatch[0] : '';
    
    // Remove the old footer and body tag
    mainContent = mainContent.replace(/<footer class="footer-strip">[\s\S]*?<\/footer>/, '');
    mainContent = mainContent.replace(/<\/body>/, '');
    mainContent = mainContent.replace(/<div class="divider"><\/div>\s*(?=<div class="toast")/, ''); // Remove extra divider near old footer

    // Change the placeholder values to proper ones
    mainContent = mainContent.replace('+91 94150 00001', '+91 87655 50245');
    mainContent = mainContent.replace('+919415000001', '+918765550245'); // href
    mainContent = mainContent.replace('+91 94150 00002', '+91 70849 00009');
    mainContent = mainContent.replace('+919415000002', '+917084900009'); // href
    mainContent = mainContent.replace('shyamahandball@gmail.com', 'hyamahandballacademy@gmail.com');
    mainContent = mainContent.replace('https://wa.me/919415000001', 'https://wa.me/918765550245');

    // 5. Extract Footer from index.html
    const footerParts = indexHtml.split('<!-- Footer -->');
    const footer = '<!-- Footer -->' + footerParts[1];

    // Combine everything
    const newHtml = `
${headAndNav}
${styles}
${heroSection}
<div style="background: var(--dark);">
${mainContent}
</div>
${footer}
    `;

    // Write to contact.html
    fs.writeFileSync('contact.html', newHtml.trim(), 'utf8');
    console.log('Successfully created contact.html');
} catch(e) {
    console.error(e);
}
