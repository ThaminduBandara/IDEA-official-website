import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Home, ChevronRight, Calendar, Clock, MapPin, ArrowLeft, ArrowUpRight, 
  Share2, Tag, CheckCircle2, Bookmark, Loader2, Sparkles 
} from 'lucide-react';
import { newsData } from '../data/newsData';
import { sanityClient, ALL_NEWS_QUERY } from '../sanityClient';

export function NewsDetailPage() {
  const { id } = useParams();
  const [allNews, setAllNews] = useState(newsData);
  const [article, setArticle] = useState(() => {
    return (
      newsData.find(
        (n) =>
          n.slug === id ||
          n.id === id ||
          n.id === parseInt(id, 10) ||
          String(n.id) === String(id)
      ) || null
    );
  });
  const [loading, setLoading] = useState(!article);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    // Fetch all fresh news items from Sanity
    sanityClient
      .fetch(ALL_NEWS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setAllNews(data);
          const found = data.find(
            (n) =>
              n.slug === id ||
              n.id === id ||
              n._id === id ||
              n.id === parseInt(id, 10) ||
              String(n.id) === String(id)
          );

          if (found) {
            setArticle(found);
            setLoading(false);
          } else {
            const staticFound = newsData.find(
              (n) =>
                n.slug === id ||
                n.id === id ||
                n.id === parseInt(id, 10) ||
                String(n.id) === String(id)
            );
            if (staticFound) {
              setArticle(staticFound);
            }
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching news from Sanity for detail page:', err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (article && allNews.length > 0) {
      const activeTarget = article.slug || article.id || article._id;
      const related = allNews
        .filter((n) => (n.slug || n.id || n._id) !== activeTarget)
        .slice(0, 3);
      setRelatedNews(related);
    }
  }, [article, allNews]);

  if (loading || !article) {
    return (
      <div className="w-full min-h-screen bg-[#f7faf7] text-slate-800 pt-32 pb-20 px-6 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-[#00684a] animate-spin" />
        <p className="text-slate-600 text-sm font-semibold">Loading article details...</p>
      </div>
    );
  }

  const heroImage =
    article.image ||
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80';

  return (
    <div className="w-full min-h-screen bg-[#f7faf7] text-slate-800">
      {/* 1. CINEMATIC HERO HEADER SECTION */}
      <section className="relative flex flex-col justify-center min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] pt-24 sm:pt-28 pb-14 sm:pb-16 bg-slate-950 overflow-hidden text-white">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={article.title}
            className="w-full h-full object-cover object-center scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-emerald-950/70 z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Column: Breadcrumbs, Badges & Title */}
            <div className="space-y-3.5 max-w-3xl">
              {/* Top Breadcrumb Nav & Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <nav className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow-xs">
                  <Link to="/" className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <Link to="/news" className="hover:text-emerald-300 transition-colors">
                    News &amp; Events
                  </Link>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-emerald-300 font-bold truncate max-w-[160px] sm:max-w-xs">
                    {article.title}
                  </span>
                </nav>

                {article.postType && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-white/15 bg-[#00684a] text-white">
                    {article.postType}
                  </span>
                )}

                {article.category && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/30 shadow-xs">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{article.category}</span>
                  </div>
                )}
              </div>

              {/* Article Main Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
                {article.title}
              </h1>
            </div>

            {/* Right Column: Published Date & Location Pills */}
            {(article.publishedAt || article.location) && (
              <div className="flex flex-wrap lg:flex-row items-center gap-2.5 text-xs font-medium text-slate-200 shrink-0 lg:pb-1">
                {article.publishedAt && (
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-xs whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Published: {article.publishedAt}</span>
                  </div>
                )}

                {article.location && (
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-xs whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Venue: {article.location}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Organic Wave Cut */}
        <div className="w-full absolute -bottom-px left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-10 sm:h-14 lg:h-16 text-[#f7faf7]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C400,110 800,0 1200,70 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. MAIN ARTICLE CONTENT BODY */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
        {/* Back Button Link */}
        <div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-[#00684a] bg-white px-5 py-2.5 rounded-full border border-slate-200/90 hover:bg-[#00684a] hover:text-white transition-all shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to All News &amp; Events</span>
          </Link>
        </div>

        {/* Featured Image inside Article */}
        {article.image && (
          <div className="w-full h-[320px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-900">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Article Content Box */}
        <article className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed text-sm sm:text-base space-y-4 bg-white p-7 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm">
          {typeof article.body === 'string' && (article.body.includes('<p>') || article.body.includes('<div>')) ? (
            <div dangerouslySetInnerHTML={{ __html: article.body }} />
          ) : (
            <p className="whitespace-pre-line leading-relaxed text-slate-700">
              {article.body || article.excerpt}
            </p>
          )}
        </article>

        {/* Share & Back Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to News &amp; Events</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>Share Article:</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }
              }}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-[#00684a] transition cursor-pointer border border-slate-200"
              title="Copy Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Related News Items Section */}
        {relatedNews.length > 0 && (
          <section className="pt-10 space-y-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              More Recent News &amp; Events
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((rel, idx) => {
                const relTarget = rel.slug || rel.id || idx;
                return (
                  <div
                    key={rel.id || rel.slug || idx}
                    className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#00684a] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 line-clamp-2 hover:text-[#00684a] leading-snug">
                        <Link to={`/news/${relTarget}`}>{rel.title}</Link>
                      </h4>
                    </div>

                    <Link
                      to={`/news/${relTarget}`}
                      className="text-xs font-bold text-[#00684a] flex items-center gap-1 hover:underline pt-2"
                    >
                      <span>Read Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default NewsDetailPage;
