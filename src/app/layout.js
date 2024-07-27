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
