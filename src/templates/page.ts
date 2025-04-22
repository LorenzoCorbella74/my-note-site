export function GeneratePage(opt: {sidebarHtml:string, htmlContent:string, cssRelativePath:string, relativePath:string }) {
    // Calculate parent folder path
    const parentPath = opt.relativePath.includes('/') ? 
                       opt.relativePath.substring(0, opt.relativePath.lastIndexOf('/')) /* + '/index.html' */ :
                       ""/* 'index.html' */;

    return `<!DOCTYPE html>
            <html lang="en" data-theme="light">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${opt.relativePath.replace(/\.md$/, '')}</title>
                <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/github-dark.min.css"/>
                <script src="https://unpkg.com/@highlightjs/cdn-assets@11.7.0/highlight.min.js"></script>
                <link rel="stylesheet" href="${opt.cssRelativePath}">
                <style>
                    .sidebar a.active {
                        font-weight: bold;
                        background-color: var(--sidebar-active-link);
                        border-radius: 4px;
                        padding-left: 8px;
                        margin-left: -8px;
                    }
                </style>
            </head>
            <body>
                <div class="content-page">
                <aside class="sidebar">
                    ${opt.sidebarHtml}
                    <div class="sidebar-footer">
                        <button id="theme-toggle" class="theme-toggle">
                            <span class="theme-toggle-light">🌙 Dark Mode</span>
                            <span class="theme-toggle-dark">☀️ Light Mode</span>
                        </button>
                    </div>
                </aside>
                <main class="main-content">
                    <div class="nav-buttons">
                        <a href="${parentPath}" class="back-btn">← Back to Parent Folder</a>
                    </div>
                    ${opt.htmlContent}
                </main>
                </div>
                <script>
                document.addEventListener('DOMContentLoaded', () => {
                    // Theme switching functionality
                    const themeToggle = document.getElementById('theme-toggle');
                    const htmlElement = document.documentElement;
                    
                    // Check if theme preference is saved in localStorage
                    const savedTheme = localStorage.getItem('theme');
                    if (savedTheme) {
                      htmlElement.setAttribute('data-theme', savedTheme);
                    }
                    
                    themeToggle.addEventListener('click', () => {
                      const currentTheme = htmlElement.getAttribute('data-theme');
                      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                      
                      htmlElement.setAttribute('data-theme', newTheme);
                      localStorage.setItem('theme', newTheme);
                    });
                
                    // Simple smooth scroll for sidebar links
                    document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
                        anchor.addEventListener('click', function (e) {
                            e.preventDefault();
                            const targetId = this.getAttribute('href');
                            const targetElement = document.querySelector(targetId);
                            if (targetElement) {
                                targetElement.scrollIntoView({ behavior: 'smooth' });
                                
                                // Remove active class from all links and add to the clicked one
                                document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
                                this.classList.add('active');
                            }
                        });
                    });
                    
                    // Highlight sidebar links based on scroll position using Intersection Observer
                    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
                    const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
                    
                    // Create a map of heading IDs to their corresponding sidebar links
                    const idToLinkMap = new Map();
                    sidebarLinks.forEach(link => {
                        const id = link.getAttribute('href').substring(1); // Remove the # character
                        idToLinkMap.set(id, link);
                    });
                    
                    // Configure the Intersection Observer
                    const observerOptions = {
                        rootMargin: '-80px 0px -80% 0px',  // Trigger when heading is near the top
                        threshold: 0
                    };
                    
                    const headingObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            // Get the ID of the heading being observed
                            const id = entry.target.getAttribute('id');
                            // Get the corresponding sidebar link
                            const link = idToLinkMap.get(id);
                            
                            if (link) {
                                if (entry.isIntersecting) {
                                    // Remove active class from all sidebar links
                                    sidebarLinks.forEach(a => a.classList.remove('active'));
                                    // Add active class to this link
                                    link.classList.add('active');
                                }
                            }
                        });
                    }, observerOptions);
                    
                    // Observe all headings
                    headings.forEach(heading => {
                        headingObserver.observe(heading);
                    });
                    
                    document.querySelectorAll('pre code').forEach((el) => {
                        hljs.highlightElement(el);
                    });
                });
                </script>
            </body>
            </html>`;
}