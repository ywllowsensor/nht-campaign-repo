module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                urban: ['"Urban Calligraphy"', 'ui-sans-serif', 'system-ui', 'sans-serif']
            },
            colors: {
                'text': 'oklch(var(--text))',
                'background': 'oklch(var(--background))',
                'primary': 'oklch(var(--primary))',
                'secondary': 'oklch(var(--secondary))',
                'accent': 'oklch(var(--accent))',
            },
        }
    },
    plugins: []
}