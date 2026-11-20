MT Sense – ติดตั้งเป็นแอปบนมือถือ (PWA)
==========================================

ไฟล์ในโฟลเดอร์นี้
  index.html             ตัวแอป
  manifest.webmanifest   ชื่อแอป ไอคอน สี (ทำให้ "ติดตั้ง" ได้)
  sw.js                  ทำให้เปิดแอปได้แม้ไม่มีอินเทอร์เน็ต
  icons/                 ไอคอนแอปทุกขนาด

ขั้นที่ 1  นำขึ้นเว็บแบบ HTTPS (ฟรี ด้วย GitHub Pages)
  1. สมัคร/เข้าสู่ระบบ github.com
  2. New repository  ตั้งชื่อ เช่น mt-sense  เลือก Public  กด Create
  3. กด "uploading an existing file"  ลากไฟล์ทั้งหมดในโฟลเดอร์นี้ (รวมโฟลเดอร์ icons) ลงไป  กด Commit
  4. Settings > Pages > Source: Deploy from a branch  Branch: main / (root)  กด Save
  5. รอ 1-2 นาที จะได้ลิงก์  https://<ชื่อผู้ใช้>.github.io/mt-sense/

ขั้นที่ 2  ติดตั้งบนมือถือ Android
  1. เปิดลิงก์ด้วย Chrome
  2. เมนู ⋮ > "ติดตั้งแอป" หรือ "เพิ่มลงในหน้าจอหลัก"
  3. ไอคอน MT Sense จะขึ้นบนหน้าจอ เปิดแล้วเต็มจอเหมือนแอปทั่วไป

ขั้นที่ 3 (ถ้าต้องการไฟล์ .apk)
  1. เข้า pwabuilder.com  ใส่ลิงก์จากขั้นที่ 1  กด Start
  2. Package For Stores > Android > Generate Package
  3. ได้ไฟล์ .apk สำหรับติดตั้งเอง และ .aab สำหรับขึ้น Google Play

แก้ไขแอปภายหลัง
  อัปโหลด index.html ตัวใหม่ทับใน GitHub แล้วเปลี่ยน CACHE ใน sw.js เป็น 'mt-sense-v2', v3 ...
  มือถือจะได้เวอร์ชันใหม่เมื่อเปิดแอปขณะมีอินเทอร์เน็ต

ข้อจำกัด
  - Bluetooth ใช้ได้กับ Chrome บน Android (iPhone/Safari ไม่รองรับ Web Bluetooth)
  - USB Serial บนมือถือขึ้นกับรุ่นของ Chrome อาจใช้ไม่ได้ บนมือถือแนะนำ Bluetooth
  - ข้อมูลผลการวัดเก็บในแอปบนมือถือแต่ละเครื่อง ถ้าลบแอปหรือล้างข้อมูล Chrome ข้อมูลจะหาย
    ควรเปิดอัปโหลด Google Drive หรือดาวน์โหลด CSV เก็บไว้
