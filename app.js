// ============================================================
// FIREBASE
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyDdDHBF3V4nFuAuigKoQhXVOTrV6pD9PKQ",
  authDomain: "izi-spanish.firebaseapp.com",
  projectId: "izi-spanish",
  storageBucket: "izi-spanish.firebasestorage.app",
  messagingSenderId: "27894890194",
  appId: "1:27894890194:web:5ddf84584efc945d8af70b"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
let currentUser = null;

let _signingIn = false;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const GOOGLE_BTN_HTML = '<svg class="google-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.5-3.1-11.3-7.6l-6.5 5C9.7 39.6 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.9 2.4-2.5 4.5-4.5 5.9l.1-.1 6.2 5.2C36.9 40.7 44 35 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg> Войти через Google';

function signInWithGoogle() {
  if (_signingIn) return;
  _signingIn = true;
  const btn = document.querySelector('.btn-google-login');
  if (btn) { btn.disabled = true; btn.textContent = 'Подождите...'; }

  const provider = new firebase.auth.GoogleAuthProvider();
  const resetBtn = () => {
    _signingIn = false;
    if (btn) { btn.disabled = false; btn.innerHTML = GOOGLE_BTN_HTML; }
  };
  const useRedirect = () => {
    auth.signInWithRedirect(provider);
    // страница перезагрузится, кнопку не сбрасываем
  };

  // Таймаут 12 сек: если popup завис или заблокирован без ошибки — переходим на redirect
  const fallbackTimer = setTimeout(() => {
    if (_signingIn) useRedirect();
  }, 12000);

  auth.signInWithPopup(provider)
    .then(() => clearTimeout(fallbackTimer))
    .catch(err => {
      clearTimeout(fallbackTimer);
      if (err.code === 'auth/cancelled-popup-request' ||
          err.code === 'auth/popup-closed-by-user') {
        resetBtn();
        return;
      }
      if (err.code === 'auth/popup-blocked') {
        useRedirect();
        return;
      }
      resetBtn();
      console.error('signInWithPopup error:', err.code, err.message);
    })
    .finally(() => {
      if (_signingIn) resetBtn();
    });
}

// Обработка результата после redirect (fallback для браузеров где popup недоступен)
auth.getRedirectResult()
  .then(result => { if (result && result.user) console.log('redirect auth ok:', result.user.email); })
  .catch(() => {});

function signOut() {
  hideUserMenu();
  auth.signOut();
}

function showUserMenu() {
  const menu = document.getElementById('user-menu');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

function hideUserMenu() {
  document.getElementById('user-menu').style.display = 'none';
}

function renderUserInfo() {
  if (!currentUser) return;
  const name = currentUser.displayName || 'Пользователь';
  const email = currentUser.email || '';
  const photo = currentUser.photoURL;

  const avatarImg = document.getElementById('user-avatar');
  const avatarInitials = document.getElementById('user-initials');
  if (photo) {
    avatarImg.src = photo;
    avatarImg.style.display = 'block';
    avatarInitials.style.display = 'none';
  } else {
    avatarImg.style.display = 'none';
    avatarInitials.textContent = name.charAt(0).toUpperCase();
    avatarInitials.style.display = 'block';
  }

  document.getElementById('user-menu-name').textContent = name;
  document.getElementById('user-menu-email').textContent = email;
  document.getElementById('app-subtitle').textContent = `¡Hola, ${name.split(' ')[0]}!`;
}

// ============================================================
// STATE
// ============================================================
const DEFAULT_STATE = {
  streak: 0,
  lastPlayed: null,
  totalXp: 0,
  dailyXp: 0,
  dailyGoal: 50,
  level: 1,
  lessonsCompleted: 0,
  scenariosCompleted: [],
  errorLog: {},
  achievements: [],
  srs: {},  // { verbId: { interval, ef, due } }
  onboardingDone: false,
  vocabProgress: {},  // { categoryId: [greek, greek, ...] }
  currentLesson: 1
};

let state = { ...DEFAULT_STATE };

let lessonState = {
  exercises: [],
  currentIndex: 0,
  hearts: 3,
  xpEarned: 0,
  correct: 0,
  answered: false
};

let scenarioState = {
  scenarioId: null,
  currentStep: 0,
  score: 0,
  answered: false
};

const XP_PER_CORRECT = 10;
const XP_PER_SCENARIO_STEP = 15;
const EXERCISES_PER_LESSON = 10;

const GREEK_KEYS = [
  ['á','é','í','ó','ú'],
  ['ñ','ü'],
];

const PRONOUNS = ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ellas/ustedes"];
const PRONOUNS_RU = {
  "yo": "я", "tú": "ты", "él/ella/usted": "он/она/Вы",
  "nosotros": "мы", "vosotros": "вы", "ellos/ellas/ustedes": "они/Вы"
};
// VERBS array in data.js contains mixed data — filter real verbs only
const VERBS_ONLY = VERBS.filter(v => v.infinitive);

const LESSON_VERBS_COUNT = 5;
function getLessonModules() {
  const modules = [];
  for (let i = 0; i < VERBS_ONLY.length; i += LESSON_VERBS_COUNT) {
    const num = Math.floor(i / LESSON_VERBS_COUNT) + 1;
    modules.push({ id: num, verbs: VERBS_ONLY.slice(i, i + LESSON_VERBS_COUNT) });
  }
  return modules;
}

let teachState = { module: null, cards: [], currentCard: 0 };

// ============================================================
// PERSISTENCE
// ============================================================
async function loadState() {
  // Сначала загружаем из localStorage как fallback
  try {
    const saved = localStorage.getItem('greek-app-state-v2');
    if (saved) state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
  } catch (e) { state = { ...DEFAULT_STATE }; }

  // Потом синхронизируем с Firestore (приоритет)
  if (currentUser) {
    try {
      const doc = await db.collection('users').doc(currentUser.uid).get();
      if (doc.exists) {
        state = { ...DEFAULT_STATE, ...doc.data() };
        localStorage.setItem('greek-app-state-v2', JSON.stringify(state));
      }
    } catch (e) { console.error('Firestore load error:', e); }
  }
}

function saveState() {
  localStorage.setItem('greek-app-state-v2', JSON.stringify(state));
  if (currentUser) {
    db.collection('users').doc(currentUser.uid)
      .set(state)
      .catch(e => console.error('Firestore save error:', e));
  }
}

// ============================================================
// SUBSCRIPTION
// ============================================================

// Save email to Firestore so webhook can find user by email
async function saveUserEmail() {
  if (!currentUser?.email) return;
  try {
    await db.collection('users').doc(currentUser.uid).set(
      { email: currentUser.email.toLowerCase() },
      { merge: true }
    );
  } catch (e) { console.error('saveUserEmail error:', e); }
}

// Check subscription status: active / trialing = OK, else paywall
async function checkSubscription() {
  if (!currentUser) return false;

  // Developer account — always has access
  if (currentUser.email?.toLowerCase() === 'dondanilo1994@gmail.com') return true;

  // В iOS-приложении подписку подтверждает RevenueCat (native-iap.js выставляет
  // window.__iziNativeSubscription = true). На вебе всегда undefined → пропускаем.
  if (window.__iziNativeSubscription === true) return true;

  // 1. Check users/{uid}.subscription (set by webhook)
  const ACTIVE_STATUSES = ['active', 'trialing', 'on_trial', 'paid'];

  const sub = state.subscription;
  if (sub && ACTIVE_STATUSES.includes(sub.status)) {
    return true;
  }

  // 2. Also check subscriptions/{email} as fallback
  try {
    const email = currentUser.email?.toLowerCase();
    if (email) {
      const doc = await db.collection('subscriptions').doc(email).get();
      if (doc.exists) {
        const s = doc.data();
        if (ACTIVE_STATUSES.includes(s.status)) {
          // Sync to state
          state.subscription = { status: s.status, ...(s.expiresAt ? { expiresAt: s.expiresAt } : {}) };
          saveState();
          return true;
        }
      }
    }
  } catch (e) { console.error('checkSubscription error:', e); }

  return false;
}

// ==================== УДАЛЕНИЕ АККАУНТА (App Store Guideline 5.1.1(v)) ====================
// Полное удаление: данные в Firestore + сам аккаунт Firebase Auth + локальный прогресс.
function deleteAccount() {
  if (!currentUser) return;
  const m = document.getElementById('delete-account-modal');
  if (m) m.style.display = 'flex';
}

function dismissDeleteAccount() {
  const m = document.getElementById('delete-account-modal');
  if (m) m.style.display = 'none';
}

async function confirmDeleteAccount() {
  if (!currentUser) return;
  const btn = document.getElementById('delete-account-confirm');
  if (btn) { btn.disabled = true; btn.textContent = 'Удаляем…'; }
  const uid = currentUser.uid;
  try {
    // 1. Свои посты в ленте (пока есть валидный токен — иначе правила не пустят)
    const myPosts = await db.collection('posts').where('uid', '==', uid).get();
    if (!myPosts.empty) {
      const batch = db.batch();
      myPosts.forEach(d => batch.delete(d.ref));
      await batch.commit();
    }
    // 2. Подписка на пуши и документ пользователя
    await db.collection('push_subscriptions').doc(uid).delete().catch(() => {});
    await db.collection('apns_subscriptions').doc(uid).delete().catch(() => {});
    await db.collection('users').doc(uid).delete().catch(() => {});
    // (subscriptions/{email} не трогаем — платёжная запись, правила write:false)

    // 3. Локальный прогресс
    try { localStorage.removeItem('greek-app-state-v2'); localStorage.removeItem('apnsToken'); } catch (e) {}
    state = { ...DEFAULT_STATE };

    // 4. Сам аккаунт Firebase Auth (в конце — после удаления токен пропадёт)
    await currentUser.delete();

    dismissDeleteAccount();
    // onAuthStateChanged(null) сам уведёт на экран входа
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = 'Удалить навсегда'; }
    if (e.code === 'auth/requires-recent-login') {
      dismissDeleteAccount();
      alert('Для безопасности войди заново, а затем повтори удаление аккаунта.');
      auth.signOut(); // свежий вход даст «recent login», и удаление пройдёт
    } else {
      alert('Не удалось удалить аккаунт: ' + (e.message || e.code || e));
    }
  }
}

function finishOnboarding() {
  state.onboardingDone = true;
  saveState();
  showScreen('screen-home');
  // Ask for push permission after onboarding — user is already engaged
  setTimeout(setupPushNotifications, 2000);
}

const VAPID_PUBLIC_KEY = 'BLdxpa5-YAGttUm7HI9wFmiBA7fAhIV-J9vFxuNgo4zDpSxA-q6C9yjCgmITA37bm42C_9vWkHjJIckG5N7fc80';

function urlBase64ToUint8Array(base64) {
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

// В iOS-приложении Web Push недоступен (WKWebView) — пуши идут через APNs.
// native-bridge.js получает device-token и шлёт событие 'apnsToken'; здесь
// сохраняем его в Firestore-коллекцию apns_subscriptions/{uid}, откуда крон
// izispanish-webhook рассылает по APNs.
async function saveApnsToken(token) {
  if (!token || !currentUser) return;
  try {
    await db.collection('apns_subscriptions').doc(currentUser.uid).set({
      token,
      uid: currentUser.uid,
      platform: 'ios',
      updatedAt: new Date().toISOString()
    });
  } catch (e) { console.error('saveApnsToken error:', e); }
}

function isNativeApp() {
  return !!(window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function'
            && window.Capacitor.isNativePlatform());
}

async function setupPushNotifications() {
  // iOS-приложение: запрашиваем разрешение и регистрируемся на APNs, а не Web Push.
  if (isNativeApp()) {
    if (typeof window.__nativeRegisterPush === 'function') window.__nativeRegisterPush();
    // токен уже мог прийти до входа — досохраним
    if (window.__APNS_TOKEN) saveApnsToken(window.__APNS_TOKEN);
    return;
  }
  if (!('Notification' in window) || !('PushManager' in window)) return;
  if (Notification.permission === 'denied') return;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    if (currentUser) {
      await db.collection('push_subscriptions').doc(currentUser.uid).set({
        subscription: sub.toJSON(),
        uid: currentUser.uid,
        updatedAt: new Date().toISOString()
      });
    }
  } catch (e) { console.error('Push setup error:', e); }
}

// ============================================================
// PROGRESS DASHBOARD
// ============================================================
const LEAGUES = [
  { id: 'bronze',   name: 'Бронзовая лига',   icon: '🥉', min: 1,  max: 10,  color: '#CD7F32' },
  { id: 'silver',   name: 'Серебряная лига',   icon: '🥈', min: 11, max: 30,  color: '#A8A9AD' },
  { id: 'gold',     name: 'Золотая лига',      icon: '🥇', min: 31, max: 50,  color: '#FFD700' },
  { id: 'platinum', name: 'Платиновая лига',   icon: '💎', min: 51, max: 100, color: '#E5F0FF' },
];

function getLeague(level) {
  return LEAGUES.find(l => level >= l.min && level <= l.max) || LEAGUES[LEAGUES.length - 1];
}

let activeProgressTab = 'xp';

function showProgress(tab = 'xp') {
  activeProgressTab = tab;
  // Record start date if not set
  if (!state.startedAt) {
    state.startedAt = new Date().toISOString();
    saveState();
  }
  renderProgressXP();
  renderProgressLevel();
  renderProgressLessons();
  switchProgressTab(tab);
  showScreen('screen-progress');
}

function switchProgressTab(tab) {
  activeProgressTab = tab;
  ['xp', 'level', 'lessons'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
    document.getElementById(`panel-${t}`).style.display = t === tab ? 'block' : 'none';
  });
}

function renderProgressXP() {
  const xp = state.totalXp;
  const level = state.level;
  const xpForLevel = (level - 1) * 500;
  const xpNextLevel = level * 500;
  const xpInLevel = xp - xpForLevel;
  const pct = Math.min(100, Math.round(xpInLevel / 500 * 100));

  document.getElementById('pg-total-xp').textContent = xp.toLocaleString('ru-RU');
  document.getElementById('pg-xp-bar').style.width = pct + '%';
  document.getElementById('pg-xp-bar-label').textContent =
    `${xpInLevel} / 500 XP до уровня ${level + 1}`;

  const days = state.startedAt
    ? Math.max(1, Math.ceil((Date.now() - new Date(state.startedAt).getTime()) / 86400000))
    : 1;
  document.getElementById('pg-xp-days').textContent = `${days} ${pluralDays(days)} в пути`;

  document.getElementById('pg-daily-xp').textContent = state.dailyXp || 0;
  document.getElementById('pg-streak-xp').textContent = state.streak || 0;
  const lessons = state.lessonsCompleted || 0;
  document.getElementById('pg-avg-xp').textContent = lessons > 0 ? Math.round(xp / lessons) : 0;
  document.getElementById('pg-goal-xp').textContent = state.dailyGoal || 50;
}

function renderProgressLevel() {
  const level = state.level;
  const league = getLeague(level);
  const nextLeague = LEAGUES[LEAGUES.indexOf(league) + 1];

  document.getElementById('pg-league-badge').textContent = league.icon;
  document.getElementById('pg-league-name').textContent = league.name;
  document.getElementById('pg-level-val').textContent = level;

  // Progress within league
  const leagueLen = league.max - league.min + 1;
  const inLeague = level - league.min;
  const pct = Math.round(inLeague / leagueLen * 100);
  document.getElementById('pg-league-bar').style.width = pct + '%';

  if (nextLeague) {
    document.getElementById('pg-league-progress-title').textContent =
      `Прогресс в лиге (${inLeague} / ${leagueLen} уровней)`;
    document.getElementById('pg-league-bar-label').textContent =
      `До ${nextLeague.name}: ${league.max - level + 1} уровней`;
  } else {
    document.getElementById('pg-league-progress-title').textContent = 'Максимальная лига!';
    document.getElementById('pg-league-bar-label').textContent = 'Ты достиг платинового уровня 💎';
  }

  // Highlight league rows
  LEAGUES.forEach(l => {
    const row = document.getElementById(`league-${l.id}`);
    const check = document.getElementById(`lcheck-${l.id}`);
    if (!row) return;
    row.classList.remove('current', 'done');
    if (l.id === league.id) { row.classList.add('current'); check.textContent = ''; }
    else if (level > l.max) { row.classList.add('done'); check.textContent = '✅'; }
    else { check.textContent = ''; }
  });
}

function renderProgressLessons() {
  const lessons = state.lessonsCompleted || 0;
  document.getElementById('pg-lessons-val').textContent = lessons;
  document.getElementById('pg-lessons-sub').textContent =
    `Это примерно ${Math.round(lessons * 5)} минут практики`;

  const milestones = [
    { n: 1,   icon: '🌱', title: 'Первый урок',       sub: 'Начало большого пути' },
    { n: 5,   icon: '🔥', title: '5 уроков',           sub: 'Войдёшь в ритм!' },
    { n: 10,  icon: '⭐', title: '10 уроков',          sub: 'Ты серьёзен!' },
    { n: 30,  icon: '🚀', title: '30 уроков',          sub: 'Месяц практики' },
    { n: 50,  icon: '💪', title: '50 уроков',          sub: 'Полпути к мастерству' },
    { n: 100, icon: '🏆', title: '100 уроков',         sub: 'Настоящий испанец!' },
  ];
  const nextMilestone = milestones.find(m => m.n > lessons) || milestones[milestones.length - 1];
  document.getElementById('pg-milestones').innerHTML = milestones.map(m => `
    <div class="milestone-row ${lessons >= m.n ? 'done' : ''}">
      <div class="milestone-icon">${m.icon}</div>
      <div class="milestone-info">
        <div class="milestone-title">${m.title}</div>
        <div class="milestone-sub">${m.sub}</div>
      </div>
      <div class="milestone-check">${lessons >= m.n ? '✅' : `${m.n}`}</div>
    </div>`).join('');

  document.getElementById('pg-scenarios').textContent = (state.scenariosCompleted || []).length;
  const vocabLearned = Object.values(state.vocabProgress || {}).reduce((s, a) => s + a.length, 0);
  document.getElementById('pg-vocab-learned').textContent = vocabLearned;
  document.getElementById('pg-achievements').textContent = (state.achievements || []).length;
  document.getElementById('pg-streak-lessons').textContent = state.streak || 0;

  // Motivation
  const motivations = [
    { emoji: '🔥', text: `Ещё ${nextMilestone.n - lessons} уроков до «${nextMilestone.title}»`, sub: 'Ты почти там!' },
    { emoji: '🧠', text: `${vocabLearned} слов уже в голове`, sub: 'Каждое слово — шаг к гражданству' },
    { emoji: '⚡', text: `${state.totalXp} XP заработано`, sub: 'Продолжай — каждый урок считается' },
  ];
  const m = motivations[lessons % motivations.length];
  document.getElementById('pg-motivation').innerHTML = `
    <div class="progress-motivation-emoji">${m.emoji}</div>
    <div class="progress-motivation-text">${m.text}</div>
    <div class="progress-motivation-sub">${m.sub}</div>`;
}

function pluralDays(n) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'дней';
  const r = n % 10;
  if (r === 1) return 'день';
  if (r >= 2 && r <= 4) return 'дня';
  return 'дней';
}

function showSettings() {
  // User info
  if (currentUser) {
    const name = currentUser.displayName || 'Пользователь';
    const email = currentUser.email || '';
    document.getElementById('settings-user-name').textContent = name;
    document.getElementById('settings-user-email').textContent = email;
    document.getElementById('settings-initials').textContent = name.charAt(0).toUpperCase();
    const avatarEl = document.getElementById('settings-avatar');
    const initialsEl = document.getElementById('settings-initials');
    if (currentUser.photoURL) {
      avatarEl.src = currentUser.photoURL;
      avatarEl.style.display = 'block';
      initialsEl.style.display = 'none';
    } else {
      avatarEl.style.display = 'none';
      initialsEl.style.display = 'flex';
    }
  }

  // Daily goal buttons
  document.querySelectorAll('.settings-goal-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.xp) === state.dailyGoal);
  });

  // Push toggle
  const pushOn = pushPermission() === 'granted';
  document.getElementById('push-toggle').classList.toggle('on', pushOn);

  // Stats
  document.getElementById('s-total-xp').textContent = state.totalXp;
  document.getElementById('s-lessons').textContent = state.lessonsCompleted;
  document.getElementById('s-streak').textContent = state.streak;
  const learnedCount = Object.values(state.vocabProgress || {}).reduce((sum, arr) => sum + arr.length, 0);
  document.getElementById('s-vocab').textContent = learnedCount;

  showScreen('screen-settings');
}

function setDailyGoal(xp) {
  state.dailyGoal = xp;
  saveState();
  document.querySelectorAll('.settings-goal-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.xp) === xp);
  });
  renderHome();
}

// В WKWebView (iOS-приложении) объекта Notification НЕ существует — прямое обращение
// кидает ReferenceError и роняет вызвавшую функцию. Именно эта грабля многократно
// заваливала ревью IziGreek. Возвращаем 'unsupported' вместо броска.
function pushPermission() {
  try {
    return (typeof Notification !== 'undefined' && Notification.permission) || 'unsupported';
  } catch (e) { return 'unsupported'; }
}

async function togglePushSetting() {
  if (pushPermission() === 'unsupported') {
    alert('Уведомления в приложении подключаются отдельно — скоро включим.');
    return;
  }
  if (pushPermission() === 'denied') {
    alert('Уведомления заблокированы в настройках браузера. Разрешите их вручную.');
    return;
  }
  if (pushPermission() === 'granted') {
    // Unsubscribe
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
    if (currentUser) await db.collection('push_subscriptions').doc(currentUser.uid).delete().catch(() => {});
    document.getElementById('push-toggle').classList.remove('on');
  } else {
    await setupPushNotifications();
    document.getElementById('push-toggle').classList.toggle('on', pushPermission() === 'granted');
  }
}

function showPaywall() {
  // В iOS-приложении оплата обязана идти через Apple IAP (гайдлайн 3.1.1), а не
  // через внешний LemonSqueezy. native-iap.js регистрирует __iziIapPaywall и сам
  // навешивает нативную покупку на кнопки. На вебе хук undefined → обычный флоу.
  if (typeof window.__iziIapPaywall === 'function') { window.__iziIapPaywall(); return; }

  const monthlyUrl = `https://izispanish.lemonsqueezy.com/checkout/buy/MONTHLY_PRODUCT_ID?checkout[custom][user_id]=${currentUser?.uid || ''}`;
  const annualUrl = `https://izispanish.lemonsqueezy.com/checkout/buy/YEARLY_PRODUCT_ID?checkout[custom][user_id]=${currentUser?.uid || ''}`;

  document.getElementById('paywall-monthly-btn').href = monthlyUrl;
  document.getElementById('paywall-annual-btn').href = annualUrl;
  showScreen('screen-paywall');
}

// ============================================================
// INIT
// ============================================================
async function init() {
  // Мост из блога (iframe izispanish.com?ref=cabinet): тап по CTA внутри приложения
  // открывает нативный пейволл Apple (гайдлайн 3.1.1), а не внешний чекаут.
  window.addEventListener('message', (e) => {
    if (e && e.data && e.data.type === 'izi-open-paywall') showPaywall();
  });

  // APNs device-token из native-bridge.js (iOS) → сохраняем под текущим юзером.
  window.addEventListener('apnsToken', (e) => { saveApnsToken(e.detail); });

  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.register('sw.js').catch(() => null);

    // Reload when a new SW takes control (guarantees fresh files)
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });

    if (reg) {
      // When a new SW finishes installing, tell it to skip waiting immediately
      const onInstalled = (sw) => {
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            sw.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      };
      if (reg.installing) onInstalled(reg.installing);
      reg.addEventListener('updatefound', () => onInstalled(reg.installing));
    }
  }

  // Подписываемся на состояние авторизации
  auth.onAuthStateChanged(async user => {
    if (user) {
      currentUser = user;
      await loadState();
      await saveUserEmail();
      checkStreak();
      renderUserInfo();

      hasSubscription = await checkSubscription();
      updateGuestUi();

      // Гость нажал «оформить» до входа → после входа сразу ведём на пейволл.
      if (pendingUpgrade) {
        pendingUpgrade = false;
        if (!hasSubscription) { showPaywall(); return; }
      }

      // Вошедший без подписки НЕ упирается в пейволл сразу — остаются пробные
      // уроки (trialGate), пейволл всплывает по исчерпании. Так и ревьюер, и
      // пользователь видят контент, а не глухую стену.
      renderHome();
      if (!state.onboardingDone) {
        showScreen('screen-onboarding');
      } else {
        showScreen('screen-home');
        // Silently refresh push for returning users (web: если уже granted;
        // iOS: всегда — регистрация в APNs идемпотентна, токен обновится).
        if (isNativeApp() || pushPermission() === 'granted') {
          setTimeout(setupPushNotifications, 3000);
        }
      }
    } else {
      // Гость: работаем на локальном прогрессе, вход не форсим.
      currentUser = null;
      hasSubscription = false;
      pendingUpgrade = false;
      await loadState();
      checkStreak();
      updateGuestUi();
      renderHome();
      if (!state.onboardingDone) showScreen('screen-onboarding');
      else showScreen('screen-home');
    }
  });
}

