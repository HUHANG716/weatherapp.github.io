


const useTheme = (theme="dark") => {
  switch (theme) {
    case "dark":
      return {
       
        primary: "rgb(26,19,37) radial-gradient(circle, rgba(26,19,37,1) 0%, rgba(36,22,58,1) 100%)",
        secondary: " rgb(36,22,58) radial-gradient(circle, rgba(36,22,58,1) 0%, rgba(48,28,77,1) 100%)",
        tertiary: "rgb(81,37,143) radial-gradient(circle, rgba(81,37,143,1) 0%, rgba(100,42,181,1) 100%)",
        contrast: "#ffffff",
      };

    default:
      return {
        primary: "#ffffff",
        secondary: "#f5f5f5",
        tertiary: "#d9d9d9",
        contrast: "#000000",
      };
  }
};

export {useTheme};
