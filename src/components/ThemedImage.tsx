import React from 'react';
import { useTheme } from '../context/useTheme';
import { darkImages, lightImages, ThemeImagePaths } from '../theme/imagePaths';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
}

const imageNameMap: Record<string, keyof ThemeImagePaths> = {
  'Logo.svg': 'logo',
  'IMAGE.png': 'heroImage',
  'hero-backgroung.png': 'heroBackground',
  'footer-backgroung.png': 'footerBackground',
  'menu-background.png': 'menuBackground',
};

const ThemedImage: React.FC<Props> = ({ name, alt, ...rest }) => {
  const { effectiveTheme } = useTheme();
  const themeImages = effectiveTheme === 'dark' ? darkImages : lightImages;
  const imageKey = imageNameMap[name];

  const resolvedSrc = imageKey && themeImages[imageKey] ? themeImages[imageKey] : `/images/${effectiveTheme}/${name}`;
  const fallbackSrc = imageKey && lightImages[imageKey] ? lightImages[imageKey] : `/images/light/${name}`;

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const currentSrc = event.currentTarget.getAttribute('src');

    if (currentSrc !== fallbackSrc) {
      event.currentTarget.setAttribute('src', fallbackSrc);
    }
  };

  return <img src={resolvedSrc} alt={alt ?? name} onError={handleError} {...rest} />;
};

export default ThemedImage;
