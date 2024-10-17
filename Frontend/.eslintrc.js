// .eslintrc.js
module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    // Disable or customize specific rules
    "react-hooks/exhaustive-deps": "off", // Disable exhaustive-deps for useEffect
    "react/jsx-key": "off", // Disable warning for missing key in lists
  },
};
