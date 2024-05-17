import Header from "./components/header";
import Footer from "./components/footer";
import { ChakraProvider } from '@chakra-ui/react';
import "./globals.css"
import Dochead from "@/lib/docheader"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Dochead/>
      <body>
        <Header />
        < div id="contentbody">
        <ChakraProvider>
          {children}
        </ChakraProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
