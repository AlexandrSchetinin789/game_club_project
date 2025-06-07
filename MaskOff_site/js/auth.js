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
            
            registerForm.addEventListener