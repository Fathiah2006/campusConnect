import React, { useState, useEffect, useCallback } from "react";
import HeroAbout from "../About/heroAbout/HeroAbout";
import { Heart } from "lucide-react";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [bookmarks, setBookmarks] = useState(new Set()); // ✅ fixed

  useEffect(() => {
    fetch("/gallery.json")
      .then((res) => res.json())
      .then((data) => setGallery(data.Gallery || []))
      .catch((err) => console.error("Error loading gallery:", err));
  }, []);

  // Group images by year
  const groupedByYear = gallery.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent body scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto"; // Re-enable body scrolling
  };

  const nextImage = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % lightboxImages.length),
    [lightboxImages.length]
  );

  const prevImage = useCallback(
    () =>
      setCurrentIndex((prev) =>
        prev === 0 ? lightboxImages.length - 1 : prev - 1
      ),
    [lightboxImages.length]
  );

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextImage();
    else if (diff < -50) prevImage();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxOpen) return;

      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxOpen, nextImage, prevImage]);

  const heroProps = {
    title: "Event Gallery",
    subtitle: "Capturing Memories, Preserving Moments",
    description:
      "Explore our collection of memorable events, celebrations, and milestones captured through the lens of time.",
    backgroundImage: "/images/gallery-hero-bg.jpg",
    showButton: false,
    buttonText: "View Latest Events",
    buttonLink: "#gallery-content",
  };

  // ✅ Fixed toggleBookmark function
  const toggleBookmark = (id, e) => {
    e.stopPropagation(); // prevent opening lightbox
    setBookmarks((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(id)) newBookmarks.delete(id);
      else newBookmarks.add(id);
      return newBookmarks;
    });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroAbout {...heroProps} />

      {/* Main Gallery Content */}
      <section className="gallery-page" id="gallery-content">
        <h2>Our Gallery</h2>

        {/* Filters */}
        <div className="gallery-filters">
          <div className="filter-tabs">
            <button
              className={filter === "All" ? "active" : ""}
              onClick={() => setFilter("All")}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                className={filter === year ? "active" : ""}
                onClick={() => setFilter(year)}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="filter-dropdown">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gallery Sections */}
        {Object.entries(groupedByYear)
          .filter(([year]) => filter === "All" || filter === year)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([year, images]) => (
            <div key={year} className="gallery-section">
              <h3>
                <span>{year}</span>
              </h3>
              <div className="gallery-grid">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    className="gallery-item"
                    onClick={() => openLightbox(images, index)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        openLightbox(images, index);
                      }
                    }}
                    aria-label={`View ${img.title} in lightbox`}
                  >
                    <img src={img.image} alt={img.title} loading="lazy" />

                    {/* ✅ Heart Bookmark Button */}
                    <button
                      className={`bookmark-btn ${
                        bookmarks.has(img.id) ? "active" : ""
                      }`}
                      onClick={(e) => toggleBookmark(img.id, e)}
                      aria-label="Bookmark"
                    >
                      <Heart
                        size={20}
                        fill={bookmarks.has(img.id) ? "red" : "none"}
                        color={bookmarks.has(img.id) ? "red" : "white"}
                      />
                    </button>

                    <div className="gallery-item-overlay">
                      <h4>{img.title}</h4>
                      <p>{img.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {/* Empty State */}
        {gallery.length === 0 && (
          <div className="gallery-empty-state">
            <h3>No images found</h3>
            <p>Please check back later for new gallery updates.</p>
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="lightbox"
            onClick={(e) => {
              if (e.target.classList.contains("lightbox")) closeLightbox();
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-caption"
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              &times;
            </button>
            <button
              className="nav-btn prev"
              onClick={prevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <img
              src={lightboxImages[currentIndex]?.image}
              alt={lightboxImages[currentIndex]?.title}
              className="lightbox-img"
            />
            <p id="lightbox-caption" className="lightbox-caption">
              {lightboxImages[currentIndex]?.title} •{" "}
              {lightboxImages[currentIndex]?.category} •{" "}
              {lightboxImages[currentIndex]?.year}
            </p>
            <button
              className="nav-btn next"
              onClick={nextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default GalleryPage;
