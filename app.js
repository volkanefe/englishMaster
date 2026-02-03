let currentTab = 'study';
let words = baseWords.map((w, index) => ({
    ...w,
    mastered: false,
    id: index
}));
document.getElementById("total-count").innerText = words.length;

let currentIndex = 0;
let score = 0;
let canAnswer = true;
let currentQuizWord = null;



function speak(text) {
    if (!text) return;

    if (window.electronAPI && window.electronAPI.speakNative) {
        window.electronAPI.speakNative(text);
    } else {
        console.error("electronAPI not available");
    }
}


function speakCurrentWord() {
    speak(words[currentIndex].en);
}

function init() {
    updateUI();
}

function switchTab(tab) {
  // Bölümleri gizle
  document.getElementById("study-section").classList.add("hidden");
  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("list-section").classList.add("hidden");

  // Butonları pasif yap
  document.getElementById("btn-study").classList.remove("active");
  document.getElementById("btn-quiz").classList.remove("active");
  document.getElementById("btn-list").classList.remove("active");

  // Seçilen sekmeyi aç
  document.getElementById(tab + "-section").classList.remove("hidden");
  document.getElementById("btn-" + tab).classList.add("active");

  // aktif sekmeyi kaydet
  currentTab = tab;

  // 🧪 Test moduna geçince quiz'i başlat
  if (tab === "quiz") {
    generateQuiz();
  }

  // 📊 Progress bar (stats) kontrolü
  const statsBar = document.getElementById("stats-bar");
  if (statsBar) {
    statsBar.style.display = tab === "list" ? "none" : "block";
  }

  // 🔍 ARAMA KUTUSU KONTROLÜ
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    if (tab === "list") {
      searchInput.style.display = "block"; // 👈 GÖZÜKÜR
      searchInput.focus();
    } else {
      searchInput.style.display = "none";  // 👈 GİZLENİR
      searchInput.value = "";
    }
  }
}

function updateUI() {
    document.getElementById('word-en').innerText = words[currentIndex].en;
    document.getElementById('word-tr').innerText = words[currentIndex].tr;
    document.getElementById('word-cat').innerText = `${words[currentIndex].lvl} - ${words[currentIndex].cat}`;
    updateStats();
}

function updateStats() {
    const masteredCount = words.filter(w => w.mastered).length;
    const progressFill = document.getElementById('progress-fill');
    const progressCount = document.getElementById('progress-count');
    const statLabel = document.getElementById('stat-label');

    if(currentTab === 'study') {
        statLabel.innerText = "Kelime:";
        progressCount.innerText = currentIndex + 1;
        progressFill.style.width = `${((currentIndex + 1) / words.length) * 100}%`;
    } else {
        statLabel.innerText = "Başarı:";
        progressCount.innerText = masteredCount;
        progressFill.style.width = `${(masteredCount / words.length) * 100}%`;
    }
}

function nextWord() {
    currentIndex = (currentIndex + 1) % words.length;
    updateUI();
}

function prevWord() {
    currentIndex = (currentIndex - 1 + words.length) % words.length;
    updateUI();
}

function shuffleWords() {
    words.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    updateUI();
}

// Quiz Mantığı
function generateQuiz() {
    canAnswer = true;
    // Henüz öğrenilmemiş kelimeleri filtrele
    const availableWords = words.filter(w => !w.mastered);
    
    if(availableWords.length === 0) {
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('quiz-finished').classList.remove('hidden');
        return;
    }

    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('quiz-finished').classList.add('hidden');

    currentQuizWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    document.getElementById('quiz-question-en').innerText = currentQuizWord.en;
    
    // Seçenekler (Doğru cevap + 3 rastgele yanlış cevap)
    let options = [currentQuizWord.tr];
    while(options.length < 4) {
        let randomTr = words[Math.floor(Math.random() * words.length)].tr;
        if(!options.includes(randomTr)) options.push(randomTr);
    }
    options.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('quiz-options');
    grid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(btn, opt === currentQuizWord.tr);
        grid.appendChild(btn);
    });
    
    speak(currentQuizWord.en);
    updateStats();
}

function checkAnswer(btn, isCorrect) {
    if(!canAnswer) return;
    canAnswer = false;

    if(isCorrect) {
        btn.classList.add('correct');
        score += 10;
        // Kelimeyi öğrenildi olarak işaretle
        const wordIndex = words.findIndex(w => w.id === currentQuizWord.id);
        if(wordIndex !== -1) words[wordIndex].mastered = true;
    } else {
        btn.classList.add('wrong');
        score = Math.max(0, score - 5);
    }
    document.getElementById('score').innerText = score;

    setTimeout(generateQuiz, 1000);
}

function resetQuizProgress() {
    words.forEach(w => w.mastered = false);
    score = 0;
    document.getElementById('score').innerText = score;
    generateQuiz();
}

// Liste Mantığı
function renderWordList(filteredWords = null) {
    const listContainer = document.getElementById('word-list');
    listContainer.innerHTML = '';

    // Eğer arama yapılmadıysa tüm kelimeler
    const wordsToRender = filteredWords || words;

    wordsToRender.forEach((w) => {
        const div = document.createElement('div');
        div.className = 'word-item';
        div.style.padding = "10px";
        div.style.border = "1px solid #cbd5e1";
        div.style.borderRadius = "8px";
        div.style.background = "#f8fafc";
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.marginBottom = "6px";

        div.innerHTML = `
            <span><strong>${w.en}</strong> — ${w.tr}</span>
            <span style="font-size: 0.8rem; color: #64748b;">${w.lvl} - ${w.cat}</span>
            <button class="listen-btn" onclick="speak('${w.en}')" style="margin-left:10px;">🔊</button>
        `;
        listContainer.appendChild(div);
    });
}

// Arama çubuğu ile filtreleme
function filterWords() {
    if (currentTab !== "list") return;
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = words.filter(word => 
        word.en.toLowerCase().includes(query) || word.tr.toLowerCase().includes(query)
    );
    renderWordList(filtered);
}

window.onload = init;