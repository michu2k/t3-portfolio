/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./env.mjs"));

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/id/**"
      }
    ]
  },
  webpack(config) {
    // Convert *.svg imports to React components
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {and: [/\.(js|ts)x?$/]},
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    });

    return config;
  }
};

export default config;
