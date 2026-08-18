// 서비스워커 — 앱 설치 요건 + 브리핑 푸시 알림 수신 (데이터는 항상 실시간이라 캐시하지 않음)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

// 푸시 수신 → 알림 표시
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data.json(); } catch (err) {}
  e.waitUntil(self.registration.showNotification(d.title || '[리치] 트레이딩 라운지', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: d.url || '/' }
  }));
});

// 알림 클릭 → 사이트 열기 (이미 열려 있으면 그 창을 앞으로)
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) {
      if ('focus' in c) { c.navigate(url); return c.focus(); }
    }
    return clients.openWindow(url);
  }));
});
