import { useEffect, useState } from "react";
import watch17 from "../assets/images/watch17.png";
import watch18 from "../assets/images/watch18.png";
import watch19 from "../assets/images/watch19.png";
import watch7 from "../assets/images/watch7.png";
import WatchGrid from "../components/watches/WatchGrid";
import { watchAPI } from "../services/api";

const Collections = () => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [page, setPage] = useState(0);
  const [size] = useState(9);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [pageContent, setPageContent] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  const collections = [
    {
      id: 1,
      name: "Classic",
      description: "Timeless elegance meets precision engineering",
      image: watch19,
      watchCount: 4,
      priceRange: "₹ 8,50,000 - ₹ 15,00,000",
      icon: "⌚",
    },
    {
      id: 2,
      name: "Sport",
      description: "Performance-driven timepieces for active lifestyles",
      image: watch18,
      watchCount: 4,
      priceRange: "₹ 10,00,000 - ₹ 20,00,000",
      icon: "⚡",
    },
    {
      id: 3,
      name: "Luxury",
      description: "Exclusive masterpieces for connoisseurs",
      image: watch7,
      watchCount: 4,
      priceRange: "₹ 15,00,000 - ₹ 30,00,000",
      icon: "👑",
    },
    {
      id: 4,
      name: "Limited Edition",
      description: "Rare and collectible watches",
      image: watch17,
      watchCount: 4,
      priceRange: "₹ 25,00,000 - ₹ 50,00,000",
      icon: "💎",
    },
  ];

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await watchAPI.getAllWatches({ page, size, sortBy, sortDir });
        if (!mounted) return;
        setPageContent(resp.content || []);
        setTotalElements(resp.totalElements || 0);
        setTotalPages(resp.totalPages || 0);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Failed to load watches');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [page, size, sortBy, sortDir]);

  // Client-side filter by search query and brand
  const filteredWatches = pageContent.filter(w => {
    const matchSearch = searchQuery.trim() === '' ||
      w.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.model?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBrand = selectedBrand === 'All' || w.brand === selectedBrand;
    return matchSearch && matchBrand;
  });

  return (
    <div className="page-container">
      <style>{`
        @keyframes slideUpCards {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .collection-card {
          animation: slideUpCards 0.6s ease-out;
        }
      `}</style>

      <div style={{ marginBottom: "80px", textAlign: "center" }}>
        <h1 style={{ marginBottom: "15px" }}>Luxury Collections</h1>
        <p style={{ color: "#b0b0b0", marginBottom: "20px", fontSize: "16px" }}>
          Explore our exclusive collection of premium timepieces
        </p>
        <p style={{ color: "#c9a961", fontSize: "14px", fontStyle: "italic" }}>
          Discover watches that define your style and legacy
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "80px" }}>
        {collections.map((collection, idx) => (
          <div
            key={collection.id}
            className="collection-card"
            style={{
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              border: "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              animation: `slideUpCards 0.6s ease-out ${idx * 0.1}s backwards`,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4af37";
              e.currentTarget.style.boxShadow =
                "0 20px 50px rgba(212, 175, 55, 0.3), inset 0 0 20px rgba(212, 175, 55, 0.1)";
              e.currentTarget.style.transform = "translateY(-8px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.3)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
                color: "#0a0a0a",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                zIndex: 10,
              }}
            >
              {collection.watchCount} Watches
            </div>

            <div
              style={{
                height: "280px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0a0a0a",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  fontSize: "80px",
                  opacity: 0.1,
                  zIndex: 1,
                }}
              >
                {collection.icon}
              </div>
              <img
                src={collection.image}
                alt={collection.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                  position: "relative",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>

            <div style={{ padding: "25px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  fontSize: "22px",
                  marginBottom: "12px",
                  color: "#d4af37",
                  fontWeight: "600",
                  letterSpacing: "2px",
                }}
              >
                {collection.name}
              </h3>
              <p
                style={{
                  color: "#b0b0b0",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  flex: 1,
                  marginBottom: "15px",
                }}
              >
                {collection.description}
              </p>
              <p
                style={{
                  color: "#c9a961",
                  fontSize: "13px",
                  marginBottom: "15px",
                  fontWeight: "500",
                }}
              >
                Price Range: {collection.priceRange}
              </p>
              <button
                style={{
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
                  border: "none",
                  color: "#0a0a0a",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderRadius: "4px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(212, 175, 55, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #ffffff 0%, #d4af37 100%)";
                  e.target.style.boxShadow = "0 12px 40px rgba(212, 175, 55, 0.4)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)";
                  e.target.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.2)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Explore Collection
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(212, 175, 55, 0.2)", paddingTop: "80px", marginTop: "40px" }}>
        <style>{`
          @keyframes slideInFeatured {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .featured-heading {
            animation: slideInFeatured 0.6s ease-out;
          }
        `}</style>

        <div style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(201, 169, 97, 0.04) 100%)",
          border: "1px solid rgba(212, 175, 55, 0.15)",
          borderRadius: "12px",
          padding: "60px 40px",
          marginBottom: "20px",
          textAlign: "center",
        }}>
          <div className="featured-heading">
            <div style={{
              fontSize: "14px",
              letterSpacing: "3px",
              color: "#d4af37",
              textTransform: "uppercase",
              marginBottom: "15px",
              fontWeight: "600",
            }}>
              ✨ Premium Selection ✨
            </div>
            <h2
              style={{
                fontSize: "48px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                background: "linear-gradient(135deg, #d4af37 0%, #ffffff 50%, #c9a961 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "20px",
                fontWeight: "700",
              }}
            >
              Featured Watches
            </h2>
            <p style={{
              color: "#b0b0b0",
              fontSize: "15px",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}>
              Handpicked masterpieces from our most coveted collections
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "30px", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', flex: '1', minWidth: '220px', maxWidth: '360px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#d4af37', fontSize: '16px', pointerEvents: 'none' }}>🔍</span>
            <input
              type="text"
              placeholder="Search watches, brands..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
              style={{
                width: '100%', padding: '10px 14px 10px 40px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,175,55,0.4)',
                borderRadius: '8px', color: '#fff', fontSize: '14px',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Brand filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Rolex', 'Omega', 'TAG Heuer', 'Patek Philippe', 'Cartier', 'Breitling'].map(brand => (
              <button
                key={brand}
                onClick={() => { setSelectedBrand(brand); setPage(0); }}
                style={{
                  padding: '7px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                  border: selectedBrand === brand ? 'none' : '1px solid rgba(212,175,55,0.4)',
                  background: selectedBrand === brand ? 'linear-gradient(135deg,#d4af37,#c9a961)' : 'transparent',
                  color: selectedBrand === brand ? '#0a0a0a' : '#d4af37',
                  transition: 'all 0.2s',
                }}
              >{brand}</button>
            ))}
          </div>

          {/* Sort + count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <label style={{ color: '#b0b0b0', marginRight: 8, fontSize: '13px' }}>Sort:</label>
              <select value={sortBy + '|' + sortDir} onChange={(e) => {
                const [sBy, sDir] = e.target.value.split('|');
                setSortBy(sBy); setSortDir(sDir); setPage(0);
              }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.4)', color: '#fff', borderRadius: '6px', padding: '6px 10px' }}>
                <option value="createdAt|desc">Newest</option>
                <option value="createdAt|asc">Oldest</option>
                <option value="price|asc">Price: Low → High</option>
                <option value="price|desc">Price: High → Low</option>
                <option value="name|asc">Name A → Z</option>
                <option value="name|desc">Name Z → A</option>
              </select>
            </div>
            <div style={{ color: '#b0b0b0', fontSize: '13px' }}>
              {filteredWatches.length} watches
            </div>
          </div>
        </div>

        <WatchGrid watches={filteredWatches} />

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
          <button disabled={page <= 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Prev</button>
          <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 4 }}>
            Page {page + 1} of {totalPages}
          </div>
          <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}>Next</button>
        </div>
      </div>

      {/* Premium Benefits Section */}
      <div style={{
        marginTop: "100px",
        padding: "80px 40px",
        background: "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(201, 169, 97, 0.04) 100%)",
        border: "1px solid rgba(212, 175, 55, 0.15)",
        borderRadius: "12px",
        textAlign: "center",
      }}>
        <style>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .benefit-item {
            animation: fadeInScale 0.6s ease-out;
          }
        `}</style>

        <h2 style={{
          fontSize: "40px",
          color: "#d4af37",
          marginBottom: "15px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: "700",
        }}>
          Invest in Excellence
        </h2>

        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          marginBottom: "50px",
          maxWidth: "700px",
          margin: "0 auto 50px",
          lineHeight: "1.8",
        }}>
          Every Imperial Time timepiece comes with our promise of uncompromising quality and legendary customer service
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "40px",
        }}>
          <div className="benefit-item" style={{
            background: "rgba(10, 10, 10, 0.5)",
            padding: "30px",
            borderRadius: "8px",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#d4af37";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.15)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>✓</div>
            <h3 style={{ color: "#d4af37", marginBottom: "10px", fontSize: "16px", fontWeight: "700" }}>Authentication</h3>
            <p style={{ color: "#b0b0b0", fontSize: "13px" }}>Certified authentic with complete documentation</p>
          </div>

          <div className="benefit-item" style={{
            background: "rgba(10, 10, 10, 0.5)",
            padding: "30px",
            borderRadius: "8px",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            animationDelay: "0.1s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#d4af37";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.15)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏱️</div>
            <h3 style={{ color: "#d4af37", marginBottom: "10px", fontSize: "16px", fontWeight: "700" }}>Precision Service</h3>
            <p style={{ color: "#b0b0b0", fontSize: "13px" }}>Expert maintenance & support for lifetime</p>
          </div>

          <div className="benefit-item" style={{
            background: "rgba(10, 10, 10, 0.5)",
            padding: "30px",
            borderRadius: "8px",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            animationDelay: "0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#d4af37";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.15)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🌍</div>
            <h3 style={{ color: "#d4af37", marginBottom: "10px", fontSize: "16px", fontWeight: "700" }}>Global Shipping</h3>
            <p style={{ color: "#b0b0b0", fontSize: "13px" }}>Insured delivery to any corner of the world</p>
          </div>
        </div>

        <button style={{
          background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
          border: "none",
          color: "#0a0a0a",
          padding: "16px 50px",
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "2px",
          borderRadius: "4px",
          cursor: "pointer",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          boxShadow: "0 10px 30px rgba(212, 175, 55, 0.25)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = "0 15px 40px rgba(212, 175, 55, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.25)";
        }}>
          Start Your Collection
        </button>
      </div>
    </div>
  );
};

export default Collections;