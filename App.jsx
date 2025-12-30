import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([]); // Kept for compatibility if we revert
  const [statusText, setStatusText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');

  // Ref to track recursion entitlement (kept for structure)
  const isAnalyzing = useRef(false);

  // n8n'deki yeni yolumuz (path) analyze2
  const WEBHOOK_URL = 'https://ux-pilot.onrender.com/webhook/analyze2';

  const handleStartAnalysis = async () => {
    if (!url) return;

    // Reset state
    setLoading(true);
    setSteps([]);
    setAnalysisResult('');
    setIsSuccess(false);
    setStatusText('Analiz Başlatılıyor...');
    isAnalyzing.current = true;

    try {
      await analyzeCycle(url);
    } catch (error) {
      console.error("Analysis Error:", error);
      setStatusText('Bağlantı Hatası: Analiz verisi alınamadı.');
      setLoading(false);
      isAnalyzing.current = false;
    }
  };

  const analyzeCycle = async (targetUrl) => {
    setStatusText('Site inceleniyor...');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      // n8n'den gelen analizi (Respond to Webhook) alıyoruz
      const text = await response.text();
      setAnalysisResult(text);
      setStatusText('Analiz Tamamlandı');
      setIsSuccess(true);

    } catch (error) {
      console.error(error);
      setStatusText(`Hata: ${error.message}`);
    } finally {
      setLoading(false);
      isAnalyzing.current = false;
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <div className="logo">UX Pilot <span className="version-badge">Gen-3</span></div>
        <div className="status-badge" style={{ opacity: loading || isSuccess ? 1 : 0 }}>
          {isSuccess ? '✅ TAMAMLANDI' : '⚡ ÇALIŞIYOR'}
        </div>
      </header>

      <div className="main-content">
        {/* LEFT COLUMN: Input & Status */}
        <div className="left-panel">
          <div className="input-card">
            <h2>Hedef Website</h2>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
              <button onClick={handleStartAnalysis} disabled={loading}>
                {loading ? '...' : 'Başlat'}
              </button>
            </div>
            <p className="status-text">{statusText}</p>
          </div>

          {isSuccess && (
            <div className="success-banner fade-in">
              <h3>🎉 Harika İş!</h3>
              <p>Web siteniz UX açısından optimize edildi.</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Results Stream */}
        <div className="right-panel">
          <div className="stream-container">
            {/* If we have a simple text result (new flow) */}
            {(analysisResult || loading) && (
              <div id="result-area" className="result-text-area" style={{ whiteSpace: 'pre-wrap', padding: '1rem', background: '#2a2a2a', borderRadius: '8px', minHeight: '100px' }}>
                {analysisResult || <p>Analiz sonuçları bekleniyor...</p>}
              </div>
            )}

            {/* Fallback for empty state */}
            {!analysisResult && !loading && (
              <div className="empty-placeholder">
                <p>Analiz sonuçları burada görünecek.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
