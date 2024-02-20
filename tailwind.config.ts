import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
					container: {
      center: true,
    },
					colors: {
						'primary': '#8700C6',
						'secondary': '#00FF73'
					},
					backgroundImage: {
						'logo': "url('/assets/images/logo.jpg')",
					},
					width: {
						'1rem': '1rem',
						'hundred': '100%'
					},
					height: {
				
					}
				},
  },
  plugins: [],
} satisfies Config

