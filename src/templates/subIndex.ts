import { relative } from "@std/path";

export function generateSubIndexContent(
    dirPath: string,
    fileList: string[],
    subCssRelativePath: string,
    mainIndexPath: string,
    subDirs: string[] = []
): string {
    let subIndexContent = `<!DOCTYPE html>
                                <html lang="en" data-theme="light">
                                <head>
                                  <meta charset="UTF-8">
                                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                  <title>Index of ${dirPath}</title>
                                  <link rel="stylesheet" href="${subCssRelativePath}">
                                </head>
                                <body>
                                  <div class="header">
                                    <h1>Index of ${dirPath}</h1>
                                    <button id="theme-toggle" class="theme-toggle">
                                      <span class="theme-toggle-light">🌙 Dark Mode</span>
                                      <span class="theme-toggle-dark">☀️ Light Mode</span>
                                    </button>
                                  </div>`;
    
    // Display subdirectories first
    if (subDirs.length > 0) {
        subIndexContent += `
                            <h2>Subdirectories</h2>
                            <ul class="directory-list">`;
                            for (const subDir of subDirs.sort()) {
                                subIndexContent += `<li>📁 <a href="${subDir}/">${subDir}/</a></li>`;
                            }
                            subIndexContent += `</ul>`;
    }
    
    // Display files
    if (fileList.length > 0) {
        subIndexContent += `
            <h2 style="margin-top:1rem;">Files</h2>
            <ul class="file-list">`;
            for (const fileName of fileList.sort()) {
                if (fileName.endsWith(".md")) {
                    const htmlFileName = fileName.replace(/\.md$/, ".html");
                    subIndexContent += `<li><a href="${htmlFileName}">${fileName.replace(/\.md$/, '')}</a></li>`;
                }
            }
        subIndexContent += `</ul>`;
    }
    
    // Navigation and scripts
    subIndexContent += `
                                  <div class="nav-buttons">
                                    <a href="${mainIndexPath}" class="back-btn">← Back to Main Index</a>
                                  </div>
                                  <script>
                                    document.addEventListener('DOMContentLoaded', () => {
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
                                    });
                                  </script>
                                </body>
                                </html>`;
    return subIndexContent;
}