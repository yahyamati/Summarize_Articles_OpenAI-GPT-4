module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(0.6)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0' },
          '100%': { transform: 'scale(0.6)', opacity: '1' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pulse: 'pulse 1s ease-in-out infinite',
        spin: 'spin 2s linear infinite',
      },
      screens: {
        '2xs': '400px', // Extra extra small devices
        'xs': '475px',  // Extra small devices
        'sm': '640px',  // Small devices (phones, 640px and up)
        'md': '768px',  // Medium devices (tablets, 768px and up)
        'lg': '1024px', // Large devices (desktops, 1024px and up)
        'xl': '1280px', // Extra large devices (large desktops, 1280px and up)
        '2lg': '1400px',
        '2xl': '1536px' // Extra extra large devices (larger desktops, 1536px and up)
      },
    },
  },
  plugins: [],
}
