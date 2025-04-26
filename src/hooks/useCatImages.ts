import { useState, useEffect } from 'react';

interface CatImage {
  id: string;
  tags: string[];
  createdAt: string;
}

export function useCatImages(tag?: string) {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    async function fetchCatImages() {
      setLoading(true);
      setError(null);
      setNoResults(false);

      try {
        let url = 'https://cataas.com/api/cats?limit=20';
        if (tag) {
          url += `&tags=${tag}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCatImages(data);
        setNoResults(data.length === 0);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCatImages();
  }, [tag]);

  return { catImages, loading, error, noResults };
} 