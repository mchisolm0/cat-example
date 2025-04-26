import { useState } from "react";
import { useCatImages } from "../hooks/useCatImages";

export default function CatPictures() {
  const [tag, setTag] = useState("");
  const { catImages, loading, error, noResults } = useCatImages(tag);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag"
          className="border p-2 rounded mr-2"
        />
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}
      {noResults && <div className="text-center mt-4">No results found</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-blue-700 p-4">
        {catImages.map((cat) => (
          <div key={cat.id} className="flex justify-center">
            <div className="w-[200px] h-auto bg-white rounded-lg shadow-md border-2 border-red-300 overflow-hidden">
              <img
                src={`https://cataas.com/cat/${cat.id}`}
                alt="Cat image"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