function checkStreak() {
  const today = new Date().toDateString();
  if (state.lastPlayed === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (state.lastPlayed !== yesterday.toDateString() && state.lastPlayed !== null) {
    state.streak = 0;
  }
  state.dailyXp = 0;
  saveState();
}

// ============================================================
// HOME
// ============================================================
function renderHome() {
  document.getElementById('streak-number').textContent = state.streak;
  document.getElementById('total-xp').textContent = state.totalXp;
  document.getElementById('level-display').textContent = state.level;
  document.getElementById('lessons-done').textContent = state.lessonsCompleted;

  const pct = Math.min(100, (state.dailyXp / state.dailyGoal) * 100);
  document.getElementById('daily-progress').style.width = pct + '%';
  document.getElementById('daily-xp-display').textContent = `${state.dailyXp} / ${state.dailyGoal} XP`;

  const card = document.getElementById('streak-card');
  card.classList.toggle('streak-zero', state.streak === 0);

  // Achievements counter
  if (!state.achievements) state.achievements = [];
  document.getElementById('ach-nav-count').textContent = `${state.achievements.length}/${ACHIEVEMENTS.length}`;

  // Weak lesson button
  const weakCount = Object.keys(state.errorLog).length;
  const weakBtn = document.getElementById('weak-lesson-btn');
  if (weakBtn) {
    weakBtn.style.display = weakCount > 0 ? 'flex' : 'none';
    document.getElementById('weak-verbs-count').textContent = `${weakCount} ${weakCount === 1 ? 'глагол' : weakCount < 5 ? 'глагола' : 'глаголов'}`;
  }

  // SRS review button
  const dueCount = getSrsDueCount();
  const srsBtn = document.getElementById('srs-review-btn');
  if (srsBtn) {
    srsBtn.style.display = dueCount > 0 ? 'flex' : 'none';
    document.getElementById('srs-due-count').textContent = `${dueCount} ${dueCount === 1 ? 'глагол' : dueCount < 5 ? 'глагола' : 'глаголов'}`;
  }

  // Lesson button
  const mods = getLessonModules();
  const lessonNum = Math.min(state.currentLesson || 1, mods.length);
  const lessonBtnText = document.getElementById('lesson-btn-text');
  if (lessonBtnText) lessonBtnText.textContent = `Урок ${lessonNum} · ${LESSON_VERBS_COUNT} слов ▶`;
}

function showHome() {
  showScreen('screen-home');
  renderHome();
}

// ============================================================
// LESSON — EXERCISE GENERATION
// ============================================================
function generateLesson(verbPool = null) {
  const pool = verbPool || buildSrsPool();
  const exercises = [];
  for (let i = 0; i < EXERCISES_PER_LESSON; i++) {
    const verb = pool[Math.floor(Math.random() * pool.length)];
    const type = Math.floor(Math.random() * 5); // 0-3: multiple choice, 4: typing
    const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];

    if (type === 0) {
      const correct = verb.present[pronoun];
      exercises.push({
        type: 'conjugation', verb, pronoun,
        correctAnswer: correct,
        options: shuffle([correct, ...getWrongForms(verb, correct)])
      });
    } else if (type === 1) {
      const form = verb.present[pronoun];
      const correct = `${PRONOUNS_RU[pronoun]} ${verb.translation}`;
      exercises.push({
        type: 'phrase_meaning', verb,
        greek: `${pronoun} ${form}`,
        correctAnswer: correct,
        options: shuffle([correct, ...getWrongMeanings(verb, pronoun)])
      });
    } else if (type === 2) {
      const correct = verb.translation;
      const wrongs = VERBS_ONLY.filter(v => v.id !== verb.id).sort(() => Math.random() - 0.5).slice(0, 3).map(v => v.translation);
      exercises.push({
        type: 'word_meaning', verb, greek: verb.infinitive,
        correctAnswer: correct, options: shuffle([correct, ...wrongs])
      });
    } else if (type === 3) {
      const correct = verb.present[pronoun];
      exercises.push({
        type: 'translate_to_greek',
        russian: `${PRONOUNS_RU[pronoun]} ${verb.translation}`,
        verb, pronoun,
        correctAnswer: correct,
        options: shuffle([correct, ...getWrongForms(verb, correct)])
      });
    } else {
      // type === 4: typing
      const correct = verb.present[pronoun];
      exercises.push({
        type: 'typing',
        verb, pronoun,
        correctAnswer: correct
      });
    }
  }
  return exercises;
}

function getWrongForms(verb, correctForm) {
  const allForms = Object.values(verb.present).filter(f => f !== correctForm);
  if (allForms.length < 3) {
    const extra = VERBS_ONLY.find(v => v.id !== verb.id);
    allForms.push(...Object.values(extra.present).filter(f => f !== correctForm));
  }
  return shuffle(allForms).slice(0, 3);
}

function getWrongMeanings(verb, pronoun) {
  const pRu = PRONOUNS_RU[pronoun];
  return VERBS_ONLY.filter(v => v.id !== verb.id).sort(() => Math.random() - 0.5).slice(0, 3).map(v => `${pRu} ${v.translation}`);
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ============================================================
// LESSON — FLOW
// ============================================================
function startLesson() {
  if (!trialGate()) return;
  const mods = getLessonModules();
  const num = Math.min(state.currentLesson || 1, mods.length);
  startTeachPhase(mods[num - 1]);
}

function startWeakLesson() {
  if (!trialGate()) return;
  const weakIds = Object.keys(state.errorLog)
    .sort((a, b) => state.errorLog[b] - state.errorLog[a])
    .map(id => parseInt(id));
  const weakVerbs = VERBS_ONLY.filter(v => weakIds.includes(v.id));
  if (weakVerbs.length < 2) return;
  lessonState = {
    exercises: generateLesson(weakVerbs),
    currentIndex: 0, hearts: 3, xpEarned: 0, correct: 0, answered: false,
    isWeakMode: true
  };
  showScreen('screen-lesson');
  renderExercise();
}

function renderExercise() {
  const ex = lessonState.exercises[lessonState.currentIndex];
  lessonState.answered = false;

  document.getElementById('lesson-progress').style.width = (lessonState.currentIndex / EXERCISES_PER_LESSON * 100) + '%';
  renderHearts();
  document.getElementById('lesson-xp').textContent = lessonState.xpEarned;
  document.getElementById('lesson-footer').style.display = 'none';
  document.getElementById('lesson-footer').className = 'lesson-footer';

  const label = document.getElementById('exercise-label');
  const question = document.getElementById('exercise-question');
  const subtitle = document.getElementById('exercise-subtitle');

  if (ex.type === 'conjugation') {
    label.textContent = 'Выбери правильную форму';
    question.textContent = ex.verb.infinitive;
    subtitle.textContent = `${ex.pronoun}  (${PRONOUNS_RU[ex.pronoun]})  —  ${ex.verb.translation}`;
  } else if (ex.type === 'phrase_meaning') {
    label.textContent = 'Что это значит?';
    question.textContent = ex.greek;
    subtitle.textContent = '';
  } else if (ex.type === 'word_meaning') {
    label.textContent = 'Что значит этот глагол?';
    question.textContent = ex.greek;
    subtitle.textContent = '';
  } else if (ex.type === 'typing') {
    label.innerHTML = 'Напечатай форму <span class="label-badge">⌨️ сложно</span>';
    question.textContent = ex.verb.infinitive;
    subtitle.textContent = `${ex.pronoun}  (${PRONOUNS_RU[ex.pronoun]})  —  ${ex.verb.translation}`;
  } else {
    label.textContent = 'Переведи на испанский';
    question.textContent = ex.russian;
    subtitle.textContent = `${ex.verb.infinitive}  —  ${ex.verb.translation}`;
  }

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';

  if (ex.type === 'typing') {
    renderTypingInput();
  } else {
    ex.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(opt, ex.correctAnswer, ex.verb?.id));
      grid.appendChild(btn);
    });
  }
}

function renderTypingInput() {
  const grid = document.getElementById('options-grid');
  grid.innerHTML = `
    <div class="typing-wrap">
      <input type="text" id="typing-input" class="typing-input"
             placeholder="Введи форму глагола..."
             autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    </div>
    <div class="greek-keyboard">
      ${GREEK_KEYS.map(row => `
        <div class="gk-row">
          ${row.map(ch => `<button class="gk-btn" onclick="insertGreekChar('${ch}')">${ch}</button>`).join('')}
        </div>
      `).join('')}
      <div class="gk-row gk-bottom-row">
        <button class="gk-btn gk-space" onclick="insertGreekChar(' ')">·</button>
        <button class="gk-btn gk-backspace" onclick="insertGreekChar('⌫')">⌫</button>
        <button class="gk-btn gk-submit" onclick="checkTypingAnswer()">✓</button>
      </div>
    </div>
  `;
  const input = document.getElementById('typing-input');
  input.addEventListener('keydown', e => { if (e.key === 'Enter') checkTypingAnswer(); });
  setTimeout(() => input.focus(), 50);
}

function insertGreekChar(char) {
  const input = document.getElementById('typing-input');
  if (!input || lessonState.answered) return;
  if (char === '⌫') {
    input.value = input.value.slice(0, -1);
  } else {
    input.value += char;
  }
  input.focus();
}

function normalizeGreek(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function checkTypingAnswer() {
  if (lessonState.answered) return;
  const ex = lessonState.exercises[lessonState.currentIndex];
  const input = document.getElementById('typing-input');
  if (!input) return;
  const userAnswer = input.value.trim();
  if (!userAnswer) { input.classList.add('typing-empty'); setTimeout(() => input.classList.remove('typing-empty'), 400); return; }

  lessonState.answered = true;
  input.disabled = true;

  const footer = document.getElementById('lesson-footer');
  const feedback = document.getElementById('feedback-message');
  const isCorrect = normalizeGreek(userAnswer) === normalizeGreek(ex.correctAnswer);
  if (ex.verb?.id) srsRate(ex.verb.id, isCorrect);

  if (isCorrect) {
    lessonState.correct++;
    lessonState.xpEarned += XP_PER_CORRECT;
    document.getElementById('lesson-xp').textContent = lessonState.xpEarned;
    feedback.textContent = randomCorrectPhrase();
    feedback.className = 'feedback-message correct';
    footer.className = 'lesson-footer correct-footer';
    input.classList.add('typing-correct');
    playSound('correct');
  } else {
    lessonState.hearts--;
    renderHearts();
    feedback.innerHTML = `Правильно: <strong>${ex.correctAnswer}</strong>`;
    feedback.className = 'feedback-message wrong';
    footer.className = 'lesson-footer wrong-footer';
    input.classList.add('typing-wrong');
    if (ex.verb?.id) state.errorLog[ex.verb.id] = (state.errorLog[ex.verb.id] || 0) + 1;
    playSound('wrong');
  }

  footer.style.display = 'flex';
  document.getElementById('continue-btn').textContent = lessonState.hearts <= 0 ? 'Завершить урок' : 'Продолжить';
}

function renderHearts() {
  const h = lessonState.hearts;
  document.getElementById('hearts-display').innerHTML =
    '<span class="heart-icon">❤️</span>'.repeat(h) +
    '<span class="heart-icon dead">🖤</span>'.repeat(3 - h);
}

function selectAnswer(selected, correct, verbId) {
  if (lessonState.answered) return;
  lessonState.answered = true;

  const buttons = document.querySelectorAll('#options-grid .option-btn');
  const footer = document.getElementById('lesson-footer');
  const feedback = document.getElementById('feedback-message');

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('correct');
  });

  const isCorrect = selected === correct;
  if (verbId) srsRate(verbId, isCorrect);
  if (isCorrect) {
    lessonState.correct++;
    lessonState.xpEarned += XP_PER_CORRECT;
    document.getElementById('lesson-xp').textContent = lessonState.xpEarned;
    feedback.textContent = randomCorrectPhrase();
    feedback.className = 'feedback-message correct';
    footer.className = 'lesson-footer correct-footer';
    buttons.forEach(btn => { if (btn.textContent === selected) btn.classList.add('correct'); });
    playSound('correct');
  } else {
    lessonState.hearts--;
    renderHearts();
    feedback.innerHTML = `Правильно: <strong>${correct}</strong>`;
    feedback.className = 'feedback-message wrong';
    footer.className = 'lesson-footer wrong-footer';
    buttons.forEach(btn => { if (btn.textContent === selected) btn.classList.add('wrong'); });
    if (verbId) {
      state.errorLog[verbId] = (state.errorLog[verbId] || 0) + 1;
    }
    playSound('wrong');
  }

  footer.style.display = 'flex';
  document.getElementById('continue-btn').textContent = lessonState.hearts <= 0 ? 'Завершить урок' : 'Продолжить';
}

function nextExercise() {
  if (lessonState.hearts <= 0) { completeLesson(); return; }
  lessonState.currentIndex++;
  if (lessonState.currentIndex >= EXERCISES_PER_LESSON) completeLesson();
  else renderExercise();
}

function completeLesson() {
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  state.dailyXp += lessonState.xpEarned;
  state.totalXp += lessonState.xpEarned;
  state.level = Math.floor(state.totalXp / 500) + 1;
  state.lessonsCompleted++;
  const isPerfect = lessonState.hearts === 3 && lessonState.correct === EXERCISES_PER_LESSON;
  if (lessonState.isWeakMode) {
    // Clear errors for verbs that were practiced
    const practicedIds = [...new Set(lessonState.exercises.filter(e => e.verb).map(e => e.verb.id))];
    practicedIds.forEach(id => { delete state.errorLog[id]; });
  }
  if (!lessonState.isWeakMode && !lessonState.isSrsMode) {
    const mods = getLessonModules();
    state.currentLesson = Math.min((state.currentLesson || 1) + 1, mods.length);
  }
  saveState();
  checkAchievements({ perfectLesson: isPerfect, weakMode: lessonState.isWeakMode });
  createPost('lesson_complete', {
    isPerfect,
    hearts: lessonState.hearts,
    correct: lessonState.correct,
    total: EXERCISES_PER_LESSON,
    xp: lessonState.xpEarned,
    streak: state.streak
  });

  const acc = lessonState.correct / EXERCISES_PER_LESSON;
  const stars = (lessonState.hearts === 3 && acc === 1) ? '⭐⭐⭐' : (lessonState.hearts >= 2 && acc >= 0.7) ? '⭐⭐' : lessonState.hearts >= 1 ? '⭐' : '😅';

  document.getElementById('complete-stars').textContent = stars;
  document.getElementById('complete-xp').textContent = `+${lessonState.xpEarned}`;
  document.getElementById('complete-correct').textContent = `${lessonState.correct}/${EXERCISES_PER_LESSON}`;
  document.getElementById('complete-hearts').textContent = lessonState.hearts;
  document.getElementById('complete-streak').textContent = state.streak;
  document.getElementById('complete-goal-msg').style.display = state.dailyXp >= state.dailyGoal ? 'block' : 'none';
  showScreen('screen-complete');
}

function randomCorrectPhrase() {
  return ['¡Correcto! Правильно!', '¡Muy bien! Молодец!', '¡Perfecto! Отлично!', '¡Genial! Прекрасно!', '¡Excelente!'][Math.floor(Math.random() * 5)];
}

// ============================================================
// TTS (TEXT-TO-SPEECH)
// ============================================================
function speakGreek(text, event) {
  if (event) event.stopPropagation();
  if (!('speechSynthesis' in window)) return;
  const doSpeak = () => {
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'es-ES';
    utt.rate = 0.85;
    utt.pitch = 1;
    speechSynthesis.speak(utt);
  };
  if (speechSynthesis.getVoices().length > 0) {
    doSpeak();
  } else {
    let fired = false;
    const go = () => { if (!fired) { fired = true; doSpeak(); } };
    speechSynthesis.addEventListener('voiceschanged', go, { once: true });
    setTimeout(go, 500);
  }
}

// ============================================================
// SPACED REPETITION (SRS)
// ============================================================
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function srsRate(verbId, isCorrect) {
  if (!state.srs) state.srs = {};
  const card = state.srs[verbId] || { interval: 0, ef: 2.5 };
  if (isCorrect) {
    if (card.interval === 0)      card.interval = 1;
    else if (card.interval === 1) card.interval = 4;
    else if (card.interval < 10)  card.interval = Math.round(card.interval * card.ef);
    else                          card.interval = Math.round(card.interval * card.ef);
    card.ef = Math.min(3.0, (card.ef || 2.5) + 0.1);
  } else {
    card.interval = 1;
    card.ef = Math.max(1.3, (card.ef || 2.5) - 0.2);
  }
  const due = new Date();
  due.setDate(due.getDate() + card.interval);
  card.due = due.toISOString().split('T')[0];
  state.srs[verbId] = card;
}

function getSrsDueVerbs() {
  if (!state.srs) return [];
  const today = todayStr();
  return VERBS_ONLY.filter(v => state.srs[v.id]?.due <= today);
}

function getSrsDueCount() {
  return getSrsDueVerbs().length;
}

function renderSrsStats() {
  if (!state.srs) state.srs = {};
  const total = VERBS_ONLY.length;
  const studied = Object.keys(state.srs).length;
  const dueCount = getSrsDueCount();
  const newCount = total - studied;
  const knownCount = studied - dueCount;
  return `
    <div class="srs-stats-grid">
      <div class="srs-stat srs-new"><span class="srs-stat-val">${newCount}</span><span class="srs-stat-lbl">Новых</span></div>
      <div class="srs-stat srs-due"><span class="srs-stat-val">${dueCount}</span><span class="srs-stat-lbl">К повторению</span></div>
      <div class="srs-stat srs-known"><span class="srs-stat-val">${knownCount}</span><span class="srs-stat-lbl">Изучено</span></div>
    </div>
    <div class="srs-bar-wrap">
      <div class="srs-bar" style="background:#e5e5e5; border-radius:8px; overflow:hidden; height:10px; margin-top:10px;">
        <div style="height:100%; width:${Math.round(knownCount/total*100)}%; background:#58CC02; display:inline-block; float:left;"></div>
        <div style="height:100%; width:${Math.round(dueCount/total*100)}%; background:#FF9600; display:inline-block; float:left;"></div>
      </div>
    </div>
    <div style="font-size:12px; color:#999; margin-top:6px;">${studied} из ${total} глаголов изучалось</div>
  `;
}

function buildSrsPool() {
  if (!state.srs) state.srs = {};
  const today = todayStr();
  const pool = [];
  VERBS_ONLY.forEach(v => {
    const card = state.srs[v.id];
    if (!card) {
      // Новый — среднее: 2x
      pool.push(v, v);
    } else if (card.due <= today) {
      // К повторению — высокий приоритет: 4x
      pool.push(v, v, v, v);
    } else {
      // Известный, не пора — низкий: 1x
      pool.push(v);
    }
  });
  return pool;
}

function startSrsLesson() {
  if (!trialGate()) return;
  const dueVerbs = getSrsDueVerbs();
  if (dueVerbs.length === 0) return;
  const pool = dueVerbs.length >= 2 ? dueVerbs : null;
  lessonState = {
    exercises: generateLesson(pool),
    currentIndex: 0, hearts: 3, xpEarned: 0, correct: 0,
    answered: false, isWeakMode: false, isSrsMode: true
  };
  showScreen('screen-lesson');
  renderExercise();
}

// ============================================================
// ACHIEVEMENTS
// ============================================================
let achToastQueue = [];

function checkAchievements(ctx = {}) {
  if (!state.achievements) state.achievements = [];
  const conditions = {
    'first_lesson':   state.lessonsCompleted >= 1,
    'perfect_lesson': ctx.perfectLesson === true,
    'lessons_5':      state.lessonsCompleted >= 5,
    'lessons_10':     state.lessonsCompleted >= 10,
    'lessons_30':     state.lessonsCompleted >= 30,
    'streak_3':       state.streak >= 3,
    'streak_7':       state.streak >= 7,
    'streak_30':      state.streak >= 30,
    'scenario_first': state.scenariosCompleted.length >= 1,
    'scenarios_all':  state.scenariosCompleted.length >= SCENARIOS.length,
    'citizenship':    state.scenariosCompleted.includes('citizenship'),
    'weak_conquered': ctx.weakMode === true,
    'xp_500':         state.totalXp >= 500,
    'xp_2000':        state.totalXp >= 2000,
    'level_5':        state.level >= 5,
  };
  const newlyUnlocked = [];
  for (const [id, met] of Object.entries(conditions)) {
    if (met && !state.achievements.includes(id)) {
      state.achievements.push(id);
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) newlyUnlocked.push(ach);
    }
  }
  if (newlyUnlocked.length > 0) {
    saveState();
    newlyUnlocked.forEach(a => {
      achToastQueue.push(a);
      createPost('achievement', { icon: a.icon, title: a.title, desc: a.desc });
    });
    if (achToastQueue.length === newlyUnlocked.length) processAchToast();
  }

  // Streak milestones
  const streakMilestones = [3, 7, 14, 30, 60, 100];
  if (streakMilestones.includes(state.streak)) {
    const key = `streak_posted_${state.streak}`;
    if (!state[key]) {
      state[key] = true;
      saveState();
      createPost('streak', { streak: state.streak });
    }
  }
}

function processAchToast() {
  if (!achToastQueue.length) return;
  const ach = achToastQueue[0];
  const toast = document.getElementById('achievement-toast');
  document.getElementById('toast-icon').textContent = ach.icon;
  document.getElementById('toast-title').textContent = ach.title;
  document.getElementById('toast-desc').textContent = ach.desc;
  toast.classList.add('show');
  playSound('correct');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      achToastQueue.shift();
      processAchToast();
    }, 500);
  }, 3200);
}

function showAchievements() {
  if (!state.achievements) state.achievements = [];
  const unlocked = state.achievements.length;
  const total = ACHIEVEMENTS.length;
  document.getElementById('ach-badge').textContent = `${unlocked}/${total}`;

  const container = document.getElementById('achievements-container');
  const byCategory = {};
  ACHIEVEMENTS.forEach(a => {
    if (!byCategory[a.category]) byCategory[a.category] = [];
    byCategory[a.category].push(a);
  });

  container.innerHTML = Object.entries(byCategory).map(([cat, achs]) => `
    <div class="ach-category">
      <div class="ach-category-title">${cat}</div>
      ${achs.map(a => {
        const isUnlocked = state.achievements.includes(a.id);
        return `
        <div class="ach-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="ach-icon">${isUnlocked ? a.icon : '🔒'}</div>
          <div class="ach-info">
            <div class="ach-title">${a.title}</div>
            <div class="ach-desc">${a.desc}</div>
          </div>
          ${isUnlocked ? '<div class="ach-check">✓</div>' : ''}
        </div>`;
      }).join('')}
    </div>
  `).join('');

  showScreen('screen-achievements');
}

// ============================================================
// SOUND
// ============================================================
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.1);
    }
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

// ============================================================
// КАРТОЧКИ (флеш-карты) — порт из IziSerb/IziGreek
// ============================================================
// Склонение русских существительных по числу (1 слово / 2 слова / 5 слов).
function pluralRu(n, forms) {
  if (n % 100 >= 11 && n % 100 <= 19) return forms[2];
  const r = n % 10;
  if (r === 1) return forms[0];
  if (r >= 2 && r <= 4) return forms[1];
  return forms[2];
}
// ============================================================
// ГОСТЕВОЙ РЕЖИМ + ПРОБНЫЕ УРОКИ (как в IziGreek/IziSerb)
// Гостю доступно TRIAL_LESSONS бесплатных занятий без входа/подписки; дальше —
// модалка с предложением открыть полный доступ (вход → нативный пейволл Apple).
// ============================================================
const TRIAL_LESSONS = 5;      // сколько занятий доступно бесплатно
let hasSubscription = false;
let pendingUpgrade = false;   // гость нажал «оформить» → после входа сразу пейволл

function trialGate() {
  if (hasSubscription) return true;
  if ((state.lessonsCompleted || 0) < TRIAL_LESSONS) return true;
  showTrialModal();
  return false;
}

function showTrialModal() {
  const cta = document.getElementById('trial-cta');
  if (cta) cta.textContent = currentUser ? 'Открыть полный доступ' : 'Войти и открыть доступ';
  const m = document.getElementById('trial-modal');
  if (m) m.style.display = 'flex';
}

function dismissTrialModal() {
  const m = document.getElementById('trial-modal');
  if (m) m.style.display = 'none';
}

function trialUpgrade() {
  dismissTrialModal();
  if (currentUser) {
    showPaywall();          // вошёл — сразу планы (на iOS — нативный Apple IAP)
  } else {
    pendingUpgrade = true;  // гость — сперва вход, после него откроем пейволл
    showLoginPromo();
  }
}

// Кнопка возврата на главную — только гостю с уже пройденным онбордингом
// (на самом первом запуске уходить с экрана входа некуда).
function updateLoginBackBtn() {
  const back = document.getElementById('login-back-btn');
  if (back) back.style.display = state.onboardingDone ? 'block' : 'none';
}

function showLoginPromo() {
  const sub = document.querySelector('#screen-login .login-subtitle');
  if (sub) sub.textContent = 'Бесплатные уроки пройдены. Войди, чтобы продолжить и сохранить прогресс.';
  updateLoginBackBtn();
  showScreen('screen-login');
}

// Обычный вход по кнопке «Войти» на главной.
function showLogin() {
  const sub = document.querySelector('#screen-login .login-subtitle');
  if (sub) sub.textContent = 'Войди — прогресс сохранится на всех устройствах';
  updateLoginBackBtn();
  showScreen('screen-login');
}

// Гостю показываем кнопку «Войти» вместо аватара.
function updateGuestUi() {
  const isGuest = !currentUser;
  const loginBtn = document.getElementById('guest-login-btn');
  const avatarBtn = document.getElementById('user-avatar-btn');
  if (loginBtn) loginBtn.style.display = isGuest ? 'inline-flex' : 'none';
  if (avatarBtn) avatarBtn.style.display = isGuest ? 'none' : 'inline-flex';
}

const FC_BATCH = 10; // пауза «продолжим/хватит» каждые 10 слов
let fcState = {
  catId: null, cat: null, dir: 'el2ru', mode: 'vote',
  queue: [], words: [], index: 0, know: 0, dont: 0, revealed: false, currentWord: null,
  viewTimer: null, viewPlaying: false, viewSpeed: 1, resume: false,
};

