// 최소 서비스워커 — 앱 설치 요건 충족용 (데이터는 항상 실시간이라 캐시하지 않음)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
