import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "@/GlobalContext";
//---------------------------------------------------
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//---------------------------------------------------

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Fall24 - Comp102",
  description: "Comp 102: Programming Fundamentals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick
            draggable
        />
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
