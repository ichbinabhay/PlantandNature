/**
 * Main Application Logic
 * Plants and Nature: The Living Foundation of Our World
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress & Header Scroll Shadow
  const readingProgressBar = document.getElementById('reading-progress');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (readingProgressBar) {
      readingProgressBar.style.width = `${progress}%`;
    }
  });

  // 2. Theme Toggle (Light / Dark)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('plant_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('plant_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark' 
      ? '☀️<span class="tooltip">Switch to Light</span>' 
      : '🌙<span class="tooltip">Switch to Dark</span>';
  }

  // 3. Ambient Audio & Leaves Toggles in Nav
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (window.toggleNatureAudio) {
        const isPlaying = window.toggleNatureAudio();
        audioToggleBtn.classList.toggle('active', isPlaying);
        audioToggleBtn.innerHTML = isPlaying 
          ? '🔊<span class="tooltip">Mute Forest Sound</span>' 
          : '🔈<span class="tooltip">Play Forest Sounds</span>';
        
        // Sync bottom banner if present
        const bannerBtn = document.getElementById('banner-audio-btn');
        if (bannerBtn) {
          bannerBtn.textContent = isPlaying ? 'Mute Soundscape' : 'Listen to Forest Soundscape';
        }
      }
    });
  }

  const bannerBtn = document.getElementById('banner-audio-btn');
  if (bannerBtn) {
    bannerBtn.addEventListener('click', () => {
      if (audioToggleBtn) audioToggleBtn.click();
    });
  }

  const leavesToggleBtn = document.getElementById('leaves-toggle-btn');
  if (leavesToggleBtn) {
    leavesToggleBtn.addEventListener('click', () => {
      if (window.toggleAmbientLeaves) {
        const isLeavesOn = window.toggleAmbientLeaves();
        leavesToggleBtn.classList.toggle('active', isLeavesOn);
        leavesToggleBtn.innerHTML = isLeavesOn 
          ? '🍃<span class="tooltip">Disable Falling Leaves</span>' 
          : '🍂<span class="tooltip">Enable Falling Leaves</span>';
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // 4. Interactive "World Without Plants" Split Slider
  const splitViewer = document.getElementById('split-viewer');
  const splitWithPlants = document.getElementById('split-with-plants');
  const splitHandle = document.getElementById('split-handle');
  const toggleWithBtn = document.getElementById('btn-toggle-with');
  const toggleWithoutBtn = document.getElementById('btn-toggle-without');
  let isDragging = false;

  function updateSplitPosition(percentage) {
    const clamped = Math.max(5, Math.min(95, percentage));
    if (splitWithPlants) splitWithPlants.style.width = `${clamped}%`;
    if (splitHandle) splitHandle.style.left = `${clamped}%`;

    if (clamped > 50) {
      toggleWithBtn?.classList.add('active');
      toggleWithoutBtn?.classList.remove('active');
    } else {
      toggleWithBtn?.classList.remove('active');
      toggleWithoutBtn?.classList.add('active');
    }
  }

  if (splitViewer && splitHandle) {
    const handleMove = (clientX) => {
      const rect = splitViewer.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const pct = (offsetX / rect.width) * 100;
      updateSplitPosition(pct);
    };

    splitHandle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) handleMove(e.clientX);
    });

    // Touch support for mobile/tablets
    splitHandle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    }, { passive: true });

    // Quick toggle buttons
    if (toggleWithBtn) {
      toggleWithBtn.addEventListener('click', () => updateSplitPosition(80));
    }
    if (toggleWithoutBtn) {
      toggleWithoutBtn.addEventListener('click', () => updateSplitPosition(20));
    }
  }

  // 5. Interactive Photosynthesis Lab
  const btnSun = document.getElementById('input-sun');
  const btnCo2 = document.getElementById('input-co2');
  const btnH2o = document.getElementById('input-h2o');
  const molO2 = document.getElementById('mol-o2');
  const molGlucose = document.getElementById('mol-glucose');
  const plantStem = document.getElementById('plant-stem');
  const labStatusBanner = document.getElementById('lab-status');

  const photoInputs = { sun: true, co2: true, h2o: true };

  function updatePhotosynthesisState() {
    const allActive = photoInputs.sun && photoInputs.co2 && photoInputs.h2o;

    if (btnSun) btnSun.classList.toggle('active', photoInputs.sun);
    if (btnCo2) btnCo2.classList.toggle('active', photoInputs.co2);
    if (btnH2o) btnH2o.classList.toggle('active', photoInputs.h2o);

    const molSunEl = document.getElementById('mol-sun');
    const molCo2El = document.getElementById('mol-co2');
    const molH2oEl = document.getElementById('mol-h2o');

    if (molSunEl) molSunEl.style.opacity = photoInputs.sun ? '1' : '0.2';
    if (molCo2El) molCo2El.style.opacity = photoInputs.co2 ? '1' : '0.2';
    if (molH2oEl) molH2oEl.style.opacity = photoInputs.h2o ? '1' : '0.2';

    if (allActive) {
      if (molO2) { molO2.style.opacity = '1'; molO2.style.transform = 'scale(1)'; }
      if (molGlucose) { molGlucose.style.opacity = '1'; molGlucose.style.transform = 'scale(1)'; }
      if (plantStem) plantStem.style.transform = 'scale(1.1)';
      if (labStatusBanner) {
        labStatusBanner.innerHTML = '<strong>✨ Active Synthesis:</strong> 6CO₂ + 6H₂O + Sunlight ➔ <strong>C₆H₁₂O₆ (Sugar)</strong> + <strong>6O₂ (Oxygen)</strong>';
      }
    } else {
      if (molO2) { molO2.style.opacity = '0'; molO2.style.transform = 'scale(0.6)'; }
      if (molGlucose) { molGlucose.style.opacity = '0'; molGlucose.style.transform = 'scale(0.6)'; }
      if (plantStem) plantStem.style.transform = 'scale(0.95)';

      const missing = [];
      if (!photoInputs.sun) missing.push('Sunlight');
      if (!photoInputs.co2) missing.push('Carbon Dioxide');
      if (!photoInputs.h2o) missing.push('Water');

      if (labStatusBanner) {
        labStatusBanner.innerHTML = `⚠️ <em>Process paused:</em> Missing <strong>${missing.join(', ')}</strong>. Photosynthesis cannot proceed.`;
      }
    }
  }

  btnSun?.addEventListener('click', () => { photoInputs.sun = !photoInputs.sun; updatePhotosynthesisState(); });
  btnCo2?.addEventListener('click', () => { photoInputs.co2 = !photoInputs.co2; updatePhotosynthesisState(); });
  btnH2o?.addEventListener('click', () => { photoInputs.h2o = !photoInputs.h2o; updatePhotosynthesisState(); });

  // Initialize lab state
  updatePhotosynthesisState();

  // 6. Connected Ecological Web Chain Simulation
  const chainToggleBtn = document.getElementById('btn-toggle-chain');
  const chainNodes = document.querySelectorAll('.chain-node');
  let chainDamaged = false;

  if (chainToggleBtn) {
    chainToggleBtn.addEventListener('click', () => {
      chainDamaged = !chainDamaged;
      chainToggleBtn.textContent = chainDamaged ? 'Restore Wild Plants' : 'Simulate Loss of Flowering Plants';
      chainNodes.forEach((node, index) => {
        if (index > 0) {
          node.classList.toggle('failing', chainDamaged);
        }
      });
    });
  }

  // 7. Urban Heat Island Simulator
  const urbanSlider = document.getElementById('urban-heat-range');
  const tempDisplay = document.getElementById('urban-temp-val');
  const tempStatusBadge = document.getElementById('urban-status-badge');
  const urbanPreview = document.getElementById('urban-scene-preview');

  if (urbanSlider) {
    urbanSlider.addEventListener('input', (e) => {
      const greenPct = parseInt(e.target.value, 10);
      // Map 0% greenery (38°C) to 100% greenery (26°C)
      const temp = (38 - (greenPct / 100) * 12).toFixed(1);
      if (tempDisplay) tempDisplay.textContent = temp;

      if (greenPct < 30) {
        if (tempStatusBadge) {
          tempStatusBadge.textContent = 'Severe Urban Heat Island (Baked Concrete)';
          tempStatusBadge.style.background = '#fed7d7';
          tempStatusBadge.style.color = '#c53030';
        }
        if (urbanPreview) urbanPreview.style.background = 'linear-gradient(135deg, #742a2a, #9c4221)';
      } else if (greenPct < 70) {
        if (tempStatusBadge) {
          tempStatusBadge.textContent = 'Moderate Canopy (Partial Cooling)';
          tempStatusBadge.style.background = '#feebc8';
          tempStatusBadge.style.color = '#c05621';
        }
        if (urbanPreview) urbanPreview.style.background = 'linear-gradient(135deg, #744210, #2d6a4f)';
      } else {
        if (tempStatusBadge) {
          tempStatusBadge.textContent = 'Optimal Microclimate (Lush Canopy & Cool Air)';
          tempStatusBadge.style.background = '#c6f6d5';
          tempStatusBadge.style.color = '#22543d';
        }
        if (urbanPreview) urbanPreview.style.background = 'linear-gradient(135deg, #1b4332, #52b788)';
      }
    });
  }

  // 8. Interactive Pledge Generator
  const pledgeForm = document.getElementById('pledge-form');
  const pledgeCert = document.getElementById('pledge-certificate');
  const certName = document.getElementById('cert-student-name');
  const certDate = document.getElementById('cert-date');

  if (pledgeForm) {
    pledgeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('pledge-name');
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Green Ambassador';
      
      const checkedBoxes = pledgeForm.querySelectorAll('input[type="checkbox"]:checked');
      if (checkedBoxes.length === 0) {
        alert('Please select at least one green action for your pledge!');
        return;
      }

      if (certName) certName.textContent = name;
      if (certDate) {
        const today = new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        certDate.textContent = today;
      }

      if (pledgeCert) {
        pledgeCert.style.display = 'block';
        pledgeCert.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 9. Interactive Classroom Quiz
  const quizData = [
    {
      question: "Why are plants not simply decorative, but foundational to all animal and human life?",
      options: [
        "They enhance landscape aesthetics for modern architecture.",
        "They produce oxygen, absorb carbon dioxide, and provide our food, materials, and habitats.",
        "They only grow in rural and wild regions far away from humans.",
        "They eliminate the need for water cycles."
      ],
      correct: 1,
      explanation: "Plants perform photosynthesis to replenish oxygen, capture climate-warming carbon, and form the base of every terrestrial food chain and material resource."
    },
    {
      question: "Which of the following everyday commodities is directly harvested from plants?",
      options: [
        "Synthetic nylon and polyester",
        "Cotton clothing, wooden furniture, paper, and spices",
        "Stainless steel kitchenware",
        "Silicone semiconductor chips"
      ],
      correct: 1,
      explanation: "Cotton, wood, paper, grains, coffee, spices, and vegetable oils are all direct gifts from plant biology."
    },
    {
      question: "In cities, how do trees and green parks directly counteract urban heat?",
      options: [
        "By replacing the ozone layer over cities.",
        "Through shade and evapotranspiration, cooling surfaces and air by 6°C to 12°C.",
        "By preventing wind from moving through streets.",
        "By absorbing traffic sound vibrations only."
      ],
      correct: 1,
      explanation: "Trees provide natural shade and release moisture into the air (evapotranspiration), greatly lowering the urban heat island effect."
    },
    {
      question: "What happens when flowering plants decline in an ecosystem?",
      options: [
        "Nothing, animals will simply eat rocks.",
        "Pollinators like bees starve, leading to failure of food crops and ecosystem instability.",
        "The soil immediately turns into diamonds.",
        "Sunlight decreases across the planet."
      ],
      correct: 1,
      explanation: "Flowering plants feed pollinators like bees and butterflies. Without them, 75% of leading food crops suffer reproductive decline."
    },
    {
      question: "What is the core takeaway of: 'A seed is small, but it can grow into something much larger'?",
      options: [
        "Individual actions are meaningless in global challenges.",
        "Small acts of care repeated by many people can protect and restore our living world.",
        "Only giant corporations can solve environmental issues.",
        "You must become a professional botanist to make a difference."
      ],
      correct: 1,
      explanation: "Every conscious choice—planting a native herb, conserving paper, respecting green spaces—accumulates into powerful global conservation."
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizExplanationEl = document.getElementById('quiz-explanation');
  const quizProgressEl = document.getElementById('quiz-progress');
  const quizScoreEl = document.getElementById('quiz-score');
  const quizNextBtn = document.getElementById('quiz-next-btn');

  function renderQuizQuestion() {
    if (!quizQuestionEl || !quizOptionsEl) return;
    const q = quizData[currentQuestion];

    quizQuestionEl.textContent = q.question;
    quizOptionsEl.innerHTML = '';
    if (quizExplanationEl) quizExplanationEl.style.display = 'none';
    if (quizNextBtn) quizNextBtn.style.display = 'none';

    if (quizProgressEl) {
      quizProgressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    }
    if (quizScoreEl) {
      quizScoreEl.textContent = `Score: ${score}/${quizData.length}`;
    }

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = optText;
      btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
      quizOptionsEl.appendChild(btn);
    });
  }

  function handleQuizAnswer(selectedIdx, clickedBtn) {
    const q = quizData[currentQuestion];
    const buttons = quizOptionsEl.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(b => b.disabled = true);

    if (selectedIdx === q.correct) {
      clickedBtn.classList.add('correct');
      score++;
    } else {
      clickedBtn.classList.add('wrong');
      buttons[q.correct].classList.add('correct');
    }

    if (quizScoreEl) quizScoreEl.textContent = `Score: ${score}/${quizData.length}`;

    if (quizExplanationEl) {
      quizExplanationEl.textContent = q.explanation;
      quizExplanationEl.style.display = 'block';
    }

    if (quizNextBtn) {
      quizNextBtn.style.display = 'inline-flex';
      quizNextBtn.textContent = currentQuestion < quizData.length - 1 ? 'Next Question →' : 'View Results 🎉';
    }
  }

  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuizQuestion();
      } else {
        // Show Final Score
        if (quizQuestionEl) quizQuestionEl.textContent = `🎉 Quiz Completed! You scored ${score} out of ${quizData.length}!`;
        if (quizOptionsEl) {
          quizOptionsEl.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: var(--bg-body); border-radius: var(--radius-md);">
              <p style="font-size: 1.15rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.5rem;">
                ${score >= 4 ? '🌿 Outstanding Plant Champion!' : '🌱 Great effort! Keep exploring our living world!'}
              </p>
              <p style="color: var(--text-muted); font-size: 0.95rem;">
                You have demonstrated a deep understanding of why plants are the living foundation of Earth.
              </p>
              <button id="quiz-restart-btn" class="btn btn-secondary" style="margin-top: 1rem;">Retake Quiz 🔄</button>
            </div>
          `;
          document.getElementById('quiz-restart-btn')?.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            renderQuizQuestion();
          });
        }
        if (quizExplanationEl) quizExplanationEl.style.display = 'none';
        quizNextBtn.style.display = 'none';
      }
    });
  }

  // Initialize Quiz
  renderQuizQuestion();

  // 10. Web Speech Synthesis (Speech Reader with Paragraph Highlighting)
  const synth = window.speechSynthesis;
  const playSpeechBtn = document.getElementById('play-speech-btn');
  const heroAudioBtn = document.getElementById('hero-speech-audio-btn');
  const speechRateSelect = document.getElementById('speech-rate-select');
  const speechParas = document.querySelectorAll('.speech-paragraph');

  let currentUtterance = null;
  let isSpeechPlaying = false;
  let currentParaIndex = 0;

  function stopSpeech() {
    if (synth) synth.cancel();
    isSpeechPlaying = false;
    speechParas.forEach(p => p.classList.remove('speaking-now'));
    updateSpeechButtons(false);
  }

  function updateSpeechButtons(playing) {
    if (playSpeechBtn) {
      playSpeechBtn.textContent = playing ? '⏸️ Pause Speech' : '▶️ Play Full Speech';
    }
    if (heroAudioBtn) {
      heroAudioBtn.textContent = playing ? 'Pause Narration' : 'Listen to Speech';
    }
  }

  function speakParagraph(index) {
    if (!synth || index >= speechParas.length) {
      stopSpeech();
      return;
    }

    currentParaIndex = index;
    speechParas.forEach((p, idx) => {
      p.classList.toggle('speaking-now', idx === index);
    });

    const text = speechParas[index].innerText;
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.rate = speechRateSelect ? parseFloat(speechRateSelect.value) : 1.0;

    currentUtterance.onend = () => {
      if (isSpeechPlaying && currentParaIndex < speechParas.length - 1) {
        speakParagraph(currentParaIndex + 1);
      } else {
        stopSpeech();
      }
    };

    currentUtterance.onerror = () => {
      stopSpeech();
    };

    synth.speak(currentUtterance);
  }

  function toggleSpeech() {
    if (!synth) {
      alert('Text-to-Speech is not supported in this browser.');
      return;
    }

    if (isSpeechPlaying) {
      synth.pause();
      isSpeechPlaying = false;
      updateSpeechButtons(false);
    } else {
      if (synth.paused) {
        synth.resume();
        isSpeechPlaying = true;
        updateSpeechButtons(true);
      } else {
        isSpeechPlaying = true;
        updateSpeechButtons(true);
        speakParagraph(currentParaIndex);
      }
    }
  }

  playSpeechBtn?.addEventListener('click', toggleSpeech);
  heroAudioBtn?.addEventListener('click', () => {
    toggleSpeech();
    document.getElementById('speech-center')?.scrollIntoView({ behavior: 'smooth' });
  });

  const stopSpeechBtn = document.getElementById('stop-speech-btn');
  stopSpeechBtn?.addEventListener('click', () => {
    currentParaIndex = 0;
    stopSpeech();
  });

  // 11. Fullscreen Presentation Mode (Classroom Slides)
  const presentationModal = document.getElementById('presentation-modal');
  const openPresentationBtn = document.getElementById('open-presentation-btn');
  const closePresentationBtn = document.getElementById('close-presentation-btn');
  const prevSlideBtn = document.getElementById('prev-slide-btn');
  const nextSlideBtn = document.getElementById('next-slide-btn');
  const slideCounterEl = document.getElementById('slide-counter');
  const slideTitleEl = document.getElementById('slide-title');
  const slideDescEl = document.getElementById('slide-desc');
  const slideBadgeEl = document.getElementById('slide-badge');

  const slides = [
    {
      badge: "Opening Thought Experiment",
      title: "Imagine a World Without Plants",
      desc: "No forests, no crops, no shade, bare landscapes, and depleted oxygen. Plants are not passive scenery; they are the living foundation of all existence."
    },
    {
      badge: "Part 1: Everyday Life",
      title: "Plants in Every Ordinary Moment",
      desc: "From the cotton in our clothes, the wood in our homes, and the medicine in our cabinets, to our daily wheat, rice, coffee, and fruits—plants sustain human civilization."
    },
    {
      badge: "Part 2: Life Support Systems",
      title: "The Living Engine of the Biosphere",
      desc: "Through photosynthesis, plants replenish the oxygen we breathe every second, sequester gigatons of carbon dioxide, and provide shelter for millions of species."
    },
    {
      badge: "Part 3: Human Wellbeing",
      title: "Calm Minds and Cooler Cities",
      desc: "Green spaces combat urban heat islands, cool neighbourhood streets by up to 10°C, soothe mental fatigue, and provide welcoming sanctuaries for communities."
    },
    {
      badge: "Part 4: The Crisis in the Canopy",
      title: "Challenges Confronting Nature",
      desc: "Deforestation, chemical pollution, rapid climate disruption, and biodiversity loss threaten the delicate ecological web that keeps our planet habitable."
    },
    {
      badge: "Part 5: Action & Stewardship",
      title: "Small Seeds, Immense Impact",
      desc: "Protecting local parks, nurturing native plants, conserving water, reducing waste, and spreading awareness. When multiplied across communities, small acts transform the world."
    }
  ];

  let currentSlide = 0;

  function renderSlide() {
    const s = slides[currentSlide];
    if (slideBadgeEl) slideBadgeEl.textContent = s.badge;
    if (slideTitleEl) slideTitleEl.textContent = s.title;
    if (slideDescEl) slideDescEl.textContent = s.desc;
    if (slideCounterEl) slideCounterEl.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
  }

  if (openPresentationBtn && presentationModal) {
    openPresentationBtn.addEventListener('click', () => {
      presentationModal.classList.add('active');
      renderSlide();
    });

    closePresentationBtn?.addEventListener('click', () => {
      presentationModal.classList.remove('active');
    });

    prevSlideBtn?.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        renderSlide();
      }
    });

    nextSlideBtn?.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        renderSlide();
      }
    });

    // Keyboard navigation (Arrow keys & Esc)
    window.addEventListener('keydown', (e) => {
      if (!presentationModal.classList.contains('active')) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < slides.length - 1) { currentSlide++; renderSlide(); }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) { currentSlide--; renderSlide(); }
      } else if (e.key === 'Escape') {
        presentationModal.classList.remove('active');
      }
    });
  }
});
