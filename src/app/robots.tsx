export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [],
		},
		sitemap: 'https://arthurmartins.dev/sitemap.xml',
	};
}
