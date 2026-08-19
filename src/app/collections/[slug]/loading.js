export default function CollectionLoading() {
  return (
    <div className="bg-white animate-pulse">
      <div className="min-h-[clamp(225px,50vw,100vh)] bg-[#ece8e2]" />

      <div className="flex items-center justify-center px-8 py-4 border-y border-[#C4A882]/25">
        <div className="h-4 w-28 rounded bg-[#ece8e2]" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-14 gap-3 md:px-12 px-2 md:py-6 py-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="mt-4 md:mt-0">
            <div className="aspect-[4/6] bg-[#ece8e2]" />
            <div className="mt-[1.1rem] space-y-2 flex flex-col items-center">
              <div className="h-3 w-3/4 bg-[#ece8e2]" />
              <div className="h-3 w-1/3 bg-[#ece8e2]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
