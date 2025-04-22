import { ensureDir, copy } from "@std/fs";
import { walk } from "@std/fs/walk";
import { join, relative, dirname } from "@std/path";
import MarkdownIt from "npm:markdown-it";
import type { Token, Renderer } from "npm:markdown-it"; // Import types
import slugify from "npm:slugify"; // For generating slugs for IDs
import { serveDir } from "jsr:@std/http/file-server";
import hljs from 'npm:highlight.js'

// templates
import { GeneratePage } from "./src/templates/page.ts";
import { generateSubIndexContent } from "./src/templates/subIndex.ts";
import { GenerateIndex } from "./src/templates/index.ts";

console.log("Deno Markdown Site Generator");

// --- Configuration ---
const STATIC_DIR = "static"
const INPUT_DIR = "notes";
const OUTPUT_DIR = "dist";

if (!INPUT_DIR || !OUTPUT_DIR) {
  console.error("Error: Input directory path is required. Use --input or -i.");
  Deno.exit(1);
} else {
  console.log(`Input directory: ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

async function copyFolder(origin: string, destination: string) {
  try {
    await ensureDir(dirname(destination)); // Ensure parent of static dest exists
    await copy(origin, destination, { overwrite: true });
    console.log(`Copied static files from ${origin} to ${destination}`);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.warn(`Static directory not found at ${origin}, skipping copy.`);
    } else {
      console.error(`Error copying static files:`, error);
      Deno.exit(1);
    }
  }
}

// Check if a file path is an image based on extension
function isImageFile(fileName: string): boolean {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.bmp'];
  const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return imageExtensions.includes(ext);
}

// Check if a directory contains only image files
async function isImageOnlyDirectory(dirPath: string): Promise<boolean> {
  let hasFiles = false;
  let allImagesOrDirs = true;

  for await (const entry of Deno.readDir(dirPath)) {
    hasFiles = true;

    if (entry.isFile && !isImageFile(entry.name)) {
      allImagesOrDirs = false;
      break;
    }

    // Recursively check subdirectories
    if (entry.isDirectory) {
      const isSubDirImagesOnly = await isImageOnlyDirectory(join(dirPath, entry.name));
      if (!isSubDirImagesOnly) {
        allImagesOrDirs = false;
        break;
      }
    }
  }

  return hasFiles && allImagesOrDirs;
}

async function main(noDeploy:boolean = false) {
  try {
    // 1. Ensure output directory exists
    await ensureDir(OUTPUT_DIR);

    // 2. Copy static files
    const staticSourcePath = join(Deno.cwd(), STATIC_DIR); // Use Deno.cwd() for reliable path relative to script execution
    const staticDestPath = join(OUTPUT_DIR, STATIC_DIR); // Destination within output dir
    copyFolder(staticSourcePath, staticDestPath)

    // 3. Find all markdown files and all directories recursively
    const markdownFiles: string[] = [];  // notes\\Angular\\rxjs_pattern.md
    const allDirectories: string[] = [];

    for await (const entry of walk(INPUT_DIR, { includeDirs: true })) {
      if (entry.isDirectory) {
        allDirectories.push(entry.path);
      } else if (entry.path.endsWith(".md")) {
        markdownFiles.push(entry.path);
      }
    }

    console.log(`Found ${markdownFiles.length} markdown files and ${allDirectories.length} directories.`);

    // 4. Check for image-only directories and copy them
    for (const dir of allDirectories) {
      if (await isImageOnlyDirectory(dir)) {    // ES: notes\\AI\\MCP\\doc
        const relativeDirPath = relative(Deno.cwd(), dir); // notes\\AI\\MCP\\doc
        const cleanedOutputPath = relativeDirPath.replace(INPUT_DIR, '');
        const destPath = join(OUTPUT_DIR, cleanedOutputPath);
        console.log(`Found image-only directory: ${dir}`); 
        await copyFolder(dir, destPath); // dir: notes\\AI\\MCP\\doc dest: dist\\notes\\AI\\MCP\\doc
      }
    }

    if (markdownFiles.length === 0) {
      console.log("No markdown files found in the input directory.");
      return;
    }

    // 5. Process files
    await processFiles(markdownFiles, INPUT_DIR, OUTPUT_DIR);

    // 6. Generate index pages
    await generateIndexPages(markdownFiles, INPUT_DIR, OUTPUT_DIR);

    console.log("Site generation complete!");
    // 7. serving site
    if(noDeploy){
      Deno.serve((_req: Request) => {
        return serveDir(_req, {
          fsRoot: OUTPUT_DIR,
          urlRoot: "",
        });
      });
    }
  } catch (error) {
    console.error("An error occurred during site generation:", error);
    Deno.exit(1);
  }
}

async function processFiles(files: string[], inputBase: string, outputBase: string) {
  console.log("Processing files...");

  // Instantiate markdown-it
  const md = new MarkdownIt({
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (err) {
          console.log(err)
        }
      }

      return ''; // use external default escaping
    }
  });

  // Store headers globally for simplicity in this example
  let currentHeaders: { level: number; text: string; id: string }[] = [];

  // Add a custom rule to capture headers and add IDs
  const originalHeadingOpen = md.renderer.rules.heading_open || function (tokens: Token[], idx: number, options: MarkdownIt.Options, env: unknown, self: Renderer) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.heading_open = (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: Renderer): string => {
    const token = tokens[idx];
    const level = parseInt(token.tag.substring(1), 10); // h1 -> 1, h2 -> 2, etc.
    const textToken = tokens[idx + 1]; // The inline token containing the text
    const rawText = textToken.content;

    // Generate a slug using the slugify library
    // Access the function via .default for CommonJS compatibility
    const id = slugify.default(rawText, { lower: true, strict: true });

    // Add the ID attribute to the heading tag
    token.attrSet('id', id);

    // Store header info
    currentHeaders.push({ level, text: rawText, id });

    // Render the original heading tag with the new ID attribute
    return originalHeadingOpen(tokens, idx, options, env, self);
  };


  for (const file of files) {
    currentHeaders = []; // Clear headers for each new file
    const relativePath = relative(inputBase, file);  // notes notes\\AI\\aider.md -> AI\\aider.md
    const outputPath = join(outputBase, relativePath.replace(/\.md$/, ".html")); // -> dist\\AI\\aider.html
    const outputDirPath = dirname(outputPath);  // -> dist\\AI
    const cssRelativePath = relative(outputDirPath, join(outputBase, STATIC_DIR, "style.css"));

    console.log(`  Processing: ${file} -> ${outputPath}`);

    try {
      const markdownContent = await Deno.readTextFile(file);
      // Parse the markdown content using markdown-it
      // The custom rule will populate currentHeaders and add IDs
      const htmlContent = md.render(markdownContent);

      // Generate sidebar HTML from collected headers
      let sidebarHtml = '<h2>Headers</h2>\n<ul>\n';
      currentHeaders.forEach(header => {
        // Indent based on level, if desired (simple list for now)
        sidebarHtml += `  <li><a href="#${header.id}">${header.text}</a></li>\n`;
      });
      sidebarHtml += '</ul>';


      // Basic HTML structure with sidebar and main content area
      const fullHtml = GeneratePage({ htmlContent, sidebarHtml, relativePath, cssRelativePath })
      await ensureDir(outputDirPath); // Ensure parent directory exists
      await Deno.writeTextFile(outputPath, fullHtml);

    } catch (err) {
      console.error(`Error processing file ${file}:`, err);
    }
  }
  console.log("File processing finished.");
}

async function generateIndexPages(files: string[], inputBase: string, outputBase: string) {
  console.log("Generating index pages...");

  // Store all directories and their files
  // Format: { 'dirPath': { files: ['file1.md', 'file2.md'], subDirs: ['subDir1', 'subDir2'] } }
  const directoryStructure: Record<string, { files: string[], subDirs: Set<string> }> = {};

  // 1. Build complete directory structure map with subdirectories
  files.forEach(file => {
    const relativePath = relative(inputBase, file);
    const parts = relativePath.split(/[\\/]/); // Split path by / or \
    const fileName = parts.pop()!; // Remove and store the filename

    // Process all path segments to build the full directory structure
    let currentPath = "";
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const parentPath = currentPath;

      // Update current path
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      // Initialize directory structure if needed
      if (!directoryStructure[currentPath]) {
        directoryStructure[currentPath] = { files: [], subDirs: new Set<string>() };
      }

      // If there's a parent, add current dir as subdirectory to parent
      if (parentPath) {
        if (!directoryStructure[parentPath]) {
          directoryStructure[parentPath] = { files: [], subDirs: new Set<string>() };
        }
        directoryStructure[parentPath].subDirs.add(part);
      }
    }

    // Add the file to its directory
    if (parts.length > 0) {
      const dirPath = parts.join('/');
      if (!directoryStructure[dirPath]) {
        directoryStructure[dirPath] = { files: [], subDirs: new Set<string>() };
      }
      directoryStructure[dirPath].files.push(fileName);
    }
  });

  // Get top-level directories
  const topLevelDirs = new Set<string>();
  for (const dirPath of Object.keys(directoryStructure)) {
    if (!dirPath.includes('/')) {
      topLevelDirs.add(dirPath);
    }
  }

  // 2. Generate Main Index Page (Top-Level Directories)
  const mainIndexPath = join(outputBase, "index.html");
  // CSS path relative from root index to the copied static dir
  const mainCssRelativePath = './static/style.css';
  const mainIndexContent = GenerateIndex(mainCssRelativePath, topLevelDirs);

  await Deno.writeTextFile(mainIndexPath, mainIndexContent);
  console.log(`Generated main index: ${mainIndexPath}`);

  // 3. Generate Sub-Index Pages for every directory in the hierarchy
  for (const [dirPath, { files, subDirs }] of Object.entries(directoryStructure)) {
    const subIndexPath = join(outputBase, dirPath, "index.html");
    const subIndexDirPath = dirname(subIndexPath);
    // CSS path relative from sub-index dir to the copied static dir
    // subIndexDirPath -> dist\\AI
    // outputBase -> dist
    const subCssRelativePath = relative(subIndexDirPath, join(outputBase, STATIC_DIR, "style.css"));

    // Generate content with both files and subdirectories
    const subIndexContent = generateSubIndexContent(
      dirPath,
      files,
      subCssRelativePath,
      join('/', relative(outputBase, mainIndexPath)),
      Array.from(subDirs)
    );

    await ensureDir(subIndexDirPath); // Ensure directory exists
    await Deno.writeTextFile(subIndexPath, subIndexContent);
    console.log(`Generated sub-index: ${subIndexPath}`);
  }

  console.log("Index page generation finished.");
}

// Parse command-line arguments
const args = Deno.args;
let noDeploy = false;

for (const arg of args) {
  if (arg === "--nodeploy") {
    noDeploy = true;
    break;
  }
}

await main(noDeploy);