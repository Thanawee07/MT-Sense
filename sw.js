// Service worker: เก็บไฟล์แอปไว้ในเครื่อง เปิดใช้ได้แม้ไม่มีอินเทอร์เน็ต
// เมื่อแก้ไฟล์แอป ให้เปลี่ยนเลขเวอร์ชันนี้ มือถือจะโหลดเวอร์ชันใหม่เอง
const CACHE = 'mt-sense-v2';
const APP_FILES = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-192.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;                       // อัปโหลด Google Drive (POST) ส่งตรงเสมอ
  const url = new URL(req.url);

  // ตัวแอป: ใช้ของใหม่จากเน็ตก่อน ถ้าออฟไลน์ใช้ของที่เก็บไว้
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // ฟอนต์ Google: ใช้ของที่เก็บไว้ก่อน
  if (url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }))
    );
  }
});