function showFlashBreak() {
  stopFlashView();
  document.getElementById('fc-break-count').textContent = fcState.index;
  document.getElementById('fc-break-modal').style.display = 'flex';
  try { playSound('complete'); } catch (e) {}
}
function continueFlashBatch() {
  document.getElementById('fc-break-modal').style.display = 'none';
  fcState.resume = true;
  if (fcState.mode === 'view') {
    fcState.viewPlaying = true;
    document.getElementById('fc-view-play').textContent = '⏸';
    renderFlashViewCard();
  } else {
    renderFlashVote();
  }
}
function endFlashSession() {
  document.getElementById('fc-break-modal').style.display = 'none';
  stopFlashView();
  showFlashDeck(fcState.catId);
}

function fcCat(id) { return VOCAB_CATEGORIES.find(c => c.id === id); }
function fcKnownSet(catId) {
  if (!state.flashProgress) state.flashProgress = {};
  if (!state.flashProgress[catId]) state.flashProgress[catId] = [];
  return state.flashProgress[catId];
}

function showFlashcards() {
  document.getElementById('fc-categories').innerHTML = VOCAB_CATEGORIES.map(cat => {
    const known = fcKnownSet(cat.id).length;
    const total = cat.words.length;
    const pct = total ? Math.round(known / total * 100) : 0;
    return `
      <button class="fc-cat-card" onclick="showFlashDeck('${cat.id}')">
        <div class="fc-cat-pct">${pct}%</div>
        <div class="fc-cat-body">
          <div class="fc-cat-title">${cat.emoji || '🃏'} ${cat.title}</div>
          <div class="fc-cat-sub">${total} ${pluralRu(total, ['слово', 'слова', 'слов'])}</div>
        </div>
        <div class="fc-cat-arrow">›</div>
      </button>`;
  }).join('');
  showScreen('screen-flashcards');
}

function showFlashDeck(catId) {
  const cat = fcCat(catId);
  if (!cat) return;
  fcState.catId = catId;
  fcState.cat = cat;
  document.getElementById('fc-deck-title').textContent = `${cat.emoji || '🃏'} ${cat.title}`;
  document.getElementById('fc-wordlist').innerHTML = cat.words.map(w => `
    <div class="fc-word-row">
      <div class="fc-word-el">${w.greek}${w.transcription ? ` <span class="fc-word-tr">[${w.transcription}]</span>` : ''}</div>
      <div class="fc-word-ru">${w.translation}</div>
    </div>`).join('');
  showScreen('screen-fc-deck');
}

function openFlashDirection() { document.getElementById('fc-direction-modal').style.display = 'flex'; }
function closeFlashDirection() { document.getElementById('fc-direction-modal').style.display = 'none'; }

// --- Флеш-карты: голосование Знаю / Не знаю ---
function startFlashVote(dir) {
  closeFlashDirection();
  if (!trialGate()) return;
  const cat = fcState.cat; if (!cat) return;
  fcState.mode = 'vote';
  fcState.dir = dir;
  fcState.resume = false;
  fcState.queue = shuffle(cat.words);
  fcState.index = 0;
  fcState.know = 0;
  fcState.dont = 0;
  // вернуть кнопки, если их скрыл экран «Готово»
  document.querySelector('#screen-fc-vote .fc-vote-actions').style.display = '';
  document.querySelector('#screen-fc-vote .fc-vote-stats').style.display = '';
  document.querySelector('#screen-fc-vote .fc-skip').style.display = '';
  document.getElementById('fc-vote-title').textContent = `${cat.emoji || '🃏'} ${cat.title}`;
  renderFlashVote();
  showScreen('screen-fc-vote');
}

function renderFlashVote() {
  const total = fcState.queue.length;
  if (fcState.index >= total) { finishFlashVote(); return; }
  const w = fcState.queue[fcState.index];
  fcState.currentWord = w;
  fcState.revealed = false;
  const front = fcState.dir === 'el2ru' ? w.greek : w.translation;
  const back = fcState.dir === 'el2ru' ? w.translation : w.greek;
  document.getElementById('fc-vote-tag').textContent = fcState.dir === 'el2ru' ? 'СЛОВО' : 'ПЕРЕВОД';
  document.getElementById('fc-vote-front').textContent = front;
  document.getElementById('fc-vote-front-tr').textContent = (fcState.dir === 'el2ru' && w.transcription) ? `[${w.transcription}]` : '';
  const backEl = document.getElementById('fc-vote-back');
  backEl.textContent = back;
  backEl.style.display = 'none';
  const hint = document.getElementById('fc-vote-hint');
  hint.textContent = 'Нажми, чтобы увидеть перевод';
  hint.style.display = '';
  updateFlashVoteStats();
}

function revealFlashVote() {
  if (fcState.revealed) return;
  fcState.revealed = true;
  document.getElementById('fc-vote-back').style.display = '';
  document.getElementById('fc-vote-hint').style.display = 'none';
}

function updateFlashVoteStats() {
  document.getElementById('fc-stat-total').textContent = fcState.queue.length;
  document.getElementById('fc-stat-know').textContent = fcState.know;
  document.getElementById('fc-stat-dont').textContent = fcState.dont;
}

function answerFlashVote(known) {
  const w = fcState.queue[fcState.index];
  if (!w) return;
  const set = fcKnownSet(fcState.catId);
  if (known) {
    fcState.know++;
    if (!set.includes(w.greek)) set.push(w.greek);
  } else {
    fcState.dont++;
    const i = set.indexOf(w.greek); if (i >= 0) set.splice(i, 1);
    fcState.queue.push(w); // незнакомые копятся — повторим в конце
  }
  saveState();
  fcState.index++;
  afterVoteAdvance();
}

function afterVoteAdvance() {
  // Пауза каждые FC_BATCH слов: «продолжим или на сегодня хватит?»
  if (fcState.index > 0 && fcState.index % FC_BATCH === 0 && fcState.index < fcState.queue.length) {
    showFlashBreak();
    return;
  }
  renderFlashVote();
}

function skipFlashVote() {
  const w = fcState.queue[fcState.index];
  if (w) fcState.queue.push(w);
  fcState.index++;
  afterVoteAdvance();
}

function finishFlashVote() {
  const total = fcState.know + fcState.dont;
  document.getElementById('fc-vote-tag').textContent = '';
  document.getElementById('fc-vote-front').textContent = '🎉';
  document.getElementById('fc-vote-front-tr').textContent = '';
  document.getElementById('fc-vote-back').style.display = 'none';
  const hint = document.getElementById('fc-vote-hint');
  hint.style.display = '';
  hint.textContent = `Готово! Знаешь ${fcState.know} из ${total}`;
  document.querySelector('#screen-fc-vote .fc-vote-actions').style.display = 'none';
  document.querySelector('#screen-fc-vote .fc-vote-stats').style.display = 'none';
  document.querySelector('#screen-fc-vote .fc-skip').style.display = 'none';
  try { playSound('complete'); } catch (e) {}
}

// --- Просмотр: слово → перевод сам, с озвучкой ---
function startFlashView() {
  if (!trialGate()) return;
  const cat = fcState.cat; if (!cat) return;
  fcState.resume = false;
  fcState.mode = 'view';
  fcState.words = shuffle(cat.words);
  fcState.index = 0;
  fcState.viewSpeed = 1;
  fcState.viewPlaying = true;
  document.getElementById('fc-view-speed').textContent = '1.0x';
  document.getElementById('fc-view-play').textContent = '⏸';
  showScreen('screen-fc-view');
  renderFlashViewCard();
}

function renderFlashViewCard() {
  const w = fcState.words[fcState.index];
  if (!w) { stopFlashView(); showFlashDeck(fcState.catId); return; }
  // Пауза каждые FC_BATCH слов (кроме момента продолжения)
  if (!fcState.resume && fcState.index > 0 && fcState.index % FC_BATCH === 0) {
    showFlashBreak();
    return;
  }
  fcState.resume = false;
  fcState.currentWord = w;
  document.getElementById('fc-view-word').textContent = w.greek;
  document.getElementById('fc-view-tr').textContent = w.transcription || '';
  const tr = document.getElementById('fc-view-translation');
  tr.textContent = '';
  tr.style.opacity = '0';
  document.getElementById('fc-view-counter').textContent = `${fcState.index + 1}/${fcState.words.length}`;
  document.getElementById('fc-view-progress-fill').style.width = (fcState.index / fcState.words.length * 100) + '%';
  playFlashWord();
  scheduleFlashView();
}

function scheduleFlashView() {
  clearFlashViewTimers();
  if (!fcState.viewPlaying) return;
  const revealMs = 2200 / fcState.viewSpeed;
  const nextMs = 1600 / fcState.viewSpeed;
  fcState.viewTimer = setTimeout(() => {
    const tr = document.getElementById('fc-view-translation');
    const w = fcState.words[fcState.index];
    if (w) { tr.textContent = w.translation; tr.style.opacity = '1'; }
    fcState.viewTimer = setTimeout(() => {
      fcState.index++;
      renderFlashViewCard();
    }, nextMs);
  }, revealMs);
}

function clearFlashViewTimers() { if (fcState.viewTimer) { clearTimeout(fcState.viewTimer); fcState.viewTimer = null; } }

function toggleFlashView() {
  fcState.viewPlaying = !fcState.viewPlaying;
  document.getElementById('fc-view-play').textContent = fcState.viewPlaying ? '⏸' : '▶️';
  if (fcState.viewPlaying) scheduleFlashView(); else clearFlashViewTimers();
}

function cycleFlashSpeed() {
  const speeds = [1, 1.5, 2];
  const i = speeds.indexOf(fcState.viewSpeed);
  fcState.viewSpeed = speeds[(i + 1) % speeds.length];
  document.getElementById('fc-view-speed').textContent = fcState.viewSpeed.toFixed(1) + 'x';
  if (fcState.viewPlaying) scheduleFlashView();
}

function stopFlashView() { fcState.viewPlaying = false; clearFlashViewTimers(); }

function playFlashWord() {
  const w = fcState.currentWord;
  if (w) speakGreek(w.greek);
}

// ============================================================
// SCENARIOS
// ============================================================
function showScenarios() {
  const container = document.getElementById('scenarios-list');
  container.innerHTML = SCENARIOS.map(s => {
    const done = state.scenariosCompleted.includes(s.id);
    return `
    <div class="scenario-card ${done ? 'done' : ''}" onclick="startScenario('${s.id}')">
      <div class="scenario-icon">${s.icon}</div>
      <div class="scenario-info">
        <div class="scenario-title">${s.title}</div>
        <div class="scenario-desc">${s.description}</div>
        <div class="scenario-meta">${s.steps.length} шага · ${s.steps.length * XP_PER_SCENARIO_STEP} XP</div>
      </div>
      <div class="scenario-arrow">${done ? '✅' : '→'}</div>
    </div>`;
  }).join('');
  showScreen('screen-scenarios');
}

function startScenario(id) {
  if (!trialGate()) return;
  const scenario = SCENARIOS.find(s => s.id === id);
  if (!scenario) return;
  scenarioState = { scenarioId: id, currentStep: 0, score: 0, answered: false };
  renderScenarioStep(scenario, 0);
  showScreen('screen-scenario-detail');
}

function renderScenarioStep(scenario, stepIdx) {
  scenarioState.answered = false;
  const step = scenario.steps[stepIdx];
  const total = scenario.steps.length;

  document.getElementById('scenario-progress-fill').style.width = (stepIdx / total * 100) + '%';
  document.getElementById('scenario-step-counter').textContent = `${stepIdx + 1}/${total}`;
  document.getElementById('scenario-title-bar').textContent = scenario.title;

  const container = document.getElementById('scenario-step-container');
  container.innerHTML = `
    <div class="scenario-situation">${step.situation}</div>
    <div class="dialogue-card">
      <div class="dialogue-speaker">${step.speaker} говорит:</div>
      <div class="dialogue-greek-wrap">
        <div class="dialogue-greek">${step.greek}</div>
        <button class="speak-btn-lg" data-speak="${step.greek.replace(/"/g, '&quot;')}" onclick="speakGreek(this.dataset.speak)">🔊</button>
      </div>
      <div class="dialogue-transcription">${step.transcription}</div>
      <div class="dialogue-translation">${step.translation}</div>
    </div>
    <div class="scenario-question">${step.question}</div>
    <div class="scenario-options" id="scenario-options">
      ${step.options.map((opt, i) => `
        <button class="scenario-option-btn" onclick="selectScenarioAnswer(${i})">
          <div class="opt-greek">${opt.text}</div>
          <div class="opt-transcription">🔊 ${opt.transcription}</div>
          <div class="opt-translation">${opt.translation}</div>
        </button>
      `).join('')}
    </div>
    <div class="scenario-feedback" id="scenario-feedback" style="display:none"></div>
    <button class="btn-primary" id="scenario-next-btn" onclick="nextScenarioStep()" style="display:none;margin-top:16px">
      ${stepIdx < total - 1 ? 'Следующий шаг →' : 'Завершить сценарий'}
    </button>
  `;
}

function selectScenarioAnswer(optionIdx) {
  if (scenarioState.answered) return;
  scenarioState.answered = true;

  const scenario = SCENARIOS.find(s => s.id === scenarioState.scenarioId);
  const step = scenario.steps[scenarioState.currentStep];
  const option = step.options[optionIdx];

  const buttons = document.querySelectorAll('.scenario-option-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (step.options[i].correct) btn.classList.add('correct');
  });

  const feedback = document.getElementById('scenario-feedback');
  if (option.correct) {
    scenarioState.score++;
    buttons[optionIdx].classList.add('correct');
    feedback.className = 'scenario-feedback correct';
    feedback.textContent = step.correctFeedback;
    playSound('correct');
  } else {
    buttons[optionIdx].classList.add('wrong');
    feedback.className = 'scenario-feedback wrong';
    feedback.textContent = step.wrongFeedback;
    playSound('wrong');
  }

  feedback.style.display = 'block';
  document.getElementById('scenario-next-btn').style.display = 'block';
}

function nextScenarioStep() {
  const scenario = SCENARIOS.find(s => s.id === scenarioState.scenarioId);
  scenarioState.currentStep++;

  if (scenarioState.currentStep >= scenario.steps.length) {
    completeScenario(scenario);
  } else {
    renderScenarioStep(scenario, scenarioState.currentStep);
  }
}

function completeScenario(scenario) {
  const xp = scenarioState.score * XP_PER_SCENARIO_STEP;
  state.totalXp += xp;
  state.dailyXp += xp;
  state.level = Math.floor(state.totalXp / 500) + 1;
  if (!state.scenariosCompleted.includes(scenario.id)) {
    state.scenariosCompleted.push(scenario.id);
  }
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();
  checkAchievements({});

  const total = scenario.steps.length;
  const pct = scenarioState.score / total;
  const stars = pct === 1 ? '⭐⭐⭐' : pct >= 0.67 ? '⭐⭐' : '⭐';

  document.getElementById('scenario-complete-icon').textContent = scenario.icon;
  document.getElementById('scenario-complete-title').textContent = `${scenario.title} пройден!`;
  document.getElementById('scenario-complete-stars').textContent = stars;
  document.getElementById('scenario-score').textContent = `${scenarioState.score}/${total}`;
  document.getElementById('scenario-xp').textContent = `+${xp} XP`;
  document.getElementById('scenario-complete-msg').textContent =
    pct === 1 ? 'Идеально! Ты готов к этой ситуации в реальной жизни.' :
    pct >= 0.67 ? 'Хорошо! Ещё немного практики — и будет идеально.' :
    'Не страшно. Повтори сценарий — с каждым разом лучше.';

  showScreen('screen-scenario-complete');
}

// ============================================================
// VERB TABLE
// ============================================================
function renderVerbCards(verbs) {
  const pronounsRu = ['я', 'ты', 'он/она', 'мы', 'вы', 'они'];
  const container = document.getElementById('verb-table-container');
  document.getElementById('verb-count-badge').textContent = verbs.length;

  if (verbs.length === 0) {
    container.innerHTML = '<div class="no-results">Ничего не найдено 🤷</div>';
    return;
  }

  container.innerHTML = verbs.map(verb => `
    <div class="verb-card" onclick="this.classList.toggle('expanded')">
      <div class="verb-title">
        <div>
          <span class="verb-infinitive">${verb.infinitive}</span>
          <span class="verb-transcription"> [${verb.transcription}]</span>
        </div>
        <span class="verb-translation-badge">${verb.translation}</span>
      </div>
      ${verb.note ? `<div class="verb-note">${verb.note}</div>` : ''}
      <div class="verb-example">
        <button class="speak-btn" data-speak="${verb.example.greek}" onclick="speakGreek(this.dataset.speak, event)" title="Произнести">🔊</button>
        <span class="example-greek">${verb.example.greek}</span>
        <span class="example-ru">${verb.example.ru}</span>
      </div>
      <div class="verb-conjugation">
        ${[
          { label: 'Настоящее', forms: verb.present },
          { label: 'Прошедшее (indefinido)', forms: verb.preterite },
          { label: 'Будущее (futuro)', forms: verb.future },
        ].filter(t => t.forms).map(t => `
          <div class="conj-tense-label">${t.label}</div>
          ${PRONOUNS.map((p, i) => `
            <div class="conj-row">
              <span class="conj-pronoun">${pronounsRu[i]}</span>
              <span class="conj-form conj-speakable" onclick="speakGreek('${t.forms[p]}', event)" title="Нажми — услышишь">${t.forms[p]}</span>
            </div>
          `).join('')}
        `).join('')}
      </div>
    </div>
  `).join('');
}

function filterVerbs(query) {
  const q = query.toLowerCase().trim();
  const filtered = q
    ? VERBS_ONLY.filter(v =>
        v.infinitive.toLowerCase().includes(q) ||
        v.translation.toLowerCase().includes(q) ||
        Object.values(v.present).some(f => f.toLowerCase().includes(q))
      )
    : VERBS_ONLY;
  renderVerbCards(filtered);
}

function showVerbTable() {
  document.getElementById('verb-search').value = '';
  renderVerbCards(VERBS_ONLY);
  showScreen('screen-verbs');
}

// ============================================================
// PHRASES & EXPRESSIONS
// ============================================================
function showPhrases() {
  // Category pills
  const catsEl = document.getElementById('phrase-cats');
  catsEl.innerHTML = PHRASES.map(cat => `
    <button class="phrase-cat-pill" onclick="scrollToPhraseCat('${cat.id}')" style="border-color:${cat.color};color:${cat.color}">
      ${cat.icon} ${cat.category}
    </button>
  `).join('');

  // All phrases
  const container = document.getElementById('phrases-container');
  container.innerHTML = PHRASES.map(cat => `
    <div class="phrase-category-block" id="phrase-cat-${cat.id}">
      <div class="phrase-cat-header" style="border-color:${cat.color}">
        <span class="phrase-cat-icon">${cat.icon}</span>
        <span class="phrase-cat-title" style="color:${cat.color}">${cat.category}</span>
        <span class="phrase-cat-count">${cat.phrases.length}</span>
      </div>
      ${cat.phrases.map(p => `
        <div class="phrase-card">
          <div class="phrase-top">
            <div class="phrase-greek" data-speak="${p.greek.replace(/"/g,'&quot;')}"
                 onclick="speakGreek(this.dataset.speak)">${p.greek}</div>
            <button class="speak-btn" data-speak="${p.greek.replace(/"/g,'&quot;')}"
                    onclick="speakGreek(this.dataset.speak, event)">🔊</button>
          </div>
          <div class="phrase-transcription">${p.transcription}</div>
          <div class="phrase-translation">${p.translation}</div>
          ${p.note ? `<div class="phrase-note">${p.note}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `).join('');

  // Reset search
  const si = document.getElementById('phrases-search');
  if (si) si.value = '';
  searchPhrases('');

  showScreen('screen-phrases');
}

