import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

function appearancePlugin() {
  return {
    postcssPlugin: 'appearance-plugin',
    Declaration: {
      '-webkit-appearance': (decl) => {
        // Add standard appearance property alongside webkit-appearance
        const standardAppearance = decl.clone()
        standardAppearance.prop = 'appearance'
        decl.after(standardAppearance)
      }
    }
  }
}
appearancePlugin.postcss = true

export default {
  plugins: [
    tailwindcss,
    autoprefixer({
      grid: true,
      flexbox: 'no-2009',
      cascade: true,
      add: true,
    }),
    appearancePlugin,
  ],
};