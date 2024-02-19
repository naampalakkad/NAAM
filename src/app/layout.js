'use client';

import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ChakraProvider } from '@chakra-ui/react'

let styles={
  "main":{
    minHeight:"80vh",
  }

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ChakraProvider>
          <div id="main" style={styles.main}>{children}</div>
        </ChakraProvider>
        <Footer />
      </body>
    </html>
  );
}
