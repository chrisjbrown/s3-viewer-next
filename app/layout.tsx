import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {props.children}
        {props.modal}
      </body>
    </html>
  );
}
