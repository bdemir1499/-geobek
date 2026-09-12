// AkÄ±llÄ± Katlama v3.1 - Geobek
// Ã‡apraz Katlama, Arka Plan / Ã–n Plan AyrÄ±mÄ± ve GerÃ§ek ZamanlÄ± Senkronizasyon

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

// AÄŸ parÃ§alama (chunking) iÃ§in ID
let syncImgId = null;

function screenToCanvasCoords(screenObj) {
    const canvasElm = document.getElementById('drawing-canvas');
    if (!canvasElm) return screenObj;
    
    // AÄ SENKRONÄ°ZASYONU Ä°Ã‡Ä°N NÄ°HAÄ° KUSURSUZ Ã‡Ã–ZÃœM:
    // Geobek, PC ve Tablet'te resmi farklÄ± x,y noktalarÄ±na merkezler. 
    // Bu yÃ¼zden koordinatlarÄ± ekranÄ±n sol Ã¼st kÃ¶ÅŸesine gÃ¶re deÄŸil, 
    // ARKA PLAN RESMÄ°NE (Zemine) gÃ¶re hesaplamalÄ±yÄ±z!
    const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
    const dpr = window.devicePixelRatio || 1;
    
    if (myBg && myBg.width > 0) {
        // Ã‡izim tuvalindeki deÄŸerler dpr ile Ã§arpÄ±lmÄ±ÅŸ halde tutuluyor, bu yÃ¼zden dpr'a bÃ¶lerek CSS piksellerini buluyoruz:
        const bgX = myBg.x / dpr;
        const bgY = myBg.y / dpr;
        const bgW = myBg.width / dpr;
        const bgH = myBg.height / dpr;
        
        let netObj = {
            relX: (screenObj.x - bgX) / bgW,
            relY: (screenObj.y - bgY) / bgH,
            isRel: true
        };
        if (screenObj.w !== undefined) {
            netObj.relW = screenObj.w / bgW;
            netObj.relH = screenObj.h / bgH;
        }
        return netObj;
    } else {
        // Arka plan yoksa, zorunlu olarak doÄŸrudan CSS piksellerini gÃ¶nder
        let netObj = { x: screenObj.x, y: screenObj.y, isRel: false };
        if (screenObj.w !== undefined) {
            netObj.w = screenObj.w;
            netObj.h = screenObj.h;
        }
        return netObj;
    }
}

