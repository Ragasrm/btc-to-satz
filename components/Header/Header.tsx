// components/Header.tsx
type HeaderProps = {
    readonly headline: string;
  };
  
  export default function Header({ headline }: HeaderProps) {
    return (
      <header className="w-full p-6 bg-gray-800 text-center shadow-md">
        <h1 className="text-3xl md:text-5xl font-bold text-orange-500">
          {headline}
        </h1>
        <p className="text-gray-300 mt-2">
          Making Bitcoin affordable for every Indian 🚀
        </p>
      </header>
    );
  }
  