module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1E1E2F', // Purple-black background
        darkForeground: '#C9D1D9', // Light text for dark mode
        darkAccent: '#7C3AED', // Purple accent
        lightBackground: '#F9FAFB', // Light background
        lightForeground: '#1F2937', // Dark text for light mode
        lightAccent: '#7C3AED', // Purple accent
      },
    },
  },
  plugins: [],
};