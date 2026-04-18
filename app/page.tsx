import LanguageWorkspace from './components/LanguageWorkspace';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-2 sm:px-6 sm:pb-12 sm:pt-2 lg:px-8">
      <LanguageWorkspace />
    </main>
  );
}
