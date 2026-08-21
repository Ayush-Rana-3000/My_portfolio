/**
 * Portfolio Project Data
 * Only verified information is included. No invented metrics or features.
 * Property names are double-quoted so the array is valid JSON.
 */
window.PORTFOLIO_PROJECTS = [
  {
    "id": "lumawall",
    "title": "LumaWall",
    "tagline": "Desktop live-wallpaper application with procedural engines, photo parallax, and multi-monitor support.",
    "description": "A desktop application that replaces static wallpapers with interactive, animated scenes rendered behind desktop icons. Built with Tauri 2 (Rust backend) and React (TypeScript frontend), it uses WebView2 for web-based wallpaper rendering and Win32 APIs for system integration. The application includes 17 procedural wallpaper engines, photo wallpapers with depth parallax, interactive WebGL scenes, and a custom package format for distributing wallpaper bundles.",
    "technologies": ["Rust", "TypeScript", "React", "Tauri 2", "Zustand", "WebGL", "WebView2", "Vite", "Tailwind CSS"],
    "highlights": [
      "17 procedural wallpaper engines including Matrix, Nebula, Particles, Waves, and Rain",
      "Depth parallax with up to 6 independent layers from a single image",
      "Multi-monitor support with Independent, Clone, and Span modes",
      "Custom .lumawall package format for portable, shareable wallpaper bundles",
      "Performance modes: Battery, Balanced, Performance, Quality"
    ],
    "image": "../project-images/lumawall/main.png",
    "imageAlt": "LumaWall dashboard showing live wallpaper with library and settings panels",
    "gallery": [
      { "src": "../project-images/lumawall/library.png", "alt": "LumaWall wallpaper library view", "caption": "Wallpaper library with categorized collections" },
      { "src": "../project-images/lumawall/settings.png", "alt": "LumaWall settings panel", "caption": "Performance and display settings" },
      { "src": "../project-images/lumawall/lumawall-dashboard.png", "alt": "LumaWall main dashboard", "caption": "Main application dashboard" }
    ],
    "githubUrl": "https://github.com/Ayush-Rana-3000/LumaWall",
    "demoUrl": null,
    "status": "featured",
    "imageAlt": "LumaWall dashboard showing live wallpaper with library and settings panels"
  },
  {
    "id": "image-viewer",
    "title": "Image Viewer",
    "tagline": "Web application for user authentication and cloud-based image management.",
    "description": "A responsive image management platform with login/signup authentication, image upload to cloud storage, and a gallery view with modal preview. Built with vanilla HTML, CSS, and JavaScript, integrated with Firebase for authentication, Firestore for metadata, and Firebase Storage for image hosting. The dashboard provides navigation between gallery, upload, and account management.",
    "technologies": ["HTML", "CSS", "JavaScript", "Firebase Auth", "Firestore", "Firebase Storage"],
    "highlights": [
      "User authentication with login and signup flows using Firebase Auth",
      "Image upload to Firebase Storage with metadata stored in Firestore",
      "Gallery view with modal preview and delete functionality",
      "Responsive dashboard with navigation between Gallery, Upload, and Logout"
    ],
    "image": null,
    "imageAlt": "Image Viewer dashboard showing a gallery of uploaded images",
    "githubUrl": "https://github.com/Ayush-Rana-3000/Image-viewer",
    "demoUrl": null,
    "status": "public",
    "imageAlt": "Image Viewer dashboard showing a gallery of uploaded images"
  },
  {
    "id": "customer-shopping-analysis",
    "title": "Customer Shopping Behavior Analysis",
    "tagline": "Data analytics pipeline from raw CSV to interactive Power BI dashboard.",
    "description": "An analytics project that processes customer shopping data through a complete pipeline: data cleaning and feature engineering in Python (Pandas, NumPy), database integration with PostgreSQL via SQLAlchemy, SQL-based business analysis, and an interactive Power BI dashboard. Demonstrates the ability to move from raw data to structured analysis to visual insights.",
    "technologies": ["Python", "Pandas", "NumPy", "PostgreSQL", "SQL", "Power BI", "SQLAlchemy", "Jupyter Notebook"],
    "highlights": [
      "Full pipeline from raw data preprocessing to interactive dashboard",
      "SQL queries answering revenue, product, and customer segmentation questions",
      "Power BI dashboard with demographic breakdowns and purchase trend visualizations",
      "Feature engineering: age groups, purchase frequency, and spending categories"
    ],
    "image": "../project-images/shopping-analysis/power-bi-dashboard.png",
    "imageAlt": "Power BI dashboard showing customer shopping behavior insights and charts",
    "githubUrl": "https://github.com/Ayush-Rana-3000/customer_shopping_bheavior_analysis",
    "demoUrl": null,
    "status": "public",
    "imageAlt": "Power BI dashboard showing customer shopping behavior insights and charts"
  },
  {
    "id": "titanic-analysis",
    "title": "Titanic Demographic Analysis",
    "tagline": "Exploratory data analysis of passenger demographics and survival patterns.",
    "description": "Analyzed Titanic datasets to identify demographic trends and survival rate correlations. Performed data cleaning and preprocessing with Pandas and NumPy, then visualized findings with Matplotlib and Seaborn to highlight age distribution, class-based survival rates, and passenger category statistics.",
    "technologies": ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    "highlights": [
      "Data cleaning and preprocessing of Titanic passenger records",
      "Visualization of age distribution, survival rates, and passenger class statistics",
      "Statistical analysis of demographic trends across passenger categories"
    ],
    "image": null,
    "imageAlt": "Charts showing Titanic passenger demographics and survival rate analysis",
    "githubUrl": null,
    "demoUrl": null,
    "status": "public",
    "imageAlt": "Charts showing Titanic passenger demographics and survival rate analysis"
  }
];
