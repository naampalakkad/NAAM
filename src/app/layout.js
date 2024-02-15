'use client';

import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
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