function searchPhrases(query) {
  const q = query.trim().toLowerCase();
  const resultsEl = document.getElementById('phrases-search-results');
  const normalEl = document.getElementById('phrases-container');
  const catsEl = document.getElementById('phrase-cats');
  const descEl = document.getElementById('phrases-sub-desc');

  if (!q) {
    resultsEl.style.display = 'none';
    normalEl.style.display = '';
    catsEl.style.display = '';
    descEl.style.display = '';
    return;
  }

  normalEl.style.display = 'none';
  catsEl.style.display = 'none';
  descEl.style.display = 'none';
  resultsEl.style.display = '';

  const matches = [];
  PHRASES.forEach(cat => {
    cat.phrases.forEach(p => {
      if (
        p.greek.toLowerCase().includes(q) ||
        p.transcription.toLowerCase().includes(q) ||
        p.translation.toLowerCase().includes(q) ||
        (p.note && p.note.toLowerCase().includes(q))
      ) {
        matches.push({ ...p, catIcon: cat.icon, catTitle: cat.category, catColor: cat.color });
      }
    });
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="search-empty">Ничего не найдено</div>`;
    return;
  }

  resultsEl.innerHTML = matches.map(p => `
    <div class="phrase-card">
      <div class="phrase-search-cat" style="color:${p.catColor}">${p.catIcon} ${p.catTitle}</div>
      <div class="phrase-top">
        <div class="phrase-greek" data-speak="${p.greek.replace(/"/g,'&quot;')}"
             onclick="speakGreek(this.dataset.speak)">${p.greek}</div>
        <button class="speak-btn" data-speak="${p.greek.replace(/"/g,'&quot;')}"
                onclick="speakGreek(this.dataset.speak, event)">🔊</button>
      </div>
      <div class="phrase-transcription">${p.transcription}</div>
      <div class="phrase-translation">${p.translation}</div>
      ${p.note ? `<div class="phrase-note">${p.note}</div>` : ''}
    </div>
  `).join('');
}

function scrollToPhraseCat(id) {
  const el = document.getElementById('phrase-cat-' + id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Highlight active pill
  document.querySelectorAll('.phrase-cat-pill').forEach(p => p.classList.remove('active'));
  const pills = document.querySelectorAll('.phrase-cat-pill');
  const idx = PHRASES.findIndex(c => c.id === id);
  if (pills[idx]) pills[idx].classList.add('active');
}

// ============================================================
// DAILY GOAL SETTINGS
// ============================================================
function showGoalModal() {
  document.querySelectorAll('.goal-option-btn').forEach(btn => {
    const isActive = parseInt(btn.dataset.xp) === state.dailyGoal;
    btn.classList.toggle('active', isActive);
  });
  document.getElementById('goal-modal').style.display = 'flex';
}

function hideGoalModal() {
  document.getElementById('goal-modal').style.display = 'none';
}

function setDailyGoal(xp) {
  state.dailyGoal = xp;
  saveState();
  renderHome();
  hideGoalModal();
}

// ============================================================
// 30-DAY PLAN
// ============================================================
function showPlan() {
  const lessonsNeededPerDay = 1;
  const daysUnlocked = Math.min(30, state.lessonsCompleted + state.scenariosCompleted.length + 1);

  const typeIcons = { vocab: '📖', grammar: '⚙️', scenario: '🎭', review: '🔄', audit: '📊' };
  const typeLabels = { vocab: 'Лексика', grammar: 'Грамматика', scenario: 'Сценарий', review: 'Повторение', audit: 'Аудит' };

  const container = document.getElementById('plan-container');
  container.innerHTML = PLAN_30.map(week => `
    <div class="week-block">
      <div class="week-header" style="border-color:${week.color}">
        <span class="week-number" style="color:${week.color}">Неделя ${week.week}</span>
        <span class="week-theme">${week.theme}</span>
      </div>
      ${week.days.map(d => {
        const isUnlocked = d.day <= daysUnlocked;
        const isDone = d.day < daysUnlocked;
        return `
        <div class="plan-day ${isDone ? 'done' : ''} ${!isUnlocked ? 'locked' : ''}">
          <div class="plan-day-num" style="background:${isDone ? week.color : isUnlocked ? 'white' : '#e5e5e5'};color:${isDone ? 'white' : '#3c3c3c'}">${d.day}</div>
          <div class="plan-day-info">
            <div class="plan-day-topic">${d.topic}</div>
            <div class="plan-day-focus">${typeIcons[d.type]} ${typeLabels[d.type]} · ${d.focus}</div>
          </div>
          <div class="plan-day-status">${isDone ? '✅' : isUnlocked ? '▶' : '🔒'}</div>
        </div>`;
      }).join('')}
    </div>
  `).join('');

  showScreen('screen-plan');
}

// ============================================================
// AUDIT / PROGRESS
// ============================================================
function showAudit() {
  const container = document.getElementById('audit-container');

  const totalErrors = Object.values(state.errorLog).reduce((a, b) => a + b, 0);
  const weakVerbs = Object.entries(state.errorLog)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => {
      const verb = VERBS_ONLY.find(v => v.id === parseInt(id));
      return verb ? `<div class="weak-verb-row"><span class="wv-infinitive">${verb.infinitive}</span><span class="wv-translation">${verb.translation}</span><span class="wv-errors">${count} ошиб.</span></div>` : '';
    }).join('');

  const accuracy = state.lessonsCompleted > 0
    ? Math.round((1 - totalErrors / (state.lessonsCompleted * EXERCISES_PER_LESSON)) * 100)
    : 100;

  const daysToGoal = state.dailyGoal > 0
    ? Math.max(0, Math.ceil((state.dailyGoal - state.dailyXp) / XP_PER_CORRECT))
    : 0;

  container.innerHTML = `
    <div class="audit-grid">
      <div class="audit-stat">
        <div class="audit-stat-icon">⚡</div>
        <div class="audit-stat-value">${state.totalXp}</div>
        <div class="audit-stat-label">Всего XP</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">🔥</div>
        <div class="audit-stat-value">${state.streak}</div>
        <div class="audit-stat-label">Дней подряд</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">📝</div>
        <div class="audit-stat-value">${state.lessonsCompleted}</div>
        <div class="audit-stat-label">Уроков</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">🎭</div>
        <div class="audit-stat-value">${state.scenariosCompleted.length}/${SCENARIOS.length}</div>
        <div class="audit-stat-label">Сценариев</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">🎯</div>
        <div class="audit-stat-value">${accuracy}%</div>
        <div class="audit-stat-label">Точность</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">⭐</div>
        <div class="audit-stat-value">${state.level}</div>
        <div class="audit-stat-label">Уровень</div>
      </div>
    </div>

    <div class="audit-section">
      <div class="audit-section-title">📈 До следующего уровня</div>
      <div class="level-progress-bar">
        <div class="level-progress-fill" style="width:${((state.totalXp % 500) / 500 * 100)}%"></div>
      </div>
      <div class="level-progress-label">${state.totalXp % 500} / 500 XP до уровня ${state.level + 1}</div>
    </div>

    ${Object.keys(state.errorLog).length > 0 ? `
    <div class="audit-section">
      <div class="audit-section-title">⚠️ Слабые места — повтори эти глаголы</div>
      <div class="weak-verbs-list">${weakVerbs}</div>
    </div>` : `
    <div class="audit-section">
      <div class="audit-section-title">✅ Слабых мест нет — продолжай в том же духе!</div>
    </div>`}

    <div class="audit-section">
      <div class="audit-section-title">🧠 Интервальное повторение (SRS)</div>
      ${renderSrsStats()}
    </div>

    <div class="audit-section">
      <div class="audit-section-title">💡 Рекомендация тьютора</div>
      <div class="tutor-tip">${getTutorTip()}</div>
    </div>
  `;

  showScreen('screen-audit');
}

function getTutorTip() {
  if (state.lessonsCompleted === 0) return 'Начни с первого урока прямо сейчас! Каждый день — это шаг к свободному испанскому. 🇪🇸';
  if (state.streak === 0) return 'Стрик сброшен. Помни: регулярность важнее интенсивности. 10 минут в день > 2 часа раз в неделю.';
  if (state.scenariosCompleted.length === 0) return 'Попробуй сценарий "В ресторане" или "В миграционной службе" — это практика для реальной жизни!';
  if (!state.scenariosCompleted.includes('extranjeria')) return `Пройдено ${state.scenariosCompleted.length}/${SCENARIOS.length} сценариев. Сценарий "В миграционной службе" — один из самых важных. Пройди его!`;
  if (state.scenariosCompleted.length < SCENARIOS.length) return `Пройдено ${state.scenariosCompleted.length}/${SCENARIOS.length} сценариев. Попробуй аптеку, банк и рынок — реальные ситуации в Испании!`;
  return `Отлично! Все ${SCENARIOS.length} сценариев пройдены. Следующий шаг — говорить с носителями. Найди испаноговорящего собеседника и практикуй!`;
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ============================================================
// SCROLL TO TOP
// ============================================================
(function() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
})();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// SUPPORT FORM
// ============================================================
function showSupportForm() {
  const modal = document.getElementById('support-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Pre-fill name/email from current user
  if (currentUser) {
    const nameEl = document.getElementById('sf-name');
    const emailEl = document.getElementById('sf-email');
    if (nameEl && !nameEl.value) nameEl.value = currentUser.displayName || '';
    if (emailEl && !emailEl.value) emailEl.value = currentUser.email || '';
  }
}

function hideSupportForm() {
  document.getElementById('support-modal').style.display = 'none';
  document.body.style.overflow = '';
  // Reset form
  document.getElementById('support-form-wrap').style.display = 'block';
  document.getElementById('support-success').style.display = 'none';
}

function showPwaGuide() {
  document.getElementById('pwa-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hidePwaGuide() {
  document.getElementById('pwa-modal').style.display = 'none';
  document.body.style.overflow = '';
}

async function submitSupportForm() {
  const name    = document.getElementById('sf-name').value.trim();
  const email   = document.getElementById('sf-email').value.trim();
  const phone   = document.getElementById('sf-phone').value.trim();
  const subject = document.getElementById('sf-subject').value;
  const message = document.getElementById('sf-message').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Введите корректный email.');
    return;
  }

  const btn = document.querySelector('.support-submit-btn');
  btn.disabled = true;
  btn.textContent = 'Отправляем...';

  try {
    const res = await fetch('https://izispanish-webhook.vercel.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message,
        userId: currentUser?.uid || '' })
    });
    if (!res.ok) throw new Error('Server error ' + res.status);
    document.getElementById('support-form-wrap').style.display = 'none';
    document.getElementById('support-success').style.display = 'block';
  } catch (e) {
    console.error('Support form error:', e);
    alert('Не удалось отправить. Попробуйте позже или напишите напрямую: support@izispanish.com');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Отправить';
  }
}

// ============================================================
// SOCIAL FEED
// ============================================================
let feedUnsubscribe = null;

function showFeed() {
  showScreen('screen-feed');
  hideFeedBadge();
  renderComposerAvatar();
  initComposer();
  loadFeed();
}

function initComposer() {
  const ta = document.getElementById('composer-text');
  if (!ta || ta._composerInited) return;
  ta._composerInited = true;
  ta.addEventListener('input', onComposerInput);
}

function renderComposerAvatar() {
  const wrap = document.getElementById('composer-avatar-wrap');
  if (!wrap || !currentUser) return;
  if (currentUser.photoURL) {
    wrap.innerHTML = `<img class="feed-avatar" src="${currentUser.photoURL}" alt="" style="margin-top:4px">`;
  } else {
    wrap.innerHTML = `<div class="feed-avatar-initials" style="margin-top:4px">${getInitials(currentUser.displayName)}</div>`;
  }
}

function onComposerInput() {
  const ta = document.getElementById('composer-text');
  const counter = document.getElementById('composer-char-count');
  const btn = document.getElementById('composer-submit');
  const len = ta.value.length;
  counter.textContent = len > 0 ? `${len} / 1000` : '';
  counter.className = 'composer-char-count' + (len >= 1000 ? ' limit' : len >= 800 ? ' warn' : '');
  btn.disabled = len === 0;
}

async function submitPost() {
  if (!currentUser) return;
  const ta = document.getElementById('composer-text');
  const text = ta.value.trim();
  if (!text) return;

  const btn = document.getElementById('composer-submit');
  btn.classList.add('loading');
  btn.textContent = 'Публикуем...';

  try {
    await db.collection('posts').add({
      uid: currentUser.uid,
      displayName: currentUser.displayName || 'Ученик',
      photoURL: currentUser.photoURL || null,
      type: 'user_post',
      emoji: '✍️',
      title: text,
      subtitle: '',
      imageUrl: null,
      chips: [],
      likes: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Reset composer
    ta.value = '';
    onComposerInput();
  } catch (e) {
    console.error('submitPost error:', e);
    alert('Не удалось опубликовать. Попробуй ещё раз.');
  } finally {
    btn.classList.remove('loading');
    btn.textContent = 'Опубликовать';
  }
}

function hideFeedBadge() {
  document.getElementById('feed-nav-badge').style.display = 'none';
}

function showFeedBadge() {
  const badge = document.getElementById('feed-nav-badge');
  const currentScreen = document.querySelector('.screen.active');
  if (currentScreen && currentScreen.id === 'screen-feed') return;
  badge.style.display = 'block';
}

function loadFeed() {
  const container = document.getElementById('feed-container');
  if (!container) return;

  if (feedUnsubscribe) {
    feedUnsubscribe();
    feedUnsubscribe = null;
  }

  container.innerHTML = '<div class="feed-loading">Загружаем ленту...</div>';

  feedUnsubscribe = db.collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .onSnapshot(snapshot => {
      // Note: requires Firestore index on createdAt desc — auto-created on first query
      if (snapshot.empty) {
        container.innerHTML = `
          <div class="feed-empty">
            <div class="feed-empty-icon">🌱</div>
            <div class="feed-empty-text">Лента пока пустая</div>
            <div class="feed-empty-sub">Пройди урок или квиз — и твой результат появится здесь!</div>
          </div>`;
        return;
      }

      const isFirstLoad = container.querySelector('.feed-loading');
      const newPostIds = new Set();
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added' && !isFirstLoad) newPostIds.add(change.doc.id);
      });

      if (newPostIds.size > 0 && !isFirstLoad) showFeedBadge();

      container.innerHTML = '';
      snapshot.forEach(doc => {
        container.appendChild(renderFeedCard(doc.id, doc.data()));
      });
    }, err => {
      console.error('Feed error:', err);
      // Fallback: load without ordering (index may not exist yet)
      db.collection('posts').limit(50).get().then(snap => {
        if (snap.empty) {
          container.innerHTML = `<div class="feed-empty"><div class="feed-empty-icon">🌱</div><div class="feed-empty-text">Лента пока пустая</div><div class="feed-empty-sub">Пройди урок или квиз!</div></div>`;
          return;
        }
        const docs = [];
        snap.forEach(d => docs.push({ id: d.id, data: d.data() }));
        docs.sort((a, b) => (b.data.createdAt?.seconds || 0) - (a.data.createdAt?.seconds || 0));
        container.innerHTML = '';
        docs.forEach(d => container.appendChild(renderFeedCard(d.id, d.data)));
      }).catch(() => {
        container.innerHTML = '<div class="feed-loading">Не удалось загрузить ленту</div>';
      });
    });
}

function renderFeedCard(docId, post) {
  const card = document.createElement('div');
  card.className = 'feed-card';
  card.dataset.postId = docId;

  const myUid = currentUser?.uid;
  const likes = post.likes || [];
  const isLiked = likes.includes(myUid);
  const timeAgo = formatTimeAgo(post.createdAt?.toDate ? post.createdAt.toDate() : new Date());

  let avatarHtml;
  if (post.photoURL) {
    avatarHtml = `<img class="feed-avatar" src="${post.photoURL}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                  <div class="feed-avatar-initials" style="display:none">${getInitials(post.displayName)}</div>`;
  } else {
    avatarHtml = `<div class="feed-avatar-initials">${getInitials(post.displayName)}</div>`;
  }

  const chipsHtml = (post.chips || []).map(c =>
    `<span class="feed-chip ${c.color || ''}">${c.text}</span>`
  ).join('');

  const isUserPost = post.type === 'user_post';

  card.innerHTML = `
    <div class="feed-card-header">
      ${avatarHtml}
      <div class="feed-card-meta">
        <div class="feed-card-name">${escHtml(post.displayName || 'Ученик')}</div>
        <div class="feed-card-time">${timeAgo}</div>
      </div>
    </div>
    ${isUserPost ? `
      ${post.title ? `<div class="feed-user-text">${escHtml(post.title)}</div>` : ''}
      ${post.imageUrl ? `<div class="feed-card-image"><img src="${post.imageUrl}" alt="" loading="lazy" onclick="openFeedImage('${post.imageUrl}')"></div>` : ''}
    ` : `
      <div class="feed-card-body">
        <div class="feed-card-icon">${post.emoji || '📌'}</div>
        <div class="feed-card-text">
          <div class="feed-card-title">${escHtml(post.title || '')}</div>
          <div class="feed-card-sub">${escHtml(post.subtitle || '')}</div>
          ${chipsHtml ? `<div class="feed-card-chips">${chipsHtml}</div>` : ''}
        </div>
      </div>
    `}
    <div class="feed-card-footer">
      <button class="feed-like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${docId}')">
        <span class="like-heart">${isLiked ? '❤️' : '🤍'}</span>
        <span>${likes.length > 0 ? likes.length : ''}</span>
      </button>
      ${post.uid === myUid ? `<button class="feed-delete-btn" onclick="deletePost('${docId}')" title="Удалить пост">✕</button>` : ''}
    </div>`;
  return card;
}

function deletePost(docId) {
  if (!currentUser) return;
  db.collection('posts').doc(docId).get().then(doc => {
    if (!doc.exists || doc.data().uid !== currentUser.uid) return;
    db.collection('posts').doc(docId).delete();
  });
}

function toggleLike(docId) {
  if (!currentUser) return;
  const uid = currentUser.uid;
  const ref = db.collection('posts').doc(docId);
  ref.get().then(doc => {
    if (!doc.exists) return;
    const likes = doc.data().likes || [];
    const updated = likes.includes(uid)
      ? likes.filter(id => id !== uid)
      : [...likes, uid];
    ref.update({ likes: updated });
  });
}

async function createPost(type, data) {
  if (!currentUser) return;
  try {
    await db.collection('posts').add({
      uid: currentUser.uid,
      displayName: currentUser.displayName || 'Ученик',
      photoURL: currentUser.photoURL || null,
      type,
      ...buildPostContent(type, data),
      likes: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (e) {
    console.warn('createPost error:', e);
  }
}

function buildPostContent(type, data) {
  switch (type) {
    case 'lesson_complete': {
      const stars = data.isPerfect ? '⭐⭐⭐' : data.hearts >= 2 ? '⭐⭐' : '⭐';
      return {
        emoji: '📖',
        title: 'Прошёл урок испанского',
        subtitle: `${stars} · ${data.correct}/${data.total} правильно`,
        chips: [
          { text: `+${data.xp} XP`, color: 'green' },
          { text: `🔥 ${data.streak} дн.`, color: 'yellow' }
        ]
      };
    }
    case 'quiz_complete': {
      const stars = data.pct === 1 ? '⭐⭐⭐' : data.pct >= 0.7 ? '⭐⭐' : '⭐';
      return {
        emoji: '🧩',
        title: `Квиз: ${data.categoryTitle || 'Испанский'}`,
        subtitle: `${stars} · ${data.score}/${data.total} правильно`,
        chips: [
          { text: `+${data.xp} XP`, color: 'green' },
          { text: `${Math.round(data.pct * 100)}%`, color: data.pct === 1 ? 'green' : 'blue' }
        ]
      };
    }
    case 'achievement': {
      return {
        emoji: data.icon || '🏆',
        title: `Достижение: ${data.title}`,
        subtitle: data.desc || '',
        chips: [{ text: 'Новое достижение', color: 'yellow' }]
      };
    }
    case 'streak': {
      return {
        emoji: '🔥',
        title: `${data.streak} дней подряд!`,
        subtitle: 'Отличная серия — так держать!',
        chips: [{ text: `🔥 ${data.streak} дней`, color: 'yellow' }]
      };
    }
    default:
      return { emoji: '📌', title: data.title || '', subtitle: '' };
  }
}

function formatTimeAgo(date) {
  if (!date) return '';
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'только что';
  if (diff < 3600) return `${Math.floor(diff / 60)} мин. назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} дн. назад`;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function openFeedImage(url) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
  overlay.innerHTML = `<img src="${url}" style="max-width:95vw;max-height:90vh;border-radius:12px;object-fit:contain">`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', init);

// ============================================================
// NEWS FEED
// ============================================================
const NEWS_TOPICS = [
  { id: 'all',       label: 'Все',         emoji: '🌐' },
  { id: 'football',  label: 'Футбол',      emoji: '⚽', query: 'fútbol' },
  { id: 'politics',  label: 'Политика',    emoji: '🏛️', query: 'política' },
  { id: 'history',   label: 'История',     emoji: '📜', query: 'historia' },
  { id: 'tech',      label: 'Технологии',  emoji: '💻', query: 'tecnología' },
  { id: 'marketing', label: 'Маркетинг',   emoji: '📊', query: 'marketing' },
  { id: 'ai',        label: 'ИИ',          emoji: '🤖', query: 'inteligencia artificial' },
  { id: 'games',     label: 'Игры',        emoji: '🎮', query: 'videojuegos gaming' },
  { id: 'science',   label: 'Наука',       emoji: '🔬', query: 'ciencia' },
  { id: 'hollywood', label: 'Голливуд',    emoji: '🎬', query: 'hollywood cine' },
];

let newsCache = {};
let activeNewsTopic = 'all';
let newsRefreshTimer = null;
let translationCache = {};
let currentNewsItems = [];

async function showNews() {
  showScreen('screen-news');
  renderNewsTabs();
  await loadNews(activeNewsTopic);
  startNewsRefreshTimer();
}

function renderNewsTabs() {
  document.getElementById('news-tabs').innerHTML = NEWS_TOPICS.map(t => `
    <button class="news-tab ${t.id === activeNewsTopic ? 'active' : ''}" data-topic="${t.id}" onclick="switchNewsTopic('${t.id}')">
      ${t.emoji} ${t.label}
    </button>
  `).join('');
}

async function switchNewsTopic(topicId) {
  activeNewsTopic = topicId;
  document.querySelectorAll('.news-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.topic === topicId);
  });
  await loadNews(topicId);
}

async function loadNews(topicId, forceRefresh = false) {
  if (!forceRefresh && newsCache[topicId]) {
    currentNewsItems = newsCache[topicId];
    renderNewsItems(currentNewsItems, topicId);
    return;
  }
  showNewsLoading();
  try {
    const items = topicId === 'all'
      ? await fetchAllNews()
      : await fetchNewsForQuery(NEWS_TOPICS.find(t => t.id === topicId).query, topicId);
    newsCache[topicId] = items;
    currentNewsItems = items;
    renderNewsItems(items, topicId);
  } catch (e) {
    showNewsError();
  }
}

function fetchWithTimeout(url, ms) {
  return Promise.race([
    fetch(url, { cache: 'no-store' }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
  ]);
}

function parseRSSXML(text) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'text/xml');
  const items = [...xml.querySelectorAll('item')];
  if (!items.length) return null;
  return items.map(item => {
    const rawTitle = item.querySelector('title')?.textContent || '';
    const linkNode = item.querySelector('link');
    const link = linkNode ? (linkNode.nextSibling?.nodeValue?.trim() || linkNode.textContent) : '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const source = item.querySelector('source')?.textContent || '';
    const desc = item.querySelector('description')?.textContent || '';
    const imgMatch = desc.match(/<img[^>]+src="([^"]+)"/);
    const thumbnail = imgMatch ? imgMatch[1] : '';
    return { title: rawTitle, link, pubDate, thumbnail, source };
  });
}

async function fetchRSS(rssUrl) {
  const encoded = encodeURIComponent(rssUrl);
  const proxies = [
    // rss2json — returns parsed JSON directly (no count param = free tier)
    async () => {
      const res = await fetchWithTimeout(`https://api.rss2json.com/v1/api.json?rss_url=${encoded}`, 8000);
      const d = await res.json();
      if (d.status === 'ok' && d.items?.length) {
        return d.items.map(i => ({
          title: i.title, link: i.link, pubDate: i.pubDate,
          thumbnail: i.thumbnail || i.enclosure?.link || '', source: i.author || ''
        }));
      }
      return null;
    },
    // allorigins raw endpoint
    async () => {
      const res = await fetchWithTimeout(`https://api.allorigins.win/raw?url=${encoded}`, 10000);
      if (!res.ok) return null;
      return await res.text();
    },
    // allorigins get endpoint (JSON-wrapped, sometimes succeeds when /raw times out)
    async () => {
      const res = await fetchWithTimeout(`https://api.allorigins.win/get?url=${encoded}`, 10000);
      const d = await res.json();
      if (d.contents && d.contents.trim().startsWith('<')) return d.contents;
      return null;
    },
  ];

  for (const attempt of proxies) {
    try {
      const result = await attempt();
      if (!result) continue;
      // rss2json already returns parsed array
      if (Array.isArray(result)) return result;
      const parsed = parseRSSXML(result);
      if (parsed && parsed.length > 0) return parsed;
    } catch (e) {
      console.warn('RSS proxy failed, trying next:', e.message);
    }
  }
  return [];
}

async function fetchNewsForQuery(query, topicId) {
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=es&gl=ES&ceid=ES:es`;
  const items = await fetchRSS(rssUrl);
  return items.map(item => ({ ...item, _topicId: topicId }));
}

async function fetchAllNews() {
  const rssUrl = `https://news.google.com/rss?hl=es&gl=ES&ceid=ES:es`;
  return await fetchRSS(rssUrl);
}

function showNewsLoading() {
  document.getElementById('news-feed').innerHTML = `
    <div class="news-loading">
      <div class="news-spinner"></div>
      <div>Загружаем новости на испанском...</div>
    </div>`;
}

function showNewsError() {
  document.getElementById('news-feed').innerHTML = `
    <div class="news-error">
      ⚠️ Не удалось загрузить новости.<br>
      <button class="news-translate-btn" style="margin-top:12px" onclick="loadNews(activeNewsTopic, true)">
        Попробовать снова
      </button>
    </div>`;
}

function renderNewsItems(items, topicId) {
  const feed = document.getElementById('news-feed');
  if (!items || items.length === 0) {
    feed.innerHTML = `<div class="news-empty">Новостей не найдено 😕</div>`;
    return;
  }
  feed.innerHTML = items.map((item, idx) => {
    const imgUrl = item.thumbnail || (item.enclosure && item.enclosure.link) || '';
    const imgHtml = imgUrl ? `<img class="news-img" src="${imgUrl}" alt="" onerror="this.style.display='none'" loading="lazy">` : '';
    const source = extractDomain(item.link || item.guid || '');
    const date = formatNewsDate(item.pubDate);
    const titleHtml = wrapWordsInSpans(item.title || '');
    const topic = NEWS_TOPICS.find(t => t.id === (item._topicId || topicId));
    const tagHtml = (topicId === 'all' && topic && topic.id !== 'all')
      ? `<div class="news-topic-tag">${topic.emoji} ${topic.label}</div>` : '';
    return `
      <div class="news-card">
        ${imgHtml}
        <div class="news-content">
          ${tagHtml}
          <div class="news-title">${titleHtml}</div>
          <div class="news-meta">
            <span class="news-source">${source}</span>
            <span class="news-date">${date}</span>
          </div>
          <button class="news-translate-btn" onclick="translateNewsItem(this, ${idx})">Перевести</button>
          <div class="news-translation" id="news-trans-${idx}" style="display:none"></div>
        </div>
      </div>`;
  }).join('');
}

function wrapWordsInSpans(text) {
  const clean = text.replace(/<[^>]*>/g, '');
  return clean.split(/(\s+)/).map(token => {
    if (/^\s+$/.test(token)) return token;
    const word = token.replace(/^[«»"'.,!?;:()\[\]]+|[«»"'.,!?;:()\[\]]+$/g, '');
    if (!word || word.length < 2) return token;
    const safe = word.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    return `<span class="news-word" onclick="translateWord(this,'${safe}')">${token}</span>`;
  }).join('');
}

function extractDomain(url) {
  if (!url) return '';
  try { return new URL(url).hostname.replace('www.', ''); } catch (e) { return ''; }
}

function formatNewsDate(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 60) return `${diff} мин. назад`;
  if (diff < 1440) return `${Math.floor(diff / 60)} ч. назад`;
  return `${Math.floor(diff / 1440)} дн. назад`;
}

async function translateNewsItem(btn, idx) {
  const transEl = document.getElementById(`news-trans-${idx}`);
  if (transEl.style.display !== 'none') {
    transEl.style.display = 'none';
    btn.textContent = 'Перевести';
    btn.classList.remove('translated');
    return;
  }
  const text = currentNewsItems[idx] && currentNewsItems[idx].title;
  if (!text) return;
  btn.textContent = '...';
  btn.disabled = true;
  const translated = await fetchTranslation(text);
  transEl.textContent = translated;
  transEl.style.display = 'block';
  btn.textContent = 'Скрыть перевод';
  btn.classList.add('translated');
  btn.disabled = false;
}

async function translateWord(el, word) {
  if (!word || word.length < 2) return;
  document.querySelectorAll('.news-word.word-active').forEach(w => w.classList.remove('word-active'));
  el.classList.add('word-active');
  const tooltip = document.getElementById('word-tooltip');
  document.getElementById('word-tooltip-original').textContent = word;
  document.getElementById('word-tooltip-translation').textContent = '...';
  const rect = el.getBoundingClientRect();
  const top = rect.bottom + 8;
  const left = Math.min(rect.left, window.innerWidth - 220);
  tooltip.style.cssText = `top:${top}px;left:${left}px;`;
  tooltip.classList.add('visible');
  const translation = await fetchTranslation(word);
  document.getElementById('word-tooltip-translation').textContent = translation;
  clearTimeout(tooltip._hideTimer);
  tooltip._hideTimer = setTimeout(() => {
    tooltip.classList.remove('visible');
    el.classList.remove('word-active');
  }, 4000);
}

async function fetchTranslation(text) {
  if (!text) return '';
  if (translationCache[text]) return translationCache[text];
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|ru`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.responseData && data.responseData.translatedText
      ? data.responseData.translatedText
      : text;
    translationCache[text] = result;
    return result;
  } catch (e) { return '(ошибка перевода)'; }
}

function startNewsRefreshTimer() {
  if (newsRefreshTimer) clearInterval(newsRefreshTimer);
  newsRefreshTimer = setInterval(async () => {
    newsCache = {};
    const badge = document.getElementById('news-refresh-badge');
    if (badge) badge.classList.add('spinning');
    await loadNews(activeNewsTopic, true);
    if (badge) badge.classList.remove('spinning');
  }, 30 * 60 * 1000);
}

function manualRefreshNews() {
  newsCache = {};
  const badge = document.getElementById('news-refresh-badge');
  if (badge) badge.classList.add('spinning');
  loadNews(activeNewsTopic, true).then(() => {
    if (badge) badge.classList.remove('spinning');
  });
}

document.addEventListener('click', e => {
  if (!e.target.classList.contains('news-word')) {
    const tooltip = document.getElementById('word-tooltip');
    if (tooltip) tooltip.classList.remove('visible');
    document.querySelectorAll('.news-word.word-active').forEach(w => w.classList.remove('word-active'));
  }
  // Закрываем меню пользователя при клике вне
  const menu = document.getElementById('user-menu');
  const btn = document.getElementById('user-avatar-btn');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// ============================================================
// VOCAB QUIZ
// ============================================================
let currentVocabMode = 'image';
let vocabQuizState = {
  categoryId: null, mode: null, words: [],
  currentIndex: 0, score: 0, answered: false, totalWords: 10, options: []
};

function showVocab(mode) {
  currentVocabMode = mode;
  document.getElementById('vocab-screen-title').textContent = mode === 'image' ? 'Карточки' : 'Перевод';
  const descEl = document.getElementById('vocab-screen-desc');
  if (descEl) descEl.textContent = mode === 'image'
    ? 'Выбери картинку, которая соответствует испанскому слову.'
    : 'Выбери правильный перевод испанского слова.';

  document.getElementById('vocab-categories-list').innerHTML =
    `<div class="vocab-categories-grid">${VOCAB_CATEGORIES.map(cat => {
      const learned = (state.vocabProgress[cat.id] || []).length;
      const total = cat.words.length;
      const pct = Math.round(learned / total * 100);
      const done = learned >= total;
      return `
      <div class="vocab-category-card${done ? ' vocab-cat-done' : ''}" onclick="startVocabQuiz('${cat.id}')">
        <div class="vocab-cat-icon">${done ? '✅' : cat.emoji}</div>
        <div class="vocab-cat-title">${cat.title}</div>
        ${learned > 0 ? `
        <div class="vocab-cat-progress">
          <div class="vocab-cat-progress-bar">
            <div class="vocab-cat-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="vocab-cat-progress-label">${learned}/${total}</span>
        </div>` : ''}
      </div>`;
    }).join('')}</div>`;

  // Reset search
  const si = document.getElementById('vocab-search');
  if (si) si.value = '';
  searchVocab('');

  showScreen('screen-vocab');
}

function searchVocab(query) {
  const q = query.trim().toLowerCase();
  const resultsEl = document.getElementById('vocab-search-results');
  const catsEl = document.getElementById('vocab-categories-list');

  if (!q) {
    resultsEl.style.display = 'none';
    catsEl.style.display = '';
    return;
  }

  catsEl.style.display = 'none';
  resultsEl.style.display = '';

  const matches = [];
  VOCAB_CATEGORIES.forEach(cat => {
    cat.words.forEach(w => {
      if (
        w.greek.toLowerCase().includes(q) ||
        w.transcription.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q)
      ) {
        matches.push({ ...w, catTitle: cat.title, catEmoji: cat.emoji });
      }
    });
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="search-empty">Ничего не найдено</div>`;
    return;
  }

  resultsEl.innerHTML = `<div class="vocab-search-list">${matches.map(w => `
    <div class="vocab-search-card">
      <div class="vocab-search-emoji">${w.emoji || '📝'}</div>
      <div class="vocab-search-body">
        <div class="vocab-search-greek">${w.greek}
          <button class="vocab-tts-btn" data-greek="${w.greek.replace(/"/g,'&quot;')}"
                  onclick="speakGreek(this.dataset.greek)">🔊</button>
        </div>
        <div class="vocab-search-transcription">${w.transcription}</div>
        <div class="vocab-search-translation">${w.translation}</div>
      </div>
      <div class="vocab-search-cat">${w.catEmoji} ${w.catTitle}</div>
    </div>
  `).join('')}</div>`;
}

