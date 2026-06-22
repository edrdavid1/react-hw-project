import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
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

  const [src, setSrc] = useState<string>(resolvedSrc);

  const handleError = () => {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc);
    }
  };

  useEffect(() => {
    setSrc(resolvedSrc);
  }, [resolvedSrc]);

  return <img src={src} alt={alt ?? name} onError={handleError} {...rest} />;
};

export default ThemedImage;
