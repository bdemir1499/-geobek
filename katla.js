// Akıllı Katlama v3.0 - Geobek
// Çapraz Katlama, Fiziksel Gerçekçilik ve Gerçek Zamanlı Senkronizasyon

window.isKatlaActive = false;
let katlamaOverlayCanvas = null;
let katlamaOverlayCtx = null;
let currentCapturedImg = null;
let currentCaptureRect = null;

let isDrawingBox = false;
let isFolding = false;
let startX, startY, currentBox = null;
let foldStart = null;
let foldCurrent = null;

// Ağ parçalama (chunking) için ID
let syncImgId = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Katla Butonunu Ekle
    const toolGroup = document.createElement('div');
    toolGroup.className = 'tool-group';
    const katlaBtn = document.createElement('button');
    katlaBtn.id = 'btn-katla';
    katlaBtn.className = 'tool-button';
    katlaBtn.title = 'Akıllı Katlama';
    katlaBtn.innerHTML = 'Katla ✂️';
    toolGroup.appendChild(katlaBtn);
    
    const snapshotMain = document.getElementById('btn-snapshot-main');
    if (snapshotMain) {
        snapshotMain.parentElement.insertAdjacentElement('afterend', toolGroup);
    }

    // 2. Stilleri Ekle
    const style = document.createElement('style');
    style.textContent = `
        #katla-box { position: absolute; border: 2px dashed #ff00ff; background: rgba(255,0,255,0.1); pointer-events: none; z-index: 9999; }
        .katla-active { cursor: crosshair !important; }
        .btn-katla-active { background-color: #ff00ff !important; color: white; }
        #katlama-overlay { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 10000; touch-action: none; pointer-events: auto; }
        .katlama-ui { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10001; display: flex; gap: 10px; }
        .katlama-ui button { padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
        #btn-katla-iptal { background-color: #ff4444; color: white; }
        #btn-katla-tamam { background-color: #44cc44; color: white; }
    `;
    document.head.appendChild(style);

    katlaBtn.addEventListener('click', () => {
        window.isKatlaActive = !window.isKatlaActive;
        if (window.isKatlaActive) {
            katlaBtn.classList.add('btn-katla-active');
            document.body.classList.add('katla-active');
            if (typeof window.setActiveTool === 'function') window.setActiveTool('none');
        } else {
            iptalEt();
            katlaBtn.classList.remove('btn-katla-active');
            document.body.classList.remove('katla-active');
        }
    });

    // 3. Etkileşimler (Kutu Çizimi)
    document.addEventListener('pointerdown', (e) => {
        if (!window.isKatlaActive || e.target.closest('.toolbar') || e.target.closest('.katlama-ui')) return;
        
        // Eğer zaten katlama ekranındaysak, katlama hareketini başlat
        if (katlamaOverlayCanvas) {
            e.stopPropagation();
            isFolding = true;
            foldStart = { x: e.clientX, y: e.clientY };
            foldCurrent = { x: e.clientX, y: e.clientY };
            return;
        }

        e.stopPropagation(); 
        isDrawingBox = true;
        startX = e.clientX;
        startY = e.clientY;
        
        currentBox = document.createElement('div');
        currentBox.id = 'katla-box';
        currentBox.style.left = startX + 'px';
        currentBox.style.top = startY + 'px';
        document.body.appendChild(currentBox);
    }, { capture: true });

    document.addEventListener('pointermove', (e) => {
        if (isFolding && katlamaOverlayCanvas) {
            e.stopPropagation();
            foldCurrent = { x: e.clientX, y: e.clientY };
            cizKatlamaAnimasyonu(currentCapturedImg, currentCaptureRect, foldStart, foldCurrent);
            agSenkronizeEt('guncelle', foldStart, foldCurrent);
            return;
        }

        if (!isDrawingBox || !currentBox) return;
        e.stopPropagation();
        const width = Math.abs(e.clientX - startX);
        const height = Math.abs(e.clientY - startY);
        currentBox.style.width = width + 'px';
        currentBox.style.height = height + 'px';
        currentBox.style.left = Math.min(startX, e.clientX) + 'px';
        currentBox.style.top = Math.min(startY, e.clientY) + 'px';
    }, { capture: true });

    document.addEventListener('pointerup', async (e) => {
        if (isFolding) {
            e.stopPropagation();
            isFolding = false;
            return;
        }

        if (!isDrawingBox || !currentBox) return;
        e.stopPropagation();
        isDrawingBox = false;
        
        const rect = currentBox.getBoundingClientRect();
        currentBox.remove();
        currentBox = null;

        if (rect.width < 50 || rect.height < 50) return;

        // html2canvas ile bölgeyi yakala
        const canvasElm = document.getElementById('drawing-canvas');
        if (!canvasElm) return;

        try {
            const h2c = await html2canvas(document.body, {
                x: rect.left, y: rect.top, width: rect.width, height: rect.height,
                backgroundColor: null, scale: 2
            });

            currentCapturedImg = new Image();
            currentCapturedImg.src = h2c.toDataURL('image/png');
            currentCaptureRect = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

            currentCapturedImg.onload = () => {
                baslatKatlamaEkrani();
                agSenkronizeEt('basla', null, null, currentCapturedImg.src, currentCaptureRect);
            };
        } catch (err) {
            console.error("Kesim hatası:", err);
        }
    }, { capture: true });

    // 4. Ağ Dinleyicisi (PC veya diğer tabletler için)
    window.addEventListener('katlama_sistemi', (e) => {
        const d = e.detail;
        if (d.type === 'katlama_basla_chunk') {
            if (!window.kChunks) window.kChunks = {};
            if (!window.kChunks[d.imgId]) window.kChunks[d.imgId] = { chunks: new Array(d.total), count: 0 };
            const cObj = window.kChunks[d.imgId];
            if (!cObj.chunks[d.index]) {
                cObj.chunks[d.index] = d.chunk;
                cObj.count++;
            }
            if (cObj.count === d.total) {
                const fullImg = cObj.chunks.join('');
                delete window.kChunks[d.imgId];
                
                currentCapturedImg = new Image();
                currentCapturedImg.onload = () => {
                    currentCaptureRect = d.rect;
                    baslatKatlamaEkrani(true); // isRemote = true
                };
                currentCapturedImg.src = fullImg;
            }
        }
        else if (d.type === 'katlama_guncelle') {
            if (katlamaOverlayCanvas) {
                cizKatlamaAnimasyonu(currentCapturedImg, currentCaptureRect, d.foldStart, d.foldCurrent);
            }
        }
        else if (d.type === 'katlama_iptal') {
            iptalEt(true);
        }
        else if (d.type === 'katlama_tamamla') {
            katIziBirak(d.foldStart, d.foldCurrent);
            iptalEt(true);
        }
    });
});