function startVocabQuiz(categoryId) {
  const category = VOCAB_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return;
  const words = shuffle([...category.words]).slice(0, 10);
  vocabQuizState = {
    categoryId, mode: currentVocabMode, words,
    currentIndex: 0, score: 0, answered: false, totalWords: words.length, options: []
  };
  showScreen('screen-vocab-quiz');
  renderVocabWord();
}

function renderVocabWord() {
  const { words, currentIndex, mode, totalWords } = vocabQuizState;
  const word = words[currentIndex];
  vocabQuizState.answered = false;
  document.getElementById('vocab-progress').style.width = (currentIndex / totalWords * 100) + '%';
  document.getElementById('vocab-score').textContent = vocabQuizState.score;
  document.getElementById('vocab-footer').style.display = 'none';
  document.getElementById('vocab-footer').className = 'lesson-footer';
  const category = VOCAB_CATEGORIES.find(c => c.id === vocabQuizState.categoryId);
  if (mode === 'image') renderImageQuiz(word, category);
  else renderTranslationQuiz(word, category);
}

function renderImageQuiz(word, category) {
  const pool = category.words.filter(w => w.greek !== word.greek);
  const wrongWords = shuffle(pool).slice(0, 3);
  // if pool has < 3 words pad from other categories
  if (wrongWords.length < 3) {
    const extra = VOCAB_CATEGORIES
      .filter(c => c.id !== category.id)
      .flatMap(c => c.words)
      .filter(w => !wrongWords.some(x => x.greek === w.greek));
    wrongWords.push(...shuffle(extra).slice(0, 3 - wrongWords.length));
  }
  const options = shuffle([word, ...wrongWords]);
  vocabQuizState.options = options;

  document.getElementById('vocab-quiz-container').innerHTML = `
    <div class="vocab-word-display">
      <div class="vocab-word-mode-label">✦ Новый</div>
      <div class="vocab-word-instruction">Выберите картинку с переводом на русский</div>
      <div class="vocab-word-greek">
        ${word.greek}
        <button class="vocab-tts-btn" data-greek="${word.greek.replace(/"/g, '&quot;')}" onclick="speakGreek(this.dataset.greek)">🔊</button>
      </div>
      <div class="vocab-word-transcription">${word.transcription}</div>
    </div>
    <div class="vocab-image-grid">
      ${options.map((opt, i) => `
        <button class="vocab-image-card" onclick="selectVocabAnswer(${i})">
          <span class="vocab-card-emoji">${opt.emoji}</span>
          <div class="vocab-card-label">${opt.translation}</div>
        </button>`).join('')}
    </div>`;
}

function renderTranslationQuiz(word, category) {
  const pool = category.words.filter(w => w.greek !== word.greek);
  const wrongWords = shuffle(pool).slice(0, 2);
  if (wrongWords.length < 2) {
    const extra = VOCAB_CATEGORIES
      .filter(c => c.id !== category.id)
      .flatMap(c => c.words)
      .filter(w => !wrongWords.some(x => x.greek === w.greek));
    wrongWords.push(...shuffle(extra).slice(0, 2 - wrongWords.length));
  }
  const options = shuffle([word, ...wrongWords]);
  vocabQuizState.options = options;

  document.getElementById('vocab-quiz-container').innerHTML = `
    <div class="vocab-word-display">
      <div class="vocab-word-mode-label">✦ Новый</div>
      <div class="vocab-word-instruction">Выберите перевод на русский</div>
      <div class="vocab-word-greek">
        ${word.greek}
        <button class="vocab-tts-btn" data-greek="${word.greek.replace(/"/g, '&quot;')}" onclick="speakGreek(this.dataset.greek)">🔊</button>
      </div>
      <div class="vocab-word-transcription">${word.transcription}</div>
    </div>
    <div class="vocab-translation-options">
      ${options.map((opt, i) => `
        <button class="vocab-translation-btn" onclick="selectVocabAnswer(${i})">
          ${opt.translation}
        </button>`).join('')}
    </div>`;
}

function selectVocabAnswer(optionIdx) {
  if (vocabQuizState.answered) return;
  vocabQuizState.answered = true;

  const { words, currentIndex, options, mode } = vocabQuizState;
  const correctWord = words[currentIndex];
  const selectedWord = options[optionIdx];
  const isCorrect = selectedWord.greek === correctWord.greek;
  const correctIdx = options.findIndex(o => o.greek === correctWord.greek);

  const btnSelector = mode === 'image' ? '.vocab-image-card' : '.vocab-translation-btn';
  const buttons = document.querySelectorAll(btnSelector);
  buttons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    vocabQuizState.score++;
    buttons[optionIdx].classList.add('correct');
    document.getElementById('vocab-score').textContent = vocabQuizState.score;
    document.getElementById('vocab-feedback').textContent = randomCorrectPhrase();
    document.getElementById('vocab-feedback').className = 'feedback-message correct';
    document.getElementById('vocab-footer').className = 'lesson-footer correct-footer';
    playSound('correct');
    // Mark word as learned
    const catId = vocabQuizState.categoryId;
    if (!state.vocabProgress[catId]) state.vocabProgress[catId] = [];
    if (!state.vocabProgress[catId].includes(correctWord.greek)) {
      state.vocabProgress[catId].push(correctWord.greek);
    }
  } else {
    buttons[optionIdx].classList.add('wrong');
    buttons[correctIdx].classList.add('correct');
    document.getElementById('vocab-feedback').innerHTML = `Правильно: <strong>${correctWord.translation}</strong> ${correctWord.emoji}`;
    document.getElementById('vocab-feedback').className = 'feedback-message wrong';
    document.getElementById('vocab-footer').className = 'lesson-footer wrong-footer';
    playSound('wrong');
  }
  document.getElementById('vocab-footer').style.display = 'flex';
}

function nextVocabWord() {
  vocabQuizState.currentIndex++;
  if (vocabQuizState.currentIndex >= vocabQuizState.totalWords) completeVocabQuiz();
  else renderVocabWord();
}

function completeVocabQuiz() {
  const { score, totalWords } = vocabQuizState;
  const xp = score * XP_PER_CORRECT;
  state.totalXp += xp;
  state.dailyXp += xp;
  state.level = Math.floor(state.totalXp / 500) + 1;
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();
  const pct = score / totalWords;
  document.getElementById('vocab-complete-stars').textContent = pct === 1 ? '⭐⭐⭐' : pct >= 0.7 ? '⭐⭐' : '⭐';
  document.getElementById('vocab-complete-score').textContent = `${score}/${totalWords}`;
  document.getElementById('vocab-complete-xp').textContent = `+${xp}`;
  showScreen('screen-vocab-complete');
}

function restartVocabQuiz() { startVocabQuiz(vocabQuizState.categoryId); }
function exitVocabQuiz() { showVocab(currentVocabMode); }


// ============================================================
// QUIZ — SENTENCE ORDERING
// ============================================================
let quizState = {
  categoryId: null, sentences: [], currentIndex: 0,
  hearts: 3, score: 0, xpEarned: 0, answered: false,
  placedWords: [], availableWords: [], dragSrc: null
};

function showQuiz() {
  const list = document.getElementById('quiz-categories-list');
  list.innerHTML = `<div class="vocab-categories-grid">${
    QUIZ_CATEGORIES.map(cat => `
      <div class="vocab-category-card" onclick="startQuiz('${cat.id}')">
        <div class="vocab-cat-icon">${cat.emoji}</div>
        <div class="vocab-cat-title">${cat.title}</div>
        <div class="vocab-cat-count">${cat.sentences.length} предложений</div>
      </div>`).join('')
  }</div>`;
  showScreen('screen-quiz');
}

function startQuiz(categoryId) {
  if (!trialGate()) return;
  const cat = QUIZ_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return;
  // Берём 10 предложений: сортируем по сложности, выбираем равномерно
  const sorted = [...cat.sentences].sort((a, b) => a.diff - b.diff);
  const sentences = shuffle(sorted).slice(0, 10).sort((a, b) => a.diff - b.diff);
  quizState = {
    categoryId, sentences, currentIndex: 0,
    hearts: 3, score: 0, xpEarned: 0, answered: false,
    placedWords: [], availableWords: [], dragSrc: null
  };
  showScreen('screen-quiz-session');
  renderQuizSentence();
}

function renderQuizSentence() {
  const { sentences, currentIndex } = quizState;
  const s = sentences[currentIndex];
  quizState.answered = false;
  quizState.placedWords = [];
  quizState.availableWords = shuffle([...s.words]);

  document.getElementById('quiz-progress').style.width =
    (currentIndex / quizState.sentences.length * 100) + '%';
  document.getElementById('quiz-xp').textContent = quizState.xpEarned;
  document.getElementById('quiz-footer').style.display = 'none';
  document.getElementById('quiz-footer').className = 'lesson-footer';

  renderQuizUI(s);
}

function renderQuizUI(s) {
  const container = document.getElementById('quiz-session-container');
  const hearts = '<span class="heart-icon">❤️</span>'.repeat(quizState.hearts) +
    '<span class="heart-icon dead">🖤</span>'.repeat(3 - quizState.hearts);

  container.innerHTML = `
    <div class="quiz-hearts">${hearts}</div>
    <div class="quiz-translation">${s.ru}</div>
    <div class="quiz-answer-area" id="quiz-answer-area">
      ${quizState.placedWords.length === 0
        ? '<span class="quiz-answer-placeholder">Нажми на слова ниже</span>'
        : quizState.placedWords.map((w, i) =>
            `<button class="quiz-word-tile placed" onclick="removeQuizWord(${i})"
              draggable="true" data-idx="${i}" data-source="placed">${w}</button>`
          ).join('')}
    </div>
    <div class="quiz-word-pool" id="quiz-word-pool">
      ${quizState.availableWords.map((w, i) =>
        `<button class="quiz-word-tile" onclick="addQuizWord(${i})"
          draggable="true" data-idx="${i}" data-source="pool">${w}</button>`
      ).join('')}
    </div>
    <button class="btn-primary quiz-check-btn" id="quiz-check-btn"
      onclick="checkQuizAnswer()"
      ${quizState.placedWords.length === 0 ? 'disabled' : ''}>
      Проверить ✓
    </button>`;

  setupQuizDragDrop();
}

function addQuizWord(poolIdx) {
  if (quizState.answered) return;
  const word = quizState.availableWords[poolIdx];
  quizState.availableWords.splice(poolIdx, 1);
  quizState.placedWords.push(word);
  renderQuizUI(quizState.sentences[quizState.currentIndex]);
}

function removeQuizWord(placedIdx) {
  if (quizState.answered) return;
  const word = quizState.placedWords[placedIdx];
  quizState.placedWords.splice(placedIdx, 1);
  quizState.availableWords.push(word);
  renderQuizUI(quizState.sentences[quizState.currentIndex]);
}

function checkQuizAnswer() {
  if (quizState.answered || quizState.placedWords.length === 0) return;
  const s = quizState.sentences[quizState.currentIndex];

  // Проверяем если все слова размещены
  if (quizState.placedWords.length < s.words.length) return;

  quizState.answered = true;
  const correct = s.words.join(' ');
  const answer = quizState.placedWords.join(' ');
  const isCorrect = answer === correct;

  const footer = document.getElementById('quiz-footer');
  const feedback = document.getElementById('quiz-feedback');
  const checkBtn = document.getElementById('quiz-check-btn');
  if (checkBtn) checkBtn.disabled = true;

  // Подсветка ответа
  const answerArea = document.getElementById('quiz-answer-area');
  if (answerArea) {
    answerArea.classList.add(isCorrect ? 'answer-correct' : 'answer-wrong');
  }

  if (isCorrect) {
    quizState.score++;
    quizState.xpEarned += XP_PER_CORRECT;
    document.getElementById('quiz-xp').textContent = quizState.xpEarned;
    feedback.textContent = randomCorrectPhrase();
    feedback.className = 'feedback-message correct';
    footer.className = 'lesson-footer correct-footer';
    playSound('correct');
  } else {
    quizState.hearts--;
    feedback.innerHTML = `Правильно: <strong>${correct}</strong>`;
    feedback.className = 'feedback-message wrong';
    footer.className = 'lesson-footer wrong-footer';
    playSound('wrong');
  }

  footer.style.display = 'flex';
  const continueBtn = document.getElementById('quiz-continue-btn');
  continueBtn.textContent = quizState.hearts <= 0 ? 'Завершить' : 'Продолжить';
}

function nextQuizSentence() {
  if (quizState.hearts <= 0) { completeQuiz(); return; }
  quizState.currentIndex++;
  if (quizState.currentIndex >= quizState.sentences.length) completeQuiz();
  else renderQuizSentence();
}

function completeQuiz() {
  const { score, xpEarned } = quizState;
  const total = quizState.sentences.length;
  state.totalXp += xpEarned;
  state.dailyXp += xpEarned;
  state.level = Math.floor(state.totalXp / 500) + 1;
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();

  const pct = score / total;
  const cat = QUIZ_CATEGORIES.find(c => c.id === quizState.categoryId);
  createPost('quiz_complete', {
    score, total, pct, xp: xpEarned,
    categoryTitle: cat?.title || 'Испанский'
  });

  document.getElementById('quiz-complete-stars').textContent =
    pct === 1 ? '⭐⭐⭐' : pct >= 0.7 ? '⭐⭐' : '⭐';
  document.getElementById('quiz-complete-score').textContent = `${score}/${total}`;
  document.getElementById('quiz-complete-xp').textContent = `+${xpEarned}`;
  showScreen('screen-quiz-complete');
}

function restartQuiz() { startQuiz(quizState.categoryId); }
function exitQuiz() { showQuiz(); }

// ============================================================
// DRAG AND DROP
// ============================================================
function setupQuizDragDrop() {
  const tiles = document.querySelectorAll('.quiz-word-tile');
  const answerArea = document.getElementById('quiz-answer-area');
  const pool = document.getElementById('quiz-word-pool');

  tiles.forEach(tile => {
    // Desktop drag
    tile.addEventListener('dragstart', e => {
      quizState.dragSrc = tile;
      e.dataTransfer.effectAllowed = 'move';
      tile.classList.add('dragging');
    });
    tile.addEventListener('dragend', () => tile.classList.remove('dragging'));

    // Mobile touch drag
    tile.addEventListener('touchstart', handleTouchStart, { passive: true });
    tile.addEventListener('touchmove', handleTouchMove, { passive: false });
    tile.addEventListener('touchend', handleTouchEnd);
  });

  [answerArea, pool].forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      if (!quizState.dragSrc) return;
      const src = quizState.dragSrc.dataset.source;
      const idx = parseInt(quizState.dragSrc.dataset.idx);
      const dest = zone.id === 'quiz-answer-area' ? 'placed' : 'pool';
      if (src === 'pool' && dest === 'placed') addQuizWord(idx);
      else if (src === 'placed' && dest === 'pool') removeQuizWord(idx);
    });
  });
}

let _touchTile = null, _touchClone = null, _touchOffX = 0, _touchOffY = 0;

function handleTouchStart(e) {
  _touchTile = e.currentTarget;
  const t = e.touches[0];
  const r = _touchTile.getBoundingClientRect();
  _touchOffX = t.clientX - r.left;
  _touchOffY = t.clientY - r.top;
  _touchClone = _touchTile.cloneNode(true);
  _touchClone.className = 'quiz-word-tile dragging touch-clone';
  _touchClone.style.cssText = `position:fixed;z-index:9999;pointer-events:none;
    left:${r.left}px;top:${r.top}px;width:${r.width}px;opacity:0.85;`;
  document.body.appendChild(_touchClone);
}

function handleTouchMove(e) {
  e.preventDefault();
  if (!_touchClone) return;
  const t = e.touches[0];
  _touchClone.style.left = (t.clientX - _touchOffX) + 'px';
  _touchClone.style.top = (t.clientY - _touchOffY) + 'px';
}

function handleTouchEnd(e) {
  if (!_touchClone || !_touchTile) return;
  const t = e.changedTouches[0];
  _touchClone.remove();

  const el = document.elementFromPoint(t.clientX, t.clientY);
  const inAnswer = el && (el.id === 'quiz-answer-area' || el.closest('#quiz-answer-area'));
  const inPool = el && (el.id === 'quiz-word-pool' || el.closest('#quiz-word-pool'));

  const src = _touchTile.dataset.source;
  const idx = parseInt(_touchTile.dataset.idx);

  if (src === 'pool' && inAnswer) addQuizWord(idx);
  else if (src === 'placed' && inPool) removeQuizWord(idx);

  _touchTile = null;
  _touchClone = null;
}

// ============================================================
// BLOG
// ============================================================
const BLOG_ARTICLES = [
  {
    section: '📚 С чего начать',
    color: 'green',
    items: [
      { slug: 'ispanski-alfavit',        emoji: '🔤', tag: 'Основы',   title: 'Испанский алфавит: все буквы с произношением' },
      { slug: 'kak-govorit-po-ispanski', emoji: '📚', tag: 'С нуля',   title: 'Как начать говорить по-испански с нуля: пошаговый план' },
      { slug: 'slozhno-li-uchit-ispanski', emoji: '💡', tag: 'Мотивация', title: 'Сложно ли учить испанский язык русскому? Честный ответ' },
      { slug: 'ispanski-dlya-russkih',   emoji: '🇷🇺', tag: 'Лайфхаки', title: 'Испанский для русскоязычных: особенности, ошибки и лайфхаки' },
      { slug: 'intervalnoe-povtorenie',  emoji: '🧠', tag: 'Методика', title: 'Интервальное повторение для изучения испанского: метод SRS' },
    ]
  },
  {
    section: '🇪🇸 Жизнь в Испании',
    color: 'green',
    items: [
      { slug: '50-fraz-v-ispanii',        emoji: '💬', tag: 'Фразы',     title: '50 фраз для жизни в Испании с транскрипцией' },
      { slug: 'arenda-v-ispanii',         emoji: '🏠', tag: 'Быт',       title: 'Аренда квартиры в Испании: испанский для переговоров с арендодателем' },
      { slug: 'ispanski-u-vracha',        emoji: '🏥', tag: 'Срочное',   title: 'Испанский у врача: фразы для centro de salud и аптеки' },
      { slug: 'ispanski-v-banke',         emoji: '🏦', tag: 'Документы', title: 'Испанский в банке: открыть счёт, переводы, ипотека' },
      { slug: 'nie-dokumenty-ispaniya',   emoji: '📋', tag: 'Документы', title: 'NIE, TIE и empadronamiento: испанский для получения документов' },
      { slug: 'ispanski-na-rabote',       emoji: '💼', tag: 'Карьера',   title: 'Испанский на работе: деловые фразы для офиса и переговоров' },
      { slug: 'deti-shkola-ispaniya',     emoji: '👨‍👩‍👧', tag: 'Семья', title: 'Дети и школа в Испании: испанский для родителей' },
      { slug: 'ispanski-transport',       emoji: '🚇', tag: 'Транспорт', title: 'Транспорт в Испании: испанский для метро, автобуса и Renfe' },
      { slug: 'ispanski-sosedi-dom',      emoji: '🏘️', tag: 'Быт',       title: 'Испанский для соседей и дома: комьюнидад, аренда, ремонт' },
      { slug: 'ispanski-telefon-razgovor', emoji: '📱', tag: 'Общение',  title: 'Телефонный разговор на испанском: фразы для звонков' },
      { slug: 'ispanski-pokupki',         emoji: '🛍️', tag: 'Покупки',   title: 'Испанский в магазине: покупки, одежда, продукты' },
    ]
  },
  {
    section: '📖 Грамматика и словарь',
    color: 'green',
    items: [
      { slug: 'grammatika-ispanski',      emoji: '📖', tag: 'Грамматика', title: 'Грамматика испанского языка: базовые правила для начинающих' },
      { slug: 'glagoly-ispanski',         emoji: '⚡', tag: 'Словарь',    title: 'Глаголы испанского языка: 100 самых важных с транскрипцией' },
      { slug: 'chislitelnie-ispanski',    emoji: '🔢', tag: 'Словарь',    title: 'Числительные в испанском языке: от 1 до миллиона' },
      { slug: 'ispanski-predlogi',        emoji: '🔗', tag: 'Грамматика', title: 'Предлоги на испанском: en, de, a, para, por с примерами' },
      { slug: 'ispanski-voprosy',         emoji: '❓', tag: 'Грамматика', title: 'Вопросы на испанском: вопросительные слова и структуры' },
      { slug: 'vremena-goda-ispanski',    emoji: '🌦️', tag: 'Словарь',    title: 'Времена года и погода на испанском: слова и фразы' },
      { slug: 'telo-cheloveka-ispanski',  emoji: '🧍', tag: 'Словарь',    title: 'Части тела на испанском: словарь с транскрипцией' },
      { slug: 'ispanski-cveta',           emoji: '🎨', tag: 'Словарь',    title: 'Цвета на испанском языке: полный словарь с произношением' },
      { slug: 'ispanski-semya',           emoji: '👪', tag: 'Словарь',    title: 'Семья по-испански: члены семьи, слова и фразы' },
      { slug: 'ispanski-sport-fitnes',    emoji: '🏋️', tag: 'Словарь',    title: 'Испанский для спорта и фитнеса: слова для тренажёрного зала' },
    ]
  },
  {
    section: '🎭 Культура и жизнь',
    color: 'green',
    items: [
      { slug: 'ispanskaya-kuhnya',   emoji: '🍽️', tag: 'Кухня',       title: 'Испанская кухня: слова и фразы для ресторана и рынка' },
      { slug: 'prazdniki-ispanii',   emoji: '🎉', tag: 'Культура',    title: 'Праздники в Испании: даты, традиции и слова по-испански' },
      { slug: 'poslovitsy-ispanski', emoji: '📜', tag: 'Культура',    title: 'Пословицы и поговорки на испанском с переводом' },
      { slug: 'sleng-ispanski',      emoji: '😎', tag: 'Разговорный', title: 'Испанский сленг и разговорные выражения' },
    ]
  },
];

function showBlog() {
  showScreen('screen-blog');
  renderBlogList();
}

