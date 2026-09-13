// --- cokgen.js (Ã‡okgen AracÄ± MantÄ±ÄŸÄ±) ---

window.PolygonTool = {
    // --- TEMEL DURUM ---
    toolElement: null, // Kanvas Ã¼zerine eklenen Ã§okgenin ana taÅŸÄ±yÄ±cÄ±sÄ± (gerekirse)
    
    // GeÃ§ici Ã§izim durumu
    state: {
        x: 0, 
        y: 0, 
        sideCount: 0, // KaÃ§ kenarlÄ± (3, 4, 5, 6, 7 veya 0=Ã‡ember)
        radius: 0,    // KÃ¶ÅŸe noktasÄ±na olan uzaklÄ±k (Poligonlar iÃ§in) veya YarÄ±Ã§ap (Ã‡ember iÃ§in)
        angle: 0,     // DÃ¶ndÃ¼rme aÃ§Ä±sÄ± (derece)
        isDrawing: false, // Ä°lk tÄ±klama yapÄ±ldÄ± mÄ±?
        isDrawingCircle: false, // Ã‡ember Ã§iziminde merkez tÄ±klandÄ± mÄ±?
    },
    
    // EtkileÅŸim durumu
    interactionMode: 'none', // 'dragging', 'rotating', 'resizing'
    startPos: { x: 0, y: 0 },
    startState: {}, 
    
    // --- SABÄ°TLER ---
    PI_VALUE: 3, // Hesaplamalar iÃ§in sabit Pi deÄŸeri
    PIXELS_PER_CM: 30, // cm hesaplamasÄ± iÃ§in (app.js ile uyumlu)
    
    // --- Ã‡OKGEN NOKTALARI VE HESAPLAMA ---
    
    // Merkez (Center), KÃ¶ÅŸe (Vertex) koordinatlarÄ±nÄ± hesaplar
    calculateVertices: function(center, radius, sideCount, angle) {
        const vertices = [];
        const rotationRad = angle * (Math.PI / 180);
        
        for (let i = 0; i < sideCount; i++) {
            // DÃ¼zgÃ¼n Ã§okgenler iÃ§in her kÃ¶ÅŸe arasÄ±ndaki aÃ§Ä± (dÄ±ÅŸ aÃ§Ä±)
            const angleRad = (i * 2 * Math.PI / sideCount) + rotationRad;
            
            vertices.push({
                x: center.x + radius * Math.cos(angleRad),
                y: center.y + radius * Math.sin(angleRad)
            });
        }
        return vertices;
    },
    
    // --- Ã‡Ä°ZÄ°M MANTIKLARI (app.js'e gÃ¶nderilecek) ---
    
    // GeÃ§ici Ã¶nizlemeyi Ã§izer (Åu an kullanÄ±lmÄ±yor, app.js mousemove'da yapÄ±labilir)
    drawPreview: function(pos) {
        // Bu kÄ±sÄ±m boÅŸ bÄ±rakÄ±ldÄ±, app.js'in mousemove'u ile uyum saÄŸlamasÄ± iÃ§in
    },

    // KalÄ±cÄ± Ã§izimi baÅŸlatÄ±r/sonlandÄ±rÄ±r
    handleDrawClick: function(pos, type) {
        
        // TemizliÄŸi garanti et
        this.state.isDrawing = false;
        // this.state.isDrawingCircle = false; // (Bu satÄ±rÄ±n SÄ°LÄ°NMÄ°Å olduÄŸundan emin ol)
        this.tempPoints = [];
        
        // Ã‡okgen tipini ayarla
        this.state.sideCount = type; 
        
        // GeÃ§ici noktalarÄ± tut (Merkezi 'null' olarak baÅŸlat)
        window.tempPolygonData = {
            center: null, // <-- KRÄ°TÄ°K DÃœZELTME: 'pos' DEÄÄ°L, 'null'
            type: type,
            color: window.currentLineColor,
        };
    },
    
    // Ã‡izimi tamamlar ve app.js'e kaydeder (Ã‡ember ve DÃ¼zgÃ¼n Ã‡okgenler iÃ§in 2. TÄ±klama)
    finalizeDraw: function(radius, rotation) { 
        if (!window.tempPolygonData) return;
        
        const center = window.tempPolygonData.center;
        const type = window.tempPolygonData.type; 
        
        if (radius < 5) {
             this.state.isDrawing = false;
             window.tempPolygonData = null;
             return; 
        }

        const mainCanvas = document.querySelector('canvas');
        const rect = mainCanvas.getBoundingClientRect();
        
        const centerOnCanvas = {
            x: center.x,
            y: center.y
        };
        
        if (window.drawnStrokes && window.redrawAllStrokes) {
            
            const centerLabel = window.nextPointChar;
            window.nextPointChar = window.advanceChar(centerLabel);

            window.drawnStrokes.push({
                type: 'polygon',
                subType: 'regular',
                sideCount: type,
                center: centerOnCanvas,
                radius: radius, 
                rotation: rotation, 
                color: window.currentLineColor, // <-- KRÄ°TÄ°K EKLENTÄ° (Renk)
                width: 4, // <-- KRÄ°TÄ°K EKLENTÄ° (KalÄ±nlÄ±k)
                fillColor: 'rgba(0, 0, 0, 0.2)', 
                label: centerLabel
            });
            
            window.redrawAllStrokes();
        }
        
        this.state.isDrawing = false;
        window.tempPolygonData = null;
    },
    
    // Ã‡ember Ã§izimini tamamlar (2. TÄ±klama)
    finalizeCircle: function(radius) { 
        if (!window.tempPolygonData) return;
        
        const center = window.tempPolygonData.center;

        if (radius < 5) {
             
             window.tempPolygonData = null;
             return; 
        }

        const mainCanvas = document.querySelector('canvas');
        const rect = mainCanvas.getBoundingClientRect();
        
        const centerOnCanvas = {
            x: center.x,
            y: center.y
        };
        
        if (window.drawnStrokes && window.redrawAllStrokes) {
            const centerLabel = window.nextPointChar;
            window.nextPointChar = window.advanceChar(centerLabel);
            
            window.drawnStrokes.push({
                type: 'arc', 
                cx: centerOnCanvas.x,
                cy: centerOnCanvas.y,
                radius: radius, 
                startAngle: 0,
                endAngle: 359.99, 
                color: window.currentLineColor, // <-- KRÄ°TÄ°K EKLENTÄ° (Renk)
                width: 4, // <-- KRÄ°TÄ°K EKLENTÄ° (KalÄ±nlÄ±k)
                label: centerLabel
            });
            
            window.redrawAllStrokes();
        }
       
        window.tempPolygonData = null;
    },
    
    getRotateHandlePosition: function(polygon) {
        const radius = polygon.radius + 35; // KÃ¶ÅŸenin biraz daha dÄ±ÅŸÄ±nda
        const angleRad = polygon.rotation * (Math.PI / 180); 
        return {
            x: polygon.center.x + radius * Math.cos(angleRad),
            y: polygon.center.y + radius * Math.sin(angleRad)
        };
    },

    getResizeHandlePosition: function(polygon) {
        const radius = polygon.radius + 15; // KÃ¶ÅŸenin hemen dÄ±ÅŸÄ±nda
        const angleRad = polygon.rotation * (Math.PI / 180); 
        return {
            x: polygon.center.x + radius * Math.cos(angleRad),
            y: polygon.center.y + radius * Math.sin(angleRad)
        };
    },

// 1. Ã‡EMBER HESAPLAMALARI (Pi = 3)
    getCircleInfo: function(radius) {
        const r_cm = (radius / (this.PIXELS_PER_CM || 30)).toFixed(1);
        
        // Ã‡evre = 2 * pi * r
        const circumference = (2 * this.PI_VALUE * r_cm).toFixed(1); 
        // Alan = pi * r^2
        const area = (this.PI_VALUE * r_cm * r_cm).toFixed(1);
        
        return `YarÄ±Ã§ap: ${r_cm} cm\nÃ‡evre: ${circumference} cm\nAlan: ${area} cmÂ²`;
    },

    // 2. KENAR UZUNLUÄU HESAPLAMA
    getEdgeLength: function(v1, v2) {
        const dist_px = Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
        const dist_cm = (dist_px / (this.PIXELS_PER_CM || 30)).toFixed(1);
        return `${dist_cm} cm`;
    },

    // 3. Ä°Ã‡ AÃ‡I HESAPLAMA
    getInternalAngle: function(sideCount) {
        if (sideCount < 3) return "0Â°";
        const angle = ((sideCount - 2) * 180) / sideCount;
        return `${angle.toFixed(0)}Â°`;
    }

   };
// AraÃ§ kullanÄ±ma hazÄ±r olana kadar baÅŸlatma
// init() fonksiyonu ÅŸu an iÃ§in gerekli deÄŸil, doÄŸrudan mantÄ±ÄŸÄ± app.js'e entegre edeceÄŸiz.