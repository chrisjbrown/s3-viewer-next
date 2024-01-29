import '@/app/ui/global.css';
import { teko } from '@/app/ui/fonts';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${teko.className} bg-white text-white antialiased dark:bg-slate-900`}
      >
        {props.children}
      </body>
    </html>
  );
}