function baslatKatlamaEkrani(isRemote = false) {
    if (katlamaOverlayCanvas) katlamaOverlayCanvas.remove();
    const ui = document.querySelector('.katlama-ui');
    if (ui) ui.remove();

    katlamaOverlayCanvas = document.createElement('canvas');
    katlamaOverlayCanvas.id = 'katlama-overlay';
    katlamaOverlayCanvas.width = window.innerWidth;
    katlamaOverlayCanvas.height = window.innerHeight;
    document.body.appendChild(katlamaOverlayCanvas);
    katlamaOverlayCtx = katlamaOverlayCanvas.getContext('2d');

    // İlk çizim (sadece resim)
    katlamaOverlayCtx.drawImage(currentCapturedImg, currentCaptureRect.x, currentCaptureRect.y, currentCaptureRect.w, currentCaptureRect.h);

    if (!isRemote) {
        const uiDiv = document.createElement('div');
        uiDiv.className = 'katlama-ui';
        uiDiv.innerHTML = `
            <button id="btn-katla-iptal">İptal / Sil</button>
            <button id="btn-katla-tamam">Aç ve İz Bırak</button>
        `;
        document.body.appendChild(uiDiv);

        document.getElementById('btn-katla-iptal').addEventListener('click', () => {
            iptalEt();
            agSenkronizeEt('iptal');
        });
        document.getElementById('btn-katla-tamam').addEventListener('click', () => {
            if (foldStart && foldCurrent) {
                katIziBirak(foldStart, foldCurrent);
                agSenkronizeEt('tamamla', foldStart, foldCurrent);
                iptalEt();
            } else {
                iptalEt();
                agSenkronizeEt('iptal');
            }
        });
    }
}

function iptalEt(isRemote = false) {
    if (katlamaOverlayCanvas) {
        katlamaOverlayCanvas.remove();
        katlamaOverlayCanvas = null;
    }
    const ui = document.querySelector('.katlama-ui');
    if (ui) ui.remove();
    currentCapturedImg = null;
    currentCaptureRect = null;
    foldStart = null;
    foldCurrent = null;
    if (!isRemote && window.isKatlaActive) {
        const btn = document.getElementById('btn-katla');
        if(btn) btn.click();
    }
}

