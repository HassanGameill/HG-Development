import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // ensures JS is minified
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    domains: [
      "lh3.googleusercontent.com", 
      "avatars.githubusercontent.com",
      "utfs.io",
    ],
  },
};

export default withNextIntl(nextConfig);