function renderBlogList() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  let html = '';
  BLOG_ARTICLES.forEach(section => {
    const isPurple = section.color === 'purple';
    html += `<div class="blog-section-label${isPurple ? ' blog-section-purple' : ''}">${section.section}</div>`;
    html += `<div class="blog-section-grid">`;
    section.items.forEach(article => {
      const safeTitle = article.title.replace(/"/g, '&quot;');
      html += `
        <button class="blog-card" data-slug="${article.slug}" data-title="${safeTitle}" onclick="openBlogArticle(this.dataset.slug, this.dataset.title)">
          <div class="blog-card-emoji${isPurple ? ' blog-card-emoji-purple' : ''}">${article.emoji}</div>
          <div class="blog-card-body">
            <div class="blog-card-tag${isPurple ? ' blog-card-tag-purple' : ''}">${article.tag}</div>
            <div class="blog-card-title">${article.title}</div>
          </div>
          <div class="blog-card-arrow${isPurple ? ' blog-card-arrow-purple' : ''}">→</div>
        </button>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

function openBlogArticle(slug, title) {
  const frame = document.getElementById('blog-article-frame');
  const titleEl = document.getElementById('blog-article-title');
  if (frame) frame.src = `https://izispanish.com/blog/${slug}.html?ref=cabinet`;
  if (titleEl) titleEl.textContent = title;
  showScreen('screen-blog-article');
}

// ============================================================
// SPEECH TRAINING
// ============================================================
const SPEECH_CATEGORIES = (() => {
  const cats = [];

  // Глаголы из VERBS
  cats.push({
    id: 'verbs',
    icon: '📚',
    name: 'Глаголы',
    getWords: () => VERBS.map(v => ({
      greek: v.infinitive,
      transcription: v.transcription,
      translation: v.translation
    }))
  });

  // Фразы из PHRASES
  if (typeof PHRASES !== 'undefined') {
    PHRASES.forEach(cat => {
      cats.push({
        id: 'phrase_' + cat.id,
        icon: cat.icon || '💬',
        name: 'Фразы: ' + cat.category,
        getWords: () => cat.phrases.map(p => ({
          greek: p.greek,
          transcription: p.transcription,
          translation: p.translation
        }))
      });
    });
  }

  // Словарь из VOCAB_CATEGORIES
  if (typeof VOCAB_CATEGORIES !== 'undefined') {
    VOCAB_CATEGORIES.forEach(cat => {
      cats.push({
        id: 'vocab_' + cat.id,
        icon: cat.icon || '🔤',
        name: cat.title,
        getWords: () => cat.words.map(w => ({
          greek: w.greek,
          transcription: w.transcription,
          translation: w.translation
        }))
      });
    });
  }

  return cats;
})();

let speechSession = {
  words: [],
  index: 0,
  total: 15,
  correctCount: 0,
  xpEarned: 0,
  recognition: null,
  uiState: 'idle', // idle | recording | correct | wrong
  micGranted: false // разрешение на микрофон получено один раз
};

function requestMicPermissionOnce() {
  if (speechSession.micGranted) return; // уже есть — не спрашиваем

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    // На мобиле проверяем через Permissions API без вызова getUserMedia
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' }).then(result => {
        if (result.state === 'granted') speechSession.micGranted = true;
      }).catch(() => {});
    }
    return;
  }

  // На десктопе — запрашиваем один раз при входе в раздел
  navigator.mediaDevices && navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      stream.getTracks().forEach(t => t.stop());
      speechSession.micGranted = true;
    })
    .catch(() => {}); // пользователь отказал — спросим при нажатии кнопки
}

function showSpeechTraining() {
  requestMicPermissionOnce();
  const list = document.getElementById('speech-categories-list');
  list.innerHTML = '';
  SPEECH_CATEGORIES.forEach(cat => {
    const count = cat.getWords().length;
    const btn = document.createElement('button');
    btn.className = 'speech-cat-btn';
    btn.innerHTML = `
      <div class="speech-cat-icon">${cat.icon}</div>
      <div class="speech-cat-info">
        <div class="speech-cat-name">${cat.name}</div>
        <div class="speech-cat-count">${count} слов / фраз</div>
      </div>
      <div class="speech-cat-arrow">›</div>`;
    btn.onclick = () => startSpeechSession(cat.id);
    list.appendChild(btn);
  });
  showScreen('screen-speech-categories');
}

function startSpeechSession(catId) {
  if (!trialGate()) return;
  const cat = SPEECH_CATEGORIES.find(c => c.id === catId);
  if (!cat) return;
  const all = cat.getWords().filter(w => w.greek && w.translation);
  const shuffled = all.sort(() => Math.random() - 0.5);
  speechSession.words = shuffled.slice(0, speechSession.total);
  speechSession.index = 0;
  speechSession.correctCount = 0;
  speechSession.xpEarned = 0;
  speechSession.uiState = 'idle';
  renderSpeechCard();
  showScreen('screen-speech');
}

function renderSpeechCard() {
  const w = speechSession.words[speechSession.index];
  document.getElementById('speech-greek').textContent = w.greek;
  document.getElementById('speech-transcription').textContent = w.transcription || '';
  document.getElementById('speech-translation').textContent = w.translation ? '"' + w.translation + '"' : '';
  document.getElementById('speech-counter').textContent =
    (speechSession.index + 1) + '/' + speechSession.total;
  const pct = (speechSession.index / speechSession.total) * 100;
  document.getElementById('speech-progress').style.width = pct + '%';
  document.getElementById('speech-recognized').textContent = '';
  setSpeechUIState('idle');
}

function setSpeechUIState(st) {
  speechSession.uiState = st;
  const btn    = document.getElementById('speech-mic-btn');
  const bubble = document.getElementById('speech-bubble');
  const badge  = document.getElementById('speech-bubble-badge');
  const word   = document.getElementById('speech-greek');
  const char   = document.getElementById('speech-character');

  btn.className = 'speech-mic-btn';

  if (st === 'idle') {
    btn.classList.add('speech-mic-idle');
    btn.innerHTML = '<span style="font-size:28px">🎤</span>';
    bubble.textContent = 'Скажите это слово:';
    badge.style.display = 'none';
    word.className = 'speech-greek-word';
    char.className = 'speech-character';
  } else if (st === 'recording') {
    btn.classList.add('speech-mic-recording');
    btn.innerHTML = '<div class="speech-waves"><span></span><span></span><span></span><span></span><span></span></div>';
    bubble.textContent = 'Слушаю...';
    badge.style.display = 'none';
    word.className = 'speech-greek-word';
  } else if (st === 'correct') {
    btn.classList.add('speech-mic-correct');
    btn.innerHTML = '<span style="font-size:32px">✓</span>';
    bubble.textContent = 'Отлично! Продолжаем!';
    badge.style.display = 'none';
    word.className = 'speech-greek-word speech-correct';
    char.className = 'speech-character speech-character-happy';
  } else if (st === 'wrong') {
    btn.classList.add('speech-mic-idle');
    btn.innerHTML = '<span style="font-size:28px">🎤</span>';
    bubble.textContent = 'Скажите это слово:';
    badge.style.display = 'flex';
    word.className = 'speech-greek-word speech-wrong';
    char.className = 'speech-character speech-character-thinking';
  }
}

function onSpeechMicClick() {
  if (speechSession.uiState === 'recording') return;

  if (speechSession.uiState === 'correct') {
    speechSession.index++;
    if (speechSession.index >= speechSession.total) {
      finishSpeechSession();
    } else {
      renderSpeechCard();
    }
    return;
  }

  startSpeechRecognition();
}

// Нативное распознавание (в приложении) — вместо Web Speech API, которого нет в WKWebView.
function runNativeSpeech() {
  const ns = window.__iziNativeSpeech;
  const recognize = () => {
    setSpeechUIState('recording');
    ns.recognize('es-ES').then(alts => {
      const target = speechSession.words[speechSession.index].greek;
      const el = document.getElementById('speech-recognized');
      if (el) el.textContent = (alts && alts[0]) || '';
      const ok = (alts || []).some(t => normalizeGreekSpeech(t) === normalizeGreekSpeech(target));
      if (ok) {
        speechSession.correctCount++;
        speechSession.xpEarned += 5;
        setSpeechUIState('correct');
      } else {
        setSpeechUIState('wrong');
      }
    }).catch(() => {
      setSpeechUIState('idle');
      const el = document.getElementById('speech-recognized');
      if (el) el.textContent = '🎙️ Не удалось распознать. Попробуй ещё раз.';
    });
  };
  if (speechSession.micGranted) { recognize(); return; }
  ns.requestPermission().then(granted => {
    if (granted) { speechSession.micGranted = true; recognize(); }
    else {
      setSpeechUIState('idle');
      const el = document.getElementById('speech-recognized');
      if (el) el.textContent = '🎙️ Разреши доступ к микрофону и распознаванию речи в Настройках.';
    }
  });
}

function startSpeechRecognition() {
  // В приложении идём нативным путём (SFSpeechRecognizer) — Web Speech API в WKWebView нет.
  if (window.__iziNativeSpeech) { runNativeSpeech(); return; }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('Ваш браузер не поддерживает распознавание речи. Используйте Chrome или Safari.');
    return;
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (speechSession.micGranted || isMobile) {
    // Разрешение уже есть (или мобиль) — запускаем сразу
    runSpeechRecognition(SR);
  } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Первый раз на десктопе — запрашиваем разрешение
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        stream.getTracks().forEach(t => t.stop());
        speechSession.micGranted = true;
        runSpeechRecognition(SR);
      })
      .catch(err => {
        setSpeechUIState('idle');
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          alert('Нужен доступ к микрофону. Разреши его в настройках браузера и попробуй снова.');
        }
      });
  } else {
    runSpeechRecognition(SR);
  }
}

function runSpeechRecognition(SR) {
  setSpeechUIState('recording');
  const r = new SR();
  r.lang = 'es-ES';
  r.continuous = false;
  r.interimResults = false;
  r.maxAlternatives = 6;
  speechSession.recognition = r;

  // Таймаут — если за 9 секунд ничего не распознано, останавливаем
  const timeout = setTimeout(() => {
    if (speechSession.uiState === 'recording') {
      try { r.stop(); } catch(e) {}
    }
  }, 9000);

  r.onspeechend = () => {
    // Речь закончилась — принудительно останавливаем, чтобы получить результат
    try { r.stop(); } catch(e) {}
  };

  r.onresult = (event) => {
    clearTimeout(timeout);
    const target = speechSession.words[speechSession.index].greek;
    const alts = Array.from(event.results[0]).map(a => a.transcript);
    document.getElementById('speech-recognized').textContent = alts[0] || '';
    const ok = alts.some(t => normalizeGreekSpeech(t) === normalizeGreekSpeech(target));
    if (ok) {
      speechSession.correctCount++;
      speechSession.xpEarned += 5;
      setSpeechUIState('correct');
    } else {
      setSpeechUIState('wrong');
    }
  };

  r.onerror = (e) => {
    clearTimeout(timeout);
    if (e.error === 'not-allowed') {
      alert('Нужен доступ к микрофону. Разреши его в настройках браузера и попробуй снова.');
    }
    if (e.error !== 'aborted') setSpeechUIState('idle');
  };

  r.onend = () => {
    clearTimeout(timeout);
    if (speechSession.uiState === 'recording') setSpeechUIState('idle');
    speechSession.recognition = null;
  };

  r.start();
}

function normalizeGreekSpeech(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f\u0345]/g, '')
    .replace(/[^a-z]/gi, '')
    .trim();
}

function finishSpeechSession() {
  // Award XP
  const xp = speechSession.xpEarned + 10; // +10 bonus for finishing
  state.totalXp += xp;
  state.dailyXp = (state.dailyXp || 0) + xp;
  state.level = Math.floor(state.totalXp / 500) + 1;
  state.lessonsCompleted = (state.lessonsCompleted || 0) + 1;
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();
  checkAchievements({});

  document.getElementById('speech-complete-correct').textContent = speechSession.correctCount;
  document.getElementById('speech-complete-xp').textContent = '+' + xp;
  document.getElementById('speech-complete-total').textContent = speechSession.total;
  showScreen('screen-speech-complete');
}

function exitSpeechTraining() {
  if (speechSession.recognition) {
    try { speechSession.recognition.abort(); } catch(e) {}
    speechSession.recognition = null;
  }
  showSpeechTraining();
}

// ============================================================
// TEACH PHASE — карточки перед уроком
// ============================================================
function startTeachPhase(mod) {
  teachState = { module: mod, cards: mod.verbs, currentCard: 0 };
  renderTeachCard();
  showScreen('screen-teach');
}

function renderTeachCard() {
  const { cards, currentCard, module } = teachState;
  const total = cards.length;
  const pct = (currentCard / total) * 100;
  document.getElementById('teach-progress').style.width = pct + '%';
  document.getElementById('teach-counter').textContent = `${Math.min(currentCard + 1, total)}/${total}`;

  if (currentCard >= total) {
    document.getElementById('teach-label').textContent = 'Готово — ты изучил все слова!';
    document.getElementById('teach-card-area').innerHTML = `
      <div class="teach-summary-card">
        <div class="teach-summary-icon">🎯</div>
        <div class="teach-summary-title">Урок ${module.id} · Слова изучены</div>
        <div class="teach-summary-words">${cards.map(v =>
          `<span class="teach-summary-word">${v.infinitive} — ${v.translation}</span>`
        ).join('')}</div>
        <div class="teach-summary-hint">Теперь проверим, как ты запомнил</div>
      </div>`;
    const btn = document.getElementById('teach-next-btn');
    btn.textContent = 'Начать упражнения ▶';
    btn.onclick = finishTeachPhase;
    return;
  }

  const verb = cards[currentCard];
  document.getElementById('teach-label').textContent = `Урок ${module.id} · Слово ${currentCard + 1} из ${total}`;
  document.getElementById('teach-card-area').innerHTML = `
    <div class="teach-greek-row">
      <div class="teach-greek-word">${verb.infinitive}</div>
      <button class="teach-speak-btn" onclick="speakGreek('${verb.infinitive.replace(/'/g, "\\'")}')">🔊</button>
    </div>
    ${verb.transcription ? `<div class="teach-transcription">${verb.transcription}</div>` : ''}
    <div class="teach-translation">${verb.translation}</div>
    ${verb.note ? `<div class="teach-note">${verb.note}</div>` : ''}
    ${verb.example ? `
    <div class="teach-example-box">
      <div class="teach-example-label">Пример:</div>
      <button class="teach-example-speak" onclick="speakGreek('${verb.example.greek.replace(/'/g, "\\'")}')">🔊</button>
      <div class="teach-example-greek">${verb.example.greek}</div>
      <div class="teach-example-ru">${verb.example.ru}</div>
    </div>` : ''}
    <details class="teach-conj-details">
      <summary class="teach-conj-summary">Спряжение ▾</summary>
      ${[
        { label: 'Настоящее', forms: verb.present },
        { label: 'Прошедшее (indefinido)', forms: verb.preterite },
        { label: 'Будущее (futuro)', forms: verb.future },
      ].filter(t => t.forms).map(t => `
        <div class="teach-conj-tense">${t.label}</div>
        <div class="teach-conj-grid">
          ${Object.entries(t.forms).map(([pr, form]) =>
            `<span class="teach-conj-pr">${pr}</span><span class="teach-conj-form" onclick="speakGreek('${form}')">${form}</span>`
          ).join('')}
        </div>
      `).join('')}
    </details>`;

  const btn = document.getElementById('teach-next-btn');
  btn.textContent = currentCard < total - 1 ? 'Следующее слово →' : 'Последнее! →';
  btn.onclick = nextTeachCard;
}

function nextTeachCard() {
  teachState.currentCard++;
  renderTeachCard();
}

function finishTeachPhase() {
  const mod = teachState.module;
  lessonState = {
    exercises: generateLesson(mod.verbs),
    currentIndex: 0, hearts: 3, xpEarned: 0, correct: 0,
    answered: false, isWeakMode: false, isSrsMode: false
  };
  showScreen('screen-lesson');
  renderExercise();
}

// ============================================================
// EXAM PREP — подготовка к экзамену
// ============================================================
function showExamPrep() {
  showScreen('screen-exam');
}

function showExamSection(section) {
  if (section === 'tests')     { startExamMockTest(); return; }
  if (section === 'listening') { startExamListening(); return; }
  const map = {
    structure: ['🗺️ Как устроен экзамен', getExamStructureHTML],
    writing:   ['✍️ Письмо',              getExamWritingHTML],
    speaking:  ['🗣️ Говорение',           getExamSpeakingHTML],
    grammar:   ['📚 Грамматика A2/B1',    getExamGrammarHTML],
    tips:      ['💡 Лайфхаки',            getExamTipsHTML],
    vocab:      ['📖 Экзаменационный словарь', getExamVocabHTML],
    listening:  ['🎧 Аудирование',            null],
  };
  const [title, fn] = map[section] || map.tips;
  document.getElementById('exam-detail-title').textContent = title;
  document.getElementById('exam-detail-body').innerHTML = fn();
  showScreen('screen-exam-detail');
}

function getExamStructureHTML() {
  return `
<div class="exam-info-banner">
  <div class="exam-info-row"><span>📍 Организатор</span><strong>Кипрский университет (UCY) + Минобр</strong></div>
  <div class="exam-info-row"><span>💶 Стоимость</span><strong>€90</strong></div>
  <div class="exam-info-row"><span>📅 Сессии</span><strong>Январь · Май · Сентябрь</strong></div>
  <div class="exam-info-row"><span>🎯 Для гражданства</span><strong>A2 (5 лет) · B1 (4 года)</strong></div>
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">1</span>
    <div><div class="exam-part-title">🎧 Аудирование</div><div class="exam-part-time">~20 минут · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc">3–4 коротких диалога — слушаешь и отвечаешь на вопросы.</div>
  <div class="exam-part-label">Типы заданий:</div>
  <ul class="exam-part-list">
    <li>Верно / Неверно / Не упоминается</li>
    <li>Выбор из 3 вариантов (A/B/C)</li>
    <li>Записать ключевое слово или цифру</li>
  </ul>
  <div class="exam-part-example">
    <b>Примеры ситуаций:</b> таксист и пассажир · звонок в ресторан · диалог в магазине · объявление по радио
  </div>
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">2</span>
    <div><div class="exam-part-title">📖 Чтение</div><div class="exam-part-time">~30 минут · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc">2–3 текста (объявления, письма, статьи) — читаешь и отвечаешь.</div>
  <div class="exam-part-label">Типы заданий:</div>
  <ul class="exam-part-list">
    <li>Верно / Неверно по тексту</li>
    <li>Вставить слово из списка в пропуск</li>
    <li>Соединить части предложений</li>
    <li>Ответить на вопросы по тексту</li>
  </ul>
  <div class="exam-part-example">
    <b>Примеры тем:</b> объявление о мероприятии · письмо от друга · расписание · меню · реклама
  </div>
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">3</span>
    <div><div class="exam-part-title">✍️ Письмо</div><div class="exam-part-time">~45 минут · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc"><strong>2 текста по 80–100 слов каждый.</strong> Артикли и предлоги считаются как слова.</div>
  <div class="exam-part-label">Задание 1 — Письмо другу (неформальное):</div>
  <ul class="exam-part-list">
    <li>Рассказать о событии, поездке, покупке</li>
    <li>Описать свой день / выходные / праздник</li>
    <li>Пригласить на встречу</li>
  </ul>
  <div class="exam-part-label" style="margin-top:8px">Задание 2 — Официальный текст:</div>
  <ul class="exam-part-list">
    <li>Заявление (в школу, муниципалитет)</li>
    <li>Запрос информации (о курсах, событии)</li>
    <li>Объявление (продаю / ищу / предлагаю)</li>
  </ul>
  <div class="exam-part-example">💡 Структура важнее словарного запаса. Выучи шаблоны — и этот блок станет самым лёгким.</div>
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">4</span>
    <div><div class="exam-part-title">🗣️ Говорение</div><div class="exam-part-time">~15 минут · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc">Разговор с экзаменатором и с другим участником. 3 этапа:</div>
  <ul class="exam-part-list">
    <li><strong>Представление себя</strong> — кто ты, семья, работа, Кипр</li>
    <li><strong>Описание картинки</strong> — что видишь, что происходит</li>
    <li><strong>Диалог с партнёром</strong> — вместе решаете ситуацию</li>
  </ul>
  <div class="exam-part-example">💡 Говори медленно. Простое правильное предложение лучше сложного с ошибками. Не знаешь слово — опиши его другими словами.</div>
</div>

<div class="exam-scoring-block">
  <div class="exam-scoring-title">⚖️ Проходной балл</div>
  <div class="exam-scoring-row"><span>Каждая часть</span><span>макс. 25 баллов</span></div>
  <div class="exam-scoring-row"><span>Итого максимум</span><span>100 баллов</span></div>
  <div class="exam-scoring-row exam-scoring-pass"><span>Минимум для сдачи</span><span>60 баллов</span></div>
  <div class="exam-scoring-note">Можно слабо написать одну часть и компенсировать другими.</div>
</div>`;
}

function sp(text) {
  return `onclick="speakGreek('${text.replace(/'/g,"\\'")}')"`;
}

function getExamSpeakingHTML() {
  return `
<div class="speaking-intro">
  Говорение — <strong>3 этапа</strong>, ~15 минут. Оценивают правильность, словарный запас и уверенность. Говори медленно — это плюс, не минус.
</div>

<div class="speaking-stage-header">Этап 1 · Представление себя</div>
<div class="speaking-stage-hint">Собеседник задаёт вопросы о тебе. Знай ответы наизусть.</div>

${[
  ['¿Cómo se llama usted?','Как вас зовут?','Me llamo Olga Ivánova.','Меня зовут Ольга Иванова.'],
  ['¿De dónde es usted?','Откуда вы?','Soy de Rusia, de Moscú.','Я из России, из Москвы.'],
  ['¿Cuánto tiempo hace que vive en España?','Сколько времени вы живёте в Испании?','Vivo en España desde hace cuatro años.','Я живу в Испании уже четыре года.'],
  ['¿En qué trabaja usted?','Кем вы работаете?','Soy contable y trabajo en una empresa.','Я бухгалтер и работаю в компании.'],
  ['¿Tiene usted familia?','У вас есть семья?','Sí, estoy casada y tengo dos hijos.','Да, я замужем и у меня двое детей.'],
  ['¿Por qué aprende español?','Почему вы учите испанский?','Aprendo español para poder comunicarme con mis vecinos y viajar por los países hispanohablantes.','Учу испанский, чтобы общаться с соседями и путешествовать по испаноязычным странам.'],
].map(([q,qru,a,aru]) => `
  <div class="speaking-qa-card">
    <div class="speaking-q-row">
      <div class="speaking-q">${q}</div>
      <button class="speaking-tts-btn" ${sp(q)}>🔊</button>
    </div>
    <div class="speaking-qru">${qru}</div>
    <div class="speaking-a-row">
      <div class="speaking-a">${a}</div>
      <button class="speaking-tts-btn" ${sp(a)}>🔊</button>
    </div>
    <div class="speaking-aru">${aru}</div>
  </div>`).join('')}

<div class="speaking-stage-header">Этап 2 · Описание картинки</div>
<div class="speaking-stage-hint">Дают фото — нужно описать что видишь. Используй эти фразы:</div>

<div class="speaking-phrases-card">
${[
  ['En la foto veo...','На фотографии я вижу...'],
  ['En el centro de la imagen hay...','В центре картинки есть...'],
  ['Al fondo veo...','На заднем плане я вижу...'],
  ['Creo que es...','Думаю, что это...'],
  ['Parece que las personas...','Похоже, что люди...'],
  ['El tiempo parece...','Погода, кажется,...'],
  ['Me gusta esta foto porque...','Мне нравится эта фотография, потому что...'],
].map(([gr,ru]) => `
  <div class="speaking-phrase-row">
    <div class="speaking-phrase-left">
      <div class="speaking-phrase-gr">${gr}</div>
      <div class="speaking-phrase-ru">${ru}</div>
    </div>
    <button class="speaking-tts-btn" ${sp(gr)}>🔊</button>
  </div>`).join('')}
</div>

<div class="speaking-stage-header">Этап 3 · Диалог с партнёром</div>
<div class="speaking-stage-hint">Вместе с другим участником решаете ситуацию. Типичные темы:</div>

${[
  ['🍽️ Выбрать ресторан',['¿Adónde vamos a comer?','¿Qué prefieres, pescado o carne?','¿Cuánto cuesta más o menos?','¿A qué hora quedamos?']],
  ['✈️ Спланировать поездку',['¿Adónde quieres ir?','¿Cuándo estás libre?','¿Cuántos días nos quedamos?','¿Cómo vamos, en avión o en barco?']],
  ['🎉 Организовать праздник',['¿Cuándo hacemos la fiesta?','¿A quién invitamos?','¿Qué comida vamos a traer?','¿Quién trae la música?']],
  ['🛒 Купить подержанную вещь',['¿En qué estado está?','¿Cuánto tiempo lo tiene?','¿Puede bajar un poco el precio?','¿Cuándo podemos recogerlo?']],
].map(([title, phrases]) => `
  <details class="speaking-topic-card">
    <summary>${title}</summary>
    <div class="speaking-topic-phrases">
      ${phrases.map(p => `
        <div class="speaking-topic-phrase-row">
          <span>${p}</span>
          <button class="speaking-tts-btn" ${sp(p)}>🔊</button>
        </div>`).join('')}
    </div>
  </details>`).join('')}

<div class="speaking-tip-block">
  💡 <strong>Если не знаешь слово</strong> — скажи <em onclick="${sp('¿Cómo se dice en español?')}" style="cursor:pointer;color:#9B59B6">«¿Cómo se dice en español?»</em> (Как это по-испански?) или опиши его другими словами. Собеседник это ценит.
</div>`;
}

