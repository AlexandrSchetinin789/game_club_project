document.addEventListener('DOMContentLoaded', function() {
            const galleryContainer = document.getElementById('galleryContainer');
            const pagination = document.getElementById('galleryPagination');
            const dots = document.querySelectorAll('.pagination-dot');
            let currentIndex = 0;
            const slideCount = document.querySelectorAll('.gallery-slide').length;
            
            // Update gallery position and active dot
            function updateGallery() {
                galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Click on dot handler
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateGallery();
                });
            });
            
            // Auto-rotate slides every 5 seconds
            let galleryInterval;
            
            function startGalleryTimer() {
                clearInterval(galleryInterval);
                galleryInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slideCount;
                    updateGallery();
                }, 5000);
            }
            
            startGalleryTimer(); // запустить при инициализации
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    currentIndex = parseInt(this.getAttribute('data-index'));
                    updateGallery();
                    startGalleryTimer(); // сброс таймера
                });
            });
            
            document.querySelectorAll('.gallery-slide').forEach(slide => {
                slide.addEventListener('click', () => {
                    startGalleryTimer(); // сброс таймера при клике
                });
            });

            
            // Rating Tabs
            const ratingTabs = document.querySelectorAll('.rating-tab');
            const ratingContents = document.querySelectorAll('.rating-content');
            
            ratingTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    ratingTabs.forEach(t => t.classList.remove('active'));
                    ratingContents.forEach(c => c.classList.remove('active'));
                    
                    this.classList.add('active');
                    document.getElementById(`${tabId}-rating`).classList.add('active');
                });
            });
            
            // Auth Tabs
            const authTabs = document.querySelectorAll('.auth-tab');
            const authContents = document.querySelectorAll('.auth-content');
            
            authTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    authTabs.forEach(t => t.classList.remove('active'));
                    authContents.forEach(c => c.classList.remove('active'));
                    
                    this.classList.add('active');
                    document.getElementById(`${tabId}Content`).classList.add('active');
                });
            });
            
            // Registration Modal
            const regModal = document.getElementById('registrationModal');
            const registerBtns = document.querySelectorAll('.register-btn');
            const closeRegModal = document.querySelector('#registrationModal .close-modal');
            const eventNameInput = document.getElementById('eventName');
            
            registerBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const eventName = this.getAttribute('data-event');
                    eventNameInput.value = eventName;
                    document.getElementById('game').value = eventName.includes('покер') ? 'Покер' : 
                                                          eventName.includes('мафия') ? 'Мафия' : 'Бункер';
                    regModal.style.display = 'flex';
                });
            });
            
            closeRegModal.addEventListener('click', function() {
                regModal.style.display = 'none';
            });
            
            // Auth Modal
            const authModal = document.getElementById('authModal');
            const authLink = document.getElementById('authLink');
            const profileNavItem = document.getElementById('profileNavItem');
            const closeAuthModal = document.querySelector('#authModal .close-modal');
            const mainContent = document.getElementById('mainContent');
            const profilePage = document.getElementById('profilePage');
            const backButton = document.getElementById('backButton');
            
            authLink.addEventListener('click', function(e) {
                e.preventDefault();
                authModal.style.display = 'flex';
            });
            
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                profilePage.style.display = 'none';
                mainContent.style.display = 'block';
                window.scrollTo(0, 0);
            });
            
            closeAuthModal.addEventListener('click', function() {
                authModal.style.display = 'none';
            });
            
            window.addEventListener('click', function(e) {
                if (e.target === regModal) {
                    regModal.style.display = 'none';
                }
                if (e.target === authModal) {
                    authModal.style.display = 'none';
                }
            });
            
            // Player links in rating tables
            const playerLinks = document.querySelectorAll('.player-link');
            
            document.addEventListener('click', function(e) {
                const target = e.target.closest('.player-link');
                if (target) {
                    e.preventDefault();
                    const playerName = target.getAttribute('data-player');
                    showPlayerProfile(playerName);
                }
            });


            // Закрытие модального окна профиля
            document.getElementById('closeProfileModal').addEventListener('click', () => {
                document.getElementById('profileModal').style.display = 'none';
            });

            
            // Show player profile function
            function showPlayerProfile(playerName) {
                const playerData = playersData[playerName];
                if (!playerData) return;
            
                const container = document.getElementById('profileContent');
            
                container.innerHTML = `
                    <div class="profile-header">
                        <div class="profile-avatar">${playerData.avatar}</div>
                        <div class="profile-info">
                            <h2>${playerData.name}</h2>
                            <p>Участник клуба с ${playerData.since}</p>
                        </div>
                    </div>
            
                    <div class="profile-tabs">
                        <button class="profile-tab active" data-tab="stats">Статистика</button>
                        <button class="profile-tab" data-tab="history">История игр</button>
                        <button class="profile-tab" data-tab="awards">Награды</button>
                    </div>
            
                    <div class="profile-content active" id="statsContent">
                        <h3>Покер</h3>
                        <div class="game-stats">
                            <div class="game-stat">
                                <div class="game-stat-value">${playerData.stats.poker.games}</div>
                                <div class="game-stat-label">Игр</div>
                            </div>
                            <div class="game-stat">
                                <div class="game-stat-value">${playerData.stats.poker.rating}</div>
                                <div class="game-stat-label">Очков</div>
                            </div>
                            <div class="game-stat">
                                <div class="game-stat-value">${playerData.stats.poker.tournaments ?? 0}</div>
                                <div class="game-stat-label">Турниров</div>
                            </div>
                        </div>
            
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #444;">
            
                        <h3>Мафия</h3>
                        <div class="game-stats">
                            <div class="game-stat">
                                <div class="game-stat-value">${playerData.stats.mafia.games}</div>
                                <div class="game-stat-label">Игр</div>
                            </div>
                            <div class="game-stat">
                                <div class="game-stat-value">${playerData.stats.mafia.rating}</div>
                                <div class="game-stat-label">Очков</div>
                            </div>
                            <div class="game-stat">
                                <div class="game-stat-value">${playerData.stats.mafia.wins}</div>
                                <div class="game-stat-label">Побед</div>
                            </div>
                            <div class="game-stat">
                                <div class="game-stat-value winrate">
                                    ${playerData.stats.mafia.games ? Math.round((playerData.stats.mafia.wins / playerData.stats.mafia.games) * 100) : 0}%
                                </div>
                                <div class="game-stat-label">Winrate</div>
                            </div>
                            <div class="game-stat">
                                <div class="game-stat-value">${playerData.stats.mafia.tournaments ?? 0}</div>
                                <div class="game-stat-label">Турниров</div>
                            </div>
                        </div>
                    </div>
            
                    <div class="profile-content" id="historyContent">
                        <h3>Последние игры</h3>
                        <div class="games-history">
                            ${playerData.games.map(game => `
                                <div class="game-record">
                                    <div class="game-info">
                                        <div class="game-icon">${game.type === 'Покер' ? 'П' : game.type === 'Мафия' ? 'М' : 'Б'}</div>
                                        <div>
                                            <h4>${game.title}</h4>
                                            <p>${game.date}</p>
                                        </div>
                                    </div>
                                    <div class="game-result ${game.result}">${game.result === 'win' ? 'Победа' : 'Поражение'}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
            
                    <div class="profile-content" id="awardsContent">
                        <h3>Награды и достижения</h3>
                        <div class="awards-grid">
                            <div class="award-card">
                                <div class="award-icon gold">🏆</div>
                                <div class="award-title">1 место в покере</div>
                                <div class="award-date">Весенний сезон 2025</div>
                            </div>
                            <div class="award-card">
                                <div class="award-icon silver">🥈</div>
                                <div class="award-title">2 место в мафии</div>
                                <div class="award-date">Зимний сезон 2024</div>
                            </div>
                            <div class="award-card">
                                <div class="award-icon bronze">🥉</div>
                                <div class="award-title">3 место в бункере</div>
                                <div class="award-date">Осенний сезон 2024</div>
                            </div>
                        </div>
                    </div>
                `;
            
                // Показываем модалку
                document.getElementById('profileModal').style.display = 'flex';
            
                // Обработчики вкладок
                const profileTabs = container.querySelectorAll('.profile-tab');
                const profileContents = container.querySelectorAll('.profile-content');
            
                profileTabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        const tabId = tab.getAttribute('data-tab');
            
                        profileTabs.forEach(t => t.classList.remove('active'));
                        profileContents.forEach(c => c.classList.remove('active'));
            
                        tab.classList.add('active');
                        container.querySelector(`#${tabId}Content`).classList.add('active');
                    });
                });
            }

            
            // Form Submissions
            const registrationForm = document.getElementById('registrationForm');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nickname = document.getElementById('nickname').value;
                const telegram = document.getElementById('telegram').value;
                const game = document.getElementById('game').value;
                const eventName = document.getElementById('eventName').value;
                
                console.log('Registration submitted:', {
                    nickname,
                    telegram,
                    game,
                    eventName
                });
                
                alert(`Спасибо, ${nickname}! Вы записаны на "${eventName}". Мы свяжемся с вами в Telegram.`);
                regModal.style.display = 'none';
                registrationForm.reset();
            });
            
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Here would be actual login logic
                console.log('Login attempt:', { email, password });
                
                // Simulate successful login
                currentUser = {
                    name: "MaskedKing",
                    email: email
                };
                
                alert('Вход выполнен!');
                authModal.style.display = 'none';
                loginForm.reset();
                
                // Update UI for logged in user
                authLink.textContent = currentUser.name;
                profileNavItem.style.display = 'block';
            });
            
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const nickname = document.getElementById('regNickname').value;
                const email = document.getElementById('regEmail').value;
                const password = document.getElementById('regPassword').value;
                const telegram = document.getElementById('regTelegram').value;
                
                // Here would be actual registration logic
                console.log('Registration attempt:', { nickname, email, password, telegram });
                
                // Simulate successful registration and login
                currentUser = {
                    name: nickname,
                    email: email
                };
                
                alert('Регистрация успешна! Выполняется вход...');
                authModal.style.display = 'none';
                registerForm.reset();
                
                // Update UI for logged in user
                authLink.textContent = currentUser.name;
                profileNavItem.style.display = 'block';
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    // НЕ применять прокрутку, если это ссылка на игрока
                    if (this.classList.contains('player-link')) return;
            
                    const href = this.getAttribute('href');
            
                    if (href === '#') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        return;
                    }
            
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });


        });
        // Gallery with timer reset
        let galleryInterval;
        const startGalleryInterval = () => {
            galleryInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateGallery();
            }, 5000);
        };
        
        // Initialize gallery
        startGalleryInterval();
        
        // Click on slide handler
        document.querySelectorAll('.gallery-slide').forEach(slide => {
            slide.addEventListener('click', function() {
                // Reset timer when manually changing slide
                clearInterval(galleryInterval);
                startGalleryInterval();
            });
        });
        
        // Profile tabs
        const profileTabs = document.querySelectorAll('.profile-tab');
        const profileContents = document.querySelectorAll('.profile-content');
        
        profileTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                profileTabs.forEach(t => t.classList.remove('active'));
                profileContents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(`${tabId}Content`).classList.add('active');
            });
        });
        
        // Update rating table with winrate for mafia
        document.getElementById('mafia-rating').innerHTML = `
            <table class="rating-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Игрок</th>
                        <th>Очки</th>
                        <th>Игр</th>
                        <th>Винрейт</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="rating-number">1</td>
                        <td><a href="#" class="player-link" data-player="Мафиозник">Мафиозник</a></td>
                        <td>1345</td>
                        <td>35</td>
                        <td class="winrate high">78%</td>
                    </tr>
                    <tr>
                        <td class="rating-number">2</td>
                        <td><a href="#" class="player-link" data-player="Шериф">Шериф</a></td>
                        <td>1280</td>
                        <td>38</td>
                        <td class="winrate high">75%</td>
                    </tr>
                    <tr>
                        <td class="rating-number">3</td>
                        <td><a href="#" class="player-link" data-player="Доктор">Доктор</a></td>
                        <td>1223</td>
                        <td>30</td>
                        <td class="winrate medium">65%</td>
                    </tr>
                    <tr>
                        <td class="rating-number">4</td>
                        <td><a href="#" class="player-link" data-player="Комиссар">Комиссар</a></td>
                        <td>1156</td>
                        <td>32</td>
                        <td class="winrate medium">62%</td>
                    </tr>
                    <tr>
                        <td class="rating-number">5</td>
                        <td><a href="#" class="player-link" data-player="Алиби">Алиби</a></td>
                        <td>1087</td>
                        <td>25</td>
                        <td class="winrate low">55%</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        // Reviews slider
        const reviewCards = document.querySelectorAll('.review-card');
        const reviewDots = document.querySelectorAll('.review-dot');
        let currentReview = 0;
        let reviewInterval;
        
        function showReview(index) {
            reviewCards.forEach(card => card.classList.remove('active'));
            reviewDots.forEach(dot => dot.classList.remove('active'));
        
            reviewCards[index].classList.add('active');
            reviewDots[index].classList.add('active');
            currentReview = index;
        }
        
        function startReviewTimer() {
            clearInterval(reviewInterval);
            reviewInterval = setInterval(() => {
                currentReview = (currentReview + 1) % reviewCards.length;
                showReview(currentReview);
            }, 7000);
        }
        
        reviewDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showReview(index);
                startReviewTimer(); // Сброс таймера при ручном клике
            });
        });
        
        startReviewTimer(); // Запуск при загрузке