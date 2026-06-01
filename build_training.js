const fs = require('fs');

try {
    const indexHtml = fs.readFileSync('index.html', 'utf8');
    const trainingOldHtml = fs.readFileSync('shyama_training_programs.html', 'utf8');

    // 1. Extract Head, TopBar, NavBar from index.html
    // Replace "active" class in Navbar
    let headAndNav = indexHtml.split('</nav>')[0] + '</nav>';
    headAndNav = headAndNav.replace('<li><a href="index.html" class="active">Home</a></li>', '<li><a href="index.html">Home</a></li>');
    headAndNav = headAndNav.replace('<li><a href="training.html">Training Programs</a></li>', '<li><a href="training.html" class="active">Training Programs</a></li>');
    
    // Add Tabler Icons to head
    headAndNav = headAndNav.replace('</head>', '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"/>\n</head>');

    // 2. Extract Styles from training Old HTML
    let styles = trainingOldHtml.match(/<style>([\s\S]*?)<\/style>/)[0];
    
    // Match colors to Home Page UI
    styles = styles.replace(/--navy:\s*#071e3d;/g, '--navy: #0f172a;');
    styles = styles.replace(/--navy2:\s*#0d2d5a;/g, '--navy2: #1e293b;');
    styles = styles.replace(/--gold:\s*#f5c518;/g, '--gold: #f59e0b;');
    styles = styles.replace(/--gold2:\s*#e0a800;/g, '--gold2: #d97706;');
    // Also remove the "nav" and "footer" CSS from trainingOldHtml to avoid conflicts with index.html's CSS
    styles = styles.replace(/nav\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-brand\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-logo\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-name\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-name span\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-links\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-links a\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-cta\s*{[^}]*}/g, '');
    styles = styles.replace(/\.nav-cta:hover\s*{[^}]*}/g, '');
    styles = styles.replace(/footer\s*{[^}]*}/g, '');
    styles = styles.replace(/footer span\s*{[^}]*}/g, '');

    // 3. Hero Section (Matched with About Us style)
    const heroSection = `
    <!-- Hero Banner -->
    <section class="hero-slider-section" style="height: 50vh; min-height: 400px; display: flex; align-items: center; justify-content: center; background: url('assets/Images/hero_handball.png') top center/cover no-repeat; position: relative;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(11, 17, 32, 0.6), rgba(11, 17, 32, 0.9));"></div>
        <div style="position: relative; z-index: 10; text-align: center; padding: 0 20px;">
            <h1 style="color: #fff; font-size: 3.5rem; font-weight: 900; margin-bottom: 15px; letter-spacing: 2px;">TRAINING <span class="gold-text">PROGRAMS</span></h1>
            <div style="width: 100px; height: 4px; background: #f59e0b; margin: 0 auto 20px;"></div>
            <p style="color: #e2e8f0; font-size: 1.2rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">From your very first step onto the court to competing on the national stage &mdash; we have a program designed precisely for you.</p>
        </div>
    </section>
    `;

    // 4. Extract Main Content
    // We want everything from <div class="main"> down to the end of the main div.
    // The main div contains all the programs.
    const mainContentMatch = trainingOldHtml.match(/<div class="main">([\s\S]*?)<\/body>/);
    let mainContent = mainContentMatch ? mainContentMatch[0] : '';
    
    // Remove the old footer and script tags from the end of the matched body content
    mainContent = mainContent.replace(/<footer>[\s\S]*?<\/footer>/, '');
    mainContent = mainContent.replace(/<\/body>/, '');
    
    // Convert old hero filter pill into a modern filter bar inside the main section (optional, but it was in the old hero)
    // Actually, the old hero had the filter pills. We should extract them and put them at the top of the main section.
    const filterBarMatch = trainingOldHtml.match(/<div class="filter-bar">[\s\S]*?<\/div>/);
    const filterBar = filterBarMatch ? filterBarMatch[0] : '';
    
    // Combine filter bar with main content
    mainContent = mainContent.replace('<div class="main">', '<div class="main">\n' + filterBar + '\n');
    
    // Let's add some margin to the filter bar
    mainContent = mainContent.replace('<div class="filter-bar">', '<div class="filter-bar" style="margin-bottom: 30px;">');

    // 5. Extract Footer from index.html
    const footerParts = indexHtml.split('<!-- Footer -->');
    const footer = '<!-- Footer -->' + footerParts[1];

    // Combine everything
    const newHtml = `
${headAndNav}
${styles}
${heroSection}
${mainContent}
${footer}
    `;

    // Write to training.html
    fs.writeFileSync('training.html', newHtml.trim(), 'utf8');
    console.log('Successfully created training.html');
} catch(e) {
    console.error(e);
}
