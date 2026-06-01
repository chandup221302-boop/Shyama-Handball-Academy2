const fs = require('fs');

try {
    const indexHtml = fs.readFileSync('index.html', 'utf8');
    const galleryOldHtml = fs.readFileSync('shyama-handball-gallery.html', 'utf8');

    // 1. Extract Head, TopBar, NavBar from index.html
    let headAndNav = indexHtml.split('</nav>')[0] + '</nav>';
    headAndNav = headAndNav.replace('<li><a href="index.html" class="active">Home</a></li>', '<li><a href="index.html">Home</a></li>');
    headAndNav = headAndNav.replace('<li><a href="gallery.html">Gallery</a></li>', '<li><a href="gallery.html" class="active">Gallery</a></li>');
    
    // Add Tabler Icons to head
    headAndNav = headAndNav.replace('</head>', '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"/>\n</head>');

    // 2. Extract Styles from galleryOldHtml
    let styles = galleryOldHtml.match(/<style>([\s\S]*?)<\/style>/)[0];
    
    // Transform dark theme colors to light theme to match index.html
    styles = styles.replace(/--red:\s*#[0-9A-Fa-f]+;/g, '--red: #0f172a;'); // Navy
    styles = styles.replace(/--red-light:\s*#[0-9A-Fa-f]+;/g, '--red-light: #3b82f6;'); // Blue
    styles = styles.replace(/--red-glow:\s*rgba[^;]+;/g, '--red-glow: rgba(15,23,42,0.1);');
    styles = styles.replace(/--gold:\s*#[0-9A-Fa-f]+;/g, '--gold: #f59e0b;');
    styles = styles.replace(/--gold-light:\s*#[0-9A-Fa-f]+;/g, '--gold-light: #fbbf24;');
    styles = styles.replace(/--dark:\s*#[0-9A-Fa-f]+;/g, '--dark: #f7f8fc;'); // Background
    styles = styles.replace(/--dark2:\s*#[0-9A-Fa-f]+;/g, '--dark2: #e2e8f0;'); // Light grey
    styles = styles.replace(/--dark3:\s*#[0-9A-Fa-f]+;/g, '--dark3: #ffffff;'); 
    styles = styles.replace(/--surface:\s*#[0-9A-Fa-f]+;/g, '--surface: #ffffff;'); // Cards background
    styles = styles.replace(/--surface2:\s*#[0-9A-Fa-f]+;/g, '--surface2: #f1f5f9;');
    styles = styles.replace(/--border:\s*rgba[^;]+;/g, '--border: rgba(0,0,0,0.1);');
    styles = styles.replace(/--border2:\s*rgba[^;]+;/g, '--border2: rgba(0,0,0,0.15);');
    styles = styles.replace(/--text:\s*#[0-9A-Fa-f]+;/g, '--text: #0f172a;');
    styles = styles.replace(/--muted:\s*#[0-9A-Fa-f]+;/g, '--muted: #475569;');
    styles = styles.replace(/--dim:\s*#[0-9A-Fa-f]+;/g, '--dim: #64748b;');
    
    // Update sticky nav background for light theme
    styles = styles.replace(/rgba\(10,10,10,\.92\)/g, 'rgba(255,255,255,.92)');

    // Hide conflicting old HTML tags like body, html, etc.
    styles = styles.replace(/body\s*{[^}]*}/g, '');
    styles = styles.replace(/html\s*{[^}]*}/g, '');

    // 3. Hero Section (Matched with About Us style)
    const heroSection = `
    <!-- Hero Banner -->
    <section class="hero-slider-section" style="height: 50vh; min-height: 400px; display: flex; align-items: center; justify-content: center; background: url('assets/Images/hero_banner_wide.png') top center/cover no-repeat; position: relative;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(11, 17, 32, 0.6), rgba(11, 17, 32, 0.9));"></div>
        <div style="position: relative; z-index: 10; text-align: center; padding: 0 20px;">
            <h1 style="color: #fff; font-size: 3.5rem; font-weight: 900; margin-bottom: 15px; letter-spacing: 2px;">PHOTO <span class="gold-text">GALLERY</span></h1>
            <div style="width: 100px; height: 4px; background: #f59e0b; margin: 0 auto 20px;"></div>
            <p style="color: #e2e8f0; font-size: 1.2rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">Every photograph, every clip &mdash; a testament to the sweat, spirit, and skill forged on the courts of Shyama Handball Academy.</p>
        </div>
    </section>
    `;

    // 4. Extract Main Content
    // We want everything from <nav class="nav-sticky" ...> down to the closing script/body tag
    const mainContentMatch = galleryOldHtml.match(/<!-- STICKY TABS -->([\s\S]*?)<\/body>/);
    let mainContent = mainContentMatch ? mainContentMatch[0] : '';
    
    // Remove the old footer and body tag from extracted content
    mainContent = mainContent.replace(/<footer class="footer">[\s\S]*?<\/footer>/, '');
    mainContent = mainContent.replace(/<\/body>/, '');
    
    // 5. Replace SVGs with real images for the first 4 training photos!
    // The SVGs start with <svg class="ph" and end with </svg>
    let svgMatches = mainContent.match(/<svg class="ph"[\s\S]*?<\/svg>/g);
    if (svgMatches && svgMatches.length >= 4) {
        mainContent = mainContent.replace(svgMatches[0], '<img src="assets/Images/training_1.png" class="ph" alt="Morning Drills" style="height: 280px;" />');
        mainContent = mainContent.replace(svgMatches[1], '<img src="assets/Images/training_2.png" class="ph" alt="Goalkeeper Training" style="height: 340px;" />');
        mainContent = mainContent.replace(svgMatches[2], '<img src="assets/Images/hero_handball.png" class="ph" alt="Throwing Technique" style="height: 260px;" />');
        mainContent = mainContent.replace(svgMatches[3], '<img src="assets/Images/hero_banner_wide.png" class="ph" alt="Strategy Session" style="height: 220px;" />');
    }

    // Replace JS for tabs to ensure it works correctly
    const scriptReplacement = `
<script>
function switchTab(btn, id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}
function openLb(caption) {
  // Simple lightbox function
  console.log("Open lightbox: " + caption);
}
</script>
`;

    // 6. Extract Footer from index.html
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
${scriptReplacement}
${footer}
    `;

    // Write to gallery.html
    fs.writeFileSync('gallery.html', newHtml.trim(), 'utf8');
    console.log('Successfully created gallery.html');
} catch(e) {
    console.error(e);
}