function getExamWritingHTML() {
  return `
<div class="writing-intro">
  На экзамене нужно написать <strong>2 текста по 80–100 слов</strong> за 45 минут.<br>
  Выучи эти шаблоны — и письмо станет самой лёгкой частью.
</div>

<!-- ===== ПИСЬМО ДРУГУ ===== -->
<div class="writing-type-header">📩 Тип 1 — Письмо другу (неформальное)</div>

<div class="writing-template-card">
  <div class="writing-template-title">Универсальный шаблон</div>
  <div class="writing-block writing-block-open">
    <div class="writing-block-label">Обращение</div>
    <div class="writing-greek">Querida María, / ¡Hola Pablo!</div>
    <div class="writing-ru">Дорогая Мария, / Привет Пабло!</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Начало — как дела</div>
    <div class="writing-greek">¿Cómo estás? Espero que estés bien.</div>
    <div class="writing-ru">Как ты? Надеюсь, у тебя всё хорошо.</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Основная часть (меняется по теме)</div>
    <div class="writing-greek">Te escribo porque quiero contarte sobre...</div>
    <div class="writing-ru">Пишу тебе, потому что хочу рассказать о...</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Вопрос в конце</div>
    <div class="writing-greek">¿Y tú qué tal? ¿Cómo lo estás pasando?</div>
    <div class="writing-ru">А ты как? Как проводишь время?</div>
  </div>
  <div class="writing-block writing-block-close">
    <div class="writing-block-label">Закрытие</div>
    <div class="writing-greek">¡Nos vemos pronto! Un abrazo muy fuerte,<br><em>Olga</em></div>
    <div class="writing-ru">Увидимся скоро! Крепко обнимаю, Ольга</div>
  </div>
</div>

<div class="writing-topics-label">📋 Темы которые дают на экзамене + что писать:</div>

<details class="writing-topic">
  <summary>🛍️ Поход в торговый центр</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">El domingo fui al centro comercial con mi familia. Compré un par de zapatos y un vestido. La ropa estaba muy barata porque había rebajas. Después comimos en un restaurante en la tercera planta. ¡Estaba buenísimo!</div>
    <div class="writing-ru">В воскресенье я ходила в торговый центр с семьёй. Купила пару туфель и платье. Одежда была очень дешёвой, потому что были распродажи. Потом мы поели в ресторане на третьем этаже. Было очень вкусно!</div>
  </div>
</details>

<details class="writing-topic">
  <summary>🎂 День рождения / праздник</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Ayer fue mi cumpleaños e hice una pequeña fiesta en casa. Vinieron mis amigos y mi familia. Comimos, bailamos y nos reímos mucho. ¡Recibí muchos regalos! Fue una noche maravillosa que nunca olvidaré.</div>
    <div class="writing-ru">Вчера был мой день рождения, и я устроила небольшую вечеринку дома. Пришли мои друзья и моя семья. Мы ели, танцевали и много смеялись. Я получила много подарков! Это был чудесный вечер, который я никогда не забуду.</div>
  </div>
</details>

<details class="writing-topic">
  <summary>🏖️ Поездка / отпуск</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">En agosto fui de vacaciones a España con mi marido. Nos alojamos en un hotel cerca del mar. Cada día nadábamos y visitábamos monumentos antiguos. El tiempo fue estupendo. ¡Quiero volver el año que viene!</div>
    <div class="writing-ru">В августе я ездила в отпуск в Испанию с мужем. Мы жили в отеле рядом с морем. Каждый день мы купались и посещали древние памятники. Погода была прекрасной. Хочу поехать снова в следующем году!</div>
  </div>
</details>

<details class="writing-topic">
  <summary>📅 Приглашение на встречу</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Quiero invitarte a mi casa el sábado a las 7 de la tarde. Vamos a hacer una pequeña cena con amigos. ¡Habrá comida, música y mucha diversión! ¿Puedes venir? Contéstame pronto.</div>
    <div class="writing-ru">Хочу пригласить тебя ко мне в субботу в 7 вечера. Мы устроим небольшой ужин с друзьями. Будет еда, музыка и много веселья! Сможешь прийти? Ответь мне скорее.</div>
  </div>
</details>

<!-- ===== ОФИЦИАЛЬНОЕ ПИСЬМО ===== -->
<div class="writing-type-header" style="margin-top:8px">🏛️ Тип 2 — Официальное письмо / заявление</div>

<div class="writing-template-card">
  <div class="writing-template-title">Универсальный шаблон</div>
  <div class="writing-block writing-block-open">
    <div class="writing-block-label">Кому (адресат)</div>
    <div class="writing-greek">A la Dirección / Estimado Director,</div>
    <div class="writing-ru">В адрес Дирекции / Уважаемый директор,</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Тема</div>
    <div class="writing-greek">Asunto: Solicitud de información / inscripción</div>
    <div class="writing-ru">Тема: Запрос информации / заявление о записи</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Представление себя</div>
    <div class="writing-greek">Me llamo [nombre] y vivo en Valencia desde hace tres años.</div>
    <div class="writing-ru">Меня зовут [имя], и я живу в Валенсии уже три года.</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Цель письма</div>
    <div class="writing-greek">Le escribo porque me gustaría saber / inscribirme / solicitar...</div>
    <div class="writing-ru">Пишу вам, потому что хотел(а) бы узнать / записаться / попросить...</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Вопрос / просьба</div>
    <div class="writing-greek">Me gustaría saber: ¿Cuál es el horario? ¿Cuánto cuesta? ¿Cuándo empieza?</div>
    <div class="writing-ru">Хотел(а) бы узнать: Какое расписание? Сколько стоит? Когда начинается?</div>
  </div>
  <div class="writing-block writing-block-close">
    <div class="writing-block-label">Закрытие</div>
    <div class="writing-greek">Le agradezco de antemano.<br>Atentamente,<br><em>[Nombre Apellido]</em></div>
    <div class="writing-ru">Заранее благодарю вас.<br>С уважением,<br><em>[Имя Фамилия]</em></div>
  </div>
</div>

<details class="writing-topic">
  <summary>📚 Запрос о курсах испанского</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Le escribo porque estoy interesado/a en asistir a clases de español en su centro. Me gustaría saber: cuándo empiezan las clases, cuántas veces por semana se imparten, cuánto cuesta la inscripción y si hay clases para el nivel A2.</div>
    <div class="writing-ru">Пишу вам, потому что заинтересован(а) в посещении курсов испанского языка в вашем центре. Хотел(а) бы узнать: когда начинаются занятия, сколько раз в неделю они проходят, сколько стоит запись и есть ли занятия для уровня A2.</div>
  </div>
</details>

<details class="writing-topic">
  <summary>📢 Объявление (продаю / ищу)</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Se vende sofá en buen estado. Color: gris. Medidas: 2 metros. Precio: 150 euros, negociable. Motivo de la venta: mudanza. Para más información llamar al 600-123-456. Posibilidad de entrega.</div>
    <div class="writing-ru">Продаётся диван в хорошем состоянии. Цвет: серый. Размер: 2 метра. Цена: 150 евро, торг уместен. Причина продажи: переезд. Для информации звоните: 600-123-456. Возможна доставка.</div>
  </div>
</details>

<div class="writing-phrases-block">
  <div class="writing-phrases-title">🔑 Ключевые фразы — выучи наизусть</div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Te escribo porque...</span><span class="writing-phrase-ru">Пишу тебе, потому что...</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Quiero decirte que...</span><span class="writing-phrase-ru">Хочу сказать тебе, что...</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">¡Fue estupendo!</span><span class="writing-phrase-ru">Было очень здорово!</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Me alegré mucho de que...</span><span class="writing-phrase-ru">Я очень обрадовалась, что...</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">¡Tengo muchas ganas de verte!</span><span class="writing-phrase-ru">Не могу дождаться встречи с тобой!</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Gracias por tu carta.</span><span class="writing-phrase-ru">Спасибо за твоё письмо.</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Me gustaría saber...</span><span class="writing-phrase-ru">Хотел(а) бы узнать...</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Le agradezco de antemano.</span><span class="writing-phrase-ru">Заранее благодарю вас.</span></div>
</div>`;
}

function getExamGrammarHTML() {
  return `
<div class="gram-nav">Нажми на тему:</div>
<div class="gram-toc">
  <button class="gram-toc-btn" onclick="document.getElementById('gr1').scrollIntoView({behavior:'smooth'})">Настоящее</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr2').scrollIntoView({behavior:'smooth'})">Прошедшее</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr3').scrollIntoView({behavior:'smooth'})">Будущее</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr4').scrollIntoView({behavior:'smooth'})">Артикли</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr5').scrollIntoView({behavior:'smooth'})">Предлоги</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr6').scrollIntoView({behavior:'smooth'})">Конструкции</button>
</div>

<div id="gr1" class="gram-block">
  <div class="gram-title">🔵 Настоящее время</div>
  <div class="gram-subtitle">Спряжение -AR: hablar, trabajar, llegar, necesitar, comprar, escuchar</div>
  <table class="gram-table">
    <tr><td>yo</td><td>habl<b>o</b></td><td>trabaj<b>o</b></td></tr>
    <tr><td>tú</td><td>habl<b>as</b></td><td>trabaj<b>as</b></td></tr>
    <tr><td>él/ella</td><td>habl<b>a</b></td><td>trabaj<b>a</b></td></tr>
    <tr><td>nosotros</td><td>habl<b>amos</b></td><td>trabaj<b>amos</b></td></tr>
    <tr><td>vosotros</td><td>habl<b>áis</b></td><td>trabaj<b>áis</b></td></tr>
    <tr><td>ellos</td><td>habl<b>an</b></td><td>trabaj<b>an</b></td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Спряжение -ER: comer, aprender, leer, beber</div>
  <table class="gram-table">
    <tr><td>yo</td><td>com<b>o</b></td><td>tú</td><td>com<b>es</b></td></tr>
    <tr><td>él/ella</td><td>com<b>e</b></td><td>nosotros</td><td>com<b>emos</b></td></tr>
    <tr><td>vosotros</td><td>com<b>éis</b></td><td>ellos</td><td>com<b>en</b></td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Неправильные — учи отдельно</div>
  <table class="gram-table">
    <tr><td>ser</td><td>soy / eres / es / somos / sois / son</td></tr>
    <tr><td>tener</td><td>tengo / tienes / tiene / tenemos / tenéis / tienen</td></tr>
  </table>
</div>

<div id="gr2" class="gram-block">
  <div class="gram-title">🟠 Прошедшее время (pretérito indefinido)</div>
  <div class="gram-tip">💡 Самое важное для письма и говорения — рассказываешь о том, что уже произошло.</div>
  <div class="gram-subtitle" style="margin-top:8px">Правило для -AR глаголов: убери -ar, добавь -é/-aste/-ó/-amos/-asteis/-aron</div>
  <table class="gram-table">
    <tr><th>Сейчас</th><th>В прошлом</th><th>Перевод</th></tr>
    <tr><td>hablar</td><td>habl<b>é</b></td><td>я поговорил(а)</td></tr>
    <tr><td>comprar</td><td>compr<b>é</b></td><td>я купил(а)</td></tr>
    <tr><td>trabajar</td><td>trabaj<b>é</b></td><td>я поработал(а)</td></tr>
    <tr><td>llegar</td><td>lleg<b>ué</b></td><td>я прибыл(а)</td></tr>
    <tr><td>hacer</td><td>hice</td><td>я сделал(а)</td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Неправильные прошедшие — выучи наизусть</div>
  <table class="gram-table">
    <tr><th>Глагол</th><th>yo</th><th>él/ella</th></tr>
    <tr><td>ir (идти)</td><td><b>fui</b></td><td>fue</td></tr>
    <tr><td>tener (иметь)</td><td><b>tuve</b></td><td>tuvo</td></tr>
    <tr><td>estar (быть/находиться)</td><td><b>estuve</b></td><td>estuvo</td></tr>
    <tr><td>decir (говорить)</td><td><b>dije</b></td><td>dijo</td></tr>
    <tr><td>ver (видеть)</td><td><b>vi</b></td><td>vio</td></tr>
    <tr><td>venir (приходить)</td><td><b>vine</b></td><td>vino</td></tr>
    <tr><td>hacer (делать)</td><td><b>hice</b></td><td>hizo</td></tr>
  </table>
  <div class="gram-example-sent">
    <div>Ayer <b>fui</b> al supermercado. — Вчера я ходил(а) в супермаркет.</div>
    <div>El fin de semana <b>vi</b> a mis amigos. — На выходных я видел(а) друзей.</div>
    <div>¡La noche <b>fue</b> muy bonita! — Вечер был очень приятный!</div>
  </div>
</div>

<div id="gr3" class="gram-block">
  <div class="gram-title">🟢 Будущее время</div>
  <div class="gram-rule"><b>ir a</b> + infinitivo (глагол ir в настоящем + a + инфинитив)</div>
  <table class="gram-table">
    <tr><th>Настоящее</th><th>Будущее</th><th>Перевод</th></tr>
    <tr><td>ir</td><td><b>voy a ir</b></td><td>я пойду / поеду</td></tr>
    <tr><td>hacer</td><td><b>voy a hacer</b></td><td>я сделаю</td></tr>
    <tr><td>comprar</td><td><b>voy a comprar</b></td><td>я куплю</td></tr>
    <tr><td>hablar</td><td><b>voy a hablar</b></td><td>я поговорю</td></tr>
    <tr><td>venir</td><td><b>voy a venir</b></td><td>я приду</td></tr>
  </table>
  <div class="gram-example-sent">
    <div>Mañana <b>voy a ir</b> al trabajo. — Завтра я пойду на работу.</div>
    <div>En verano <b>vamos a viajar</b> a España. — Летом мы поедем в Испанию.</div>
  </div>
  <div class="gram-tip">💡 no + ir a: No voy a ir — я не пойду</div>
</div>

<div id="gr4" class="gram-block">
  <div class="gram-title">🔷 Артикли (род и число)</div>
  <div class="gram-subtitle">Единственное число</div>
  <table class="gram-table">
    <tr><th></th><th>м.р.</th><th>ж.р.</th></tr>
    <tr><td>определённый</td><td><b>el</b> amigo</td><td><b>la</b> amiga</td></tr>
    <tr><td>неопределённый</td><td><b>un</b> amigo</td><td><b>una</b> amiga</td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Множественное число</div>
  <table class="gram-table">
    <tr><th></th><th>м.р.</th><th>ж.р.</th></tr>
    <tr><td>определённый</td><td><b>los</b> amigos</td><td><b>las</b> amigas</td></tr>
    <tr><td>неопределённый</td><td><b>unos</b> amigos</td><td><b>unas</b> amigas</td></tr>
  </table>
  <div class="gram-example-sent">
    <div>Mi amigo vive en Valencia. — Мой друг живёт в Валенсии.</div>
    <div>Veo <b>a</b> mi amigo cada día. — Я вижу своего друга каждый день.</div>
  </div>
  <div class="gram-tip">💡 Перед человеком в роли дополнения ставится предлог <b>a</b> — «личное a»: Veo a mi amigo (не Veo mi amigo).</div>
</div>

<div id="gr5" class="gram-block">
  <div class="gram-title">🟡 Предлоги (+ слияние с артиклем)</div>
  <div class="gram-subtitle">a + el → al, de + el → del</div>
  <table class="gram-table">
    <tr><th>Предлог</th><th>Значение</th><th>Пример</th></tr>
    <tr><td><b>a / al</b></td><td>направление (куда)</td><td>voy al cine — иду в кино</td></tr>
    <tr><td><b>en</b></td><td>место (где)</td><td>vivo en Madrid — я живу в Мадриде</td></tr>
    <tr><td><b>de / del</b></td><td>из, от</td><td>vengo del trabajo — я иду с работы</td></tr>
    <tr><td><b>con</b></td><td>с (вместе)</td><td>con mi marido — с мужем</td></tr>
    <tr><td><b>para</b></td><td>для</td><td>para la familia — для семьи</td></tr>
    <tr><td><b>después de / antes de</b></td><td>после / до</td><td>después de comer — после еды</td></tr>
  </table>
</div>

<div id="gr6" class="gram-block">
  <div class="gram-title">🟣 Ключевые конструкции A2</div>
  <table class="gram-table">
    <tr><th>Конструкция</th><th>Пример</th><th>Перевод</th></tr>
    <tr><td><b>quiero</b> + инф.</td><td>Quiero ir a casa.</td><td>Хочу пойти домой.</td></tr>
    <tr><td><b>puedo</b> + инф.</td><td>¿Puedo ayudarte?</td><td>Могу тебе помочь?</td></tr>
    <tr><td><b>tengo que</b> + инф.</td><td>Tengo que estudiar.</td><td>Нужно учиться.</td></tr>
    <tr><td><b>no</b> + гл.</td><td>No entiendo.</td><td>Я не понимаю.</td></tr>
    <tr><td><b>porque</b></td><td>Fui porque quería...</td><td>Пошёл(а), потому что...</td></tr>
    <tr><td><b>cuando</b></td><td>Cuando era pequeña...</td><td>Когда я была маленькой...</td></tr>
  </table>
  <div class="gram-tip">💡 puedo + quiero + tengo que — три конструкции, которые покрывают 70% разговорных ситуаций.</div>
</div>`;
}

function getExamTipsHTML() {
  return `
<div class="tips-intro">Практические советы для эффективной практики речи, письма и аудирования на испанском.</div>
<div class="tip-item">
  <div class="tip-num">1</div>
  <div class="tip-body">
    <div class="tip-title">Структура практики A2/B1</div>
    <div class="tip-text">4 части: аудирование (слушать и отвечать), чтение (понять текст), письмо (написать письмо/описание), говорение (диалог с собеседником). Полезно тренировать каждую часть отдельно.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">2</div>
  <div class="tip-body">
    <div class="tip-title">Уровень A2 vs B1</div>
    <div class="tip-text">A2 достаточно для базового общения (магазин, транспорт, врач). B1 даёт больше свободы в разговоре и позволяет писать развёрнутые тексты. Если уверенно владеешь A2 — пробуй тренироваться на B1, лишним точно не будет.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">3</div>
  <div class="tip-body">
    <div class="tip-title">Приоритет: спряжение yo/tú/él</div>
    <div class="tip-text">90% разговора — три лица: я, ты, он/она. Выучи спряжение 30 ключевых глаголов для этих лиц — и ты уже можешь строить предложения.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">4</div>
  <div class="tip-body">
    <div class="tip-title">quiero + глагол — твоё главное оружие</div>
    <div class="tip-text">«Я хочу [что-то сделать]» — эта конструкция работает в магазине, банке, у врача, в любом учреждении. Выучи quiero + базовые глаголы и ты можешь попросить что угодно.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">5</div>
  <div class="tip-body">
    <div class="tip-title">Аудирование: слушай фоново</div>
    <div class="tip-text">Включай испаноязычное радио или подкасты фоном дома. Не пытайся всё понять — просто привыкай к ритму языка. 30 минут в день = +20% на аудировании через месяц.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">6</div>
  <div class="tip-body">
    <div class="tip-title">Письмо: 3 шаблона покрывают всё</div>
    <div class="tip-text">Выучи 3 шаблона письма: 1) представление себя и семьи, 2) описание своего дня/распорядка, 3) что тебе нравится/не нравится в испаноязычной стране. Эти темы встречаются чаще всего.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">7</div>
  <div class="tip-body">
    <div class="tip-title">Говорение: медленно и уверенно</div>
    <div class="tip-text">Говори медленно — важна правильность, а не скорость. Простое предложение, сказанное без ошибок, лучше сложного с запинками.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">8</div>
  <div class="tip-body">
    <div class="tip-title">Чтение: смотри на контекст, не на каждое слово</div>
    <div class="tip-text">Не нужно понимать каждое слово. Читай абзац целиком — контекст обычно даёт понимание общего смысла. Вопросы всегда о главной идее, а не о деталях.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">9</div>
  <div class="tip-body">
    <div class="tip-title">Минимальный словарный запас A2</div>
    <div class="tip-text">~600-800 слов. Приоритет: числа, дни/месяцы, семья, еда, работа, здоровье, транспорт, магазины. Все эти темы есть в разделе «Карточки» этого приложения.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">10</div>
  <div class="tip-body">
    <div class="tip-title">За месяц активной практики</div>
    <div class="tip-text">Пройди все сценарии (раздел «Сценарии»), порепетируй диалоги вслух, напиши пробный текст 100–150 слов. Попроси носителя испанского проверить или запишись на пробный урок.</div>
  </div>
</div>`;
}

