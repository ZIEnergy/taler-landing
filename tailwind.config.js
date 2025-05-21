/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/blocks/**/*.scss",
    "./src/styles/global/*.scss",
    "./src/styles/plugins/plugins-rewrite.scss",
    "./src/styles/*.scss",
    "./src/blocks/**/*.js",
    "./src/js/**/*.js",
  ],
  theme: {
    fontFamily: {
      // 'sans': ['Space Grotesk', 'sans-serif'],
      'sans': ['\'Inter\'', 'sans-serif'],
    },
    extend: {
      fontSize: {
        '19px': ['19px', 'normal'],
      },
      minWidth: {
        '24px': '24px',
      },
      width: {
        '154px': '154px',
      },
      minHeight: {
        '24px': '24px',
      },
      height: {
        '170px': '170px',
      },
      opacity: {
        '56': '.56',
      },
      spacing: {
        '90px': '90px',
      },
      colors: {
        primary: '#070B14',
        secondary: '#FFFFFF',
        dark: '#0E1928',
        gray: '#9BA9C5',
        gray2: 'rgba(25, 45, 70, 0.4)',
        gray3: '#575C67',
        gray4: 'rgba(255, 255, 255, 0.3)',
        gray5: 'rgba(23, 39, 54, 0.3)',
        green: '#3EBE8D',
        green2: 'rgba(62, 190, 141, 0.2)',
        green3: '#22A47A',
        green4: '#153b37',
        green5: 'rgba(23, 79, 65, 0.2)',
      }
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }
      'smMax': {'max': '575.98px'},
      // => @media (max-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'mdMax': {'max': '767.98px'},
      // => @media (max-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }
      'lgMax': {'max': '991.98px'},
      // => @media (max-width: 992px) { ... }

      'xl': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xlMax': {'max': '1023.98px'},
      // => @media (max-width: 1024px) { ... }

      '2xl': '1170px',
      // => @media (min-width: 1280px) { ... }
      '2xlMax': {'max': '1169.98px'},
      // => @media (max-width: 1280px) { ... }

      '3xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '3xlMax': {'max': '1279.98px'},
      // => @media (max-width: 1280px) { ... }

      '4xl': '1440px',
      '4xlMax': {'max': '1439.98px'},
      
      '5xl': '1600px',
      '5xlMax': {'max': '1599.98px'},
    }
  },
  corePlugins: {
    container: false
  },
  plugins: [
    require('tailwind-bootstrap-grid')({
      containerMaxWidths: { sm: '100%', md: '100%', lg: '100%', xl: '1168px', '2xl': '1168px', '3xl': '1168px', '4xl': '1168px', '5xl': '1168px' },
      gridGutterWidth: '20px',
      gridColumns: 12
    }),
  ],
  safelist: [
    'flex',
  ]
  /*safelist: [
    {
      pattern: /.*!/
    }
  ]*/
}
