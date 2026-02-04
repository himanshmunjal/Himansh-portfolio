# Himansh Munjal - Portfolio Website

A modern, elegant, and professional personal portfolio website built with React.js, TypeScript, and Tailwind CSS. Features glassmorphism design, smooth animations, and a comprehensive showcase of skills, projects, and experience.

## 🌟 Features

### Design & UX
- **Modern Glassmorphism Design** - Elegant glass-like components with backdrop blur effects
- **Dark/Light Theme Toggle** - Seamless theme switching with system preference detection
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Animations** - Framer Motion powered micro-interactions and page transitions
- **Creative Loading Screen** - Elegant door-opening animation on initial load

### Sections
- **Hero Section** - Dynamic greetings, animated role text, and rotating motivational quotes
- **About Me** - Professional description with interactive stats cards
- **Technology Strip** - Auto-scrolling showcase of technical skills
- **Journey** - Education timeline and professional experience
- **Skills & Expertise** - Interactive skill cards with proficiency indicators
- **Inspirational Quote** - Centered motivational section
- **Featured Projects** - Showcase of top 4 projects with detailed descriptions
- **Blog Posts** - Latest articles and technical writings
- **Connect** - Contact form and social media links
- **Footer** - Social links and back-to-top functionality

### Technical Features
- **React Router** - Smooth client-side routing
- **TypeScript** - Type-safe development
- **Framer Motion** - Advanced animations and transitions
- **Lucide React** - Beautiful, consistent icons
- **Tailwind CSS** - Utility-first styling with custom components
- **Mobile-First** - Responsive design approach

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd himansh-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/          # Page sections (Hero, About, etc.)
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── LoadingScreen.tsx  # Initial loading animation
├── pages/
│   ├── MainPage.tsx       # Main landing page
│   ├── AllProjects.tsx    # Complete projects showcase
│   └── AllBlogs.tsx       # All blog posts
├── context/
│   └── ThemeContext.tsx   # Theme management
├── App.tsx                # Main app component
├── main.tsx              # App entry point
└── index.css             # Global styles and Tailwind imports
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`. The default uses a blue color palette with proper dark mode variants.

### Content
Update the content in the respective component files:
- Personal information: `src/components/sections/HeroSection.tsx`
- About section: `src/components/sections/AboutSection.tsx`
- Projects: `src/components/sections/ProjectsSection.tsx`
- Skills: `src/components/sections/SkillsSection.tsx`

### Resume
Place your resume PDF in the `public` folder and update the download links in the header and about sections.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Theme Support

The website supports both light and dark themes with:
- System preference detection
- Manual toggle in header
- Persistent theme selection via localStorage
- Smooth transitions between themes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Contact

**Himansh Munjal**
- Email: himansh.munjal@example.com
- LinkedIn: [linkedin.com/in/himansh-munjal](https://linkedin.com/in/himansh-munjal)
- GitHub: [github.com/himansh-munjal](https://github.com/himansh-munjal)

---

Built with ❤️ using React & Tailwind CSS