function canvasToScreenCoords(networkObj) {
    const canvasElm = document.getElementById('drawing-canvas');
    if (!canvasElm) return networkObj;
    
    const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
    const dpr = window.devicePixelRatio || 1;
    
    if (networkObj.isRel && myBg && myBg.width > 0) {
        const bgX = myBg.x / dpr;
        const bgY = myBg.y / dpr;
        const bgW = myBg.width / dpr;
        const bgH = myBg.height / dpr;
        
        let screenObj = {
            x: bgX + (networkObj.relX * bgW),
            y: bgY + (networkObj.relY * bgH)
        };
        if (networkObj.relW !== undefined) {
            screenObj.w = networkObj.relW * bgW;
            screenObj.h = networkObj.relH * bgH;
        }
        return screenObj;
    } else {
        let screenObj = { x: networkObj.x || 0, y: networkObj.y || 0 };
        if (networkObj.w !== undefined) {
            screenObj.w = networkObj.w;
            screenObj.h = networkObj.h;
        }
        return screenObj;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Katla Butonunu Ekle
    // (KaldÄ±rÄ±ldÄ±)
    // 1. Katla Butonunu CanlandÄ±r MenÃ¼sÃ¼ne Ekle
    const katlaBtn = document.createElement('button');
    katlaBtn.id = 'btn-katla';
    katlaBtn.className = 'tool-button-sub';
    katlaBtn.title = 'AkÄ±llÄ± Katlama';
    katlaBtn.innerHTML = 'Katla âœ‚ï¸';
    
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

    // 1.5. Geobek araÃ§ deÄŸiÅŸimini dinleyip Katla'yÄ± kapatma (BaÅŸka araca geÃ§ilirse Katla iptal olsun)
    if (typeof window.setActiveTool === 'function' && !window.katlaHooked) {
        const originalSetActiveTool = window.setActiveTool;
        window.setActiveTool = function(toolId) {
            if (toolId !== 'none' && toolId !== 'snapshot' && window.isKatlaActive) {
                // KullanÄ±cÄ± katlamayÄ± bitirmeden (Ã¶rn: Serbest Kesim) baÅŸka araca geÃ§erse, otomatik olarak 'KatlanmÄ±ÅŸ BÄ±rak' yap.
                if (typeof foldStart !== 'undefined' && foldStart && typeof foldCurrent !== 'undefined' && foldCurrent) {
                    katlanmisBirak(foldStart, foldCurrent);
                    if (typeof agSenkronizeEt === 'function') agSenkronizeEt('iptal');
                }
                iptalEt();
            }
            originalSetActiveTool(toolId);
        };
        window.katlaHooked = true;
    }

    if (typeof seffafBtn !== 'undefined') {
        seffafBtn.addEventListener('click', () => {
            if (!window.isKatlaActive && typeof window.setActiveTool === 'function') {
                window.setActiveTool('snapshot');
            }
            window.isKatlaActive = !window.isKatlaActive;
            window.isKatlaSeffaf = window.isKatlaActive;
            
            if (window.isKatlaActive) {
                seffafBtn.classList.add('btn-katla-active');
                katlaBtn.classList.remove('btn-katla-active');
                document.body.classList.add('katla-active');
                if (typeof window.setActiveTool === 'function') window.setActiveTool('none');
            } else {
                iptalEt();
            }
        });
    }

    katlaBtn.addEventListener('click', () => {
        window.isKatlaSeffaf = false;
        if (typeof seffafBtn !== 'undefined') {
            seffafBtn.classList.remove('btn-katla-active');
        }
        if (!window.isKatlaActive && typeof window.setActiveTool === 'function') {
            window.setActiveTool('snapshot');
        }
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

    // 3. EtkileÅŸimler (Kutu Ã‡izimi)
    document.addEventListener('pointerdown', (e) => {
        if (!window.isKatlaActive || e.target.closest('.ui-container') || e.target.closest('.panel') || e.target.closest('.katlama-ui')) return;
        
        // EÄŸer zaten katlama ekranÄ±ndaysak, katlama hareketini baÅŸlat
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
            // KULLANICI Ä°STEÄÄ°: Kalemi kaldÄ±rdÄ±ÄŸÄ± an onay beklemeden doÄŸrudan katlanmÄ±ÅŸ bÄ±rak ve art arda katlama iÃ§in sÄ±fÄ±rla!
            if (foldStart && foldCurrent) {
                katlanmisBirak(foldStart, foldCurrent);
                if (typeof agSenkronizeEt === 'function') agSenkronizeEt('iptal');
                // Art arda katlama yapabilmesi iÃ§in tool'u kapatmadan sadece overlay'i sÄ±fÄ±rla
                sifirlaKatlama();
            } else {
                iptalEt();
            }
            return;
        }

        if (!isDrawingBox || !currentBox) return;
        e.stopPropagation();
        isDrawingBox = false;
        
        const rect = currentBox.getBoundingClientRect();
        currentBox.remove();
        currentBox = null;

        if (rect.width < 50 || rect.height < 50) return;

        // Html2Canvas yerine anÄ±nda Canvas Cropping kullanÄ±yoruz (Ã‡ok daha performanslÄ± ve KatmanlarÄ± ayÄ±rabiliyoruz!)
        const canvasElm = document.getElementById('drawing-canvas');
        const bgCanvas = document.getElementById('bg-canvas');
        if (!canvasElm) return;

        try {
            const tempBg = document.createElement('canvas');
            tempBg.width = rect.width; tempBg.height = rect.height;
            const tempFg = document.createElement('canvas');
            tempFg.width = rect.width; tempFg.height = rect.height;

            const canvasRect = canvasElm.getBoundingClientRect();
            // CROP FIX: Zoom ve Pan durumlarÄ±nda doÄŸru pikseli almak iÃ§in dpr yerine gerÃ§ek canvas oranÄ±nÄ± (scaleX/Y) kullanÄ±yoruz!
            const scaleX = canvasElm.width / canvasRect.width;
            const scaleY = canvasElm.height / canvasRect.height;
            
            const sx = (rect.left - canvasRect.left) * scaleX;
            const sy = (rect.top - canvasRect.top) * scaleY;
            const sw = rect.width * scaleX;
            const sh = rect.height * scaleY;

            // AKILLI BAKMA (Smart Sampling): Zemin rengini bulmak iÃ§in kutunun 5px dÄ±ÅŸÄ±ndan 4 farklÄ± noktaya bak!
            let detectedBgColor = document.body.style.backgroundColor || '#ffffff';
            try {
                const ctxD = canvasElm.getContext('2d');
                const pts = [
                    { x: rect.left + rect.width / 2, y: rect.top - 5 }, // Ãœst orta
                    { x: rect.left + rect.width / 2, y: rect.top + rect.height + 5 }, // Alt orta
                    { x: rect.left - 5, y: rect.top + rect.height / 2 }, // Sol orta
                    { x: rect.left + rect.width + 5, y: rect.top + rect.height / 2 } // SaÄŸ orta
                ];
                
                for (let pt of pts) {
                    const sx_s = (pt.x - canvasRect.left) * scaleX * dpr;
                    const sy_s = (pt.y - canvasRect.top) * scaleY * dpr;
                    if (sx_s >= 0 && sx_s < canvasElm.width && sy_s >= 0 && sy_s < canvasElm.height) {
                        const p = ctxD.getImageData(sx_s, sy_s, 1, 1).data;
                        if (p[3] > 250) { 
                            detectedBgColor = `rgba(${p[0]}, ${p[1]}, ${p[2]}, 1)`;
                            break;
                        } else if (bgCanvas) {
                            const bgP = bgCanvas.getContext('2d').getImageData(sx_s, sy_s, 1, 1).data;
                            if (bgP[3] > 250) {
                                detectedBgColor = `rgba(${bgP[0]}, ${bgP[1]}, ${bgP[2]}, 1)`;
                                break;
                            }
                        }
                    }
                }
            } catch (e) {
                console.warn("AkÄ±llÄ± renk okuma baÅŸarÄ±sÄ±z:", e);
            }

            // ZEMÄ°NÄ° (Delik kÄ±smÄ±nÄ±) AKILLI RENK Ä°LE DOLDUR
            tempBg.getContext('2d').fillStyle = detectedBgColor;
            tempBg.getContext('2d').fillRect(0, 0, rect.width, rect.height);
            // PDF vs. Ã§izmeyi iptal ediyoruz Ã§Ã¼nkÃ¼ kullanÄ±cÄ± "o renge boyasÄ±n" dedi, yani DÃœZ RENK istiyor!
            
            // OPAQUE FLAP: KaÄŸÄ±dÄ±n arkasÄ±nÄ± gÃ¶rebilmemiz iÃ§in ÅŸeffaf deÄŸil, opak olmasÄ± lazÄ±m!
            // Zemin rengini kaÄŸÄ±dÄ±n bazÄ± olarak alÄ±yoruz (beyaz/akÄ±llÄ± renk):
            tempFg.getContext('2d').fillStyle = detectedBgColor;
            tempFg.getContext('2d').fillRect(0, 0, rect.width, rect.height);
            
            // EÄŸer varsa, PDF kalÄ±ntÄ±larÄ±nÄ± (veya arka planÄ±) yapraÄŸa bas (sadece yaprakta kalsÄ±n)
            if (bgCanvas) {
                tempFg.getContext('2d').drawImage(bgCanvas, sx, sy, sw, sh, 0, 0, rect.width, rect.height);
            }
            // Sonra Ã¼zerine Ã§izimleri ekliyoruz:
            tempFg.getContext('2d').drawImage(canvasElm, sx, sy, sw, sh, 0, 0, rect.width, rect.height);

            const bgStr = tempBg.toDataURL('image/png');
            const fgStr = tempFg.toDataURL('image/png');
            
            currentCaptureRect = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

            // Ä°ki resmi paralel yÃ¼kle
            Promise.all([
                new Promise(res => { currentBgImg = new Image(); currentBgImg.onload = res; currentBgImg.src = bgStr; }),
                new Promise(res => { currentFgImg = new Image(); currentFgImg.onload = res; currentFgImg.src = fgStr; })
            ]).then(() => {
                baslatKatlamaEkrani();
                agSenkronizeEt('basla', null, null, bgStr, fgStr, currentCaptureRect);
            });
        } catch (err) {
            console.error("Kesim hatasÄ±:", err);
        }
    }, { capture: true });

    // 4. AÄŸ Dinleyicisi (PC veya diÄŸer tabletler iÃ§in)
    window.addEventListener('katlama_sistemi', (e) => {
        const d = e.detail;
        // YANKI (ECHO) KORUMASI: Kendi gÃ¶nderdiÄŸimiz veriyi iÅŸlemeyiz!
        if (!d || (d.senderId && window.mySessionId && d.senderId === window.mySessionId)) return;
        
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
                        currentCaptureRect = canvasToScreenCoords(d.rect);
                        // Fg (Ã¶n plan) en son gelir, gelince ekranÄ± baÅŸlat
                        baslatKatlamaEkrani(true); 
                    };
                    currentFgImg.src = fullImg;
                }
            }
        }
        else if (d.type === 'katlama_guncelle') {
            if (katlamaOverlayCanvas) {
                cizKatlamaAnimasyonu(currentBgImg, currentFgImg, currentCaptureRect, canvasToScreenCoords(d.foldStart), canvasToScreenCoords(d.foldCurrent));
            }
        }
        else if (d.type === 'katlama_iptal') {
            iptalEt(true);
        }
        else if (d.type === 'katlama_tamamla') {
            katIziBirak(canvasToScreenCoords(d.foldStart), canvasToScreenCoords(d.foldCurrent));
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
    
    const dpr = window.devicePixelRatio || 1;
    katlamaOverlayCanvas.width = window.innerWidth * dpr;
    katlamaOverlayCanvas.height = window.innerHeight * dpr;
    
    // PDF ve diÄŸer nesnelerin altÄ±nda kalmamasÄ± iÃ§in css z-index ayarÄ±:
    katlamaOverlayCanvas.style.position = 'absolute';
    katlamaOverlayCanvas.style.top = '0';
    katlamaOverlayCanvas.style.left = '0';
    katlamaOverlayCanvas.style.width = window.innerWidth + 'px';
    katlamaOverlayCanvas.style.height = window.innerHeight + 'px';
    katlamaOverlayCanvas.style.zIndex = '10000';
    katlamaOverlayCanvas.style.pointerEvents = 'auto';
    katlamaOverlayCanvas.style.touchAction = 'none';
    
    document.body.appendChild(katlamaOverlayCanvas);
    katlamaOverlayCtx = katlamaOverlayCanvas.getContext('2d');
    katlamaOverlayCtx.scale(dpr, dpr);

    // Ä°lk anda hiÃ§bir ÅŸey Ã§izmene gerek yok, Ã§Ã¼nkÃ¼ alttaki canvaslar zaten gÃ¶steriyor.
    // KullanÄ±cÄ± ekrana dokunup hareket ettirdiÄŸinde cizKatlamaAnimasyonu Ã§aÄŸrÄ±lacak.
    // DÄ°KKAT: Yeni UI kurallarÄ± gereÄŸi, onay ekranÄ± (.katlama-ui) oluÅŸturulmuyor. 
    // Katlama doÄŸrudan pointerup ile uygulanacak.
}

function sifirlaKatlama() {
    if (katlamaOverlayCanvas) {
        katlamaOverlayCanvas.remove();
        katlamaOverlayCanvas = null;
    }
    currentBgImg = null;
    currentFgImg = null;
    currentCaptureRect = null;
    foldStart = null;
    foldCurrent = null;
    isFolding = false;
    isDrawingBox = false;
    if (currentBox) {
        currentBox.remove();
        currentBox = null;
    }
}

function iptalEt(isRemote = false) {
    window.isKatlaActive = false;
    const katlaBtn = document.getElementById('btn-katla');
    if (katlaBtn) katlaBtn.classList.remove('btn-katla-active');
    const seffafBtn = document.getElementById('btn-seffaf-katla');
    if (seffafBtn) seffafBtn.classList.remove('btn-katla-active');
    window.isKatlaSeffaf = false;
    document.body.classList.remove('katla-active');

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
    
    // GÃœVENLÄ°K (KÄ°LÄ°TLENMEYÄ° Ã–NLEME): Katlama iÅŸlemi bittiÄŸinde veya iptal edildiÄŸinde state deÄŸiÅŸkenlerini sÄ±fÄ±rla.
    // Aksi halde pointerup event'leri e.stopPropagation() ile yutulur ve "tÃ¼m butonlar kilitlenir".
    isFolding = false;
    isDrawingBox = false;
    if (currentBox) {
        currentBox.remove();
        currentBox = null;
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

    let lineStartX = midX + nx * 1000;
    let lineStartY = midY + ny * 1000;
    let lineEndX = midX - nx * 1000;
    let lineEndY = midY - ny * 1000;

    // KESÄ°N Ã‡Ã–ZÃœM: Kat izini sadece seÃ§ili alanÄ±n (currentCaptureRect) iÃ§inde kalacak ÅŸekilde sÄ±nÄ±rla!
    if (currentCaptureRect) {
        const left = currentCaptureRect.x;
        const right = currentCaptureRect.x + currentCaptureRect.w;
        const top = currentCaptureRect.y;
        const bottom = currentCaptureRect.y + currentCaptureRect.h;

        let points = [];
        
        // 1. Sol kenar kesiÅŸimi (x = left)
        if (nx !== 0) {
            let t = (left - midX) / nx;
            let y = midY + ny * t;
            if (y >= top && y <= bottom) points.push({x: left, y: y});
        }
        // 2. SaÄŸ kenar kesiÅŸimi (x = right)
        if (nx !== 0) {
            let t = (right - midX) / nx;
            let y = midY + ny * t;
            if (y >= top && y <= bottom) points.push({x: right, y: y});
        }
        // 3. Ãœst kenar kesiÅŸimi (y = top)
        if (ny !== 0) {
            let t = (top - midY) / ny;
            let x = midX + nx * t;
            if (x >= left && x <= right) points.push({x: x, y: top});
        }
        // 4. Alt kenar kesiÅŸimi (y = bottom)
        if (ny !== 0) {
            let t = (bottom - midY) / ny;
            let x = midX + nx * t;
            if (x >= left && x <= right) points.push({x: x, y: bottom});
        }

        // AynÄ± noktalarÄ± temizle (kÃ¶ÅŸelerden geÃ§erse Ã§ift nokta Ã§Ä±kabilir)
        let uniquePoints = [];
        for (let p of points) {
            if (!uniquePoints.some(up => Math.abs(up.x - p.x) < 0.1 && Math.abs(up.y - p.y) < 0.1)) {
                uniquePoints.push(p);
            }
        }

        if (uniquePoints.length === 2) {
            lineStartX = uniquePoints[0].x;
            lineStartY = uniquePoints[0].y;
            lineEndX = uniquePoints[1].x;
            lineEndY = uniquePoints[1].y;
        } else {
            return; // EÄŸer Ã§izgi kutunun dÄ±ÅŸÄ±ndaysa (veya kesiÅŸmiyorsa) hiÃ§ iz Ã§izme!
        }
    }

    // Ã‡izgiyi sisteme stroke olarak ekle
    if (window.drawnStrokes) {
        const dpr = window.devicePixelRatio || 1;
        const bgLayerObj = {
            type: 'segment',
            p1: {x: lineStartX * dpr, y: lineStartY * dpr},
            p2: {x: lineEndX * dpr, y: lineEndY * dpr},
            color: '#aaaaaa',
            width: 3 * dpr, // Ã‡izgi kalÄ±nlÄ±ÄŸÄ±nÄ± da dpr ile Ã§arpalÄ±m ki tablette ince kalmasÄ±n
            label1: '',
            label2: '',
            id: Date.now() + Math.random()
        };
        window.drawnStrokes.push(bgLayerObj);
        if (typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
}

function katlanmisBirak(p1, p2) {
    if (!katlamaOverlayCanvas || !window.drawnStrokes) return;
    
    let cropX = 0;
    let cropY = 0;
    let cropW = window.innerWidth;
    let cropH = window.innerHeight;

    // KÄ±rpma alanÄ± hesapla: Orijinal kutu ve katlama eksenine gÃ¶re yansÄ±masÄ±nÄ±n sÄ±nÄ±rlarÄ±nÄ± bul
    if (currentCaptureRect && p1 && p2) {
        const reflectPoint = (x, y, pA, pB) => {
            const dx = pB.x - pA.x;
            const dy = pB.y - pA.y;
            const a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
            const b = 2 * dx * dy / (dx * dx + dy * dy);
            return {
                x: a * (x - pA.x) + b * (y - pA.y) + pA.x,
                y: b * (x - pA.x) - a * (y - pA.y) + pA.y
            };
        };

        const r = currentCaptureRect;
        const pts = [
            {x: r.x, y: r.y}, {x: r.x + r.w, y: r.y},
            {x: r.x + r.w, y: r.y + r.h}, {x: r.x, y: r.y + r.h}
        ];

        for (let i = 0; i < 4; i++) {
            pts.push(reflectPoint(pts[i].x, pts[i].y, p1, p2));
        }

        let minX = Math.min(...pts.map(p => p.x));
        let maxX = Math.max(...pts.map(p => p.x));
        let minY = Math.min(...pts.map(p => p.y));
        let maxY = Math.max(...pts.map(p => p.y));

        minX = Math.floor(Math.max(0, minX - 20)); // Padding
        minY = Math.floor(Math.max(0, minY - 20));
        maxX = Math.ceil(Math.min(window.innerWidth, maxX + 20));
        maxY = Math.ceil(Math.min(window.innerHeight, maxY + 20));

        cropX = minX;
        cropY = minY;
        cropW = maxX - minX;
        cropH = maxY - minY;
    }

    // YENÄ°: Sadece katlanan bÃ¶lgeyi (crop box) kapsayan minik bir canvas oluÅŸtur
    const dpr = window.devicePixelRatio || 1;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropW * dpr;
    cropCanvas.height = cropH * dpr;
    const cCtx = cropCanvas.getContext('2d');
    cCtx.scale(dpr, dpr);
    
    // TÃ¼m ekranÄ± Ã§iz ama -cropX ve -cropY ofseti ile kaydÄ±r, bÃ¶ylece sadece istediÄŸimiz alan canvas'a sÄ±ÄŸar
    cCtx.drawImage(katlamaOverlayCanvas, -cropX, -cropY, window.innerWidth, window.innerHeight);
    const dataUrl = cropCanvas.toDataURL('image/png');

    // Resim yamasÄ± (patch) oluÅŸtur
    const patchObj = { 
        type: 'image', imgData: dataUrl, 
        x: cropX * dpr, 
        y: cropY * dpr, 
        width: cropW * dpr, 
        height: cropH * dpr, 
        rotation: 0, 
        isBackground: false, 
        isPatch: true,
        foldLine: [{x: p1.x * dpr, y: p1.y * dpr}, {x: p2.x * dpr, y: p2.y * dpr}],
        id: Date.now() + Math.random().toString() 
    };
    
    // Geobek Ã§izim geÃ§miÅŸine ekle
    window.drawnStrokes.push(patchObj);
    
    // DiÄŸer cihazlarla senkronize et
    if (typeof window.sendNetworkData === 'function') {
        window.sendNetworkData({ type: 'yeni_cizim', stroke: patchObj });
    }
    
    // EkranÄ± tazele
    if (typeof window.redrawAllStrokes === 'function') {
        window.redrawAllStrokes();
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

function cizKatlamaAnimasyonu(bgImg, fgImg, rect, foldStart, foldCurrent) {
    if (!katlamaOverlayCtx) return;
    const ctx = katlamaOverlayCtx;
    const cw = katlamaOverlayCanvas.width;
    const ch = katlamaOverlayCanvas.height;

    ctx.clearRect(0, 0, cw, ch);
    
    const dx = foldCurrent.x - foldStart.x;
    const dy = foldCurrent.y - foldStart.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 1) {
        ctx.drawImage(fgImg, rect.x, rect.y, rect.w, rect.h);
        return;
    }

    const midX = foldStart.x + dx / 2;
    const midY = foldStart.y + dy / 2;
    const nx = dx / dist;
    const ny = dy / dist;
    const angle = Math.atan2(ny, nx);
    
    // 1. ZEMÄ°N (Delik / P1 TarafÄ±)
    ctx.save();
    ctx.beginPath();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(-cw*2, -ch*2, cw*2, ch*4); // P1 (kalkan kÄ±sÄ±m boÅŸluÄŸu)
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);
    ctx.drawImage(bgImg, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();

    // 2. KATLANAN YAPRAK (Flap / P2 TarafÄ±)
    ctx.save();
    ctx.beginPath();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(0, -ch*2, cw*2, ch*4); // P2 (yapraÄŸÄ±n dÃ¼ÅŸtÃ¼ÄŸÃ¼ kÄ±sÄ±m)
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);

    // YansÄ±ma (Flip)
    const [a, b, c, d, tx, ty] = getReflectionMatrix(foldStart, foldCurrent);
    ctx.transform(a, b, c, d, tx, ty);
    
    // 3D GÃ¶lge (Katlanan yapraÄŸÄ±n havada durduÄŸunu belli eder)
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -nx * 10;
    ctx.shadowOffsetY = -ny * 10;
    
    ctx.drawImage(fgImg, rect.x, rect.y, rect.w, rect.h);
    
    // GÃ¶lgeyi kapat (sonraki Ã§izimleri etkilememesi iÃ§in)
    ctx.shadowColor = "transparent";
    
    // SÄ°YAH KUTU HATASI Ã‡Ã–ZÃœMÃœ: fillRect'in rengini vermediÄŸim iÃ§in varsayÄ±lan siyaha boyuyordu!
    // Arka yÃ¼z buzlu cam efekti (Sadece kaÄŸÄ±dÄ±n arka yÃ¼zeyine uygulanÄ±r)
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.globalCompositeOperation = 'source-over'; // Eski haline getir
    
    ctx.restore();
}

function agSenkronizeEt(action, p1 = null, p2 = null, bgStr = null, fgStr = null, rect = null) {
    if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
        let logicalP1 = p1 ? screenToCanvasCoords(p1) : null;
        let logicalP2 = p2 ? screenToCanvasCoords(p2) : null;
        let logicalRect = rect ? screenToCanvasCoords(rect) : null;

        if (action === 'basla' && bgStr && fgStr) {
            const chunkSize = 16000;
            
            // BG GÃ¶nder
            let bgId = 'bg_' + Date.now();
            let totalBg = Math.ceil(bgStr.length / chunkSize);
            for (let i = 0; i < totalBg; i++) {
                window.sendNetworkData({
                    type: 'katlama_basla_chunk', imgId: bgId,
                    chunk: bgStr.substring(i * chunkSize, (i + 1) * chunkSize),
                    index: i, total: totalBg, rect: logicalRect, isBg: true
                });
            }
            
            // FG GÃ¶nder
            let fgId = 'fg_' + Date.now();
            let totalFg = Math.ceil(fgStr.length / chunkSize);
            for (let i = 0; i < totalFg; i++) {
                window.sendNetworkData({
                    type: 'katlama_basla_chunk', imgId: fgId,
                    chunk: fgStr.substring(i * chunkSize, (i + 1) * chunkSize),
                    index: i, total: totalFg, rect: logicalRect, isFg: true
                });
            }
        } else {
            window.sendNetworkData({
                type: 'katlama_' + action,
                foldStart: logicalP1,
                foldCurrent: logicalP2
            });
        }
    }
}

