# Prompt: Front-end theme creationg

## Input

Create a modern theme for a front-end web component library as well as used for a componany's
product sites.

Requirements:

- It should include a light and dark theme.
- It should include root css variables.
- It should include design tokens.
- It should include shades of the colors for disabled, hover, active, pressed and other variations
  on user action.
- It must meet accessability guidelines.

Examples:

- It should mimic OXC color palette since the library is using it under the hood. Here are some of
  the colors used by OXC: - #4CE5F1 - #16171D - #FFFFFF - #3B3440 - #151D20 - #EF56EF - #32F3EF -
  #178390 - #867E8E - #9CC8FC - #7100EC
- It should mimic Bun color palette since the library is using it as the local runtime. Here are
  some of the colors used by Bun: - #FBF0DF - #14151A - #F472B6 - #E5E7EB - #6B7280 - #FBCFE8 -
  #34D399 - #60A5FA - #FCD34D - #EB8A1C - #C084FC - #A855F7 - #22D3EE - #87B5E9 - #1B3C2E -
  #FACC15 - #F87171
- It should mimic Vite color palete since the library is using it as the build too. Here are some of
  the color used by Vite: - #8558FF - #16171D - #FFFFFF - #9153D0 - #3B3440 - #B9B9BB - #B39AFF -
  #74A0B5 - #56C2C9 - #22FF73 - #FD2C1F - #FD5B12 - #FFD100 - #0073D8 - #F10756

## Output

Create a css file with variables set at the root for ligth and dark theme. The variables should use
the modern `light-dark(...)` css syntax. Create design tokens to be exported with the css. The
ouputs should be placed in /packages/theme.
