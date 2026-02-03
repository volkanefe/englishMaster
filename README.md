

# **📘 EnglishMaster**

  

**EnglishMaster**, A1–A2 (ve genişletilebilir şekilde B1–B2) seviyelerinde İngilizce kelime öğrenmeyi kolaylaştırmak için geliştirilmiş,  **Electron tabanlı masaüstü kelime öğrenme uygulamasıdır**.

  

Uygulama;  **öğrenme**,  **test**  ve  **listeleme**  olmak üzere üç ana moddan oluşur.

Kelime arama, sesli telaffuz, ilerleme takibi ve quiz sistemi içerir.

----------

## **🚀 Özellikler**

-   📚 **Kelime Öğrenme Modu**
    
    -   İngilizce kelime + Türkçe karşılık
        
    -   Seviye (A1, A2, B1, B2)
        
    -   Kategori bilgisi
        
    -   Tek tıkla sesli telaffuz
        
    
-   🧪 **Test (Quiz) Modu**
    
    -   Çoktan seçmeli sorular
        
    -   Anlık skor takibi
        
    -   Test bitince sıfırlama
        
    
-   📋 **Liste Modu**
    
    -   Tüm kelimeleri listeleme
        
    -   🔍 **Canlı arama (İngilizce + Türkçe)**
        
    -   Seviye ve kategori bilgisi
        
    -   Liste modunda progress bar gizlidir
        
    
-   🔊 **Text-to-Speech**
    
    -   Sistem üzerinden kelimeleri seslendirme
        
    
-   💻 **Electron Uyumlu**
    
    -   Windows / macOS / Linux için masaüstü uygulama
        
    

https://github.com/user-attachments/assets/85b93b6c-640a-4424-9142-80ec58a3b349



----------

## **🧠 Proje Yapısı**

```
englishMaster/
│
├── index.html        # Ana HTML yapısı (UI)
├── app.js            # Uygulama mantığı (JS)
├── words.js          # Kelime listesi (data)
├── css/
│   └── index.css     # Stil dosyası
│
├── main.js           # Electron main process
├── preload.js        # Electron güvenli köprü
│
├── package.json
└── README.md
```

----------

## **🔗 Dosyalar Arası Bağıntılar**

  

### **index.html**

-   Uygulamanın arayüzünü oluşturur
    
-   3 ana bölüm içerir:
    
    -   study-section
        
    -   quiz-section
        
    -   list-section
        
    
-   app.js  ve  words.js  dosyalarını yükler
    

----------

### **words.js**

-   Tüm kelime verilerini barındırır
    
-   Format:
    

```
{ en: "apple", tr: "elma", lvl: "A1", cat: "Meyve" }
```

-   İleride JSON veya API’den veri çekmeye uygundur
    

----------

### **app.js**

-   Tüm uygulama mantığını içerir:
    
    -   Sekme geçişleri
        
    -   Kelime öğrenme akışı
        
    -   Quiz sistemi
        
    -   Listeleme ve filtreleme
        
    -   Progress bar kontrolü
        
    -   Text-to-Speech
        
    

----------

### **index.css**

-   Tüm görsel stiller
    
-   Responsive (mobil uyumlu)
    
-   Renkler, butonlar, kart yapıları
    

----------

### **main.js**

### **(Electron)**

-   Electron ana süreci
    
-   Pencere oluşturma
    
-   Uygulama başlatma
    

----------

### **preload.js**

-   Electron güvenliği için
    
-   Renderer ↔ Node.js köprüsü
    
-   İleride dosya okuma / JSON yükleme için hazır
    

----------

## **🛠️ Kurulum**

  

### **1️⃣ Gerekli Araçlar**

-   Node.js (v18+ önerilir)
    
-   npm veya yarn
    

----------

### **2️⃣ Projeyi Klonla**

```
git clone https://github.com/kullaniciAdi/englishMaster.git
cd englishMaster
```

----------

### **3️⃣ Bağımlılıkları Yükle**

```
npm install
```

----------

### **4️⃣ Electron Uygulamayı Çalıştır**

```
npm start
```

----------

## **📦 Build (Exe / App Oluşturma)**

  

Electron Builder veya Forge kullanıyorsan:

```
npm run build
```

Bu işlem sonunda:

-   Windows →  .exe
    
-   macOS →  .app
    
-   Linux → .AppImage
    

  

çıktıları alınabilir.

----------

## **🔮 Geliştirmeye Açık Alanlar**

-   🌐 Online kelime API entegrasyonu
    
-   ☁️ Bulut senkronizasyonu
    
-   📊 İstatistik ekranı
    
-   ⭐ Favori / öğrenildi işaretleme
    
-   🎯 Seviye bazlı testler
    
-   🔑 Kullanıcı profili
    

----------

## **👨‍💻 Geliştirici**

  

**Volkan EFE**

📍 Türkiye

💡 Elektronik & Yazılım
