import "./ui/globals.css";

export const metadata = {
  title: "GeoViz",
  description: "Visualizer for GeoData",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`antialiased`}>
                {children}
            </body>
        </html>
    );
}
