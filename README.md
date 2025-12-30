# 🩺 UX-UI Doctor - Akıllı Web Analiz Asistanı

Bu proje, girilen web sitesi adreslerini yapay zeka desteğiyle analiz ederek kullanıcı deneyimi raporları sunan gelişmiş bir araçtır.

## 🚀 Proje Hakkında
Kullanıcıdan alınan bir URL, **n8n** otomasyonu aracılığıyla **Google Gemini 2.5 Flash** modeline iletilir. Yapay zeka, hedef siteyi kullanıcı deneyimi standartlarına göre inceleyerek detaylı ve anlaşılır bir Türkçe rapor hazırlar.

## 🛠️ Teknik Özellikler
* **Arayüz (Frontend):** Modern React, Vite ve Tailwind CSS mimarisiyle geliştirildi.
* **Otomasyon (Backend):** n8n Workflow kullanılarak API ve veri akışı yönetimi sağlandı.
* **Zeka (AI):** En güncel Google Gemini 2.5 Flash modeli entegre edildi.
* **Haberleşme:** Frontend ve Backend arasında güvenli Webhook bağlantısı kuruldu.

## 📝 Kurulum
1. `my workflow.json` dosyasını n8n arayüzüne içe aktarın.
2. Webhook URL'sini frontend kodundaki ilgili alana tanımlayın.
3. Uygulamayı çalıştırarak web sitesi analizlerini başlatın.
