// 3D Åekillerin AÃ§Ä±nÄ±m (Katlama) MantÄ±ÄŸÄ± Ä°Ã§in Ek ModÃ¼l
window.Foldable3D = {
    createFoldableGroup: function(type, size, mainMaterial, edgeMaterial) {
        if (type === 'sphere') return null; // KÃ¼re iÃ§in aÃ§Ä±nÄ±m hesaplanmaz, normal Ã§izim iÃ§in null dÃ¶nÃ¼yoruz

        const group = new THREE.Group();
        group.userData.isFoldable = true;
        group.userData.shapeType = type;
        group.userData.baseSize = size;
        group.userData.hinges = []; // Katlanacak parÃ§alarÄ±n listesi

        // Ã–zel mesh oluÅŸturucu (edge Ã§izgileriyle birlikte)
        const createFaceMesh = (geometry) => {
            const mesh = new THREE.Mesh(geometry, mainMaterial);
            mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
            return mesh;
        };

        const createLabelMesh = (text, color, w, h) => {
            return new THREE.Group(); // Ä°steÄŸiniz Ã¼zerine etiketler kaldÄ±rÄ±ldÄ±
        };

        let faceCounter = 1;

        const height = size * 2;
        
        // SÄ°LÄ°NDÄ°R VE PRÄ°ZMALAR (Yan yÃ¼zeyler rulo gibi aÃ§Ä±lÄ±r)
        if (type.startsWith('prism_')) {
            let sides = 4;
            let heights = size * 2;
            let widths = [];
            let apothems = [];
            let isCustom = false;
            
            if (type === 'prism_cube') { 
                sides = 4; heights = size * 2; isCustom = true;
                const W = size * 2;
                widths = [W, W, W, W];
                apothems = [W/2, W/2, W/2, W/2];
            } else if (type === 'prism_square') { 
                sides = 4; heights = size * 3; isCustom = true;
                const W = size * 1.5; // Taban kare
                widths = [W, W, W, W];
                apothems = [W/2, W/2, W/2, W/2];
            } else if (type === 'prism_rect') { 
                sides = 4; heights = size * 2.2; isCustom = true;
                const W = size * 3; // Uzun kenar (Front/Back)
                const D = size * 1.5; // KÄ±sa kenar (Left/Right)
                widths = [W, D, W, D];
                apothems = [D/2, W/2, D/2, W/2];
            } else {
                let r = size;
                if (type === 'prism_3') sides = 3;
                if (type === 'prism_5') sides = 5;
                if (type === 'prism_6') sides = 6;
                if (type === 'prism_cylinder') sides = 32;

                const sideWidth = 2 * r * Math.sin(Math.PI / sides);
                const apothem = r * Math.cos(Math.PI / sides);
                for(let i=0; i<sides; i++) { widths.push(sideWidth); apothems.push(apothem); }
            }

            const angleStep = (Math.PI * 2) / sides;
            const root = new THREE.Group();
            group.add(root);
            
            let currentParent = root;

            for (let i = 0; i < sides; i++) {
                const hinge = new THREE.Group();
                const actualSideWidth = widths[i];

                if (i === 0) {
                    hinge.position.set(-actualSideWidth / 2, 0, apothems[i]); 
                    hinge.rotation.y = 0; 
                    root.add(hinge);
                } else {
                    hinge.position.set(widths[i-1], 0, 0); 
                    currentParent.add(hinge);
                    group.userData.hinges.push({ obj: hinge, maxAngle: 0, initialAngle: -angleStep, axis: 'y' });
                }
                
                const panelGeo = new THREE.PlaneGeometry(actualSideWidth, heights);
                panelGeo.translate(actualSideWidth / 2, 0, 0); 
                const panelMesh = createFaceMesh(panelGeo);
                hinge.add(panelMesh);
                
                const label = createLabelMesh(faceCounter.toString(), '#ffaaaa', actualSideWidth, Math.min(heights, actualSideWidth));
                label.position.set(actualSideWidth / 2, 0, 0);
                hinge.add(label);
                faceCounter++;

                currentParent = hinge;

                let attachIndex = isCustom ? 0 : Math.floor((sides - 1) / 2);
                if (i === attachIndex) {
                    // Ãœst kapak
                    const topHinge = new THREE.Group();
                    topHinge.position.set(actualSideWidth / 2, heights / 2, 0);
                    hinge.add(topHinge);
                    
                    let topGeo;
                    if (isCustom) {
                        const capW = widths[0]; // Front geniÅŸliÄŸi W
                        const capH = widths[1]; // Yan geniÅŸlik D
                        topGeo = new THREE.PlaneGeometry(capW, capH);
                        topGeo.translate(0, -capH / 2, 0); // Pivot'u alt kenara al
                        topGeo.rotateX(-Math.PI / 2); // YukarÄ±ya doÄŸru (Z eksenine) katla
                    } else {
                        let r = size;
                        if (type === 'prism_cylinder') {
                            topGeo = new THREE.CircleGeometry(r, sides);
                        } else {
                            topGeo = new THREE.CircleGeometry(r, sides, 0); 
                            topGeo.rotateZ(-Math.PI / 2 - Math.PI / sides); 
                        }
                        topGeo.rotateZ(Math.PI); 
                        topGeo.translate(0, -apothems[i], 0); 
                        topGeo.rotateX(-Math.PI / 2); 
                    }
                    const topMesh = createFaceMesh(topGeo);
                    topHinge.add(topMesh);
                    group.userData.hinges.push({ obj: topHinge, maxAngle: -Math.PI / 2, initialAngle: 0, axis: 'x' }); 
                    
                    const topLabel = createLabelMesh(faceCounter.toString() + " (ÃœST)", '#aaffaa', size*1.5, size*1.5);
                    topLabel.rotation.x = Math.PI / 2; 
                    topLabel.position.set(0, 0, 0);
                    topHinge.add(topLabel);
                    faceCounter++;

                    // Alt kapak
                    const bottomHinge = new THREE.Group();
                    bottomHinge.position.set(actualSideWidth / 2, -heights / 2, 0);
                    hinge.add(bottomHinge);
                    
                    let bottomGeo;
                    if (isCustom) {
                        const capW = widths[0]; // W
                        const capH = widths[1]; // D
                        bottomGeo = new THREE.PlaneGeometry(capW, capH);
                        bottomGeo.translate(0, capH / 2, 0); 
                        bottomGeo.rotateX(Math.PI / 2);
                    } else {
                        let r = size;
                        if (type === 'prism_cylinder') {
                            bottomGeo = new THREE.CircleGeometry(r, sides);
                        } else {
                            bottomGeo = new THREE.CircleGeometry(r, sides, 0);
                            bottomGeo.rotateZ(Math.PI / 2 - Math.PI / sides); 
                        }
                        bottomGeo.rotateZ(Math.PI); 
                        bottomGeo.translate(0, apothems[i], 0); 
                        bottomGeo.rotateX(Math.PI / 2); 
                    }
                    const bottomMesh = createFaceMesh(bottomGeo);
                    bottomHinge.add(bottomMesh);
                    group.userData.hinges.push({ obj: bottomHinge, maxAngle: Math.PI / 2, initialAngle: 0, axis: 'x' }); 

                    const bottomLabel = createLabelMesh(faceCounter.toString() + " (ALT)", '#aaaaff', size*1.5, size*1.5);
                    bottomLabel.rotation.x = -Math.PI / 2; 
                    bottomLabel.rotation.y = Math.PI; 
                    bottomLabel.position.set(0, 0, 0);
                    bottomHinge.add(bottomLabel);
                    faceCounter++;
                }
            }
            
            // AÃ§Ä±ldÄ±ÄŸÄ±nda ne kadar kaydÄ±rÄ±lacak?
            let totalWidth = widths.reduce((a, b) => a + b, 0);
            group.userData.shiftX = -totalWidth / 2 + widths[0]/2;
        } 
        // PÄ°RAMÄ°TLER (Yaprak gibi dÄ±ÅŸa doÄŸru aÃ§Ä±lÄ±r)
        else if (type.startsWith('pyramid_')) {
            let sides = 4;
            if (type === 'pyramid_3') sides = 3;
            if (type === 'pyramid_4') sides = 4;
            if (type === 'pyramid_5') sides = 5;
            if (type === 'pyramid_6') sides = 6;
            
            const r = size;
            const apothem = r * Math.cos(Math.PI / sides);
            const sideWidth = 2 * r * Math.sin(Math.PI / sides);
            const slantHeight = Math.sqrt(height * height + apothem * apothem);
            const inwardAngle = Math.atan2(apothem, height); // Ä°Ã§eri doÄŸru eÄŸim aÃ§Ä±sÄ±

            // Taban
            const baseGeo = new THREE.CircleGeometry(r, sides, Math.PI / sides);
            baseGeo.rotateX(-Math.PI / 2);
            const baseMesh = createFaceMesh(baseGeo);
            baseMesh.position.y = -height / 2;
            group.add(baseMesh);

            const baseLabel = createLabelMesh(faceCounter.toString() + " (ALT)", '#aaaaff', r*1.5, r*1.5);
            baseLabel.rotation.x = -Math.PI / 2;
            baseLabel.position.y = -height / 2;
            group.add(baseLabel);
            faceCounter++;

            // Yan Ã¼Ã§genler
            for (let i = 0; i < sides; i++) {
                const angle = (i * Math.PI * 2) / sides;
                const hinge = new THREE.Group();
                
                // MenteÅŸeyi taban kenarÄ±na yerleÅŸtir
                hinge.position.set(
                    Math.cos(angle) * apothem,
                    -height / 2,
                    -Math.sin(angle) * apothem
                );
                // Kenara dik bakmasÄ± iÃ§in y ekseni etrafÄ±nda dÃ¶ndÃ¼r (+90 derece ile local Z iÃ§eri bakar)
                hinge.rotation.order = 'YXZ'; // Ã–nce X (iÃ§eri eÄŸilme), sonra Y (yÃ¶nelme) uygulanmalÄ±
                hinge.rotation.y = angle + Math.PI / 2;
                
                const triGeo = new THREE.BufferGeometry();
                const vertices = new Float32Array([
                    -sideWidth / 2, 0, 0,
                    sideWidth / 2, 0, 0,
                    0, slantHeight, 0
                ]);
                triGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
                triGeo.computeVertexNormals();
                
                const triMesh = createFaceMesh(triGeo);
                hinge.add(triMesh);
                group.add(hinge);
                
                const triLabel = createLabelMesh(faceCounter.toString(), '#ffaaaa', sideWidth, slantHeight*0.5);
                triLabel.position.set(0, slantHeight*0.3, 0);
                
                hinge.add(triLabel);
                faceCounter++;
                
                // BaÅŸlangÄ±Ã§ (0) -> KapalÄ± (iÃ§eri eÄŸik), BitiÅŸ (1) -> AÃ§Ä±k (dÄ±ÅŸarÄ± yatay)
                group.userData.hinges.push({ obj: hinge, maxAngle: Math.PI / 2, initialAngle: -inwardAngle, axis: 'x' });
            }
        }
        // KONÄ° (Daire dilimi ÅŸeklinde aÃ§Ä±lÄ±r)
        else if (type === 'pyramid_cone') {
            const r = size;
            const l = Math.sqrt(r * r + height * height); // Ana doÄŸru
            
            const sides = 32;
            const apothem = r;
            const sideWidth = 2 * Math.PI * r / sides;
            const slantHeight = l;
            const inwardAngle = Math.atan2(apothem, height);

            // Taban (Sabit deÄŸil, aÃ§Ä±ldÄ±ÄŸÄ±nda yana kayacak)
            const baseHinge = new THREE.Group();
            baseHinge.position.y = -height / 2;
            group.add(baseHinge);
            const baseGeo = new THREE.CircleGeometry(r, 32);
            baseGeo.rotateX(-Math.PI / 2);
            const baseMesh = createFaceMesh(baseGeo);
            baseHinge.add(baseMesh);

            const baseLabel = createLabelMesh(faceCounter.toString() + " (ALT)", '#aaaaff', r*1.5, r*1.5);
            baseLabel.rotation.x = -Math.PI / 2;
            baseHinge.add(baseLabel);
            faceCounter++;

            // Yan yÃ¼zeyler (Ã§iÃ§ek gibi aÃ§Ä±lÄ±r)
            for (let i = 0; i < sides; i++) {
                const angle = (i * Math.PI * 2) / sides;
                const hinge = new THREE.Group();
                hinge.position.set(Math.cos(angle) * apothem, -height / 2, -Math.sin(angle) * apothem);
                hinge.rotation.order = 'YXZ'; // Ã–nce X (iÃ§eri eÄŸilme), sonra Y (yÃ¶nelme) uygulanmalÄ±
                hinge.rotation.y = angle + Math.PI / 2; // Ä°Ã§eri bakmasÄ± iÃ§in yÃ¶nlendirme
                
                const triGeo = new THREE.BufferGeometry();
                const vertices = new Float32Array([
                    -sideWidth / 2, 0, 0,
                    sideWidth / 2, 0, 0,
                    0, slantHeight, 0
                ]);
                triGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
                triGeo.computeVertexNormals();
                
                const triMesh = createFaceMesh(triGeo);
                hinge.add(triMesh);
                group.add(hinge);
                
                // BaÅŸlangÄ±Ã§ (0) -> KapalÄ± (iÃ§eri eÄŸik), BitiÅŸ (1) -> AÃ§Ä±k (dÄ±ÅŸarÄ± yatay)
                group.userData.hinges.push({ obj: hinge, maxAngle: Math.PI / 2, initialAngle: -inwardAngle, axis: 'x' });
            }
        }

        // Åekil kapalÄ±yken Z ekseni boyunca uzansÄ±n (bÃ¶ylece XY dÃ¼zleminde dik durur)
        group.rotation.x = Math.PI / 2;

        const outerGroup = new THREE.Group();
        outerGroup.userData = group.userData;
        outerGroup.userData.innerGroup = group; 
        if (type.startsWith("prism_")) {
            outerGroup.userData.shiftX = group.userData.shiftX;
        }

        outerGroup.add(group);

        // ==========================================
        // DYNAMIC PIVOT CENTERING (Orbit / Savrulma Fix)
        // ==========================================
        // HATA DUZELTME: Bounding box hesaplanmadan once seklin KAPALI (0) 
        // formuna gecmesi gerekir! Aksi halde acik (2D) halinin merkezini alir ve SAVRULUR!
        this.updateUnfold(outerGroup, 0);

        let box = new THREE.Box3().setFromObject(group);
        let center = new THREE.Vector3();
        box.getCenter(center);
        group.userData.foldedCenter = center.clone();
        
        this.updateUnfold(outerGroup, 1);
        box = new THREE.Box3().setFromObject(group);
        box.getCenter(center);
        group.userData.unfoldedCenter = center.clone();
        
        this.updateUnfold(outerGroup, 0);
        group.position.set(-group.userData.foldedCenter.x, -group.userData.foldedCenter.y, -group.userData.foldedCenter.z);
        // ==========================================

        return outerGroup;
    },

    updateUnfold: function(group, openRatio) {
        if (!group.userData.isFoldable || !group.userData.hinges) return;
        
        group.userData.hinges.forEach(h => {
            const initial = h.initialAngle || 0;
            const currentAngle = initial + (h.maxAngle - initial) * openRatio;
            h.obj.rotation[h.axis] = currentAngle;
        });

        // Åekil aÃ§Ä±ldÄ±kÃ§a tam karÅŸÄ±dan gÃ¶rÃ¼nmesi iÃ§in rotasyonu otomatik olarak dÃ¼zelt
        const inner = group.userData.innerGroup;
        if (inner) {
            let tiltOffset = 0.25; 
            let targetAngleX = Math.PI / 2;

            if (group.userData.shapeType && group.userData.shapeType.startsWith('pyramid_')) {
                // Piramitler prizmalardan farklÄ± olarak yerel XZ dÃ¼zleminde aÃ§Ä±lÄ±r.
                // Kameraya doÄŸru (zemine) yatmasÄ± iÃ§in hedef aÃ§Ä±nÄ±n Math.PI olmasÄ± gerekir.
                targetAngleX = Math.PI;
            }

            const qClosed = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            let qOpenTarget;

            if (group.userData.shapeType === 'pyramid_cone') {
                // KONÄ° Ä°Ã‡Ä°N KESÄ°N Ã‡Ã–ZÃœM:
                // Kameraya (Y=-30, Z=20) tam dik bakmasÄ± iÃ§in X ekseninde atan2(20, -30) dÃ¶nmesi gerekir.
                const qOpenAbsolute = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.atan2(20, -30));
                
                // Koninin app.js'den gelen gerÃ§ek baÅŸlangÄ±Ã§ eÄŸimleri: X = -30, Z = -30.
                // Sadece Z'yi deÄŸil, her ikisini de tersine Ã§evirmeliyiz ki eÄŸim kalmasÄ±n.
                const coneOuterQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 6, 0, -Math.PI / 6, 'XYZ'));
                qOpenTarget = coneOuterQ.invert().multiply(qOpenAbsolute);
            } else {
                // Prizmalar ve DiÄŸer Piramitler iÃ§in mevcut Ã§alÄ±ÅŸan mantÄ±k:
                const qOpenAbsolute = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), targetAngleX - tiltOffset);
                const defaultOuterQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI / 6));
                qOpenTarget = defaultOuterQ.invert().multiply(qOpenAbsolute);
            }
            
            // KapalÄ±yken izometrik duruÅŸta kal, aÃ§Ä±ldÄ±kÃ§a kameraya dÃ¶n
            inner.quaternion.copy(qClosed).slerp(qOpenTarget, openRatio);

            // PrizmalarÄ±n aÃ§Ä±nÄ±mÄ± yana doÄŸru uzadÄ±ÄŸÄ± iÃ§in, aÃ§Ä±ldÄ±kÃ§a ÅŸekli ortala
            // Pivot merkezleme (Savrulma onleyici)
            if (group.userData.foldedCenter && group.userData.unfoldedCenter) {
                const f = group.userData.foldedCenter;
                const u = group.userData.unfoldedCenter;
                
                const curX = f.x + (u.x - f.x) * openRatio;
                const curY = f.y + (u.y - f.y) * openRatio;
                const curZ = f.z + (u.z - f.z) * openRatio;
                
                inner.position.x = -curX;
                inner.position.y = -curY;
                inner.position.z = -curZ;
                
                if (group.userData.shiftX !== undefined) {
                    const fx = -f.x;
                    const tx = group.userData.shiftX;
                    inner.position.x = fx + (tx - fx) * openRatio;
                }
            } else if (group.userData.shiftX) {
                inner.position.x = group.userData.shiftX * openRatio;
            }
        }
    }
};
