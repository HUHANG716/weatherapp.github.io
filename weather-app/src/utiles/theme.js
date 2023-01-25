


const useTheme = (theme="dark") => {
  switch (theme) {
    case "dark":
      return {
        primary: "#1a1325",
        secondary: "#301c4d",
        tertiary: "#51258f",
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
