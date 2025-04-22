export function GeneratePage(opt: {sidebarHtml:string, htmlContent:string, cssRelativePath:string, relativePath:string }) {
    // Calculate parent folder path
    const parentPath = opt.relativePath.includes('/') ? 
                       opt.relativePath.substring(0, opt.relativePath.lastIndexOf('/')) + '/index.html' :
                       'index.html';

    return `<!DOCTYPE html>
            <html lang="en" data-theme="light">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${opt.relativePath.replace(/\.md$/, '')}</title>
                <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/github-dark.min.css"/>
                <script src="https://unpkg.com/@highlightjs/cdn-assets@11.7.0/highlight.min.js"></script>
                <link rel="stylesheet" href="${opt.cssRelativePath}">
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
                            }
                        });
                    });
                    
                    document.querySelectorAll('pre code').forEach((el) => {
                        hljs.highlightElement(el);
                    });
                });
                </script>
            </body>
            </html>`;
}