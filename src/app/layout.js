// app/layout.js
import Header from "./components/header";
import Footer from "./components/footer";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./globals.css";
import Dochead from "@/lib/docheader";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const APP_NAME = "NAAM Alumni Association";
const APP_DEFAULT_TITLE = "NAAM Alumni Association";
const APP_TITLE_TEMPLATE = "%s - NAAM Alumni";
const APP_DESCRIPTION =
  "Connect with fellow NAAM alumni, share experiences, and build lasting relationships.";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: "https://www.naam.com/",
    images: "https://ik.imagekit.io/0ta3q23cu/Naam/logo.webp?updatedAt=1715590880123",
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: "https://ik.imagekit.io/0ta3q23cu/Naam/logo.webp?updatedAt=1715590880123",
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Dochead />
      <body>
        <ChakraProvider>
          <Header />
          <div id="contentbody">
            {children}
          </div>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
