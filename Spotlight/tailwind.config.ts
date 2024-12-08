import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['"General Sans", sans-serif']
    },
    extend: {
      keyframes: {
        tada: {
          "0%": {
              transform: "scale3d(1, 1, 1)",
          },
          "10%, 20%": {
              transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)",
          },
          "30%, 50%, 70%, 90%": {
              transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)",
          },
          "40%, 60%, 80%": {
              transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)",
          },
          "100%": {
              transform: "scale3d(1, 1, 1)",
          },
      },
  
      },
      animation: {
        tada: 'tada 1s ease-in-out 0.25s 1',
      },


      colors: getColorConfig(),
    },
  },
  plugins: [

  ]
}

export default tailwindConfig;

function getColorConfig() {

  const colors = ["primary", "secondary", "tertiary", "surface", "error", "warn", "success"];

  const colorConfig: Record<string, string> = {};

  colors.forEach(color => {

    // Mapping all variations for each color
    colorConfig[color] = `var(--mat-sys-${color})`;
    colorConfig[`${color}-variant`] = `var(--mat-sys-${color}-variant)`;
    colorConfig[`${color}-bright`] = `var(--mat-sys-${color}-bright)`;
    colorConfig[`${color}-dim`] = `var(--mat-sys-${color}-dim)`;
    colorConfig[`${color}-tint`] = `var(--mat-sys-${color}-tint)`;
    colorConfig[`${color}-container`] = `var(--mat-sys-${color}-container)`;
    colorConfig[`${color}-container-low`] = `var(--mat-sys-${color}-container-low)`;
    colorConfig[`${color}-container-lowest`] = `var(--mat-sys-${color}-container-lowest)`;
    colorConfig[`${color}-container-high`] = `var(--mat-sys-${color}-container-high)`;
    colorConfig[`${color}-container-highest`] = `var(--mat-sys-${color}-container-highest)`;
    colorConfig[`inverse-${color}`] = `var(--mat-sys-inverse-${color})`;
    colorConfig[`on-${color}`] = `var(--mat-sys-on-${color})`;
    colorConfig[`on-${color}-variant`] = `var(--mat-sys-on-${color}-variant)`;
    colorConfig[`on-${color}-container`] = `var(--mat-sys-on-${color}-container)`;
    colorConfig[`on-${color}-fixed`] = `var(--mat-sys-on-${color}-fixed)`;
    colorConfig[`${color}-fixed`] = `var(--mat-sys-${color}-fixed)`;
    colorConfig[`${color}-fixed-dim`] = `var(--mat-sys-${color}-fixed-dim)`;
    colorConfig[`on-${color}-fixed-variant`] = `var(--mat-sys-on-${color}-fixed-variant)`;
  });

  colorConfig['outline'] = "var(--mat-sys-outline)";
  colorConfig['outline-variant'] = "var(--mat-sys-outline-variant)"

  return colorConfig;
}