// Akıllı Katlama v2.0 - Geobek
window.isKatlaActive = false;

document.addEventListener('DOMContentLoaded', () => {
    // Katla Butonunu Ekle
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

    // Katla Stillerini Ekle
    const style = document.createElement('style');
    style.textContent = `
        #katla-box { position: absolute; border: 2px dashed #ff00ff; background: rgba(255,0,255,0.1); pointer-events: none; z-index: 9999; }
        .katla-active { cursor: crosshair !important; }
        .btn-katla-active { background-color: #ff00ff !important; color: white; }
        .fold-container { position: absolute; perspective: 1000px; transform-style: preserve-3d; z-index: 10000; display: flex; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .fold-half { width: 50%; height: 100%; overflow: hidden; position: relative; background: transparent; backface-visibility: visible; }
        .fold-half img { position: absolute; top: 0; }
        .fold-left { transform-origin: right center; }
        .fold-right { transform-origin: left center; right: 0; }
        .fold-left img { left: 0; }
        .fold-right img { right: 0; transform: translateX(-50%); }
        .fold-controls { position: absolute; top: -40px; left: 0; display: flex; gap: 5px; }
        .fold-controls button { padding: 5px 10px; background: #fff; border: 1px solid #ccc; cursor: pointer; border-radius: 4px; font-weight: bold; }
    `;
    document.head.appendChild(style);

    katlaBtn.addEventListener('click', () => {
        window.isKatlaActive = !window.isKatlaActive;
        if (window.isKatlaActive) {
            katlaBtn.classList.add('btn-katla-active');
            document.body.classList.add('katla-active');
            // Reset other tools by simulating a click on Move tool (or just resetting)
            const moveBtn = document.getElementById('btn-move') || document.querySelector('[title="Taşı"]');
            if (moveBtn) moveBtn.click();
        } else {
            katlaBtn.classList.remove('btn-katla-active');
            document.body.classList.remove('katla-active');
        }
    });

    let startX, startY, currentBox = null;
    let isDrawingBox = false;

    document.addEventListener('pointerdown', (e) => {
        if (!window.isKatlaActive || e.target.closest('.toolbar') || e.target.closest('.fold-container')) return;
        isDrawingBox = true;
        startX = e.clientX;
        startY = e.clientY;
        
        currentBox = document.createElement('div');
        currentBox.id = 'katla-box';
        currentBox.style.left = startX + 'px';
        currentBox.style.top = startY + 'px';
        document.body.appendChild(currentBox);
    });

    document.addEventListener('pointermove', (e) => {
        if (!isDrawingBox || !currentBox) return;
        const currentX = e.clientX;
        const currentY = e.clientY;
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);
        currentBox.style.width = width + 'px';
        currentBox.style.height = height + 'px';
        currentBox.style.left = Math.min(startX, currentX) + 'px';
        currentBox.style.top = Math.min(startY, currentY) + 'px';
    });

    document.addEventListener('pointerup', async (e) => {
        if (!isDrawingBox || !currentBox) return;
        isDrawingBox = false;
        
        const rect = currentBox.getBoundingClientRect();
        currentBox.remove();
        currentBox = null;

        if (rect.width < 50 || rect.height < 50) return; // Too small

        // Kapat aktifliği
        window.isKatlaActive = false;
        katlaBtn.classList.remove('btn-katla-active');
        document.body.classList.remove('katla-active');

        // html2canvas ile bölgeyi yakala
        if (typeof html2canvas === 'undefined') {
            alert('html2canvas kütüphanesi yüklenmedi!');
            return;
        }

        try {
            const canvas = await html2canvas(document.body, {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
                backgroundColor: null,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            createFoldableElement(rect, imgData);
            
            // Orijinal içeriği temizlemek için ana canvas'a beyaz veya arka plan renginde bir dikdörtgen çizebiliriz.
            // Fakat şimdilik sadece üzerine katlama modelini koyuyoruz.

        } catch (err) {
            console.error('Katlama hatası:', err);
        }
    });

    function createFoldableElement(rect, imgData) {
        const container = document.createElement('div');
        container.className = 'fold-container';
        container.style.left = rect.left + 'px';
        container.style.top = rect.top + 'px';
        container.style.width = rect.width + 'px';
        container.style.height = rect.height + 'px';

        const controls = document.createElement('div');
        controls.className = 'fold-controls';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerText = 'İptal / Sil';
        
        const unfoldBtn = document.createElement('button');
        unfoldBtn.innerText = 'Aç ve İz Bırak';

        controls.appendChild(closeBtn);
        controls.appendChild(unfoldBtn);
        container.appendChild(controls);

        const leftHalf = document.createElement('div');
        leftHalf.className = 'fold-half fold-left';
        const rightHalf = document.createElement('div');
        rightHalf.className = 'fold-half fold-right';

        const imgLeft = document.createElement('img');
        imgLeft.src = imgData;
        imgLeft.style.width = rect.width + 'px';
        imgLeft.style.height = rect.height + 'px';
        
        const imgRight = document.createElement('img');
        imgRight.src = imgData;
        imgRight.style.width = rect.width + 'px';
        imgRight.style.height = rect.height + 'px';

        leftHalf.appendChild(imgLeft);
        rightHalf.appendChild(imgRight);
        
        container.appendChild(leftHalf);
        container.appendChild(rightHalf);
        document.body.appendChild(container);

        // Katlama Etkileşimi (Fare/Parmak)
        let isFolding = false;
        let startFoldX = 0;
        
        rightHalf.addEventListener('pointerdown', (e) => {
            isFolding = true;
            startFoldX = e.clientX;
            e.stopPropagation();
        });

        document.addEventListener('pointermove', (e) => {
            if (!isFolding) return;
            const deltaX = startFoldX - e.clientX;
            // 0 ile 180 derece arası
            const angle = Math.max(0, Math.min(180, (deltaX / rect.width) * 360));
            
            // Sağ yarıyı sola doğru katla (Y ekseninde)
            rightHalf.style.transform = `rotateY(${-angle}deg)`;
            
            // Katlanmış hissi için gölge ekle
            const shadowIntensity = angle / 180;
            rightHalf.style.boxShadow = `inset ${shadowIntensity * 50}px 0 50px rgba(0,0,0,${shadowIntensity * 0.5})`;
        });

        document.addEventListener('pointerup', () => {
            isFolding = false;
        });

        closeBtn.addEventListener('click', () => {
            container.remove();
        });

        unfoldBtn.addEventListener('click', () => {
            // Animasyonla aç
            rightHalf.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            rightHalf.style.transform = 'rotateY(0deg)';
            rightHalf.style.boxShadow = 'none';

            setTimeout(() => {
                // Ana canvas'a kat izi çiz
                const mainCanvas = document.getElementById('drawing-canvas');
                if (mainCanvas) {
                    const ctx = mainCanvas.getContext('2d');
                    ctx.save();
                    ctx.beginPath();
                    // Kat izi tam ortada (X ekseninde dikey çizgi)
                    const foldX = rect.left + (rect.width / 2);
                    const foldY_top = rect.top;
                    const foldY_bottom = rect.top + rect.height;
                    
                    ctx.setLineDash([10, 10]); // Kesikli çizgi
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'; // Yarı saydam siyah
                    
                    ctx.moveTo(foldX, foldY_top);
                    ctx.lineTo(foldX, foldY_bottom);
                    ctx.stroke();
                    ctx.restore();
                }
                container.remove();
            }, 500);
        });
    }
});
