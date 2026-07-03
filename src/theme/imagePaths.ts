export interface ThemeImagePaths {
  heroBackground: string;
  footerBackground: string;
  menuBackground: string;
  logo: string;
  logoDark?: string;
  heroImage: string;
  heroImageDark?: string;
}

export const lightImages: ThemeImagePaths = {
  heroBackground: '/images/light/hero-backgroung.png',
  footerBackground: '/images/light/footer-backgroung.png',
  menuBackground: '/images/light/menu-background.png',
  logo: '/images/light/Logo.svg',
  heroImage: '/images/light/IMAGE.png',
};

export const darkImages: ThemeImagePaths = {
  heroBackground: '/images/dark/hero-backgroung-dark.png',
  footerBackground: '/images/dark/footer-backgroung-dark.png',
  menuBackground: '/images/dark/menu-background-dark.png',
  logo: '/images/dark/Logo.svg',
  logoDark: '/images/dark/Logo.svg',
  heroImage: '/images/dark/IMAGE-dark.png',
};
