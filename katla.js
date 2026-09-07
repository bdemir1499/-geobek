// Akıllı Katlama v3.1 - Geobek
// Çapraz Katlama, Arka Plan / Ön Plan Ayrımı ve Gerçek Zamanlı Senkronizasyon

window.isKatlaActive = false;
let katlamaOverlayCanvas = null;
let katlamaOverlayCtx = null;
let currentBgImg = null;
let currentFgImg = null;
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
    // (Kaldırıldı)
    // 1. Katla Butonunu Canlandır Menüsüne Ekle
    const katlaBtn = document.createElement('button');
    katlaBtn.id = 'btn-katla';
    katlaBtn.className = 'tool-button-sub';
    katlaBtn.title = 'Akıllı Katlama';
    katlaBtn.innerHTML = 'Katla ✂️';
    
    const snapshotOptions = document.getElementById('snapshot-options');
    if (snapshotOptions) {
        snapshotOptions.appendChild(katlaBtn);
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
            cizKatlamaAnimasyonu(currentBgImg, currentFgImg, currentCaptureRect, foldStart, foldCurrent);
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

        // Html2Canvas yerine anında Canvas Cropping kullanıyoruz (Çok daha performanslı ve Katmanları ayırabiliyoruz!)
        const canvasElm = document.getElementById('drawing-canvas');
        const bgCanvas = document.getElementById('bg-canvas');
        if (!canvasElm) return;

        try {
            const tempBg = document.createElement('canvas');
            tempBg.width = rect.width; tempBg.height = rect.height;
            const tempFg = document.createElement('canvas');
            tempFg.width = rect.width; tempFg.height = rect.height;

            const dpr = window.devicePixelRatio || 1;
            const canvasRect = canvasElm.getBoundingClientRect();
            const sx = (rect.left - canvasRect.left) * dpr;
            const sy = (rect.top - canvasRect.top) * dpr;
            const sw = rect.width * dpr;
            const sh = rect.height * dpr;

            if (bgCanvas) {
                tempBg.getContext('2d').drawImage(bgCanvas, sx, sy, sw, sh, 0, 0, rect.width, rect.height);
            } else {
                tempBg.getContext('2d').fillStyle = document.body.style.backgroundColor || '#ffffff';
                tempBg.getContext('2d').fillRect(0, 0, rect.width, rect.height);
            }
            tempFg.getContext('2d').drawImage(canvasElm, sx, sy, sw, sh, 0, 0, rect.width, rect.height);

            const bgStr = tempBg.toDataURL('image/png');
            const fgStr = tempFg.toDataURL('image/png');
            
            currentCaptureRect = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

            // İki resmi paralel yükle
            Promise.all([
                new Promise(res => { currentBgImg = new Image(); currentBgImg.onload = res; currentBgImg.src = bgStr; }),
                new Promise(res => { currentFgImg = new Image(); currentFgImg.onload = res; currentFgImg.src = fgStr; })
            ]).then(() => {
                baslatKatlamaEkrani();
                agSenkronizeEt('basla', null, null, bgStr, fgStr, currentCaptureRect);
            });
        } catch (err) {
            console.error("Kesim hatası:", err);
        }
    }, { capture: true });

    // 4. Ağ Dinleyicisi (PC veya diğer tabletler için)
    window.addEventListener('katlama_sistemi', (e) => {
        const d = e.detail;
        if (d.type === 'katlama_basla_chunk') {
            if (!window.kChunks) window.kChunks = {};
            if (!window.kChunks[d.imgId]) window.kChunks[d.imgId] = { chunks: new Array(d.total), count: 0, isBg: d.isBg, isFg: d.isFg };
            const cObj = window.kChunks[d.imgId];
            if (!cObj.chunks[d.index]) {
                cObj.chunks[d.index] = d.chunk;
                cObj.count++;
            }
            if (cObj.count === d.total) {
                const fullImg = cObj.chunks.join('');
                delete window.kChunks[d.imgId];
                
                if (cObj.isBg) {
                    currentBgImg = new Image();
                    currentBgImg.src = fullImg;
                } else if (cObj.isFg) {
                    currentFgImg = new Image();
                    currentFgImg.onload = () => {
                        currentCaptureRect = d.rect;
                        // Fg (ön plan) en son gelir, gelince ekranı başlat
                        baslatKatlamaEkrani(true); 
                    };
                    currentFgImg.src = fullImg;
                }
            }
        }
        else if (d.type === 'katlama_guncelle') {
            if (katlamaOverlayCanvas) {
                cizKatlamaAnimasyonu(currentBgImg, currentFgImg, currentCaptureRect, d.foldStart, d.foldCurrent);
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

    // İlk anda hiçbir şey çizmene gerek yok, çünkü alttaki canvaslar zaten gösteriyor.
    // Kullanıcı ekrana dokunup hareket ettirdiğinde cizKatlamaAnimasyonu çağrılacak.

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
    currentBgImg = null;
    currentFgImg = null;
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

    // Çizgiyi sisteme stroke olarak ekle
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

function cizKatlamaAnimasyonu(bgImg, fgImg, rect, p1, p2) {
    if (!katlamaOverlayCtx || !bgImg || !fgImg) return;
    const ctx = katlamaOverlayCtx;
    const cw = ctx.canvas.width;
    const ch = ctx.canvas.height;
    
    ctx.clearRect(0, 0, cw, ch);

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return;
    }

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const nx = dx;
    const ny = dy;
    const angle = Math.atan2(ny, nx);
    
    // 1. FİZİKSEL GERÇEKÇİLİK: KALKAN KAĞIDIN BOŞLUĞU (Zemini Geri Yükle)
    // Kalkan kısmın altındaki kırmızı şekli örtmek için bgImg'yi (sadece zemin) çiziyoruz!
    ctx.save();
    ctx.beginPath();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(0, -ch*2, cw*2, ch*4); // P2 tarafı (Kalkan taraf)
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);
    
    ctx.drawImage(bgImg, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();

    // 2. KATLANAN (HAREKETLİ) KISMI ÇİZ
    ctx.save();
    ctx.beginPath();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(-cw*2, -ch*2, cw*2, ch*4); // Flip edildiği için P1 tarafına geçecek
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);

    const [a, b, c, d, tx, ty] = getReflectionMatrix(p1, p2);
    ctx.transform(a, b, c, d, tx, ty);
    
    // Gölge efekti
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -nx * 0.05;
    ctx.shadowOffsetY = -ny * 0.05;

    // Şeffaf arka planlı sadece ön planı (fgImg) çiz
    ctx.drawImage(fgImg, rect.x, rect.y, rect.w, rect.h);
    
    // Arka yüz buzlu cam efekti
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    
    ctx.restore();
}

function agSenkronizeEt(action, p1 = null, p2 = null, bgStr = null, fgStr = null, rect = null) {
    if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
        if (action === 'basla' && bgStr && fgStr) {
            const chunkSize = 16000;
            
            // BG Gönder
            let bgId = 'bg_' + Date.now();
            let totalBg = Math.ceil(bgStr.length / chunkSize);
            for (let i = 0; i < totalBg; i++) {
                window.sendNetworkData({
                    type: 'katlama_basla_chunk', imgId: bgId,
                    chunk: bgStr.substring(i * chunkSize, (i + 1) * chunkSize),
                    index: i, total: totalBg, rect: rect, isBg: true
                });
            }
            
            // FG Gönder
            let fgId = 'fg_' + Date.now();
            let totalFg = Math.ceil(fgStr.length / chunkSize);
            for (let i = 0; i < totalFg; i++) {
                window.sendNetworkData({
                    type: 'katlama_basla_chunk', imgId: fgId,
                    chunk: fgStr.substring(i * chunkSize, (i + 1) * chunkSize),
                    index: i, total: totalFg, rect: rect, isFg: true
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