function katIziBirak(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    // Perpendicular vector
    const nx = -dy;
    const ny = dx;

    // Uzun bir çizgi çiz (10000px her iki yöne)
    const lineStartX = midX + nx * 1000;
    const lineStartY = midY + ny * 1000;
    const lineEndX = midX - nx * 1000;
    const lineEndY = midY - ny * 1000;

    // Çizgiyi sisteme stroke olarak ekle (eğer app.js kullanıyorsa)
    if (window.drawnStrokes) {
        const bgLayerObj = {
            type: 'line',
            points: [{x: lineStartX, y: lineStartY}, {x: lineEndX, y: lineEndY}],
            color: '#aaaaaa',
            width: 3,
            isDashed: true,
            id: Date.now() + Math.random()
        };
        window.drawnStrokes.push(bgLayerObj);
        if (typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
}

// Yansıma Matrisi Formülü
function getReflectionMatrix(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return [1, 0, 0, 1, 0, 0];

    const nx = dx;
    const ny = dy;
    const px = (p1.x + p2.x) / 2;
    const py = (p1.y + p2.y) / 2;

    const a = (ny * ny - nx * nx) / len2;
    const b = (-2 * nx * ny) / len2;
    
    const tx = px - px * a - py * b;
    const ty = py - px * b + py * a;

    return [a, b, b, -a, tx, ty];
}

function cizKatlamaAnimasyonu(img, rect, p1, p2) {
    if (!katlamaOverlayCtx || !img) return;
    const ctx = katlamaOverlayCtx;
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    
    ctx.clearRect(0, 0, cw, ch);

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
        return;
    }

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    // p2 noktasının bulunduğu taraf (hareket eden taraf)
    // Katlama izinin formülü: (x - midX)*dx + (y - midY)*dy = 0
    // p1 noktası hareketsiz kalan zemin tarafıdır. (p1 için dx*dx + dy*dy < 0 normalde? Hayır, p1 için (p1.x-midX)*dx + (p1.y-midY)*dy = (-dx/2)*dx + (-dy/2)*dy = -(dx^2+dy^2)/2 < 0
    // Yani p1 tarafı (sabit) için denklem < 0 olmalı.
    
    // --- 1. SABİT (ZEMİN) KISMI ÇİZ ---
    ctx.save();
    ctx.beginPath();
    // Ekranı kaplayan dev bir dikdörtgen
    ctx.rect(-cw, -ch, cw*3, ch*3);
    // Kalkan kısmın kesilmesi için clip
    // Sabit olan alan: P1 tarafı.
    const nx = dx;
    const ny = dy;
    
    // Yarı düzlemi (p1 tarafı) belirle
    const angle = Math.atan2(ny, nx);
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    // x eksenine paralel hale geldi. nx,ny yönü +x yönüdür. p1 noktası -x yönündedir.
    // Yani x < 0 olan kısım SABİT kısımdır.
    ctx.rect(-cw*2, -ch*2, cw*2, ch*4);
    ctx.clip("evenodd"); // Dışını kes
    
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);
    
    ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();

    // --- 2. FİZİKSEL GERÇEKÇİLİK: KALKAN KAĞIDIN BOŞLUĞU ---
    // Eğer zemin rengi belliyse (örneğin tahta rengi), onu boyayalım. 
    // Veya sadece boş (beyaz) bir leke bırakalım ki şekil oradan sökülmüş gibi dursun.
    ctx.save();
    ctx.beginPath();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(0, -ch*2, cw*2, ch*4); // P2 tarafı (Kalkan taraf)
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);
    
    // Kalkan kısmın altını temizle veya zemin rengine boya (saydam olan app.js tuvaline uyması için)
    const bgColor = document.body.style.backgroundColor || '#ffffff';
    ctx.fillStyle = window.currentBoardColor || '#ffffff'; // Tahta rengi
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.restore();

    // --- 3. KATLANAN (HAREKETLİ) KISMI ÇİZ ---
    ctx.save();
    ctx.beginPath();
    // Sadece p2 tarafında görünmesi için clip
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(-cw*2, -ch*2, cw*2, ch*4); // Flip edildiği için P1 tarafına geçecek
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);

    // Yansıma matrisini uygula (Tam dikey ortaya göre aynalama)
    const [a, b, c, d, tx, ty] = getReflectionMatrix(p1, p2);
    ctx.transform(a, b, c, d, tx, ty);
    
    // Gölge efekti
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -nx * 0.05;
    ctx.shadowOffsetY = -ny * 0.05;

    // Resmi ters olarak çiz
    ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
    
    // FİZİKSEL GERÇEKÇİLİK: Arka yüz (Buzlu cam / silüet efekti)
    // Şeklin katlanan arka yüzünü %80 beyaz ile kapla
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    
    ctx.restore();
}

function agSenkronizeEt(action, p1 = null, p2 = null, imgStr = null, rect = null) {
    if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
        if (action === 'basla' && imgStr) {
            syncImgId = Date.now().toString();
            const chunkSize = 16000;
            const totalChunks = Math.ceil(imgStr.length / chunkSize);
            for (let i = 0; i < totalChunks; i++) {
                window.sendNetworkData({
                    type: 'katlama_basla_chunk',
                    imgId: syncImgId,
                    chunk: imgStr.substring(i * chunkSize, (i + 1) * chunkSize),
                    index: i,
                    total: totalChunks,
                    rect: rect
                });
            }
        } else {
            window.sendNetworkData({
                type: 'katlama_' + action,
                foldStart: p1,
                foldCurrent: p2
            });
        }
    }
}
