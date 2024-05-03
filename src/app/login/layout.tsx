export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-login items-center flex justify-center">
      {children}
    </main>
  );
}