function getExamVocabHTML() {
  const topics = [
    {
      id: 'v1', title: 'Личные данные', emoji: '🪪',
      hint: 'Представление себя — часть Speaking и Writing',
      words: [
        ['el nombre', 'эль но́мбрэ', 'имя'],
        ['el apellido', 'эль апэйи́до', 'фамилия'],
        ['la edad', 'ла эда́д', 'возраст'],
        ['la nacionalidad', 'ла насьоналида́д', 'гражданство/национальность'],
        ['la dirección', 'ла дирэксьо́н', 'адрес'],
        ['el número de teléfono', 'эль ну́мэро дэ тэлэ́фоно', 'номер телефона'],
        ['la experiencia laboral', 'ла экспэрье́нсья лабора́ль', 'опыт работы'],
        ['casado/a', 'каса́до/а', 'женатый/замужняя'],
        ['soltero/a', 'сольтэ́ро/а', 'холостой/незамужняя'],
        ['tengo hijos', 'тэ́нго и́хос', 'у меня есть дети'],
      ]
    },
    {
      id: 'v2', title: 'Семья', emoji: '👨‍👩‍👧',
      hint: 'Часто встречается в темах Speaking',
      words: [
        ['el esposo / el marido', 'эль эспо́со / эль мари́до', 'супруг'],
        ['la esposa / la mujer', 'ла эспо́са / ла мухэ́р', 'супруга'],
        ['los hijos', 'лос и́хос', 'дети'],
        ['el hijo', 'эль и́хо', 'сын'],
        ['la hija', 'ла и́ха', 'дочь'],
        ['los padres', 'лос па́дрэс', 'родители'],
        ['el abuelo', 'эль абуэ́ло', 'дедушка'],
        ['la abuela', 'ла абуэ́ла', 'бабушка'],
        ['el hermano', 'эль эрма́но', 'брат'],
        ['la hermana', 'ла эрма́на', 'сестра'],
      ]
    },
    {
      id: 'v3', title: 'Работа и профессия', emoji: '💼',
      hint: 'Ключевая тема Writing Level A2–B1',
      words: [
        ['el trabajo', 'эль трабáхо', 'работа'],
        ['el jefe / el empleador', 'эль хэ́фэ / эль эмплэадо́р', 'работодатель'],
        ['el sueldo / el salario', 'эль суэ́льдо / эль сала́рьо', 'зарплата'],
        ['el horario', 'эль ора́рьо', 'рабочее расписание'],
        ['las vacaciones / el permiso', 'лас вакасьо́нэс / эль пэрми́со', 'отпуск / разрешение'],
        ['el médico', 'эль мэ́дико', 'врач'],
        ['el profesor / la profesora', 'эль профэсо́р / ла профэсо́ра', 'учитель/учительница'],
        ['el ingeniero / el mecánico', 'эль инхэнье́ро / эль мэка́нико', 'инженер/механик'],
        ['el contable', 'эль конта́блэ', 'бухгалтер'],
        ['el empleado', 'эль эмплэа́до', 'сотрудник/служащий'],
      ]
    },
    {
      id: 'v4', title: 'Дом и жильё', emoji: '🏠',
      hint: 'Тема письма и диалогов о повседневной жизни',
      words: [
        ['el piso / el apartamento', 'эль пи́со / эль апартамэ́нто', 'квартира'],
        ['la casa', 'ла ка́са', 'дом'],
        ['el alquiler', 'эль алькилэ́р', 'аренда'],
        ['el propietario / el dueño', 'эль пропьэта́рьо / эль дуэ́ньо', 'хозяин/собственник'],
        ['el dormitorio', 'эль дормито́рьо', 'спальня'],
        ['la cocina', 'ла коси́на', 'кухня'],
        ['el baño', 'эль ба́ньо', 'ванная'],
        ['el salón', 'эль салóн', 'гостиная'],
        ['la planta', 'ла пла́нта', 'этаж'],
        ['el vecino', 'эль вэси́но', 'сосед'],
      ]
    },
    {
      id: 'v5', title: 'Здоровье и медицина', emoji: '🏥',
      hint: 'Диалог «у врача» — типичный Speaking сценарий',
      words: [
        ['el dolor', 'эль долóр', 'боль'],
        ['duele', 'дуэ́лэ', 'болит'],
        ['la fiebre', 'ла фьэ́брэ', 'температура/жар'],
        ['el medicamento', 'эль мэдикамэ́нто', 'лекарство'],
        ['la receta', 'ла рэсэ́та', 'рецепт'],
        ['el hospital', 'эль оспита́ль', 'больница'],
        ['la consulta', 'ла консу́льта', 'кабинет врача'],
        ['la cita', 'ла си́та', 'запись/встреча'],
        ['el malestar', 'эль малэста́р', 'недомогание'],
        ['la alergia', 'ла алэ́рхья', 'аллергия'],
      ]
    },
    {
      id: 'v6', title: 'Транспорт и город', emoji: '🚌',
      hint: 'Ориентация в городе — стандартная тема Speaking',
      words: [
        ['el autobús', 'эль аутобу́с', 'автобус'],
        ['el taxi', 'эль та́кси', 'такси'],
        ['la estación', 'ла эстасьóн', 'станция'],
        ['la parada', 'ла пара́да', 'остановка'],
        ['el billete', 'эль бийе́тэ', 'билет'],
        ['la calle', 'ла ка́йе', 'дорога/улица'],
        ['todo recto', 'тóдо рэ́кто', 'прямо'],
        ['a la izquierda', 'а ла искьэ́рда', 'налево'],
        ['a la derecha', 'а ла дэрэ́ча', 'направо'],
        ['cerca / lejos', 'сэ́рка / лэ́хос', 'близко / далеко'],
      ]
    },
    {
      id: 'v7', title: 'Покупки и деньги', emoji: '🛒',
      hint: 'Диалог в магазине/банке — обязательная тема',
      words: [
        ['la tienda', 'ла тьэ́нда', 'магазин'],
        ['el precio', 'эль прэ́сьо', 'цена'],
        ['el recibo / el tique', 'эль рэси́бо / эль ти́кэ', 'чек'],
        ['barato/a', 'бара́то/а', 'дешёвый'],
        ['caro/a', 'ка́ро/а', 'дорогой'],
        ['¿cuánto cuesta?', 'куа́нто куэ́ста', 'сколько стоит?'],
        ['pagar', 'пага́р', 'платить'],
        ['el cambio', 'эль ка́мбьо', 'сдача'],
        ['la tarjeta de crédito', 'ла тархэ́та дэ крэ́дито', 'кредитная карта'],
        ['el descuento', 'эль дэскуэ́нто', 'скидка'],
      ]
    },
    {
      id: 'v8', title: 'Досуг и хобби', emoji: '🎭',
      hint: 'Рассказ о свободном времени — Speaking тема',
      words: [
        ['el tiempo libre', 'эль тьэ́мпо ли́брэ', 'свободное время'],
        ['la afición / el hobby', 'ла афисьо́н / эль хóби', 'хобби'],
        ['el cine', 'эль си́нэ', 'кино'],
        ['el teatro', 'эль тэа́тро', 'театр'],
        ['la música', 'ла му́сика', 'музыка'],
        ['el deporte', 'эль дэпóртэ', 'спорт'],
        ['viajar', 'вьяха́р', 'путешествовать'],
        ['leer', 'лээ́р', 'читать'],
        ['cocinar', 'косина́р', 'готовить'],
        ['salir', 'сали́р', 'выходить/гулять'],
      ]
    },
    {
      id: 'v9', title: 'Время и даты', emoji: '📅',
      hint: 'Нужны для любого письменного задания',
      words: [
        ['ayer', 'айе́р', 'вчера'],
        ['hoy', 'ой', 'сегодня'],
        ['mañana', 'манья́на', 'завтра'],
        ['la semana pasada', 'ла сэма́на паса́да', 'на прошлой неделе'],
        ['el año que viene', 'эль а́ньо кэ вьэ́нэ', 'в следующем году'],
        ['a menudo', 'а мэну́до', 'часто'],
        ['a veces', 'а вэ́сэс', 'иногда'],
        ['nunca', 'ну́нка', 'никогда'],
        ['siempre', 'сьэ́мпрэ', 'всегда'],
        ['últimamente', 'у́льтимамэ́нтэ', 'последнее время / недавно'],
      ]
    },
    {
      id: 'v10', title: 'Полезные фразы-связки', emoji: '🔗',
      hint: 'Эти слова поднимают оценку за Writing и Speaking',
      words: [
        ['también', 'тамбьэ́н', 'также'],
        ['sin embargo', 'син эмба́рго', 'однако'],
        ['por lo tanto', 'пор ло та́нто', 'следовательно'],
        ['por ejemplo', 'пор эхэ́мпло', 'например'],
        ['por un lado... por otro', 'пор ун ла́до... пор óтро', 'с одной стороны... с другой'],
        ['estoy de acuerdo / no estoy de acuerdo', 'эстóй дэ акуэ́рдо / но эстóй дэ акуэ́рдо', 'согласен / не согласен'],
        ['en mi opinión', 'эн ми опиньóн', 'по моему мнению'],
        ['creo que', 'крэ́о кэ', 'я думаю что'],
        ['me gustaría', 'мэ густари́а', 'я бы хотел(а)'],
        ['muchas gracias', 'му́час гра́сьяс', 'большое спасибо'],
      ]
    },
  ];

  const toc = topics.map(t =>
    `<button class="gram-toc-btn" onclick="document.getElementById('${t.id}').scrollIntoView({behavior:'smooth'})">${t.emoji} ${t.title}</button>`
  ).join('');

  const blocks = topics.map(t => {
    const rows = t.words.map(([gr, tr, ru]) => `
<tr>
  <td class="vocab-ex-gr" onclick="${sp(gr)}">${gr} <span class="vocab-ex-speak">🔊</span></td>
  <td class="vocab-ex-tr">[${tr}]</td>
  <td class="vocab-ex-ru">${ru}</td>
</tr>`).join('');
    return `
<div id="${t.id}" class="gram-block">
  <div class="gram-title">${t.emoji} ${t.title}</div>
  <div class="gram-subtitle">${t.hint}</div>
  <table class="vocab-ex-table">
    <thead><tr>
      <th>Испанский</th><th>Транскрипция</th><th>Перевод</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
  }).join('\n');

  return `
<div class="gram-nav">
  <div class="gram-toc">${toc}</div>
</div>
<div class="vocab-ex-intro">100 ключевых слов по темам экзамена. Нажми 🔊 чтобы услышать.</div>
${blocks}`;
}

// ===================== EXAM MOCK TEST (sprint 6) =====================

const EXAM_MOCK_QUESTIONS = [
  // -- GRAMMAR --
  {
    type: 'grammar',
    q: 'Выбери правильную форму глагола:\nYo ___ en Valencia.',
    opts: ['vivo', 'vives', 'vive', 'vivimos'],
    correct: 0,
    exp: 'Yo (я) → 1-е лицо ед.ч.: vivo'
  },
  {
    type: 'grammar',
    q: 'Выбери правильную форму:\nMaría ___ café cada mañana.',
    opts: ['bebe', 'bebo', 'bebéis', 'beben'],
    correct: 0,
    exp: 'María — 3-е лицо ед.ч.: bebe'
  },
  {
    type: 'grammar',
    q: 'Прошедшее время (pretérito indefinido). Выбери верное:\nAyer yo ___ al supermercado.',
    opts: ['fui', 'voy', 'voy a ir', 'fuimos'],
    correct: 0,
    exp: 'Pretérito de ir (я ходил/пошёл) → fui'
  },
  {
    type: 'grammar',
    q: 'Будущее время (ir a). Выбери верное:\nMañana nosotros ___ a la playa.',
    opts: ['vamos a ir', 'voy a ir', 'va a ir', 'vamos'],
    correct: 0,
    exp: 'Nosotros (мы) + ir a → vamos a ir'
  },
  {
    type: 'grammar',
    q: 'Выбери правильный артикль:\n___ profesor es muy bueno.',
    opts: ['El', 'La', 'Los', 'Las'],
    correct: 0,
    exp: 'profesor — мужской род → el profesor'
  },
  {
    type: 'grammar',
    q: 'Личное a. Выбери верное:\nQuiero ___ mi madre.',
    opts: ['a', 'en', 'de', 'con'],
    correct: 0,
    exp: 'Перед человеком-дополнением ставится «личное a»: quiero a mi madre'
  },
  // -- VOCABULARY --
  {
    type: 'vocab',
    q: 'Что значит слово «el alquiler»?',
    opts: ['аренда/арендная плата', 'электричество', 'страховка', 'налог'],
    correct: 0,
    exp: 'El alquiler = арендная плата, аренда квартиры'
  },
  {
    type: 'vocab',
    q: 'Выбери верный перевод:\n«Tengo fiebre»',
    opts: ['У меня температура', 'Мне холодно', 'У меня болит голова', 'Я устал'],
    correct: 0,
    exp: 'Fiebre = жар/температура; tengo fiebre = у меня жар'
  },
  {
    type: 'vocab',
    q: 'Как по-испански «скидка»?',
    opts: ['el descuento', 'el recibo', 'el precio', 'el pago'],
    correct: 0,
    exp: 'El descuento = скидка'
  },
  {
    type: 'vocab',
    q: 'Что значит «a la izquierda»?',
    opts: ['налево', 'направо', 'прямо', 'назад'],
    correct: 0,
    exp: 'A la izquierda = налево; a la derecha = направо; todo recto = прямо'
  },
  // -- READING --
  {
    type: 'reading',
    passage: 'Ana es enfermera. Trabaja en un hospital en Valencia. Cada día va al trabajo en autobús.',
    q: '¿Dónde trabaja Ana?',
    opts: ['En un hospital', 'En un colegio', 'En una farmacia', 'En el supermercado'],
    correct: 0,
    exp: 'В тексте: «Trabaja en un hospital» — работает в больнице'
  },
  {
    type: 'reading',
    passage: 'Ana es enfermera. Trabaja en un hospital en Valencia. Cada día va al trabajo en autobús.',
    q: '¿Cómo va al trabajo?',
    opts: ['En autobús', 'En coche', 'En taxi', 'A pie'],
    correct: 0,
    exp: 'В тексте: «va al trabajo en autobús» — на автобусе'
  },
  {
    type: 'grammar',
    q: 'Выбери правильный предлог:\nVoy ___ trabajo cada día.',
    opts: ['al', 'del', 'con', 'para'],
    correct: 0,
    exp: 'Voy al trabajo = иду на работу (al = a + el)'
  },
  {
    type: 'vocab',
    q: 'Фраза «en mi opinión» означает:',
    opts: ['по моему мнению', 'в конце концов', 'с другой стороны', 'например'],
    correct: 0,
    exp: 'En mi opinión = по моему мнению — важная фраза для Speaking/Writing'
  },
  {
    type: 'grammar',
    q: 'Выбери верную конструкцию:\nQuiero ___ a la playa.',
    opts: ['ir', 'voy', 'que', 'para'],
    correct: 0,
    exp: 'Quiero + инфинитив = хочу + гл. (quiero ir = хочу пойти)'
  },
];

let examTestState = { idx: 0, score: 0, answered: false };

function startExamMockTest() {
  document.getElementById('exam-detail-title').textContent = '📝 Пробный тест A2';
  examTestState = { idx: 0, score: 0, answered: false };
  renderExamTestQuestion();
  showScreen('screen-exam-detail');
}

function renderExamTestQuestion() {
  const body = document.getElementById('exam-detail-body');
  const { idx, score } = examTestState;
  const total = EXAM_MOCK_QUESTIONS.length;

  if (idx >= total) {
    const pct = Math.round(score / total * 100);
    const medal = pct >= 80 ? '🥇' : pct >= 60 ? '🥈' : '💪';
    const msg = pct >= 80 ? 'Отличный результат! Ты готов к экзамену.' :
                pct >= 60 ? 'Хороший результат. Повтори слабые темы.' :
                'Продолжай учиться — каждая попытка делает тебя лучше.';
    body.innerHTML = `
<div class="mock-result">
  <div class="mock-result-medal">${medal}</div>
  <div class="mock-result-score">${score} / ${total}</div>
  <div class="mock-result-pct">${pct}%</div>
  <div class="mock-result-msg">${msg}</div>
  <button class="btn-primary" style="margin-top:20px" onclick="startExamMockTest()">Пройти снова</button>
</div>`;
    return;
  }

  const q = EXAM_MOCK_QUESTIONS[idx];
  const typeLbl = { grammar: '📚 Грамматика', vocab: '📖 Лексика', reading: '📄 Чтение' }[q.type];
  const passage = q.passage
    ? `<div class="mock-passage">${q.passage}</div>`
    : '';
  const opts = q.opts.map((o, i) => `
    <button class="mock-opt" id="mock-opt-${i}" onclick="selectExamTestOpt(${i})">${String.fromCharCode(65+i)}. ${o}</button>
  `).join('');

  body.innerHTML = `
<div class="mock-progress-row">
  <div class="mock-progress-bar"><div class="mock-progress-fill" style="width:${idx/total*100}%"></div></div>
  <span class="mock-progress-lbl">${idx+1} / ${total}</span>
</div>
<div class="mock-type-badge">${typeLbl}</div>
${passage}
<div class="mock-question">${q.q.replace(/\n/g, '<br>')}</div>
<div class="mock-opts" id="mock-opts">${opts}</div>
<div class="mock-explanation" id="mock-exp" style="display:none"></div>
<button class="btn-primary mock-next-btn" id="mock-next" style="display:none" onclick="nextExamTestQuestion()">
  ${idx + 1 < total ? 'Следующий вопрос →' : 'Показать результат'}
</button>`;
}

function selectExamTestOpt(i) {
  if (examTestState.answered) return;
  examTestState.answered = true;
  const q = EXAM_MOCK_QUESTIONS[examTestState.idx];
  const correct = q.correct;
  if (i === correct) examTestState.score++;

  document.querySelectorAll('.mock-opt').forEach((btn, j) => {
    btn.disabled = true;
    if (j === correct) btn.classList.add('mock-opt-correct');
    else if (j === i) btn.classList.add('mock-opt-wrong');
  });

  const expEl = document.getElementById('mock-exp');
  expEl.textContent = (i === correct ? '✅ ' : '❌ ') + q.exp;
  expEl.style.display = 'block';
  document.getElementById('mock-next').style.display = 'block';
}

function nextExamTestQuestion() {
  examTestState.idx++;
  examTestState.answered = false;
  renderExamTestQuestion();
}

// ===================== EXAM LISTENING (sprint 7) =====================

const EXAM_LISTENING_TRACKS = [
  {
    title: 'Llamada telefónica',
    titleRu: 'Звонок в клинику',
    emoji: '📞',
    text: 'Buenos días, quiero pedir una cita con el médico. Soy Marta Fernández. Tengo dolor de cabeza y fiebre desde ayer. ¿Puedo venir mañana por la mañana a las diez?',
    textRu: 'Доброе утро, я хочу записаться к врачу. Я Марта Фернандес. У меня болит голова и температура со вчерашнего дня. Могу ли я прийти завтра утром в десять?',
    questions: [
      { q: '¿Qué quiere Marta?', opts: ['Pedir una cita', 'Comprar medicamentos', 'Hablar con la enfermera', 'Ir al hospital'], correct: 0, exp: 'Marta dice: «quiero pedir una cita» — хочет записаться' },
      { q: '¿Qué le pasa a Marta?', opts: ['Dolor de cabeza y fiebre', 'Dolor de espalda', 'Frío y tos', 'Dolor de estómago'], correct: 0, exp: 'Ella dice: «tengo dolor de cabeza y fiebre» — головная боль и температура' },
      { q: '¿Cuándo quiere venir?', opts: ['Mañana por la mañana', 'Esta tarde', 'Pasado mañana', 'El viernes'], correct: 0, exp: 'Ella dice: «mañana por la mañana a las diez» — завтра утром в десять' },
    ]
  },
  {
    title: 'Anuncio en el supermercado',
    titleRu: 'Объявление в супермаркете',
    emoji: '🛒',
    text: 'Estimados clientes, les informamos de que hoy tenemos grandes rebajas en la sección de frutas y verduras. Además, a partir de las seis de la tarde, la tienda cerrará antes por ser día festivo. Gracias por su comprensión.',
    textRu: 'Уважаемые покупатели, сообщаем вам, что сегодня у нас большие скидки в отделе фруктов и овощей. Также с шести вечера магазин закроется раньше в связи с праздничным днём. Благодарим за понимание.',
    questions: [
      { q: '¿Dónde hay rebajas?', opts: ['Frutas y verduras', 'Carne y pescado', 'Bebidas', 'Productos de limpieza'], correct: 0, exp: 'En el anuncio: «rebajas en la sección de frutas y verduras»' },
      { q: '¿Cuándo cierra la tienda?', opts: ['A las seis de la tarde', 'A las ocho', 'A las nueve', 'A las diez'], correct: 0, exp: '«a partir de las seis de la tarde, la tienda cerrará»' },
      { q: '¿Por qué cierra antes?', opts: ['Por ser día festivo', 'Por una reparación', 'Por una huelga', 'Por limpieza'], correct: 0, exp: '«cerrará antes por ser día festivo» — из-за праздника' },
    ]
  },
  {
    title: 'Diálogo sobre el alquiler',
    titleRu: 'Разговор об аренде',
    emoji: '🏠',
    text: '— Buenas tardes, vi su anuncio sobre el piso. ¿Todavía está disponible?\n— Sí, lo está. Tiene dos dormitorios, en el tercer piso. El alquiler es de ochocientos euros al mes.\n— ¿Incluye los gastos comunes?\n— Sí, incluye el agua y la basura, pero no la electricidad.',
    textRu: '— Добрый день, я видел ваше объявление о квартире. Она ещё свободна?\n— Да, свободна. Две спальни, третий этаж. Аренда 800 евро в месяц.\n— Включены ли коммунальные расходы?\n— Да, включает воду и вывоз мусора, но не электричество.',
    questions: [
      { q: '¿Cuántos dormitorios tiene el piso?', opts: ['Dos', 'Uno', 'Tres', 'Cuatro'], correct: 0, exp: '«Tiene dos dormitorios» — две спальни' },
      { q: '¿Cuánto es el alquiler?', opts: ['800 euros', '600 euros', '1000 euros', '750 euros'], correct: 0, exp: '«El alquiler es de ochocientos euros» — 800 евро' },
      { q: '¿Qué NO está incluido en el alquiler?', opts: ['La electricidad', 'El agua', 'La basura', 'La calefacción'], correct: 0, exp: '«pero no la electricidad» — электричество не включено' },
    ]
  },
  {
    title: 'Mensaje en el contestador',
    titleRu: 'Сообщение на автоответчике',
    emoji: '📱',
    text: 'Hola Pablo, soy Elena. Te llamo para recordarte que mañana tenemos clase de español a las siete de la tarde. La clase es en el centro cultural, en la calle Cervantes. Si no puedes venir, por favor, mándame un mensaje.',
    textRu: 'Привет, Пабло, это Элена. Звоню напомнить, что завтра у нас урок испанского в семь вечера. Занятие проходит в культурном центре на улице Сервантеса. Если не сможешь прийти, пожалуйста, напиши мне сообщение.',
    questions: [
      { q: '¿Cuándo es la clase?', opts: ['Mañana a las 7 de la tarde', 'Hoy a las 7', 'Mañana por la mañana', 'Pasado mañana'], correct: 0, exp: '«mañana tenemos clase... a las siete de la tarde» — завтра в 7 вечера' },
      { q: '¿Dónde es la clase?', opts: ['En el centro cultural', 'En el colegio', 'En la biblioteca', 'En casa de Elena'], correct: 0, exp: '«es en el centro cultural» — в культурном центре' },
      { q: '¿Qué debe hacer Pablo si no puede venir?', opts: ['Mandar un mensaje', 'Llamar por teléfono', 'Venir más tarde', 'Mandar un correo'], correct: 0, exp: '«mándame un mensaje» — написать сообщение' },
    ]
  },
  {
    title: 'Indicaciones en la ciudad',
    titleRu: 'Маршрут по городу',
    emoji: '🗺️',
    text: 'Para ir al ayuntamiento, siga todo recto por la calle principal durante doscientos metros. En el primer semáforo, gire a la izquierda. Continúe cien metros más y el ayuntamiento estará a su derecha, al lado del banco.',
    textRu: 'Чтобы добраться до мэрии, идите прямо по главной улице 200 метров. На первом светофоре поверните налево. Продолжайте ещё 100 метров — мэрия будет справа от вас, рядом с банком.',
    questions: [
      { q: '¿Hacia dónde se gira en el semáforo?', opts: ['A la izquierda', 'A la derecha', 'Todo recto', 'Hacia atrás'], correct: 0, exp: '«gire a la izquierda» — поверните налево' },
      { q: '¿Dónde está el ayuntamiento?', opts: ['A la derecha, al lado del banco', 'A la izquierda', 'Enfrente del semáforo', 'Al lado del colegio'], correct: 0, exp: '«a su derecha, al lado del banco» — справа, рядом с банком' },
      { q: '¿Cuántos metros hay que ir recto primero?', opts: ['200 metros', '100 metros', '300 metros', '500 metros'], correct: 0, exp: '«todo recto... durante doscientos metros» — 200 метров прямо' },
    ]
  },
];

let listeningState = { trackIdx: null, answered: [], ttsPlaying: false };

function startExamListening() {
  document.getElementById('exam-detail-title').textContent = '🎧 Аудирование';
  listeningState = { trackIdx: null, answered: [], ttsPlaying: false };
  renderListeningTracks();
  showScreen('screen-exam-detail');
}

function renderListeningTracks() {
  const cards = EXAM_LISTENING_TRACKS.map((t, i) => {
    const done = listeningState.answered[i] !== undefined;
    const score = done ? listeningState.answered[i] : null;
    const badge = done ? `<span class="listen-done-badge">${score}/${t.questions.length}</span>` : '';
    return `
<div class="listen-track-card${done ? ' listen-track-done' : ''}" onclick="startListeningTrack(${i})">
  <span class="listen-track-emoji">${t.emoji}</span>
  <div class="listen-track-info">
    <div class="listen-track-title">${t.title}</div>
    <div class="listen-track-sub">${t.titleRu} · ${t.questions.length} вопроса</div>
  </div>
  ${badge}
  <span class="listen-track-arrow">${done ? '✓' : '›'}</span>
</div>`;
  }).join('');

  const totalDone = listeningState.answered.filter(x => x !== undefined).length;
  document.getElementById('exam-detail-body').innerHTML = `
<div class="listen-intro">Нажми ▶ чтобы услышать текст, затем ответь на вопросы. Текст скрыт — тренируй настоящее слушание.</div>
<div class="listen-tracks">${cards}</div>
${totalDone > 0 ? `<div class="listen-total">Пройдено: ${totalDone} / ${EXAM_LISTENING_TRACKS.length}</div>` : ''}`;
}

function startListeningTrack(idx) {
  listeningState.trackIdx = idx;
  listeningState.ttsPlaying = false;
  renderListeningTrack();
}

function renderListeningTrack() {
  const idx = listeningState.trackIdx;
  const t = EXAM_LISTENING_TRACKS[idx];
  const qs = t.questions.map((q, qi) => `
<div class="listen-q-block" id="listen-q-${qi}">
  <div class="listen-q-text">${qi+1}. ${q.q}</div>
  <div class="mock-opts">${q.opts.map((o, oi) =>
    `<button class="mock-opt" id="lopt-${qi}-${oi}" onclick="answerListeningQ(${idx},${qi},${oi})">${String.fromCharCode(65+oi)}. ${o}</button>`
  ).join('')}</div>
  <div class="mock-explanation" id="listen-exp-${qi}" style="display:none"></div>
</div>`).join('');

  document.getElementById('exam-detail-body').innerHTML = `
<button class="btn-back-inline" onclick="renderListeningTracks()">← К списку</button>
<div class="listen-track-header">
  <span style="font-size:28px">${t.emoji}</span>
  <div>
    <div class="listen-th-title">${t.title}</div>
    <div class="listen-th-sub">${t.titleRu}</div>
  </div>
</div>
<div class="listen-play-area">
  <button class="listen-play-btn" id="listen-play-btn" onclick="playListeningTrack(${idx})">▶ Слушать</button>
  <div class="listen-play-hint">Нажми — текст озвучится по-испански</div>
</div>
<div id="listen-transcript" class="listen-transcript" style="display:none">${t.text.replace(/\n/g,'<br>')}</div>
<button class="listen-reveal-btn" id="listen-reveal-btn" onclick="toggleListeningTranscript()">👁 Показать текст</button>
<div class="listen-qs-title">Вопросы по тексту:</div>
<div id="listen-qs">${qs}</div>
<div id="listen-track-result" style="display:none"></div>`;
}

function playListeningTrack(idx) {
  const t = EXAM_LISTENING_TRACKS[idx];
  const btn = document.getElementById('listen-play-btn');
  if (speechSynthesis.speaking) { speechSynthesis.cancel(); btn.textContent = '▶ Слушать'; return; }
  const utt = new SpeechSynthesisUtterance(t.text.replace(/\n/g, ' '));
  utt.lang = 'es-ES';
  utt.rate = 0.85;
  const voices = speechSynthesis.getVoices();
  const elVoice = voices.find(v => v.lang.startsWith('es'));
  if (elVoice) utt.voice = elVoice;
  utt.onstart = () => { btn.textContent = '⏹ Остановить'; };
  utt.onend = utt.onerror = () => { btn.textContent = '▶ Слушать снова'; };
  speechSynthesis.speak(utt);
}

function toggleListeningTranscript() {
  const el = document.getElementById('listen-transcript');
  const btn = document.getElementById('listen-reveal-btn');
  const hidden = el.style.display === 'none';
  el.style.display = hidden ? 'block' : 'none';
  btn.textContent = hidden ? '👁 Скрыть текст' : '👁 Показать текст';
}

let listenQScores = {};

function answerListeningQ(trackIdx, qi, oi) {
  const t = EXAM_LISTENING_TRACKS[trackIdx];
  const q = t.questions[qi];
  const key = `${trackIdx}-${qi}`;
  if (listenQScores[key] !== undefined) return;

  const correct = q.correct;
  listenQScores[key] = (oi === correct) ? 1 : 0;

  document.querySelectorAll(`[id^="lopt-${qi}-"]`).forEach(btn => {
    const btnOi = parseInt(btn.id.split('-')[2]);
    btn.disabled = true;
    if (btnOi === correct) btn.classList.add('mock-opt-correct');
    else if (btnOi === oi) btn.classList.add('mock-opt-wrong');
  });
  const expEl = document.getElementById(`listen-exp-${qi}`);
  expEl.textContent = (oi === correct ? '✅ ' : '❌ ') + q.exp;
  expEl.style.display = 'block';

  const allAnswered = t.questions.every((_, i) => listenQScores[`${trackIdx}-${i}`] !== undefined);
  if (allAnswered) {
    const score = t.questions.reduce((s, _, i) => s + (listenQScores[`${trackIdx}-${i}`] || 0), 0);
    if (!listeningState.answered) listeningState.answered = [];
    listeningState.answered[trackIdx] = score;
    const pct = Math.round(score / t.questions.length * 100);
    document.getElementById('listen-track-result').innerHTML = `
<div class="listen-result-bar">
  ${pct >= 67 ? '✅' : '💪'} Результат: <strong>${score}/${t.questions.length}</strong>
  <button class="btn-back-inline" style="margin-left:auto" onclick="renderListeningTracks()">← К списку</button>
</div>`;
    document.getElementById('listen-track-result').style.display = 'block';
  }
}
