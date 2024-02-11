'use client';

import "./globals.css";
import Header from "./header";
import Footer from "./footer";
import { ChakraProvider } from '@chakra-ui/react'



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ChakraProvider>
          {children}
        </ChakraProvider>
        <Footer />
      </body>
    </html>
  );
}
