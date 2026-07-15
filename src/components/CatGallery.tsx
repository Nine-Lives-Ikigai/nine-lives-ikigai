import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CatImage } from '../utils/cat';

interface CatGalleryProps {
  name: string;
  hero: string;
  images: CatImage[];
  /** Optional easter-egg tooltip (e.g. a cat's secret alter ego). */
  secret?: string;
}

const CatGallery = ({ name, hero, images, secret }: CatGalleryProps) => {
  // Build one deduped list of photo URLs. `hero` leads the list; if it's
  // already present in `images` (a common data pattern here) it isn't
  // repeated, but if it's a distinct photo it's still included so it's
  // reachable via the arrows/thumbnails like any other photo.
  const gallery = useMemo(() => {
    const rest = images.map((item) => item.image);
    if (hero && !rest.includes(hero)) return [hero, ...rest];
    return rest.length > 0 ? rest : [hero].filter(Boolean);
  }, [hero, images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hasMultiple = gallery.length > 1;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % gallery.length) + gallery.length) % gallery.length);
    },
    [gallery.length]
  );

  const showPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const showNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Keyboard support while the lightbox is open: arrows to navigate, Esc to close.
  useEffect(() => {
    if (!isFullscreen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen, showPrev, showNext]);

  if (gallery.length === 0) return null;

  const activeSrc = gallery[activeIndex];
  const captionLabel = `${name} — photo ${activeIndex + 1} of ${gallery.length}`;

  return (
    <div className="cat-gallery">
      <div className="cat-gallery__main">
        {hasMultiple && (
          <button
            type="button"
            className="gallery-button gallery-button--prev"
            onClick={showPrev}
            aria-label="Previous photo"
          >
            &#8249;
          </button>
        )}

        <img
          src={activeSrc}
          alt={captionLabel}
          title={secret}
          className="cat-gallery__image"
          onClick={() => setIsFullscreen(true)}
        />

        {hasMultiple && (
          <button
            type="button"
            className="gallery-button gallery-button--next"
            onClick={showNext}
            aria-label="Next photo"
          >
            &#8250;
          </button>
        )}
      </div>

      {hasMultiple && (
        <div className="cat-gallery__thumbs">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              className={
                index === activeIndex
                  ? 'cat-gallery__thumb cat-gallery__thumb--active'
                  : 'cat-gallery__thumb'
              }
              onClick={() => goTo(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}

      {isFullscreen && (
        <div
          className="cat-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} photos`}
          onClick={() => setIsFullscreen(false)}
        >
          <button
            type="button"
            className="gallery-button gallery-button--lightbox-close"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close"
          >
            &times;
          </button>

          {hasMultiple && (
            <button
              type="button"
              className="gallery-button gallery-button--prev"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
            >
              &#8249;
            </button>
          )}

          <img
            src={activeSrc}
            alt={captionLabel}
            title={secret}
            className="cat-gallery__lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />

          {hasMultiple && (
            <button
              type="button"
              className="gallery-button gallery-button--next"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
            >
              &#8250;
            </button>
          )}

          {hasMultiple && (
            <p className="cat-gallery__lightbox-counter">
              {activeIndex + 1} / {gallery.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CatGallery;