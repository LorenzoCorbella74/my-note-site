import { join } from "@std/path";

export function GenerateIndex(mainCssRelativePath:string,topLevelDirs:Set<string> ){
      let mainIndexContent = `<!DOCTYPE html>
                              <html lang="en" data-theme="light">
                              <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Main Index</title>
                                <link rel="stylesheet" href="${mainCssRelativePath}">
                              </head>
                              <body>
                                <div class="header">
                                  <h1>Topics</h1>
                                  <button id="theme-toggle" class="theme-toggle">
                                    <span class="theme-toggle-light">🌙 Dark Mode</span>
                                    <span class="theme-toggle-dark">☀️ Light Mode</span>
                                  </button>
                                </div>
                                <div class="topic-grid">`;
    
                                for (const dir of Array.from(topLevelDirs).sort()) {
                                  const dirIndexPath = join(dir, "index.html"); // Link to the directory's index
                                  mainIndexContent += `<div class="topic-box"><a href="${dirIndexPath}">${dir}</a></div>`;
                                }
                                mainIndexContent += `
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
        return mainIndexContent;
}