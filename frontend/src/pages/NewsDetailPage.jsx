import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Home, Calendar, Clock, MapPin, ArrowLeft, ArrowUpRight, Share2, Tag, CheckCircle2, Bookmark } from 'lucide-react';
import { newsData } from '../data/newsData';

export function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = newsData.find((n) => n.id === parseInt(id, 10));
    setArticle(found || newsData[0]);

    // Find related articles (same category or excluding current)
    const related = newsData
      .filter((n) => n.id !== parseInt(id, 10))
      .slice(0, 3);
    setRelatedNews(related);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f7faf7] pt-28 pb-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Article Loading...</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f7faf7] text-slate-800 pt-20">
      
      {/* Top Header Breadcrumbs */}
      <div className="bg-[#ebf5ee] border-b border-emerald-100 py-4 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Link to="/" className="hover:text-[#00684a]">Home</Link>
            <span>&gt;</span>
            <Link to="/news" className="hover:text-[#00684a]">News &amp; Events</Link>
            <span>&gt;</span>
            <span className="text-[#00684a] font-bold truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </nav>

          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00684a] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All News</span>
          </Link>
        </div>
      </div>

      {/* Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        
        {/* Article Metadata & Header */}
        <header className="space-y-4">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-[#00684a] text-white font-extrabold text-xs px-3.5 py-1 rounded-lg shadow-2xs">
              {article.category}
            </span>
            <span className="bg-amber-100 text-amber-900 font-bold text-xs px-3 py-1 rounded-lg border border-amber-200">
              {article.postType || 'News'}
            </span>
            <div className="flex items-center gap-1 text-slate-500 text-xs font-medium ml-auto">
              <Clock className="w-3.5 h-3.5 text-[#00684a]" />
              <span>Published: {article.publishedAt}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>

          {article.location && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00684a] bg-emerald-50 p-3 rounded-xl border border-emerald-200/60 inline-flex">
              <MapPin className="w-4 h-4 text-[#00684a] shrink-0" />
              <span>Venue / Location: {article.location}</span>
            </div>
          )}

        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed text-sm sm:text-base space-y-4 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </article>

        {/* Share & Back Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition"
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
              className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-50 text-[#00684a] transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Related News Items Section */}
        {relatedNews.length > 0 && (
          <section className="pt-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              More Recent News &amp; Events
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#00684a] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 line-clamp-2 hover:text-[#00684a]">
                      <Link to={`/news/${rel.id}`}>{rel.title}</Link>
                    </h4>
                  </div>

                  <Link
                    to={`/news/${rel.id}`}
                    className="text-xs font-bold text-[#00684a] flex items-center gap-1 hover:underline pt-2"
                  >
                    <span>Read Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

    </div>
  );
}

export default NewsDetailPage;
