# Deno Markdown Site Generator

A static site generator built with Deno that transforms a [collection of Markdown files](https://github.com/LorenzoCorbella74/my-notes) into a structured HTML website.

## Features

- 📝 Converts Markdown files to HTML with syntax highlighting
- 🗂️ Automatically generates directory structure and navigation
- 📑 Creates index pages for topics and sub-topics
- 🔗 Generates table of contents sidebar from document headings
- 🌓 Dark/Light theme toggle with localStorage persistence
- 🖼️ Handles images and image-only directories
- 🚀 Built-in development server

## Getting Started

### Prerequisites

- [Deno](https://deno.com/) installed on your system

### Installation

1. Clone this repository:
2. use a folder of .md files of your choice
3. Run the generator with `deno task start`

## Acknowledgments

- Built with [Deno](https://deno.land/)
- Uses [markdown-it](https://github.com/markdown-it/markdown-it) for Markdown processing
- Code highlighting via [highlight.js](https://highlightjs.org/)