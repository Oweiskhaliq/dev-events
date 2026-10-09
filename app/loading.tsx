
const Loading = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary" />

        <p className="mt-4 text-sm text-light-200">
          Loading...
        </p>
      </div>
    </main>
  );
};

export default Loading;

