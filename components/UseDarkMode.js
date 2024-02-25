import { useEffect, useState } from 'react';

const UseDarkMode = () => {
  const [theme, setTheme] = useState('lightTheme');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === 'lightTheme' ? setMode('darkTheme') : setMode('lightTheme');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme ? setTheme(localTheme) : setMode('lightTheme');
    setMountedComponent(true);
  }, []);

  return [theme, themeToggler, mountedComponent];
};

export default UseDarkMode;