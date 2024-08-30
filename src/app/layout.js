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

export const metadata = {
  title: "NAAM - Navodaya Alumni Association",
  description: "Discover the world's hidden wonders and hidden gems",
    manifest: "/manifest.json",
    keywords: [" naam", "naam website"],
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
