import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
					container: {
      center: true,
    },
					colors: {
						'primary': '#F4AEB4',
						'secondary': '#CBE4E1'
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

