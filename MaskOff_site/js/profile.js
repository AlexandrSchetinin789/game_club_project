
const playersData = {
  'Мирамистин': {
    avatar: "PK",
    name: "Мирамистин",
    since: "января 2023",
    stats: {
      poker: { games: 30, rating: 1240 },
      mafia: { games: 12, rating: 220, wins: 8 }
    },
    games: [
      { type: "Покер", title: "Покерный вечер", date: "10 июня 2025", result: "win" },
      { type: "Мафия", title: "Мафиозная ночь", date: "20 мая 2025", result: "loss" }
    ]
  }
};

function showPlayerProfile(name) {
  const data = playersData[name];
  if (!data) return;

  document.getElementById('playerName').textContent = data.name;
  document.getElementById('playerAvatar').textContent = data.avatar;
  document.getElementById('memberSince').textContent = data.since;

  const stats = document.getElementById('playerStats');
  stats.innerHTML = `
    <li>Покер: ${data.stats.poker.games} игр, рейтинг ${data.stats.poker.rating}</li>
    <li>Мафия: ${data.stats.mafia.games} игр, рейтинг ${data.stats.mafia.rating}, побед ${data.stats.mafia.wins}</li>
  `;

  const games = document.getElementById('playerGames');
  games.innerHTML = data.games.map(game => `
    <li>${game.date} — ${game.title} (${game.type}): ${game.result}</li>
  `).join("");

  document.getElementById('profilePage').style.display = 'block';
  document.getElementById('mainContent').style.display = 'none';
  window.scrollTo(0, 0);
}

document.addEventListener('click', function(e) {
  const link = e.target.closest('.player-link');
  if (link) {
    const name = link.dataset.name;
    showPlayerProfile(name);
  }
});
