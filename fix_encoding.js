const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app.js');
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

const replacements = {
    365: '        tr: "ÇEMBERLERDEN ÜÇGEN İNŞASI",',
    381: '        tr: "AÇI ÖLÇER YERLEŞTİRME OYUNU",',
    397: '        tr: "DOĞRUYA DIŞINDAKİ NOKTADAN DİKME",',
    413: '        tr: "AYNI DÜZLEMDE İKİ DOĞRUNUN YOLCULUĞU",',
    429: '        tr: "AYNI DÜZLEMDE 3 DOĞRUNUN DURUMLARI",',
    445: '        tr: "AÇI ÇEŞİTLERİ (TÜMLER/BÜTÜNLER/KOMŞU)",',
    461: '        tr: "AÇILARINA GÖRE ÜÇGENLER",',
    477: '        tr: "AÇI ÇEŞİTLERİ (DAR, DİK, GENİŞ vb.)",',
    493: '        tr: "TEMEL GEOMETRİK ŞEKİLLER",',
    509: '        tr: "ÇOKGENLERİN ELEMANLARI",',
    525: '        tr: "İKİ PARALEL VE KESENLE OLUŞAN AÇILAR (1)",',
    541: '        tr: "ÜÇ DOĞRUNUN İKİŞER KESİŞMESİ",',
    557: '        tr: "DİKDÖRTGENİN ÇEVRE VE ALANI",',
    573: '        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMEVARIM)",',
    589: '        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMDENGELİM)",',
    605: '        tr: "İKİ PARALEL DOĞRUNUN BİR KESENLE YAPTIĞI AÇILAR (2)",',
    621: '        tr: "DÖNÜŞÜM GEOMETRİSİ (ÖTELEME/YANSIMA)",',
    637: '        tr: "DÖRTGEN ÇEŞİTLERİ KAVRAM HARİTASI",',
    653: '        tr: "DÖRTGENLER GENEL ÇIKARIMLAR",',
    669: '        tr: "KESİRLERİN FARKLI GÖSTERİMLERİ",',
    685: '        tr: "KÖŞEGENLERDEN DÖRTGENLERE (1)",',
    701: '        tr: "CEBİRSEL İFADELER TEMEL KAVRAMLAR",',
    717: '        tr: "CEBİRSEL İFADELER SÖZELDEN CEBİRE",',
    733: '        tr: "CEBİRSEL İFADELER CEBİRDEN SÖZELE",',
    749: '        tr: "CEBİRSEL İFADELER DEĞER HESAPLAMA",',
    765: '        tr: "ARAŞTIRMA ADIMLARI (Canva)",',
    781: '        tr: "ARAŞTIRMA ADIMLARI (GitHub)",',
    797: '        tr: "ÜÇGENDE YARDIMCI ELEMANLAR",',
    813: '        tr: "ÜÇGEN ÇİZİMİ",',
    829: '        tr: "ÜÇGENDE EŞLİK VE BENZERLİK",',
    845: '        tr: "PRİZMALARIN ELEMANLARI",',
    861: '        tr: "PİRAMİT VE AÇINIMI",',
    877: '        tr: "PRİZMA, PİRAMİT, KONİ, SİLİNDİR",',
    893: '        tr: "KÖŞEGENLERDEN DÖRTGENLERE (2)",'
};

for (const [lineNum, content] of Object.entries(replacements)) {
    const idx = parseInt(lineNum) - 1; // 0-indexed
    lines[idx] = content + (lines[idx].endsWith('\r') ? '\r' : '');
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Fixed encoding in app.js');
