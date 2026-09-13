window.onerror = function(msg, url, line) { alert('HATA: ' + msg + '\nSatir: ' + line); };
// ?? ALAN ADI Kï¿½Lï¿½Dï¿½ (DOMAIN BINDING) ??
// Sadece bdemir1499.github.io adresinde, EBA sunucularï¿½nda ve yerel bilgisayarda ï¿½alï¿½ï¿½ï¿½r!
const gecerliAdresler = ["bdemir1499.github.io", "127.0.0.1", "localhost", "eba.gov.tr", "vercel.app"];
const mevcutAdres = window.location.hostname;

const kacakKullanimMi = !gecerliAdresler.some(adres => mevcutAdres.includes(adres));

if (kacakKullanimMi && mevcutAdres !== "") {
    document.body.innerHTML = "<div style='color:red; text-align:center; margin-top:50px; font-family:sans-serif; font-size:20px; font-weight:bold;'>? Gï¿½VENLï¿½K ï¿½HLALï¿½: Bu yazï¿½lï¿½m kopyalanmï¿½ï¿½tï¿½r. Lï¿½tfen orijinal adresi kullanï¿½n.</div>";
    throw new Error("Korsan kullanï¿½m tespit edildi, sistem durduruldu!");
}

// ?? KESï¿½N ï¿½ï¿½Zï¿½M: Akï¿½llï¿½ tahtalarda kayï¿½p resim (X_X yï¿½z) ï¿½ï¿½kmesini TAMAMEN engeller ??
const cursorFix = document.createElement('style');
cursorFix.innerHTML = `
    /* SADECE KANVASTA DEï¿½ï¿½L, Bï¿½Tï¿½N EKRANDA ZOMBï¿½ ï¿½MLEï¿½LERï¿½ Kï¿½Kï¿½NDEN YASAKLA! */
    body.cursor-eraser { cursor: none !important; }
    body.cursor-pen { cursor: crosshair !important; }
    body.cursor-snapshot { cursor: crosshair !important; }

    /* ï¿½izim tahtasï¿½ ï¿½zerinde de kesin yasak (ï¿½ifte gï¿½venlik) */
    body.cursor-eraser #drawing-canvas { cursor: none !important; }
    body.cursor-pen #drawing-canvas { cursor: crosshair !important; }
    body.cursor-snapshot #drawing-canvas { cursor: crosshair !important; }

    /* Menï¿½lerin, panellerin ve butonlarï¿½n ï¿½zerinde her zaman normal ok/parmak iï¿½areti ï¿½ï¿½ksï¿½n! */
    .panel, .panel *, button, .tool-button, .tool-button-sub { 
        cursor: pointer !important; 
    }
`;
document.head.appendChild(cursorFix);



// Artk sabit bir MY_SECRET_KEY yok, retmen her ders ifreyi belirleyecek
window.sessionPassword = "";

// --- DL SZL ---
let currentLang = 'tr'; // Varsaylan dil

const translations = {
    tr: { sihirli_el: "âœ¨ Sihirli El", soru_cek: "ğŸ“¸ Soru Ã‡ek", yukle: "Dosya YÃ¼kle", silgi: "Silgi", kalem: "Kalem", cizgi: "Ã‡izgi", nokta: "Nokta", d_cizgi: "DÃ¼z Ã‡izgi", dogru: "DoÄŸru", dogru_parcasi: "DoÄŸru ParÃ§asÄ±", isin: "IÅŸÄ±n", cetvel: "Cetvel", gonye: "GÃ¶nye", aciolcer: "AÃ§Ä± Ã–lÃ§er", pergel: "Pergel", cokgenler: "Ã‡okgenler", cember: "Ã‡ember", d_ucgen: "DÃ¼zgÃ¼n 3gen", d_dortgen: "DÃ¼zgÃ¼n 4gen", dikdortgen: "DikdÃ¶rtgen", d_besgen: "DÃ¼zgÃ¼n 5gen", d_altigen: "DÃ¼zgÃ¼n 6gen", d_yedigen: "DÃ¼zgÃ¼n 7gen", d_sekizgen: "DÃ¼zgÃ¼n 8gen", oyunlar: "Oyunlar", arac_rengi: "AraÃ§ Rengi", geri_al: "Geri Al", hepsini_sil: "Hepsini Sil", tasi: "TaÅŸÄ±", canlandir: "CanlandÄ±r ğŸ”„", kutu: "Kutu", serbest: "Serbest", yardim: "Video YardÄ±m", ins_t: "UygulamayÄ± YÃ¼kle", ins_d: "Daha iyi performans iÃ§in uygulamayÄ± yÃ¼kle.", ins_b: "YÃ¼kle", ins_c: "Kapat", vid_cetvel: "Cetvel KullanÄ±mÄ±", vid_gonye: "GÃ¶nye KullanÄ±mÄ±", vid_aciolcer: "AÃ§Ä± Ã–lÃ§er KullanÄ±mÄ±", vid_pergel: "Pergel KullanÄ±mÄ±", vid_canlandir: "CanlandÄ±rma (Kopyalama)", vid_cizgi: "Ã‡izgi MenÃ¼sÃ¼ KullanÄ±mÄ±", vid_cokgenler: "Ã‡okgenler", vid_kalem: "Kalem", vid_kitap: "Kitap ve Resim YÃ¼kleme", vid_oyunlar: "Oyunlar", pdf_soru: "Bu PDF {0} sayfadÄ±r. KaÃ§Ä±ncÄ± sayfadan devam etmek istersiniz?", kvkk: "Bu uygulama hiÃ§bir kiÅŸisel veri toplamaz ve dosyalarÄ±nÄ±zÄ± sunuculara yÃ¼klemez." },

    en: { yukle: "Upload File", silgi: "Eraser", kalem: "Pen", cizgi: "Line", nokta: "Point", d_cizgi: "Straight Line", dogru: "Line", dogru_parcasi: "Segment", isin: "Ray", cetvel: "Ruler", gonye: "Set Square", aciolcer: "Protractor", pergel: "Compass", cokgenler: "Polygons", cember: "Circle", d_ucgen: "Regular Triangle", d_dortgen: "Square", dikdortgen: "Rectangle", d_besgen: "Pentagon", d_altigen: "Hexagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Games", arac_rengi: "Tool Color", geri_al: "Undo", hepsini_sil: "Clear All", tasi: "Move", canlandir: "Animate ??", kutu: "Box", serbest: "Free", yardim: "Video Help", ins_t: "Install App", ins_d: "Install app for better performance.", ins_b: "Install", ins_c: "Close", vid_cetvel: "Ruler Usage", vid_gonye: "Set Square Usage", vid_aciolcer: "Protractor Usage", vid_pergel: "Compass Usage", vid_canlandir: "Animation (Copy)", vid_cizgi: "Line Menu Usage", vid_cokgenler: "Polygons", vid_kalem: "Pen", vid_kitap: "Load Book and Image", vid_oyunlar: "Games", pdf_soru: "This PDF has {0} pages. Which page would you like to continue from?", sihirli_el: "? Magic Hand", soru_cek: "?? Take Photo", kvkk: "This application does not collect any personal data and does not upload your files to servers." },

    de: { yukle: "Bild/PDF hochladen", silgi: "Radierer", kalem: "Stift", cizgi: "Linie", nokta: "Punkt", d_cizgi: "Gerade", dogru: "Gerade", dogru_parcasi: "Strecke", isin: "Strahl", cetvel: "Lineal", gonye: "Geodreieck", aciolcer: "Winkelmesser", pergel: "Zirkel", cokgenler: "Polygone", cember: "Kreis", d_ucgen: "Dreieck", d_dortgen: "Quadrat", dikdortgen: "Rechteck", d_besgen: "Fnfeck", d_altigen: "Sechseck", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Spiele", arac_rengi: "Farbe", geri_al: "Rckgngig", hepsini_sil: "Lschen", tasi: "Bewegen", canlandir: "Animieren", kutu: "Box", serbest: "Frei", yardim: "Hilfe", ins_t: "App installieren", ins_d: "Installieren fr bessere Leistung.", ins_b: "Installieren", ins_c: "Schlieen", vid_cetvel: "Lineal verwenden", vid_gonye: "Geodreieck verwenden", vid_aciolcer: "Winkelmesser verwenden", vid_pergel: "Zirkel verwenden", vid_canlandir: "Animation (Kopieren)", vid_cizgi: "Linienmen verwenden", vid_cokgenler: "Vielecke", vid_kalem: "Stift", vid_kitap: "Buch und Bild laden", vid_oyunlar: "Spiele", pdf_soru: "Dieses PDF hat {0} Seiten. Auf welcher Seite mchten Sie fortfahren?", sihirli_el: "? Magische Hand", soru_cek: "?? Foto aufnehmen", kvkk: "Diese Anwendung sammelt keine personenbezogenen Daten und ldt Ihre Dateien nicht auf Server hoch." },

    ar: { yukle: "????? ???", silgi: "?????", kalem: "???", cizgi: "??", nokta: "????", d_cizgi: "?? ??????", dogru: "??????", dogru_parcasi: "????", isin: "????", cetvel: "?????", gonye: "????", aciolcer: "?????", pergel: "?????", cokgenler: "??????", cember: "?????", d_ucgen: "???? ?????", d_dortgen: "????", dikdortgen: "??????", d_besgen: "????", d_altigen: "????", d_yedigen: "????", d_sekizgen: "????", oyunlar: "?????", arac_rengi: "?????", geri_al: "?????", hepsini_sil: "???", tasi: "?????", canlandir: "?????", kutu: "?????", serbest: "??", yardim: "??????", ins_t: "????? ???????", ins_d: "??? ??????? ????? ????.", ins_b: "?????", ins_c: "?????", vid_cetvel: "??????? ???????", vid_gonye: "??????? ??????", vid_aciolcer: "??????? ???????", vid_pergel: "??????? ???????", vid_canlandir: "???? ?????? (???)", vid_cizgi: "??????? ????? ??????", vid_cokgenler: "??????", vid_kalem: "???", vid_kitap: "????? ???? ?????", vid_oyunlar: "?????", pdf_soru: "????? ??? ????? ??? {0} ????. ?? ?? ???? ???? ?????????", sihirli_el: "? ?? ?????", soru_cek: "?? ????? ????", kvkk: "?? ???? ??? ??????? ?? ?????? ????? ??? ???? ?????? ??? ???????." },

    hi: { yukle: "????? ?????", silgi: "??????", kalem: "???", cizgi: "????", nokta: "?????", d_cizgi: "???? ????", dogru: "????", dogru_parcasi: "???", isin: "????", cetvel: "??????", gonye: "??????", aciolcer: "?????", pergel: "?????", cokgenler: "??????", cember: "?????", d_ucgen: "???????", d_dortgen: "????", dikdortgen: "???", d_besgen: "??????", d_altigen: "??????", d_yedigen: "???????", d_sekizgen: "???????", oyunlar: "???", arac_rengi: "???", geri_al: "???????", hepsini_sil: "????", tasi: "?? ????", canlandir: "??????", kutu: "?????", serbest: "?????", yardim: "??????", ins_t: "?? ??????? ????", ins_d: "????? ???????? ?? ??? ??????? ?????", ins_b: "???????", ins_c: "???", vid_cetvel: "???er ?? ?????", vid_gonye: "??? ???????? ?? ?????", vid_aciolcer: "????? ?? ?????", vid_pergel: "????? ?? ?????", vid_canlandir: "??????? (????)", vid_cizgi: "???? ???? ?? ?????", vid_cokgenler: "??????", vid_kalem: "???", vid_kitap: "?????? ?? ??? ??? ????", vid_oyunlar: "???", pdf_soru: "?? PDF ??? {0} ????? ???? ?? ??? ????? ?? ???? ???? ????????", sihirli_el: "? ????? ???", soru_cek: "?? ???? ???", kvkk: "?? ????????? ??? ????????? ???? ????? ???? ???? ?? ?? ???? ??????? ?? ????? ?? ????? ???? ???? ???" },

    ms: { yukle: "Muat Naik Fail", silgi: "Pemadam", kalem: "Pen", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Pembaris", gonye: "Sesiku", aciolcer: "Jangka Sudut", pergel: "Jangka Lukis", cokgenler: "Poligon", cember: "Bulatan", d_ucgen: "Segi Tiga", d_dortgen: "Segi Empat", dikdortgen: "Segi Empat Tepat", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Batal", hepsini_sil: "Padam", tasi: "Gerak", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Pasang Aplikasi", ins_d: "Pasang untuk prestasi lebih baik.", ins_b: "Pasang", ins_c: "Tutup", vid_cetvel: "Penggunaan Pembaris", vid_gonye: "Penggunaan Sesiku", vid_aciolcer: "Penggunaan Jangka Sudut", vid_pergel: "Penggunaan Jangka Lukis", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garisan", vid_cokgenler: "Poligon", vid_kalem: "Pen", vid_kitap: "Muat Buku dan Imej", vid_oyunlar: "Permainan", pdf_soru: "PDF ini mempunyai {0} halaman. Dari halaman mana anda ingin teruskan?", sihirli_el: "? Tangan Ajaib", soru_cek: "?? Ambil Gambar", kvkk: "Aplikasi ini tidak mengumpul sebarang data peribadi and tidak memuat naik fail anda ke pelayan." },

    id: { yukle: "Unggah Berkas", silgi: "Penghapus", kalem: "Pena", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Penggaris", gonye: "Segitiga", aciolcer: "Busur", pergel: "Jangka", cokgenler: "Poligon", cember: "Lingkaran", d_ucgen: "Segitiga", d_dortgen: "Persegi", dikdortgen: "Persegi Panjang", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Urung", hepsini_sil: "Hapus", tasi: "Pindah", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Instal Aplikasi", ins_d: "Instal untuk performa daha baik.", ins_b: "Instal", ins_c: "Tutup", vid_cetvel: "Penggunaan Penggaris", vid_gonye: "Penggunaan Penggaris Segitiga", vid_aciolcer: "Penggunaan Busur Derajat", vid_pergel: "Penggunaan Jangka", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garis", vid_cokgenler: "Poligon", vid_kalem: "Pena", vid_kitap: "Muat Buku dan Gambar", vid_oyunlar: "Permainan", pdf_soru: "PDF ini memiliki {0} halaman. Dari halaman mana Anda ingin melanjutkan?", sihirli_el: "? Tangan Ajaib", soru_cek: "?? Ambil Foto", kvkk: "Aplikasi ini tidak mengumpulkan data pribadi apa pun dan tidak mengunggah file Anda ke server." },

    zh: { yukle: "????", silgi: "??", kalem: "?", cizgi: "?", nokta: "?", d_cizgi: "??", dogru: "??", dogru_parcasi: "??", isin: "??", cetvel: "??", gonye: "???", aciolcer: "???", pergel: "??", cokgenler: "???", cember: "?", d_ucgen: "???", d_dortgen: "???", dikdortgen: "???", d_besgen: "???", d_altigen: "???", d_yedigen: "???", d_sekizgen: "???", oyunlar: "??", arac_rengi: "??", geri_al: "??", hepsini_sil: "??", tasi: "??", canlandir: "??", kutu: "??", serbest: "??", yardim: "??", ins_t: "????", ins_d: "????????????", ins_b: "??", ins_c: "??", vid_cetvel: "????", vid_gonye: "?????", vid_aciolcer: "?????", vid_pergel: "????", vid_canlandir: "??(??)", vid_cizgi: "??????", vid_cokgenler: "???", vid_kalem: "?", vid_kitap: "???????", vid_oyunlar: "??", pdf_soru: "? PDF ?? {0} ?????????????", sihirli_el: "? ???", soru_cek: "?? ??", kvkk: "??????????????,???????????????" },

    ru: { yukle: "????????? ????", silgi: "??????", kalem: "?????", cizgi: "?????", nokta: "?????", d_cizgi: "?????? ?????", dogru: "??????", dogru_parcasi: "???????", isin: "???", cetvel: "???????", gonye: "????????", aciolcer: "???????????", pergel: "???????", cokgenler: "??????????????", cember: "????", d_ucgen: "?????????? ???????????", d_dortgen: "???????", dikdortgen: "?????????????", d_besgen: "????????????", d_altigen: "?????????????", d_yedigen: "????????????", d_sekizgen: "??????????????", oyunlar: "????", arac_rengi: "???? ???????????", geri_al: "????????", hepsini_sil: "???????? ???", tasi: "???????????", canlandir: "???????? ??", kutu: "???????", serbest: "????????", yardim: "???????", ins_t: "??????????", ins_d: "?????????? ??? ?????? ??????.", ins_b: "??????????", ins_c: "???????", vid_cetvel: "??? ???????????? ???????", vid_gonye: "??? ???????????? ????????", vid_aciolcer: "??? ???????????? ???????????", vid_pergel: "??? ???????????? ???????", vid_canlandir: "???????? (?????)", vid_cizgi: "???? ?????", vid_cokgenler: "??????????????", vid_kalem: "?????", vid_kitap: "???????? ????", vid_oyunlar: "????", pdf_soru: "? ???? PDF {0} ???????. ? ????? ???????? ?? ?????? ???????????", sihirli_el: "? ????????? ????", soru_cek: "?? ??????? ????", kvkk: "??? ?????????? ?? ???????? ??????? ???????????? ?????? ? ?? ????????? ???? ????? ?? ???????." },

    es: { yukle: "Subir Archivo", silgi: "Borrador", kalem: "Lï¿½piz", cizgi: "Lï¿½nea", nokta: "Punto", d_cizgi: "Lï¿½nea Recta", dogru: "Recta", dogru_parcasi: "Segmento", isin: "Rayo", cetvel: "Regla", gonye: "Escuadra", aciolcer: "Transportador", pergel: "Compï¿½s", cokgenler: "Polï¿½gonos", cember: "Cï¿½rculo", d_ucgen: "Triï¿½ngulo", d_dortgen: "Cuadrado", dikdortgen: "Rectï¿½ngulo", d_besgen: "Pentï¿½gono", d_altigen: "Hexï¿½gono", d_yedigen: "Heptï¿½gono", d_sekizgen: "Octï¿½gono", oyunlar: "Juegos", arac_rengi: "Color", geri_al: "Deshacer", hepsini_sil: "Borrar Todo", tasi: "Mover", canlandir: "Animar ??", kutu: "Caja", serbest: "Libre", yardim: "Ayuda", ins_t: "Instalar App", ins_d: "Instalar para mejor rendimiento.", ins_b: "Instalar", ins_c: "Cerrar", vid_cetvel: "Uso de Regla", vid_gonye: "Uso de Escuadra", vid_aciolcer: "Uso de Transportador", vid_pergel: "Uso de Compï¿½s", vid_canlandir: "Animaciï¿½n (Copiar)", vid_cizgi: "Menï¿½ de Lï¿½neas", vid_cokgenler: "Polï¿½gonos", vid_kalem: "Lï¿½piz", vid_kitap: "Cargar Libro", vid_oyunlar: "Juegos", pdf_soru: "Este PDF tiene {0} pï¿½ginas. ï¿½Desde quï¿½ pï¿½gina te gustarï¿½a continuar?", sihirli_el: "? Mano Mï¿½gica", soru_cek: "?? Tomar Foto", kvkk: "Esta aplicaciï¿½n no recopila ningï¿½n dato personal y no sube sus archivos a los servidores." },

    fr: { yukle: "Tï¿½lï¿½charger", silgi: "Gomme", kalem: "Stylo", cizgi: "Ligne", nokta: "Point", d_cizgi: "Ligne Droite", dogru: "Droite", dogru_parcasi: "Segment", isin: "Demi-droite", cetvel: "Rï¿½gle", gonye: "ï¿½querre", aciolcer: "Rapporteur", pergel: "Compas", cokgenler: "Polygones", cember: "Cercle", d_ucgen: "Triangle", d_dortgen: "Carrï¿½", dikdortgen: "Rectangle", d_besgen: "Pentagone", d_altigen: "Hexagone", d_yedigen: "Heptagone", d_sekizgen: "Octogone", oyunlar: "Jeux", arac_rengi: "Couleur", geri_al: "Annuler", hepsini_sil: "Effacer Tout", tasi: "Dï¿½placer", canlandir: "Animer ??", kutu: "Boï¿½te", serbest: "Libre", yardim: "Aide", ins_t: "Installer App", ins_d: "Installez pour de meilleures performances.", ins_b: "Installer", ins_c: "Fermer", vid_cetvel: "Utilisation de la Rï¿½gle", vid_gonye: "Utilisation de l'ï¿½querre", vid_aciolcer: "Utilisation du Rapporteur", vid_pergel: "Utilisation du Compas", vid_canlandir: "Animation (Copie)", vid_cizgi: "Menu des Lignes", vid_cokgenler: "Polygones", vid_kalem: "Stylo", vid_kitap: "Charger Livre", vid_oyunlar: "Jeux", pdf_soru: "Ce PDF contient {0} pages. ï¿½ partir de quelle page voulez-vous continuer ?", sihirli_el: "? Main Magique", soru_cek: "?? Prendre une Photo", kvkk: "Cette application ne collecte aucune donnï¿½e personnelle et ne tï¿½lï¿½charge pas vos fichiers sur des serveurs." },

    pt: { yukle: "Carregar Ficheiro", silgi: "Borracha", kalem: "Caneta", cizgi: "Linha", nokta: "Ponto", d_cizgi: "Linha Reta", dogru: "Reta", dogru_parcasi: "Segmento", isin: "Semirreta", cetvel: "Rï¿½gua", gonye: "Esquadro", aciolcer: "Transferidor", pergel: "Compasso", cokgenler: "Polï¿½gonos", cember: "Cï¿½rculo", d_ucgen: "Triï¿½ngulo", d_dortgen: "Quadrado", dikdortgen: "Retï¿½ngulo", d_besgen: "Pentï¿½gono", d_altigen: "Hexï¿½gono", d_yedigen: "Heptï¿½gono", d_sekizgen: "Octï¿½gono", oyunlar: "Jogos", arac_rengi: "Cor", geri_al: "Desfazer", hepsini_sil: "Apagar Tudo", tasi: "Mover", canlandir: "Animar ??", kutu: "Caixa", serbest: "Livre", yardim: "Ajuda", ins_t: "Instalar App", ins_d: "Instale para melhor desempenho.", ins_b: "Instalar", ins_c: "Fechar", vid_cetvel: "Uso da Rï¿½gua", vid_gonye: "Uso do Esquadro", vid_aciolcer: "Uso do Transferidor", vid_pergel: "Uso do Compasso", vid_canlandir: "Animaï¿½ï¿½o (Cï¿½pia)", vid_cizgi: "Menu de Linhas", vid_cokgenler: "Polï¿½gonos", vid_kalem: "Caneta", vid_kitap: "Carregar Livro", vid_oyunlar: "Jogos", pdf_soru: "Este PDF tem {0} pï¿½ginas. A partir de qual pï¿½gina gostaria de continuar?", sihirli_el: "? Mï¿½o Mï¿½gica", soru_cek: "?? Tirar Foto", kvkk: "Este aplicativo nï¿½o coleta nenhum dado pessoal e nï¿½o faz upload de seus arquivos para servidores." },

    ja: { yukle: "????ï¿½?", silgi: "????", kalem: "??", cizgi: "?", nokta: "?", d_cizgi: "??", dogru: "??", dogru_parcasi: "??", isin: "???", cetvel: "??", gonye: "????", aciolcer: "???", pergel: "????", cokgenler: "???", cember: "?", d_ucgen: "????", d_dortgen: "???", dikdortgen: "???", d_besgen: "???", d_altigen: "???", d_yedigen: "???", d_sekizgen: "???", oyunlar: "?ï¿½?", arac_rengi: "?ï¿½???", geri_al: "????", hepsini_sil: "?????", tasi: "??", canlandir: "??? ??", kutu: "????", serbest: "??", yardim: "???", ins_t: "????????ï¿½?", ins_d: "???ï¿½????????????ï¿½?", ins_b: "????ï¿½?", ins_c: "???", vid_cetvel: "??????", vid_gonye: "????????", vid_aciolcer: "???????", vid_pergel: "????????", vid_canlandir: "???ï¿½??? (??ï¿½)", vid_cizgi: "????ï¿½????", vid_cokgenler: "???", vid_kalem: "??", vid_kitap: "?????????", vid_oyunlar: "?ï¿½?", pdf_soru: "??PDF?{0}?ï¿½?????????ï¿½??????????", sihirli_el: "? ???????", soru_cek: "?? ?????", kvkk: "??????ï¿½???????ï¿½?????????????ï¿½?ï¿½?????ï¿½??????" }
};

window.aktifBaglantilar = {};
let currentLassoX = 0;
let currentLassoY = 0;
let isDrawingLasso = false;
let lassoPoints = [];
let drawnStrokes = [];
window.drawnStrokes = drawnStrokes;
let boxCopies = [];
window.boxCopies = boxCopies;
let isDrawing = false;
let isDrawingRectangle = false;
let isDrawingPolygon = false;
let rectStartPoint = null;
let globalScale = 1;
let lastDist = 0;
let pointers = new Map();
let offsetX = 0; // BUNU EKLE
let offsetY = 0; // BUNU EKLE
const MIN_SCALE = 0.5;
const MAX_SCALE = 5.0;
let initialWidth = 0;
let initialHeight = 0;
let isPenActive = false; // Avuï¿½ iï¿½i reddi iï¿½in
let penActiveTimer = null;

// --- ï¿½OK Dï¿½LLï¿½ OYUNLAR Lï¿½STESï¿½ (Tï¿½M Dï¿½LLER Gï¿½NCELLENDï¿½) ---
window.OyunListesi = [
    {
        tr: "ï¿½EMBERLERDEN ï¿½ï¿½GEN ï¿½Nï¿½ASI",
        en: "TRIANGLE CONSTRUCTION FROM CIRCLES",
        de: "DREIECKSKONSTRUKTION AUS KREISEN",
        ar: "???? ?????? ?? ???????",
        hi: "??????? ?? ??????? ???????",
        ms: "PEMBINAAN SEGI TIGA DARIPADA BULATAN",
        id: "KONSTRUKSI SEGITIGA DARI LINGKARAN",
        zh: "???????",
        ru: "?????????? ???????????? ?? ???????????",
        es: "CONSTRUCCIï¿½N DE TRIï¿½NGULOS DESDE Cï¿½RCULOS",
        fr: "CONSTRUCTION DE TRIANGLES ï¿½ PARTIR DE CERCLES",
        pt: "CONSTRUï¿½ï¿½O DE TRIï¿½NGULOS A PARTIR DE Cï¿½RCULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/cemberden-ucgen-elde-etme"
    },
    {
        tr: "Aï¿½I ï¿½Lï¿½ER YERLEï¿½Tï¿½RME OYUNU",
        en: "PROTRACTOR PLACEMENT GAME",
        de: "WINKELMESSER-PLATZIERUNGSSPIEL",
        ar: "???? ??? ???????",
        hi: "????? ????????? ???",
        ms: "PERMAINAN PENEMPATAN JANGKA SUDUT",
        id: "PERMAINAN PENEMPATAN BUSUR DERAJAT",
        zh: "???????",
        ru: "???? ?? ?????????? ????????????",
        es: "JUEGO DE COLOCACIï¿½N DEL TRANSPORTADOR",
        fr: "JEU DE PLACEMENT DU RAPPORTEUR",
        pt: "JOGO DE COLOCAï¿½ï¿½O DO TRANSFERIDOR",
        ja: "??????ï¿½?",
        link: "https://bekrmatmt2507.my.canva.site/a-l-er-yar-mas"
    },
    {
        tr: "DOï¿½RUYA DIï¿½INDAKï¿½ NOKTADAN Dï¿½KME",
        en: "PERPENDICULAR FROM EXTERNAL POINT",
        de: "LORECHT VON EINEM EXTERNEN PUNKT",
        ar: "????? ???? ?? ???? ???? ????",
        hi: "????? ????? ?? ????? ????",
        ms: "SERENJANG DARI TITIK LUAR",
        id: "TEGAK LURUS DARI TITIK LUAR",
        zh: "???????",
        ru: "????????????? ?? ??????? ?????",
        es: "PERPENDICULAR DESDE UN PUNTO EXTERNO",
        fr: "PERPENDICULAIRE ï¿½ PARTIR D'UN POINT EXTERNE",
        pt: "PERPENDICULAR A PARTIR DE UM PONTO EXTERNO",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/dogruya-disindeki-noktadan-dikme-cizmek"
    },
    {
        tr: "AYNI Dï¿½ZLEMDE ï¿½Kï¿½ DOï¿½RUNUN YOLCULUï¿½U",
        en: "JOURNEY OF TWO LINES IN THE SAME PLANE",
        de: "REISE ZWEIER LINIEN IN DERSELBEN EBENE",
        ar: "???? ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? ?? ?????? ?? ??????",
        ms: "PERJALANAN DUA GARIS DALAM SATAH YANG SAMA",
        id: "PERJALANAN DUA GARIS DALAM BIDANG YANG SAMA",
        zh: "???????????",
        ru: "??????????? ???? ????? ? ????? ?????????",
        es: "EL VIAJE DE DOS Lï¿½NEAS EN EL MISMO PLANO",
        fr: "LE VOYAGE DE DEUX LIGNES DANS LE Mï¿½ME PLAN",
        pt: "A JORNADA DE DUAS LINHAS NO MESMO PLANO",
        ja: "??????2?????",
        link: "https://bdemir1499.github.io/ayni-duzlemde-iki-dogru/"
    },
    {
        tr: "AYNI Dï¿½ZLEMDE 3 DOï¿½RUNUN DURUMLARI",
        en: "POSITIONS OF 3 LINES IN THE SAME PLANE",
        de: "LAGE VON 3 LINIEN IN DERSELBEN EBENE",
        ar: "????? 3 ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? 3 ?????? ?? ?????????",
        ms: "KEDUDUKAN 3 GARIS DALAM SATAH YANG SAMA",
        id: "POSISI 3 GARIS DALAM BIDANG YANG SAMA",
        zh: "?????3?????",
        ru: "????????? 3 ????? ? ????? ?????????",
        es: "POSICIONES DE 3 Lï¿½NEAS EN EL MISMO PLANO",
        fr: "POSITIONS DE 3 LIGNES DANS LE Mï¿½ME PLAN",
        pt: "POSIï¿½ï¿½ES DE 3 LINHAS NO MESMO PLANO",
        ja: "??????3??????",
        link: "https://bekrmatmt2507.my.canva.site/ayniduzlemdeucdogrunundurumlari"
    },
    {
        tr: "Aï¿½I ï¿½Eï¿½ï¿½TLERï¿½ (Tï¿½MLER/Bï¿½Tï¿½NLER/KOMï¿½U)",
        en: "ANGLE TYPES (COMPLEMENTARY/SUPPLEMENTARY/ADJACENT)",
        de: "WINKELARTEN (KOMPLEMENTï¿½R/SUPPLEMENTï¿½R/NEBENWINKEL)",
        ar: "????? ??????? (??????/???????/???????)",
        hi: "????? ?? ?????? (????/??????/?????)",
        ms: "JENIS SUDUT (PELENGKAP/PENGGENAP/BERSEBELAH)",
        id: "JENIS SUDUT (BERPELURUS/BERPENYIKU/BERDAMPINGAN)",
        zh: "????(??/??/??)",
        ru: "???? ????? (??????????????/???????)",
        es: "TIPOS DE ï¿½NGULOS (COMPLEMENTARIOS/SUPLEMENTARIOS/ADYACENTES)",
        fr: "TYPES D'ANGLES (COMPLï¿½MENTAIRES/SUPPLï¿½MENTAIRES/ADJACENTS)",
        pt: "TIPOS DE ï¿½NGULOS (COMPLEMENTARES/SUPLEMENTARES/ADJACENTES)",
        ja: "?????(??/??/???)",
        link: "https://bdemir1499.github.io/tumler-butunler-komsutumler-komsubutunler/"
    },
    {
        tr: "Aï¿½ILARINA Gï¿½RE ï¿½ï¿½GENLER",
        en: "TRIANGLES ACCORDING TO THEIR ANGLES",
        de: "DREIECKE NACH IHREN WINKELN",
        ar: "???????? ??? ???????",
        hi: "????? ?? ???? ?? ???????",
        ms: "SEGI TIGA MENGIKUT SUDUT",
        id: "SEGITIGA BERDASARKAN SUDUTNYA",
        zh: "????????",
        ru: "???????????? ?? ????? ?????",
        es: "TRIï¿½NGULOS SEGï¿½N SUS ï¿½NGULOS",
        fr: "TRIANGLES SELON LEURS ANGLES",
        pt: "TRIï¿½NGULOS DE ACORDO COM SEUS ï¿½NGULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/acilarina-gire-ucgenler"
    },
    {
        tr: "Aï¿½I ï¿½Eï¿½ï¿½TLERï¿½ (DAR, Dï¿½K, GENï¿½ï¿½ vb.)",
        en: "ANGLE TYPES (ACUTE, RIGHT, OBTUSE etc.)",
        de: "WINKELARTEN (SPITZ, RECHT, STUMPF usw.)",
        ar: "????? ??????? (????? ?????? ?????? ???)",
        hi: "????? ?? ?????? (?????, ??, ???? ???)",
        ms: "JENIS SUDUT (TIRUS, TEGAK, CAWAK dsb.)",
        id: "JENIS SUDUT (LANCIP, SIKU, TUMPUL dll.)",
        zh: "????(?????????)",
        ru: "???? ????? (??????, ??????, ????? ? ?.?.)",
        es: "TIPOS DE ï¿½NGULOS (AGUDO, RECTO, OBTUSO, etc.)",
        fr: "TYPES D'ANGLES (AIGU, DROIT, OBTUS, etc.)",
        pt: "TIPOS DE ï¿½NGULOS (AGUDO, RETO, OBTUSO, etc.)",
        ja: "?????(??????????)",
        link: "https://bekrmatmt2507.my.canva.site/aci-cesitleri"
    },
    {
        tr: "TEMEL GEOMETRï¿½K ï¿½EKï¿½LLER",
        en: "BASIC GEOMETRIC SHAPES",
        de: "GEOMETRISCHE GRUNDFORMEN",
        ar: "??????? ???????? ????????",
        hi: "???????? ????????? ????????",
        ms: "BENTUK GEOMETRI ASAS",
        id: "BENTUK GEOMETRIS DASAR",
        zh: "??????",
        ru: "???????? ?????????????? ??????",
        es: "FORMAS GEOMï¿½TRICAS Bï¿½SICAS",
        fr: "FORMES Gï¿½OMï¿½TRIQUES DE BASE",
        pt: "FORMAS GEOMï¿½TRICAS Bï¿½SICAS",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/temel-geometrik-sekiller"
    },
    {
        tr: "ï¿½OKGENLERï¿½N ELEMANLARI",
        en: "ELEMENTS OF POLYGONS",
        de: "ELEMENTE VON POLYGONEN",
        ar: "????? ????????",
        hi: "?????? ?? ????",
        ms: "ELEMEN POLIGON",
        id: "UNSUR-UNSUR POLIGON",
        zh: "??????",
        ru: "???????? ???????????????",
        es: "ELEMENTOS DE LOS POLï¿½GONOS",
        fr: "ï¿½Lï¿½MENTS DES POLYGONES",
        pt: "ELEMENTOS DOS POLï¿½GONOS",
        ja: "??????",
        link: "https://bekrmatmt2507.my.canva.site/cokgenlerin-elemanlari"
    },
    {
        tr: "ï¿½Kï¿½ PARALEL VE KESENLE OLUï¿½AN Aï¿½ILAR (1)",
        en: "ANGLES FORMED BY TWO PARALLELS AND A TRANSVERSAL (1)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (1)",
        ar: "??????? ??????? ?? ???????? ????? (1)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (1)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (1)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (1)",
        zh: "?????????????? (1)",
        ru: "???? ??? ???????????? ? ??????? (1)",
        es: "ï¿½NGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (1)",
        fr: "ANGLES FORMï¿½S PAR DEUX PARALLï¿½LES ET UNE TRANSVERSALE (1)",
        pt: "ï¿½NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (1)",
        ja: "2??????1??????????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-paralel-dogrunun-b-r-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "ï¿½ï¿½ DOï¿½RUNUN ï¿½Kï¿½ï¿½ER KESï¿½ï¿½MESï¿½",
        en: "INTERSECTION OF THREE LINES IN PAIRS",
        de: "PAARWEISE SCHNITTPUNKTE VON DREI LINIEN",
        ar: "????? ???? ???? ???? ????",
        hi: "??? ?????? ?? ??????? ??? ???????????",
        ms: "PERSILANGAN TIGA GARIS SECARA BERPASANGAN",
        id: "PERPOTONGAN TIGA GARIS BERPASANGAN",
        zh: "???????",
        ru: "???????? ??????????? ???? ??????",
        es: "INTERSECCIï¿½N DE TRES Lï¿½NEAS EN PARES",
        fr: "INTERSECTION DE TROIS LIGNES PAR PAIRES",
        pt: "INTERSEï¿½ï¿½O DE TRï¿½S LINHAS EM PARES",
        ja: "3???????????",
        link: "https://bekrmatmt2507.my.canva.site/ikiser-kesisen-dogru"
    },
    {
        tr: "Dï¿½KDï¿½RTGENï¿½N ï¿½EVRE VE ALANI",
        en: "PERIMETER AND AREA OF RECTANGLE",
        de: "UMFANG UND FLï¿½CHE DES RECHTECKS",
        ar: "???? ?????? ????????",
        hi: "??? ?? ?????? ?? ?????????",
        ms: "PERIMETER DAN LUAS SEGI EMPAT TEPAT",
        id: "KELILING DAN LUAS PERSEGI PANJANG",
        zh: "?????????",
        ru: "???????? ? ??????? ??????????????",
        es: "PERï¿½METRO Y ï¿½REA DEL RECTï¿½NGULO",
        fr: "Pï¿½RIMï¿½TRE ET AIRE DU RECTANGLE",
        pt: "PERï¿½METRO E ï¿½REA DO RETï¿½NGULO",
        ja: "?????????",
        link: "https://bdemir1499.github.io/dikdortgen-cevre-ve-alan/"
    },
    {
        tr: "Dï¿½RTGENLERï¿½N ï¿½ZELLï¿½KLERï¿½ (Tï¿½MEVARIM)",
        en: "PROPERTIES OF QUADRILATERALS (INDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (INDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (????)",
        ms: "SIFAT-SIFAT SISI EMPAT (INDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (INDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRILï¿½TEROS (INDUCCIï¿½N)",
        fr: "PROPRIï¿½Tï¿½S DES QUADRILATï¿½RES (INDUCTION)",
        pt: "PROPRIEDADES DOS QUADRILï¿½TEROS (INDUï¿½ï¿½O)",
        ja: "??????(???)",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-ve-ozellikleri-tumevarim"
    },
    {
        tr: "Dï¿½RTGENLERï¿½N ï¿½ZELLï¿½KLERï¿½ (Tï¿½MDEN GELï¿½M)",
        en: "PROPERTIES OF QUADRILATERALS (DEDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (DEDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (?????)",
        ms: "SIFAT-SIFAT SISI EMPAT (DEDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (DEDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRILï¿½TEROS (DEDUCCIï¿½N)",
        fr: "PROPRIï¿½Tï¿½S DES QUADRILATï¿½RES (Dï¿½DUCTION)",
        pt: "PROPRIEDADES DOS QUADRILï¿½TEROS (DEDUï¿½ï¿½O)",
        ja: "??????(???)",
        link: "https://bdemir1499.github.io/dortgen-ve-ozellikleri-tumdengelim/"
    },
    {
        tr: "ï¿½Kï¿½ PARALEL DOï¿½RUNUN Bï¿½R KESENLE YAPTIï¿½I Aï¿½ILAR (2)",
        en: "ANGLES FORMED BY TWO PARALLEL LINES AND A TRANSVERSAL (2)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (2)",
        ar: "??????? ??????? ?? ???????? ????? (2)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (2)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (2)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (2)",
        zh: "?????????????? (2)",
        ru: "???? ??? ???????????? ? ??????? (2)",
        es: "ï¿½NGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (2)",
        fr: "ANGLES FORMï¿½S PAR DEUX PARALLï¿½LES ET UNE TRANSVERSALE (2)",
        pt: "ï¿½NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (2)",
        ja: "2??????1??????????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/iki-paralel-dogrunun-bir-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "Dï¿½Nï¿½ï¿½ï¿½M GEOMETRï¿½Sï¿½ (ï¿½TELEME/YANSIMA)",
        en: "TRANSFORMATION GEOMETRY (TRANSLATION/REFLECTION)",
        de: "TRANSFORMATIONSGEOMETRIE (VERSCHIEBUNG/SPIEGELUNG)",
        ar: "??????? ????????? (???????/????????)",
        hi: "???????? ???????? (??????????/????????)",
        ms: "GEOMETRI TRANSFORMASI (TRANSLASI/PANTULAN)",
        id: "GEOMETRI TRANSFORMASI (TRANSLASI/REFLEKSI)",
        zh: "????(??/??)",
        ru: "????????? ?????????????? (???????/?????????)",
        es: "GEOMETRï¿½A DE TRANSFORMACIï¿½N (TRASLACIï¿½N/REFLEXIï¿½N)",
        fr: "Gï¿½OMï¿½TRIE DE TRANSFORMATION (TRANSLATION/Rï¿½FLEXION)",
        pt: "GEOMETRIA DE TRANSFORMAï¿½ï¿½O (TRANSLAï¿½ï¿½O/REFLEXï¿½O)",
        ja: "?????(??/??)",
        link: "https://bekrmatmt25.my.canva.site/oteleme-ve-yansima"
    },
    {
        tr: "Dï¿½RTGEN ï¿½Eï¿½ï¿½TLERï¿½ KAVRAM HARï¿½TASI",
        en: "CONCEPT MAP OF QUADRILATERAL TYPES",
        de: "BEGRIFFSMAP DER VIERECKARTEN",
        ar: "????? ?????? ????? ??????? ????????",
        hi: "???????? ???????? ?? ??????? ????????",
        ms: "PETA KONSEP JENIS SISI EMPAT",
        id: "PETA KONSEP JENIS SEGI EMPAT",
        zh: "????????",
        ru: "?????????????? ????? ????? ?????????????????",
        es: "MAPA CONCEPTUAL DE TIPOS DE CUADRILï¿½TEROS",
        fr: "CARTE CONCEPTUELLE DES TYPES DE QUADRILATï¿½RES",
        pt: "MAPA CONCEITUAL DE TIPOS DE QUADRILï¿½TEROS",
        ja: "???????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-kavram-haritasi"
    },
    {
        tr: "Dï¿½RTGENLER GENEL ï¿½IKARIMLAR",
        en: "GENERAL INFERENCES ABOUT QUADRILATERALS",
        de: "ALLGEMEINE SCHLUSSFOLGERUNGEN ï¿½BER VIERECKE",
        ar: "??????????? ?????? ??? ??????? ????????",
        hi: "?????????? ?? ???? ??? ??????? ????????",
        ms: "INFERENS UMUM TENTANG SISI EMPAT",
        id: "KESIMPULAN UMUM TENTANG SEGI EMPAT",
        zh: "??????????",
        ru: "????? ?????? ? ?????????????????",
        es: "INFERENCIAS GENERALES SOBRE CUADRILï¿½TEROS",
        fr: "INFERENCES Gï¿½Nï¿½RALES SUR LES QUADRILATï¿½RES",
        pt: "INFERï¿½NCIAS GERAIS SOBRE QUADRILï¿½TEROS",
        ja: "?????????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-genel-cikarimlar"
    },
    {
        tr: "KESï¿½RLERï¿½N FARKLI Gï¿½STERï¿½MLERï¿½",
        en: "DIFFERENT REPRESENTATIONS OF FRACTIONS",
        de: "VERSCHIEDENE DARSTELLUNGEN VON BRï¿½CHEN",
        ar: "??????? ?????? ??????",
        hi: "??????? ?? ??????? ??????",
        ms: "PERWAKILAN PECAHAN YANG BERBEZA",
        id: "BERBAGAI REPRESENTASI PECAHAN",
        zh: "?????????",
        ru: "????????? ????????????? ??????",
        es: "DIFERENTES REPRESENTACIONES DE FRACCIONES",
        fr: "DIFFï¿½RENTES REPRï¿½SENTATIONS DES FRACTIONS",
        pt: "DIFERENTES REPRESENTAï¿½ï¿½ES DE FRAï¿½ï¿½ES",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/kesirlerin-farkl-g-sterimleri"
    },
    {
        tr: "Kï¿½ï¿½EGENLERDEN Dï¿½RTGENLERE (1)",
        en: "FROM DIAGONALS TO QUADRILATERALS (1)",
        de: "VON DIAGONALEN ZU VIERECKEN (1)",
        ar: "?? ??????? ??? ??????? ???????? (1)",
        hi: "???????? ?? ???????? ?? (1)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (1)",
        id: "DARI DIAGONAL KE SEGI EMPAT (1)",
        zh: "???????? (1)",
        ru: "?? ?????????? ? ????????????????? (1)",
        es: "DE LAS DIAGONALES A LOS CUADRILï¿½TEROS (1)",
        fr: "DES DIAGONALES AUX QUADRILATï¿½RES (1)",
        pt: "DAS DIAGONAIS AOS QUADRILï¿½TEROS (1)",
        ja: "????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-egenlerden-d-rtgenlere"
    },
    {
        tr: "CEBï¿½RSEL ï¿½FADELER TEMEL KAVRAMLAR",
        en: "ALGEBRAIC EXPRESSIONS BASIC CONCEPTS",
        de: "ALGEBRAISCHE AUSDRï¿½CKE - GRUNDBEGRIFFE",
        ar: "???????? ???????? ????????? ???????",
        hi: "????????? ?????? ???????? ?????????",
        ms: "UNGKAPAN ALGEBRA KONSEP ASAS",
        id: "KONSEP DASAR EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????????? ?????????: ???????? ???????",
        es: "EXPRESIONES ALGEBRAICAS CONCEPTOS Bï¿½SICOS",
        fr: "EXPRESSIONS ALGï¿½BRIQUES CONCEPTS DE BASE",
        pt: "EXPRESSï¿½ES ALGï¿½BRICAS CONCEITOS Bï¿½SICOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-temel-kavramlar"
    },
    {
        tr: "CEBï¿½RSEL ï¿½FADELER Sï¿½ZELDEN CEBï¿½RE",
        en: "ALGEBRAIC EXPRESSIONS FROM VERBAL TO ALGEBRAIC",
        de: "VON DER SPRACHE ZUR ALGEBRA",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????? ?? ?????????",
        ms: "UNGKAPAN ALGEBRA DARIPADA LISAN KEPADA ALGEBRA",
        id: "EKSPRESI ALJABAR DARI VERBAL KE ALJABAR",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ???? ? ???????",
        es: "EXPRESIONES ALGEBRAICAS DE VERBAL A ALGEBRAICO",
        fr: "EXPRESSIONS ALGï¿½BRIQUES DU VERBAL ï¿½ L'ALGï¿½BRIQUE",
        pt: "EXPRESSï¿½ES ALGï¿½BRICAS DO VERBAL PARA O ALGï¿½BRICO",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerle-oyun-tasar-m-kopyas"
    },
    {
        tr: "CEBï¿½RSEL ï¿½FADELER CEBï¿½RDEN Sï¿½ZELE",
        en: "ALGEBRAIC EXPRESSIONS FROM ALGEBRAIC TO VERBAL",
        de: "VON DER ALGEBRA ZUR SPRACHE",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????????? ?? ?????",
        ms: "UNGKAPAN ALGEBRA DARIPADA ALGEBRA KEPADA LISAN",
        id: "EKSPRESI ALJABAR DARI ALJABAR KE VERBAL",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ??????? ? ??????",
        es: "EXPRESIONES ALGEBRAICAS DE ALGEBRAICO A VERBAL",
        fr: "EXPRESSIONS ALGï¿½BRIQUES DE L'ALGï¿½BRIQUE AU VERBAL",
        pt: "EXPRESSï¿½ES ALGï¿½BRICAS DO ALGï¿½BRICO PARA O VERBAL",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-2-cebirden-s-zele"
    },
    {
        tr: "CEBï¿½RSEL ï¿½FADELER DEï¿½ER HESAPLAMA",
        en: "CALCULATING VALUES OF ALGEBRAIC EXPRESSIONS",
        de: "BERECHNEN VON WERTE ALGEBRAISCHER AUSDRï¿½CKE",
        ar: "???? ??? ????????? ???????",
        hi: "????????? ???????? ?? ????? ?? ????",
        ms: "MENGIRA NILAI UNGKAPAN ALGEBRA",
        id: "MENGHITUNG NILAI EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????? ???????? ?????????????? ?????????",
        es: "CALCULAR VALORES DE EXPRESIONES ALGEBRAICAS",
        fr: "CALCUL DES VALEURS D'EXPRESSIONS ALGï¿½BRIQUES",
        pt: "CALCULAR VALORES DE EXPRESSï¿½ES ALGï¿½BRICAS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerin-degerini-hesaplamak"
    },
    {
        tr: "ARAï¿½TIRMA ADIMLARI (Canva)",
        en: "RESEARCH STEPS (Canva)",
        de: "FORSCHUNGSSCHRITTE (Canva)",
        ar: "????? ????? (?????)",
        hi: "???????? ??? (Canva)",
        ms: "LANGKAH PENYELIDIKAN (Canva)",
        id: "LANGKAH PENELITIAN (Canva)",
        zh: "???? (Canva)",
        ru: "????? ???????????? (Canva)",
        es: "PASOS DE INVESTIGACIï¿½N (Canva)",
        fr: "ï¿½TAPES DE RECHERCHE (Canva)",
        pt: "PASSOS DE PESQUISA (Canva)",
        ja: "??????? (Canva)",
        link: "https://bekrmatmt25.my.canva.site/5-sinif-arastirma-adimlari"
    },
    {
        tr: "ARAï¿½TIRMA ADIMLARI (GitHub)",
        en: "RESEARCH STEPS (GitHub)",
        de: "FORSCHUNGSSCHRITTE (GitHub)",
        ar: "????? ????? (??? ???)",
        hi: "???????? ??? (GitHub)",
        ms: "LANGKAH PENYELIDIKAN (GitHub)",
        id: "LANGKAH PENELITIAN (GitHub)",
        zh: "???? (GitHub)",
        ru: "????? ???????????? (GitHub)",
        es: "PASOS DE INVESTIGACIï¿½N (GitHub)",
        fr: "ï¿½TAPES DE RECHERCHE (GitHub)",
        pt: "PASSOS DE PESQUISA (GitHub)",
        ja: "??????? (GitHub)",
        link: "https://bdemir1499.github.io/5.sinif-arastirma-asamalari/"
    },
    {
        tr: "ï¿½ï¿½GENDE YARDIMCI ELEMANLAR",
        en: "AUXILIARY ELEMENTS IN TRIANGLES",
        de: "HILFSELEMENTE IN DREIECKEN",
        ar: "??????? ???????? ?? ??????",
        hi: "????????? ??? ????? ????",
        ms: "ELEMEN PEMBANTU DALAM SEGI TIGA",
        id: "UNSUR PEMBANTU DALAM SEGITIGA",
        zh: "?????????",
        ru: "??????????????? ???????? ? ?????????????",
        es: "ELEMENTOS AUXILIARES EN TRIï¿½NGULOS",
        fr: "ï¿½Lï¿½MENTS AUXILIAIRES DANS LES TRIANGLES",
        pt: "ELEMENTOS AUXILIARES EM TRIï¿½NGULOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/ucgende-yardim-i-elemanlar"
    },
    {
        tr: "ï¿½ï¿½GEN ï¿½ï¿½Zï¿½Mï¿½",
        en: "TRIANGLE DRAWING",
        de: "DREIECKE ZEICHNEN",
        ar: "??? ??????",
        hi: "??????? ?????",
        ms: "LUKISAN SEGI TIGA",
        id: "MENGGAMBAR SEGITIGA",
        zh: "?????",
        ru: "?????????? ????????????",
        es: "DIBUJO DE TRIï¿½NGULOS",
        fr: "DESSIN DE TRIANGLE",
        pt: "DESENHO DE TRIï¿½NGULOS",
        ja: "??????",
        link: "https://bekrmatmt25.my.canva.site/ucgen-cizim-sartlari"
    },
    {
        tr: "ï¿½ï¿½GENDE Eï¿½Lï¿½K VE BENZERLï¿½K",
        en: "CONGRUENCE AND SIMILARITY IN TRIANGLES",
        de: "KONGRUENZ UND ï¿½HNLICHKEIT IN DREIECKEN",
        ar: "????? ?????? ????????",
        hi: "????????? ??? ??????????? ?? ???????",
        ms: "KONGRUEN DAN KESERUPAAN DALAM SEGI TIGA",
        id: "KEKONGRUENAN DAN KESEBANGUNAN DALAM SEGITIGA",
        zh: "?????????",
        ru: "?????????????? ? ??????? ?????????????",
        es: "CONGRUENCIA Y SEMEJANZA EN TRIï¿½NGULOS",
        fr: "CONGRUENCE ET SIMILITUDE DANS LES TRIANGLES",
        pt: "CONGRUï¿½NCIA E SEMELHANï¿½A EM TRIï¿½NGULOS",
        ja: "?????????",
        link: "https://bdemir1499.github.io/eslikvebenzerlik/"
    },
    {
        tr: "PRï¿½ZMALARIN ELEMANLARI",
        en: "ELEMENTS OF PRISMS",
        de: "ELEMENTE VON PRISMEN",
        ar: "????? ?????????",
        hi: "??????? ?? ????",
        ms: "ELEMEN PRISMA",
        id: "UNSUR-UNSUR PRISMA",
        zh: "?????",
        ru: "???????? ?????",
        es: "ELEMENTOS DE LOS PRISMAS",
        fr: "ï¿½Lï¿½MENTS DES PRISMES",
        pt: "ELEMENTOS DOS PRISMAS",
        ja: "?????",
        link: "https://bekrmatmt25.my.canva.site/prizmalarin-elemanlar-ve-a-inimlari"
    },
    {
        tr: "Pï¿½RAMï¿½T VE Aï¿½INIMI",
        en: "PYRAMID AND ITS NET",
        de: "PYRAMIDE UND IHR NETZ",
        ar: "????? ??????",
        hi: "??????? ?? ???? ???",
        ms: "PIRAMID DAN BENTANGANNYA",
        id: "LIMAS DAN JARING-JARINGNYA",
        zh: "???????",
        ru: "???????? ? ?? ?????????",
        es: "PIRï¿½MIDE Y SU DESARROLLO",
        fr: "PYRAMIDE ET SON PATRON",
        pt: "PIRï¿½MIDE E SUA PLANIFICAï¿½ï¿½O",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/piramidin-elemanlar-ve-acinimi"
    },
    {
        tr: "PRï¿½ZMA, Pï¿½RAMï¿½T, KONï¿½, Sï¿½Lï¿½NDï¿½R",
        en: "PRISM, PYRAMID, CONE, CYLINDER",
        de: "PRISMA, PYRAMIDE, KEGEL, ZYLINDER",
        ar: "???????? ?????? ???????? ?????????",
        hi: "???????, ???????, ????, ????",
        ms: "PRISMA, PIRAMID, KON, SILINDIR",
        id: "PRISMA, LIMAS, KERUCUT, TABUNG",
        zh: "???????????",
        ru: "??????, ????????, ?????, ???????",
        es: "PRISMA, PIRï¿½MIDE, CONO, CILINDRO",
        fr: "PRISME, PYRAMIDE, Cï¿½NE, CYLINDRE",
        pt: "PRISMA, PIRï¿½MIDE, CONE, CILINDRO",
        ja: "???????????",
        link: "https://sites.google.com/view/uc-boyutlu-sekiller/ana-sayfa_1"
    },
    {
        tr: "Kï¿½ï¿½EGENLERDEN Dï¿½RTGENLERE (2)",
        en: "FROM DIAGONALS TO QUADRILATERALS (2)",
        de: "VON DIAGONALEN ZU VIERECKEN (2)",
        ar: "?? ??????? ??? ??????? ???????? (2)",
        hi: "???????? ?? ???????? ?? (2)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (2)",
        id: "DARI DIAGONAL KE SEGI EMPAT (2)",
        zh: "???????? (2)",
        ru: "?? ?????????? ? ????????????????? (2)",
        es: "DE LAS DIAGONALES A LOS CUADRILï¿½TEROS (2)",
        fr: "DES DIAGONALES AUX QUADRILATï¿½RES (2)",
        pt: "DAS DIAGONAIS AOS QUADRILï¿½TEROS (2)",
        ja: "????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/kosegenlerden-dortgenlere"
    }
];

// --- BURAYA YAPIï¿½TIR ---
window.sendNetworkData = function (dataObj) {
    if (dataObj && dataObj.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 40) return; // Limit to ~25 FPS to prevent WebRTC buffer overflow
        window.lastPreviewTime = Date.now();
    }

    // 1. Durum: Eï¿½er bu cihaz TABLET ise (tahtaya baï¿½lï¿½yï¿½z)
    if (typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        myConnection.send(dataObj);
    }
    // 2. Durum: Eï¿½er bu cihaz AKILLI TAHTA ise (baï¿½lï¿½ olan tabletlere gï¿½nder)
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        for (let id in window.aktifBaglantilar) {
            if (window.aktifBaglantilar[id] && window.aktifBaglantilar[id].open) {
                window.aktifBaglantilar[id].send(dataObj);
            }
        }
    }
};


// Sayfa aï¿½ï¿½ldï¿½ï¿½ï¿½nda kï¿½rmï¿½zï¿½ butonun yanlï¿½ï¿½lï¿½kla gï¿½rï¿½nmesini engellemek iï¿½in:
const closePdfBtn = document.getElementById('btn-close-pdf');
if (closePdfBtn) {
    closePdfBtn.classList.add('hidden');
    closePdfBtn.style.display = 'none'; // Kesin olarak gizle
}




function getGlobalCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    let cX = e.clientX;
    let cY = e.clientY;

    // --- Sï¿½Zï¿½N ORï¿½Jï¿½NAL HATA KORUMA MANTIï¿½INIZ (Avuï¿½ iï¿½i karï¿½ï¿½masï¿½nï¿½ engeller) ---
    // Eï¿½er cX tanï¿½msï¿½zsa (saf dokunmatikse) o anki geï¿½erli dokunuï¿½u (targetTouches) alï¿½r.
    if (cX === undefined || cX === null || isNaN(cX)) {
        if (e.targetTouches && e.targetTouches.length > 0) {
            cX = e.targetTouches[0].clientX;
            cY = e.targetTouches[0].clientY;
        } else if (e.touches && e.touches.length > 0) {
            cX = e.touches[0].clientX;
            cY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            cX = e.changedTouches[0].clientX;
            cY = e.changedTouches[0].clientY;
        } else {
            cX = 0;
            cY = 0;
        }
    }

    return {
        x: ((cX || 0) - rect.left) * (canvas.width / rect.width),
        y: ((cY || 0) - rect.top) * (canvas.height / rect.height)
    };
}

// --- GRAFï¿½K TABLET Sï¿½Mï¿½LATï¿½Rï¿½ ---
function getPointerInfo(e) {
    // BURAYI false YAPTIK!
    const testModuAcik = false;

    // Eï¿½er test modu aï¿½ï¿½ksa ve fare kullanï¿½lï¿½yorsa, onu "Kalem" gibi kandï¿½r
    if (testModuAcik && e.pointerType === 'mouse') {
        return {
            type: 'pen',
            pressure: Math.random() * 0.8 + 0.2
        };
    }

    return {
        type: e.pointerType,
        pressure: e.pressure || 1
    };
}


// --- KANVAS AYARLARI ---

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

function setupCanvasResolution() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1; // ?? Cihazï¿½n HD piksel oranï¿½nï¿½ (Retina Gï¿½cï¿½nï¿½) al

    // Kanvasï¿½n iï¿½ piksel sayï¿½sï¿½nï¿½, ekranï¿½n gerï¿½ek HD ï¿½ï¿½zï¿½nï¿½rlï¿½ï¿½ï¿½ ile eï¿½itle
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Arka planï¿½ (bg-canvas) da boyut ve oran olarak %100 eï¿½itle (Daralmayï¿½ ï¿½nler)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = canvas.style.width || (rect.width + 'px');
        bgCanvas.style.height = canvas.style.height || (rect.height + 'px');
        bgCanvas.width = canvas.width;
        bgCanvas.height = canvas.height;
    }

    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

// 1. Uygulama ilk aï¿½ï¿½ldï¿½ï¿½ï¿½nda ï¿½alï¿½ï¿½tï¿½r
setupCanvasResolution();

// 2. Ekran boyutu her deï¿½iï¿½tiï¿½inde (yï¿½kle butonu sonrasï¿½ veya yan ï¿½evirince) ï¿½alï¿½ï¿½tï¿½r
window.addEventListener('resize', setupCanvasResolution);

// PARDUS KESï¿½N ï¿½ï¿½Zï¿½M: Tarayï¿½cï¿½nï¿½n kaydï¿½rma ve yakï¿½nlaï¿½tï¿½rma yapmasï¿½nï¿½ yasakla
canvas.style.touchAction = 'none';
canvas.style.userSelect = 'none';
document.body.style.overscrollBehavior = 'none';


// --- RESï¿½M Yï¿½KLEME DEï¿½ï¿½ï¿½KENLERï¿½ ---
let backgroundImage = null; // Yï¿½klenen resmi tutacak deï¿½iï¿½ken
const uploadButton = document.getElementById('btn-upload');
const fileInput = document.getElementById('file-input');

// --- app.js (Dï¿½ZELTï¿½LMï¿½ï¿½ BAï¿½LANGIï¿½ Bï¿½Lï¿½Mï¿½) ---

// --- SESLER (Tï¿½Mï¿½ ï¿½PTAL EDï¿½LDï¿½ / SESSï¿½Z MOD) ---
// Gerï¿½ek ses dosyalarï¿½ yerine, hiï¿½bir iï¿½ yapmayan "sahte" bir oynatï¿½cï¿½ tanï¿½mlï¿½yoruz.
// Bu sayede alt satï¿½rlardaki hiï¿½bir kodu silmenize gerek kalmaz, hepsi sessizce ï¿½alï¿½ï¿½ï¿½r.

const silentAudio = {
    play: function () { },   // ï¿½al komutu gelirse: Hiï¿½bir ï¿½ey yapma.
    pause: function () { },  // Durdur komutu gelirse: Hiï¿½bir ï¿½ey yapma.
    currentTime: 0,        // Sï¿½re ayarï¿½ gelirse: Kabul et ama iï¿½leme.
    src: ""
};

window.audio_click = silentAudio;
let audio_click_src_set = true; // Hata vermemesi iï¿½in "ayarlandï¿½" sayï¿½yoruz.
window.audio_undo = silentAudio;
window.audio_draw = silentAudio;
window.audio_eraser = silentAudio;


// --- DEï¿½ï¿½ï¿½KENLER ---

let snapshotStart = null;
const animateButton = document.getElementById('btn-animate');
let currentTool = 'none';
let isPinching = false;           // ï¿½ki parmakla yakï¿½nlaï¿½tï¿½rma aktif mi?
let initialDistance = 0;          // Baï¿½langï¿½ï¿½ parmak mesafesi (zoom iï¿½in)
let initialScale = 0;             // Baï¿½langï¿½ï¿½ta seï¿½ili nesnenin geniï¿½liï¿½i
let initialCenter = { x: 0, y: 0 }; // ï¿½ki parmaï¿½ï¿½n merkez noktasï¿½ (pan iï¿½in)
let currentPenColor = '#FFFFFF';
let currentPenWidth = 4;
window.currentLineColor = '#FFFFFF'; // Varsayï¿½lan Renk: BEYAZ
const SNAP_THRESHOLD = 10;
let returnToSnapshot = false; // ï¿½ï¿½lem bitince geri dï¿½nï¿½lecek mi? 
// ==========================================
// --- 3D Cï¿½Sï¿½MLER ï¿½ï¿½ï¿½N YENï¿½ DEï¿½ï¿½ï¿½KENLER VE Sï¿½RGï¿½ OLUï¿½TURUCU (ADIM 1) ---
// ==========================================
let isDrawing3D = false;
let current3DShape = null; // Hangi 3D ï¿½ekil seï¿½ili (ï¿½rn: '3d_kare_piramit')
let temp3DData = null;     // ï¿½izim esnasï¿½ndaki canlï¿½ ï¿½nizleme verisi
let active3DSliderStroke = null; // Sï¿½rgï¿½sï¿½ oynatï¿½lan seï¿½ili 3D cisim

// Sï¿½rgï¿½ (Slider) Kutusunu HTML'e Otomatik Ekle
const sliderContainer = document.createElement('div');
sliderContainer.id = 'slider-container';
sliderContainer.innerHTML = `
    <label>Aï¿½ï¿½nï¿½m (Katlama)</label>
    <input type="range" id="shape-slider" min="0" max="100" value="0">
`;
const leftPanel = document.querySelector('.left-panel');
const btnOyunlarOptions = document.getElementById('oyunlar-options');
if (leftPanel && btnOyunlarOptions) {
    leftPanel.insertBefore(sliderContainer, btnOyunlarOptions.nextSibling);
} else {
    document.body.appendChild(sliderContainer);
}
const shapeSlider = document.getElementById('shape-slider');

// Alan / Hacim Gï¿½sterge Kutusunu HTML'e Otomatik Ekle
const infoTooltip = document.createElement('div');
infoTooltip.id = 'info-tooltip';
document.body.appendChild(infoTooltip);

// Sï¿½rgï¿½ hareket ettiï¿½inde seï¿½ili 3D cismin aï¿½ï¿½nï¿½mï¿½nï¿½ gï¿½ncelle
shapeSlider.addEventListener('input', (e) => {
    // ?? BURASI 'window' OLARAK Gï¿½NCELLENDï¿½ (Artï¿½k ï¿½ekli tanï¿½yacak!) ??
    if (window.active3DSliderStroke) {
        window.active3DSliderStroke.openRatio = parseInt(e.target.value) / 100;

        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'sekil_guncelle', stroke: window.active3DSliderStroke });
        }
        if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
    }
});


let nextPointChar = 'A';
window.nextPointChar = nextPointChar;

let lineStartPoint = null;
let currentMousePos = { x: 0, y: 0 };
let snapTarget = null;
let snapHoverTimer = null;

window.tempPolygonData = null;

let isDrawingLine = false;
let isDrawingInfinityLine = false;
let isDrawingSegment = false;
let isDrawingRay = false;
let isMoving = false;
let selectedItem = null;
let selectedPointKey = null;
let rotationPivot = null;
let dragStartPos = { x: 0, y: 0 };
let originalStartPos = {};
let currentPDF = null;       // Yï¿½klenen PDF dosyasï¿½
let currentPDFPage = 1;      // ï¿½u anki sayfa
let totalPDFPages = 0;       // Toplam sayfa
let pdfImageStroke = null;   // Ekrana ï¿½izilen PDF sayfasï¿½

// --- HTML ELEMENTLERï¿½ ---
const body = document.body;

// 1. Sol Panel Araï¿½larï¿½
const penButton = document.getElementById('btn-kalem');
const eraserButton = document.getElementById('btn-silgi');
const lineButton = document.getElementById('btn-cizgi');
const rulerButton = document.getElementById('btn-cetvel');
const gonyeButton = document.getElementById('btn-gonye');
const aciolcerButton = document.getElementById('btn-aciolcer');
const pergelButton = document.getElementById('btn-pergel');
const polygonButton = document.getElementById('btn-cokgenler');
const oyunlarButton = document.getElementById('btn-oyunlar');
const oyunlarOptions = document.getElementById('oyunlar-options');

if (oyunlarOptions) {
    oyunlarOptions.classList.add('hidden');
}
oyunlarButton.classList.remove('active');


// --- Dï¿½KDï¿½RTGEN BUTONU TANIMLAMASI ---
const dikdortgenButton = document.getElementById('btn-dikdortgen');

if (dikdortgenButton) {
    dikdortgenButton.addEventListener('click', () => {
        if (typeof window.setActiveTool === 'function') {
            window.setActiveTool('draw_rectangle');
        } else {
            currentTool = 'draw_rectangle';
        }
    });
}
// --------------------------------------

// 2. Alt Menï¿½ Butonlarï¿½ ve Seï¿½enekler
const penOptions = document.getElementById('pen-options');
const colorBoxes = document.querySelectorAll('#pen-options .color-box');
const lineOptions = document.getElementById('line-options');
const pointButton = document.getElementById('btn-nokta');
const straightLineButton = document.getElementById('btn-d_cizgi');
const infinityLineButton = document.getElementById('btn-dogru');
const segmentButton = document.getElementById('btn-dogru_parcasi');
const rayButton = document.getElementById('btn-isin');
const lineColorOptions = document.querySelectorAll('#line-color-options .color-box');
const polygonOptions = document.getElementById('polygon-options');
const polygonPreviewLabel = document.getElementById('polygon-preview-label');
const circleButton = document.getElementById('btn-cember');
const regularPolygonButtons = document.querySelectorAll('#polygon-options button[data-sides]');
const polygonColorOptions = document.querySelectorAll('#polygon-color-options .color-box');
// ?? Burada oyunlarOptions tekrar tanï¿½mlanmadï¿½, yukarï¿½daki global tanï¿½m kullanï¿½lacak.


// 3. Saï¿½ Panel Araï¿½larï¿½
const undoButton = document.getElementById('btn-undo');
const clearAllButton = document.getElementById('btn-clear-all');
const moveButton = document.getElementById('btn-move');
const fillButton = document.getElementById('btn-fill');
const fillOptions = document.getElementById('fill-options');
const fillColorBoxes = document.querySelectorAll('#fill-options .color-box');
let currentFillColor = '#FF69B4';

// --- CANLANDIR VE KES MENï¿½Sï¿½ (Gï¿½NCELLENMï¿½ï¿½ VE Bï¿½RLEï¿½Tï¿½Rï¿½LMï¿½ï¿½) ---
const btnSnapshotMain = document.getElementById('btn-snapshot-main');
const snapshotOptions = document.getElementById('snapshot-options');
const btnSnapshotBox = document.getElementById('btn-snapshot-box');
const btnSnapshotLasso = document.getElementById('btn-snapshot-lasso');

let menuAcilisKilidi = false;
const toggleSnapshotMenu = (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (menuAcilisKilidi) return;
    menuAcilisKilidi = true;
    setTimeout(() => { menuAcilisKilidi = false; }, 300);

    let sOptions = document.getElementById('snapshot-options') || document.querySelector('.snapshot-options');
    if (!sOptions) return;

    // Ekrandaki gerï¿½ek gï¿½rï¿½nï¿½rlï¿½k durumunu kontrol et (inline style dahil)
    const menuKapaliMi = sOptions.classList.contains('hidden') || sOptions.style.display === 'none';

    if (menuKapaliMi) {
        // Aracï¿½ aktif et
        if (typeof setActiveTool === 'function') {
            setActiveTool('snapshot');
        } else {
            currentTool = 'snapshot';
        }

        // Menï¿½yï¿½ gï¿½rï¿½nï¿½r yap ve inline style engelini kaldï¿½r
        sOptions.classList.remove('hidden');
        sOptions.style.display = 'flex';
        sOptions.style.zIndex = '10000';

        // Butonlarï¿½n aktiflik durumunu gï¿½ncelle
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active');
        if (animateButton) animateButton.classList.add('active');

        // Hizalamayï¿½ yap
        const refBtn = btnSnapshotMain || animateButton;
        if (refBtn) {
            const buttonRect = refBtn.getBoundingClientRect();
            const panelRect = refBtn.parentElement.getBoundingClientRect();
            sOptions.style.top = `${buttonRect.top - panelRect.top}px`;
        }
    } else {
        // Menï¿½yï¿½ kapat ve aracï¿½ sï¿½fï¿½rla
        if (typeof setActiveTool === 'function') {
            setActiveTool('none');
        } else {
            currentTool = 'none';
        }

        sOptions.classList.add('hidden');
        sOptions.style.display = 'none';

        if (btnSnapshotMain) btnSnapshotMain.classList.remove('active');
        if (animateButton) animateButton.classList.remove('active');
    }
};

if (btnSnapshotMain) {
    btnSnapshotMain.onclick = null;
    btnSnapshotMain.ontouchstart = null;
    btnSnapshotMain.addEventListener('click', toggleSnapshotMenu);
    btnSnapshotMain.addEventListener('pointerdown', toggleSnapshotMenu);
}
if (btnSnapshotBox) {
    btnSnapshotBox.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('snapshot'); // Kutu aracï¿½nï¿½ seï¿½
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}
if (btnSnapshotLasso) {
    btnSnapshotLasso.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('lasso'); // Serbest (Kement) kesim aracï¿½nï¿½ seï¿½
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}

// 4. Resim ve PDF Yï¿½kleme Araï¿½larï¿½


const pdfControls = document.getElementById('pdf-controls');
const pageCountLabel = document.getElementById('page-count-label');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');




// --- Gï¿½RSEL YARDIMCILAR ---
const snapIndicator = document.createElement('div');
snapIndicator.id = 'snap-indicator';
body.appendChild(snapIndicator);
const eraserPreview = document.createElement('div');
eraserPreview.className = 'eraser-cursor-preview';
body.appendChild(eraserPreview);


// --- YARDIMCI FONKSï¿½YONLAR ---

function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function advanceChar(char) {
    let charCode = char.charCodeAt(0) + 1;
    if (charCode > 90) charCode = 65;
    return String.fromCharCode(charCode);
}

function findSnapPoint(pos) {
    for (const stroke of drawnStrokes) {
        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { x: stroke.x, y: stroke.y };
        } else if (stroke.type === 'straightLine' || stroke.type === 'segment') {
            if (distance(pos, stroke.p1) < SNAP_THRESHOLD) return stroke.p1;
            if (distance(pos, stroke.p2) < SNAP_THRESHOLD) return stroke.p2;
        }
    }
    return null;
}


function getEventPosition(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
}

function drawDot(pos, color = '#00FFCC') {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLabel(text, pos, color = '#FF69B4') {
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = color;
    ctx.fillText(text, pos.x + 8, pos.y + 5);
}

function drawInfinityLine(p1, p2, color, width, isRay = false) {
    const INFINITY = 5000;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return { ux: 0, uy: 0 };
    const ux = dx / mag;
    const uy = dy / mag;
    const drawP1 = isRay ? p1 : { x: p1.x - ux * INFINITY, y: p1.y - uy * INFINITY };
    const drawP2 = { x: p1.x + ux * INFINITY, y: p1.y + uy * INFINITY };
    ctx.beginPath();
    ctx.moveTo(drawP1.x, drawP1.y);
    ctx.lineTo(drawP2.x, drawP2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    return { ux, uy };
}

window.bringToolToFront = function (clickedElement) {
    const tools = [
        window.RulerTool ? window.RulerTool.rulerElement : null,
        window.GonyeTool ? window.GonyeTool.gonyeElement : null,
        window.AciolcerTool ? window.AciolcerTool.aciolcerElement : null,
        window.PergelTool ? window.PergelTool.pergelElement : null
    ];
    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Araï¿½lara dokununca z-index'leri 5'e dï¿½ï¿½ï¿½p ï¿½izim tahtasï¿½nï¿½n altï¿½nda kayboluyordu!
    // Artï¿½k araï¿½lar her zaman 9990 ve 9999 gï¿½cï¿½nde en ï¿½stte kalacak.
    tools.forEach(tool => { if (tool) tool.style.zIndex = 9990; });
    if (clickedElement) clickedElement.style.zIndex = 9999;
}

function redrawAllStrokes() {
    // 1. ï¿½NCE KOORDï¿½NATLARI SIFIRLA VE Tï¿½M EKRANI Sï¿½L
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bgCanvas = document.getElementById('bg-canvas');
    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
    if (bgCtx) {
        bgCtx.setTransform(1, 0, 0, 1, 0, 0);
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

    // Gï¿½VENLï¿½K Kï¿½Lï¿½Dï¿½
    if (!window.drawnStrokes || window.drawnStrokes.length === 0) return;

    // --- Bï¿½Yï¿½K ï¿½ï¿½Zï¿½M: KATMAN (Z-INDEX) KORUMASI ---
    // Arka planï¿½ (sayfayï¿½ veya pdf'i) her zaman zorla en alta gï¿½nderir.
    // Bï¿½ylece kopyalar, makaslar ve ï¿½izimler ASLA sayfanï¿½n altï¿½nda kalmaz!
    window.drawnStrokes.sort((a, b) => {
        if (a.isBackground && !b.isBackground) return -1;
        if (!a.isBackground && b.isBackground) return 1;
        return 0;
    });

    ctx.save();
    // (Buradaki translate ve scale satï¿½rlarï¿½nï¿½ tamamen sildik. Zemin artï¿½k sabit!)

    for (const stroke of drawnStrokes) {

        // --- BU BLOï¿½U Dï¿½NGï¿½Nï¿½N EN BAï¿½INA EKLE ---
        if (stroke.type === 'preview') {
            const p = stroke.payload;
            ctx.save();
            ctx.strokeStyle = '#FF0000'; // Kï¿½rmï¿½zï¿½
            ctx.lineWidth = 4;
            ctx.setLineDash([5, 5]); // Kesikli

            if (p.tool === 'pen' && p.path && p.path.length > 0) {
                // ?? Kalem iï¿½in canlï¿½ ï¿½nizleme kesiksiz ve kendi renginde olmalï¿½!
                ctx.setLineDash([]);
                ctx.strokeStyle = p.color || '#FFFFFF';
                // ?? Kalï¿½nlï¿½k: Gï¿½nderilen orijinal kalï¿½nlï¿½ï¿½ï¿½ (baseWidth) kullan
                ctx.lineWidth = p.baseWidth || window.currentLineWidth || 3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                ctx.beginPath();
                ctx.moveTo(p.path[0].x, p.path[0].y);
                for (let i = 1; i < p.path.length; i++) {
                    ctx.lineTo(p.path[i].x, p.path[i].y);
                }
                ctx.stroke();
            }
            else if (['straightLine', 'line', 'segment', 'ray'].includes(p.tool) && p.start && p.end) {
                ctx.beginPath();
                const dx = p.end.x - p.start.x, dy = p.end.y - p.start.y, devCarpan = 5000;
                if (p.tool === 'line') { ctx.moveTo(p.start.x - dx * devCarpan, p.start.y - dy * devCarpan); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else if (p.tool === 'ray') { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.end.x, p.end.y); }
                ctx.stroke();
            }
            // ?? ï¿½ï¿½Zï¿½M: Dï¿½KDï¿½RTGEN VE ï¿½OKGENLERï¿½ DAï¿½RE YERï¿½NE KENDï¿½ ï¿½EKLï¿½YLE ï¿½ï¿½Z
            else if ((p.tool === 'rectangle' || p.tool === 'draw_rectangle') && p.start && p.end) {
                ctx.beginPath();
                ctx.rect(Math.min(p.start.x, p.end.x), Math.min(p.start.y, p.end.y), Math.abs(p.end.x - p.start.x), Math.abs(p.end.y - p.start.y));
                ctx.stroke();
            }
            else if (p.tool === 'polygon' && p.start && p.end) {
                const cx = p.start.x, cy = p.start.y, radius = p.radius, sides = p.sides;
                ctx.beginPath();
                if (!sides || sides === 0) {
                    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                } else if (sides >= 3) {
                    const angleRad = p.rotation || 0;
                    for (let i = 0; i <= sides; i++) {
                        const polyAngle = (i * 2 * Math.PI / sides) + angleRad;
                        const px = cx + radius * Math.cos(polyAngle);
                        const py = cy + radius * Math.sin(polyAngle);
                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }
            else if (p.start && p.end) {
                const radius = p.radius || Math.hypot(p.end.x - p.start.x, p.end.y - p.start.y);
                ctx.beginPath(); ctx.arc(p.start.x, p.start.y, radius, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
            continue; // Bu nesneyi ï¿½izdik, diï¿½er dï¿½ngï¿½lere girmesine gerek yok // Bu nesneyi ï¿½izdik, diï¿½er dï¿½ngï¿½lere girmesine gerek yok
        }
        // ------------------------------------------

        // ... (Senin mevcut if (stroke.type === 'pen') { ... } kodlarï¿½n burada devam edecek)
        // --- AKILLI BOYAMA MASKESï¿½ ---
        if (stroke.type === 'lasso-mask') {
            ctx.save();

            // Lazerle ï¿½effaf delme iptal, akï¿½llï¿½ tarayï¿½cï¿½nï¿½n bulduï¿½u renkle boyama devrede!
            ctx.fillStyle = stroke.fillColor || "white";

            ctx.beginPath();
            if (stroke.points && stroke.points.length > 0) {
                ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
            }
            ctx.closePath();

            // Kestiï¿½in tam o noktayï¿½, sensï¿½rlerin bulduï¿½u sarï¿½ renge pï¿½rï¿½zsï¿½zce boyar
            ctx.fill();
            ctx.restore();
            continue;
        }

        // --- KALEM (PEN) SABï¿½T KALINLIK VE YUMUï¿½ATILMIï¿½ ï¿½ï¿½Zï¿½M (BEZIER CURVE) ---
        if (stroke.type === 'pen') {
            const points = stroke.path;

            if (points.length < 2) {
                // Sadece tï¿½klandï¿½ysa tek bir nokta koy (Basï¿½nï¿½ iptal)
                ctx.beginPath();
                ctx.arc(points[0].x, points[0].y, stroke.baseWidth / 2, 0, Math.PI * 2);
                ctx.fillStyle = stroke.color;
                ctx.fill();
            } else {
                // --- Kï¿½ï¿½ELERï¿½ YOK EDEN YUMUï¿½ATMA (SMOOTHING) ALGORï¿½TMASI ---
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                ctx.strokeStyle = stroke.color;

                // 1. BASINï¿½ ï¿½PTALï¿½: Kalï¿½nlï¿½k her zaman standart ve sabittir
                ctx.lineWidth = stroke.baseWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // 2. Kï¿½ï¿½E ï¿½PTALï¿½: Noktalarï¿½ dï¿½z ï¿½izgiyle deï¿½il, esnek eï¿½rilerle (Bezier) baï¿½lar
                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                // Son noktayï¿½ eï¿½rinin ucuna baï¿½la
                ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
                ctx.stroke();
            }
        }


        // --- RESï¿½M / PDF VE CANLANDIR (SNAPSHOT) KOPYASI ---
        else if (stroke.type === 'image') {

            // 1. Eï¿½ER BU Bï¿½R PDF VEYA ARKA PLAN ï¿½SE SADECE ï¿½ERï¿½EVESï¿½Nï¿½ ï¿½ï¿½Z, KENDï¿½Nï¿½ EN ARKAYA SAKLA
            if (stroke.isBackground !== false) {
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    ctx.translate(centerX, centerY);
                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                    // Kesikli Seï¿½im ï¿½erï¿½evesi
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    // 1. Dï¿½ndï¿½rme Butonu (ï¿½st Orta - Yeï¿½il)
                    const rotX = 0;
                    const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath();
                    ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    // 2. Boyutlandï¿½rma Butonu (Saï¿½ Alt - Pembe)
                    const resX = stroke.width / 2;
                    const resY = stroke.height / 2;
                    ctx.beginPath();
                    ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);

                    ctx.restore();
                }
                continue; // ï¿½ï¿½lemi bitir ve resmin kendini ï¿½izmesi iï¿½in en arkaya (destination-over) pasla
            }

            // 2. Eï¿½ER BU KESTï¿½ï¿½ï¿½Mï¿½Z Bï¿½R Yï¿½ZEN KOPYAYSA (CANLANDIR) EKRANA ï¿½ï¿½Z VE ï¿½ERï¿½EVE EKLE
            let imgToDraw = null;
            if (stroke.img && stroke.img instanceof HTMLImageElement) {
                imgToDraw = stroke.img;
            } else if (stroke.imgData) {
                if (!stroke.imgObj) {
                    stroke.imgObj = new Image();
                    stroke.imgObj.src = stroke.imgData;
                    stroke.imgObj.onload = () => { if (window.redrawAllStrokes) window.redrawAllStrokes(); };
                }
                imgToDraw = stroke.imgObj;
            }

            if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                ctx.save();
                const centerX = stroke.x + (stroke.width / 2);
                const centerY = stroke.y + (stroke.height / 2);
                ctx.translate(centerX, centerY);
                ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                ctx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);

                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    const rotX = 0; const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath(); ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    const resX = stroke.width / 2; const resY = stroke.height / 2;
                    ctx.beginPath(); ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);
                }
                ctx.restore();
            }
        }

        // --- NOKTA ---
        else if (stroke.type === 'point') {
            drawDot(stroke, stroke.color); // ?? Noktanï¿½n kendi rengini kullanmasï¿½nï¿½ saï¿½lar
            drawLabel(stroke.label, stroke, stroke.color); // ?? Harfin de aynï¿½ renk olmasï¿½nï¿½ saï¿½lar
        }

        // --- Dï¿½Z ï¿½ï¿½ZGï¿½ ---
        else if (stroke.type === 'straightLine') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width;
            ctx.lineCap = 'round';
            ctx.stroke();
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- DOï¿½RU ---
        else if (stroke.type === 'line') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, false);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- DOï¿½RU PARï¿½ASI ---
        else if (stroke.type === 'segment') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();
            drawLabel(stroke.label1, stroke.p1, '#FF69B4');
            drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- Iï¿½IN ---
        else if (stroke.type === 'ray') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, true);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- ï¿½OKGENLER ---
        else if (stroke.type === 'polygon') {
            if (window.PolygonTool && typeof window.PolygonTool.calculateVertices === 'function') {
                const vertices = window.PolygonTool.calculateVertices(stroke.center, stroke.radius, stroke.sideCount, stroke.rotation);
                stroke.vertices = vertices;

                if (vertices.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let i = 1; i < vertices.length; i++) ctx.lineTo(vertices[i].x, vertices[i].y);
                    ctx.closePath();
                }

                ctx.fillStyle = stroke.fillColor || 'rgba(0, 0, 0, 0.2)';
                ctx.fill();
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = stroke.width || 4;
                ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.stroke();

                drawDot(stroke.center, stroke.color);
                drawLabel(stroke.label, stroke.center, '#FF69B4');
                vertices.forEach(v => drawDot(v, stroke.color));

                if (stroke.showEdgeLabels) {
                    for (let j = 0; j < vertices.length; j++) {
                        const v1 = vertices[j];
                        const v2 = vertices[(j + 1) % vertices.length];
                        const midPoint = { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2 };
                        const edgeLabel = window.PolygonTool.getEdgeLength(v1, v2);
                        drawLabel(edgeLabel, midPoint, '#FF69B4');
                    }
                }
                if (stroke.showAngleLabels) {
                    const angleLabel = window.PolygonTool.getInternalAngle(stroke.sideCount);
                    const arcRadius = 25;
                    for (let j = 0; j < vertices.length; j++) {
                        const v_current = vertices[j];
                        const v_prev = vertices[j === 0 ? vertices.length - 1 : j - 1];
                        const v_next = vertices[(j + 1) % vertices.length];
                        const startAngle = Math.atan2(v_prev.y - v_current.y, v_prev.x - v_current.x);
                        const endAngle = Math.atan2(v_next.y - v_current.y, v_next.x - v_current.x);
                        ctx.beginPath();
                        ctx.arc(v_current.x, v_current.y, arcRadius, endAngle, startAngle);
                        ctx.strokeStyle = '#FFFF00'; ctx.lineWidth = 2; ctx.stroke();
                        const angle_label_x = (v_current.x * 0.8) + (stroke.center.x * 0.2);
                        const angle_label_y = (v_current.y * 0.8) + (stroke.center.y * 0.2);
                        drawLabel(angleLabel, { x: angle_label_x, y: angle_label_y }, '#FFFF00');
                    }
                }
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(rotateHandlePos.x, rotateHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'; ctx.fill(); ctx.strokeStyle = '#0F0'; ctx.lineWidth = 2; ctx.stroke();
                    const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(resizeHandlePos.x, resizeHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 0, 255, 0.8)'; ctx.fill(); ctx.strokeStyle = '#F0F'; ctx.lineWidth = 2; ctx.stroke();
                }
            }
        }

        // --- 3D HOLOGRRAM MOTORU Yï¿½NLENDï¿½RMESï¿½ VE 2D SENKRONU ---
        else if (stroke.type === '3d_shape') {
            if (window.ThreeDTool && typeof window.ThreeDTool.drawShape === 'function') window.ThreeDTool.drawShape(ctx, stroke);

            // 1. ï¿½ï¿½ BOYUTLU NESNEYï¿½ 2D EKRAN MERKEZï¿½NE VE BOYUTUNA ZORLA UYDUR (SENKRONï¿½ZASYON)
            if (window.Scene3D && window.Scene3D.scene) {
                const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === stroke.id);
                if (sceneMesh) {
                    if (stroke.rotationX !== undefined) sceneMesh.rotation.x = stroke.rotationX;
                    if (stroke.rotationY !== undefined) sceneMesh.rotation.y = stroke.rotationY;
                    if (stroke.rotationZ !== undefined) sceneMesh.rotation.z = stroke.rotationZ;
                    
                   const canvasElm = document.getElementById('drawing-canvas');
                    if (canvasElm) {
                        const myCw = canvasElm.width;
                        const myCh = canvasElm.height;
                        
                        // ?? Sï¿½RGï¿½ KORUMASI: Sï¿½rgï¿½ ï¿½ekilince deï¿½iï¿½en geniï¿½lik yerine mï¿½hï¿½rlï¿½ original deï¿½erleri kullan
                        const refX = stroke.originalX !== undefined ? stroke.originalX : stroke.x;
                        const refY = stroke.originalY !== undefined ? stroke.originalY : stroke.y;
                        const refW = stroke.originalW !== undefined ? stroke.originalW : stroke.width;
                        const refH = stroke.originalH !== undefined ? stroke.originalH : stroke.height;

                        const cx = refX + (refW / 2);
                        const cy = refY + (refH / 2);
                        
                        const nx = (cx / myCw) * 2 - 1;
                        const ny = -(cy / myCh) * 2 + 1;

                        const raycaster = new THREE.Raycaster();
                        raycaster.setFromCamera(new THREE.Vector2(nx, ny), window.Scene3D.camera);
                        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                        const intersection = new THREE.Vector3();
                        
                        if (raycaster.ray.intersectPlane(plane, intersection)) {
                            sceneMesh.position.copy(intersection);
                        }

                        if (stroke.pos3D && stroke.pos3D.z !== undefined) {
                            sceneMesh.position.z = stroke.pos3D.z;
                        }
                        
                        // ?? KUSURSUZ BOYUT + Aï¿½ ï¿½Lï¿½Eï¿½ï¿½: Koordinatlarï¿½ bozmadan sadece pembe buton ï¿½arpanï¿½nï¿½ ekliyoruz
                        const threeJSHeightRatio = 30 / myCh;
                        const targetThreeJSWidth = refW * threeJSHeightRatio;
                        const originalThreeJSWidth = sceneMesh.userData.baseSize * 2;
                        const gercekOlcek = targetThreeJSWidth / originalThreeJSWidth;
                        
                        const mScale = stroke.meshScale || 1;
                        sceneMesh.scale.setScalar(gercekOlcek * mScale);
                    }
                }
            }

            // 2. SEï¿½ï¿½Lï¿½YKEN YEï¿½ï¿½L VE PEMBE KULPLARI ï¿½ï¿½Z (ESKï¿½ ï¿½ZELLï¿½ï¿½ï¿½N GERï¿½ GELMESï¿½)
            if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                ctx.save();
                const cX = stroke.x + stroke.width / 2;
                const cY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                ctx.translate(cX, cY);
                ctx.rotate(angleRad);

                // Seï¿½im ï¿½erï¿½evesi
                ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                ctx.setLineDash([]);
                ctx.restore();
            }
        }
        else if (stroke.type === 'rectangle') {
            ctx.save();
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            ctx.translate(centerX, centerY);
            ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

            // 1. Dikdï¿½rtgeni ï¿½iz
            ctx.beginPath();
            ctx.rect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = 4;
            ctx.stroke();

            // 2. Kenar Uzunluklarï¿½nï¿½ Yazdï¿½r (ï¿½nizlemedeki gibi kalï¿½cï¿½ olur)
            if (stroke.showEdgeLabels) {
                ctx.font = "14px Arial";
                ctx.fillStyle = stroke.color;
                ctx.textAlign = "center";

                const wCm = (stroke.width / 30).toFixed(1).replace('.', ',');
                const hCm = (stroke.height / 30).toFixed(1).replace('.', ',');

                // ï¿½st Kenar CM
                ctx.fillText(`${wCm} cm`, 0, -stroke.height / 2 - 10);

                // Sol Kenar CM (Dikey yazdï¿½rmak iï¿½in dï¿½ndï¿½rï¿½yoruz)
                ctx.save();
                ctx.translate(-stroke.width / 2 - 25, 0);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(`${hCm} cm`, 0, 0);
                ctx.restore();
            }

            // 3. Kï¿½ï¿½e Harflerini Yazdï¿½r (A, B, C, D)
            if (stroke.labels) {
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = "#FF69B4"; // Pembe harfler
                ctx.fillText(stroke.labels[0], -stroke.width / 2 - 15, -stroke.height / 2 - 5); // Sol ï¿½st
                ctx.fillText(stroke.labels[1], stroke.width / 2 + 10, -stroke.height / 2 - 5);  // Saï¿½ ï¿½st
                ctx.fillText(stroke.labels[2], stroke.width / 2 + 10, stroke.height / 2 + 15);  // Saï¿½ Alt
                ctx.fillText(stroke.labels[3], -stroke.width / 2 - 15, stroke.height / 2 + 15); // Sol Alt
            }

            // 4. "Taï¿½ï¿½" Modu Aktifse Butonlarï¿½ ï¿½iz
            if (currentTool === 'move' && selectedItem === stroke) {
                // Dï¿½ndï¿½rme (Yeï¿½il)
                ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(0, -stroke.height / 2 - 30, 12, 0, 7); ctx.fill();
                // Boyutlandï¿½rma (Pembe)
                ctx.fillStyle = '#F0F'; ctx.beginPath(); ctx.arc(stroke.width / 2, stroke.height / 2, 12, 0, 7); ctx.fill();
            }

            // 5. Aï¿½ï¿½ Tï¿½klandï¿½ysa 90 Derece Sembolï¿½nï¿½ ï¿½iz
            if (stroke.showAngleLabels) {
                ctx.font = "bold 14px Arial"; ctx.fillStyle = "yellow";
                ctx.fillText("90ï¿½", -stroke.width / 2 + 15, -stroke.height / 2 + 20);
            }
            ctx.restore();
        }



        // --- ï¿½EMBER / PERGEL ---
        else if (stroke.type === 'arc') {
            const PI_RAD = Math.PI / 180;
            let startRad = stroke.startAngle * PI_RAD;
            let endRad = stroke.endAngle * PI_RAD;
            const totalAngleDrawn = Math.abs(stroke.endAngle - stroke.startAngle);

            if (totalAngleDrawn >= 359) { startRad = 0; endRad = 2 * Math.PI; }

            ctx.beginPath();
            ctx.arc(stroke.cx, stroke.cy, stroke.radius, startRad, endRad, false);
            if (totalAngleDrawn >= 359) ctx.closePath();

            if (stroke.fillColor && stroke.fillColor !== 'transparent' && totalAngleDrawn >= 359) {
                ctx.fillStyle = stroke.fillColor;
                ctx.fill();
            }

            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            const centerPos = { x: stroke.cx, y: stroke.cy };
            drawDot(centerPos, stroke.color);
            if (stroke.label) drawLabel(stroke.label, centerPos, '#FF69B4');

            if (stroke.showCircleInfo) {
                ctx.beginPath();
                ctx.moveTo(centerPos.x, centerPos.y);
                ctx.lineTo(centerPos.x + stroke.radius, centerPos.y);
                ctx.strokeStyle = '#FF69B4'; ctx.lineWidth = 1; ctx.setLineDash([2, 2]); ctx.stroke(); ctx.setLineDash([]);

                const PI = window.PolygonTool.PI_VALUE || 3;
                const r_px = stroke.radius;
                const r_cm_raw = (r_px / (window.PolygonTool.PIXELS_PER_CM || 30));
                const r_cm_calc = parseFloat(r_cm_raw.toFixed(2));
                const r_cm_str = r_cm_raw.toFixed(2).replace('.', ',');
                const circ_str = (2 * PI * r_cm_calc).toFixed(2).replace('.', ',');
                const area_str = (PI * r_cm_calc * r_cm_calc).toFixed(2).replace('.', ',');

                const r_label = `r = ${r_cm_str} cm`;
                drawLabel(r_label, { x: centerPos.x + (r_px / 2) - 20, y: centerPos.y - 10 }, '#FFFF00');
                let labelY = centerPos.y - 20;
                const labelX = centerPos.x + r_px + 30;
                drawLabel(`ï¿½ = 2 . ? . r`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= 2 . ${PI} . ${r_cm_str} = ${circ_str} cm`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`A = ? . rï¿½`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= ${PI} . ${r_cm_str}ï¿½ = ${area_str} cmï¿½`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`(? = ${PI} alï¿½ndï¿½)`, { x: labelX, y: labelY }, '#AAAAAA');
            }
        }
    } // <-- FOR Dï¿½NGï¿½Sï¿½ BURADA KAPANIYOR

    ctx.restore();

    // === EKLENECEK YENï¿½ Bï¿½Lï¿½M: SAYFAYI EN ARKAYA ï¿½ï¿½Z ===
    if (bgCtx) {
        bgCtx.save();
        for (const stroke of drawnStrokes) {
            if (stroke.type === 'image' && stroke.isBackground !== false) {
                let imgToDraw = null;
                if (stroke.img && stroke.img instanceof HTMLImageElement) {
                    imgToDraw = stroke.img;
                } else if (stroke.imgObj) {
                    imgToDraw = stroke.imgObj;
                }

                if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                    bgCtx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    bgCtx.translate(centerX, centerY);
                    bgCtx.rotate((stroke.rotation || 0) * Math.PI / 180);
                    bgCtx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    bgCtx.restore();
                }
            }
            // Ayrï¿½ca Lasso-mask ile PDF ï¿½zerinde delik aï¿½ï¿½lmï¿½ï¿½sa onu da bgCtx'den siliyoruz
            else if (stroke.type === 'lasso-mask') {
                bgCtx.save();
                bgCtx.globalCompositeOperation = 'destination-out';
                bgCtx.beginPath();
                bgCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    bgCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
                bgCtx.closePath();
                bgCtx.fill();
                bgCtx.restore();
            }
        }
        bgCtx.restore();
    }
    // ====================================================

    // --- YENï¿½ EKLENEN KISIM: OTOMATï¿½K HARF SENKRONï¿½ZASYONU ---
    // Ekranda o an var olan en yï¿½ksek harfi bulur
    let maxCode = 64;
    drawnStrokes.forEach(s => {
        if (s.label && s.label.charCodeAt(0) > maxCode) maxCode = s.label.charCodeAt(0);
        if (s.label1 && s.label1.charCodeAt(0) > maxCode) maxCode = s.label1.charCodeAt(0);
        if (s.label2 && s.label2.charCodeAt(0) > maxCode) maxCode = s.label2.charCodeAt(0);
    });


    // Sï¿½radaki harfe geï¿½er (Z'yi geï¿½erse A'ya dï¿½ner)
    let nextCode = maxCode + 1;
    if (nextCode > 90) nextCode = 65;

    // Tï¿½m sistemi (Pergel, ï¿½okgenler ve Kalem) tek bir harfe senkronize eder
    nextPointChar = String.fromCharCode(nextCode);
    window.nextPointChar = nextPointChar;
    // ---------------------------------------------------------

    // --- 4. ADIM: YENï¿½ POLï¿½GONAL LASSO ï¿½Nï¿½ZLEMESï¿½ ---
    if (currentTool === 'lasso' && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) {
        ctx.save();

        // 1. SABï¿½TLENMï¿½ï¿½ ï¿½ï¿½ZGï¿½LERï¿½ ï¿½ï¿½Z (Noktalar arasï¿½)
        ctx.strokeStyle = '#00ffcc'; // ï¿½izgi rengi turkuaz
        ctx.lineWidth = 2;
        ctx.setLineDash([]); // Sabit ï¿½izgiler dï¿½z olsun
        ctx.beginPath();
        ctx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
        for (let i = 1; i < lassoPoints.length; i++) {
            ctx.lineTo(lassoPoints[i].x, lassoPoints[i].y);
        }
        ctx.stroke();

        // 2. KESï¿½KLï¿½ ï¿½Nï¿½ZLEME ï¿½ï¿½ZGï¿½Sï¿½Nï¿½ ï¿½ï¿½Z (Son noktadan imlece giden)
        if (typeof currentMousePos !== 'undefined' && currentMousePos) {
            ctx.beginPath();
            ctx.setLineDash([6, 6]); // Kesikli ï¿½izgi efekti
            ctx.strokeStyle = '#aaaaaa';
            let lastPoint = lassoPoints[lassoPoints.length - 1];
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(currentMousePos.x, currentMousePos.y);
            ctx.stroke();
        }

        // 3. TIKLANAN NOKTALARI (Kï¿½ï¿½ï¿½K YUVARLAKLARI) ï¿½ï¿½Z
        ctx.fillStyle = '#ff0044';
        ctx.setLineDash([]);
        for (let i = 0; i < lassoPoints.length; i++) {
            ctx.beginPath();
            // ï¿½LK noktayï¿½ hedef olarak gï¿½stermek iï¿½in daha Bï¿½Yï¿½K ï¿½iziyoruz
            let radius = (i === 0) ? 8 : 4;
            ctx.arc(lassoPoints[i].x, lassoPoints[i].y, radius, 0, Math.PI * 2);
            ctx.fill();

            // ï¿½lk noktanï¿½n etrafï¿½na beyaz bir hedef halkasï¿½ ekle
            if (i === 0) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.restore();
    } // <-- BURASI YENï¿½ POLï¿½GONAL LASSO BLOï¿½UNUN Bï¿½Tï¿½ï¿½ PARANTEZï¿½


    // --- HASSAS HEDEFLEME ï¿½APRAZI (KESKï¿½N Nï¿½ï¿½ANCI MODU) ---
    // (Lasso seï¿½iliyse ve parmak ekrana basï¿½lï¿½ysa her zaman ï¿½ï¿½kar)
    if (currentTool === 'lasso' && window.isDraggingLassoPoint && typeof currentMousePos !== 'undefined' && currentMousePos) {
        ctx.save();
        ctx.beginPath();
        // Ekranï¿½n bir ucundan diï¿½er ucuna yatay ve dikey hizalama ï¿½izgileri
        ctx.moveTo(0, currentMousePos.y);
        ctx.lineTo(canvas.width, currentMousePos.y);
        ctx.moveTo(currentMousePos.x, 0);
        ctx.lineTo(currentMousePos.x, canvas.height);

        ctx.setLineDash([4, 4]); // Kesikli

        // Eï¿½er baï¿½langï¿½ï¿½ noktasï¿½na kilitlendiysek ï¿½apraz YEï¿½ï¿½L olsun
        if (window.lassoIsClosing) {
            ctx.strokeStyle = '#00FF00'; // Kilitlendi Yeï¿½ili
        } else {
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.7)'; // Normal Pembe
        }

        ctx.lineWidth = 1.5;
        ctx.stroke();


        // Tam dokunduï¿½un yere minik bir merkez noktasï¿½
        ctx.beginPath();
        ctx.arc(currentMousePos.x, currentMousePos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = window.lassoIsClosing ? '#00FF00' : '#ff00ff';
        ctx.fill();
        ctx.restore();
    }

} // <-- redrawAllStrokes FONKSï¿½YONU BURADA TAMAMEN KAPANIYOR


function processLassoCut() {
    if (lassoPoints.length < 3) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    lassoPoints.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const width = maxX - minX;
    const height = maxY - minY;
    if (width < 5 || height < 5) return;

    // =======================================================
    // 1. X-RAY (Rï¿½NTGEN) SENSï¿½Rï¿½: Tï¿½m katmanlarï¿½ birleï¿½tirip gerï¿½ek rengi okur
    // =======================================================
    function getRealColor(x, y) {
        const tCan = document.createElement('canvas');
        tCan.width = 1; tCan.height = 1;
        const tCtx = tCan.getContext('2d');

        // Alttaki PDF katmanï¿½nï¿½ oku
        const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');
        if (bgLayer) {
            const sX = bgLayer.width / bgLayer.offsetWidth;
            const sY = bgLayer.height / bgLayer.offsetHeight;
            tCtx.drawImage(bgLayer, x * sX, y * sY, 1 * sX, 1 * sY, 0, 0, 1, 1);
        } else {
            tCtx.fillStyle = "white"; tCtx.fillRect(0, 0, 1, 1);
        }
        // ï¿½stteki ï¿½izim katmanï¿½nï¿½ ekle
        tCtx.drawImage(canvas, x, y, 1, 1, 0, 0, 1, 1);
        return tCtx.getImageData(0, 0, 1, 1).data;
    }

    // =======================================================
    // 2. KESTï¿½ï¿½ï¿½Mï¿½Z PARï¿½AYI (KOPYAYI) OLUï¿½TUR (X-Ray kullanarak keser)
    // =======================================================
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width; offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');

    offCtx.beginPath();
    offCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        offCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    offCtx.closePath();
    offCtx.clip();

    const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');

    // Yï¿½ksek kaliteli ï¿½izim ayarlarï¿½nï¿½ etkinleï¿½tir
    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';

    if (bgLayer) {
        // Kanvasï¿½n HD ï¿½ï¿½zï¿½nï¿½rlï¿½k oranï¿½nï¿½ al (DPR)
        const dprCanvasX = canvas.width / canvas.getBoundingClientRect().width;
        const dprCanvasY = canvas.height / canvas.getBoundingClientRect().height;

        // PDF koordinatlarï¿½nï¿½ tabletin piksel yoï¿½unluï¿½una gï¿½re kusursuz olarak eï¿½itle
        const sX = (bgLayer.width / bgLayer.offsetWidth) / dprCanvasX;
        const sY = (bgLayer.height / bgLayer.offsetHeight) / dprCanvasY;
        offCtx.drawImage(bgLayer, minX * sX, minY * sY, width * sX, height * sY, 0, 0, width, height);
    }
    offCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
    const imgSrc = offCanvas.toDataURL('image/png', 1.0); // Kaliteyi en ï¿½ste sabitle

    // =======================================================
    // 3. AKILLI RENK BULUCU
    // =======================================================
    let smartColor = "white";
    try {
        const cX = minX + width / 2;
        const cY = minY + height / 2;
        const centerPixel = getRealColor(cX, cY);

        const margin = 15;
        const scanPoints = [
            { x: minX - margin, y: cY },
            { x: maxX + margin, y: cY },
            { x: cX, y: minY - margin },
            { x: cX, y: maxY + margin }
        ];

        for (let p of scanPoints) {
            const px = getRealColor(p.x, p.y);
            // Renk farkï¿½nï¿½ hesapla
            const diff = Math.abs(px[0] - centerPixel[0]) + Math.abs(px[1] - centerPixel[1]) + Math.abs(px[2] - centerPixel[2]);
            if (diff > 50) {
                smartColor = `rgb(${px[0]}, ${px[1]}, ${px[2]})`;
                break;
            }
        }
    } catch (e) {
        console.warn("Renk okuma hatasï¿½", e);
    }

    // =======================================================
    // 4. ZOOM UYUMLU, KALICI YAMA OLUï¿½TURUCU
    // =======================================================
    const patchCanvas = document.createElement('canvas');
    patchCanvas.width = width; patchCanvas.height = height;
    const pCtx = patchCanvas.getContext('2d');
    pCtx.fillStyle = smartColor;
    pCtx.beginPath();
    pCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        pCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    pCtx.closePath();
    pCtx.fill(); // Rengi boya

    const patchImg = new Image();
    patchImg.src = patchCanvas.toDataURL('image/png');
    patchImg.onload = () => {
        drawnStrokes.unshift({ // Yama her ï¿½eyin EN ALTINDA kalacak ï¿½ekilde baï¿½a eklenir
            type: 'image',
            imgObj: patchImg,
            x: minX, y: minY,
            width: width, height: height,
            rotation: 0,
            isBackground: true, // ZOOM YAPILDIï¿½INDA PDF ï¿½LE Bï¿½Yï¿½MESï¿½ ï¿½ï¿½ï¿½N
            isPatch: true       // SAYFA DEï¿½ï¿½ï¿½ï¿½NCE Sï¿½Lï¿½NMESï¿½ ï¿½ï¿½ï¿½N ï¿½ZEL ETï¿½KET
        });
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };

    // =======================================================
    // 5. KESTï¿½ï¿½ï¿½Nï¿½Z KOPYAYI EKRANA GETï¿½R VE OTOMATï¿½K SEï¿½
    // =======================================================
    const newImgStroke = {
        type: 'image',
        imgData: imgSrc,
        x: minX, y: minY,
        width: width, height: height,
        rotation: 0,
        isBackground: false, // KRï¿½Tï¿½K: Butonlarï¿½n ï¿½ï¿½kmasï¿½ iï¿½in false olmalï¿½
        imgObj: null
    };

    const tempImg = new Image();
    tempImg.src = imgSrc;
    tempImg.onload = () => {

        newImgStroke.imgObj = tempImg;
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };
    boxCopies.push(newImgStroke);


    // --- TABLETTE BUTONLARIN ï¿½IKMASI ï¿½ï¿½ï¿½N ï¿½ART ---
    selectedItem = newImgStroke; // Yeni kestiï¿½in parï¿½ayï¿½ anï¿½nda seï¿½
    isMoving = false;            // Sï¿½rï¿½kleme durumunu kapat

    // Aracï¿½ 'move' yap (Yukarï¿½da da yaptï¿½k ama burada da olmasï¿½ gï¿½venlidir)
    currentTool = 'move';

    if (window.redrawAllStrokes) window.redrawAllStrokes();
}


function undoLastStroke() {
    if (drawnStrokes.length > 0) {
        if (window.audio_undo) { window.audio_undo.currentTime = 0; window.audio_undo.play(); }

        // 1. Kendi listenden son ï¿½izgiyi sil
                const popped = drawnStrokes.pop();

        // 3D ï¿½EKï¿½LSE GERï¿½ ALIRKEN SAHNEDEN DE KALDIR
        if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
            const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
            if (meshToRemove) {
                meshToRemove.traverse((child) => {
                    if (child.isMesh || child.isLineSegments) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                            else child.material.dispose();
                        }
                    }
                });
                window.Scene3D.scene.remove(meshToRemove);
                if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                window.Scene3D.updateHandlePositions();
            }
        }

        // YENï¿½: KAT ï¿½Zï¿½ BIRAK (Undo sï¿½rasï¿½nda katlamalarï¿½ aï¿½arken iz bï¿½rak)
        if (popped && popped.isPatch === true && popped.foldLine) {
            const p1 = popped.foldLine[0];
            const p2 = popped.foldLine[1];
            // ï¿½z stroke'u oluï¿½tur (Daha ince ve daha az dikkat daï¿½ï¿½tï¿½cï¿½)
            const izStroke = {
                type: 'line', 
                points: [p1, p2],
                color: 'rgba(0, 0, 0, 0.2)', // Daha ï¿½effaf (dikkat daï¿½ï¿½tmaz)
                width: 1.5, // Daha ince
                isDash: true, 
                dashPattern: [6, 6], // Kesikli
                isBackground: false
            };
            drawnStrokes.push(izStroke);
        }

        // --- CANLI SINIF: TAHTAYA "SON ï¿½ï¿½Zï¿½Mï¿½ Sï¿½L" MESAJI Gï¿½NDER ---
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'geri_al' });
        }
        // ---------------------------------------------------------

        redrawAllStrokes();

    }
}

function clearAllStrokes() {
    // 1. Ses ï¿½al (varsa)
    if (drawnStrokes.length > 0) {
        if (window.audio_clear) window.audio_clear.play();
    }

    // 2. Tabletin yerel hafï¿½zasï¿½nï¿½ temizle (Arka planlarï¿½ koru)
    drawnStrokes = drawnStrokes.filter(stroke => stroke.isBackground === true);
    window.drawnStrokes = drawnStrokes;

    // ?? HEPSï¿½Nï¿½ Sï¿½LERKEN 3D SAHNEYï¿½ TAMAMEN SIFIRLA
    if (window.Scene3D && window.Scene3D.scene) {
        const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
        toRemove.forEach(m => {
            if (m.geometry) m.geometry.dispose();
            if (m.material) {
                if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
                else m.material.dispose();
            }
            window.Scene3D.scene.remove(m);
        });
        window.Scene3D.currentMesh = null;
        if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
    }

    // 3. Tarayï¿½cï¿½daki eski kayï¿½tlarï¿½ temizle (Eï¿½er PC veya Tablette localStorage kullanï¿½yorsan)
    if (window.localStorage) {
        window.localStorage.removeItem('drawnStrokes');
    }

    // 4. PC'ye "hepsini_sil" komutunu gï¿½nder
    if (typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'hepsini_sil' });
        console.log("Temizleme komutu PC'ye gï¿½nderildi.");
    }

    // 5. Harf sayacï¿½nï¿½ sï¿½fï¿½rla
    nextPointChar = 'A';
    window.nextPointChar = 'A';

    // 6. Ekranï¿½ tamamen yenile
    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

function findHit(pos) {
    for (let i = drawnStrokes.length - 1; i >= 0; i--) {
        const stroke = drawnStrokes[i];

        if (stroke.type === 'image') {
            const halfW = stroke.width / 2;
            const halfH = stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // --- KRï¿½Tï¿½K Dï¿½ZELTME: Resmin gerï¿½ek merkezini hesapla ---
            const centerX = stroke.x + halfW;
            const centerY = stroke.y + halfH;

            // --- A. Dï¿½NDï¿½RME KULPU (Rotate Handle) ALGILAMA ---
            const handleDist = halfH + 30;
            const rotX = centerX + Math.sin(angleRad) * handleDist;
            const rotY = centerY - Math.cos(angleRad) * handleDist;

            if (distance(pos, { x: rotX, y: rotY }) < 25) {
                return { item: stroke, pointKey: 'image_rotate' };
            }

            // --- B. BOYUTLANDIRMA KULPU (Resize Handle) ---
            const resLocalX = halfW * Math.cos(angleRad) - halfH * Math.sin(angleRad);
            const resLocalY = halfW * Math.sin(angleRad) + halfH * Math.cos(angleRad);
            const resX = centerX + resLocalX;
            const resY = centerY + resLocalY;

            if (distance(pos, { x: resX, y: resY }) < 25) {
                return { item: stroke, pointKey: 'image_resize' };
            }

            // --- C. RESï¿½M Gï¿½VDESï¿½ (Taï¿½ï¿½ma) ---
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localClickX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localClickY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);

            if (localClickX > -halfW && localClickX < halfW && localClickY > -halfH && localClickY < halfH) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        // --- 3D ï¿½EKï¿½L BUTON VE Gï¿½VDE SENSï¿½Rï¿½ (KUSURSUZ) ---
        if (stroke.type === '3d_shape') {
            const cX = stroke.x + stroke.width / 2;
            const cY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            if (currentTool === 'move' && selectedItem === stroke) {
                // Yeï¿½il (Dï¿½ndï¿½rme)
                const rotY = -stroke.height / 2 - 40;
                const rotX_world = cX + Math.sin(angleRad) * Math.abs(rotY);
                const rotY_world = cY - Math.cos(angleRad) * Math.abs(rotY);
                if (distance(pos, { x: rotX_world, y: rotY_world }) < 35) return { item: stroke, pointKey: 'image_rotate' };

                // Pembe (Boyutlandï¿½rma)
                const resX_local = stroke.width / 2 + 20;
                const resY_local = stroke.height / 2 + 20;
                const resX_world = cX + (resX_local * Math.cos(angleRad) - resY_local * Math.sin(angleRad));
                const resY_world = cY + (resX_local * Math.sin(angleRad) + resY_local * Math.cos(angleRad));
                if (distance(pos, { x: resX_world, y: resY_world }) < 35) return { item: stroke, pointKey: 'image_resize' };
            }

            // ?? 3D ï¿½eklin Tï¿½m Gï¿½vdesini Yakala (Taï¿½ï¿½ma Baï¿½lasï¿½n ve Butonlar ï¿½ï¿½ksï¿½n)
            if (distance(pos, { x: cX, y: cY }) < Math.max(stroke.width, stroke.height) + 30) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' && selectedItem === stroke) {
            if (stroke.type === 'polygon') {
                const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);

                const dRot = distance(pos, rotateHandlePos);
                const dRes = distance(pos, resizeHandlePos);

                // ?? PEMBE VE YEï¿½ï¿½L BUTON ï¿½AKIï¿½MA ZIRHI (ï¿½ncelik en yakï¿½n olana verilir)
                if (dRes < 35 && dRes <= dRot) return { item: stroke, pointKey: 'resize' };
                if (dRot < 35) return { item: stroke, pointKey: 'rotate' };
            }
        }


        // --- Dï¿½KDï¿½RTGEN YAKALAMA (TABLET UYUMLU) ---
        if (stroke.type === 'rectangle') {
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // A. Dï¿½ndï¿½rme Butonu (Yeï¿½il - ï¿½stte)
            const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 35);
            const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 35);
            if (distance(pos, { x: rotX, y: rotY }) < 30) return { item: stroke, pointKey: 'image_rotate' };

            // B. Boyutlandï¿½rma Butonu (Pembe - Saï¿½ Alt)
            const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
            const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
            if (distance(pos, { x: resX, y: resY }) < 30) return { item: stroke, pointKey: 'image_resize' };

            // C. Kï¿½ï¿½eler (90 Derece Aï¿½ï¿½ Gï¿½sterme - 30px hassasiyet)
            const corners = [
                { x: -stroke.width / 2, y: -stroke.height / 2 }, { x: stroke.width / 2, y: -stroke.height / 2 },
                { x: stroke.width / 2, y: stroke.height / 2 }, { x: -stroke.width / 2, y: stroke.height / 2 }
            ];
            for (let c of corners) {
                const cornerX = centerX + (c.x * Math.cos(angleRad) - c.y * Math.sin(angleRad));
                const cornerY = centerY + (c.x * Math.sin(angleRad) + c.y * Math.cos(angleRad));
                if (distance(pos, { x: cornerX, y: cornerY }) < 30) return { item: stroke, pointKey: 'toggle_angles' };
            }

            // D. Gï¿½vde (Merkezden Taï¿½ï¿½ma)
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
            if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' || currentTool === 'fill') { // Fill iï¿½in de hit gerekli
            if (stroke.type === 'polygon' && stroke.vertices) {
                for (let j = 0; j < stroke.vertices.length; j++) {
                    if (distance(pos, stroke.vertices[j]) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_angles' };
                }
                for (let j = 0; j < stroke.vertices.length; j++) {
                    const v1 = stroke.vertices[j];
                    const v2 = stroke.vertices[(j + 1) % stroke.vertices.length];
                    const lineLength = distance(v1, v2);
                    const steps = Math.max(1, Math.floor(lineLength / 5));
                    let hitEdge = false;
                    for (let step = 1; step < steps; step++) {
                        const t = step / steps;
                        const sampleX = v1.x + (v2.x - v1.x) * t;
                        const sampleY = v1.y + (v2.y - v1.y) * t;
                        if (distance({ x: sampleX, y: sampleY }, pos) < SNAP_THRESHOLD) { hitEdge = true; break; }
                    }
                    if (hitEdge) return { item: stroke, pointKey: 'toggle_edges' };
                }
            }

            if (stroke.type === 'rectangle') {
                const centerX = stroke.x + stroke.width / 2;
                const centerY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                // A. Dï¿½ndï¿½rme Butonu (Yeï¿½il)
                const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 30);
                const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 30);
                if (distance(pos, { x: rotX, y: rotY }) < 20) return { item: stroke, pointKey: 'image_rotate' };

                // B. Boyutlandï¿½rma Butonu (Pembe)
                const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
                const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
                if (distance(pos, { x: resX, y: resY }) < 20) return { item: stroke, pointKey: 'image_resize' };

                // C. Kï¿½ï¿½eye Tï¿½klama (Aï¿½ï¿½ Gï¿½sterme)
                if (distance(pos, { x: stroke.x, y: stroke.y }) < 20) return { item: stroke, pointKey: 'toggle_angles' };

                // D. Gï¿½vdeden Tutma (Merkezden Taï¿½ï¿½ma)
                const dx = pos.x - centerX; const dy = pos.y - centerY;
                const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
                const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
                if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                    return { item: stroke, pointKey: 'self' };
                }
            } if (stroke.type === 'arc' && stroke.cx) {
                const distToCenter = distance(pos, { x: stroke.cx, y: stroke.cy });
                if (Math.abs(distToCenter - stroke.radius) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_circle_info' };
            }
        }

        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'self' };
        }
        if (stroke.p1 && distance(pos, stroke.p1) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p1' };
        if (stroke.p2 && distance(pos, stroke.p2) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p2' };
        if (stroke.type === 'arc' && stroke.cx && distance(pos, { x: stroke.cx, y: stroke.cy }) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'center' };
        // ?? ï¿½OKGEN MERKEZï¿½NDEN TUTMA HASSASï¿½YETï¿½Nï¿½ ARTIR (TABLET ï¿½ï¿½ï¿½N)
        if (stroke.type === 'polygon' && stroke.center && distance(pos, stroke.center) < 50) return { item: stroke, pointKey: 'center' };
    }
    return null;
}

// Global atamalar
window.redrawAllStrokes = redrawAllStrokes;
window.advanceChar = advanceChar;
window.distance = distance;


// --- ARAï¿½ SEï¿½ï¿½Mï¿½ (TAMAMEN Dï¿½ZELTï¿½LMï¿½ï¿½ VERSï¿½YON) ---
function setActiveTool(tool) {
    // Oyunlar menï¿½sï¿½nï¿½ her araï¿½ deï¿½iï¿½iminde kapat ve inline olarak gizle
    if (oyunlarOptions) {
        oyunlarOptions.classList.add('hidden');
        oyunlarOptions.style.display = 'none';
    }
    if (oyunlarButton) oyunlarButton.classList.remove('active');

    // Mevcut butonlarï¿½n aktifliï¿½ini temizle
    penButton.classList.remove('active');
    eraserButton.classList.remove('active');
    lineButton.classList.remove('active');
    pointButton.classList.remove('active');
    straightLineButton.classList.remove('active');
    infinityLineButton.classList.remove('active');
    segmentButton.classList.remove('active');
    rayButton.classList.remove('active');
    // Fiziksel araï¿½ butonlarï¿½nï¿½n aktifliï¿½i baï¿½ï¿½msï¿½z yï¿½netilir
    polygonButton.classList.remove('active');
    circleButton.classList.remove('active');
    moveButton.classList.remove('active');
    if (fillButton) fillButton.classList.remove('active');
    if (animateButton) animateButton.classList.remove('active');

    // ï¿½mleï¿½leri temizle
    body.classList.remove('cursor-pen', 'cursor-eraser', 'cursor-snapshot');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yeni aracï¿½ ayarla
    currentTool = tool;

    // Seï¿½ilen aracï¿½n ï¿½ï¿½ï¿½ï¿½ï¿½nï¿½ yak
    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    }

    if (eraserPreview) eraserPreview.style.display = 'none';

    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: CSS ï¿½ncelik ï¿½eliï¿½kisini aï¿½mak iï¿½in gizlenen tï¿½m menï¿½leri inline (none) yapï¿½yoruz
    if (polygonOptions) {
        polygonOptions.classList.add('hidden');
        polygonOptions.style.display = 'none';
    }

    // ï¿½izgi menï¿½sï¿½nï¿½, SADECE yeni seï¿½ilen araï¿½ bir ï¿½izgi aracï¿½ DEï¿½ï¿½LSE inline olarak mï¿½hï¿½rle
    const isLineTool = ['point', 'straightLine', 'line', 'segment', 'ray'].includes(tool);
    if (!isLineTool && lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }

    if (fillOptions) {
        fillOptions.classList.add('hidden');
        fillOptions.style.display = 'none';
    }

    if (penOptions) {
        penOptions.classList.add('hidden');
        penOptions.style.display = 'none';
    }

    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }

    // ?? ï¿½ï¿½Zï¿½M 1: Kalem menï¿½sï¿½nï¿½ kesin olarak gizle
    if (penOptions) { penOptions.classList.add('hidden'); penOptions.style.display = 'none'; }

    // ... diï¿½er gizleme kodlarï¿½ buradadï¿½r ...
    penOptions.classList.add('hidden');

    // Aï¿½Aï¿½IDAKï¿½ BLOKU EKLï¿½YORSUN:
    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }
    // ...

    // Deï¿½iï¿½kenleri sï¿½fï¿½rla
    isDrawing = false;
    lineStartPoint = null;
    isDrawingLine = false;
    isDrawingInfinityLine = false;
    isDrawingSegment = false;
    isDrawingRay = false;

    // --- BURAYA Dï¿½KDï¿½RTGEN SIFIRLAMASINI EKLEYï¿½N ---
    isDrawingRectangle = false;
    rectStartPoint = null;

    window.tempPolygonData = null;
    polygonPreviewLabel.classList.add('hidden');

    // Fiziksel araï¿½lar baï¿½ï¿½msï¿½z ï¿½alï¿½ï¿½tï¿½ï¿½ï¿½ iï¿½in setActiveTool iï¿½erisinde gizlenmez.

    if (snapIndicator) snapIndicator.style.display = 'none';

    // Etkileï¿½imleri kapat
    if (window.RulerTool) window.RulerTool.interactionMode = 'none';
    if (window.GonyeTool) window.GonyeTool.interactionMode = 'none';
    if (window.AciolcerTool) window.AciolcerTool.interactionMode = 'none';
    if (window.PergelTool) window.PergelTool.interactionMode = 'none';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawAllStrokes();

    // 2. Yeni aracï¿½ aktif et
    currentTool = tool;

    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Seï¿½ilen araï¿½ 3D deï¿½ilse, 3D modunu tamamen kapat! (ï¿½okgen ï¿½izerken 3D ï¿½izmesini engeller)
    if (!tool || !tool.startsWith('draw_3d_')) {
        window.active3DShapeTool = null;
        if (window.Scene3D) {
            window.Scene3D.activeTool = 'none';
        }
    }

    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
        if (typeof penOptions !== 'undefined' && penOptions) {
            penOptions.classList.remove('hidden');
            penOptions.style.display = 'flex';
            penOptions.style.zIndex = '9999';
            if (penButton) penOptions.style.top = `${penButton.getBoundingClientRect().top - penButton.parentElement.getBoundingClientRect().top}px`;
        }
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    } else if (tool === 'snapshot') {
        if (animateButton) animateButton.classList.add('active');
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active'); // ?? EKLENDï¿½
        body.classList.add('cursor-snapshot');

        // ?? ï¿½ï¿½Zï¿½M 1: Canlandï¿½r alt menï¿½sï¿½nï¿½ KESï¿½N OLARAK aï¿½ ve hizala!
        if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
            snapshotOptions.classList.remove('hidden');
            snapshotOptions.style.display = 'flex';
            snapshotOptions.style.zIndex = '10000'; // ?? Z-index deï¿½eri yï¿½kseltildi
            const refBtn = btnSnapshotMain || animateButton; // ?? EKLENDï¿½
            if (refBtn) snapshotOptions.style.top = `${refBtn.getBoundingClientRect().top - refBtn.parentElement.getBoundingClientRect().top}px`;
        }
    }


    // --- ï¿½ï¿½ZGï¿½ ARAï¿½LARI GRUBU (Yï¿½KSEK CSS ï¿½NCELï¿½KLï¿½ Gï¿½STERï¿½M) ---
    if (isLineTool && lineOptions) {
        lineOptions.classList.remove('hidden');
        lineOptions.style.display = 'flex'; // ?? ï¿½izgi aracï¿½ seï¿½ildiï¿½inde gï¿½rï¿½nï¿½rlï¿½ï¿½ï¿½ inline olarak zorla aï¿½
    }

    if (tool === 'point') {
        lineButton.classList.add('active'); // Ana buton aktif
        pointButton.classList.add('active'); // Alt buton aktif
    } else if (tool === 'straightLine') {
        lineButton.classList.add('active');
        straightLineButton.classList.add('active');
    } else if (tool === 'line') {
        lineButton.classList.add('active');
        infinityLineButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'segment') {
        lineButton.classList.add('active');
        segmentButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'ray') {
        lineButton.classList.add('active');
        rayButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    }

    // --- Dï¿½ï¿½ER ARAï¿½LAR ---
    // --- Dï¿½ï¿½ER ARAï¿½LAR ---
    else if (tool === 'ruler') {
        togglePhysicalTool('ruler');
    } else if (tool === 'gonye') {
        togglePhysicalTool('gonye');
    } else if (tool === 'aciolcer') {
        togglePhysicalTool('aciolcer');
    } else if (tool === 'pergel') {
        togglePhysicalTool('pergel');
    }

    else if (tool.startsWith('draw_polygon_')) {
        polygonButton.classList.add('active');
    } else if (tool === 'move') {
        moveButton.classList.add('active');
    } else if (tool === 'fill') {
        if (fillButton) {
            fillButton.classList.add('active');
            fillOptions.classList.remove('hidden');
            fillOptions.style.display = 'flex';
            const buttonRect = fillButton.getBoundingClientRect();
            const panelRect = fillButton.parentElement.getBoundingClientRect();
            const topOffset = buttonRect.top - panelRect.top;
            fillOptions.style.top = `${topOffset}px`;
        }
    }

    redrawAllStrokes();
}
// --- BUTON OLAYLARI ---

penButton.addEventListener('click', () => setActiveTool(currentTool === 'pen' ? 'none' : 'pen'));
eraserButton.addEventListener('click', () => setActiveTool(currentTool === 'eraser' ? 'none' : 'eraser'));


// --- Fï¿½Zï¿½KSEL ARAï¿½ BUTONLARI KESï¿½N ï¿½ï¿½Zï¿½Mï¿½ (TABLET ZIRHI) ---
function togglePhysicalTool(aracAdi) {
    let toolObj = null, el = null, btn = null, isDisplayBlock = false;
    if (aracAdi === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); btn = rulerButton; }
    if (aracAdi === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); btn = gonyeButton; }
    if (aracAdi === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); btn = aciolcerButton; isDisplayBlock = true; }
    if (aracAdi === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); btn = pergelButton; isDisplayBlock = true; }

    if (!toolObj || !el) return;

    const isCurrentlyVisible = el.style.display !== 'none' && !el.classList.contains('hidden');

    if (isCurrentlyVisible) {
        // Gizle
        toolObj.hide();
        el.classList.add('hidden');
        el.style.display = 'none';
        el.style.zIndex = "-1";
        if (btn) btn.classList.remove('active');
    } else {
        // Gï¿½ster
        toolObj.show();
        el.classList.remove('hidden');
        el.style.display = isDisplayBlock ? 'block' : 'flex';
        el.style.zIndex = "9999";
        if (btn) btn.classList.add('active');

        if (aracAdi === 'pergel' && toolObj.state) {
            setTimeout(() => {
                toolObj.state.rotation = 0;
                toolObj.state.radius = 150;
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder();
            }, 100);
        }

        if (window.bringToolToFront) window.bringToolToFront(el || (toolObj ? toolObj.pergelElement || toolObj.rulerElement || toolObj.gonyeElement || toolObj.aciolcerElement : null));
    }

    setTimeout(() => { if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder(); }, 50);
}

const araciBaslat = (aracAdi) => {
    togglePhysicalTool(aracAdi);
};

const butonBagla = (btn, aracAdi) => {
    if (!btn) return;
    const tetikle = (e) => { e.preventDefault(); e.stopPropagation(); araciBaslat(aracAdi); };
    btn.addEventListener('click', tetikle);
    btn.addEventListener('touchstart', tetikle, { passive: false });
};

butonBagla(rulerButton, 'ruler');
butonBagla(gonyeButton, 'gonye');
butonBagla(aciolcerButton, 'aciolcer');
butonBagla(pergelButton, 'pergel');


undoButton.addEventListener('click', undoLastStroke);
clearAllButton.addEventListener('click', clearAllStrokes);
moveButton.addEventListener('click', () => setActiveTool(currentTool === 'move' ? 'none' : 'move'));

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

if (prevPageBtn && nextPageBtn) {

    // ï¿½nceki Sayfa (<)
    prevPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage > 1) {
            currentPDFPage--;
            window.renderPDFPage(currentPDFPage);
            // ?? YENï¿½: PC'ye sayfayï¿½ deï¿½iï¿½tirmesini sï¿½yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });

    // Sonraki Sayfa (>)
    nextPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage < totalPDFPages) {
            currentPDFPage++;
            window.renderPDFPage(currentPDFPage);
            // ?? YENï¿½: PC'ye sayfayï¿½ deï¿½iï¿½tirmesini sï¿½yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });
} // <-- EKSï¿½K OLAN VE HATAYA SEBEP OLAN PARANTEZ BURADA KAPANIYOR!


// --- YENï¿½: Sayfa numarasï¿½na tï¿½klayï¿½nca hï¿½zlï¿½ gitme kutusunu aï¿½ ---
if (pageCountLabel) {
    pageCountLabel.style.cursor = 'pointer'; // Fareyle ï¿½zerine gelince tï¿½klanabilir el iï¿½areti ï¿½ï¿½ksï¿½n
    pageCountLabel.addEventListener('click', () => {
        if (!currentPDF) return;

        // --- ï¿½EVï¿½Rï¿½ ENTEGRASYONU ---
        let t = translations[currentLang];
        let soruMetni = t.pdf_soru.replace('{0}', totalPDFPages);

        const gitSayfa = prompt(soruMetni, currentPDFPage);
        if (gitSayfa !== null) {
            const num = parseInt(gitSayfa);
            if (num > 0 && num <= totalPDFPages) {
                currentPDFPage = num;
                window.renderPDFPage(currentPDFPage);
            } else {
                alert("Geï¿½ersiz sayfa numarasï¿½ girdiniz!"); // ï¿½stersen burayï¿½ da ileride sï¿½zlï¿½ï¿½e ekleyebilirsin
            }
        }
    });
}

if (uploadButton && fileInput) {
    uploadButton.onclick = () => fileInput.click();

    const cameraBtn = document.getElementById('btn-camera');
    const cameraInput = document.getElementById('camera-input');
    if (cameraBtn && cameraInput) {
        cameraBtn.onclick = () => cameraInput.click();
        cameraInput.onchange = async (e) => fileInput.onchange(e);
    }

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // --- DURUM A: PDF DOSYASI ---
        if (file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                // 1. Aï¿½A Gï¿½NDERMEK ï¿½ï¿½ï¿½N (Base64 Metni Olarak)
                const base64String = this.result;

                // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Koca PDF dosyasï¿½nï¿½ PC'nin kendi okumasï¿½ iï¿½in aï¿½a fï¿½rlatmak yerine, 
                // Tabletin ï¿½izdiï¿½i o anki yï¿½ksek ï¿½ï¿½zï¿½nï¿½rlï¿½klï¿½ sayfayï¿½ (resim olarak) yollayacaï¿½ï¿½z.
                // Bu yï¿½zden pdf_yukle komutunu Aï¿½A Gï¿½NDERMEYï¿½ ï¿½PTAL EDï¿½YORUZ. 
                // PC, PDF.js yï¿½kï¿½ne girmek zorunda kalmayacak.

                // 2. TABLET EKRANI ï¿½ï¿½ï¿½N (PDF.js'in anladï¿½ï¿½ï¿½ formata geri ï¿½eviriyoruz)
                const base64Data = base64String.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                try {
                    currentPDF = await pdfjsLib.getDocument(bytes).promise;
                    totalPDFPages = currentPDF.numPages;
                    currentPDFPage = 1;

                    if (pdfControls) pdfControls.classList.remove('hidden');

                    window.renderPDFPage(currentPDFPage);

                    setTimeout(() => {
                        let t = typeof translations !== 'undefined' ? translations[currentLang] : { pdf_soru: "Sayfa (1-{0}):" };
                        let soruMetni = (t.pdf_soru || "Sayfa (1-{0}):").replace('{0}', totalPDFPages);

                        const sayfaGrisi = prompt(soruMetni, "1");
                        if (sayfaGrisi !== null) {
                            const hedefSayfa = parseInt(sayfaGrisi);
                            if (hedefSayfa > 0 && hedefSayfa <= totalPDFPages) {
                                currentPDFPage = hedefSayfa;
                                window.renderPDFPage(currentPDFPage);

                                if (typeof isConnected !== 'undefined' && isConnected) {
                                    window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
                                }
                            }
                        }
                    }, 500);

                } catch (error) {
                    console.error("PDF aï¿½ï¿½lï¿½rken hata oluï¿½tu:", error);
                }
            };   // ï¿½ fileReader.onload BURADA biter
            fileReader.readAsDataURL(file);
        }

        // --- DURUM B: RESï¿½M DOSYASI ---
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgData = event.target.result;



                const img = new Image();
                img.onload = () => {
                    // --- GORUNTU SIKISTIRMA (Resizer & Compressor) ---
                    // Telefon kameralari 15-20MB resim cektigi icin agi yavaslatir.
                    // Burada resmi tahtaya gitmeden once ufaltip 150KB'a indiriyoruz!
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1920;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = Math.round(height * (MAX_WIDTH / width));
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = Math.round(width * (MAX_HEIGHT / height));
                            height = MAX_HEIGHT;
                        }
                    }

                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = width;
                    tempCanvas.height = height;
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    // Resmi ciz
                    tempCtx.drawImage(img, 0, 0, width, height);
                    
                    // Yuksek oranda sikistir (JPEG 0.6)
                    const compressedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.6); 

                    const compressedImg = new Image();
                    compressedImg.onload = () => {
                        window.addNewImageToCanvas(compressedImg, false);
                    };
                    compressedImg.src = compressedDataUrl;
                };
                img.src = imgData;
            };
            reader.readAsDataURL(file);
        }
        // Resim/Dosya islenmeden value'yu temizlemek mobil tarayicilarda File objesinin silinmesine (GC) neden olur!
        setTimeout(() => { e.target.value = ''; }, 2000); 
    };
}


function addToCanvasAsObject(img) {
    let startWidth = 400;
    if (img.width < 400) startWidth = img.width;

    let scaleFactor = startWidth / img.width;
    let startHeight = img.height * scaleFactor;

    drawnStrokes.push({
        type: 'image',
        img: img,
        // --- TAM ORTALAMA HESABI ---
        x: (canvas.width / 2) - (startWidth / 2),
        y: (canvas.height / 2) - (startHeight / 2),
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    });

    // --- BUTONU Gï¿½STERME VE KAPATMA ï¿½ï¿½LEVï¿½ FONKSï¿½YONUN ï¿½ï¿½ï¿½NE ALINDI ---
    if (closePdfBtn) {
        // 1. Butonu SADECE resim eklendiï¿½inde gï¿½rï¿½nï¿½r yap
        closePdfBtn.classList.remove('hidden');
        closePdfBtn.style.display = 'flex';

        // 2. Kapatma iï¿½levini tanï¿½mla
        closePdfBtn.onclick = () => {
            // Kontrol panelini ve butonun kendisini gizle
            if (typeof pdfControls !== 'undefined' && pdfControls) {
                pdfControls.classList.add('hidden');
            }
            closePdfBtn.classList.add('hidden');
            closePdfBtn.style.display = 'none';

            // Arka plan olan tï¿½m ï¿½ï¿½eleri, lasso maskelerini ve yamalarï¿½ kaldï¿½r
            drawnStrokes = drawnStrokes.filter(s => !s.isBackground && !s.isPDFPage && s.type !== 'lasso-mask' && !s.isPatch);
            window.drawnStrokes = drawnStrokes;

            // Deï¿½iï¿½kenleri sï¿½fï¿½rla
            currentPDF = null;
            if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;

            // Ekranï¿½ temizle ve kalan ï¿½izimleri tekrar ï¿½iz
            redrawAllStrokes();
        };
    }

    redrawAllStrokes();
}


if (fillButton) fillButton.addEventListener('click', () => setActiveTool(currentTool === 'fill' ? 'none' : 'fill'));
if (fillColorBoxes) {
    fillColorBoxes.forEach(box => {
        const handler = (e) => {
            e.stopPropagation();
            fillColorBoxes.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            currentFillColor = e.target.dataset.color || e.target.style.backgroundColor;
            setActiveTool('fill');
        };
        box.addEventListener('click', handler);
        box.addEventListener('touchstart', handler, { passive: false });
    });
    if (fillColorBoxes.length > 0) { fillColorBoxes[0].classList.add('selected'); currentFillColor = fillColorBoxes[0].dataset.color || fillColorBoxes[0].style.backgroundColor; }
}

colorBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        colorBoxes.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        currentPenColor = e.target.style.backgroundColor;
    });
});
colorBoxes[0].classList.add('selected');
currentPenColor = colorBoxes[0].style.backgroundColor;

lineButton.addEventListener('click', () => {
    if (lineButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        lineOptions.classList.remove('hidden'); lineOptions.style.display = 'flex'; lineButton.classList.add('active');
        const buttonRect = lineButton.getBoundingClientRect();
        const panelRect = lineButton.parentElement.getBoundingClientRect();
        lineOptions.style.top = `${buttonRect.top - panelRect.top}px`;
    }
});

// ï¿½okgen Renk Seï¿½imi (Varsayï¿½lan Beyaz)
if (polygonColorOptions.length > 0) {
    polygonColorOptions[0].classList.add('selected');
    window.currentLineColor = polygonColorOptions[0].dataset.color || '#FFFFFF';

    polygonColorOptions.forEach(box => {
        const handleColorSelect = (e) => {
            e.stopPropagation(); e.preventDefault();
            polygonColorOptions.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            const color = e.target.dataset.color || e.target.style.backgroundColor;
            window.currentLineColor = color;
            try { if (window.audio_select) { window.audio_select.currentTime = 0; window.audio_select.play(); } else if (window.audio_click) { window.audio_click.currentTime = 0; window.audio_click.play(); } } catch (err) { }
        };
        box.addEventListener('click', handleColorSelect);
        box.addEventListener('touchstart', handleColorSelect, { passive: false });
    });
}

polygonButton.addEventListener('click', () => {
    if (polygonButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        polygonOptions.classList.remove('hidden'); polygonOptions.style.display = 'flex'; polygonButton.classList.add('active');
        const buttonRect = polygonButton.getBoundingClientRect();
        const panelRect = polygonButton.parentElement.getBoundingClientRect();
        const menuHeight = polygonOptions.offsetHeight;
        const windowHeight = window.innerHeight;
        const margin = 10;
        let topOffset = buttonRect.top - panelRect.top;
        if (buttonRect.top + menuHeight > (windowHeight - margin)) {
            topOffset = (windowHeight - menuHeight - margin) - panelRect.top;
        }
        polygonOptions.style.top = `${topOffset}px`;
    }
});

// --- OYUNLAR MENï¿½Sï¿½: YUKARI Aï¿½ILAN, SEVï¿½MLï¿½ VE Sï¿½LGï¿½ KAPATAN Sï¿½STEM ---
oyunlarButton.addEventListener('click', (e) => {
    e.stopPropagation();

    if (oyunlarButton.classList.contains('active')) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    } else {
        // 1. Dï¿½ï¿½ER ARAï¿½LARI VE Sï¿½LGï¿½Yï¿½ KAPAT (Iï¿½ï¿½ï¿½ï¿½nï¿½ sï¿½ndï¿½rï¿½r)
        if (typeof setActiveTool === 'function') setActiveTool('none');

        oyunlarOptions.innerHTML = ''; // ï¿½ï¿½eriï¿½i temizle

        // 2. MENï¿½ Gï¿½Rï¿½Nï¿½M AYARLARI
        oyunlarOptions.style.display = 'flex';
        oyunlarOptions.style.flexDirection = 'column';
        oyunlarOptions.style.maxHeight = '400px';
        oyunlarOptions.style.overflowY = 'auto';
        oyunlarOptions.style.touchAction = 'pan-y';
        oyunlarOptions.style.WebkitOverflowScrolling = 'touch';

        // 3. KONUMU YUKARI ALAN HESAPLAMA (Ekrana sï¿½ï¿½masï¿½ iï¿½in)
        const buttonRect = oyunlarButton.getBoundingClientRect();
        const panelRect = oyunlarButton.parentElement.getBoundingClientRect();
        oyunlarOptions.style.top = 'auto';
        oyunlarOptions.style.bottom = (panelRect.bottom - buttonRect.bottom) + 'px';

        // 4. KAYDIRMA ï¿½PUCU (Yazï¿½ Geri Geldi)
        const hint = document.createElement('div');
        hint.innerHTML = '?? Liste kaydï¿½rï¿½labilir ??';
        hint.style.cssText = `
            text-align: center; 
            color: #00ffcc; 
            font-family: 'Fredoka', sans-serif; 
            font-size: 13px; 
            padding: 12px; 
            border-bottom: 1px solid rgba(255,255,255,0.1); 
            margin-bottom: 8px; 
            font-weight: 600;
            background: rgba(0, 255, 204, 0.05);
            border-radius: 12px 12px 0 0;
        `;
        oyunlarOptions.appendChild(hint);

        // 5. OYUNLARI EKLE
        if (window.OyunListesi && window.OyunListesi.length > 0) {
            window.OyunListesi.forEach(oyun => {
                const linkElement = document.createElement('a');
                linkElement.className = 'tool-button-sub';

                // KRï¿½Tï¿½K DEï¿½ï¿½ï¿½ï¿½KLï¿½K BURADA:
                // 'oyun.isim' yerine 'oyun[currentLang]' kullanï¿½yoruz.
                // Eï¿½er o dilde karï¿½ï¿½lï¿½ï¿½ï¿½ yoksa (hata vermemesi iï¿½in) Tï¿½rkï¿½e'yi gï¿½sterir.
                linkElement.innerText = oyun[currentLang] || oyun.tr;

                linkElement.style.cssText = `
            text-decoration: none; 
            display: block; 
            padding: 15px; 
            text-align: center; 
            color: white; 
            border-bottom: 1px solid rgba(255,255,255,0.05);
            font-family: 'Fredoka', sans-serif;
            font-size: 14px;
        `;

                let startY = 0;
                let isScrolling = false;

                linkElement.addEventListener('touchstart', (te) => {
                    startY = te.touches[0].clientY;
                    isScrolling = false;
                }, { passive: true });

                linkElement.addEventListener('touchmove', (te) => {
                    if (Math.abs(te.touches[0].clientY - startY) > 10) isScrolling = true;
                }, { passive: true });

                const linkiAc = (ae) => {
                    if (isScrolling) return;
                    ae.preventDefault();
                    ae.stopPropagation();
                    window.open(oyun.link, '_blank');

                    // Kapatma iï¿½lemi
                    oyunlarOptions.classList.add('hidden');
                    oyunlarButton.classList.remove('active');
                };

                linkElement.addEventListener('touchend', linkiAc);
                linkElement.addEventListener('click', linkiAc);
                oyunlarOptions.appendChild(linkElement);
            });
        }

        oyunlarOptions.classList.remove('hidden');
        oyunlarButton.classList.add('active');
    }
});

// --- BOï¿½LUï¿½A TIKLAYINCA KAPATMA (DOSYANIN EN ALTINA EKLEYï¿½N) ---
['pointerdown', 'touchstart', 'mousedown'].forEach(evt => {
document.addEventListener(evt, (e) => {

    if (oyunlarOptions && !oyunlarOptions.contains(e.target) && e.target !== oyunlarButton) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    }
});
// 2. Ana menï¿½ kutusunun da dï¿½ï¿½arï¿½daki "Ekran Kilitlerine" takï¿½lmasï¿½nï¿½ engelle:
oyunlarOptions.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });

circleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    setActiveTool('draw_polygon_circle');
    window.PolygonTool.handleDrawClick(null, 0);
    regularPolygonButtons.forEach(b => b.classList.remove('active'));
    circleButton.classList.add('active');
});

regularPolygonButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const sides = parseInt(e.target.dataset.sides);
        setActiveTool(`draw_polygon_${sides}_sides`);
        window.PolygonTool.handleDrawClick(null, sides);
        regularPolygonButtons.forEach(b => b.classList.remove('active'));
        circleButton.classList.remove('active');
        e.target.classList.add('active');
    });
});

pointButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.audio_select) window.audio_select.play();
    if (!audio_click_src_set) { audio_click.src = 'sesler/point-smooth-beep-230573.mp3'; audio_click_src_set = true; }
    setActiveTool(currentTool === 'point' ? 'none' : 'point');
});
straightLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'straightLine' ? 'none' : 'straightLine'); });
infinityLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'line' ? 'none' : 'line'); });
segmentButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'segment' ? 'none' : 'segment'); });
rayButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'ray' ? 'none' : 'ray'); });

lineColorOptions.forEach(box => {
    box.addEventListener('click', (e) => {
        e.stopPropagation();
        lineColorOptions.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        const color = e.target.dataset.color || e.target.style.backgroundColor;
        window.currentLineColor = color;
    });
});
lineColorOptions[0].classList.add('selected');
window.currentLineColor = lineColorOptions[0].dataset.color || lineColorOptions[0].style.backgroundColor;

// ==========================================
// ?? Nï¿½HAï¿½ ï¿½ï¿½Zï¿½M: KATMAN (Z-INDEX) VE BUTON KORUMA ZIRHI ??
// ==========================================
const katmanZirhi = document.createElement('style');
katmanZirhi.innerHTML = `
    /* 1. ï¿½izim Tahtasï¿½: 3D ï¿½ekillerin ï¿½stï¿½nde, butonlarï¿½n altï¿½nda kalmalï¿½ */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 2. 3D Sahnesi: Kalemin altï¿½nda kalmalï¿½ ki ï¿½stï¿½ne ï¿½izilebilsin */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; display: block !important; }
    
    /* 3. Arayï¿½z ve Butonlar: Asla kaybolmamalarï¿½ iï¿½in en ï¿½st seviyeye sabitlendi */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options,
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options,
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip {
        z-index: 10000 !important;
    }
`;
document.head.appendChild(katmanZirhi);

// 3D motorunun gizli kalmamasï¿½nï¿½ garantile
if (window.Scene3D && window.Scene3D.container) {
    window.Scene3D.container.style.display = 'block';
    window.Scene3D.container.classList.remove('hidden');
}

// ?????? ï¿½ï¿½TE KODU TAM OLARAK BURAYA, BU BOï¿½LUï¿½A YAPIï¿½TIRIYORSUN ??????

// ?? PERGEL TEPE ï¿½ï¿½FT TIKLAMA KESï¿½N Dï¿½ZELTMESï¿½ (SIï¿½RAMA ENGELï¿½)
document.addEventListener('dblclick', (e) => {
    const hedef = e.target;
    // ï¿½ift tï¿½klanan eleman pergelin tepesi mi kontrol et
    if (hedef && (hedef.id === 'compass-top' || hedef.classList.contains('compass-top') || hedef.id === 'pergel-tepe' || hedef.closest('#compass-top') || hedef.closest('.pergel-tepe') || hedef.closest('#compass-handle'))) {

        // 1. Eski dosyalardaki hatalï¿½ sï¿½ï¿½rama kodunun ï¿½alï¿½ï¿½masï¿½nï¿½ tamamen engelle!
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();

        // 2. Yerinden oynatmadan uï¿½larï¿½ takas et
        if (window.PergelTool && window.PergelTool.state) {
            // Pergeli iï¿½ne ucu etrafï¿½nda 180 derece dï¿½ndï¿½rerek uï¿½larï¿½ kusursuzca eï¿½ler
            window.PergelTool.state.rotation = (window.PergelTool.state.rotation || 0) + Math.PI;

            if (typeof window.PergelTool.updateTransform === 'function') {
                window.PergelTool.updateTransform();
            }
            if (typeof window.araclariAgaGonder === 'function') {
                window.araclariAgaGonder();
            }
        }
    }
}, true); // 'true' (capturing) sayesinde eski hatalï¿½ koddan ï¿½NCE devreye girer ve onu iptal eder!

// ?????? PERGEL KODU BURADA Bï¿½Tï¿½YOR ??????

// --- app.js: Canlandï¿½r Butonu (TEK SEFERDE Aï¿½ILMA VE ARD ARDA SINIRSIZ KULLANIM GARANTï¿½Sï¿½) ---
if (typeof animateButton !== 'undefined' && animateButton) {
    animateButton.onclick = null;
    animateButton.ontouchstart = null;
    animateButton.addEventListener('pointerdown', toggleSnapshotMenu, { passive: false });
}
// <--- KOD DOSYASI TAM OLARAK BU PARANTEZLE Bï¿½TMELï¿½Dï¿½R!

// ?? Nï¿½HAï¿½ ï¿½ï¿½Zï¿½M: GERï¿½EK ï¿½OKLU DOKUNMATï¿½K (MULTI-TOUCH) TAKï¿½Pï¿½ï¿½Sï¿½
window.touchCount = 0;
window.lastTouchDist = 0;
canvas.addEventListener('touchstart', (e) => { window.touchCount = e.touches.length; }, { passive: true });
canvas.addEventListener('touchend', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });
canvas.addEventListener('touchcancel', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });

// ?? GERï¿½EK MULTI-TOUCH ZOOM MOTORU (Zï¿½plamayï¿½ Engelleyen Ana Motor)
canvas.addEventListener('touchmove', (e) => {
    if (currentTool === 'move' && e.touches && e.touches.length >= 2) {
        e.preventDefault();
        e.stopPropagation();
        
        // ?? ï¿½ï¿½Zï¿½M 2: ï¿½ift parmak zoom motoru devreye girdiï¿½inde sï¿½rï¿½klemeyi KESï¿½N olarak kapat!
        // Bï¿½ylece taï¿½ï¿½ma ve zoom komutlarï¿½ birbiriyle savaï¿½maz, ekran zï¿½plamaz.
        isMoving = false; 

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        const p1x = e.touches[0].clientX; const p1y = e.touches[0].clientY;
        const p2x = e.touches[1].clientX; const p2y = e.touches[1].clientY;
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);

        if (window.lastTouchDist > 0) {
            const delta = currentDist - window.lastTouchDist;
            const zoomStep = 1 + (delta * 0.003);
            const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
            
            if (mainBg) {
                const cx = mainBg.x + mainBg.width / 2;
                const cy = mainBg.y + mainBg.height / 2;
                
                drawnStrokes.forEach(bg => {
                    if (bg.isBackground === true) {
                        const bg_cx = bg.x + bg.width / 2;
                        const bg_cy = bg.y + bg.height / 2;
                        const ncx = cx + (bg_cx - cx) * zoomStep;
                        const ncy = cy + (bg_cy - cy) * zoomStep;
                        bg.width *= zoomStep; bg.height *= zoomStep;
                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                    }
                });

                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (!s.isBackground && typeof window.zoomStroke === 'function') {
                            window.zoomStroke(s, zoomStep, cx, cy);
                        }
                    });
                }
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height });
                }
            }
        }
        window.lastTouchDist = currentDist;
    }
}, { passive: false });
canvas.addEventListener('pointerdown', (e) => {
    // ?? Sï¿½Hï¿½RLï¿½ DOKUNUï¿½ 1: Ne olursa olsun ï¿½NCE tarayï¿½cï¿½nï¿½n yerleï¿½ik kaydï¿½rmasï¿½nï¿½ (titremeyi) kilitliyoruz!
    if (e.cancelable) e.preventDefault();

    // AKILLI TAHTA YAMASI VE GERï¿½YE Dï¿½Nï¿½K AVUï¿½ ï¿½ï¿½ï¿½ (PALM) REDDï¿½:
    if (e.pointerType === 'pen') {
        // Eï¿½er kï¿½sa sï¿½re ï¿½nce (avuï¿½ iï¿½i yï¿½zï¿½nden) bir veya birden fazla "touch" ï¿½izimi baï¿½ladï¿½ysa, onlarï¿½ anï¿½nda iptal et ve sil!
        let avucIciSilindi = false;
        while (window.drawnStrokes && window.drawnStrokes.length > 0) {
            const lastS = window.drawnStrokes[window.drawnStrokes.length - 1];
            if (lastS.type === 'pen' && lastS.pointerType === 'touch' && lastS.startTime && (Date.now() - lastS.startTime) < 1500) {
                const popped = window.drawnStrokes.pop();
                avucIciSilindi = true;
                if (typeof window.sendNetworkData === 'function' && popped && popped.id) {
                    window.sendNetworkData({ type: 'sil_belirli', id: popped.id });
                }
            } else {
                break;
            }
        }

        if (avucIciSilindi) {
            isDrawing = false; // Temizle ki alt taraftaki switch bloï¿½u kalem iï¿½in temiz bir stroke baï¿½latsï¿½n
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        isPenActive = true;
        clearTimeout(penActiveTimer);
        // Kalem havaya kalksa bile 2 saniye boyunca eli (avuï¿½ iï¿½ini) reddetmeye devam et:
        penActiveTimer = setTimeout(() => { isPenActive = false; }, 2000);
    }
    if (e.pointerType === 'touch' && isPenActive) return;

    // --- KRï¿½Tï¿½K EKLENTï¿½: HAYALET PARMAK SIFIRLAYICI ---
    if (e.isPrimary) {
        pointers.clear();
        lastDist = 0;
    }

    if (currentTool === 'lasso') {
        const pos = getPointerPos(e);
        window.isDraggingLassoPoint = true;
        currentMousePos = pos;
        window.lassoIsClosing = false;
        redrawAllStrokes(); return;
    }

    pointers.set(e.pointerId, e);
    const pos = getPointerPos(e);
    const snapPos = snapTarget || pos;
    currentMousePos = pos;

    // --- TABLET 3D ï¿½ï¿½Zï¿½Mï¿½: EKRANIN HAM Pï¿½KSELLERï¿½Nï¿½ AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (window.touchCount > 0 && e.pointerType === 'touch') { rawX = e.clientX; rawY = e.clientY; } // PointerEvent uses clientX natively

    // ?? ï¿½ï¿½Zï¿½M 4: 3D ï¿½ekil aï¿½ï¿½kken yeï¿½il ve pembe butonlarï¿½n tï¿½klanmasï¿½nï¿½ 3D motoru ï¿½almasï¿½n! ï¿½ncelik zï¿½rhï¿½!
    let butonYakalandi = false;
    if (currentTool === 'move') {
        const tempHit = typeof findHit === 'function' ? findHit(pos) : null;
        if (tempHit && (tempHit.pointKey === 'image_rotate' || tempHit.pointKey === 'image_resize')) {
            butonYakalandi = true;
        }
    }

    // --- ?? Kï¿½PRï¿½ 1: 3D MOTORUNA DEVRET (HIRSIZLIK KORUMALI) ---
    if (window.Scene3D && window.Scene3D.isInit && !butonYakalandi) {
        if (currentTool === 'move' || currentTool === 'select') {
            window.Scene3D.onDown(rawX, rawY);
            // ?? ï¿½ï¿½Zï¿½M: 3D ï¿½ekil seï¿½ildiï¿½inde erken dï¿½nï¿½ï¿½ YAPMIYORUZ. 
            // 2D motorunun da isMoving, dragStartPos gibi taï¿½ï¿½ma deï¿½iï¿½kenlerini baï¿½latmasï¿½na izin veriyoruz!
        }
        // SADECE "draw_3d" ile baï¿½layan 3D araï¿½larï¿½ seï¿½iliyse 3D motoruna izin ver!
        else if (currentTool && currentTool.startsWith('draw_3d_')) {
            let toolName = currentTool.replace('draw_3d_', '');
            window.Scene3D.setTool(toolName);
            window.Scene3D.onDown(rawX, rawY);
            return;
        }
    }

    // --- 1. Fï¿½Zï¿½KSEL ARAï¿½ KONTROLï¿½ ---
    const isToolElementClicked = e.target.closest('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
    if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';
    if (isToolElementClicked) {
        isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
        lineStartPoint = null; window.tempPolygonData = null;
        if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
        return;
    }

    // --- 2. "TAï¿½I" MODU KONTROLï¿½ ---
    if (currentTool === 'move') {
        const hit = findHit(pos);
        if (hit) {
            drawnStrokes = drawnStrokes.filter(s => s !== hit.item); drawnStrokes.push(hit.item); window.drawnStrokes = drawnStrokes;

            // ?? ETï¿½KETLERï¿½N PC'YE Gï¿½NDERï¿½LMESï¿½ (Aï¿½a Sinyal Eklendi)
            if (hit.pointKey === 'toggle_edges') {
                hit.item.showEdgeLabels = !hit.item.showEdgeLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_angles') {
                hit.item.showAngleLabels = !hit.item.showAngleLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_circle_info') {
                hit.item.showCircleInfo = !hit.item.showCircleInfo;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }

            isMoving = true; selectedItem = hit.item; selectedPointKey = hit.pointKey; dragStartPos = pos;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });

            originalStartPos = {};
            if (hit.pointKey === 'self') originalStartPos = { x: hit.item.x, y: hit.item.y };
            else if (hit.pointKey === 'p1') originalStartPos = { x: hit.item.p1.x, y: hit.item.p1.y };
            else if (hit.pointKey === 'p2') originalStartPos = { x: hit.item.p2.x, y: hit.item.p2.y };
            else if (hit.pointKey === 'center') originalStartPos = { x: (hit.item.cx || hit.item.center.x), y: (hit.item.cy || hit.item.center.y) };
            else if (hit.pointKey === 'rotate' || hit.pointKey === 'resize' || hit.pointKey === 'image_resize' || hit.pointKey === 'image_rotate') {
                originalStartPos = { radius: hit.item.radius, rotation: hit.item.rotation, rotationX: hit.item.rotationX || 0, rotationY: hit.item.rotationY || 0, x: hit.item.x || (hit.item.center ? hit.item.center.x : 0), y: hit.item.y || (hit.item.center ? hit.item.center.y : 0) };
                if (selectedItem.type === 'rectangle' || selectedItem.type === 'image' || selectedItem.type === '3d_shape') { initialWidth = selectedItem.width; initialHeight = selectedItem.height; }
            }
            const itemType = hit.item.type;
            if ((itemType === 'line' || itemType === 'segment' || itemType === 'ray' || itemType === 'straightLine') && (hit.pointKey === 'p1' || hit.pointKey === 'p2')) {
                rotationPivot = (hit.pointKey === 'p1') ? hit.item.p2 : hit.item.p1; const movingPoint = (hit.pointKey === 'p1') ? hit.item.p1 : hit.item.p2; selectedItem.startRadius = distance(movingPoint, rotationPivot);
            } else rotationPivot = null;
            redrawAllStrokes(); return;
        } else {
            if (selectedItem) selectedItem.showEdgeLabels = selectedItem.showAngleLabels = selectedItem.showCircleInfo = false;
            selectedItem = null;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_kaldir' });
            redrawAllStrokes();
        }
    }

    if (currentTool === 'none') return;
    if (['point', 'straightLine', 'line', 'segment', 'ray'].includes(currentTool)) { if (typeof lineOptions !== 'undefined' && lineOptions) { lineOptions.classList.add('hidden'); lineOptions.style.display = 'none'; } }
    if (currentTool === 'snapshot') { snapshotStart = getPointerPos(e); return; }

    switch (currentTool) {
        case 'pen': isDrawing = true; const pInfoDown = getPointerInfo(e); const pStroke = { type: 'pen', pointerType: pInfoDown.type, startTime: Date.now(), path: [{ x: snapPos.x, y: snapPos.y, p: pInfoDown.type === 'pen' ? pInfoDown.pressure : 1 }], color: currentPenColor, baseWidth: currentPenWidth, id: Date.now() + Math.random() }; drawnStrokes.push(pStroke); break;
        case 'point': isDrawing = false; const noktaObj = { type: 'point', x: snapPos.x, y: snapPos.y, label: nextPointChar, color: window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF'), id: Date.now() + Math.random() }; drawnStrokes.push(noktaObj); if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'yeni_cizim', stroke: noktaObj }); nextPointChar = advanceChar(nextPointChar); if (typeof window.nextPointChar !== 'undefined') window.nextPointChar = nextPointChar; setTimeout(() => { if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); }, 10); break;
        case 'eraser': isDrawing = false; break; // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Silgi modunda kalem izi ï¿½izilmesi tamamen yasaklandï¿½!
        case 'straightLine': if (!isDrawingLine) { isDrawingLine = true; lineStartPoint = snapPos; } break;
        case 'line': if (!isDrawingInfinityLine) { isDrawingInfinityLine = true; lineStartPoint = pos; } break;
        case 'segment': if (!isDrawingSegment) { isDrawingSegment = true; lineStartPoint = snapPos; } break;
        case 'ray': if (!isDrawingRay) { isDrawingRay = true; lineStartPoint = pos; } break;
        case 'draw_rectangle': isDrawingRectangle = true; rectStartPoint = pos; break;
        case 'draw_polygon_circle':
        case 'draw_polygon_3_sides': case 'draw_polygon_4_sides': case 'draw_polygon_5_sides':
        case 'draw_polygon_6_sides': case 'draw_polygon_7_sides': case 'draw_polygon_8_sides':
            if (!window.tempPolygonData) window.tempPolygonData = { center: null, type: 0, radius: 0, rotation: 0 };
            if (window.tempPolygonData.center === null) { window.tempPolygonData.center = snapPos; window.tempPolygonData.type = currentTool === 'draw_polygon_circle' ? 0 : parseInt(currentTool.split('_')[2]); if (window.PolygonTool) window.PolygonTool.state.isDrawing = true; if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.remove('hidden'); }
            else {
                const finalRadius = window.tempPolygonData.radius || 0; if (window.tempPolygonData.type === 0) window.PolygonTool.finalizeCircle(finalRadius); else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);
                setTimeout(() => { const lastS = drawnStrokes[drawnStrokes.length - 1]; if (lastS) window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS }); }, 50);
                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden'); if (window.tempPolygonData) window.tempPolygonData.center = null;
            }
            break;
    }
}, { passive: false });

canvas.addEventListener('pointermove', (e) => {
    // ?? Sï¿½Hï¿½RLï¿½ DOKUNUï¿½ 2: Sï¿½rï¿½kleme sï¿½rasï¿½nda ekran titremesinin 1 numaralï¿½ dï¿½ï¿½manï¿½ olan zï¿½plamayï¿½ EN BAï¿½TA yok et!
    if (e.cancelable) e.preventDefault();

    const currentPointerMove = getPointerInfo(e);
    if (currentPointerMove.type === 'pen') { isPenActive = true; clearTimeout(penActiveTimer); penActiveTimer = setTimeout(() => { isPenActive = false; }, 1000); }
    else if (currentPointerMove.type === 'touch' && isPenActive) return;

    // --- PARDUS ï¿½ï¿½FT Sï¿½NYAL ENGELLEYï¿½Cï¿½ ---
    if (e.pointerType === 'mouse') { let hasTouch = false; for (let p of pointers.values()) if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true; if (hasTouch) return; }
    pointers.set(e.pointerId, e);

    if (pointers.size >= 2 && currentTool === 'move') {
        // ?? ï¿½ï¿½Zï¿½M 3A: Zoom baï¿½larken sï¿½rï¿½klemeyi tamamen kapat!
        isMoving = false; 

        // ?? ï¿½AKIï¿½MAYI ï¿½NLEYï¿½Cï¿½ ZIRH: Eï¿½er cihaz gerï¿½ek TouchEvent destekliyorsa (touchCount >= 2),
        // yedek PointerEvent motorunu DURDUR! Aksi takdirde iki motor aynï¿½ anda ï¿½alï¿½ï¿½ï¿½p zoomu Kï¿½Lï¿½TLER!
        if (window.touchCount >= 2) return;

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        let p1x, p1y, p2x, p2y;
        const p = Array.from(pointers.values());
        if (p.length >= 2) {
            p1x = p[0].clientX; p1y = p[0].clientY; p2x = p[1].clientX; p2y = p[1].clientY;
        } else {
            return;
        }
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);
        if (lastDist > 0) {
            const delta = currentDist - lastDist; const zoomStep = 1 + (delta * 0.003);
            const bgStrokes = drawnStrokes.filter(s => s.isBackground === true);
            if (bgStrokes.length > 0) {
                const cx = bgStrokes[0].x + bgStrokes[0].width / 2;
                const cy = bgStrokes[0].y + bgStrokes[0].height / 2;
                bgStrokes.forEach(bg => { const newW = bg.width * zoomStep; const newH = bg.height * zoomStep; bg.x -= (newW - bg.width) / 2; bg.y -= (newH - bg.height) / 2; bg.width = newW; bg.height = newH; });
                if (window.drawnStrokes) window.drawnStrokes.forEach(s => { if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy); });
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'zoom_senkron', x: bgStrokes[0].x, y: bgStrokes[0].y, width: bgStrokes[0].width, height: bgStrokes[0].height });
            }
        }
        lastDist = currentDist; return;
    }

    if (pointers.size > 1 && e.isPrimary === false) return;
    const pos = getPointerPos(e); currentMousePos = pos;

    // --- TABLET 3D ï¿½ï¿½Zï¿½Mï¿½: EKRANIN HAM Pï¿½KSELLERï¿½Nï¿½ AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (e.targetTouches && e.targetTouches.length > 0) { rawX = e.targetTouches[0].clientX; rawY = e.targetTouches[0].clientY; }

    // --- ?? Kï¿½PRï¿½ 2: 3D HAREKETï¿½ (TAï¿½IMA MOTORU ZIRHI) ---
    if (window.Scene3D && window.Scene3D.isInit) {
        // ?? KESï¿½N ï¿½ï¿½Zï¿½M: "Taï¿½ï¿½" modundayken de ï¿½eklin hareket etmesi iï¿½in 3D motoruna izin verdik.
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            window.Scene3D.onMove(rawX, rawY);
            if (!window.Scene3D.isDragging) return; // Taï¿½ï¿½ma iï¿½lemi iï¿½in 2D motoruna devam etmesine izin ver
        }
    }

    if (window.isImageRotating && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; selectedItem.rotation = (Math.atan2(pos.y - cY, pos.x - cX) * 180 / Math.PI) + 90; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', transform: `rotate(${selectedItem.rotation}deg)` }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }
    if (window.isImageResizing && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; const ratio = Math.hypot(pos.x - cX, pos.y - cY) / window.startImageDistance; selectedItem.width = window.startImageWidth * ratio; selectedItem.height = window.startImageHeight * ratio; selectedItem.x = cX - selectedItem.width / 2; selectedItem.y = cY - selectedItem.height / 2; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', width: selectedItem.width + 'px', height: selectedItem.height + 'px' }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }

    if (currentTool === 'move' && isMoving && selectedItem) {
        // ?? ï¿½ï¿½Zï¿½M 3B: Ekrana ikinci parmak deï¿½diï¿½i an veya Zoom iï¿½lemi devam ediyorsa
        // sï¿½rï¿½klemeyi anï¿½nda iptal ediyoruz. Bu tek parmakla taï¿½ï¿½rken yaï¿½anan "zï¿½plama" sorununu tamamen bitirir.
        if (window.touchCount >= 2 || pointers.size >= 2 || window.isZooming) {
            isMoving = false;
            return;
        }

        const dx = pos.x - dragStartPos.x; const dy = pos.y - dragStartPos.y;
        if (selectedPointKey === 'self' || selectedPointKey === 'center') { 
            let oldX = 0, oldY = 0, newX = 0, newY = 0;
            if (selectedItem.type === 'arc') { 
                oldX = selectedItem.cx; oldY = selectedItem.cy;
                selectedItem.cx = originalStartPos.x + dx; selectedItem.cy = originalStartPos.y + dy; 
                newX = selectedItem.cx; newY = selectedItem.cy;
            } else if (selectedItem.center) { 
                oldX = selectedItem.center.x; oldY = selectedItem.center.y;
                selectedItem.center.x = originalStartPos.x + dx; selectedItem.center.y = originalStartPos.y + dy; 
                newX = selectedItem.center.x; newY = selectedItem.center.y;
            } else { 
                oldX = selectedItem.x; oldY = selectedItem.y;
                selectedItem.x = (originalStartPos.x || 0) + dx; selectedItem.y = (originalStartPos.y || 0) + dy; 
                newX = selectedItem.x; newY = selectedItem.y;
                // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Taï¿½ï¿½ma sï¿½rasï¿½nda 3D ï¿½ekillerin originalX ve originalY deï¿½erlerini gï¿½ncelle
                if (selectedItem.originalX !== undefined) {
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;
                }
            } 
            if (selectedItem.vertices) selectedItem.vertices = null; 

            if (selectedItem.isBackground === true) {
                const diffX = newX - oldX;
                const diffY = newY - oldY;
                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (s !== selectedItem && !s.isBackground) {
                            if (typeof window.moveStroke === 'function') window.moveStroke(s, diffX, diffY);
                        }
                    });
                }
                
                // ?? ï¿½ï¿½Zï¿½M 1: Arka plan kaydï¿½rï¿½lï¿½rken PC'ye devasa koordinatlarï¿½ gï¿½ndermek yerine,
                // Sadece ne kadar kaydï¿½ï¿½ï¿½nï¿½ (Delta X, Delta Y) ï¿½zel 'hepsini_tasi' komutuyla gï¿½nderiyoruz.
                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'hepsini_tasi', dx: diffX, dy: diffY });
                }
                
                redrawAllStrokes();
                return; // ?? KRï¿½Tï¿½K: Tabletin yanlï¿½ï¿½ (sekil_guncelle) komutunu yollamasï¿½nï¿½ engeller!
            }
        }


        else if (selectedPointKey === 'rotate' || selectedPointKey === 'image_rotate') {
            if (selectedItem.type === '3d_shape') {
                // ?? KESï¿½N ï¿½ï¿½Zï¿½M: 3D ï¿½ekilleri X ve Y ekseninde (ï¿½ne-Arkaya ve Saï¿½a-Sola) Dï¿½ndï¿½rme
                const dragDx = pos.x - dragStartPos.x;
                const dragDy = pos.y - dragStartPos.y;
                selectedItem.rotationY = (originalStartPos.rotationY || 0) + dragDx * 0.02;
                selectedItem.rotationX = (originalStartPos.rotationX || 0) + dragDy * 0.02;
                if (window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                    if (sceneMesh) {
                        sceneMesh.rotation.x = selectedItem.rotationX;
                        sceneMesh.rotation.y = selectedItem.rotationY;
                        window.Scene3D.updateHandlePositions();
                    }
                }
            } else {
                const isRect = (['rectangle', 'rect', 'image'].includes(selectedItem.type));
                const cX = isRect ? selectedItem.x + selectedItem.width / 2 : selectedItem.center.x;
                const cY = isRect ? selectedItem.y + selectedItem.height / 2 : selectedItem.center.y;
                selectedItem.rotation = (originalStartPos.rotation || 0) + (Math.atan2(pos.y - cY, pos.x - cX) - Math.atan2(dragStartPos.y - cY, dragStartPos.x - cX)) * (180 / Math.PI);
                if (selectedItem.vertices) selectedItem.vertices = null;
            }
        }
        else if (selectedPointKey === 'resize' || selectedPointKey === 'image_resize') {
            // ?? KESï¿½N ï¿½ï¿½Zï¿½M: 3D ï¿½ekillere ï¿½zel Yumuï¿½ak Bï¿½yï¿½tme/Kï¿½ï¿½ï¿½ltme
            if (selectedItem.type === '3d_shape') {
                const sW = initialWidth || selectedItem.width;
                const startCX = (originalStartPos.x || 0) + (sW / 2);
                const startCY = (originalStartPos.y || 0) + (sW / 2);
                const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY) || 1;
                const currentDist = Math.hypot(pos.x - startCX, pos.y - startCY);

                const ratio = currentDist / startDist;

                if (ratio > 0.1 && ratio < 10) { // Sï¿½ï¿½rama ve sonsuz bï¿½yï¿½me engellendi
                    selectedItem.width = sW * ratio;
                    selectedItem.height = sW * ratio;
                    selectedItem.x = startCX - (selectedItem.width / 2);
                    selectedItem.y = startCY - (selectedItem.height / 2);
                    
                    // ?? 1. Aï¿½ SENKRONU: Pembe butonla bï¿½yï¿½tï¿½rken mï¿½hï¿½rlï¿½ deï¿½erleri de bï¿½yï¿½t ki PC bunu kabul etsin!
                    selectedItem.originalW = selectedItem.width;
                    selectedItem.originalH = selectedItem.height;
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;

                    if (window.Scene3D && window.Scene3D.scene) {
                        const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                        if (sceneMesh) {
                            const yeniScale = (selectedItem.width / 30) / sceneMesh.userData.baseSize;
                            sceneMesh.scale.set(yeniScale, yeniScale, yeniScale);
                            window.Scene3D.updateHandlePositions();
                        }
                    }
                }
            }
            // Dï¿½ï¿½ER (2D) ï¿½EKï¿½LLERï¿½N ORï¿½Jï¿½NAL KODLARI
            else if (['rectangle', 'rect', 'image'].includes(selectedItem.type)) {
                const sW = initialWidth || selectedItem.width; const sH = initialHeight || selectedItem.height; const startCX = (originalStartPos.x || 0) + (sW / 2); const startCY = (originalStartPos.y || 0) + (sH / 2); const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY); if (startDist > 10) { const ratio = Math.hypot(pos.x - startCX, pos.y - startCY) / startDist; selectedItem.width = sW * ratio; selectedItem.height = sH * ratio; selectedItem.x = startCX - (selectedItem.width / 2); selectedItem.y = startCY - (selectedItem.height / 2); const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel && selectedItem.type !== 'image') { const kalibrasyon = 30; previewLabel.innerText = `w: ${(selectedItem.width / kalibrasyon).toFixed(1)} cm, h: ${(selectedItem.height / kalibrasyon).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); } }
            } else {
                const startDist = Math.hypot(dragStartPos.x - selectedItem.center.x, dragStartPos.y - selectedItem.center.y); if (startDist > 0) selectedItem.radius = originalStartPos.radius * (Math.hypot(pos.x - selectedItem.center.x, pos.y - selectedItem.center.y) / startDist); if (selectedItem.vertices) selectedItem.vertices = null; const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { const sides = selectedItem.sideCount || selectedItem.type; let kenarPx = selectedItem.radius; if (sides >= 3) kenarPx = 2 * selectedItem.radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
            }
        }
        redrawAllStrokes();
        if (typeof isConnected !== 'undefined' && isConnected) {
            // ?? KESï¿½N ï¿½ï¿½Zï¿½M: 3D dï¿½ndï¿½rme ve konum koordinatlarï¿½ (rotationX/Y/Z ve pos3D) sï¿½zgeï¿½ten kurtarï¿½ldï¿½, PC'ye gï¿½nderiliyor!
            window.sendNetworkData({
                type: 'sekil_guncelle',
                stroke: {
                    id: selectedItem.id,
                    type: selectedItem.type,
                    isBackground: selectedItem.isBackground === true,
                    x: selectedItem.x,
                    y: selectedItem.y,
                    width: selectedItem.width,
                    height: selectedItem.height,
                    rotation: selectedItem.rotation || 0,
                    rotationX: selectedItem.rotationX,
                    rotationY: selectedItem.rotationY,
                    rotationZ: selectedItem.rotationZ,
                    pos3D: selectedItem.pos3D,
                    radius: selectedItem.radius,
                    cx: selectedItem.cx,
                    cy: selectedItem.cy,
                    center: selectedItem.center,
                    // ?? 2. Aï¿½ SENKRONU: Boyut mï¿½hï¿½rlerini PC'ye fï¿½rlatï¿½yoruz!
                    originalX: selectedItem.originalX,
                    originalY: selectedItem.originalY,
                    originalW: selectedItem.originalW,
                    originalH: selectedItem.originalH
                }
            });
            window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });
        }
        return;
    }

    if (['ruler', 'gonye', 'aciolcer', 'pergel', 'none'].includes(currentTool)) return;
    clearTimeout(snapHoverTimer);
    if (['point', 'straightLine', 'pen', 'segment'].includes(currentTool)) { const potentialSnap = findSnapPoint(pos); if (potentialSnap) { snapHoverTimer = setTimeout(() => { snapTarget = potentialSnap; snapIndicator.style.left = `${snapTarget.x}px`; snapIndicator.style.top = `${snapTarget.y}px`; snapIndicator.style.display = 'block'; }, 25); } else { snapTarget = null; snapIndicator.style.display = 'none'; } }
    if (currentTool === 'eraser') { eraserPreview.style.left = `${pos.x}px`; eraserPreview.style.top = `${pos.y}px`; eraserPreview.style.display = 'block'; } else if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';

    let previewActive = false; const endPos = snapTarget || pos;
    const aktifCizimVarMi = isDrawingLine || isDrawingInfinityLine || isDrawingSegment || isDrawingRay || isDrawingRectangle || (window.tempPolygonData && window.tempPolygonData.center) || (currentTool === 'snapshot' && typeof snapshotStart !== 'undefined' && snapshotStart);

    if (aktifCizimVarMi) {
        redrawAllStrokes(); const ctx = canvas.getContext('2d'); ctx.save(); ctx.strokeStyle = window.currentLineColor || '#000000'; ctx.lineWidth = 3; ctx.setLineDash([5, 5]);

        if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && lineStartPoint) {
            ctx.beginPath(); const dx = endPos.x - lineStartPoint.x; const dy = endPos.y - lineStartPoint.y;
            if (dx !== 0 || dy !== 0) { const devCarpan = 5000; if (currentTool === 'line') { ctx.moveTo(lineStartPoint.x - dx * devCarpan, lineStartPoint.y - dy * devCarpan); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else if (currentTool === 'ray') { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } ctx.stroke();
        }
        else if (isDrawingRectangle && rectStartPoint) { ctx.beginPath(); ctx.rect(Math.min(rectStartPoint.x, endPos.x), Math.min(rectStartPoint.y, endPos.y), Math.abs(endPos.x - rectStartPoint.x), Math.abs(endPos.y - rectStartPoint.y)); ctx.stroke(); }
        else if (window.tempPolygonData && window.tempPolygonData.center) {
            const cx = window.tempPolygonData.center.x; const cy = window.tempPolygonData.center.y; const radius = Math.hypot(endPos.x - cx, endPos.y - cy); const angleRad = Math.atan2(endPos.y - cy, endPos.x - cx); window.tempPolygonData.radius = radius; window.tempPolygonData.rotation = angleRad * 180 / Math.PI; const sides = window.tempPolygonData.type;
            ctx.beginPath(); if (sides === 0) ctx.arc(cx, cy, radius, 0, Math.PI * 2); else if (sides >= 3) { for (let i = 0; i <= sides; i++) { const polyAngle = (i * 2 * Math.PI / sides) + angleRad; const px = cx + radius * Math.cos(polyAngle); const py = cy + radius * Math.sin(polyAngle); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } } ctx.stroke();
            const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { let kenarPx = radius; if (sides >= 3) kenarPx = 2 * radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (endPos.x + 15) + 'px'; previewLabel.style.top = (endPos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
        }
        else if (currentTool === 'snapshot' && snapshotStart) { ctx.strokeStyle = '#00ffcc'; ctx.beginPath(); ctx.rect(Math.min(snapshotStart.x, endPos.x), Math.min(snapshotStart.y, endPos.y), Math.abs(endPos.x - snapshotStart.x), Math.abs(endPos.y - snapshotStart.y)); ctx.stroke(); }
        ctx.restore(); previewActive = true;

        // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Tablet dokunuï¿½larï¿½ndaki PC gï¿½nderim engelini kaldï¿½rï¿½yoruz!
        const isTouchActive = (e.touches && e.touches.length > 0) || isDrawing || aktifCizimVarMi;
        if (typeof isConnected !== 'undefined' && isConnected && (e.buttons > 0 || isTouchActive)) {
            const anlikPos = typeof getPointerPos === 'function' ? getPointerPos(e) : { x: e.clientX, y: e.clientY };
            let previewData = null;
            if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && typeof lineStartPoint !== 'undefined' && lineStartPoint) previewData = { tool: currentTool, start: lineStartPoint, end: anlikPos };
            // ?? ï¿½ï¿½Zï¿½M 4 ï¿½ï¿½ï¿½N Dï¿½KDï¿½RTGEN ï¿½SMï¿½ DE Dï¿½ZELTï¿½LDï¿½:
            else if (currentTool === 'draw_rectangle' && typeof rectStartPoint !== 'undefined' && rectStartPoint) previewData = { tool: 'draw_rectangle', start: rectStartPoint, end: anlikPos };
            // ?? ï¿½ï¿½Zï¿½M 3: KENAR SAYISI VE Dï¿½Nï¿½ï¿½ Aï¿½ISI Aï¿½A EKLENDï¿½:
            else if (window.tempPolygonData && window.tempPolygonData.center) previewData = { tool: 'polygon', start: window.tempPolygonData.center, end: anlikPos, radius: Math.hypot(anlikPos.x - window.tempPolygonData.center.x, anlikPos.y - window.tempPolygonData.center.y), sides: window.tempPolygonData.type, rotation: Math.atan2(anlikPos.y - window.tempPolygonData.center.y, anlikPos.x - window.tempPolygonData.center.x) };
            if (previewData) window.sendNetworkData({ type: 'aktif_onizleme', arac: 'cizim_onizleme', payload: previewData });
        }
    }

    if (previewActive) return;
    if (currentTool === 'lasso') { currentMousePos = pos; if (typeof isDrawingLasso !== 'undefined' && isDrawingLasso && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) { let startPoint = lassoPoints[0]; const toleransScale = (typeof globalScale !== 'undefined' && globalScale > 0) ? globalScale : 1; window.lassoIsClosing = (Math.hypot(pos.x - startPoint.x, pos.y - startPoint.y) < (40 / toleransScale)); } redrawAllStrokes(); return; }
    if (!isDrawing) return;

    if (currentTool === 'pen') {
        const pInfoMove = getPointerInfo(e);
        const curStroke = drawnStrokes[drawnStrokes.length - 1];
        curStroke.path.push({ x: pos.x, y: pos.y, p: pInfoMove.type === 'pen' ? pInfoMove.pressure : 1 }); 
        redrawAllStrokes();

        // ?? CANLI ï¿½ï¿½Zï¿½M (LIVE INK) AKTARIMI ??
        // Kalem henï¿½z havadayken, yazï¿½lan kï¿½smï¿½n tamamï¿½ saliseler iï¿½inde PC'ye fï¿½rlatï¿½lï¿½r
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ 
                type: 'aktif_onizleme', 
                arac: 'cizim_onizleme', 
                payload: { tool: 'pen', path: curStroke.path, color: curStroke.color, baseWidth: curStroke.baseWidth } 
            });
        }
    }
}, { passive: false });


// --- POINTERUP (Tï¿½M ï¿½ï¿½Zï¿½M VE ARAï¿½ ï¿½ï¿½LEMLERï¿½Nï¿½N Bï¿½Tï¿½ï¿½ï¿½) ---

canvas.addEventListener('pointerup', (e) => {
    isDrawing = false;

    // Kilitleri serbest bï¿½rak
    if (canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
    }
    if (e.pointerType === 'touch' && e.cancelable) e.preventDefault();

    // --- PARDUS ï¿½ï¿½FT Sï¿½NYAL ENGELLEYï¿½Cï¿½ ---
    if (e.pointerType === 'mouse') {
        let hasTouch = false;
        for (let p of pointers.values()) {
            if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true;
        }
        if (hasTouch) return;
    }

    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastDist = 0;

    const finalPos = snapTarget || currentMousePos;

    // --- ?? Kï¿½PRï¿½ 3: 3D ï¿½ï¿½LEMï¿½Nï¿½ Bï¿½Tï¿½R VE SAHNEYE KOY ---
    if (window.Scene3D && window.Scene3D.isInit) {
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            const wasDrawing = window.Scene3D.isDrawing;
            const wasDragging = window.Scene3D.isDragging;
            window.Scene3D.onUp();

            if (wasDrawing) {
                // ?? KESï¿½N ï¿½ï¿½Zï¿½M: "Taï¿½ï¿½" (move) butonuna otomatik geï¿½meyi ï¿½PTAL ettik. Sistem boï¿½ta kalï¿½r.
                window.active3DShapeTool = null;
                currentTool = 'none';
                if (typeof setActiveTool === 'function') setActiveTool('none');

                const mainBtn = document.getElementById('btn-3d-menu');
                if (mainBtn) mainBtn.classList.remove('active');

                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'onizleme_bitir' });
            }
            if (!wasDragging) return; // Taï¿½ï¿½ma iï¿½lemi iï¿½in 2D motoruna devam etmesine izin ver
        }
    }


    // --- A) Fï¿½Zï¿½KSEL ARAï¿½LAR (CETVEL, Gï¿½NYE, PERGEL vb.) ---
    const isPhysicalTool = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(currentTool);
    if (isPhysicalTool) {
        isDrawing = false;
        if (currentTool === 'ruler' && window.RulerTool && window.RulerTool.finalizeDraw) window.RulerTool.finalizeDraw();
        if (currentTool === 'gonye' && window.GonyeTool && window.GonyeTool.finalizeDraw) window.GonyeTool.finalizeDraw();
        if (currentTool === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.finalizeDraw) window.AciolcerTool.finalizeDraw();
        if (currentTool === 'pergel' && window.PergelTool && window.PergelTool.finalizeDraw) window.PergelTool.finalizeDraw();

        setTimeout(() => {
            const lastS = drawnStrokes[drawnStrokes.length - 1];
            if (lastS) {
                if (!lastS.id) lastS.id = Date.now() + Math.random();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                }
            }
        }, 50);

        redrawAllStrokes();
        return;
    }

    // --- B) TAï¿½IMA (MOVE) MANTIï¿½I ---
    if (currentTool === 'move' && isMoving) {
        isMoving = false;
        selectedPointKey = null;
        if (returnToSnapshot) {
            returnToSnapshot = false;
            setActiveTool('snapshot');
            if (typeof animateButton !== 'undefined' && animateButton) animateButton.classList.add('active');
            document.body.classList.add('cursor-snapshot');
        }
        redrawAllStrokes();
        return;
    }

    // --- C) NORMAL ï¿½ï¿½ZGï¿½LER (DOï¿½RU, Iï¿½IN, SEGMENT) ---
    if (lineStartPoint && finalPos) {
        let strokeObj = null;
        const cizgiRengi = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF');

        if (isDrawingLine) strokeObj = { type: 'straightLine', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4 };
        else if (isDrawingInfinityLine) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'line', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingSegment) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'segment', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingRay) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'ray', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }

        if (strokeObj) {
            strokeObj.id = Date.now() + Math.random();
            drawnStrokes.push(strokeObj);

            // ?? Sï¿½Hï¿½RLï¿½ ï¿½ï¿½Zï¿½M: Gerï¿½ek ï¿½izimi atmadan ï¿½nce ï¿½nizlemeleri yokediyoruz!
            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: strokeObj });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- D) ï¿½OKGENLER (POLYGON TOOL) ---
    if (currentTool && currentTool.startsWith('draw_polygon_')) {
        if (window.tempPolygonData && window.tempPolygonData.center) {
            const finalRadius = window.tempPolygonData.radius || 0;
            if (finalRadius > 5) {
                const currentType = window.tempPolygonData.type;

                if (currentType === 0) window.PolygonTool.finalizeCircle(finalRadius);
                else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);

                // ?? Sï¿½Hï¿½RLï¿½ ï¿½ï¿½Zï¿½M: ï¿½nizlemeyi anï¿½nda sildiriyoruz
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                }

                setTimeout(() => {
                    const lastS = drawnStrokes[drawnStrokes.length - 1];
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected && lastS) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                    }
                }, 50);

                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
                if (window.tempPolygonData) window.tempPolygonData.center = null;
                if (window.PolygonTool && window.PolygonTool.handleDrawClick) window.PolygonTool.handleDrawClick(null, currentType);
            }
        }
    }

    // --- E) CANLANDIR (KUTU SNAPSHOT) ---
    if (currentTool === 'snapshot' && snapshotStart && currentMousePos) {
        const x = Math.round(Math.min(snapshotStart.x, currentMousePos.x));
        const y = Math.round(Math.min(snapshotStart.y, currentMousePos.y));
        const w = Math.round(Math.abs(currentMousePos.x - snapshotStart.x));
        const h = Math.round(Math.abs(currentMousePos.y - snapshotStart.y));

        if (w > 10 && h > 10) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = w; tempCanvas.height = h;

            // Gï¿½rï¿½ntï¿½ netliï¿½ini en ï¿½st dï¿½zeye ï¿½ï¿½kar
            tempCtx.imageSmoothingEnabled = true;
            tempCtx.imageSmoothingQuality = 'high';

            const bgCanvas = document.getElementById('bg-canvas');
            if (bgCanvas) tempCtx.drawImage(bgCanvas, x, y, w, h, 0, 0, w, h);
            tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
            
            // ?? BEYAZ ARKA PLANI ï¿½EFFAF YAPMA MANTIï¿½I: 
            // Kutu kopyasï¿½ kareli zemine vb. yapï¿½ï¿½tï¿½rï¿½ldï¿½ï¿½ï¿½nda beyazlarï¿½n alttaki ï¿½izgileri ï¿½rtmemesi iï¿½in
            try {
                const imgData = tempCtx.getImageData(0, 0, w, h);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    // Beyaza ï¿½ok yakï¿½n olan pikselleri (ï¿½rneï¿½in rgb deï¿½eri 240 ve ï¿½stï¿½ olanlarï¿½) tam ï¿½effaf (alpha = 0) yapï¿½yoruz
                    if (r >= 240 && g >= 240 && b >= 240) {
                        data[i + 3] = 0; 
                    }
                }
                tempCtx.putImageData(imgData, 0, 0);
            } catch (e) {
                console.warn("CORS veya resim izni nedeniyle arka plan ï¿½effaflaï¿½tï¿½rï¿½lamadï¿½:", e);
            }

            const finalImage = tempCanvas.toDataURL('image/png', 1.0);

            const newImgStroke = {
                type: 'image', imgData: finalImage, x: x, y: y, width: w, height: h,
                id: Date.now() + Math.random() + 1, isBoxCopy: true, isBackground: false
            };
            drawnStrokes.push(newImgStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
            }

            if (typeof setActiveTool === 'function') setActiveTool('move');
            else currentTool = 'move';

            selectedItem = newImgStroke;
            snapshotStart = null;
            redrawAllStrokes();
        }
    }

    // --- F) Dï¿½KDï¿½RTGEN ARACI ---
    if (isDrawingRectangle && rectStartPoint && finalPos) {
        const widthPx = Math.abs(finalPos.x - rectStartPoint.x);
        const heightPx = Math.abs(finalPos.y - rectStartPoint.y);

        if (widthPx > 10 && heightPx > 10) {
            const startX = Math.min(rectStartPoint.x, finalPos.x);
            const startY = Math.min(rectStartPoint.y, finalPos.y);
            const color = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#000000');

            const rectLabels = [nextPointChar];
            for (let i = 0; i < 3; i++) { nextPointChar = advanceChar(nextPointChar); rectLabels.push(nextPointChar); }
            nextPointChar = advanceChar(nextPointChar);

            const rectangleStroke = {
                type: 'rectangle', x: startX, y: startY, width: widthPx, height: heightPx, rotation: 0,
                color: color, labels: rectLabels, showEdgeLabels: true, showAngleLabels: false,
                id: Date.now() + Math.random()
            };

            drawnStrokes.push(rectangleStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' }); // ?? Ekledik
                window.sendNetworkData({ type: 'yeni_cizim', stroke: rectangleStroke });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- G) AKILLI KALEM (PEN) VE ï¿½EKï¿½L TANIMA (Gï¿½VENLï¿½ Sï¿½Rï¿½M) ---
    if (currentTool === 'pen') {
        let lastStroke = drawnStrokes[drawnStrokes.length - 1];

        if (lastStroke && lastStroke.type === 'pen') {
            if (!lastStroke.id) lastStroke.id = Date.now() + Math.random();

            if (lastStroke.path && lastStroke.path.length <= 3) {
                if (lastStroke.path[0]) lastStroke.path.push({ x: lastStroke.path[0].x + 0.1, y: lastStroke.path[0].y + 0.1 });
                setTimeout(() => {
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastStroke });
                    }
                }, 50);
            }
            else {
                let correctedShape = null;
                if (typeof akilliSekilTani === 'function') {
                    try { correctedShape = akilliSekilTani(lastStroke); } catch (err) { }
                }

                if (correctedShape) {
                    drawnStrokes.pop();

                    if (Array.isArray(correctedShape)) {
                        correctedShape.forEach(s => s.id = Date.now() + Math.random());
                        drawnStrokes.push(...correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'akilli_sekil_toplu', strokes: correctedShape });
                            }
                        }, 50);
                    }
                    else {
                        correctedShape.id = Date.now() + Math.random();
                        drawnStrokes.push(correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'yeni_cizim', stroke: correctedShape });
                            }
                        }, 50);
                    }
                }
                else {
                    const safePenStroke = {
                        type: 'pen', id: lastStroke.id, color: lastStroke.color || '#000000',
                        baseWidth: lastStroke.baseWidth || 4, width: lastStroke.width || lastStroke.baseWidth || 4,
                        isBackground: false,
                        path: lastStroke.path.map(p => ({ x: Math.round(p.x), y: Math.round(p.y), p: Number((p.p || 1).toFixed(2)) }))
                    };

                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                            window.sendNetworkData({ type: 'yeni_cizim', stroke: safePenStroke });
                        }
                    }, 50);
                }
            }
        }
    }

    // --- GENEL SIFIRLAMA ---
    isDrawing = false;
    isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
    isDrawingRectangle = false;
    lineStartPoint = null;
    rectStartPoint = null;
    snapTarget = null;
    window.isImageRotating = false;
    window.isImageResizing = false;
    if (typeof snapIndicator !== 'undefined' && snapIndicator) snapIndicator.style.display = 'none';

    // Olasï¿½ tï¿½m hayaletleri zorla sil (Garanti Protokolï¿½)
    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'onizleme_bitir' });
    }

    // --- H) KESKï¿½N Nï¿½ï¿½ANCI LASSO (SERBEST KESï¿½M) ---
    if (currentTool === 'lasso' && window.isDraggingLassoPoint) {
        window.isDraggingLassoPoint = false;

        if (!isDrawingLasso) {
            isDrawingLasso = true;
            lassoPoints = [{ x: currentMousePos.x, y: currentMousePos.y }];
        } else {
            let startPoint = lassoPoints[0];
            const mesafe = Math.hypot(currentMousePos.x - startPoint.x, currentMousePos.y - startPoint.y);

            if (mesafe < 40) {
                lassoPoints.push({ x: startPoint.x, y: startPoint.y });

                let minX = Math.min(...lassoPoints.map(p => p.x));
                let minY = Math.min(...lassoPoints.map(p => p.y));
                let maxX = Math.max(...lassoPoints.map(p => p.x));
                let maxY = Math.max(...lassoPoints.map(p => p.y));
                let w = Math.max(10, maxX - minX);
                let h = Math.max(10, maxY - minY);

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = w; tempCanvas.height = h;
                const tempCtx = tempCanvas.getContext('2d');

                tempCtx.save();
                tempCtx.beginPath();
                tempCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
                for (let i = 1; i < lassoPoints.length; i++) tempCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
                tempCtx.closePath();
                tempCtx.clip();

                // Kaliteyi artï¿½r
                tempCtx.imageSmoothingEnabled = true;
                tempCtx.imageSmoothingQuality = 'high';

                const bgCanvas = document.getElementById('bg-canvas');
                if (bgCanvas) {
                    tempCtx.drawImage(bgCanvas, minX, minY, w, h, 0, 0, w, h);
                }
                tempCtx.drawImage(canvas, minX, minY, w, h, 0, 0, w, h);
                tempCtx.restore();

                const finalImage = tempCanvas.toDataURL('image/png', 1.0);

                let detectedColor = (typeof window.isToolThemeBlack !== 'undefined' && window.isToolThemeBlack) ? '#222222' : '#ffffff';

                try {
                    const bgCanvas = document.getElementById('bg-canvas');
                    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
                    const mainCtx = canvas.getContext('2d');
                    
                    let centerX = (minX + maxX) / 2;
                    let centerY = (minY + maxY) / 2;
                    
                    let samplePoints = [
                        { x: centerX, y: minY - 5 },
                        { x: centerX, y: maxY + 5 },
                        { x: minX - 5, y: centerY },
                        { x: maxX + 5, y: centerY }
                    ];
                    
                    for (let sp of samplePoints) {
                        let r = 0, g = 0, b = 0, a = 0;
                        
                        let mainData = mainCtx.getImageData(sp.x, sp.y, 1, 1).data;
                        if (mainData[3] > 0) {
                            r = mainData[0]; g = mainData[1]; b = mainData[2]; a = mainData[3];
                        } else if (bgCtx) {
                            let bgData = bgCtx.getImageData(sp.x, sp.y, 1, 1).data;
                            if (bgData[3] > 0) {
                                r = bgData[0]; g = bgData[1]; b = bgData[2]; a = bgData[3];
                            }
                        }
                        
                        if (a > 0) {
                            detectedColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                            break;
                        }
                    }
                } catch (e) { console.warn("Renk ï¿½rnekleme hatasï¿½:", e); }

                const maskStroke = { type: 'lasso-mask', points: lassoPoints.map(p => ({ x: p.x, y: p.y })), fillColor: detectedColor, id: Date.now() + Math.random() };
                drawnStrokes.push(maskStroke);

                const newImgStroke = { type: 'image', imgData: finalImage, x: minX + 30, y: minY + 30, width: w, height: h, rotation: 0, isBackground: false, imgObj: null, id: Date.now() + Math.random() };

                const tempImg = new Image();
                tempImg.onload = () => { newImgStroke.imgObj = tempImg; if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); };
                tempImg.src = finalImage;
                drawnStrokes.push(newImgStroke);

                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: maskStroke });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
                }

                if (typeof setActiveTool === 'function') setActiveTool('move'); else currentTool = 'move';
                selectedItem = newImgStroke;
                isDrawingLasso = false; window.lassoIsClosing = false; currentMousePos = null; lassoPoints = [];
            } else {
                lassoPoints.push({ x: currentMousePos.x, y: currentMousePos.y });
            }
        }
        redrawAllStrokes();
        return;
    } else {
        redrawAllStrokes();
    }
}, { passive: false }); // <--- pointerup fonksiyonu burada Bï¿½TTï¿½==============================================================================


// ?? KESï¿½N ï¿½ï¿½Zï¿½M: ï¿½ï¿½ iï¿½e geï¿½ip sonsuz dï¿½ngï¿½ye giren (Zï¿½plamaya sebep olan) Hatalï¿½ Kod Temizlendi!
canvas.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();

        // Yalnï¿½zca 'Taï¿½ï¿½' (move) aracï¿½ seï¿½iliyken fare ile zoom yapï¿½labilir
        if (currentTool !== 'move') return;

        const zoomStep = e.deltaY > 0 ? 0.95 : 1.05;

        const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (mainBg) {
            const cx = mainBg.x + mainBg.width / 2;
            const cy = mainBg.y + mainBg.height / 2;
            
            drawnStrokes.forEach(bg => {
                if (bg.isBackground === true) {
                    const bg_cx = bg.x + bg.width / 2;
                    const bg_cy = bg.y + bg.height / 2;
                    const ncx = cx + (bg_cx - cx) * zoomStep;
                    const ncy = cy + (bg_cy - cy) * zoomStep;
                    bg.width *= zoomStep; bg.height *= zoomStep;
                    bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                }
            });

            if (window.drawnStrokes) {
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy);
                });
            }

            redrawAllStrokes();

            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height
                });
            }
        }
    }
}, { passive: false });


// --- POINTERCANCEL (KESï¿½NTï¿½ DURUMUNDA SIFIRLAMA) ---
canvas.addEventListener('pointercancel', (e) => {
    // --- BUNLARI EKLE ---
    pointers.delete(e.pointerId);
    lastDist = 0;
    // --------------------

    // ï¿½ï¿½lemi iptal et ve tï¿½m bayraklarï¿½ (flag) indir
    isDrawing = false;
    isMoving = false;
    isPinching = false; // Varsa zoom iï¿½lemini de durdur
    isDrawingRectangle = false;
    rectStartPoint = null;

    // Geï¿½ici verileri temizle
    snapshotStart = null;
    snapTarget = null;
    lineStartPoint = null;
    window.tempPolygonData = null;

    // Arayï¿½z elemanlarï¿½nï¿½ gizle
    if (snapIndicator) snapIndicator.style.display = 'none';
    if (polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yarï¿½m kalan ï¿½nizlemeleri ekrandan temizlemek iï¿½in
    redrawAllStrokes();

    console.log("Pointer iï¿½lemi bir sistem kesintisi nedeniyle iptal edildi.");
});


// --- BUNLARI EKLE: Tablet ekranï¿½ndan dï¿½ï¿½arï¿½ taï¿½an parmaklarï¿½ zorla sil ---
canvas.addEventListener('pointerout', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });
canvas.addEventListener('pointerleave', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });


// --- YAPIï¿½TIRMA (PASTE) DESTEï¿½ï¿½ (CTRL+V) ---
window.addEventListener('paste', (e) => {
    // Panodaki verileri al
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    // Verileri tara (Resim var mï¿½?)
    for (let index in items) {
        const item = items[index];

        // Eï¿½er bu bir dosya ise ve tipi 'image' iï¿½eriyorsa
        if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Resmi makul bir boyuta getir (Dosya yï¿½klemedeki mantï¿½ï¿½ï¿½n aynï¿½sï¿½)
                    let startWidth = 300;
                    let scaleFactor = startWidth / img.width;
                    let startHeight = img.height * scaleFactor;

                    // Resmi Hafï¿½zaya 'image' nesnesi olarak ekle
                    drawnStrokes.push({
                        type: 'image',
                        img: img,
                        x: canvas.width / 2, // Ekranï¿½n ortasï¿½na koy
                        y: canvas.height / 2,
                        width: startWidth,
                        height: startHeight,
                        rotation: 0
                    });

                    redrawAllStrokes(); // Ekrana ï¿½iz

                    // ï¿½ï¿½lem baï¿½arï¿½lï¿½ sesi (ï¿½steï¿½e baï¿½lï¿½)
                    if (window.audio_click) {
                        window.audio_click.currentTime = 0;
                        window.audio_click.play();
                    }
                };
                img.src = event.target.result;
            };

            reader.readAsDataURL(blob);
            e.preventDefault(); // Sayfanï¿½n varsayï¿½lan yapï¿½ï¿½tï¿½rma davranï¿½ï¿½ï¿½nï¿½ engelle
        }
    }
});

// --- app.js EN ALTINA EKLEYï¿½N (EKSï¿½K OLAN PARï¿½ALAR) ---

function updatePageLabel() {
    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${currentPDFPage} / ${totalPDFPages}`;
}

window.renderPDFPage = async function(num) {
    if (!currentPDF) return;

    // ?? BEYAZ EKRAN VE DONMA ï¿½ï¿½Zï¿½Mï¿½: Hï¿½zlï¿½ sayfa deï¿½iï¿½imlerinde PDF motorunun tï¿½kanmasï¿½nï¿½ engelle
    if (window.currentRenderTask) {
        try { window.currentRenderTask.cancel(); } catch(e){}
    }

    try {
        const page = await currentPDF.getPage(num);

        // --- BURASI DEï¿½ï¿½ï¿½Tï¿½: OTOMATï¿½K VE Yï¿½KSEK ï¿½ï¿½Zï¿½Nï¿½RLï¿½K AYARI ---
        const dpr = window.devicePixelRatio || 1;
        const KALITE_CARPANI = 2; // Daha gï¿½venli bir katsayï¿½ (3 ï¿½ok yï¿½ksekti, donanï¿½ma ï¿½arpï¿½yordu)
        const hdScale = dpr * KALITE_CARPANI;

        let viewport = page.getViewport({ scale: hdScale });

        // Gï¿½VENLï¿½K ZIRHI: Mobil ve bazï¿½ PC tarayï¿½cï¿½larï¿½nda canvas limiti 4096px'dir.
        // Eï¿½er sayfa ï¿½ok bï¿½yï¿½kse (ï¿½rneï¿½in 5000px), ï¿½lï¿½eï¿½i gï¿½venli bir sï¿½nï¿½ra zorla dï¿½ï¿½ï¿½r!
        // Bu sayede "sayfa yarï¿½m geldi" veya "canvas dondu" hatalarï¿½nï¿½ Kï¿½Kï¿½NDEN ï¿½nleriz!
        if (viewport.height > 3500 || viewport.width > 3500) {
            const maxDim = Math.max(viewport.height, viewport.width);
            const safeScale = hdScale * (3500 / maxDim);
            viewport = page.getViewport({ scale: safeScale });
        }
        // -----------------------------------------------------------

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.height = viewport.height;
        tempCanvas.width = viewport.width;

        // --- BURASI EKLENDï¿½: YAZI KENARLARINI KESKï¿½NLEï¿½Tï¿½RME Fï¿½LTRESï¿½ ---
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = 'high';
        
        // JPEG formatï¿½nda arka planï¿½n siyah ï¿½ï¿½kmasï¿½nï¿½ ï¿½nlemek iï¿½in beyaz zemin
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        // ----------------------------------------------------------------

        window.currentRenderTask = page.render({
            canvasContext: tempCtx,
            viewport: viewport
        });

        await window.currentRenderTask.promise;

    const img = new Image();
    img.onload = () => {
        window.addNewImageToCanvas(img, true);

        // --- KUTU KOPYALARINI PDF SAYFASINA Gï¿½RE GERï¿½ Yï¿½KLEME YAMASI ---
        if (window.boxCopies) {
            window.boxCopies.forEach(copy => {
                if (!copy.pageOwner || copy.pageOwner === num) {
                    if (!copy.imgObj) {
                        const tImg = new Image();
                        tImg.src = copy.imgData;
                        tImg.onload = () => {
                            copy.imgObj = tImg;
                            if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                                window.drawnStrokes.push(copy);
                            }
                            if (window.redrawAllStrokes) window.redrawAllStrokes();
                        };
                    } else {
                        if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                            window.drawnStrokes.push(copy);
                        }
                    }
                }
            });
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }
    };

    // ?? ï¿½ï¿½TE 2. ADIMDAKï¿½ DEï¿½ï¿½ï¿½ï¿½KLï¿½ï¿½ï¿½N YAPILDIï¿½I YER BURASI ??
    // Aï¿½ï¿½ felï¿½ eden 20MB PNG yerine %80 kalite JPEG (1MB altï¿½) kullanarak donmayï¿½ ve yarï¿½m yï¿½klemeyi bitiriyoruz!
    const sayfaResmi = tempCanvas.toDataURL('image/jpeg', 0.8);
    img.src = sayfaResmi;

    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${num} / ${totalPDFPages}`;
    
    } catch (e) {
        if (e.name === 'RenderingCancelledException') {
            console.log("Hï¿½zlï¿½ sayfa deï¿½iï¿½imi nedeniyle ï¿½nceki ï¿½izim iptal edildi.");
        } else {
            console.warn("PDF Render hatasï¿½:", e);
        }
    }
}



window.addNewImageToCanvas = function(img, isPDF = false, pcKordinatlari = null) {
    let startWidth, startHeight, posX, posY;

    // Eï¿½er PC isek, tabletin bize gï¿½nderdiï¿½i adaptStrokeToScreen'den geï¿½miï¿½ kusursuz koordinatlarï¿½ kullan!
    if (pcKordinatlari) {
        startWidth = pcKordinatlari.width;
        startHeight = pcKordinatlari.height;
        posX = pcKordinatlari.x;
        posY = pcKordinatlari.y;
    } else {
        // Eï¿½er Tabletsek kendi ekranï¿½mï¿½za gï¿½re hesapla
        startWidth = canvas.width * 0.8;
        if (img.width < startWidth) startWidth = img.width;
        let scaleFactor = startWidth / img.width;
        startHeight = img.height * scaleFactor;

        if (startHeight > canvas.height * 0.8) {
            startHeight = canvas.height * 0.8;
            let scaleFactorH = startHeight / img.height;
            startWidth = img.width * scaleFactorH;
        }

        posX = (canvas.width / 2) - (startWidth / 2);
        posY = (canvas.height / 2) - (startHeight / 2);
    }

    const newStroke = {
        type: 'image',
        id: Date.now() + Math.random(),
        img: img,
        imgData: img.src, // ?? KESï¿½N ï¿½ï¿½Zï¿½M: PDF'in tahta_durumu ile aï¿½dan geï¿½erken kaybolmamasï¿½ iï¿½in imgData eklendi!
        x: posX,
        y: posY,
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    };

    if (isPDF && typeof pdfImageStroke !== 'undefined' && pdfImageStroke !== null) {
        for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
            let s = window.drawnStrokes[i];
            if (s === pdfImageStroke ||
                (s.type === 'image' && s.isBackground === false && !s.isBoxCopy) ||
                (s.isPatch === true || s.type === 'lasso-mask')) {
                window.drawnStrokes.splice(i, 1);
            }
        }
        if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
    }

    drawnStrokes.push(newStroke);
    if (isPDF) { pdfImageStroke = newStroke; }

    const pdfControls = document.getElementById('pdf-controls');
    if (pdfControls) { pdfControls.classList.remove('hidden'); pdfControls.style.display = 'flex'; }

    const closeBtn = document.getElementById('btn-close-pdf');
            if (closeBtn) { closeBtn.classList.remove('hidden'); closeBtn.style.display = 'flex'; }

            redrawAllStrokes();

            // ?? ï¿½ï¿½Zï¿½M 1: Tabletin resmi anï¿½nda gï¿½rebilmesi iï¿½in kï¿½ï¿½ï¿½k bir gecikmeyle ekranï¿½ zorla tazeliyoruz. 
            // Bu sayede "boï¿½luï¿½a tï¿½klama" zorunluluï¿½u ortadan kalkar ve PDF anï¿½nda gï¿½rï¿½nï¿½r!
            setTimeout(() => { if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes(); }, 150);

            // ?? PC'nin donanï¿½mï¿½ zayï¿½f olduï¿½u iï¿½in ve PDF kitap gï¿½nderimi ï¿½nceden kapatï¿½ldï¿½ï¿½ï¿½ iï¿½in, 
            // Tablet her halï¿½karda ï¿½izdiï¿½i hafifletilmiï¿½ JPEG sayfayï¿½ PC'ye gï¿½ndermek zorunda!
            if (!pcKordinatlari && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'arka_plan_resmi_aktar',
                    imgData: img.src,
                    isPDF: isPDF,
                    kordinatlar: { x: newStroke.x, y: newStroke.y, width: newStroke.width, height: newStroke.height },
                    canvasW: canvas.width,
                    canvasH: canvas.height
                });
            }

    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Yï¿½kleme iï¿½leminden sonra Taï¿½ï¿½ butonunun kendi kendine aktif olmasï¿½nï¿½ engellemek iï¿½in aracï¿½ Kalem'e sï¿½fï¿½rla.
    if (typeof setActiveTool === 'function') setActiveTool('pen');
}



// --- ARAï¿½ RENGï¿½ DEï¿½ï¿½ï¿½Tï¿½RME MANTIï¿½I (Sï¿½YAH / NEON / TOK MAVï¿½) ---
const toolColorBtn = document.getElementById('btn-tool-color');
let isBlackTheme = false;
window.isToolThemeBlack = false; // Diï¿½er dosyalar iï¿½in global deï¿½iï¿½ken

if (toolColorBtn) {
    toolColorBtn.addEventListener('click', () => {
        isBlackTheme = !isBlackTheme;
        window.isToolThemeBlack = isBlackTheme; // Durumu kaydet

        // Buton yazï¿½sï¿½nï¿½ gï¿½ncelle
        toolColorBtn.innerText = isBlackTheme ? "Araï¿½ Rengi: Neon" : "Araï¿½ Rengi: Siyah";

        // O an ekranda aï¿½ï¿½k olan tï¿½m fiziksel araï¿½larï¿½ bul ve rengini deï¿½iï¿½tir
        const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');

        elements.forEach(el => {
            if (isBlackTheme) {
                el.classList.add('tool-black-theme');
            } else {
                el.classList.remove('tool-black-theme');
            }
        });

        // ?? Sï¿½NKRONï¿½ZASYON: Tema deï¿½iï¿½imini diï¿½er cihazlara (PC'ye) bildir
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'fiziksel_arac_temasi', isBlackTheme: isBlackTheme });
        }
    });
}

// --- ARAï¿½LAR Aï¿½ILDIï¿½INDA RENGï¿½ HATIRLA (YAMA) ---
// Sayfa tamamen yï¿½klendikten sonra araï¿½larï¿½n 'show' fonksiyonlarï¿½na ekleme yapï¿½yoruz
window.addEventListener('load', () => {
    const toolsList = [
        { objName: 'RulerTool', elementProp: 'rulerElement' },
        { objName: 'GonyeTool', elementProp: 'gonyeElement' },
        { objName: 'AciolcerTool', elementProp: 'aciolcerElement' },
        { objName: 'PergelTool', elementProp: 'pergelElement' }
    ];

    toolsList.forEach(toolInfo => {
        const toolObj = window[toolInfo.objName];
        if (toolObj && toolObj.show) {
            // Orijinal show fonksiyonunu sakla
            const originalShow = toolObj.show.bind(toolObj);

            // Yeni show fonksiyonu tanï¿½mla
            toolObj.show = function () {
                originalShow(); // ï¿½nce normal aï¿½ï¿½lma iï¿½lemini yap

                // Sonra tema rengini kontrol et ve uygula
                if (this[toolInfo.elementProp]) {
                    if (window.isToolThemeBlack) {
                        this[toolInfo.elementProp].classList.add('tool-black-theme');
                    } else {
                        this[toolInfo.elementProp].classList.remove('tool-black-theme');
                    }
                }
            };
        }
    });
});

// --- YARDIM Vï¿½DEOLARI Sï¿½STEMï¿½ ---

// 1. Vï¿½DEO Lï¿½STESï¿½ (ï¿½eviriye Uygun Hale Getirildi)
const tutorialVideos = [
    { id: "vid_cetvel", dosya: "cetvel-vid.mp4" },
    { id: "vid_gonye", dosya: "gonye-vid.mp4" },
    { id: "vid_aciolcer", dosya: "aciolcer-vid.mp4" },
    { id: "vid_pergel", dosya: "pergel-vid.mp4" },
    { id: "vid_canlandir", dosya: "canlandir-vid.mp4" },
    { id: "vid_cizgi", dosya: "cizgi-vid.mp4" },
    { id: "vid_cokgenler", dosya: "cokgenler-vid.mp4" },
    { id: "vid_kalem", dosya: "kalem-vid.mp4" },
    { id: "vid_kitap", dosya: "kitap-yukleme-vid.mp4" },
    { id: "vid_oyunlar", dosya: "oyunlar-vid.mp4" }
];


// Elementleri Seï¿½
const helpBtn = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const closeHelpBtn = document.getElementById('close-help');
const videoListContainer = document.getElementById('video-list-container');
const videoPlayer = document.getElementById('main-video-player');
const videoTitleLabel = document.getElementById('video-title-label');

// Listeyi Oluï¿½tur (ï¿½oklu Dil Destekli)
function loadVideoList() {
    videoListContainer.innerHTML = '';

    // O anki seï¿½ili dili al (Eï¿½er boï¿½sa 'tr' kabul et)
    const t = translations[currentLang || 'tr'];

    tutorialVideos.forEach((vid) => {
        const btn = document.createElement('button');
        btn.className = 'video-item-btn';

        // ï¿½eviriden baï¿½lï¿½ï¿½ï¿½ al (Eï¿½er ï¿½eviri dosyasï¿½na eklemeyi unutursan hata vermesin diye id'yi yazar)
        const videoBaslik = t[vid.id] || vid.id;

        btn.innerText = `? ${videoBaslik}`;

        btn.onclick = () => {
            // Tï¿½m butonlarï¿½n rengini sï¿½fï¿½rla, buna renk ver
            document.querySelectorAll('.video-item-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Videoyu oynat
            videoPlayer.src = `videolar/${vid.dosya}`;
            videoTitleLabel.innerText = videoBaslik; // Oynatï¿½cï¿½nï¿½n ï¿½stï¿½ndeki baï¿½lï¿½ï¿½ï¿½ da ï¿½evir
            videoPlayer.play();
        };
        videoListContainer.appendChild(btn);
    });
}
// Aï¿½ma/Kapama Olaylarï¿½
if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
        loadVideoList();
    });

    closeHelpBtn.addEventListener('click', () => {
        helpModal.classList.add('hidden');
        videoPlayer.pause();
        videoPlayer.src = ""; // Videoyu durdur ve sï¿½fï¿½rla
    });
}

// --- KESï¿½N ï¿½ï¿½Zï¿½M: PDF KAPATMA BUTONU (Global Dinleyici) ---
document.addEventListener('click', function (e) {
    const btn = e.target.closest('#btn-close-pdf');

    if (btn) {
        console.log("PDF Kapatï¿½lï¿½yor...");

        // 1. PC'YE KAPATMA EMRï¿½ Gï¿½NDER
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'pdf_kapat' });
        }

        e.preventDefault();
        e.stopPropagation();

        // ?? 2. Sï¿½Hï¿½RLï¿½ ï¿½ï¿½Zï¿½M: filter yerine splice ile hafï¿½za kopmadan temizlik yapï¿½yoruz ??
        if (window.drawnStrokes) {
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                // PDF, Resim, arka plan, lasso maskesi ve yamalarï¿½n hepsini temizle
                const s = window.drawnStrokes[i];
                if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                    window.drawnStrokes.splice(i, 1);
                }
            }
        }

        // 3. Deï¿½iï¿½kenleri Sï¿½fï¿½rla
        if (typeof currentPDF !== 'undefined') currentPDF = null;
        if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;
        if (typeof currentPDFPage !== 'undefined') currentPDFPage = 1;
        if (typeof totalPDFPages !== 'undefined') totalPDFPages = 0;
        if (typeof backgroundImage !== 'undefined') backgroundImage = null;

        // 4. Butonlarï¿½ Gizle
        const controls = document.getElementById('pdf-controls');
        if (controls) {
            controls.classList.add('hidden');
            controls.style.display = 'none';
        }
        btn.classList.add('hidden');
        btn.style.display = 'none';

        // 5. Ekranï¿½ Temizle ve Kalanlarï¿½ Yeniden ï¿½iz
        if (typeof redrawAllStrokes === 'function') {
            const canvas = document.getElementById('drawing-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            redrawAllStrokes();
        }

        try {
            if (window.audio_click) {
                window.audio_click.currentTime = 0;
                window.audio_click.play();
            }
        } catch (err) { }
    }
}, true);


// --- BAï¿½LANGIï¿½ ---
// --- AKILLI EKRAN BOYUTLANDIRMA (ADRES ï¿½UBUï¿½U ZIPLAMASINI ENGELLER) ---
let lastWindowWidth = window.innerWidth;

function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Gerï¿½ekten ekran dï¿½ndï¿½yse veya boyut deï¿½iï¿½tiyse gï¿½ncelle
    lastWindowWidth = newWidth;

    if (window.Scene3D && window.Scene3D.camera) {
        const aspect = newWidth / newHeight;
        const frustumSize = 30;

        if (window.Scene3D.camera.isPerspectiveCamera) {
            window.Scene3D.camera.aspect = aspect;
        } else {
            window.Scene3D.camera.left = -frustumSize * aspect / 2;
            window.Scene3D.camera.right = frustumSize * aspect / 2;
            window.Scene3D.camera.top = frustumSize / 2;
            window.Scene3D.camera.bottom = -frustumSize / 2;
        }
        window.Scene3D.camera.updateProjectionMatrix();
        if (window.Scene3D.renderer) {
            window.Scene3D.renderer.setSize(newWidth, newHeight);
        }
    }

    redrawAllStrokes();

    // canvas.height = newHeight; satï¿½rï¿½nï¿½n hemen altï¿½na ekle
    setupCanvasResolution();
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// --- app.js EN ALT SATIR (EDGE, CHROME, TABLET UYUMLU Fï¿½NAL) ---

{
    let deferredPrompt;
    const installPopup = document.getElementById('install-popup');
    const btnInstall = document.getElementById('btn-popup-install');
    const btnClose = document.getElementById('btn-popup-close');
    const iosInstructions = document.getElementById('ios-instructions');

    // 1. Tarayï¿½cï¿½ sinyali (Install Prompt)
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Popup'ï¿½ gï¿½ster
        if (installPopup) installPopup.style.display = 'flex';
    });

    // 2. iOS (iPhone/iPad) Kontrolï¿½
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

    if (isIos && !isInStandaloneMode) {
        setTimeout(() => {
            if (installPopup) {
                installPopup.style.display = 'flex';
                if (btnInstall) btnInstall.style.display = 'none'; // iPhone'da butonu gizle
                if (iosInstructions) iosInstructions.style.display = 'block'; // Tarifi gï¿½ster
            }
        }, 3000);
    }

    // --- BUTONLARI ï¿½ALIï¿½TIRAN FONKSï¿½YON (EDGE DOKUNMATï¿½K HATASI ï¿½ï¿½Zï¿½Mï¿½) ---
    const activateButton = (btn, actionCallback) => {
        if (!btn) return;

        const handler = async (e) => {
            // Edge'in dokunmayï¿½ yutmasï¿½nï¿½ engelle
            e.stopPropagation();
            e.preventDefault();

            // ï¿½ï¿½lemi gerï¿½ekleï¿½tir
            await actionCallback();
        };

        // Hem tï¿½klama hem parmak dokunuï¿½unu dinle
        btn.addEventListener('click', handler);
        btn.addEventListener('touchstart', handler, { passive: false });
    };

    // --- BUTONLARA Gï¿½REVLERï¿½Nï¿½ VER ---

    // A) Yï¿½kle Butonu
    activateButton(btnInstall, async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("Sonuï¿½:", outcome);
            deferredPrompt = null;
        }
        if (installPopup) installPopup.style.display = 'none';

        // ?? Sï¿½Hï¿½RLï¿½ DOKUNUï¿½: PC'deki yï¿½kleme penceresini de kapatmasï¿½ iï¿½in komut gï¿½nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });

    // B) Kapat (Hayï¿½r) Butonu
    activateButton(btnClose, async () => {
        if (installPopup) installPopup.style.display = 'none';

        // ?? Sï¿½Hï¿½RLï¿½ DOKUNUï¿½: PC'deki yï¿½kleme penceresini de kapatmasï¿½ iï¿½in komut gï¿½nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });
}

// --- app.js EN ALTA EKLE: Dï¿½NDï¿½RME FONKSï¿½YONU ---

/**
 * Bir HTML elementine dï¿½ndï¿½rme ï¿½zelliï¿½i ekler.
 * @param {HTMLElement} element - Dï¿½ndï¿½rï¿½lecek olan kopya kutusu (div)
 */

// ==========================================
// --- TARAYICI DOKUNMATï¿½K ï¿½AKIï¿½MA ï¿½ï¿½Zï¿½Mï¿½ ---
// ==========================================
// Tarayï¿½cï¿½nï¿½n adres ï¿½ubuï¿½u veya "sayfayï¿½ yenile" hareketinin
// dï¿½ndï¿½rme (rotate) ve taï¿½ï¿½ma iï¿½lemlerini bozmasï¿½nï¿½ engeller.
window.addEventListener('touchmove', function (e) {
    // Eï¿½er dokunulan ï¿½ey dï¿½ndï¿½rme kulpuysa veya kopyalanan resimse:
    if (e.target.closest('.rotate-handle') ||
        e.target.classList.contains('rotate-handle') ||
        e.target.closest('.resize-handle') ||
        e.target.tagName.toLowerCase() === 'img') {

        // Tarayï¿½cï¿½ya "Karï¿½ï¿½ma, kaydï¿½rma yapma!" diyoruz.
        e.preventDefault();
    }
}, { passive: false }); // passive: false ï¿½ok ï¿½nemlidir, tarayï¿½cï¿½yï¿½ durdurmaya izin verir.
// ==========================================


// =========================================================
// MOBï¿½L TARAYICI ZIPLAMA ï¿½ï¿½Zï¿½Mï¿½: KATI EKRAN Kï¿½Lï¿½Dï¿½ (app.js)
// =========================================================
function lockScreenSize() {
    // Ekranï¿½n o anki gerï¿½ek piksel boyutunu al
    let w = window.innerWidth || document.documentElement.clientWidth || window.screen.width || 1024;
    let h = window.innerHeight || document.documentElement.clientHeight || window.screen.height || 768;
    const dpr = window.devicePixelRatio || 1; // ?? HD Oranï¿½

    // Ana Kanvasï¿½ Sabitle
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w * dpr;
        canvas.height = h * dpr;
    }

    // ?? EKSï¿½K OLAN KISIM: Arka Plan Kanvasï¿½nï¿½ da Ana Kanvasla Beton Gibi Sabitle (Sayfa Basï¿½klï¿½ï¿½ï¿½nï¿½ Yok Eder)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = w + 'px';
        bgCanvas.style.height = h + 'px';
        bgCanvas.width = w * dpr;
        bgCanvas.height = h * dpr;
    }

    document.body.style.width = w + 'px';
    document.body.style.height = h + 'px';
    document.documentElement.style.width = w + 'px';
    document.documentElement.style.height = h + 'px';

    if (typeof window.redrawAllStrokes === 'function') {
        window.redrawAllStrokes();
    }
}

// 1. Sayfa yï¿½klendiï¿½inde boyutlarï¿½ kilitle
window.addEventListener('load', lockScreenSize);

// 2. Tablet yan ï¿½evrilirse (yatay/dikey) yeni boyuta gï¿½re tekrar kilitle
window.addEventListener('orientationchange', () => {
    setTimeout(lockScreenSize, 300);
});

// KRï¿½Tï¿½K NOKTA: 'resize' eventini (adres ï¿½ubuï¿½u hareketlerini) Dï¿½NLEMï¿½YORUZ!
// Bï¿½ylece adres ï¿½ubuï¿½u kaybolsa/ï¿½ï¿½ksa bile sayfa esnemez, ï¿½izgiler zï¿½plamaz.

// =======================================================
// CANLANDIR (SNAPSHOT) - TABLET/PC UYUMLU Yï¿½ZEN KOPYA
// =======================================================
function olusturYuzenKopya(imgSrc, startX, startY, width, height) {
    // ?? Sï¿½Hï¿½RLï¿½ Dï¿½ZELTME: HD piksel deï¿½erlerini DOM iï¿½in CSS pikseline dï¿½nï¿½ï¿½tï¿½r
    const canvasEl = document.getElementById('drawing-canvas');
    const dpr = canvasEl ? (canvasEl.width / canvasEl.getBoundingClientRect().width) : (window.devicePixelRatio || 1);

    // Gelen koordinatlarï¿½n HD olup olmadï¿½ï¿½ï¿½nï¿½ kontrol et ve ï¿½lï¿½ekle
    const isHD = width > (canvasEl ? canvasEl.getBoundingClientRect().width : window.innerWidth);
    const scale = isHD ? dpr : 1;

    const cssX = startX / scale;
    const cssY = startY / scale;
    const cssW = width / scale;
    const cssH = height / scale;

    // 1. Ana Kapsayï¿½cï¿½ Kutu
    const container = document.createElement('div');
    container.className = 'yuzen-kopya-container';
    container.style.position = 'absolute';
    container.style.left = cssX + 'px';
    container.style.top = cssY + 'px';
    container.style.width = cssW + 'px';
    container.style.height = cssH + 'px';
    container.style.border = '2px dashed #00ffcc';
    container.style.cursor = 'grab';
    container.style.zIndex = '9999';
    container.style.boxSizing = 'border-box';
    container.style.transformOrigin = 'center center';
    container.style.touchAction = 'none'; // KRï¿½Tï¿½K: Tablette sayfa kaymasï¿½nï¿½ yasaklar
    container.dataset.rotation = '0';

    // 2. Kopyalanan Resim
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
    img.style.pointerEvents = 'none';
    container.appendChild(img);

    // 3. Dï¿½ndï¿½rme (Yeï¿½il) Butonu ve Sapï¿½
    const rotateLine = document.createElement('div');
    rotateLine.style.position = 'absolute';
    rotateLine.style.top = '-20px';
    rotateLine.style.left = '50%';
    rotateLine.style.width = '2px';
    rotateLine.style.height = '20px';
    rotateLine.style.backgroundColor = '#00ff00';
    rotateLine.style.transform = 'translateX(-50%)';
    container.appendChild(rotateLine);

    const rotateBtn = document.createElement('div');
    rotateBtn.className = 'rotate-handle'; // Tablette kaymayï¿½ durduran mevcut sï¿½nï¿½fï¿½nï¿½z
    rotateBtn.style.position = 'absolute';
    rotateBtn.style.top = '-40px';
    rotateBtn.style.left = '50%';
    rotateBtn.style.transform = 'translateX(-50%)';
    rotateBtn.style.width = '30px';
    rotateBtn.style.height = '30px';
    rotateBtn.style.backgroundColor = '#00ff00';
    rotateBtn.style.borderRadius = '50%';
    rotateBtn.style.cursor = 'grab';
    rotateBtn.style.border = '2px solid white';
    rotateBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    rotateBtn.style.touchAction = 'none'; // KRï¿½Tï¿½K
    container.appendChild(rotateBtn);

    // 4. Yeniden Boyutlandï¿½rma (Pembe) Butonu
    const resizeBtn = document.createElement('div');
    resizeBtn.className = 'resize-handle'; // Tablette kaymayï¿½ durduran mevcut sï¿½nï¿½fï¿½nï¿½z
    resizeBtn.style.position = 'absolute';
    resizeBtn.style.bottom = '-15px';
    resizeBtn.style.right = '-15px';
    resizeBtn.style.width = '30px';
    resizeBtn.style.height = '30px';
    resizeBtn.style.backgroundColor = '#ff00ff';
    resizeBtn.style.borderRadius = '50%';
    resizeBtn.style.cursor = 'nwse-resize';
    resizeBtn.style.border = '2px solid white';
    resizeBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    resizeBtn.style.touchAction = 'none'; // KRï¿½Tï¿½K
    container.appendChild(resizeBtn);

    document.body.appendChild(container);

    // --- TABLET UYUMLU ETKï¿½LEï¿½ï¿½M MANTIï¿½I ---
    let mode = 'none';
    let startEvtX, startEvtY, initialLeft, initialTop, initialWidth, initialHeight, initialRotation, centerX, centerY;
    let activePointerId = null; // Parmaï¿½ï¿½ takip etmek iï¿½in kilit ID'si

    // Dï¿½ndï¿½rmeye Baï¿½la
    rotateBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'rotate';
        activePointerId = e.pointerId;
        rotateBtn.setPointerCapture(activePointerId); // KRï¿½Tï¿½K: Parmaï¿½ï¿½ yeï¿½il butona kilitle!

        const rect = container.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        initialRotation = parseFloat(container.dataset.rotation) || 0;
        container.dataset.startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
    });

    // Boyutlandï¿½rmaya Baï¿½la
    resizeBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'resize';
        activePointerId = e.pointerId;
        resizeBtn.setPointerCapture(activePointerId); // KRï¿½Tï¿½K: Parmaï¿½ï¿½ pembe butona kilitle!

        startEvtX = e.clientX; startEvtY = e.clientY;
        initialWidth = container.offsetWidth; initialHeight = container.offsetHeight;
    });

    // Sï¿½rï¿½klemeye Baï¿½la
    container.addEventListener('pointerdown', (e) => {
        if (e.target === rotateBtn || e.target === resizeBtn) return;
        e.stopPropagation(); e.preventDefault();
        mode = 'drag';
        activePointerId = e.pointerId;
        container.setPointerCapture(activePointerId); // KRï¿½Tï¿½K: Parmaï¿½ï¿½ resme kilitle!

        container.style.cursor = 'grabbing';
        startEvtX = e.clientX; startEvtY = e.clientY;
        initialLeft = container.offsetLeft; initialTop = container.offsetTop;
    });

    // Hareket Etme (Move)
    const onMove = (e) => {
        if (mode === 'none') return;
        if (e.pointerId !== activePointerId) return; // ï¿½kinci parmakla yapï¿½lan mï¿½dahaleleri engeller
        e.preventDefault();

        if (mode === 'drag') {
            container.style.left = (initialLeft + (e.clientX - startEvtX)) + 'px';
            container.style.top = (initialTop + (e.clientY - startEvtY)) + 'px';
        } else if (mode === 'resize') {
            const newWidth = Math.max(30, initialWidth + (e.clientX - startEvtX));
            container.style.width = newWidth + 'px';
            container.style.height = initialHeight * (newWidth / initialWidth) + 'px';
        } else if (mode === 'rotate') {
            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            const finalRotation = initialRotation + (currentAngle - parseFloat(container.dataset.startAngle));
            container.style.transform = `rotate(${finalRotation}deg)`;
            container.dataset.rotation = finalRotation;
        }
    };

    // Parmaï¿½ï¿½ Kaldï¿½rma (Bï¿½rakma)
    const onUp = (e) => {
        if (mode === 'none') return;

        // Kilidi serbest bï¿½rak
        if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
        }

        if (mode === 'drag') container.style.cursor = 'grab';
        mode = 'none';
        activePointerId = null;
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp); // Tarayï¿½cï¿½ hatasï¿½nda da bï¿½rak

    // --- BOï¿½LUï¿½A TIKLAYINCA ANA KANVASA Mï¿½Hï¿½RLE (TABLET ï¿½OKLU KOPYA ï¿½NLEYï¿½Cï¿½) ---
    setTimeout(() => {
        let isStamped = false; // ï¿½oklu kopyayï¿½ engelleyen kilit

        const disariTiklama = (e) => {
            if (isStamped || container.contains(e.target)) return;

            // Eï¿½er dï¿½ndï¿½rme veya boyutlandï¿½rma butonlarï¿½na basï¿½lï¿½yorsa mï¿½hï¿½rleme yapma
            if (e.target.closest('.rotate-handle') || e.target.closest('.resize-handle')) return;

            isStamped = true;
            window.removeEventListener('pointerdown', disariTiklama, true);

            // Sizin orijinal canvas referansï¿½nï¿½za (canvas) gï¿½re tam uyumlu koordinat yakalama
            const containerRect = container.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            let xKoordinati = parseFloat(container.style.left);
            let yKoordinati = parseFloat(container.style.top);
            let genislik = parseFloat(container.style.width);
            let yukseklik = parseFloat(container.style.height);

            // Dokunmatik ekrandan el ï¿½ekildiï¿½inde koordinat kaybolursa fiziksel pikselleri kurtar
            if (isNaN(xKoordinati) || isNaN(yKoordinati)) {
                xKoordinati = containerRect.left - canvasRect.left;
                yKoordinati = containerRect.top - canvasRect.top;
                genislik = containerRect.width;
                yukseklik = containerRect.height;
            }

            // Hatalï¿½/boï¿½ tï¿½klamalarï¿½ engelle
            if (genislik < 5 || yukseklik < 5) {
                if (container && container.parentNode) container.parentNode.removeChild(container);
                return;
            }

            // PDF ve Sayfa Hafï¿½zasï¿½yla tam uyumlu yeni kopya objesi
            const newCopy = {
                type: 'image',
                imgData: imgSrc,
                x: xKoordinati - canvasRect.left, // Kanvasï¿½n sol boï¿½luï¿½unu net olarak dï¿½ï¿½ï¿½yoruz
                y: yKoordinati - canvasRect.top,  // Kanvasï¿½n ï¿½st boï¿½luï¿½unu net olarak dï¿½ï¿½ï¿½yoruz
                width: genislik,
                height: yukseklik,
                rotation: parseFloat(container.dataset.rotation) || 0,
                isBackground: false,
                isBoxCopy: true,
                pageOwner: typeof currentPDFPage !== 'undefined' ? currentPDFPage : 1,
                imgObj: null
            };

            // Kanvas ï¿½izim motoru tetikleyicisi
            const imgObj = new Image();
            imgObj.src = imgSrc;
            imgObj.onload = () => {
                newCopy.imgObj = imgObj;

                // Ana ï¿½izim dizisine ekle
                if (typeof drawnStrokes !== 'undefined') {
                    drawnStrokes.push(newCopy);
                }

                // PDF sayfa hafï¿½za dizisine ekle
                if (!window.boxCopies) window.boxCopies = [];
                window.boxCopies.push(newCopy);

                // Kanvas ekranï¿½nï¿½ anï¿½nda tazeleyip resmi gï¿½rï¿½nï¿½r kï¿½l
                if (window.redrawAllStrokes) window.redrawAllStrokes();

                console.log("Kutu kopyasï¿½ baï¿½arï¿½yla kanvas hafï¿½zasï¿½na mï¿½hï¿½rlendi!");
            };

            // Geï¿½ici ï¿½izgili kutuyu ve diï¿½er izleyicileri temizle
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };

        window.addEventListener('pointerdown', disariTiklama, true);
    }, 200);
}

// Dosyanï¿½n en altï¿½na ekle
window.addEventListener('load', () => {
    setTimeout(setupCanvasResolution, 500);
});


// ===================================================================
// --- AKILLI ï¿½EKï¿½L TANIMA V15 (KUSURSUZ YILDIZ VE ï¿½ï¿½GEN AYRIMI) ---
// ===================================================================
function akilliSekilTani(stroke) {
    if (!stroke || stroke.type !== 'pen' || stroke.path.length < 15) return null;

    const pts = stroke.path;
    const start = pts[0];
    const end = pts[pts.length - 1];
    const directDistance = Math.hypot(end.x - start.x, end.y - start.y);

    let totalDistance = 0;
    for (let i = 1; i < pts.length; i++) totalDistance += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const w = maxX - minX;
    const h = maxY - minY;
    const maxBoyut = Math.max(w, h);
    const cx = minX + w / 2;
    const cy = minY + h / 2;

    if (maxBoyut < 30) return null;

    const col = stroke.color;
    const wid = stroke.baseWidth || 3;

    // 1. Dï¿½Z ï¿½ï¿½ZGï¿½
    if (directDistance > 50 && (totalDistance / directDistance) < 1.15) {
        return { type: 'straightLine', p1: start, p2: end, color: col, width: wid };
    }

    // 2. KAPALI ï¿½EKï¿½LLER (Kapanma Toleransï¿½)
    const tamKapaliMi = directDistance < (maxBoyut * 0.3) && directDistance < 50;
    if (!tamKapaliMi) return null;

    // Aï¿½IRI KARMAï¿½IK KARALAMA KORUMASI 
    if (totalDistance > (w + h) * 4) return null;

    // --- Bï¿½LGESEL Fï¿½Zï¿½KSEL KANITLAR ---
    let topMinX = Infinity, topMaxX = -Infinity;
    let bottomMinX = Infinity, bottomMaxX = -Infinity;
    let leftMinY = Infinity, leftMaxY = -Infinity;
    let rightMinY = Infinity, rightMaxY = -Infinity;
    let distTL = Infinity, distTR = Infinity, distBL = Infinity, distBR = Infinity;
    let totalR = 0;

    pts.forEach(p => {
        if (p.y < minY + h * 0.35) { if (p.x < topMinX) topMinX = p.x; if (p.x > topMaxX) topMaxX = p.x; }
        if (p.y > maxY - h * 0.35) { if (p.x < bottomMinX) bottomMinX = p.x; if (p.x > bottomMaxX) bottomMaxX = p.x; }
        if (p.x < minX + w * 0.35) { if (p.y < leftMinY) leftMinY = p.y; if (p.y > leftMaxY) leftMaxY = p.y; }
        if (p.x > maxX - w * 0.35) { if (p.y < rightMinY) rightMinY = p.y; if (p.y > rightMaxY) rightMaxY = p.y; }
        totalR += Math.hypot(p.x - cx, p.y - cy);

        const dTL = Math.hypot(p.x - minX, p.y - minY); if (dTL < distTL) distTL = dTL;
        const dTR = Math.hypot(p.x - maxX, p.y - minY); if (dTR < distTR) distTR = dTR;
        const dBL = Math.hypot(p.x - minX, p.y - maxY); if (dBL < distBL) distBL = dBL;
        const dBR = Math.hypot(p.x - maxX, p.y - maxY); if (dBR < distBR) distBR = dBR;
    });

    let topW = Math.max(1, topMaxX - topMinX);
    let bottomW = Math.max(1, bottomMaxX - bottomMinX);
    let leftH = Math.max(1, leftMaxY - leftMinY);
    let rightH = Math.max(1, rightMaxY - rightMinY);
    let avgCornerDist = (distTL + distTR + distBL + distBR) / 4;

    let avgR = totalR / pts.length;
    let sapma = 0;
    pts.forEach(p => { sapma += Math.abs(Math.hypot(p.x - cx, p.y - cy) - avgR); });
    let sapmaOrani = sapma / (pts.length * avgR);

    // ==========================================
    // 1. YILDIZ KONTROLï¿½ (Nokta Sayma ï¿½ptal, Derinlik ï¿½lï¿½ï¿½mï¿½ Geldi)
    // ==========================================
    let isStar = false;
    if (Math.abs(w - h) < maxBoyut * 0.6) {
        let altSolMaxY = -Infinity;
        let altSagMaxY = -Infinity;
        let altOrtaMaxY = -Infinity;

        pts.forEach(p => {
            // ï¿½eklin saï¿½, sol ve orta alt kï¿½sï¿½mlarï¿½nï¿½n "En derin" (MaxY) noktalarï¿½nï¿½ buluyoruz
            if (p.x < cx - w * 0.15) { if (p.y > altSolMaxY) altSolMaxY = p.y; }
            else if (p.x > cx + w * 0.15) { if (p.y > altSagMaxY) altSagMaxY = p.y; }
            else { if (p.y > altOrtaMaxY) altOrtaMaxY = p.y; }
        });

        // ï¿½ï¿½gende alt ï¿½izgi dï¿½zdï¿½r, altOrtaMaxY diï¿½erlerine eï¿½ittir.
        // Yï¿½ldï¿½zda ise ortada boï¿½luk olduï¿½u iï¿½in altOrtaMaxY belirgin ï¿½ekilde DAHA YUKARIDADIR.
        if (topW < w * 0.5 &&
            altSolMaxY > cy + h * 0.10 &&
            altSagMaxY > cy + h * 0.10 &&
            altOrtaMaxY < Math.min(altSolMaxY, altSagMaxY) - h * 0.10) {
            isStar = true;
        }
    }

    // ==========================================
    // 2. KALP KONTROLï¿½ 
    // ==========================================
    let isHeart = false;
    if (!isStar && Math.abs(w - h) < maxBoyut * 0.5) {
        let ustKisim = pts.filter(p => p.y < cy);
        let solTepe = ustKisim.filter(p => p.x < cx - w * 0.15);
        let sagTepe = ustKisim.filter(p => p.x > cx + w * 0.15);
        let ortaCukur = ustKisim.filter(p => Math.abs(p.x - cx) <= w * 0.15);

        if (solTepe.length > 0 && sagTepe.length > 0 && ortaCukur.length > 0) {
            let solMaxY = Math.min(...solTepe.map(p => p.y));
            let sagMaxY = Math.min(...sagTepe.map(p => p.y));
            let ortaMinY = Math.max(...ortaCukur.map(p => p.y));

            if (ortaMinY > solMaxY + h * 0.08 && ortaMinY > sagMaxY + h * 0.08 && bottomW < w * 0.45) {
                isHeart = true;
            }
        }
    }

    // ==========================================
    // 3. ï¿½EMBER KONTROLï¿½
    // ==========================================
    let isCircle = (!isStar && !isHeart && sapmaOrani < 0.20 && Math.abs(w - h) < maxBoyut * 0.5 && avgCornerDist > maxBoyut * 0.14);

    // --- SONUï¿½ Dï¿½NDï¿½RME ---
    const getChar = () => {
        let c = window.nextPointChar || 'A';
        let nextCode = c.charCodeAt(0) + 1;
        if (nextCode > 90) nextCode = 65;
        window.nextPointChar = String.fromCharCode(nextCode);
        return c;
    };

    const createTriangle = (pA, pB, pC) => {
        const l1 = getChar(), l2 = getChar(), l3 = getChar();
        return [
            { type: 'segment', p1: pA, p2: pB, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: pB, p2: pC, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: pC, p2: pA, color: col, width: wid, label1: l3, label2: l1 }
        ];
    };

    if (isStar) {
        const starPath = [];
        // Bu dï¿½ngï¿½, senin istediï¿½in "Dï¿½ï¿½ Hatlarï¿½ Olan Kesiï¿½meyen Yï¿½ldï¿½zï¿½" ï¿½izen 10 noktalï¿½ sihirli kï¿½sï¿½mdï¿½r!
        for (let i = 0; i <= 10; i++) {
            let r = i % 2 === 0 ? maxBoyut / 2 : maxBoyut / 4.5;
            let ang = (Math.PI * 2 * i / 10) - Math.PI / 2;
            starPath.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
        }
        return { type: 'pen', path: starPath, color: col, baseWidth: wid, width: wid };
    }

    if (isHeart) {
        const heartPath = [];
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
            heartPath.push({
                x: cx + (w / 2) * (16 * Math.pow(Math.sin(t), 3)) / 16,
                y: cy - (h / 2) * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16 - (h * 0.05)
            });
        }
        heartPath.push(heartPath[0]);
        return { type: 'pen', path: heartPath, color: col, baseWidth: wid, width: wid };
    }

    if (isCircle) {
        return { type: 'arc', cx: cx, cy: cy, radius: (w + h) / 4, startAngle: 0, endAngle: 360, color: col, width: wid, fillColor: 'transparent' };
    }

    // 4. ï¿½ï¿½GEN
    if (topW < bottomW * 0.45 || bottomW < topW * 0.45) {
        if (topW < bottomW) return createTriangle({ x: (topMinX + topMaxX) / 2, y: minY }, { x: minX, y: maxY }, { x: maxX, y: maxY });
        else return createTriangle({ x: minX, y: minY }, { x: maxX, y: minY }, { x: (bottomMinX + bottomMaxX) / 2, y: maxY });
    }
    if (leftH < rightH * 0.45 || rightH < leftH * 0.45) {
        if (leftH < rightH) return createTriangle({ x: minX, y: (leftMinY + leftMaxY) / 2 }, { x: maxX, y: minY }, { x: maxX, y: maxY });
        else return createTriangle({ x: maxX, y: (rightMinY + rightMaxY) / 2 }, { x: minX, y: minY }, { x: minX, y: maxY });
    }

    // 5. YAMUK
    if ((topW < bottomW * 0.85 && topW >= bottomW * 0.45) || (bottomW < topW * 0.85 && bottomW >= topW * 0.45)) {
        const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
        return [
            { type: 'segment', p1: { x: topMinX, y: minY }, p2: { x: topMaxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: { x: topMaxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
            { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: topMinX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
        ];
    }

    // 6. Dï¿½KDï¿½RTGEN / KARE 
    const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
    return [
        { type: 'segment', p1: { x: minX, y: minY }, p2: { x: maxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
        { type: 'segment', p1: { x: maxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
        { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
        { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: minX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
    ];

} // <-- BU Sï¿½SLï¿½ PARANTEZ ï¿½OK ï¿½NEMLï¿½, ï¿½STTEKï¿½ FONKSï¿½YONU KAPATIR!


// --- BAï¿½KA Bï¿½R ARACA TIKLANDIï¿½INDA Sï¿½LGï¿½Yï¿½ OTOMATï¿½K KAPATMA YAMASI ---
document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
    btn.addEventListener('click', function () {
        // Eï¿½er tï¿½klanan buton "Silgi" deï¿½ilse ï¿½alï¿½ï¿½sï¿½n
        if (this.id !== 'btn-silgi') {
            const silgiBtn = document.getElementById('btn-silgi');

            // Silgi butonu aktifse, aktiflik sï¿½nï¿½fï¿½nï¿½ kaldï¿½r (ï¿½ï¿½ï¿½ï¿½ï¿½nï¿½ sï¿½ndï¿½r)
            if (silgiBtn && silgiBtn.classList.contains('active')) {
                silgiBtn.classList.remove('active');

                // Arka planda ï¿½izim aracï¿½nï¿½ 'silgi' modundan ï¿½ï¿½kar (uygulamanï¿½zdaki deï¿½iï¿½ken ismine gï¿½re 'none' veya 'pen' yapï¿½yoruz)
                if (typeof currentTool !== 'undefined' && currentTool === 'eraser') {
                    currentTool = 'none';
                }
            }
        }
    });
});

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const t = translations[lang];

    const update = (id, text) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = text;
            console.log(`${id} gï¿½ncellendi: ${text}`); // Hata ayï¿½klama iï¿½in konsola yazar
        }
    };

    // SOL PANEL
    update('btn-silgi', t.silgi);
    update('btn-kalem', t.kalem);
    update('btn-cizgi', t.cizgi);
    update('btn-nokta', t.nokta);
    update('btn-d_cizgi', t.d_cizgi);
    update('btn-dogru', t.dogru);
    update('btn-dogru_parcasi', t.dogru_parcasi);
    update('btn-isin', t.isin);
    update('btn-cetvel', t.cetvel);
    update('btn-gonye', t.gonye);
    update('btn-aciolcer', t.aciolcer);
    update('btn-pergel', t.pergel);
    update('btn-cokgenler', t.cokgenler);
    update('btn-cember', t.cember);
    update('btn-duzgun_ucgen', t.d_ucgen);
    update('btn-duzgun_dortgen', t.d_dortgen);
    update('btn-dikdortgen', t.dikdortgen);
    update('btn-duzgun_besgen', t.d_besgen);
    update('btn-duzgun_altigen', t.d_altigen);
    update('btn-duzgun_yedigen', t.d_yedigen);
    update('btn-duzgun_sekizgen', t.d_sekizgen);
    update('btn-oyunlar', t.oyunlar);

    // SAï¿½ PANEL
    update('btn-undo', t.geri_al);
    update('btn-clear-all', t.hepsini_sil);
    update('btn-move', t.tasi);
    update('btn-upload', t.yukle);
    update('btn-camera', t.soru_cek);
    if (typeof tonyBtn !== 'undefined' && tonyBtn) {
        if (!tonyBtn.innerHTML.includes('KVKK')) {
            tonyBtn.innerHTML = t.sihirli_el;
        }
    }
    update('btn-snapshot-main', t.canlandir);
    update('btn-snapshot-box', t.kutu);
    update('btn-snapshot-lasso', t.serbest);
    update('btn-help', t.yardim);

    // POPUP VE ALT Bï¿½LGï¿½ (Kritik Satï¿½r)
    update('install-title', t.ins_t);
    update('install-desc', t.ins_d);
    update('btn-popup-install', t.ins_b);
    update('btn-popup-close', t.ins_c);
    update('kvkk-bilgi', t.kvkk); // <--- BU SATIRIN EKLENDï¿½ï¿½ï¿½NDEN EMï¿½N OL

    // ARAï¿½ RENGï¿½ Gï¿½NCELLEME
    const colorBtn = document.getElementById('btn-tool-color');
    if (colorBtn) {
        const parts = colorBtn.innerText.split(': ');
        const currentColor = parts[1] || "";
        colorBtn.innerText = currentColor ? `${t.arac_rengi}: ${currentColor}` : t.arac_rengi;
    }

    // ARAPï¿½A Yï¿½N AYARI
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // ARAYï¿½Zï¿½ KAPAT
    const overlay = document.getElementById('language-overlay');
    if (overlay) overlay.style.display = 'none';

    // --- Tï¿½M SEï¿½ENEK MENï¿½LERï¿½Nï¿½ KESï¿½N OLARAK KAPAT (TAï¿½MA VE SIZMA ENGELLEYï¿½Cï¿½) ---
    const optionMenus = [
        document.getElementById('line-options'),
        document.getElementById('polygon-options'),
        document.getElementById('fill-options'),
        document.getElementById('snapshot-options'),
        document.getElementById('pen-options'),
        document.getElementById('oyunlar-options')
    ];
    optionMenus.forEach(menu => {
        if (menu) {
            menu.classList.add('hidden');
            menu.style.display = 'none';
        }
    });

    // Tï¿½m ana butonlarï¿½n aktiflik (ï¿½ï¿½ï¿½k) durumunu baï¿½langï¿½ï¿½ iï¿½in sï¿½ndï¿½r
    document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
        btn.classList.remove('active');
    });

    // Eï¿½er aktif bir araï¿½ seï¿½ili kalmï¿½ï¿½sa onu temizle (isteï¿½e baï¿½lï¿½)
    // currentTool = null; 

    console.log("Menï¿½ler uzun kelime taï¿½masï¿½na karï¿½ï¿½ sï¿½fï¿½rlandï¿½.");

    // OYUN Lï¿½STESï¿½Nï¿½ YENï¿½LE (Oyunlar menï¿½sï¿½ aï¿½ï¿½ksa isimler deï¿½iï¿½sin)
    if (typeof listeleOyunlar === 'function') listeleOyunlar();

    // KANVAS TAZELEME
    setTimeout(() => {
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    }, 100);
}

// --- BU FONKSï¿½YON SETLANGUAGE'ï¿½N DIï¿½INA/ALTINA GELï¿½YOR ---
// ï¿½kinci kopya resizeCanvas kaldï¿½rï¿½ldï¿½ ï¿½ï¿½nkï¿½ koordinat senkronizasyonunu bozuyordu.

// ================================================================
// Dï¿½L SEï¿½ï¿½Mï¿½ VE Aï¿½A FIRLATMA MOTORU
// ================================================================
function dilButonlariniHazirla() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const langMatch = btn.getAttribute('onclick')?.match(/'([^']+)'/);
        const targetLang = langMatch ? langMatch[1] : btn.dataset.lang;

        if (targetLang) {
            btn.onclick = null;
            btn.removeAttribute('onclick');

            let isTriggered = false;
            const handleSelect = (e) => {
                if (isTriggered) return;
                isTriggered = true;

                if (e.cancelable) e.preventDefault();
                e.stopPropagation();

                // ?? Fï¿½Zï¿½KSEL DOKUNMA SIZMASI (GHOST CLICK) KALKANI ??
                // Dil seï¿½ilip overlay kapandï¿½ï¿½ï¿½ an, arkadaki butonlara hayalet tï¿½klama ï¿½arpmasï¿½n diye
                // tï¿½m arayï¿½z panellerini 500ms (yarï¿½m saniye) boyunca tamamen tï¿½klanamaz yapï¿½yoruz.
                document.querySelectorAll('.panel').forEach(panel => {
                    panel.style.pointerEvents = 'none';
                    setTimeout(() => {
                        panel.style.pointerEvents = 'auto'; // Yarï¿½m saniye sonra kilit otomatik aï¿½ï¿½lï¿½r
                    }, 500);
                });

                // 1. Tabletin (Tï¿½klanan cihazï¿½n) ekranï¿½nï¿½ aï¿½
                setLanguage(targetLang);

                // ?? ï¿½ï¿½Zï¿½M 3: Tablette yasal uyarï¿½ penceresini KESï¿½N OLARAK Kapat!
                const disclaimer = document.getElementById('disclaimer-modal');
                if (disclaimer) disclaimer.style.display = 'none';
                window.acilisPenceresiKapatildi = true;

                // Tablet yerel ekranï¿½ndaki alt bilgi ï¿½eridini de kapat
                const footer = document.getElementById('footer-container') || document.getElementById('disclaimer-container') || document.getElementById('kvkk-bilgi')?.parentElement;
                if (footer) footer.style.display = 'none';

                // 2. Karï¿½ï¿½ cihaza (PC/Tahtaya) "Aynï¿½ dili seï¿½ ve ekranï¿½ aï¿½" emri gï¿½nder!
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (typeof isConnected !== 'undefined' && isConnected && firlatici) {
                    firlatici({ type: 'dil_secimi', lang: targetLang });
                    firlatici({ type: 'acilis_penceresini_kapat' });
                    firlatici({ type: 'yukleme_penceresini_kapat' });
                    
                    // ?? GARANTï¿½ Sï¿½NYALï¿½: PC'nin veri kanalï¿½nï¿½ aï¿½arken yaï¿½ayabileceï¿½i milisaniyelik gecikmelere karï¿½ï¿½ mesaj 3 kez daha tekrarlanï¿½r!
                    [500, 1500, 3000].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: targetLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                        }, gecikme);
                    });
                }

                setTimeout(() => { isTriggered = false; }, 500);
            };

            btn.addEventListener('pointerdown', handleSelect);
            btn.addEventListener('touchstart', handleSelect, { passive: false });
            btn.addEventListener('click', handleSelect);
        }
    });
}


// Akï¿½llï¿½ tahta tarayï¿½cï¿½larï¿½nï¿½n gecikme/hï¿½z problemlerine karï¿½ï¿½ garanti tetikleyici
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', dilButonlariniHazirla);
} else {
    dilButonlariniHazirla();
}



// =========================================================================
// KUSURSUZ AKILLI NESNE Sï¿½LGï¿½Sï¿½ v2 (ZOMBï¿½ KORUMALI VE EKSï¿½KSï¿½Z)
// =========================================================================
const canvasElm = document.getElementById('drawing-canvas');

function akilliSilgi(e, isDown) {
    // Sadece silgi aracï¿½ seï¿½iliyse ï¿½alï¿½ï¿½sï¿½n
    if (typeof currentTool === 'undefined' || currentTool !== 'eraser') return false;

    // Tï¿½klanmï¿½yorsa veya ekrana dokunulmuyorsa iï¿½lem yapma
    const isClicking = isDown || (typeof isDrawing !== 'undefined' && isDrawing) || e.buttons > 0 || (e.touches && e.touches.length > 0);
    if (!isClicking) {
        window.lastEraserPos = null; // Tï¿½klama bitince hafï¿½zayï¿½ sï¿½fï¿½rla
        return false;
    }

    // ?? KESï¿½N VE KUSURSUZ ï¿½ï¿½Zï¿½M: Windows Ekran ï¿½lï¿½eklendirmesini (%125, %150) Yenen Evrensel Formï¿½l!
    const canvasElm = document.getElementById('drawing-canvas') || e.target;
    const rect = canvasElm.getBoundingClientRect();

    // Ekranin asagi kaymasini engeller
    if (e.cancelable) e.preventDefault();

    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    // ï¿½arpma/bï¿½lme hilesiyle farenin CSS pikselini, HD Canvas pikseline %100 sapmasï¿½z ï¿½eviriyoruz:
    const scaleX = canvasElm.width / rect.width;
    const scaleY = canvasElm.height / rect.height;

    const ex = (clientX - rect.left) * scaleX;
    const ey = (clientY - rect.top) * scaleY;

    // Silginin etki alanï¿½nï¿½ da ekranï¿½n HD oranï¿½na gï¿½re bï¿½yï¿½tï¿½yoruz
    const eR = 45 * Math.max(scaleX, scaleY);

    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Yeni bir yere dokunulduï¿½unda eski hafï¿½zayï¿½ SIFIRLA!
    // Bï¿½ylece eski noktadan yeni noktaya gï¿½rï¿½nmez bir lazer ï¿½ekip diï¿½er ï¿½ekilleri yutmaz.
    if (isDown) {
        window.lastEraserPos = null;
    }

    // --- Iï¿½ï¿½nlanma (Hï¿½zlï¿½ Silme) Korumasï¿½ ---
    let noktalar = [{ x: ex, y: ey }];

    if (window.lastEraserPos) {
        const dx = ex - window.lastEraserPos.x;
        const dy = ey - window.lastEraserPos.y;
        const mesafe = Math.hypot(dx, dy);

        // Eï¿½er fare hï¿½zlï¿½ kaydï¿½rï¿½lï¿½p boï¿½luk oluï¿½tuysa, arayï¿½ daha sï¿½k (15px) sanal silgilerle doldur
        if (mesafe > 15) {
            const adimSayisi = Math.floor(mesafe / 15);
            for (let i = 1; i <= adimSayisi; i++) {
                noktalar.push({
                    x: window.lastEraserPos.x + (dx * i / adimSayisi),
                    y: window.lastEraserPos.y + (dy * i / adimSayisi)
                });
            }
        }
    }
    window.lastEraserPos = { x: ex, y: ey };

    let silindiMi = false;

    // ... BU SATIRDAN Aï¿½Aï¿½ISINA (const distToSeg... kï¿½smï¿½na) DOKUNMAYIN ...
    const distToSeg = (p, v, w) => {
        let l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
        if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
    };

    if (typeof drawnStrokes !== 'undefined') {
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            const s = drawnStrokes[i];
            if (s.isBackground) continue;

            let vuruldu = false;

            // Boï¿½luklarï¿½ dolduran tï¿½m sanal silgilerle tarama yap
            for (let n of noktalar) {
                if (vuruldu) break; // Zaten silindiyse diï¿½er noktalara bakma
                let nx = n.x, ny = n.y;

                // 1. Serbest Kalem
                if (s.type === 'pen' && s.path) {
                    for (let j = 1; j < s.path.length; j++) {
                        if (distToSeg({ x: nx, y: ny }, s.path[j - 1], s.path[j]) < eR + (s.width || 3)) { vuruldu = true; break; }
                    }
                    if (!vuruldu && s.path.length === 1) {
                        if (Math.hypot(s.path[0].x - nx, s.path[0].y - ny) < eR + 5) vuruldu = true;
                    }
                }
                // 2. Kutu ve Serbest Kesimler
                else if (s.type === 'image') {
                    if (nx >= (s.x || 0) && nx <= (s.x || 0) + (s.width || 0) && ny >= (s.y || 0) && ny <= (s.y || 0) + (s.height || 0)) vuruldu = true;
                }
                // 3. ï¿½okgenler
                else if (s.type === 'polygon' && s.center) {
                    if (Math.hypot(s.center.x - nx, s.center.y - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. ï¿½ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. ï¿½ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }

                // ?? YENï¿½ 5: Cetvel ï¿½izgileri, Sonsuz Doï¿½ru, Iï¿½ï¿½n ve Doï¿½ru Parï¿½asï¿½ (Kusursuz Silme)
                else if (s.p1 && s.p2) {
                    if (s.type === 'line' || s.type === 'ray') {
                        const dx = s.p2.x - s.p1.x;
                        const dy = s.p2.y - s.p1.y;
                        const mag = Math.hypot(dx, dy);
                        if (mag > 0) {
                            const dist = Math.abs(dy * nx - dx * ny + s.p2.x * s.p1.y - s.p2.y * s.p1.x) / mag;

                            if (s.type === 'ray') {
                                const dot = (nx - s.p1.x) * dx + (ny - s.p1.y) * dy;
                                if (dot >= 0 && dist < eR + 10) vuruldu = true;
                            } else {
                                if (dist < eR + 10) vuruldu = true;
                            }
                        }
                    } else {
                        // Doï¿½ru Parï¿½asï¿½ ve Dï¿½z ï¿½izgi (Eski kodunuzdaki distToSeg devam eder)
                        if (distToSeg({ x: nx, y: ny }, s.p1, s.p2) < eR + 10) vuruldu = true;
                    }
                }

                // 6. Dï¿½KDï¿½RTGEN DESTEï¿½ï¿½
                else if (s.type === 'rectangle' || s.type === 'rect') {
                    let rx = s.x !== undefined ? s.x : Math.min(s.startPoint?.x || 0, s.endPoint?.x || 0);
                    let ry = s.y !== undefined ? s.y : Math.min(s.startPoint?.y || 0, s.endPoint?.y || 0);
                    let rw = s.width !== undefined ? s.width : Math.abs((s.startPoint?.x || 0) - (s.endPoint?.x || 0));
                    let rh = s.height !== undefined ? s.height : Math.abs((s.startPoint?.y || 0) - (s.endPoint?.y || 0));

                    if (nx >= rx - eR && nx <= rx + rw + eR && ny >= ry - eR && ny <= ry + rh + eR) {
                        vuruldu = true;
                    }
                }

                // 7. NOKTA Sï¿½LME DESTEï¿½ï¿½
                else if (s.type === 'point') {
                    if (Math.hypot((s.x || 0) - nx, (s.y || 0) - ny) <= 15 + eR) vuruldu = true;
                }

                // ?? YENï¿½ 8: HAYALET ï¿½Nï¿½ZLEMELERï¿½ YOK EDï¿½Cï¿½
                else if (s.type === 'preview') {
                    vuruldu = true;
                }
                // ?? YENï¿½ 9: 3D ï¿½EKï¿½LLERï¿½ Sï¿½LME (Silgi ï¿½ï¿½zï¿½mï¿½)
                else if (s.type === '3d_shape') {
                    if (Math.hypot((s.x + (s.width || 100) / 2) - nx, (s.y + (s.height || 100) / 2) - ny) <= (s.width || 100) / 2 + eR) {
                        vuruldu = true;
                    }
                }
            } // <--- Noktalar tarama dï¿½ngï¿½sï¿½nï¿½n bitiï¿½ parantezi

            // VURULDUYSA Sï¿½L VE Aï¿½A Gï¿½NDER
            if (vuruldu) {
                if (!s.id) s.id = Date.now() + Math.random();

                // ?? Eï¿½er 3D ï¿½ekilse, 3D uzay sahnesinden (Scene3D) kazï¿½!
                if (s.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === s.id);
                    if (meshToRemove) {
                        window.Scene3D.scene.remove(meshToRemove);
                        if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                        window.Scene3D.updateHandlePositions();
                    }
                }

                window.drawnStrokes.splice(i, 1);
                silindiMi = true;

                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'sil_objeyi', strokeId: s.id, index: i });
                }
            }
        }
    }

    if (silindiMi && window.redrawAllStrokes) {
        window.redrawAllStrokes();
    }
}

// --- Sï¿½LGï¿½ OLAY Dï¿½NLEYï¿½Cï¿½LERï¿½ (Artï¿½k Gï¿½vende) ---
if (canvasElm) {
    canvasElm.addEventListener('pointerdown', (e) => akilliSilgi(e, true));
    canvasElm.addEventListener('pointermove', (e) => akilliSilgi(e, false));
    canvasElm.addEventListener('touchmove', (e) => akilliSilgi(e, false), { passive: false });

    // ?? ZIRH 1: Parmak veya Fare ekrandan kalktï¿½ï¿½ï¿½ an silgi hafï¿½zasï¿½nï¿½ zorla sï¿½fï¿½rla!
    canvasElm.addEventListener('pointerup', () => {
        window.lastEraserPos = null;
    });

    // ?? ZIRH 2: Fare veya parmak kanvas alanï¿½ndan ï¿½ï¿½karsa hem hafï¿½zayï¿½ sil hem imleci kapat!
    canvasElm.addEventListener('pointerleave', () => {
        window.lastEraserPos = null;
        if (typeof eraserPreview !== 'undefined' && eraserPreview) {
            eraserPreview.style.display = 'none';
        }
    });
}


// Fare veya parmak kanvas alanï¿½ndan ï¿½ï¿½karsa silgi imlecini zorla kapat
canvas.addEventListener('pointerleave', () => {
    if (typeof eraserPreview !== 'undefined' && eraserPreview) {
        eraserPreview.style.display = 'none';
    }
});

// =========================================================================
// --- OTOMATï¿½K AKILLI YAMA VE KOPYA TEMï¿½ZLEME MOTORU ---
// =========================================================================

window.temizleLassoVeKopyalar = function () {
    if (typeof drawnStrokes !== 'undefined' && drawnStrokes.length > 0) {
        let silinenOlduMu = false;

        // Dï¿½ngï¿½yï¿½ tersten kuruyoruz ki silerken sï¿½ra kaymasï¿½n
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            let s = drawnStrokes[i];

            // Dï¿½ZELTME: isBoxCopy (Kutu veya Kement kopyasï¿½) ise Sï¿½LME!
            // Sadece maskeler (delikler) temizlensin, kopyalar ekranda silgiye kadar yaï¿½asï¿½n.
            if (s.type === 'lasso-mask' || (s.type === 'image' && s.isBackground === false && !s.isBoxCopy)) {
                drawnStrokes.splice(i, 1);
                silinenOlduMu = true;
            }
        }

        // Eer seili olan ey silinen bir eyse seimi iptal et
        if (typeof window.selectedItem !== 'undefined' && window.selectedItem && !window.selectedItem.isBoxCopy) {
            window.selectedItem = null;
        }

        // Sadece bir ey silindiyse ekran tazele
        if (silinenOlduMu && typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
};

// --- OTOMATK TETKLEYC (GZLEMC) - GNCELLENM ---
document.addEventListener('click', function (e) {
    let element = e.target.closest('button, div, a, i');
    if (element) {
        let id = (element.id || '').toLowerCase();
        let sinif = (element.className || '').toLowerCase();
        let metin = (element.innerText || '').toLowerCase();

        // KRï¿½Tï¿½K Dï¿½ZELTME: Eï¿½er tï¿½klanan buton bir "Silgi" (Eraser) ise temizliï¿½i TETï¿½KLEME!
        let isSilgi = id.includes('silgi') || metin.includes('silgi') || id.includes('eraser') || metin.includes('eraser');
        if (isSilgi) return;

        // Gerï¿½ek temizleme butonlarï¿½ (Hepsini sil, kapat, ileri-geri vb.)
        let silmeSartlari = [
            'next', 'prev', 'page', 'clear', 'close', 'kapat', 'ileri', 'geri', 'temizle'
        ];

        // "sil" kelimesini sadece "hepsini_sil" veya "temizle" gibi durumlarda kabul et
        let tamSilme = id.includes('clear-all') || id.includes('hepsini_sil') || metin.includes('hepsini sil');

        let tetikle = tamSilme || silmeSartlari.some(kelime => id.includes(kelime) || sinif.includes(kelime) || metin.includes(kelime));

        if (tetikle) {
            setTimeout(window.temizleLassoVeKopyalar, 50);
        }
    }
});


// =========================================================================
// --- CANLI SINIF (PEERJS) Aï¿½ MOTORU ---
// =========================================================================

let myPeer = null;
let myConnection = null;
let isConnected = false;
window.authorizedTeacherId = null;
window.teacherConnectionStatus = 'disconnected'; window.firstTabletConnectionAccepted = false;
window.teacherPairingToken = null;
window.teacherPairingTokenIssuedAt = 0;
window.pendingTeacherConnections = new Set();

const NETWORK_LIMITS = Object.freeze({
    maxMessageBytes: 15 * 1024 * 1024,
    maxChunkBytes: 12 * 1024,
    maxMessagesPerSecond: 240,
    maxPendingChunks: 2048,
    maxStrokePoints: 20000,
    maxStringLength: 4096
});

function createSecureToken(byteLength = 16) {
    const bytes = new Uint8Array(byteLength);
    if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
        throw new Error('Gï¿½venli rastgele sayï¿½ ï¿½reticisi desteklenmiyor.');
    }
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function createSessionSecret() {
    return createSecureToken(16);
}

function byteLengthOf(value) {
    try {
        return new TextEncoder().encode(JSON.stringify(value)).byteLength;
    } catch (error) {
        console.warn('Aï¿½ paketi boyutu hesaplanamadï¿½, paket reddedildi.', error);
        return Infinity;
    }
}

function isFiniteNumber(value, min = -Infinity, max = Infinity) {
    return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

function isSafeString(value, maxLength = NETWORK_LIMITS.maxStringLength) {
    return typeof value === 'string' && value.length <= maxLength;
}

const CRITICAL_NETWORK_COMMANDS = new Set([
    'hepsini_sil',
    'pdf_yukle',
    'resim_yukle',
    'tahta_sil_hepsi',
    'session-management'
]);

function validateStroke(stroke) {
    if (!stroke || typeof stroke !== 'object' || !isSafeString(stroke.type, 64)) return false;
    for (const key of ['x', 'y', 'width', 'height', 'cx', 'cy', 'radius']) {
        if (stroke[key] !== undefined && !isFiniteNumber(stroke[key], -100000, 100000)) return false;
    }
    if (stroke.color !== undefined && (!isSafeString(stroke.color, 32) || !/^(#[0-9a-f]{3,8}|rgba?\([\d\s,\.]+\)|[a-zA-Z]+)$/i.test(stroke.color))) return false;
    if (Array.isArray(stroke.points) && stroke.points.length > NETWORK_LIMITS.maxStrokePoints) return false;
    if (Array.isArray(stroke.path) && stroke.path.length > NETWORK_LIMITS.maxStrokePoints) return false;
    return true;
}

function validateNetworkPacket(packet) {
    if (!packet || typeof packet !== 'object' || Array.isArray(packet)) return false;
    if (!isSafeString(packet.type, 64)) return false;
    if (packet.type === 'chunk') {
        return isSafeString(packet.msgId, 128) &&
            isSafeString(packet.data, NETWORK_LIMITS.maxChunkBytes) &&
            Number.isInteger(packet.idx) && packet.idx >= 0 &&
            Number.isInteger(packet.total) && packet.total > 0 &&
            packet.total <= NETWORK_LIMITS.maxPendingChunks;
    }
    if (packet.stroke !== undefined && !validateStroke(packet.stroke)) return false;
    if (packet.strokes !== undefined && (!Array.isArray(packet.strokes) || packet.strokes.length > NETWORK_LIMITS.maxStrokePoints)) return false;
    if (packet.pdfData !== undefined && !isSafeString(packet.pdfData, NETWORK_LIMITS.maxMessageBytes)) return false;
    if (packet.sayfa !== undefined && (!Number.isInteger(packet.sayfa) || packet.sayfa < 1 || packet.sayfa > 10000)) return false;
    return true;
}

function canProcessCriticalCommand(connection, packet) {
    if (!CRITICAL_NETWORK_COMMANDS.has(packet.type)) return true;
    const isAuthorizedTeacher = !isTablet &&
        window.authorizedTeacherId &&
        connection &&
        connection.peer === window.authorizedTeacherId;
    if (!isAuthorizedTeacher) {
        console.warn('Yetkisiz kritik aï¿½ iï¿½lemi reddedildi:', packet.type, connection && connection.peer);
        return false;
    }
    return true;
}

// --- 1. Aï¿½ AYARLARI VE KOD ï¿½RETï¿½Cï¿½ ---
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let myRoomCode = '';
for (let i = 0; i < 5; i++) {
    myRoomCode += chars.charAt(Math.floor(Math.random() * chars.length));
}
const isTablet = window.location.href.includes("tablet");
const teacherTokenFromUrl = new URLSearchParams(window.location.search).get('teacherToken');
if (!isTablet) {
    window.teacherPairingToken = createSecureToken(16);
    window.teacherPairingTokenIssuedAt = Date.now();
    window.sessionPassword = Math.floor(1000 + Math.random() * 9000).toString();
} else if (teacherTokenFromUrl && window.history && typeof window.history.replaceState === 'function') {
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
}

// --- 2. PEERJS BAï¿½LANGIï¿½ VE Cï¿½HAZ MODU AYARI ---
// --- 2. PEERJS BAï¿½LANGIï¿½ (ASKERï¿½ Dï¿½ZEY YEREL Aï¿½ Kï¿½Lï¿½Dï¿½) ---

// GitHub Pages'te PeerJS varsayï¿½lan signaling servisi kullanï¿½lï¿½r.
// Sadece localhost/yerel HTTP ï¿½alï¿½ï¿½tï¿½rmasï¿½nda proje iï¿½indeki signaling sunucusuna baï¿½lanï¿½lï¿½r.
const isGitHubPages = window.location.hostname.endsWith('.github.io');
const isLocalPeerServer = !isGitHubPages &&
    (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '::1' ||
        window.location.protocol === 'http:');
const localPeerOptions = {
    host: window.location.hostname || 'localhost',
    port: 9000,
    path: '/peerjs',
    secure: false,
    config: { iceServers: [] }
};

function createPeer(id) {
    if (isLocalPeerServer) {
        return id ? new Peer(id, localPeerOptions) : new Peer(localPeerOptions);
    }
    // PeerJS'in host/port/path/ICE varsayï¿½lanlarï¿½ public signaling iï¿½in kullanï¿½lï¿½r.
    return id ? new Peer(id, { config: { iceServers: [] } }) : new Peer({ config: { iceServers: [] } });
}

function renderTeacherPairingQr(peerId) {
    const qrHost = document.getElementById('teacher-pairing-qr');
    if (!qrHost || typeof QRCode === 'undefined' || isTablet) return;
    qrHost.replaceChildren();
    const tabletUrl = new URL(window.location.href);
    tabletUrl.search = '';
    tabletUrl.hash = '';
    tabletUrl.searchParams.set('tablet', '1');
    tabletUrl.searchParams.set('room', peerId);
    tabletUrl.searchParams.set('teacherToken', window.teacherPairingToken);
    new QRCode(qrHost, {
        text: tabletUrl.toString(),
        width: 140,
        height: 140,
        correctLevel: QRCode.CorrectLevel.M
    });
}

if (isTablet) {
    myPeer = createPeer();
    myPeer.on('open', (id) => { console.log("Tablet Peer Hazï¿½r. Kimliï¿½im:", id); });
    myPeer.on('error', (err) => { alert("Tablet Baï¿½lantï¿½ Hatasï¿½: " + err); });
} else {
    myPeer = createPeer(myRoomCode);
    
    // Geï¿½ici olarak ekrana yï¿½kleniyor yazalï¿½m ki uygulamanï¿½n ï¿½ï¿½kmediï¿½ini gï¿½relim
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');
    if (idSaha) idSaha.innerText = "Baï¿½lanï¿½yor...";
    if (pinSaha) pinSaha.innerText = "...";
    if (teacherTokenSaha) teacherTokenSaha.innerText = "ï¿½retiliyor...";

    myPeer.on('open', (id) => {
        console.log("Tahta Peer Hazï¿½r. Oda Kodu:", id);
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
        if (teacherTokenSaha) teacherTokenSaha.innerText = window.teacherPairingToken;
        renderTeacherPairingQr(id);
    });
    
    myPeer.on('error', (err) => { 
        if (idSaha) idSaha.innerText = "Sunucu Hatasï¿½!"; 
        console.warn("PeerJS Arka Plan Hatasï¿½ (Gï¿½zardï¿½ edilebilir): " + err.type); 
    });
}
// --- 3. BAï¿½LANTI ï¿½STEK Dï¿½NLEYï¿½Cï¿½Sï¿½ (KAPI Zï¿½Lï¿½) ---
myPeer.on('connection', function (conn) {
    if (window.firstTabletConnectionAccepted) {
        console.warn("Ä°lk tablet baÄŸlantÄ±sÄ± zaten kabul edildi. Yeni baÄŸlantÄ± reddedildi:", conn.peer);
        setTimeout(() => conn.close(), 100);
        return;
    }
    // Eï¿½ER ZATEN AKTï¿½F Bï¿½R ï¿½ï¿½RETMEN BAï¿½LIYSA, YENï¿½ ï¿½STEKLERï¿½ EKRANA Bï¿½LE GETï¿½RMEDEN REDDET!
    if (window.authorizedTeacherId && typeof myConnection !== 'undefined' && myConnection && myConnection.open) {
        console.warn("Zaten aktif bir ï¿½ï¿½retmen cihazï¿½ baï¿½lï¿½. Yeni baï¿½lantï¿½ isteï¿½i reddedildi:", conn.peer);
        setTimeout(() => conn.close(), 100);
        return;
    }
    // ?? KRï¿½Tï¿½K Gï¿½VENLï¿½K YAMASI: ï¿½ï¿½FRE (PIN) KONTROLï¿½ ZORUNLULUï¿½U VE KABA KUVVET (BRUTE-FORCE) KORUMASI ??
    if (!window.bannedPeers) window.bannedPeers = {};
    if (!window.failedAttempts) window.failedAttempts = {};

    const peerId = conn.peer;

    // Eï¿½er IP/Cihaz engelliyse sï¿½resinin dolup dolmadï¿½ï¿½ï¿½na bak (5 dakika)
    if (window.bannedPeers[peerId]) {
        if (Date.now() - window.bannedPeers[peerId] < 5 * 60 * 1000) {
            console.warn(`?? Gï¿½venlik ï¿½hlali: ${peerId} engelli! Deneme reddedildi.`);
            setTimeout(() => conn.close(), 100);
            return;
        } else {
            delete window.bannedPeers[peerId];
            window.failedAttempts[peerId] = 0;
        }
    }

    const isTeacherCandidate = Boolean(
        conn.metadata &&
        typeof conn.metadata.teacherToken === 'string' &&
        conn.metadata.teacherToken === window.teacherPairingToken &&
        Date.now() - window.teacherPairingTokenIssuedAt <= 5 * 60 * 1000
    );

    if (isTeacherCandidate) {
        if (window.teacherConnectionStatus !== 'disconnected' ||
            window.pendingTeacherConnections.size > 0) {
            console.warn('ï¿½kinci ï¿½ï¿½retmen eï¿½leï¿½me isteï¿½i reddedildi:', peerId);
            conn.close();
            return;
        }
        window.pendingTeacherConnections.add(peerId);
        conn.isTeacherCandidate = true;
    } else if (!conn.metadata || conn.metadata.password !== window.sessionPassword) {
        console.warn("?? Gï¿½venlik ï¿½hlali: Hatalï¿½ ï¿½ifre denemesi reddedildi!", conn.peer);
        
        window.failedAttempts[peerId] = (window.failedAttempts[peerId] || 0) + 1;
        if (window.failedAttempts[peerId] >= 3) {
            window.bannedPeers[peerId] = Date.now();
            console.warn(`?? Gï¿½venlik ï¿½hlali: ${peerId} 3 hatalï¿½ deneme yaptï¿½. 5 DAKï¿½KA ENGELLENDï¿½!`);
        }

        // Karï¿½ï¿½ tarafa hemen red gï¿½nderip baï¿½lantï¿½yï¿½ kopartï¿½yoruz
        setTimeout(() => conn.close(), 500);
        return; // Modal penceresini bile gï¿½sterme (ï¿½ï¿½retmeni rahatsï¿½z etme)
    }

    // Doï¿½ru girdiyse eski hatalarï¿½ sï¿½fï¿½rla
    delete window.failedAttempts[peerId];


    console.log(isTeacherCandidate ? "ï¿½ï¿½retmen eï¿½leï¿½me isteï¿½i alï¿½ndï¿½:" : "Bir cihaz baï¿½lanmak istiyor (ï¿½ifre doï¿½rulandï¿½):", conn.peer);

    const requestModal = document.getElementById('conn-request-modal');
    const requestText = document.getElementById('request-text');
    const btnAccept = document.getElementById('btn-conn-accept');
    const btnReject = document.getElementById('btn-conn-reject');

    if (requestModal && requestText && btnAccept && btnReject) {
        requestText.innerText = isTeacherCandidate
            ? `Bir cihaz ï¿½ï¿½retmen olarak eï¿½leï¿½mek istiyor. Bu cihazï¿½ onaylï¿½yor musun?`
            : `Oda kodu "${conn.peer}" olan bir cihaz baï¿½lanmak istiyor. Onaylï¿½yor musun?`;
        requestModal.classList.remove('hidden');
        requestModal.style.display = 'flex';

        // Yaris Kosulunu (Race Condition) onlemek icin open eventini onceden dinle
        let wasOpenedEarly = false;
        conn.on('open', () => { wasOpenedEarly = true; });

        btnAccept.onclick = function () {
            try {
                myConnection = conn;
                window.authorizedTeacherId = conn.peer;
                window.teacherConnectionStatus = 'authorized';
                if (conn.isTeacherCandidate) {
                    window.pendingTeacherConnections.delete(conn.peer);
                    window.teacherPairingToken = createSecureToken(16);
                    window.teacherPairingTokenIssuedAt = Date.now();
                }

                const baglantiHazir = () => {
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    window.firstTabletConnectionAccepted = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }

                    const statusEl = document.getElementById('connection-status');
                    if (statusEl) {
                        statusEl.innerText = "BAï¿½LANDI ??";
                        statusEl.style.color = "#00ffcc";
                    }

                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                    console.log("Cihaz baï¿½arï¿½yla baï¿½landï¿½:", conn.peer);

                    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: PC baï¿½lantï¿½yï¿½ onayladï¿½ï¿½ï¿½ an, dinlemeye baï¿½lar baï¿½lamaz tabletten 
                    // "Ekran durumunu" zorla talep eder. Bï¿½ylece kayï¿½p mesajlar tamamen ï¿½nlenir!
                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function') {
                            window.sendNetworkData({ type: 'pc_hazir_durum_talep_et' });
                        }
                    }, 500);
                };

                if (conn.open || wasOpenedEarly) {
                    baglantiHazir();
                } else {
                    conn.on('open', baglantiHazir);
                }
            } catch (err) {
                console.error("Baï¿½lantï¿½ hatasï¿½:", err);
            } finally {
                requestModal.classList.add('hidden');
                requestModal.style.display = 'none';
            }
        };

        btnReject.onclick = function () {
            window.pendingTeacherConnections.delete(conn.peer);
            conn.close();
            requestModal.classList.add('hidden');
            requestModal.style.display = 'none';
        };
    }
});

// 4. Sistem sunucuya baï¿½arï¿½yla baï¿½landï¿½ï¿½ï¿½nda kodumuzu HTML panele yazdï¿½r
myPeer.on('open', function (id) {
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');

    if (!isTablet) {
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
        if (teacherTokenSaha) teacherTokenSaha.innerText = window.teacherPairingToken || 'Yok';
        renderTeacherPairingQr(id);
    } else {
        const panel = document.getElementById('network-panel');
        if (panel) {
            const kodDiv = document.getElementById('my-peer-id')?.parentElement;
            if (kodDiv) kodDiv.style.display = 'none';
        }
    }
});

// 5. TABLET ROLï¿½: Baï¿½lanma butonu (Gï¿½NCEL VERSï¿½YON)
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const roomFromUrl = new URLSearchParams(window.location.search).get('room');
            const targetCode = (roomFromUrl || document.getElementById('connect-input').value).trim();
            const passwordInput = document.getElementById('session-pass-input').value.trim();

            if (targetCode.length === 5 && (passwordInput.length > 0 || teacherTokenFromUrl)) {
                if (!myPeer || myPeer.destroyed) {
                    alert("Aï¿½ baï¿½lantï¿½sï¿½ henï¿½z kurulmadï¿½, lï¿½tfen 2 saniye bekleyip tekrar dene.");
                    return;
                }

                window.sessionPassword = passwordInput;
                document.getElementById('connection-status').innerText = "Baï¿½lanï¿½yor ?";

                // Baï¿½lantï¿½yï¿½ baï¿½lat (ï¿½ifreyi kriptografik metadata olarak gï¿½nderiyoruz)
                myConnection = myPeer.connect(targetCode, {
                    metadata: {
                        password: window.sessionPassword,
                        teacherToken: teacherTokenFromUrl || undefined
                    }
                });

                // --- BAï¿½LANTIYI GARANTï¿½LEMEK ï¿½ï¿½ï¿½N ï¿½Kï¿½Lï¿½ KONTROL ---
                // --- BAï¿½LANTIYI GARANTï¿½LEMEK ï¿½ï¿½ï¿½N ï¿½Kï¿½Lï¿½ KONTROL ---
                myConnection.on('open', () => {
                    console.log("Tablet: Connection Open tetiklendi!");
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
                    document.getElementById('connection-status').innerText = "BAï¿½LANDI ??";
                    document.getElementById('connection-status').style.color = "#00ffcc";

                    // Tablet arayï¿½zï¿½nï¿½ temizle
                    document.getElementById('connect-input').style.display = "none";
                    document.getElementById('connect-btn').style.display = "none";

                    // ?? YENï¿½: Baï¿½lantï¿½ kurulunca oda/ï¿½ifre panelini otomatik kï¿½ï¿½ï¿½lt ??
                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                });
            } else {
                alert("Lï¿½tfen 5 haneli Oda Kodunu ve Tahta ï¿½ifresini eksiksiz girin.");
            }
        });

        if (teacherTokenFromUrl) {
            const roomFromUrl = new URLSearchParams(window.location.search).get('room');
            const passwordField = document.getElementById('session-pass-input');
            if (roomFromUrl && passwordField && !passwordField.value) {
                passwordField.value = 'teacher-pairing';
                setTimeout(() => connectBtn.click(), 250);
            }
        }
    }
});



function setupConnectionEvents() {
    if (!myConnection) return;
    if (window._lastSetupConnection === myConnection) return;
    const connection = myConnection;
    window._lastSetupConnection = myConnection;
    window._connectionEventsBound = true;

    // --- 1. Gï¿½VENLï¿½K ONAYI ---
    // GitHub Pages akï¿½ï¿½ï¿½nda signaling metadata'sï¿½ public servisten geï¿½ebilir;
    // ders iï¿½eriï¿½i yalnï¿½zca kabul edilmiï¿½ P2P baï¿½lantï¿½da iï¿½lenir.
    const pc = myConnection.peerConnection;
    // =========================================================
    // EKRANLAR ARASI ORANTISAL ADAPTASYON (ï¿½ï¿½Zï¿½Nï¿½RLï¿½K SENKRONU)
    // =========================================================

    window.moveStroke = function(stroke, dx, dy) {
        if (!stroke) return;
        // ?? 3D ï¿½ekilleri dï¿½ï¿½lamï¿½yoruz, ekran kaydï¿½rï¿½lï¿½nca onlar da taï¿½ï¿½nacak!

        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x += dx; p.y += dy; });
        if (stroke.points) stroke.points.forEach(p => { p.x += dx; p.y += dy; });

        if (stroke.x !== undefined) stroke.x += dx;
        if (stroke.y !== undefined) stroke.y += dy;
        if (stroke.cx !== undefined) stroke.cx += dx;
        if (stroke.cy !== undefined) stroke.cy += dy;
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x += dx;
            if (stroke.center.y !== undefined) stroke.center.y += dy;
        }

        if (stroke.p1) { stroke.p1.x += dx; stroke.p1.y += dy; }
        if (stroke.p2) { stroke.p2.x += dx; stroke.p2.y += dy; }
        if (stroke.p3) { stroke.p3.x += dx; stroke.p3.y += dy; }

        // ?? Mï¿½hï¿½rlï¿½ Koordinatlarï¿½ da Kaydï¿½r!
        if (stroke.originalX !== undefined) stroke.originalX += dx;
        if (stroke.originalY !== undefined) stroke.originalY += dy;
    };

    window.zoomStroke = function(stroke, scale, cx, cy) {
        if (!stroke) return;
        // ?? 3D ï¿½ekilleri zoom iï¿½lemine dahil ediyoruz (engel kaldï¿½rï¿½ldï¿½)

        const mapX = (x) => cx + (x - cx) * scale;
        const mapY = (y) => cy + (y - cy) * scale;
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined && !isLineType) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined && !isLineType) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined && !isLineType) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined && !isLineType) stroke.height *= scale;
        }

        // ?? ZOOM ï¿½ï¿½ï¿½N ZIRH: Mï¿½hï¿½rlï¿½ "original" deï¿½erleri de zoomla!
        if (stroke.originalX !== undefined && stroke.originalW !== undefined && !isLineType) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined && !isLineType) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }

        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        
        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;
        if (stroke.baseWidth) stroke.baseWidth *= scale;
        
        // ?? ï¿½ï¿½ZGï¿½ KALINLIï¿½I ZIRHI: Eï¿½er bu bir ï¿½izgi aracï¿½ (segment, line, ray, polygon vs.) ise
        // bounding box'ï¿½ olmadï¿½ï¿½ï¿½ iï¿½in (x undefined'dir) yukarï¿½daki bloklarda width ï¿½lï¿½eklenmez.
        // O yï¿½zden ï¿½izgi kalï¿½nlï¿½ï¿½ï¿½nï¿½ temsil eden width deï¿½erini burada doï¿½rudan ekran oranï¿½na gï¿½re bï¿½yï¿½tï¿½yoruz.
        if (stroke.width !== undefined && stroke.x === undefined) {
            stroke.width *= scale;
        }
    };

    window.adaptStrokeToScreen = function (stroke, senderW, senderH, senderCw, senderCh, data) {
        if (!stroke || !senderW || !senderH) return stroke;

        // ?? ï¿½ï¿½Zï¿½M ADIMI 1: Tabletin gerï¿½ek ekran yï¿½ksekliï¿½ini ï¿½ekle mï¿½hï¿½rle (3D Perspektif oranï¿½nï¿½ korumak iï¿½in)
        stroke.originalSenderH = senderH;

        // ?? ï¿½ï¿½Zï¿½M: 3D ï¿½ekilleri dï¿½ï¿½lama, onlar da arka plan ve 2D ekran oranlarï¿½na gï¿½re otomatik hizalansï¿½n!
        // (3D korumasï¿½ silindi)

        const myW = window.innerWidth;
        const myH = window.innerHeight;
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : myW;
        const myCh = canvasElm ? canvasElm.height : myH;
        const senderDpr = senderCw ? (senderCw / senderW) : 1;
        const myDpr = canvasElm ? (myCw / myW) : 1;
        
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        let scale, offsetX, offsetY;
        const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;

        if (data && data.bgW > 0 && myBg && myBg.width > 0 && stroke.isBackground !== true) {
            scale = myBg.width / data.bgW;
            offsetX = myBg.x - (data.bgX * scale);
            offsetY = myBg.y - (data.bgY * scale);
      } else {
            // ?? Nï¿½HAï¿½ ï¿½ï¿½Zï¿½M: Ekranï¿½ ortalama! Sol paneli (0,0) referans al ve fiziksel boyutu KESï¿½N OLARAK KORU!
            scale = Math.min(myCw / senderCw, myCh / senderCh); offsetX = (myCw - (senderCw * scale)) / 2; offsetY = (myCh - (senderCh * scale)) / 2; 
        }
        
        // 3D ï¿½ekillerin pozisyon takibi iï¿½in bu oranï¿½ ï¿½ekle mï¿½hï¿½rlï¿½yoruz
        stroke.usedScale = scale;
        stroke.adaptedScale = scale;

        const mapX = (x) => (x * scale) + offsetX;
        const mapY = (y) => (y * scale) + offsetY;

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined) stroke.height *= scale;
        }

        // ?? 2. Aï¿½ SENKRON ZIRHI: Mï¿½hï¿½rlï¿½ "original" deï¿½erleri PC ï¿½ï¿½zï¿½nï¿½rlï¿½ï¿½ï¿½ne ï¿½evir! (Zï¿½plamayï¿½ engeller)
        if (stroke.originalX !== undefined && stroke.originalW !== undefined) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }
        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        if (stroke.lengthLabelPos) { stroke.lengthLabelPos.x = mapX(stroke.lengthLabelPos.x); stroke.lengthLabelPos.y = mapY(stroke.lengthLabelPos.y); }

        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;

        // Kalï¿½nlï¿½k hesaplamasï¿½ (ï¿½izgilerin ï¿½ok ince veya ï¿½ok kalï¿½n olmasï¿½nï¿½ engeller)
        if (stroke.width !== undefined && isLineType) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.width *= (myDpr / senderDpr);
            }
        }

        if (stroke.baseWidth !== undefined) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.baseWidth *= (myDpr / senderDpr);
            }
        }

        return stroke;
    };

    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
    isConnected = true;

    // --- 2. VERï¿½ ALICI VE PARï¿½ALAMA MOTORU (BARKOD Sï¿½STEMLï¿½) ---
    window.chunkBuffers = {}; // ?? YENï¿½: Her mesaja ï¿½zel ayrï¿½ bir kutu aï¿½ï¿½yoruz

    const packetWindow = { startedAt: Date.now(), count: 0 };
    const chunkState = new Map();

    connection.on('data', function (data) {
        const now = Date.now();
        if (now - packetWindow.startedAt >= 1000) {
            packetWindow.startedAt = now;
            packetWindow.count = 0;
        }
        packetWindow.count += 1;
        if (packetWindow.count > NETWORK_LIMITS.maxMessagesPerSecond) {
            console.warn('Aï¿½ï¿½rï¿½ hï¿½zlï¿½ aï¿½ trafiï¿½i reddedildi:', connection.peer);
            
            return;
        }
        if (byteLengthOf(data) > NETWORK_LIMITS.maxMessageBytes ||
            !validateNetworkPacket(data) ||
            !canProcessCriticalCommand(connection, data)) {
            console.warn('Geï¿½ersiz veya yetkisiz aï¿½ paketi reddedildi:', connection.peer);
            return;
        }
        if (data.type === 'chunk') {
            if (chunkState.size >= NETWORK_LIMITS.maxPendingChunks && !chunkState.has(data.msgId)) {
                console.warn('Aï¿½ parï¿½a kuyruï¿½u sï¿½nï¿½rï¿½ aï¿½ï¿½ldï¿½:', connection.peer);
                return;
            }
            const existing = chunkState.get(data.msgId);
            const state = existing || { total: data.total, parts: new Map(), createdAt: now };
            if (state.total !== data.total || data.idx >= state.total) {
                console.warn('Bozuk aï¿½ parï¿½asï¿½ reddedildi:', connection.peer);
                return;
            }
            state.parts.set(data.idx, data.data);
            chunkState.set(data.msgId, state);
            for (const [id, value] of chunkState) {
                if (now - value.createdAt > 30000) chunkState.delete(id);
            }
        }

        // ?? Nï¿½HAï¿½ VE MATEMATï¿½KSEL KESï¿½N ï¿½ï¿½Zï¿½M: CSS ve Canvas HD Uyuï¿½mazlï¿½ï¿½ï¿½nï¿½ Giderici ??
        function veriyiIsle(d) {
            if (!d) return;

            if (d.type && d.type.startsWith('katlama_')) {
                window.dispatchEvent(new CustomEvent('katlama_sistemi', { detail: d }));
                return;
            }

            // --- EKRANLAR ARASI ï¿½ï¿½Zï¿½Nï¿½RLï¿½K ADAPTASYONU ---
            const canvasElm = document.getElementById('drawing-canvas');
            const myCw = canvasElm ? canvasElm.width : window.innerWidth;
            const myCh = canvasElm ? canvasElm.height : window.innerHeight;
            const senderW = d.cw || d.cssW || window.innerWidth;
            const senderH = d.ch || d.cssH || window.innerHeight;
            
            // ?? HATA BURADAYDI: Bu iki satï¿½r aï¿½aï¿½ï¿½daydï¿½, sistemin ï¿½ï¿½kmemesi iï¿½in en ï¿½ste alï¿½ndï¿½!
            const senderDpr = d.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;

            let scale, offsetX, offsetY;
            const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
            if (d.bgW > 0 && myBg && myBg.width > 0 && d.type !== 'zoom_senkron' && d.type !== 'hepsini_tasi' && d.type !== 'sekil_guncelle') {
                scale = myBg.width / d.bgW;
                offsetX = myBg.x - (d.bgX * scale);
                offsetY = myBg.y - (d.bgY * scale);
            } else {
                // ?? Nï¿½HAï¿½ ï¿½ï¿½Zï¿½M (Canlï¿½ ï¿½izim): Ekranï¿½ ortalama! Sol panele yapï¿½ï¿½tï¿½r ve birebir aynï¿½ bï¿½yï¿½klï¿½kte tut!
                const tempSenderCw = d.cw || (senderW * senderDpr); const tempSenderCh = d.ch || (senderH * senderDpr); scale = Math.min(myCw / tempSenderCw, myCh / tempSenderCh); offsetX = (myCw - (tempSenderCw * scale)) / 2; offsetY = (myCh - (tempSenderCh * scale)) / 2;
            }

            const mapCssX = (cssX) => (((parseFloat(cssX) * senderDpr) * scale + offsetX) / myDpr) + 'px';
            const mapCssY = (cssY) => (((parseFloat(cssY) * senderDpr) * scale + offsetY) / myDpr) + 'px';
            const mapCssDim = (cssDim) => (((parseFloat(cssDim) * senderDpr) * scale) / myDpr) + 'px';
            const mapNumX = (numX) => (((numX * senderDpr) * scale + offsetX) / myDpr);
            const mapNumY = (numY) => (((numY * senderDpr) * scale + offsetY) / myDpr);
            const mapNumDim = (numDim) => (((numDim * senderDpr) * scale) / myDpr);
            const mapX = (x) => (x * scale) + offsetX;
            const mapY = (y) => (y * scale) + offsetY;

            if (d.type === 'arac_senkron' && !d.ignoreAdapt) {
                if (d.left) d.left = mapCssX(d.left);
                if (d.top) d.top = mapCssY(d.top);
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'arac_state_senkron' && d.state && !d.ignoreAdapt) {
                if (d.state.x !== undefined) d.state.x = mapNumX(d.state.x);
                if (d.state.y !== undefined) d.state.y = mapNumY(d.state.y);
                if (d.state.width !== undefined) d.state.width = mapNumDim(d.state.width);
                if (d.state.height !== undefined) d.state.height = mapNumDim(d.state.height);
                if (d.state.radius !== undefined) d.state.radius = mapNumDim(d.state.radius);
                if (d.state.pivot) {
                    d.state.pivot.x = mapNumX(d.state.pivot.x);
                    d.state.pivot.y = mapNumY(d.state.pivot.y);
                }
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'aktif_onizleme' && d.payload && !d.ignoreAdapt) {
                const isPhysical = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(d.arac);
                const p = d.payload;
                if (isPhysical) {
                    if (p.handleX !== undefined) p.handleX = mapNumDim(p.handleX);
                    if (p.handleY !== undefined) p.handleY = mapNumDim(p.handleY);
                    if (p.ldx !== undefined) p.ldx = mapNumDim(p.ldx);
                    if (p.ldy !== undefined) p.ldy = mapNumDim(p.ldy);
                    if (d.arac === 'pergel') {
                        if (p.cx !== undefined) p.cx = mapX(p.cx);
                        if (p.cy !== undefined) p.cy = mapY(p.cy);
                        if (p.px !== undefined) p.px = mapX(p.px);
                        if (p.py !== undefined) p.py = mapY(p.py);
                        if (p.radius !== undefined) p.radius *= scale;
                    }
                } else {
                    if (p.handleX !== undefined) p.handleX *= scale;
                    if (p.handleY !== undefined) p.handleY *= scale;
                    if (p.cx !== undefined) p.cx = mapX(p.cx);
                    if (p.cy !== undefined) p.cy = mapY(p.cy);
                    if (p.px !== undefined) p.px = mapX(p.px);
                    if (p.py !== undefined) p.py = mapY(p.py);
                    if (p.ldx !== undefined) p.ldx *= scale;
                    if (p.ldy !== undefined) p.ldy *= scale;
                    if (p.x !== undefined) p.x = mapX(p.x);
                    if (p.y !== undefined) p.y = mapY(p.y);
                    
                    if (p.start) { p.start.x = mapX(p.start.x); p.start.y = mapY(p.start.y); }
                    if (p.end) { p.end.x = mapX(p.end.x); p.end.y = mapY(p.end.y); }
                    if (p.radius !== undefined) p.radius *= scale;
                    
                    // ?? CANLI ï¿½ï¿½Zï¿½M ADAPTASYONU: Tablet ï¿½ï¿½zï¿½nï¿½rlï¿½ï¿½ï¿½ndeki kalem hareketlerini PC'ye oranla!
                    if (p.tool === 'pen' && p.path) {
                        for (let pt of p.path) {
                            if (pt.x !== undefined) pt.x = mapX(pt.x);
                            if (pt.y !== undefined) pt.y = mapY(pt.y);
                        }
                    }
                }
                d.ignoreAdapt = true;
            }

            // 1. ZOOM VE PDF SENKRONï¿½ZASYONU
            if (d.type === 'zoom_senkron') {
                if ((typeof pointers !== 'undefined' && pointers.size >= 2) || window.touchCount >= 2 || window.isZooming) return;

                if (window.drawnStrokes) {
                    const canvasElm = document.getElementById('drawing-canvas');
                    const myCw = canvasElm ? canvasElm.width : window.innerWidth;
                    const myCh = canvasElm ? canvasElm.height : window.innerHeight;
                    const senderW = d.cw || d.cssW || window.innerWidth;
                    const senderH = d.ch || d.cssH || window.innerHeight;
                    
                    const scale = Math.min(myCw / senderW, myCh / senderH);
                    const offsetX = (myCw - (senderW * scale)) / 2;
                    const offsetY = (myCh - (senderH * scale)) / 2;
                    const mapX = (x) => (x * scale) + offsetX;
                    const mapY = (y) => (y * scale) + offsetY;

                    const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                    
                    if (mainBg && d.width !== undefined && d.height !== undefined && d.x !== undefined && d.y !== undefined) {
                        const newW = d.width * scale;
                        const newH = d.height * scale;
                        const newX = mapX(d.x);
                        const newY = mapY(d.y);

                        const oldW = mainBg.width;
                        const oldX = mainBg.x;
                        const oldY = mainBg.y;

                        if (oldW > 0) {
                            const zoomRatio = newW / oldW;
                            const cx = oldX + oldW / 2;
                            const cy = oldY + mainBg.height / 2;

                            window.drawnStrokes.forEach(s => {
                                if (!s.isBackground && typeof window.zoomStroke === 'function') {
                                    window.zoomStroke(s, zoomRatio, cx, cy);
                                }
                            });

                            window.drawnStrokes.forEach(bg => {
                                if (bg.isBackground === true) {
                                    if (bg === mainBg) {
                                        bg.width = newW; bg.height = newH; bg.x = newX; bg.y = newY;
                                    } else {
                                        const bg_cx = bg.x + bg.width / 2;
                                        const bg_cy = bg.y + bg.height / 2;
                                        const ncx = cx + (bg_cx - cx) * zoomRatio;
                                        const ncy = cy + (bg_cy - cy) * zoomRatio;
                                        bg.width *= zoomRatio; bg.height *= zoomRatio;
                                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                                    }
                                }
                            });
                        }
                    }
                    if (window.redrawAllStrokes) window.redrawAllStrokes();
                }
                return;
            }

            if (typeof processData === 'function') processData(d);
        }

        if (data && data.type === 'chunk') {
            const id = data.msgId || 'genel';
            
            if (data.idx !== undefined && data.total !== undefined) {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = { chunks: new Array(data.total), count: 0 };
                if (window.chunkBuffers[id].chunks && !window.chunkBuffers[id].chunks[data.idx]) {
                    window.chunkBuffers[id].chunks[data.idx] = data.data;
                    window.chunkBuffers[id].count++;
                }
                if (window.chunkBuffers[id].count === data.total) {
                    const fullStr = window.chunkBuffers[id].chunks.join('');
                    if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                        try {
                            const completePacket = JSON.parse(fullStr);
                            if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                veriyiIsle(completePacket);
                            }
                        } catch (e) { console.warn('Bozuk aï¿½ paketi reddedildi.', e); }
                    }
                    delete window.chunkBuffers[id];
                }
            } else {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = "";
                if (typeof window.chunkBuffers[id] === 'string') {
                    window.chunkBuffers[id] += data.data;
                    if (data.isLast) {
                        const fullStr = window.chunkBuffers[id];
                        if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                            try {
                                const completePacket = JSON.parse(fullStr);
                                if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                    veriyiIsle(completePacket);
                                }
                            } catch (e) { console.warn('Bozuk aï¿½ paketi reddedildi.', e); }
                        }
                        delete window.chunkBuffers[id];
                    }
                }
            }
            return;
        }

        veriyiIsle(data);
    });


    function processData(data) {

        // ?? KORUMA ZIRHI: Canvas henï¿½z baï¿½latï¿½lmadï¿½ysa (ï¿½rn. 300px ise) aï¿½ï¿½ iï¿½lemeden ï¿½nce tam boyuta getir!
        const cnv = document.getElementById('drawing-canvas');
        if (cnv && cnv.width <= 300 && typeof lockScreenSize === 'function') {
            lockScreenSize();
        }

        // ?? YENï¿½ ALICI: TABLETTEN GELEN KUSURSUZ RESMï¿½ VE PDF'ï¿½ EKRANA ï¿½ï¿½ZER (MERKEZLEME GARANTï¿½Lï¿½)
        if (data.type === 'arka_plan_resmi_aktar') {
            const img = new Image();
            img.onload = () => {
                if (typeof addNewImageToCanvas === 'function') {
                    const canvas = document.getElementById('drawing-canvas');
                    let pcMerkez = null;
                    
                    // PC'de resmi ekranï¿½n tam ortasï¿½na yeniden hesapla (Saï¿½a kaymayï¿½ KESï¿½N ï¿½nler)
                    if (canvas) {
                        let startWidth = canvas.width * 0.8;
                        let sW = startWidth;
                        if (img.width < sW) sW = img.width;
                        let scaleFactor = sW / img.width;
                        let sH = img.height * scaleFactor;
                        
                        if (sH > canvas.height * 0.8) {
                            sH = canvas.height * 0.8;
                            sW = img.width * (sH / img.height);
                        }
                        pcMerkez = {
                            x: (canvas.width / 2) - (sW / 2),
                            y: (canvas.height / 2) - (sH / 2),
                            width: sW,
                            height: sH
                        };
                    }
                    
                    window.addNewImageToCanvas(img, data.isPDF, pcMerkez);
                    setTimeout(() => { if (window.redrawAllStrokes) window.redrawAllStrokes(); }, 100);
                }
            };
            img.src = data.imgData;
            return;
        } 

// ?? YENï¿½ ALICI: TABLETTEN GELEN KUSURSUZ KAYDIRMA (PAN) Sï¿½NYALï¿½Nï¿½ ï¿½ï¿½LER
        if (data.type === 'hepsini_tasi') {
            const senderDpr = data.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;
            const scale = myDpr / senderDpr; 

            const diffX = data.dx * scale;
            const diffY = data.dy * scale;

            if (window.drawnStrokes) {
                const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                if (mainBg) {
                    mainBg.x += diffX;
                    mainBg.y += diffY;
                }
                // Zemindeki ï¿½izimleri ve ï¿½ekilleri de aynï¿½ oranda kaydï¿½r
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.moveStroke === 'function') {
                        window.moveStroke(s, diffX, diffY);
                    }
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
            return;
        }

if (!data || !data.type) return;
        if (!window.drawnStrokes) window.drawnStrokes = [];

// ?? KESï¿½N ï¿½ï¿½Zï¿½M: PC hazï¿½r olduï¿½unu bildirdiï¿½inde, Tablet zaten ï¿½izim alanï¿½na geï¿½miï¿½se durumunu PC'ye zorla fï¿½rlatï¿½r!
        if (data.type === 'pc_hazir_durum_talep_et') {
            if (window.acilisPenceresiKapatildi && typeof currentLang !== 'undefined' && currentLang) {
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (firlatici) {
                    // Peï¿½ peï¿½e atï¿½ï¿½ yaparak PC'nin veri kanalï¿½nda bu mesajï¿½ kaï¿½ï¿½rmasï¿½nï¿½ engelle
                    [50, 500, 1500].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: currentLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                            firlatici({ type: 'yukleme_penceresini_kapat' });
                        }, gecikme);
                    });
                }
            }
            return;
        }

        // ?? Dï¿½L SEï¿½ï¿½Mï¿½ HER ZAMAN GEï¿½Sï¿½N VE EKRANI ZORLA Aï¿½SIN ??
        if (data.type === 'dil_secimi') {
            if (typeof setLanguage === 'function') setLanguage(data.lang);

            // PC iï¿½in tam ekran temizliï¿½i (Gï¿½rï¿½nmez CSS Balyozu!)
            const pcZirhi = document.createElement('style');
            pcZirhi.innerHTML = `
                /* PC ekranï¿½nï¿½ kilitleyen ne kadar pencere/panel varsa Kï¿½Kï¿½NDEN yok eder */
                #language-overlay, .language-overlay,
                #disclaimer-modal, .disclaimer-modal,
                #footer-container, .footer-container,
                #install-popup, .install-popup,
                #network-panel, .network-panel,
                #connect-panel, .connect-panel,
                .start-screen, #start-screen,
                .intro-container, #intro-container,
                .modal, .overlay, #conn-request-modal {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    z-index: -9999 !important;
                }
                
                #app-container {
                    display: block !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                /* ï¿½izim Alanï¿½ ve Sol/Saï¿½ Menï¿½leri KESï¿½N OLARAK ï¿½NE ï¿½IKARIR */
                #drawing-canvas, #bg-canvas {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                .left-panel, .right-panel, .panel {
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(pcZirhi);

            // HTML iï¿½inden de JavaScript ile gizleyelim (ï¿½ifte Gï¿½venlik)
            ['language-overlay', 'disclaimer-modal', 'footer-container', 'network-panel', 'connect-panel', 'start-screen'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            
            const appCont = document.getElementById('app-container');
            if (appCont) appCont.style.display = 'block';

            // PC aï¿½ panelini kï¿½ï¿½ï¿½lten/yok eden yerel fonksiyonu tetikle (Eï¿½er HTML'de varsa)
            if (typeof window.kucultPanel === 'function') {
                window.kucultPanel();
            }

            // Ekran kilitleri aï¿½ï¿½ldï¿½ktan hemen sonra canvas'ï¿½ temiz bir ï¿½ekilde yenile
            setTimeout(() => {
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                if (typeof lockScreenSize === 'function') lockScreenSize();
            }, 150);

            return;
        }


        // Gï¿½VENLï¿½K DUVARI
        if (!window.baglantiOnaylandi) return;

        // --- A) TOPLU ï¿½EKï¿½L ALICISI (ï¿½OKGENLER VE ï¿½ï¿½GENLER) ---
        if (data.type === 'akilli_sekil_toplu') {
            if (data.strokes && Array.isArray(data.strokes)) {
                data.strokes.forEach(s => {
                    if (typeof adaptStrokeToScreen === 'function') {
                        const senderCw = data.cw || data.cssW;
                        const senderCh = data.ch || data.cssH;
                        adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                    }
                    const isDuplicate = s.id && window.drawnStrokes.some(ds => ds.id === s.id);
                    if (!isDuplicate) window.drawnStrokes.push(s);
                });
            }
            if (window.redrawAllStrokes) window.redrawAllStrokes();
            return;
        }


        // --- B) TEKï¿½L ï¿½ï¿½Zï¿½M/KALEM/RESï¿½M ALICISI ---
        if (data.type === 'yeni_cizim') {
            const stroke = data.stroke;
            if (!stroke) return;

            // ?? EKRAN SENKRONï¿½ZASYONU: Gelen stroke'u Kendi Ekranï¿½mï¿½za (ï¿½ï¿½ Piksellere) ï¿½evir!
            // Eï¿½ER BUNU YAPMAZSAK, ï¿½ï¿½Zï¿½MLER FARKLI EKRANLARDA PDF ï¿½LE UYUï¿½MAZ!
            const isArr = Array.isArray(stroke);
            const strokesArr = isArr ? stroke : [stroke];
            
            strokesArr.forEach(s => {
                if (typeof adaptStrokeToScreen === 'function') {
                    const senderCw = data.cw || data.cssW;
                    const senderCh = data.ch || data.cssH;
                    adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                }
            });

            // Eï¿½er veride bir anormallik olup dizi (array) gelirse diye gï¿½venlik ï¿½nlemi
            if (isArr) {
                strokesArr.forEach(s => {
                    const isExist = s.id && window.drawnStrokes.some(ex => ex.id === s.id);
                    if (!isExist) window.drawnStrokes.push(s);
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
                return;
            }

            // Normal Tekil ï¿½izim (Kalem karalamasï¿½ vs.)
            const existingIndex = stroke.id ? window.drawnStrokes.findIndex(s => s.id === stroke.id) : -1;

            if (existingIndex !== -1) {
                window.drawnStrokes[existingIndex] = stroke;
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            } else {
                if (stroke.type === 'image' && stroke.imgData) {
                    const tempImg = new Image();
                    tempImg.src = stroke.imgData;
                    tempImg.onload = () => {
                        stroke.imgObj = tempImg;
                        window.drawnStrokes.push(stroke);
                        if (window.redrawAllStrokes) window.redrawAllStrokes();
                    };
                } else {
                    window.drawnStrokes.push(stroke);
                    if (window.redrawAllStrokes) window.redrawAllStrokes();

                    // ?? Eï¿½ER GELEN ï¿½ï¿½Zï¿½M 3D ï¿½EKï¿½LSE PC MOTORUNU TETï¿½KLE ??
                    if (stroke.type === '3d_shape' && window.Scene3D) {
                        if (!window.Scene3D.isInit) window.Scene3D.init();
                        if (window.Scene3D.container) {
                            window.Scene3D.container.style.display = 'block';
                            window.Scene3D.container.style.zIndex = '9995';
                        }
                        if (typeof window.Scene3D.addShapeFromNetwork === 'function') {
                            window.Scene3D.addShapeFromNetwork(stroke);
                        }
                    }
                }
            }
            return;
        }

        // --- C) Fï¿½Zï¿½KSEL ARAï¿½LAR VE Dï¿½ï¿½ER FONKSï¿½YONLAR ---
        if (data.type === 'arac_senkron') {
            // ?? Gï¿½VENLï¿½K YAMASI: Sadece izin verilen araï¿½lara CSS mï¿½dahalesi yapï¿½labilir
            const allowedSelectors = ['.yuzen-kopya-container'];
            if (!allowedSelectors.includes(data.selector)) {
                console.warn("?? Gï¿½venlik ï¿½hlali: ï¿½zin verilmeyen CSS mï¿½dahalesi engellendi!", data.selector);
                return;
            }

            const el = document.querySelector(data.selector);
            if (el) {
                if (data.display !== undefined) el.style.display = data.display;
                if (data.left !== undefined) el.style.left = data.left;
                if (data.top !== undefined) el.style.top = data.top;
                if (data.transform !== undefined) el.style.transform = data.transform;
                if (data.width !== undefined) el.style.width = data.width;
                if (data.height !== undefined) el.style.height = data.height;
            }
        }

        // --- BURAYA EKLENECEK TEK SATIR ---
        window.isConnected = true;

        if (data.type === 'sekil_guncelle') {
            const stroke = data.stroke;
            if (!stroke) return;
            if (typeof adaptStrokeToScreen === 'function') {
                const senderCw = data.cw || data.cssW;
                const senderCh = data.ch || data.cssH;
                const senderW = data.cssW || data.cw;
                const senderH = data.cssH || data.ch;
                adaptStrokeToScreen(stroke, senderW, senderH, senderCw, senderCh, data);
            }

            let index = -1;

            // ?? Kï¿½MLï¿½K UYUï¿½MAZLIï¿½I ï¿½ï¿½Zï¿½Mï¿½: 
            // Gelen ï¿½ekil arka plan (resim/PDF) ise, ID'ye bakmadan direkt bul!
            if (stroke.isBackground === true) {
                index = window.drawnStrokes.findIndex(s => s.isBackground === true);
            } else {
                if (!stroke.id) return;
                index = window.drawnStrokes.findIndex(s => s.id === stroke.id);
            }

            if (index !== -1) {
                const hedef = window.drawnStrokes[index];

                if (hedef.isBackground === true) {
                    // ?? ï¿½ï¿½Zï¿½M 3: Tabletin mutlak koordinatlarï¿½, PC'nin ï¿½zel merkez hizalamasï¿½nï¿½ ezmesin diye
                    // Arka plan sekil_guncelle iï¿½lemlerini KESï¿½N OLARAK YASAKLIYORUZ! 
                    // Bu iï¿½lem artï¿½k sadece ï¿½stteki 'hepsini_tasi' ile pï¿½rï¿½zsï¿½zce yapï¿½lacak.
                    return; 
                }

                hedef.x = stroke.x;
                hedef.y = stroke.y;
                hedef.width = stroke.width;
                hedef.height = stroke.height;
                if (stroke.rotation !== undefined) hedef.rotation = stroke.rotation;

                if (stroke.radius !== undefined) hedef.radius = stroke.radius;
                if (stroke.cx !== undefined) hedef.cx = stroke.cx;
                if (stroke.cy !== undefined) hedef.cy = stroke.cy;
                if (stroke.center !== undefined) hedef.center = stroke.center;

               // ?? ï¿½ï¿½Zï¿½M: Koordinatlarï¿½ aï¿½da zorla ezmeyi bï¿½raktï¿½k (Zï¿½plamayï¿½ engeller). Sadece gï¿½venli verileri al.
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.meshScale !== undefined) hedef.meshScale = stroke.meshScale;

                // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Tabletteki (Aï¿½ï¿½ / Kenar uzunluï¿½u / ï¿½ember formï¿½lï¿½) etiketlerini PC'de de Gï¿½STER!

                // ?? 3. Aï¿½ SENKRONU: PC'nin 3D dï¿½ndï¿½rme ve boyutlarï¿½ kabul etmesi iï¿½in gelen verileri kaydet!
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.originalW !== undefined) {
                    hedef.originalW = stroke.originalW;
                    hedef.originalH = stroke.originalH;
                    hedef.originalX = stroke.originalX;
                    hedef.originalY = stroke.originalY;
                }

                // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Tabletteki (Aï¿½ï¿½ / Kenar uzunluï¿½u / ï¿½ember formï¿½lï¿½) etiketlerini PC'de de Gï¿½STER!
                if (data.stroke.showEdgeLabels !== undefined) hedef.showEdgeLabels = data.stroke.showEdgeLabels;
                if (data.stroke.showAngleLabels !== undefined) hedef.showAngleLabels = data.stroke.showAngleLabels;
                if (data.stroke.showCircleInfo !== undefined) hedef.showCircleInfo = data.stroke.showCircleInfo;

                // ?? PC MOTORU: TABLETTEN GELEN Sï¿½Rï¿½KLEME VE Dï¿½NDï¿½RME Bï¿½LGï¿½Sï¿½Nï¿½ SAHNEYE UYGULA
                if (hedef.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hedef.id);
                    if (sceneMesh) {
                        
                        // ?? Nï¿½HAï¿½ ï¿½ï¿½Zï¿½M 2: Konum ve boyutlandï¿½rmayï¿½ burada YAPMIYORUZ! 
                // Zï¿½plamalarï¿½n ana sebebi buydu. ï¿½izim motoru (redrawAllStrokes) zaten onu 
                // PC'de olmasï¿½ gereken milimetrik konuma taï¿½ï¿½yor. Sadece Z eksenini koruyup bï¿½rakï¿½yoruz.
                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                    sceneMesh.position.z = data.stroke.pos3D.z;
                }

                        // Rotasyon ayarlarï¿½nï¿½ koru
                        // Rotasyon ayarlarini koru
                                                // Rotasyon ayarlarini koru (SLERP Hedefi)
                        if (data.stroke.rotationX !== undefined) {
                            if (!sceneMesh.userData.targetQuaternion) {
                                sceneMesh.userData.targetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const targetEuler = new THREE.Euler(data.stroke.rotationX, data.stroke.rotationY, data.stroke.rotationZ, 'XYZ');
                            sceneMesh.userData.targetQuaternion.setFromEuler(targetEuler);
                        }

                        if (data.stroke.x !== undefined && data.stroke.y !== undefined && window.Scene3D && window.Scene3D.camera) {
                            const normCoords = window.Scene3D.getNormalizedCoords(data.stroke.x, data.stroke.y);
                            window.Scene3D.raycaster.setFromCamera(normCoords, window.Scene3D.camera);
                            const intersection = new THREE.Vector3();
                            if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.plane, intersection)) {
                                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                                    intersection.z = data.stroke.pos3D.z;
                                }
                                if (!sceneMesh.userData.targetPosition) {
                                    sceneMesh.position.copy(intersection);
                                    sceneMesh.userData.targetPosition = intersection.clone();
                                } else {
                                    sceneMesh.userData.targetPosition.copy(intersection);
                                }
                            }
                        }

                        // Boyut (Scale) bilgisini aninda WebGL motoruna yansit (Gecikmesiz)
                        if (data.stroke.meshScale !== undefined) {
                            sceneMesh.scale.setScalar(data.stroke.meshScale);
                        }

                        // Surgu acinim bilgisini senkronize et
                        if (data.stroke.openRatio !== undefined) {
                            hedef.openRatio = data.stroke.openRatio;
                            if (sceneMesh.userData && sceneMesh.userData.strokeData) {
                                sceneMesh.userData.strokeData.openRatio = data.stroke.openRatio;
                            }
                            // Animasyon (Lerp) pruzsuz calismasi icin buradaki anlik guncellemeler Scene3D.animate icine alindi.
                        }

                        if (window.Scene3D.currentMesh === sceneMesh) window.Scene3D.updateHandlePositions();
                    }
                    
                    // ==========================================
                    // HIZ OPTIMIZASYONU (GECIKME KALDIRICI)
                    // ==========================================
                    // Eger yansitilan sekil sadece bir 3D model ise (ve uzerinde 2D yazi/etiket yoksa)
                    // koca 2D sayfa cizim motorunu (redrawAllStrokes) saniyede 60 kez calistirmaya ASLA gerek yoktur!
                    // WebGL motoru zaten (requestAnimationFrame) ile aninda kendi goruntusunu gunceller.
                    // Bu return komutu sayfa kilitlenmesini ve agdaki ping gecikmelerini SIFIRA indirir.
                    if (!hedef.showEdgeLabels && !hedef.showAngleLabels && !hedef.showCircleInfo) {
                        return; 
                    }
                }

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'sil_objeyi') {
            const zombiIndex = window.drawnStrokes.findIndex(s => s.id === data.strokeId);

            // ?? KESï¿½N ï¿½ï¿½Zï¿½M: 3D ï¿½ekil ise PC'nin uzay sahnesinden de TAMAMEN Sï¿½L!
            if (window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === data.strokeId);
                if (meshToRemove) {
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            if (zombiIndex !== -1) window.drawnStrokes.splice(zombiIndex, 1);
            else if (data.index !== undefined && window.drawnStrokes[data.index]) window.drawnStrokes.splice(data.index, 1);

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

                if (data.type === 'geri_al') {
            const popped = window.drawnStrokes.pop();
            // ?? 3D ï¿½EKï¿½LSE GERï¿½ ALIRKEN PC SAHNESï¿½NDEN DE KALDIR
            if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
                if (meshToRemove) {
                    meshToRemove.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            // YENï¿½: PC EKRANINDA DA KAT ï¿½Zï¿½ BIRAK
            if (popped && popped.isPatch === true && popped.foldLine) {
                const p1 = popped.foldLine[0];
                const p2 = popped.foldLine[1];
                const izStroke = {
                    type: 'line', 
                    points: [p1, p2],
                    color: 'rgba(0, 0, 0, 0.2)',
                    width: 1.5,
                    isDash: true, 
                    dashPattern: [6, 6],
                    isBackground: false
                };
                window.drawnStrokes.push(izStroke);
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        else if (data.type === 'sil_belirli' && data.id) {
            const index = window.drawnStrokes.findIndex(s => s.id === data.id);
            if (index !== -1) {
                window.drawnStrokes.splice(index, 1);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }
        else if (data.type === 'hepsini_sil') {
            // PC ï¿½ï¿½ï¿½N KESï¿½N ï¿½ï¿½Zï¿½M: Hafï¿½za baï¿½lantï¿½sï¿½nï¿½ koparmadan filtreleme yapï¿½yoruz!
            const korunacakZeminler = window.drawnStrokes.filter(stroke => stroke.isBackground === true);

            window.drawnStrokes.length = 0; // 1. Orijinal hafï¿½zanï¿½n iï¿½ini tamamen boï¿½alt
            window.drawnStrokes.push(...korunacakZeminler); // 2. Sadece PDF ve arka planlarï¿½ geri koy

            // ?? PC'Nï¿½N 3D UZAYINI TAMAMEN TEMï¿½ZLE ??
            if (window.Scene3D && window.Scene3D.scene) {
                const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
                toRemove.forEach(m => {
                    m.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(m);
                });
                window.Scene3D.currentMesh = null;
                if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
            }

            // PC tarafï¿½ndaki kayï¿½tlï¿½ veriyi de temizle (LocalStorage)
            if (window.localStorage) {
                window.localStorage.removeItem('drawnStrokes');
            }
            // Ekranï¿½ yenile
            if (window.redrawAllStrokes) window.redrawAllStrokes();

            console.log("PC: Silme komutu alï¿½ndï¿½. ï¿½izimler ve kopyalar uï¿½uruldu, sadece zemin korundu.");
        }

        if (data.type === 'pdf_yukle') {
            try {
                const base64Data = data.pdfData.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
                if (typeof pdfjsLib !== 'undefined') {
                    pdfjsLib.getDocument(bytes).promise.then(pdf => {
                        window.currentPDF = pdf; window.totalPDFPages = pdf.numPages; window.currentPDFPage = 1;
                        if (document.getElementById('pdf-controls')) document.getElementById('pdf-controls').classList.remove('hidden');
                        if (typeof renderPDFPage === 'function') window.renderPDFPage(1);
                    });
                }
            } catch (e) { console.error("PDF Hatasï¿½:", e); }
        }

        if (data.type === 'pdf_sayfa_degis') { window.currentPDFPage = data.sayfa; if (typeof renderPDFPage === 'function') window.renderPDFPage(window.currentPDFPage); }

        // (ï¿½kinci kopya arka_plan_resmi_aktar alï¿½cï¿½sï¿½ silindi, yukarï¿½daki ana alï¿½cï¿½ kullanï¿½lï¿½yor)

        // ?? YENï¿½ EKLENEN Bï¿½Lï¿½M: PC'Nï¿½N PDF KAPATMA EMRï¿½Nï¿½ ALDIï¿½I YER ??
        if (data.type === 'pdf_kapat') {
            // ?? Sï¿½Hï¿½RLï¿½ ï¿½ï¿½Zï¿½M: PC tarafï¿½nda da filter yerine splice kullanï¿½yoruz ??
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    const s = window.drawnStrokes[i];
                    if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                        window.drawnStrokes.splice(i, 1);
                    }
                }
            }
            window.currentPDF = null;
            window.pdfImageStroke = null;

            // Kï¿½rmï¿½zï¿½ butonu PC ekranï¿½ndan da garanti olmasï¿½ iï¿½in gizle
            const pcKapatBtn = document.getElementById('btn-close-pdf');
            if (pcKapatBtn) {
                pcKapatBtn.classList.add('hidden');
                pcKapatBtn.style.display = 'none';
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
            console.log("PC: Tablet arka planï¿½ kapattï¿½, ekran temizlendi.");
        }


        // ?? Nï¿½KLEER ï¿½ï¿½Zï¿½M: Aï¿½ILIï¿½ PENCERESï¿½Nï¿½ Kï¿½Kï¿½NDEN Sï¿½L ??
        if (data.type === 'acilis_penceresini_kapat') {
            const acilisPenceresi = document.getElementById('disclaimer-modal');
            if (acilisPenceresi) {
                // Sadece gizlemekle kalma, HTML'den tamamen kazï¿½!
                acilisPenceresi.remove();
            }

            // Eï¿½er isminde farklï¿½lï¿½k varsa diye tï¿½m uyarï¿½ pencerelerini gizle
            document.querySelectorAll('.modal, .overlay, [id*="modal"], [id*="disclaimer"]').forEach(el => {
                el.style.display = 'none';
            });

            // Zï¿½rh: PC arka planda yeniden aï¿½maya ï¿½alï¿½ï¿½masï¿½n diye CSS ile mï¿½hï¿½rle
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#disclaimer-modal, .disclaimer-modal { display: none !important; opacity: 0 !important; pointer-events: none !important; z-index: -9999 !important; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: Aï¿½ï¿½lï¿½ï¿½ penceresi Kï¿½Kï¿½NDEN silindi ve mï¿½hï¿½rlendi.");
        }


        // ?? PC: UYGULAMAYI Yï¿½KLE PENCERESï¿½Nï¿½ KAPATMA Sï¿½NYALï¿½ ??
        if (data.type === 'yukleme_penceresini_kapat') {
            const yuklemePenceresi = document.getElementById('install-popup');
            if (yuklemePenceresi) {
                yuklemePenceresi.remove(); // Sadece gizleme, HTML dosyasï¿½ndan Kï¿½Kï¿½NDEN Sï¿½L!
            }

            // Tarayï¿½cï¿½ arkadan iï¿½ ï¿½evirip geri getirmesin diye CSS Mï¿½hrï¿½ bas:
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#install-popup { display: none !important; opacity: 0 !important; z-index: -9999 !important; pointer-events: none !important; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: Yï¿½kleme penceresi yok edildi ve mï¿½hï¿½rlendi.");
        }


        if (data.type === 'arac_state_senkron') {
            let toolObj = null, el = null;
            if (data.arac === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); }
            if (data.arac === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); }
            if (data.arac === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); }
            if (data.arac === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); }

            if (toolObj) {
                if (data.state) Object.assign(toolObj.state, data.state);
                if (data.arac === 'pergel' && toolObj.state) {
                    if (toolObj.state.isDrawing) {
                        toolObj.previewCanvas.style.display = 'block';
                        toolObj.previewCanvas.width = window.innerWidth;
                        toolObj.previewCanvas.height = window.innerHeight;
                        toolObj.drawPreviewArc();
                    } else {
                        toolObj.previewCanvas.style.display = 'none';
                        if (toolObj.previewCtx) toolObj.previewCtx.clearRect(0, 0, toolObj.previewCanvas.width, toolObj.previewCanvas.height);
                    }
                }
                if (el) {
                    if (data.display === 'none') {
                        el.classList.add('hidden'); // ?? KESï¿½N OLARAK Gï¿½ZLE
                        el.style.display = 'none';
                    } else {
                        el.classList.remove('hidden'); // ?? KESï¿½N OLARAK Gï¿½STER
                        el.style.display = (data.arac === 'ruler' || data.arac === 'gonye') ? 'flex' : 'block';
                    }
                    if (data.width) el.style.width = data.width;
                    if (data.height) el.style.height = data.height;
                }
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof toolObj.updateMarkings === 'function') toolObj.updateMarkings();
                if (typeof toolObj.createLabels === 'function') toolObj.createLabels();

                // ?? KESï¿½N ï¿½ï¿½Zï¿½M: Yansï¿½ma (Titreme) Engelleme Kilidi
                toolObj.lastNetworkReceiveTime = Date.now();
            }
        }

        if (data.type === 'aktif_onizleme') {
            const arac = data.arac;
            const p = data.payload;

            if (arac === 'ruler' && window.RulerTool && window.RulerTool.drawCtx) {
                const r = window.RulerTool;
                r.drawHandleElement.style.transition = 'none'; r.drawHandleElement.style.left = `${p.handleX}px`;
                r.drawHandleLabel.innerText = `${(p.handleX / r.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                r.drawHandleLabel.style.display = 'block';
                r.drawCtx.clearRect(0, 0, r.drawCanvas.width, r.drawCanvas.height);
                r.drawCtx.beginPath(); r.drawCtx.moveTo(0, 4); r.drawCtx.lineTo(p.handleX, 4);
                r.drawCtx.strokeStyle = '#FFFFFF'; r.drawCtx.lineWidth = 3; r.drawCtx.stroke();
            }
            else if (arac === 'gonye' && window.GonyeTool && window.GonyeTool.drawCtx) {
                const g = window.GonyeTool;
                g.drawHandleElement.style.transition = 'none'; g.drawHandleElement.style.top = `${p.handleY}px`;
                g.drawHandleLabel.innerText = `${(Math.abs(g.state.height - (p.handleY + 10)) / g.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                g.drawHandleLabel.style.display = 'block';
                g.drawCtx.clearRect(0, 0, g.drawCanvas.width, g.drawCanvas.height);
                g.drawCtx.beginPath(); g.drawCtx.moveTo(4, g.state.height); g.drawCtx.lineTo(4, p.handleY + 10);
                g.drawCtx.strokeStyle = '#FFFFFF'; g.drawCtx.lineWidth = 3; g.drawCtx.stroke();
            }
            else if (arac === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.previewCtx) {
                const a = window.AciolcerTool;
                a.previewCanvas.style.display = 'block'; a.previewCanvas.width = window.innerWidth; a.previewCanvas.height = window.innerHeight;
                a.previewCtx.clearRect(0, 0, a.previewCanvas.width, a.previewCanvas.height);
                a.previewCtx.beginPath(); a.previewCtx.moveTo(p.cx, p.cy); a.previewCtx.lineTo(p.px, p.py);
                a.previewCtx.strokeStyle = '#FFFFFF'; a.previewCtx.lineWidth = 3; a.previewCtx.setLineDash([5, 5]); a.previewCtx.stroke(); a.previewCtx.setLineDash([]);
                a.drawHandleLabel.style.display = 'block'; a.drawHandleLabel.innerText = `${p.angle.toFixed(0)}`;
                a.redLine.style.transition = 'none'; a.redLine.style.transform = `rotate(${-p.angle}deg)`;
                a.drawHandle.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy + 5}px)`;
                a.drawHandleLabel.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy - 20}px)`;
            }
            else if (arac === 'lazer') {
                let lazer = document.getElementById('sanal-lazer');
                if (!lazer) {
                    lazer = document.createElement('div'); lazer.id = 'sanal-lazer';
                    lazer.style.width = '14px'; lazer.style.height = '14px'; lazer.style.background = 'rgba(0, 255, 200, 0.9)'; lazer.style.boxShadow = '0 0 12px rgba(0,255,200,1)';
                    lazer.style.borderRadius = '50%'; lazer.style.position = 'fixed'; lazer.style.pointerEvents = 'none'; lazer.style.zIndex = '9999'; lazer.style.transform = 'translate(-50%, -50%)';
                    document.body.appendChild(lazer);
                }
                lazer.style.display = 'block'; lazer.style.left = `${p.x}px`; lazer.style.top = `${p.y}px`;
                clearTimeout(window.lazerTimer); window.lazerTimer = setTimeout(() => { lazer.style.display = 'none'; }, 150);
            }
            else if (arac === 'cizim_onizleme') {
                // Sï¿½Hï¿½RLï¿½ Dï¿½ZELTME: filter yerine splice kullanarak hafï¿½za kopmasï¿½nï¿½ kï¿½kï¿½nden ï¿½ï¿½zï¿½yoruz!
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
                }

                const previewObj = { type: 'preview', isTemporaryPreview: true, payload: p, id: 'temp-preview-id' };
                window.drawnStrokes.push(previewObj);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }

            // ?? YENï¿½ EKLENEN: PC'Nï¿½N ï¿½ï¿½ZGï¿½ ï¿½Nï¿½ZLEMESï¿½Nï¿½ HAVADA ï¿½ï¿½ZMESï¿½ ??
            else if (arac === 'cizgi_onizleme') {
                if (window.redrawAllStrokes) window.redrawAllStrokes(); // Kalï¿½cï¿½ ï¿½izgileri ezmemek iï¿½in ï¿½nce ekranï¿½ tazele

                const canvas = document.getElementById('drawing-canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.save();
                    ctx.strokeStyle = p.color || '#000000';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([5, 5]); // Aynï¿½ tabletteki gibi kesikli ï¿½izgi efekti
                    ctx.beginPath();

                    const dx = p.endX - p.startX;
                    const dy = p.endY - p.startY;

                    if (dx !== 0 || dy !== 0) {
                        const devCarpan = 5000;
                        if (p.tool === 'line') {
                            ctx.moveTo(p.startX - dx * devCarpan, p.startY - dy * devCarpan);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else if (p.tool === 'ray') {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.endX, p.endY);
                        }
                    } else {
                        ctx.moveTo(p.startX, p.startY);
                        ctx.lineTo(p.endX, p.endY);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            }

        } // <--- ?? EKSï¿½K OLAN Sï¿½SLï¿½ PARANTEZ BURADA! (aktif_onizleme bloï¿½unu kapatï¿½r) ??

        if (data.type === 'onizleme_bitir') {
            // Sï¿½Hï¿½RLï¿½ Dï¿½ZELTME: filter yerine splice kullanarak hafï¿½za kopmasï¿½nï¿½ kï¿½kï¿½nden ï¿½ï¿½zï¿½yoruz!
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
            }

            if (window.RulerTool && window.RulerTool.drawCtx) { window.RulerTool.drawHandleLabel.style.display = 'none'; window.RulerTool.drawCtx.clearRect(0, 0, window.RulerTool.drawCanvas.width, window.RulerTool.drawCanvas.height); }
            if (window.GonyeTool && window.GonyeTool.drawCtx) { window.GonyeTool.drawHandleLabel.style.display = 'none'; window.GonyeTool.drawHandleElement.style.transition = 'top 0.1s ease-out'; window.GonyeTool.drawHandleElement.style.top = `${window.GonyeTool.state.height - 20}px`; window.GonyeTool.drawCtx.clearRect(0, 0, window.GonyeTool.drawCanvas.width, window.GonyeTool.drawCanvas.height); }
            if (window.AciolcerTool && window.AciolcerTool.previewCtx) { window.AciolcerTool.drawHandleLabel.style.display = 'none'; window.AciolcerTool.previewCanvas.style.display = 'none'; window.AciolcerTool.redLine.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.redLine.style.transform = 'rotate(0deg)'; window.AciolcerTool.drawHandle.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.drawHandle.style.transform = 'translateX(-50%) translate(0px, 0px)'; window.AciolcerTool.previewCtx.clearRect(0, 0, window.AciolcerTool.previewCanvas.width, window.AciolcerTool.previewCanvas.height); }
            let lazer = document.getElementById('sanal-lazer'); if (lazer) lazer.style.display = 'none';
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        if (data.type === 'secimi_senkronize_et') {
            const index = window.drawnStrokes.findIndex(s => s.id === data.strokeId);
            if (index !== -1) {
                // ?? PC'deki LOKAL deï¿½iï¿½kenleri ez ve aracï¿½ zorla 'move' yap (Butonlar gï¿½rï¿½nsï¿½n)
                selectedItem = window.drawnStrokes[index];
                window.selectedItem = selectedItem;

                if (typeof setActiveTool === 'function') setActiveTool('move');
                else currentTool = 'move';

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'secimi_kaldir') {
            selectedItem = null;
            window.selectedItem = null;
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        // ?? Sï¿½NKRONï¿½ZASYON: Fiziksel Araï¿½ Temasï¿½ (Siyah/Neon) PC'ye yansï¿½tï¿½lï¿½yor
        if (data.type === 'fiziksel_arac_temasi') {
            window.isToolThemeBlack = data.isBlackTheme;
            const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
            elements.forEach(el => {
                if (data.isBlackTheme) {
                    el.classList.add('tool-black-theme');
                } else {
                    el.classList.remove('tool-black-theme');
                }
            });
            // PC'deki butonun metnini de senkronize et
            const colorBtn = document.getElementById('btn-tool-color');
            if (colorBtn) {
                colorBtn.innerText = data.isBlackTheme ? "Araï¿½ Rengi: Neon" : "Araï¿½ Rengi: Siyah";
            }
        }
    } // <--- processData fonksiyonu TAM BURADA kusursuzca kapanï¿½r

    // --- 3. BAï¿½LANTI KOPMASI DURUMU ---
    connection.on('close', function () {
        window._connectionEventsBound = false;
        window._lastSetupConnection = null;
        if (connection.isTeacherCandidate && window.authorizedTeacherId === connection.peer) {
            window.authorizedTeacherId = null;
            window.teacherConnectionStatus = 'disconnected'; window.firstTabletConnectionAccepted = false;
            window.teacherPairingToken = isTablet ? null : createSecureToken(16);
            window.teacherPairingTokenIssuedAt = isTablet ? 0 : Date.now();
        }
        window.pendingTeacherConnections.delete(connection.peer);
        isConnected = false;
        const statusEl = document.getElementById('connection-status');
        if (statusEl) {
            statusEl.innerText = "Baï¿½lantï¿½ Koptu ??";
            statusEl.style.color = "#ff4444";
        }
        // Baï¿½lantï¿½ koptuï¿½unda sayfayï¿½ yenilemek en garantili ï¿½ï¿½zï¿½mdï¿½r:
        setTimeout(() => { location.reload(); }, 2000);
    });

    // --- Sï¿½Hï¿½RLï¿½ Eï¿½ï¿½TLEME (ï¿½Kï¿½ PENCERE ï¿½ï¿½ï¿½N ISRARCI VE ZIRHLI VERSï¿½YON) ---
    let denemeSayisi = 0;
    const pencereSyncTimer = setInterval(() => {
        if (!isConnected || !myConnection || !myConnection.open) return;

        // ?? YENï¿½ ï¿½ï¿½Zï¿½M: BAï¿½LANTI SONRADAN Bï¿½LE GELSE Dï¿½Lï¿½ VE EKRAN Kï¿½Lï¿½Dï¿½Nï¿½ SENKRONï¿½ZE ET
        if (typeof currentLang !== 'undefined' && currentLang && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'dil_secimi', lang: currentLang });
        }

        // 1. Yasal Uyarï¿½ Kontrolï¿½ ve Sinyali
        if ((window.acilisPenceresiKapatildi || (document.getElementById('disclaimer-modal') && document.getElementById('disclaimer-modal').style.display === 'none')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'acilis_penceresini_kapat' });
        }

        // ?? 2. YENï¿½: Yï¿½kle Penceresi Kontrolï¿½ ve Sinyali ??
        const tabletPopup = document.getElementById('install-popup');
        if ((!tabletPopup || tabletPopup.style.display === 'none' || tabletPopup.classList.contains('hidden')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }

        console.log("PC'ye tï¿½m pencerelerin durum eï¿½itlemesi gï¿½nderiliyor... (Deneme: " + (denemeSayisi + 1) + ")");

        denemeSayisi++;
        if (denemeSayisi >= 4) clearInterval(pencereSyncTimer); // 4 saniye boyunca tahtayï¿½ bombalar, sonra durur
    }, 1000);

} // <--- setupConnectionEvents fonksiyonu tam burada kusursuzca kapanï¿½yor

// =========================================================
// 7. Gï¿½VENLï¿½ VE KAYIPSIZ VERï¿½ FIRLATMA FONKSï¿½YONU (ZIRHLI VE BARKODLU VERSï¿½YON)
// =========================================================
window.mySessionId = Date.now().toString() + Math.random().toString();

window.sendNetworkData = function (dataPackage) {
    if (!dataPackage) return;
    if (dataPackage.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 50) return;
        window.lastPreviewTime = Date.now();
    }
    const boardLocalOnly = new Set(['arka_plan_resmi_aktar', 'pdf_yukle', 'resim_yukle']);

    // YANKI KORUMASI ï¿½ï¿½ï¿½N Kï¿½MLï¿½K DAMGASI
    dataPackage.senderId = window.mySessionId;

    // Boyutlarï¿½ damgala (PC'de doï¿½ru hizalama iï¿½in)
    const canvasElm = document.getElementById('drawing-canvas');
    if (canvasElm) {
        dataPackage.cw = canvasElm.width;
        dataPackage.ch = canvasElm.height;
        dataPackage.cssW = window.innerWidth;
        dataPackage.cssH = window.innerHeight;
        dataPackage.dpr = window.devicePixelRatio || 1;
    }

    if (window.drawnStrokes) {
        const bg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (bg) {
            dataPackage.bgX = bg.x;
            dataPackage.bgY = bg.y;
            dataPackage.bgW = bg.width;
            dataPackage.bgH = bg.height;
        }
    }

    // Gï¿½vence: ï¿½izim gï¿½nderiliyorsa ve ID'si yoksa ID ata!
    if (dataPackage.type === 'yeni_cizim' && dataPackage.stroke && !dataPackage.stroke.id) {
        dataPackage.stroke.id = Date.now() + Math.random();
    }

    

    const dataString = JSON.stringify(dataPackage);
    const CHUNK_SIZE = 8000;

    // DURUM 1: Tabletsek Tahtaya Gï¿½nder
    if (typeof isConnected !== 'undefined' && isConnected && typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        if (dataString.length <= CHUNK_SIZE) {
            myConnection.send(dataPackage);
        } else {
            let i = 0; let chunkIndex = 0;
            const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
            const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
            function paketGonder() {
                if (!myConnection || (!myConnection.open && !window.isConnected)) return;
                if (myConnection.dataChannel && myConnection.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonder, 50); return; }
                if (i < dataString.length) {
                    myConnection.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                    i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonder, 5);
                }
            }
            paketGonder();
        }
    }
    // DURUM 2: Tahtaysak Tabletlere Gï¿½nder
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        if (boardLocalOnly.has(dataPackage.type)) {
            console.info('Hassas dosya paketi ï¿½ï¿½renci cihazlarï¿½na aktarï¿½lmadï¿½:', dataPackage.type);
            return;
        }
        for (let id in window.aktifBaglantilar) {
            const conn = window.aktifBaglantilar[id];
            if (conn && conn.open) {
                if (dataString.length <= CHUNK_SIZE) {
                    conn.send(dataPackage);
                } else {
                    let i = 0; let chunkIndex = 0;
                    const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
                    const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
                    function paketGonderTahta() {
                        if (!conn || (!conn.open && !window.isConnected)) return;
                        if (conn.dataChannel && conn.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonderTahta, 50); return; }
                        if (i < dataString.length) {
                            conn.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                            i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonderTahta, 5);
                        }
                    }
                    paketGonderTahta();
                }
            }
        }
    }
};
window.networkResZirhi = true;
// ?? 1. ZIRH: EKRAN KAYDIRMA VE YAYLANMA ENGELLEYï¿½Cï¿½ ??
const palmZirhi = document.createElement('style');
palmZirhi.innerHTML = `
    body, html {
        overscroll-behavior: none !important; /* Ekranï¿½n lastik gibi yaylanmasï¿½nï¿½ bitirir */
    }
    #drawing-canvas {
        touch-action: none !important; /* Tarayï¿½cï¿½ya kaydï¿½rma yapmayï¿½ kesinlikle yasaklar */
        -webkit-user-select: none !important;
        -webkit-touch-callout: none !important;
    }
`;
document.head.appendChild(palmZirhi);

// iOS/Safari ve Android'in inatï¿½ï¿½ kaydï¿½rma (scroll) huylarï¿½nï¿½ zorla durduran motor
const cCnv = document.getElementById('drawing-canvas');
if (cCnv) {
    cCnv.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
    cCnv.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
}

// ?? AKILLI ZIRH: Avuï¿½ ï¿½ï¿½iyle Sayfa Kaymasï¿½nï¿½ Engeller, Zoom'u Bozmaz!
// ?? AKILLI ZIRH: Avu iyle Sayfa Kaymasn Engeller, Zoom'u Bozmaz!
const smartCanvas = document.getElementById('drawing-canvas');
if (smartCanvas) {
    smartCanvas.addEventListener('touchmove', function (e) {
        // Eer ekrana sadece 1 temas varsa (avu ii veya tek parmak srtnmesi)
        // sayfann lastik gibi kaymasn kesin olarak kilitler!
        if (e.touches && e.touches.length === 1 && e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
}


// =========================================================
// ?? ZEL KON AINIM MOTORU (Kusursuz Yelpaze ve Kapak Sistemi)
// =========================================================
window.CustomConeEngine = {
    create: function(radius, height, mainMat, edgeMat) {
        const innerGroup = new THREE.Group();
        innerGroup.userData.isCustomCone = true;
        innerGroup.userData.r = radius;
        innerGroup.userData.h = height;
        innerGroup.userData.s = Math.hypot(radius, height);

        const segments = 32;
        const lateralGeo = new THREE.BufferGeometry();
        const numVerts = segments + 2;
        const posArray = new Float32Array(numVerts * 3);
        lateralGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const indices = [];
        for (let i = 1; i <= segments; i++) {
            // ?? 1. ï¿½ï¿½Zï¿½M: Yï¿½zeyleri dï¿½ï¿½a ï¿½evirdik, "Alttan gï¿½rï¿½nme" illï¿½zyonu bitti!
            indices.push(0, i, i + 1);
        }
        lateralGeo.setIndex(indices);
        const lateralMesh = new THREE.Mesh(lateralGeo, mainMat);
        lateralMesh.material.side = THREE.DoubleSide;
        
        // ï¿½izgi Geometrisi
        const edgePos = new Float32Array((segments + 3) * 3);
        const lateralEdgeGeo = new THREE.BufferGeometry();
        lateralEdgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3));
        const lateralEdges = new THREE.Line(lateralEdgeGeo, edgeMat);
        
        // Taban (Kapak) Geometrisi
        const baseGeo = new THREE.CircleGeometry(radius, 32);
        baseGeo.translate(0, -radius, 0); // Kapaï¿½ï¿½n dï¿½nme menteï¿½esini tam arka noktaya alï¿½yoruz
        
        const baseMesh = new THREE.Mesh(baseGeo, mainMat);
        baseMesh.material.side = THREE.DoubleSide;
        const baseEdges = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), edgeMat);
        baseMesh.add(baseEdges);
        
        innerGroup.add(lateralMesh); innerGroup.add(baseMesh); innerGroup.add(lateralEdges);
        innerGroup.userData.lateralMesh = lateralMesh; innerGroup.userData.baseMesh = baseMesh; innerGroup.userData.lateralEdges = lateralEdges;
        
        const outerGroup = new THREE.Group();
        outerGroup.userData = innerGroup.userData;
        outerGroup.userData.innerGroup = innerGroup;
        outerGroup.add(innerGroup);
        
        this.update(outerGroup, 0); 
        return outerGroup;
    },
    
    update: function(group, ratio) {
        const innerGroup = group.userData.innerGroup || group;
        const r = innerGroup.userData.r; 
        const h = innerGroup.userData.h; 
        const s = innerGroup.userData.s; 
        const segments = 32;
        const pos = innerGroup.userData.lateralMesh.geometry.attributes.position.array;
        const epos = innerGroup.userData.lateralEdges.geometry.attributes.position.array;
        
        // ?? 2. ï¿½ï¿½Zï¿½M: Motordan "rotation" (eï¿½im) komutlarï¿½nï¿½ tamamen Sï¿½LDï¿½K. 
        // Artï¿½k koni ekranï¿½n ï¿½stï¿½ne bakarak dimdik duracak ve Yeï¿½il Taï¿½ï¿½ma Butonu kusursuz ï¿½alï¿½ï¿½acak!

        const apexX = 0; const apexY = 0; const apexZ = h / 2;
        pos[0] = apexX; pos[1] = apexY; pos[2] = apexZ;
        epos[0] = apexX; epos[1] = apexY; epos[2] = apexZ;
        
        for (let i = 0; i <= segments; i++) {
            // ?? 3. ï¿½ï¿½Zï¿½M: Yï¿½rtï¿½lma ï¿½izgisini (alpha=0) tam ï¿½N TARAFA (-Y ekseni) aldï¿½k.
            const alpha = (i / segments) * 2 * Math.PI; 
            
            // 3D Kapalï¿½ Hal (Dimdik duruyor)
            const x3 = r * Math.sin(alpha); 
            const y3 = -r * Math.cos(alpha); // Eksi y = Tam ï¿½n Taraf
            const z3 = -h / 2;
            
            // 2D Aï¿½ï¿½k Hal (Saï¿½ kanat saï¿½a, sol kanat sola dï¿½kï¿½lï¿½r)
            const theta = (2 * Math.PI * r) / s; 
            const sectorAngle = ((alpha - Math.PI) / Math.PI) * (theta / 2); 
            const x2 = -s * Math.sin(sectorAngle); 
            const y2 = 0; // Karï¿½ï¿½dan gï¿½rï¿½nmesi iï¿½in XZ dï¿½zlemine yatï¿½rï¿½lï¿½r
            const z2 = h / 2 - s * Math.cos(sectorAngle); 
            
            const x = x3 * (1 - ratio) + x2 * ratio; 
            const y = y3 * (1 - ratio) + y2 * ratio; 
            const z = z3 * (1 - ratio) + z2 * ratio;
            
            const vIdx = (i + 1) * 3; 
            pos[vIdx] = x; pos[vIdx + 1] = y; pos[vIdx + 2] = z;
            
            const eIdx = (i + 1) * 3; 
            epos[eIdx] = x; epos[eIdx + 1] = y; epos[eIdx + 2] = z;
        }
        
        // Son siyah ï¿½izgiyi tepeye kapat
        const lastIdx = (segments + 2) * 3;
        epos[lastIdx] = apexX; epos[lastIdx + 1] = apexY; epos[lastIdx + 2] = apexZ;
        
        innerGroup.userData.lateralMesh.geometry.attributes.position.needsUpdate = true;
        innerGroup.userData.lateralMesh.geometry.computeVertexNormals();
        innerGroup.userData.lateralEdges.geometry.attributes.position.needsUpdate = true;
        
        // ?? 4. ï¿½ï¿½Zï¿½M: Kapaï¿½ï¿½n (tabanï¿½n) menteï¿½e gibi arkadan aï¿½aï¿½ï¿½ doï¿½ru bir kapï¿½ misali aï¿½ï¿½lmasï¿½
        const baseMesh = innerGroup.userData.baseMesh;
        const hingeY = r * (1 - ratio);
        const hingeZ = (-h / 2) * (1 - ratio) + (h / 2 - s) * ratio;
        baseMesh.position.set(0, hingeY, hingeZ);
        baseMesh.rotation.x = (Math.PI / 2) * ratio; // 0'dan (dï¿½z) baï¿½layarak ekrana doï¿½ru sarkï¿½p tam daire olur

        // ?? 5. ï¿½ï¿½Zï¿½M: Koninin aï¿½ï¿½lï¿½rken tam karï¿½ï¿½dan (XY dï¿½zleminden) gï¿½rï¿½nmesi iï¿½in rotasyonu otomatik dï¿½zelt
        if (group.userData.innerGroup) {
            // Koninin aï¿½ï¿½k hali XZ dï¿½zlemindedir (y=0). Kameranï¿½n gï¿½rmesi iï¿½in onu kameranï¿½n (Y=-30, Z=20) aï¿½ï¿½sï¿½na tam dikmeliyiz.
            const qClosed = new THREE.Quaternion().identity(); // Kapalï¿½yken (ratio=0) kullanï¿½cï¿½nï¿½n verdiï¿½i rotasyona dokunma
            
            // XZ dï¿½zlemindeki ï¿½ekli ekrana tam paralel yatï¿½rmak iï¿½in, Z ekseni ekranï¿½n 'ï¿½st' noktasï¿½na (Y=20, Z=30) gelmeli.
            // Bunun iï¿½in gereken kusursuz aï¿½ï¿½ Math.atan2(-20, 30)'dur. (-Math.PI / 2 yani -90 derece sadece dï¿½z kamera iï¿½indi)
            const qOpenAbsolute = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.atan2(-20, 30));
            
            // Dï¿½ï¿½ grubun dinamik rotasyonunu deï¿½il, varsayï¿½lan rotasyonunu kullanï¿½yoruz. 
            // Koniler baï¿½langï¿½ï¿½ta X ve Z ekseninde -30 derece (-Math.PI/6) dï¿½ndï¿½rï¿½lerek ekleniyor.
            const defaultOuterQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 6, 0, -Math.PI / 6, 'XYZ'));
            const qOuterInverse = defaultOuterQ.invert();
            const qOpenTarget = qOuterInverse.multiply(qOpenAbsolute);
            
            innerGroup.quaternion.copy(qClosed).slerp(qOpenTarget, ratio);
        }
    }
};


window.Scene3D = {
    container: null, scene: null, camera: null, renderer: null, labelElement: null,
    isInit: false, activeTool: 'none', version: "3.4 - KUSURSUZ ï¿½ï¿½Zï¿½M",

    currentMesh: null, previewMesh: null, previewLine: null, helperGroup: null,
    raycaster: null, mouse: null, plane: null,
    rotateHandleBtn: null, resizeHandleBtn: null,
    isRotatingHandle: false, isResizingHandle: false,
    handles: { center: { x: 0, y: 0 } }, lastMousePos: { x: 0, y: 0 },
    dragPlane: null, dragOffset: null,
    isDragging: false, isClickCandidate: false, clickStartPos: { x: 0, y: 0 }, isRotatingShape: false,

    init: function () {
        if (this.isInit) return;
        if (typeof THREE === 'undefined') { setTimeout(() => { window.Scene3D.init(); }, 500); return; }
        this.isInit = true;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        this.dragPlane = new THREE.Plane();
        this.dragOffset = new THREE.Vector3();

        this.container = document.getElementById('three-container');
        this.scene = new THREE.Scene();

        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 30; // 3D sahnede gï¿½rï¿½nen alanï¿½n yaklaï¿½ï¿½k yï¿½ksekliï¿½i
        this.camera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, -frustumSize / 2, 0.1, 1000);
        this.camera.position.set(0, -30, 20);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 0, 1);

        try {
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.domElement.style.pointerEvents = 'none';

            if (this.container) {
                this.container.appendChild(this.renderer.domElement);
            }
        } catch(e) {
            console.error('WebGL Hatasi', e);
            if (isTablet) alert('Cihaziniz 3D cizimleri (WebGL) desteklemiyor!');
            return;
        }
        if (this.container) {
            // ?? Gï¿½VENLï¿½K 1: Baï¿½langï¿½ï¿½ta tahtayï¿½ zorla gï¿½rï¿½nï¿½r yap!
            this.container.style.display = 'block';
            this.container.classList.remove('hidden');
        }

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, -10, 20);
        this.scene.add(dirLight);

        this.helperGroup = new THREE.Group();
        this.scene.add(this.helperGroup);

        const styleBtn = (btn, isRotate) => {
            btn.style.position = 'absolute'; btn.style.width = '32px'; btn.style.height = '32px';
            btn.style.borderRadius = '50%'; btn.style.backgroundColor = isRotate ? '#00ffcc' : '#ff007f';
            btn.style.color = 'white'; btn.style.fontSize = '16px';
            btn.style.display = 'none'; btn.style.justifyContent = 'center'; btn.style.alignItems = 'center';
            btn.style.cursor = 'pointer'; btn.style.zIndex = '1000';
            btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            btn.innerHTML = isRotate ? '?' : '?';
        };

        if (this.rotateHandleBtn && this.rotateHandleBtn.parentNode) {
            this.rotateHandleBtn.parentNode.removeChild(this.rotateHandleBtn);
        }
        if (this.resizeHandleBtn && this.resizeHandleBtn.parentNode) {
            this.resizeHandleBtn.parentNode.removeChild(this.resizeHandleBtn);
        }
        document.querySelectorAll('.scene3d-rotate-btn, .scene3d-resize-btn').forEach(btn => btn.remove());

        this.rotateHandleBtn = document.createElement('div');
        this.rotateHandleBtn.className = 'scene3d-rotate-btn';
        styleBtn(this.rotateHandleBtn, true);
        document.body.appendChild(this.rotateHandleBtn);

        this.resizeHandleBtn = document.createElement('div');
        this.resizeHandleBtn.className = 'scene3d-resize-btn';
        styleBtn(this.resizeHandleBtn, false);
        document.body.appendChild(this.resizeHandleBtn);

        const startInteract = (action, e) => {
            if (e && e.cancelable) e.preventDefault();
            if (e) e.stopPropagation();
            this[action] = true;
            const px = e.touches ? e.touches[0].clientX : e.clientX;
            const py = e.touches ? e.touches[0].clientY : e.clientY;
            this.lastMousePos = { x: px, y: py };

            if (action === 'isResizingHandle' && this.currentMesh) {
                this.startScale = this.currentMesh.scale.x;
                this.startResizeDist = Math.hypot(px - this.handles.center.x, py - this.handles.center.y) || 1;
            }
        };

        ['mousedown', 'touchstart'].forEach(evt => {
            this.rotateHandleBtn.addEventListener(evt, (e) => startInteract('isRotatingHandle', e), { passive: false });
            this.resizeHandleBtn.addEventListener(evt, (e) => startInteract('isResizingHandle', e), { passive: false });
        });

        ['touchmove', 'mousemove', 'pointermove'].forEach(evt => {
            window.addEventListener(evt, (e) => {
                if (this.isRotatingHandle || this.isResizingHandle) {
                    if (e.cancelable) e.preventDefault();
                    const px = e.touches ? e.touches[0].clientX : e.clientX;
                    const py = e.touches ? e.touches[0].clientY : e.clientY;
                    this.onMove(px, py);
                }
            }, { passive: false });
        });

        ['touchend', 'mouseup', 'pointerup'].forEach(evt => {
            window.addEventListener(evt, () => { if (this.isRotatingHandle || this.isResizingHandle) this.onUp(); });
        });

        this.animate();
    },

    updateHandlePositions: function () {
        if (!this.currentMesh || currentTool !== 'move') {
            if (this.rotateHandleBtn) this.rotateHandleBtn.style.display = 'none';
            if (this.resizeHandleBtn) this.resizeHandleBtn.style.display = 'none';
            return;
        }
        const vec = this.currentMesh.position.clone();
        vec.project(this.camera);
        const canvasEl = document.getElementById('drawing-canvas');
        const rect = canvasEl ? canvasEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const w = rect.width / 2, h = rect.height / 2;
        const px = rect.left + (vec.x * w) + w, py = rect.top + (-(vec.y * h) + h);

        this.handles.center = { x: px, y: py };

        const scale = this.currentMesh.scale.x || 1;

        this.rotateHandleBtn.style.display = 'flex';
        this.rotateHandleBtn.style.left = (px + (30 * scale)) + 'px';
        this.rotateHandleBtn.style.top = (py - (60 * scale)) + 'px';

        this.resizeHandleBtn.style.display = 'flex';
        this.resizeHandleBtn.style.left = (px - (70 * scale)) + 'px';
        this.resizeHandleBtn.style.top = (py + (30 * scale)) + 'px';
    },

    animate: function () {
        requestAnimationFrame(() => window.Scene3D.animate());

        if (this.scene) {
            this.scene.children.forEach(mesh => {
                if (mesh.userData && mesh.userData.strokeData) {
                    // ?? KONï¿½ ï¿½ï¿½Zï¿½Mï¿½: Koni ise kendi motoruyla canlandï¿½r, deï¿½ilse diï¿½erleriyle
                    let targetRatio = mesh.userData.strokeData.openRatio || 0;
                    if (mesh.userData.currentOpenRatio === undefined) mesh.userData.currentOpenRatio = targetRatio;
                    mesh.userData.currentOpenRatio += (targetRatio - mesh.userData.currentOpenRatio) * 0.3;
                    if (Math.abs(targetRatio - mesh.userData.currentOpenRatio) < 0.001) mesh.userData.currentOpenRatio = targetRatio;

                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.currentOpenRatio);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.currentOpenRatio);
                    }
                    
                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.40); // 0.15'den 0.40'a cikarildi (Aninda tepki)
                    }
                    if (mesh.userData.targetPosition) {
                        mesh.position.lerp(mesh.userData.targetPosition, 0.45); // 0.2'den 0.45'e cikarildi (Aninda yapisma)
                    }
                }
            });
        }

        if (this.scene && this.renderer && this.camera) this.renderer.render(this.scene, this.camera);
    },

    // ?? 3D TABLET HATASI ï¿½ï¿½Zï¿½Mï¿½: Ekranï¿½n tamamï¿½ deï¿½il, ï¿½izim kutusunun gerï¿½ek sï¿½nï¿½rlarï¿½ baz alï¿½nï¿½r!
    getNormalizedCoords: function (clientX, clientY) {
        const canvasEl = document.getElementById('drawing-canvas');
        const w = canvasEl ? canvasEl.clientWidth : window.innerWidth;
        const h = canvasEl ? canvasEl.clientHeight : window.innerHeight;
        return {
            x: (clientX / w) * 2 - 1,
            y: -(clientY / h) * 2 + 1
        };
    },

    get3DPointOnFloor: function (x, y) {
        if (!this.raycaster || !this.camera) return new THREE.Vector3(0, 0, 0);
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersection = new THREE.Vector3();
        return this.raycaster.ray.intersectPlane(this.plane, intersection) ? intersection : null;
    },

    createGeometry: function (type, size) {
        const height = size * 2;
        switch (type) {
            case 'sphere': return new THREE.SphereGeometry(size, 32, 32);
            case 'prism_cube': return new THREE.BoxGeometry(size * 2, size * 2, size * 2);
            case 'prism_cylinder': return new THREE.CylinderGeometry(size, size, height, 32);
            case 'prism_3': return new THREE.CylinderGeometry(size, size, height, 3);
            case 'prism_4': return new THREE.BoxGeometry(size * 1.5, height, size * 1.5);
            case 'prism_square': return new THREE.BoxGeometry(size * 1.5, size * 3, size * 1.5);
            case 'prism_rect': return new THREE.BoxGeometry(size * 3, size * 2.2, size * 1.5);
            case 'prism_5': return new THREE.CylinderGeometry(size, size, height, 5);
            case 'prism_6': return new THREE.CylinderGeometry(size, size, height, 6);
            case 'pyramid_cone': return new THREE.ConeGeometry(size, height, 32);
            case 'pyramid_3': return new THREE.ConeGeometry(size, height, 3);
            case 'pyramid_4': return new THREE.ConeGeometry(size, height, 4);
            case 'pyramid_5': return new THREE.ConeGeometry(size, height, 5);
            case 'pyramid_6': return new THREE.ConeGeometry(size, height, 6);
            default: return new THREE.SphereGeometry(size, 32, 32);
        }
    },

    onDown: function (x, y) {
        if (!this.isInit) return false;
        if (this.container) { this.container.style.display = 'block'; this.container.classList.remove('hidden'); }
        if (this.isRotatingHandle || this.isResizingHandle) return true;

        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        let foundMesh = intersects.find(h => h.object.type === 'Mesh' && h.object !== this.helperGroup);

        // ?? Eï¿½ER BU Bï¿½R GRUPSA (Foldable3D) EN ï¿½ST GRUBU BUL
        if (foundMesh) {
            let rootObj = foundMesh.object;
            while (rootObj.parent && rootObj.parent !== this.scene && rootObj.parent.type === 'Group') {
                rootObj = rootObj.parent;
            }
            foundMesh = { object: rootObj };
        }

        // ?? TABLET DOKUNMATï¿½K ZIRHI: Parmakla basï¿½ldï¿½ï¿½ï¿½nda 3D Iï¿½ï¿½n ï¿½skalasa bile 2D Kutusundan Kesin Yakala!
        if (!foundMesh && window.drawnStrokes && currentTool === 'move') {
            const canvasEl = document.getElementById('drawing-canvas');
            if (canvasEl) {
                const rect = canvasEl.getBoundingClientRect();
                // Dï¿½ZELTME: Yï¿½ksek DPI (Retina) cihazlarda canvasX hatalï¿½ olur, CSS koordinatlarï¿½ (cssX, cssY) kullanï¿½lmalï¿½!
                const cssX = x - rect.left;
                const cssY = y - rect.top;

                const hitStroke = window.drawnStrokes.find(s => s.type === '3d_shape' && Math.abs(cssX - (s.x + s.width / 2)) < Math.max(40, s.width / 2) && Math.abs(cssY - (s.y + s.height / 2)) < Math.max(40, s.height / 2));
                if (hitStroke) {
                    const sceneMesh = this.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hitStroke.id);
                    if (sceneMesh) foundMesh = { object: sceneMesh };
                }
            }
        }

        if (foundMesh) {
            this.currentMesh = foundMesh.object;
            this.clickStartPos = { x, y };

            if (currentTool === 'move') {
                this.isRotatingShape = false;
                this.isDragging = true;
                this.dragPlane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new THREE.Vector3()), this.currentMesh.position);
                const intersectPoint = new THREE.Vector3();
                if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                    this.dragOffset.subVectors(this.currentMesh.position, intersectPoint);
                }

                // Formï¿½l kutusunun ï¿½ï¿½kmasï¿½ iï¿½in ï¿½ekli seï¿½ili hale getir
                if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                    window.selectedItem = this.currentMesh.userData.strokeData;
                    if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                }
            } else {
                this.isDragging = false; this.isRotatingShape = true; this.lastMousePos = { x, y };
            }
            this.updateHandlePositions();
            return true;
        }

        if (this.activeTool && this.activeTool !== 'none' && this.activeTool !== 'move') {
            this.isDrawing = true;
            this.startPoint = this.get3DPointOnFloor(x, y) || new THREE.Vector3(0, 0, 0);

            const previewGeo = this.createGeometry(this.activeTool, 0.1);
            if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) previewGeo.rotateX(Math.PI / 2);
            this.previewMesh = new THREE.Mesh(previewGeo, new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.5 }));
            this.previewMesh.position.copy(this.startPoint);

            this.scene.add(this.previewMesh);
            return true;
        }

        if (currentTool === 'move') {
            this.currentMesh = null;
            window.selectedItem = null;
            this.updateHandlePositions();
        }
        return false;
    },

    onMove: function (x, y) {
        if (this.isRotatingHandle && this.currentMesh) {
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
                        if (!this.currentMesh.userData.targetQuaternion) {
                this.currentMesh.userData.targetQuaternion = this.currentMesh.quaternion.clone();
            }
            const dummy = new THREE.Object3D();
            dummy.quaternion.copy(this.currentMesh.userData.targetQuaternion);
            dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);
            this.currentMesh.userData.targetQuaternion.copy(dummy.quaternion);
            
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                const euler = new THREE.Euler().setFromQuaternion(this.currentMesh.userData.targetQuaternion, 'XYZ');
                sd.rotationX = euler.x;
                sd.rotationY = euler.y;
                sd.rotationZ = euler.z;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
            }
            return;
        }
        if (this.isResizingHandle && this.currentMesh) {
            const currentDist = Math.hypot(x - this.handles.center.x, y - this.handles.center.y);
            const dragRatio = currentDist / this.startResizeDist;
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                
                // ?? Zï¿½plama Korumasï¿½: Orijinal koordinatlara (originalW vs.) ASLA dokunmadan 
                // sadece ekranlar arasï¿½ gï¿½venli bir "ï¿½arpan" (meshScale) ï¿½retiyor ve yolluyoruz!
                sd.meshScale = (sd.meshScale || 1) * dragRatio;
                this.startResizeDist = currentDist; // Katlanarak bï¿½yï¿½meyi engelle
                
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
            }
            return;
        }
        if (this.isDrawing && this.startPoint && this.previewMesh) {
            const currentPoint = this.get3DPointOnFloor(x, y);
            if (!currentPoint) return;
            const distance = currentPoint.distanceTo(this.startPoint);
            const scale = Math.max(0.1, distance * 3.5);
            this.previewMesh.scale.setScalar(scale);
            return;
        }
        if (this.isDragging && this.currentMesh) {
            this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
            const intersectPoint = new THREE.Vector3();
            if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                this.currentMesh.position.addVectors(intersectPoint, this.dragOffset);
                
                // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                this.currentMesh.position.x = Math.max(-30, Math.min(30, this.currentMesh.position.x));
                this.currentMesh.position.y = Math.max(-30, Math.min(30, this.currentMesh.position.y));
                this.currentMesh.position.z = Math.max(-30, Math.min(30, this.currentMesh.position.z));

                this.updateHandlePositions();
                // Taï¿½ï¿½ma sï¿½rasï¿½ndaki aï¿½ senkronu zaten 2D motoru tarafï¿½ndan kusursuz yapï¿½lï¿½yor. Burada hiï¿½bir ï¿½eye dokunmuyoruz!
            }
            return;
        }
        if (this.isRotatingShape && this.currentMesh && currentTool !== 'move') {
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), (x - this.lastMousePos.x) * 0.01);
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
        }
    },

    onUp: function () {
        const wasResizing = this.isResizingHandle;
        this.isRotatingHandle = this.isResizingHandle = this.isDragging = this.isRotatingShape = false;
        const wasDrawing = this.isDrawing;
        this.isDrawing = false;

        if (wasResizing && this.currentMesh && this.currentMesh.userData && this.currentMesh.userData.strokeData) {
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: this.currentMesh.userData.strokeData });
        }

        if (wasDrawing && this.previewMesh) {
            const finalScale = this.previewMesh.scale.x || 1;
            const finalRadius = 0.1 * finalScale;
            this.scene.remove(this.previewMesh); this.previewMesh.geometry.dispose(); this.previewMesh = null;

            const isSphere = this.activeTool === 'sphere';
            const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
            const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

            let solidShape = null;
            // ?? KONï¿½ ï¿½ï¿½Zï¿½Mï¿½: Koniyi ï¿½zel motorla aï¿½ ki piramide dï¿½nï¿½ï¿½mesin!
            if (this.activeTool === 'pyramid_cone' && window.CustomConeEngine) {
                solidShape = window.CustomConeEngine.create(finalRadius, finalRadius * 2, mainMaterial, edgeMaterial);
            } else if (window.Foldable3D) {
                solidShape = window.Foldable3D.createFoldableGroup(this.activeTool, finalRadius, mainMaterial, edgeMaterial);
            }
            if (!solidShape) {
                const geometry = this.createGeometry(this.activeTool, finalRadius);
                if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
                solidShape = new THREE.Mesh(geometry, mainMaterial);
                solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
            }

            // ï¿½ekli 3D uzaya tam senin bï¿½raktï¿½ï¿½ï¿½n yere yerleï¿½tir
            solidShape.position.copy(this.startPoint || new THREE.Vector3(0, 0, 0));

            // ?? ï¿½ï¿½Zï¿½M TAMAMLANDIï¿½INDA ï¿½ZOMETRï¿½K DURUï¿½: ï¿½n, ï¿½st ve Saï¿½ yï¿½zlerin gï¿½rï¿½nmesi iï¿½in
            if (this.activeTool === 'pyramid_cone' || this.activeTool.startsWith('prism_') || this.activeTool.startsWith('pyramid_')) {
                // -Math.PI/6 (-30 derece) dï¿½ndï¿½rï¿½ldï¿½ï¿½ï¿½nde ï¿½n yï¿½z daha geniï¿½, Saï¿½ yï¿½z dar gï¿½rï¿½nï¿½r (Klasik 3D gï¿½rï¿½nï¿½m)
                solidShape.rotation.z = -Math.PI / 6;
                // Koni iï¿½in kameraya tam dik bakmamasï¿½ adï¿½na X ekseninde de eï¿½im veriyoruz ki taban elips gï¿½rï¿½nsï¿½n
                solidShape.rotation.x = -Math.PI / 6;
            }

            this.scene.add(solidShape);
            this.currentMesh = solidShape;
            this.updateHandlePositions();

            // ?? Sï¿½Hï¿½RLï¿½ DOKUNUï¿½: 3D ï¿½eklin 2D ï¿½izim Noktasï¿½nï¿½ Tam ï¿½sabet Hesapla! (Ortaya kaï¿½maz)
            const vec = solidShape.position.clone();
            vec.project(this.camera);
            const canvasEl = document.getElementById('drawing-canvas');
            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
            const screenX = (vec.x * w) + w;
            const screenY = -(vec.y * h) + h;

            // ?? 1. KUSURSUZ BOYUT: Gerï¿½ek HD Piksel karï¿½ï¿½lï¿½ï¿½ï¿½nï¿½ hesapla (Kï¿½ï¿½ï¿½lmeyi ve kaymayï¿½ ï¿½nler)
            const myCh = canvasEl ? canvasEl.height : window.innerHeight;
            const pixelPerUnit = myCh / 30; // 3D uzaydaki 1 birimin piksel karï¿½ï¿½lï¿½ï¿½ï¿½
            const gercekPx = (finalRadius * 2) * pixelPerUnit;

            const networkData = {
                type: '3d_shape', id: Date.now().toString() + Math.random(), shapeType: this.activeTool,
                x: screenX - (gercekPx / 2),
                y: screenY - (gercekPx / 2),
                width: gercekPx, height: gercekPx,
                // Sï¿½rgï¿½ ï¿½ekilse bile asla zï¿½plamasï¿½n ve PC'ye mï¿½kemmel gitsin diye ZIRH:
                originalX: screenX - (gercekPx / 2),
                originalY: screenY - (gercekPx / 2),
                originalW: gercekPx,
                originalH: gercekPx,
                rotationX: solidShape.rotation.x, rotationY: solidShape.rotation.y, rotationZ: solidShape.rotation.z,
                pos3D: { x: solidShape.position.x, y: solidShape.position.y, z: solidShape.position.z },
                rotation: 0, yaw: 0, pitch: 1, openRatio: 0, isPreview: false, color: '#00ffcc'
            };
            Object.assign(solidShape.userData, { type: this.activeTool, baseSize: finalRadius, height: finalRadius * 2, strokeData: networkData });

            if (window.drawnStrokes) window.drawnStrokes.push(networkData);
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'yeni_cizim', stroke: networkData });
        }
    },

    setTool: function (toolName) {
        if (!this.isInit) this.init();
        this.activeTool = toolName;
        // ?? Gï¿½VENLï¿½K 4: Araï¿½ seï¿½ildiï¿½inde de konteynerï¿½ zorla gï¿½ster! (Senin notun)
        if (this.container) {
            this.container.style.display = 'block';
            this.container.classList.remove('hidden');
        }
    },

    deleteObjectAt: function (x, y) {
        if (!this.isInit || !this.scene) return false;
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        const hit = intersects.find(h => {
            const obj = h.object;
            let isHelper = false; let parent = obj.parent;
            while (parent) { if (parent === this.helperGroup) { isHelper = true; break; } parent = parent.parent; }
            return !isHelper && (obj.type === 'Mesh' || obj.type === 'Line' || obj.type === 'LineSegments');
        });
        if (hit) {
            let targetObj = hit.object;
            while (targetObj.parent && targetObj.parent !== this.scene) { targetObj = targetObj.parent; }
            if (this.scene.children.includes(targetObj)) {
                if (targetObj.userData && targetObj.userData.strokeData) {
                    if (window.drawnStrokes) {
                        window.drawnStrokes = window.drawnStrokes.filter(s => s.id !== targetObj.userData.strokeData.id);
                    }
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({ type: 'cizim_sil', strokeId: targetObj.userData.strokeData.id });
                    }
                }
                // SENï¿½N EKLENTï¿½N: Etiketi silme iï¿½lemi KORUNDU
                if (targetObj.userData.labelElement) targetObj.userData.labelElement.remove();
                this.scene.remove(targetObj);
                if (this.currentMesh === targetObj) this.currentMesh = null;
                this.updateHandlePositions();
                return true;
            }
        }
        return false;
    },

    handleEraser: function (pos) {
        if (this.deleteObjectAt(pos.x, pos.y)) {
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    },

    addShapeToScene: function (type, x, y) {
        if (!this.isInit) this.init();
        this.createSolidMesh(type, new THREE.Vector3(0, 0, 0), 2, true);
        console.log(type + " sahneye baï¿½arï¿½yla ï¿½aï¿½rï¿½ldï¿½!");
    },

    // ?? KESï¿½N ï¿½ï¿½Zï¿½M: PC'nin 3D ï¿½ekilleri Tabletinden Alï¿½p ï¿½izmesi ï¿½ï¿½in Aï¿½ Alï¿½cï¿½sï¿½
    addShapeFromNetwork: function (strokeData) {
        if (!this.isInit) this.init();
        const isSphere = strokeData.shapeType === 'sphere';
        const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

        let solidShape = null;
        // ?? KONï¿½ ï¿½ï¿½Zï¿½Mï¿½: Aï¿½dan gelen koniyi de ï¿½zel motorla ï¿½iz!
        if (strokeData.shapeType === 'pyramid_cone' && window.CustomConeEngine) {
            solidShape = window.CustomConeEngine.create(strokeData.width / 30, (strokeData.width / 30) * 2, mainMaterial, edgeMaterial);
        } else if (window.Foldable3D) {
            solidShape = window.Foldable3D.createFoldableGroup(strokeData.shapeType, strokeData.width / 30, mainMaterial, edgeMaterial);
        }
        if (!solidShape) {
            const geometry = this.createGeometry(strokeData.shapeType, strokeData.width / 30);
            if (strokeData.shapeType.startsWith('prism') || strokeData.shapeType.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
            solidShape = new THREE.Mesh(geometry, mainMaterial);
            solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
        }

        // ?? ï¿½ï¿½Zï¿½M 1: 3D ï¿½eklin yaratï¿½lï¿½ï¿½ï¿½nda PC ekranï¿½na mï¿½kemmel hizalanmasï¿½
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : window.innerWidth;
        const myCh = canvasElm ? canvasElm.height : window.innerHeight;
        
        const cx = strokeData.x + (strokeData.width / 2);
        const cy = strokeData.y + (strokeData.height / 2);
        
        const ndcX = (cx / myCw) * 2 - 1;
        const ndcY = -(cy / myCh) * 2 + 1;
        
        const vec = new THREE.Vector3(ndcX, ndcY, 0);
        vec.unproject(this.camera);
        solidShape.position.x = vec.x;
        solidShape.position.y = vec.y;
        solidShape.position.z = (strokeData.pos3D && strokeData.pos3D.z !== undefined) ? strokeData.pos3D.z : 0;

        // ?? Nï¿½HAï¿½ ï¿½ï¿½Zï¿½M 1: ï¿½lk yaratï¿½lï¿½ï¿½ta ï¿½lï¿½eï¿½i 1'de sabit bï¿½rakï¿½yoruz. 
        // Gerï¿½ek bï¿½yï¿½klï¿½k redrawAllStrokes iï¿½inde hesaplanacak.
        solidShape.scale.setScalar(1);
        solidShape.userData.baseTabletWidth = strokeData.width;

        if (strokeData.rotationX !== undefined) solidShape.rotation.x = strokeData.rotationX;
        if (strokeData.rotationY !== undefined) solidShape.rotation.y = strokeData.rotationY;
        Object.assign(solidShape.userData, { type: strokeData.shapeType, baseSize: strokeData.width / 30, height: (strokeData.width / 30) * 2, strokeData: strokeData });
        this.scene.add(solidShape);
        if (typeof this.updateHandlePositions === 'function') this.updateHandlePositions();
    }
}; // --- GERï¿½EK 3D UZAY MOTORU (Scene3D) BURADA Bï¿½Tï¿½YOR ---


// ==========================================
// 4. ARAYï¿½Z VE MENï¿½ MOTORU (ï¿½zellik Kaybï¿½ Yok)
// ==========================================
window.addEventListener('load', () => {
    const polyBtn = document.getElementById('btn-cokgenler');
    if (polyBtn && !document.getElementById('btn-3d-menu')) {
        const btn3D = document.createElement('button'); btn3D.id = 'btn-3d-menu'; btn3D.className = 'tool-button'; btn3D.innerHTML = '3D Cisimler';
        polyBtn.parentNode.insertBefore(btn3D, polyBtn.nextSibling);

        const menu3D = document.createElement('div'); menu3D.id = 'options-3d-main'; menu3D.className = 'tool-options hidden';
        menu3D.style.cssText = `position: absolute; left: 100%; margin-left: 10px; z-index: 20; background-color: rgba(30, 30, 46, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menu3D.innerHTML = `<button class="tool-button-sub" data-3d="3d_kure">Kï¿½re</button><button class="tool-button-sub has-submenu" id="btn-prizmalar">Prizmalar ??</button><button class="tool-button-sub has-submenu" id="btn-piramitler">Piramitler ??</button>`;
        btn3D.parentNode.insertBefore(menu3D, btn3D.nextSibling);


        const menuPrizmalar = document.createElement('div'); menuPrizmalar.id = 'options-prizmalar'; menuPrizmalar.className = 'tool-options hidden';
        menuPrizmalar.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 0; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPrizmalar.innerHTML = `<button class="tool-button-sub" data-3d="3d_kup">Kï¿½p</button><button class="tool-button-sub" data-3d="3d_kare_prizma">Kare Prizma</button><button class="tool-button-sub" data-3d="3d_dikdortgen_prizma">Dikdï¿½rtgen Prizma</button><button class="tool-button-sub" data-3d="3d_ucgen_prizma">ï¿½ï¿½gen Prizma</button><button class="tool-button-sub" data-3d="3d_besgen_prizma">Beï¿½gen Prizma</button><button class="tool-button-sub" data-3d="3d_altigen_prizma">Altï¿½gen Prizma</button><button class="tool-button-sub" data-3d="3d_silindir">Silindir</button>`;
        menu3D.appendChild(menuPrizmalar);

        const menuPiramitler = document.createElement('div'); menuPiramitler.id = 'options-piramitler'; menuPiramitler.className = 'tool-options hidden';
        menuPiramitler.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 40px; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPiramitler.innerHTML = `<button class="tool-button-sub" data-3d="3d_koni">Koni</button><button class="tool-button-sub" data-3d="3d_ucgen_piramit">ï¿½ï¿½gen Piramit</button><button class="tool-button-sub" data-3d="3d_kare_piramit">Kare Piramit</button><button class="tool-button-sub" data-3d="3d_besgen_piramit">Beï¿½gen Piramit</button><button class="tool-button-sub" data-3d="3d_altigen_piramit">Altï¿½gen Piramit</button>`;
        menu3D.appendChild(menuPiramitler);

        btn3D.addEventListener('click', (e) => {
            e.stopPropagation(); document.querySelectorAll('.tool-options').forEach(m => { if (m !== menu3D && m !== menuPrizmalar && m !== menuPiramitler) { m.classList.add('hidden'); m.style.display = 'none'; } });
            if (menu3D.classList.contains('hidden')) {
                menu3D.classList.remove('hidden'); menu3D.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; menu3D.style.top = (btn3D.getBoundingClientRect().top - btn3D.parentElement.getBoundingClientRect().top) + 'px'; btn3D.classList.add('active');
            } else { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; btn3D.classList.remove('active'); }
        });

        document.getElementById('btn-prizmalar').addEventListener('mouseenter', () => { menuPrizmalar.classList.remove('hidden'); menuPrizmalar.style.display = 'flex'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; });
        document.getElementById('btn-piramitler').addEventListener('mouseenter', () => { menuPiramitler.classList.remove('hidden'); menuPiramitler.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; });

        document.querySelectorAll('#options-3d-main button[data-3d]').forEach(b => {
            b.addEventListener('click', (e) => {
                e.stopPropagation();
                const data3d = b.getAttribute('data-3d');

                if (typeof setActiveTool === 'function') setActiveTool('none');

                window.active3DShapeTool = 'draw_' + data3d;
                const btn3D = document.getElementById('btn-3d-menu');
                if (btn3D) btn3D.classList.add('active');
                const menu3D = document.getElementById('options-3d-main');
                if (menu3D) { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; }

                // 3D Motorunu Uyandï¿½r ve Aracï¿½ Ver
                if (window.Scene3D) {
                    if (!window.Scene3D.isInit) window.Scene3D.init();
                    if (window.Scene3D.container) {
                        window.Scene3D.container.style.display = 'block';
                        window.Scene3D.container.style.zIndex = '9995';
                    }
                    let toolName = 'sphere';
                    if (data3d.includes('kure')) toolName = 'sphere';
                    else if (data3d.includes('kup')) toolName = 'prism_cube';
                    else if (data3d.includes('silindir')) toolName = 'prism_cylinder';
                    else if (data3d.includes('koni')) toolName = 'pyramid_cone';
                    else if (data3d.includes('kare_prizma')) toolName = 'prism_square';
                    else if (data3d.includes('dikdortgen_prizma')) toolName = 'prism_rect';
                    else if (data3d.includes('ucgen_prizma')) toolName = 'prism_3';
                    else if (data3d.includes('besgen_prizma')) toolName = 'prism_5';
                    else if (data3d.includes('altigen_prizma')) toolName = 'prism_6';
                    else if (data3d.includes('ucgen_piramit')) toolName = 'pyramid_3';
                    else if (data3d.includes('kare_piramit')) toolName = 'pyramid_4';
                    else if (data3d.includes('besgen_piramit')) toolName = 'pyramid_5';
                    else if (data3d.includes('altigen_piramit')) toolName = 'pyramid_6';
                    else toolName = 'prism_rect';

                    currentTool = 'draw_3d_' + toolName;
                    window.Scene3D.setTool(toolName);
                }
            });
        });
    }

    const uiMotor = () => {
        const slider = document.getElementById('slider-container');
        const info = document.getElementById('info-tooltip');

        let activeShape = null;
        // ï¿½ekil "Taï¿½ï¿½" modunda seï¿½iliyken algï¿½la
        if (window.currentTool === 'move' && window.selectedItem && window.selectedItem.type === '3d_shape') {
            activeShape = window.selectedItem;
        } else if (!window.currentTool || window.currentTool === 'none' || window.currentTool.startsWith('draw_3d_')) {
            // "none" durumunda veya 3D ï¿½izim aracï¿½ndayken son ï¿½izilen 3D ï¿½ekli otomatik sï¿½rgï¿½ye baï¿½la
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === '3d_shape') {
                        activeShape = window.drawnStrokes[i];
                        break;
                    }
                }
            }
        }

        if (activeShape) {
            window.active3DSliderStroke = activeShape;
            if (slider) {
                if (activeShape.shapeType === 'sphere') slider.style.display = 'none';
                else slider.style.display = 'flex';
            }
            if (info) {
                let isSelectedMove = (currentTool === 'move' && window.selectedItem === activeShape);
                if (isSelectedMove) {
                    info.style.display = 'block';
                } else {
                    info.style.display = 'none';
                }

                // ?? Pï¿½=3 ALINARAK ALAN/HACï¿½M HESAPLAYAN ï¿½ZEL FORMï¿½L MOTORU
                let formulMetni = "";
                let currentScale = activeShape.meshScale || 1;
                const r = ((activeShape.width * currentScale) / 30).toFixed(1);
                const h = (r * 2).toFixed(1);

                let r_val = parseFloat(r);
                let h_val = parseFloat(h);

                // Formï¿½ller HTML destekli renkli ve kalï¿½n yazï¿½larla ï¿½ekillendiriliyor
                if (activeShape.shapeType === 'sphere') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Kï¿½re</span><br>r = ${r} cm<br><span style="color:#ff00ff">Hacim = (4/3)ï¿½?ï¿½rï¿½</span><br>= (4/3)ï¿½3ï¿½(${r})ï¿½ = <b>${(4 * r_val * r_val * r_val).toFixed(1)} cmï¿½</b><br><span style="color:#ff00ff">Alan = 4ï¿½?ï¿½rï¿½</span><br>= 4ï¿½3ï¿½(${r})ï¿½ = <b>${(12 * r_val * r_val).toFixed(1)} cmï¿½</b>`;
                } else if (activeShape.shapeType === 'prism_cube') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Kï¿½p</span><br>a = ${r} cm<br><span style="color:#ff00ff">Hacim = aï¿½</span><br>= (${r})ï¿½ = <b>${(r_val * r_val * r_val).toFixed(1)} cmï¿½</b><br><span style="color:#ff00ff">Alan = 6ï¿½aï¿½</span><br>= 6ï¿½(${r})ï¿½ = <b>${(6 * r_val * r_val).toFixed(1)} cmï¿½</b>`;
                } else if (activeShape.shapeType === 'prism_cylinder') {
                    let tabanAlani = 3 * r_val * r_val;
                    let yanalAlan = 2 * 3 * r_val * h_val;
                    let toplamAlan = 2 * tabanAlani + yanalAlan;
                    let hacim = tabanAlani * h_val;
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Silindir</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Taban Alanï¿½ = ?ï¿½rï¿½</span><br>= 3ï¿½(${r})ï¿½ = <b>${tabanAlani.toFixed(1)} cmï¿½</b><br><span style="color:#ff00ff">Yanal Alan = 2ï¿½?ï¿½rï¿½h</span><br>= 2ï¿½3ï¿½${r}ï¿½${h} = <b>${yanalAlan.toFixed(1)} cmï¿½</b><br><span style="color:#ff00ff">Toplam Alan = 2ï¿½(Taban Alanï¿½) + Yanal Alan</span><br>= 2ï¿½${tabanAlani.toFixed(1)} + ${yanalAlan.toFixed(1)} = <b>${toplamAlan.toFixed(1)} cmï¿½</b><br><span style="color:#ff00ff">Hacim = ?ï¿½rï¿½ï¿½h</span><br>= 3ï¿½(${r})ï¿½ï¿½${h} = <b>${hacim.toFixed(1)} cmï¿½</b>`;
                } else if (activeShape.shapeType === 'pyramid_cone') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Koni</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = (?ï¿½rï¿½ï¿½h)/3</span><br>= (3ï¿½(${r})ï¿½ï¿½${h})/3 = <b>${(r_val * r_val * h_val).toFixed(1)} cmï¿½</b>`;
                } else if (activeShape.shapeType === 'prism_rect') {
                    let a = (r_val * 1.5).toFixed(1);
                    let b = r;
                    let taban = (a * b).toFixed(1);
                    let yanal = (2 * (parseFloat(a) + parseFloat(b)) * h_val).toFixed(1);
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Dikdï¿½rtgenler Prizmasï¿½</span><br>a = ${a} cm, b = ${b} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = aï¿½bï¿½h</span><br>= ${a}ï¿½${b}ï¿½${h} = <b>${(taban * h_val).toFixed(1)} cmï¿½</b><br><span style="color:#ff00ff">Alan = 2ï¿½(aï¿½b) + Yanal Alan</span><br>= 2ï¿½${taban} + ${yanal} = <b>${(2 * taban + parseFloat(yanal)).toFixed(1)} cmï¿½</b>`;
                } else if (activeShape.shapeType.startsWith('prism_') || activeShape.shapeType.startsWith('pyramid_')) {
                    let isPrism = activeShape.shapeType.startsWith('prism_');
                    let sides = parseInt(activeShape.shapeType.split('_')[1]);

                    let a_val = (2 * r_val * Math.sin(Math.PI / sides)).toFixed(1); // Kenar uzunluï¿½u
                    let apothem = (r_val * Math.cos(Math.PI / sides)).toFixed(1); // Merkeze uzaklï¿½k
                    let tabanAlani = (sides * a_val * apothem / 2).toFixed(1);
                    let cevre = (sides * a_val).toFixed(1);

                    let sekilAdi = sides === 3 ? "ï¿½ï¿½gen" : sides === 5 ? "Beï¿½gen" : sides === 6 ? "Altï¿½gen" : sides + "gen";
                    let anaBaslik = isPrism ? `${sekilAdi} Prizma` : `${sekilAdi} Piramit`;

                    let sonucHacim = isPrism ? (tabanAlani * h_val).toFixed(1) : (tabanAlani * h_val / 3).toFixed(1);
                    let hacimFormulStr = isPrism ? "Taban Alanï¿½ ï¿½ h" : "(Taban Alanï¿½ ï¿½ h) / 3";
                    let hacimDegerStr = isPrism ? `${tabanAlani} ï¿½ ${h}` : `(${tabanAlani} ï¿½ ${h}) / 3`;

                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">${anaBaslik}</span><br>Taban Ayrï¿½tï¿½ (a) ? ${a_val} cm, Yï¿½kseklik (h) ? ${h} cm<br><span style="color:#ff00ff">Taban Alanï¿½ ? ${tabanAlani} cmï¿½</span><br><span style="color:#ff00ff">Hacim = ${hacimFormulStr}</span><br>= ${hacimDegerStr} = <b>${sonucHacim} cmï¿½</b>`;

                    if (isPrism) {
                        let yanalAlan = (cevre * h_val).toFixed(1);
                        formulMetni += `<br><span style="color:#ff00ff">Yanal Alan = ï¿½evre ï¿½ h</span><br>= ${cevre} ï¿½ ${h} = <b>${yanalAlan} cmï¿½</b>`;
                    }
                }

                info.innerHTML = formulMetni;

                // ï¿½eklin saï¿½ï¿½nda pozisyonlama
                const marginX = 20;
                let posX = activeShape.x + activeShape.width + marginX;
                let posY = activeShape.y;

                // Ekranï¿½n saï¿½ï¿½na taï¿½ï¿½yorsa sola al
                if (posX + 250 > window.innerWidth) {
                    posX = activeShape.x - 250 - marginX;
                }

                info.style.left = posX + "px";
                info.style.top = posY + "px";
                info.style.bottom = "auto";
                info.style.transform = "none";
                // Panel tasarï¿½mï¿½ artï¿½k tamamen style.css dosyasï¿½ndaki #info-tooltip id'si ile yï¿½netiliyor.
            }
            const sInput = document.getElementById('shape-slider');
            if (sInput && document.activeElement !== sInput) sInput.value = (activeShape.openRatio || 0) * 100;
        } else {
            if (slider) slider.style.display = 'none';
            if (info) info.style.display = 'none';
            window.active3DSliderStroke = null;
        }

        if (activeShape !== window._lastActive3DShape) {
            window._lastActive3DShape = activeShape;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
        requestAnimationFrame(uiMotor);
    };

    // YUKARIDAKï¿½ EKSï¿½K OLAN KAPANIï¿½ PARANTEZLERï¿½ BURADA!
    requestAnimationFrame(uiMotor);
});

// Aï¿½ILIï¿½TA ï¿½ï¿½ZGï¿½ MENï¿½Sï¿½Nï¿½ ZORLA KAPAT

// Aï¿½ILIï¿½TA ï¿½ï¿½ZGï¿½ MENï¿½Sï¿½Nï¿½ ZORLA KAPAT
window.addEventListener('load', () => {
    const lineOptions = document.getElementById('line-options') || document.querySelector('.line-options');
    if (lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }
});

// =========================================================
// Fï¿½Zï¿½KSEL ARAï¿½LAR ï¿½ï¿½ï¿½N RADAR VE ï¿½Nï¿½ZLEME MOTORU
// =========================================================
let sonAracDurumlari = {};

window.araclariAgaGonder = function () {
    if (typeof isConnected === 'undefined' || !isConnected) return;

    const gelismisAraclar = [
        { id: 'ruler', obj: window.RulerTool, selector: '.ruler-container' },
        { id: 'gonye', obj: window.GonyeTool, selector: '.gonye-container' },
        { id: 'aciolcer', obj: window.AciolcerTool, selector: '.aciolcer-container' },
        { id: 'pergel', obj: window.PergelTool, selector: '#compass-container' }
    ];

    gelismisAraclar.forEach(arac => {
        if (arac.obj && arac.obj.state) {
            try {
                const el = document.querySelector(arac.selector);
                let isVisible = 'none';
                let elW = '', elH = '';

                if (el) {
                    isVisible = (el.style.display !== 'none' && !el.classList.contains('hidden')) ? 'block' : 'none';
                    elW = el.style.width;
                    elH = el.style.height;
                }

                // Araï¿½larï¿½n durumunu, dï¿½nï¿½ï¿½ aï¿½ï¿½sï¿½nï¿½ ve boyutunu tek metinde birleï¿½tirip deï¿½iï¿½iklik var mï¿½ bakï¿½yoruz
                const durum = isVisible + JSON.stringify(arac.obj.state) + elW + elH;

                if (sonAracDurumlari[arac.id] !== durum) {
                    sonAracDurumlari[arac.id] = durum;

                    // Eï¿½er veri henï¿½z aï¿½dan geldiyse (son 500ms), geri yansï¿½tï¿½p yankï¿½ yapmasï¿½nï¿½ engelle!
                    if (arac.obj.lastNetworkReceiveTime && (Date.now() - arac.obj.lastNetworkReceiveTime) < 500) {
                        return;
                    }

                    // Deï¿½iï¿½iklik varsa PC'ye anï¿½nda gï¿½nder
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({
                            type: 'arac_state_senkron',
                            arac: arac.id,
                            display: isVisible,
                            state: arac.obj.state,
                            width: elW,
                            height: elH
                        });
                    }
                }
            } catch (err) { }
        }
    });
};

// Radarï¿½ saniyede 10 kez ï¿½alï¿½ï¿½tï¿½r (Gï¿½rï¿½nï¿½m senkronizasyonu iï¿½in)
setInterval(window.araclariAgaGonder, 100);

// DIï¿½ DOSYALAR (cetvel.js, pergel.js) ï¿½ï¿½ï¿½N CANLI ï¿½Nï¿½ZLEME YAYINCISI
window.broadcastPreview = function (toolType, stateData) {
    if (typeof window.sendNetworkData === 'function' && window.isConnected) {
        window.sendNetworkData({ type: 'aktif_onizleme', arac: toolType, payload: stateData });
    }
};

// ?? KESï¿½N ï¿½ï¿½Zï¿½M: 3D ï¿½EKï¿½LLERï¿½ ï¿½ï¿½Zï¿½Mï¿½N ALTINA ALIRKEN BUTONLARI KORUMA ZIRHI
const canvasKatmanZirhi = document.createElement('style');
canvasKatmanZirhi.innerHTML = `
    /* ?? Arka plan kanvasï¿½nï¿½ en alta al (Sayfa PDF'leri araï¿½larï¿½n ï¿½stï¿½nï¿½ ï¿½rtemez) */
    #bg-canvas { position: absolute !important; z-index: 5 !important; top: 0; left: 0; pointer-events: none; }

    /* ï¿½izim tahtasï¿½nï¿½ 3D cisimlerin ï¿½stï¿½ne ï¿½ï¿½karï¿½yoruz */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 3D uzay sahnesi bg-canvas'ï¿½n ï¿½stï¿½nde (10), ï¿½izimlerin altï¿½nda (50) kalmalï¿½ */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; }
    
    /* ?? BUTONLARIN VE Fï¿½Zï¿½KSEL ARAï¿½LARIN GERï¿½ GELMESï¿½Nï¿½ SAï¿½LAYAN EN ï¿½ST KATMAN KORUMASI ?? */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options, 
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options, 
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip,
    .ruler-container, .gonye-container, .aciolcer-container, #compass-container { 
        z-index: 10000 !important; 
    }
`;
document.head.appendChild(canvasKatmanZirhi);


// ==========================================
// --- TONY STARK MODU (ï¿½LERï¿½ Dï¿½ZEY GESTURES) ---
// ==========================================
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

let tonyBtn = document.getElementById('tony-magic-btn');
if (!tonyBtn) {
    tonyBtn = document.createElement('button');
    tonyBtn.id = 'tony-magic-btn';

tonyBtn.className = 'tool-button';
tonyBtn.style.position = 'static';
tonyBtn.style.transform = 'none';
tonyBtn.style.width = '100%';
tonyBtn.style.marginTop = '10px';
tonyBtn.style.padding = '10px 0';
tonyBtn.style.fontSize = '12px';
tonyBtn.style.borderRadius = '10px';
tonyBtn.style.backgroundColor = 'rgba(0, 150, 255, 0.2)';
tonyBtn.style.border = '2px solid #0096ff';
tonyBtn.style.color = '#fff';
tonyBtn.style.cursor = 'pointer';
tonyBtn.style.fontWeight = 'bold';
tonyBtn.innerHTML = '??? Sihirli El';

const oyunlarBtn = document.getElementById('btn-oyunlar');
if (oyunlarBtn && oyunlarBtn.parentNode) {
    oyunlarBtn.parentNode.appendChild(tonyBtn);
} else {
    document.body.appendChild(tonyBtn);
}
}

// Lazer ï¿½mleci
const laserCursor = document.createElement('div');
laserCursor.style.position = 'absolute';
laserCursor.style.width = '20px';
laserCursor.style.height = '20px';
laserCursor.style.borderRadius = '50%';
laserCursor.style.backgroundColor = '#00ffff'; // Iron Man Blue
laserCursor.style.boxShadow = '0 0 15px 5px rgba(0, 255, 255, 0.8)';
laserCursor.style.pointerEvents = 'none';
laserCursor.style.transition = 'left 0.1s ease-out, top 0.1s ease-out, background-color 0.2s';
laserCursor.style.willChange = 'left, top';
laserCursor.style.zIndex = '999999';
laserCursor.style.display = 'none';
laserCursor.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(laserCursor);

let tonyActive = false;
let camera = null;
let hands = null;

function calculateDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

    tonyBtn.onclick = async () => {
        if (tonyActive) {
            if (camera) { camera.stop(); camera = null; }
            if (hands) { hands.close(); hands = null; }
            const vid = document.getElementById('tony-video-elem');
            if (vid) {
                // Kamera donanim isigini ve kaydini TAMAMEN kapatmak icin MediaStream tracklerini durdurmaliyiz!
                if (vid.srcObject) {
                    vid.srcObject.getTracks().forEach(track => track.stop());
                }
                vid.remove();
            }
            tonyActive = false;
            laserCursor.style.display = 'none';
            tonyBtn.innerHTML = '?? Sihirli El';
            tonyBtn.style.borderColor = '#0096ff';
            tonyBtn.style.boxShadow = 'none';
            return;
        }

        tonyBtn.innerHTML = '? (KVKK)';
        tonyBtn.style.borderColor = '#ffff00';
        tonyBtn.style.boxShadow = '0 0 10px rgba(255,255,0,0.5)';

        try {
            // Scripts artik index.html icinde erkenden yukleniyor.

            const videoElement = document.createElement('video');
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('muted', '');
            videoElement.id = 'tony-video-elem';
            videoElement.style.position = 'fixed'; 
            videoElement.style.opacity = '0.001'; videoElement.setAttribute('webkit-playsinline', 'true'); 
            videoElement.style.transform = 'scaleX(-1)';
            videoElement.style.width = '100%'; 
            videoElement.style.height = '100%'; 
            videoElement.style.zIndex = '-9999'; 
            videoElement.style.top = '0'; 
            videoElement.style.left = '0'; 
            videoElement.style.pointerEvents = 'none'; 
            videoElement.muted = true;
            document.body.appendChild(videoElement);

            hands = new window.Hands({
                locateFile: (file) => 'vendor/' + file
            });

            hands.setOptions({
                maxNumHands: 2, 
                modelComplexity: 1, // 1 yapildi, uzaktan daha iyi algilamasi icin
                minDetectionConfidence: 0.3,
                minTrackingConfidence: 0.3
            });

            let startX = 0, startY = 0;
            let startScaleDistance = 0, startScale = 1;
            let startOpenDistance = 0, startOpenRatio = 0;
            window.lastAISendTime = 0;

            hands.onResults((results) => {

                tonyBtn.innerHTML = 'AI Aktif';
                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    tonyBtn.innerHTML = 'El Gï¿½rï¿½ndï¿½!';
                    const isTwoHands = results.multiHandLandmarks.length === 2;
                    const hand1 = results.multiHandLandmarks[0];
                    
                    const rawPx1 = (1 - hand1[8].x) * window.innerWidth;
                    const rawPy1 = hand1[8].y * window.innerHeight;
                    if (window.smoothPx1 === undefined) { window.smoothPx1 = rawPx1; window.smoothPy1 = rawPy1; }
                    window.smoothPx1 += (rawPx1 - window.smoothPx1) * 0.25; // 0.25 EMA Yumusatma Filtresi (Titremeyi yutar)
                    window.smoothPy1 += (rawPy1 - window.smoothPy1) * 0.25;
                    const px1 = window.smoothPx1;
                    const py1 = window.smoothPy1;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';
                    
                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const handScale1 = calculateDistance(hand1[0], hand1[9]) || 0.001; // Elin ekrandaki boyutu (Bilek - Orta Parmak Koku)
                    // Gercek bir yumrukta parmak uclari koklere cok yaklasir (el boyutunun yarisi kadar veya daha az)
                    const isFist1 = (calculateDistance(hand1[8], hand1[5]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[12], hand1[9]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[16], hand1[13]) / handScale1) < 0.6 && 
                                    (calculateDistance(hand1[20], hand1[17]) / handScale1) < 0.6;
                    const dynamicPinch1 = (handScale1 > 0.12) ? 0.30 : 0.45;
                    const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < dynamicPinch1); 

                    if (window.Scene3D) {
                        let mesh = window.Scene3D.currentMesh;
                        if (!mesh && window.Scene3D.scene) {
                            mesh = window.Scene3D.scene.children.slice().reverse().find(m => m.userData && m.userData.strokeData);
                        }
                        if (mesh) {
                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const handScale2 = calculateDistance(hand2[0], hand2[9]) || 0.001;
                                const isFist2 = (calculateDistance(hand2[8], hand2[5]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[12], hand2[9]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[16], hand2[13]) / handScale2) < 0.6 && 
                                                (calculateDistance(hand2[20], hand2[17]) / handScale2) < 0.6;
                                const dynamicPinch2 = (handScale2 > 0.12) ? 0.30 : 0.45;
                                const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < dynamicPinch2);
                                const handsDistance = calculateDistance(hand1[8], hand2[8]);

                                // Hata onleme: Iki el birbirinden en az %15 uzak olmali (yanlis algilamalari onler)
                                if (handsDistance > 0.15) {
                                    if (!isPinched1 && !isPinched2) {
                                        laserCursor.style.backgroundColor = "#ff00ff"; 
                                        if (startScaleDistance === 0) {
                                            startScaleDistance = handsDistance;
                                            startScale = mesh.scale.x;
                                        } else {
                                            const distDiff = handsDistance - startScaleDistance;
                                            // Pruzsuz dogrusal buyutme (Sicramalari tamamen onler)
                                            let newScale = startScale + (distDiff * 4);
                                            // Cizim alanindan tasmamasi icin maksimum 3.5 siniri
                                            newScale = Math.max(0.2, Math.min(newScale, 3.5)); 
                                            
                                            // Lerp ile gecisleri yag gibi kaydir
                                            mesh.scale.x += (newScale - mesh.scale.x) * 0.3;
                                            mesh.scale.setScalar(mesh.scale.x);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = mesh.scale.x;
                                                if (typeof window.sendNetworkData === "function") {
                                                    window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                }
                                            }
                                        }
                                        startOpenDistance = 0; 
                                    } 
                                    else if (isPinched1 && isPinched2) {
                                        laserCursor.style.backgroundColor = "#ffff00"; 
                                        if (startOpenDistance === 0) {
                                            startOpenDistance = handsDistance;
                                            startOpenRatio = mesh.userData.strokeData?.openRatio || 0;
                                        } else {
                                            const distDiff = handsDistance - startOpenDistance;
                                            
                                            // ASIMETRIK CARPAN: Kapatmak (distDiff < 0) fiziksel olarak daha dar bir alanda
                                            // yapildigi icin kapatma ivmesini 2.5 yapiyoruz. Acmak 1.5 kaliyor.
                                            // ASIMETRIK CARPAN: Hizli acilip kapanmasi icin carpanlar artirildi
                                            let multiplier = distDiff < 0 ? 5.5 : 4.0;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Daha kolay kapanmasi icin sinirlar genisletildi
                                            if (newRatio > 0.85) newRatio = 1.0;
                                            if (newRatio < 0.18) newRatio = 0.0;
                                            
                                            const sInput = document.getElementById("shape-slider");
                                            if(sInput) sInput.value = newRatio * 100;
                                            
                                            // Lerp animasyonu icin update fonksiyonlari Scene3D.animate'e birakildi
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.openRatio = newRatio;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                        startScaleDistance = 0; 
                                    }
                                    else {
                                        startScaleDistance = 0;
                                        startOpenDistance = 0;
                                    }
                                }
                                startX = 0; 
                            } 
                            else {
                                startScaleDistance = 0;
                                startOpenDistance = 0;

                                const isFist = isFist1;

                                if (isFist) {
                                    laserCursor.style.backgroundColor = '#ff0000'; 
                                    const fistX = (1 - hand1[9].x) * window.innerWidth;
                                    const fistY = hand1[9].y * window.innerHeight;
                                    
                                    if (!window.Scene3D.isDraggingAI) {
                                        window.Scene3D.isDraggingAI = true;
                                        if (!window.Scene3D.dragOffset) window.Scene3D.dragOffset = new THREE.Vector3();
                                        window.Scene3D.dragPlane.setFromNormalAndCoplanarPoint(window.Scene3D.camera.getWorldDirection(new THREE.Vector3()), mesh.position);
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            window.Scene3D.dragOffset.subVectors(mesh.position, intersectPoint);
                                        }
                                    } else {
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            const targetPos = new THREE.Vector3().addVectors(intersectPoint, window.Scene3D.dragOffset);
                                            
                                            // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                                            targetPos.x = Math.max(-30, Math.min(30, targetPos.x));
                                            targetPos.y = Math.max(-30, Math.min(30, targetPos.y));
                                            targetPos.z = Math.max(-30, Math.min(30, targetPos.z));

                                            if (!mesh.userData.targetPosition) mesh.userData.targetPosition = mesh.position.clone();
                                            mesh.userData.targetPosition.copy(targetPos);
                                            
                                            const vec = targetPos.clone();
                                            vec.project(window.Scene3D.camera);
                                            const canvasEl = document.getElementById('drawing-canvas');
                                            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
                                            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.x = (vec.x * w) + w;
                                                mesh.userData.strokeData.y = -(vec.y * h) + h;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                    }
                                } else if (isPinched1) {
                                    window.Scene3D.isDraggingAI = false;
                                    laserCursor.style.backgroundColor = '#00ff00'; 
                                    if (startX !== 0 && startY !== 0) {
                                        const dx = px1 - startX;
                                        const dy = py1 - startY;
                                        
                                        if (Math.abs(dx) > 1.0 || Math.abs(dy) > 1.0) { // Deadzone: Sadece gercek hareketlerde don!

                                        // Gimbal Lock Fix + Trackball (Dunya Maketi) Eksen Donusumu
                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        if (!mesh.userData.targetQuaternion) {
                                            mesh.userData.targetQuaternion = mesh.quaternion.clone();
                                        }
                                        const dummy = new THREE.Object3D();
                                        dummy.quaternion.copy(mesh.userData.targetQuaternion);
                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * 0.008); // Ters donme sorunu icin - silindi (Yeï¿½il butonla ayni yapildi)
                                        mesh.userData.targetQuaternion.copy(dummy.quaternion);

                                        if (mesh.userData && mesh.userData.strokeData) {
                                            const sd = mesh.userData.strokeData;
                                            const euler = new THREE.Euler().setFromQuaternion(mesh.userData.targetQuaternion, 'XYZ');
                                            sd.rotationX = euler.x;
                                            sd.rotationY = euler.y;
                                            sd.rotationZ = euler.z;
                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                        } // Deadzone sonu
                                    }
                                    startX = px1;
                                    startY = py1;
                                } else {
                                    laserCursor.style.backgroundColor = '#00ffff'; 
                                    window.Scene3D.isDraggingAI = false;
                                    startX = 0;
                                    startY = 0;
                                }
                            }
                        }
                    }
                } else {
                    startX = 0; startY = 0;
                    startScaleDistance = 0; startOpenDistance = 0;
                    laserCursor.style.display = 'none';
                }
            });

            // YENI: Genis Acili 1080p Ozel Kamera (Dinamik Adaptasyon Modu)
            camera = {
                stream: null,
                isRunning: false,
                start: async function() {
                    try {
                        this.stream = await navigator.mediaDevices.getUserMedia({
                            video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: 'user' }
                        });
                        videoElement.srcObject = this.stream;
                        await videoElement.play();
                        this.isRunning = true;
                        window.isSniperModeActive = false;
                        
                        const processFrame = async () => {
                            if (!this.isRunning) return;
                            if (videoElement.readyState >= 2) {
                                // Dogrudan video elementini gonder (Kirpma YOK, Zoom YOK)
                                await hands.send({image: videoElement});
                            }
                            requestAnimationFrame(processFrame);
                        };
                        processFrame();
                    } catch(e) {
                        console.error('Kamera baslatilamadi', e);
                    }
                },
                stop: function() {
                    this.isRunning = false;
                    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
                }
            };
            camera.start();

            tonyBtn.innerHTML = '?? Sihirli El';
            tonyBtn.style.borderColor = '#00ff00';
            tonyBtn.style.boxShadow = '0 0 20px rgba(0,255,255,0.8)';
            tonyBtn.style.color = '#00ff00';
            tonyActive = true;

        } catch (e) {
            console.error('Tony Stark Modu Hatasï¿½:', e);
            tonyBtn.innerHTML = '? Hata';
            tonyBtn.style.borderColor = '#ff0000';
            tonyBtn.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
            tonyBtn.style.color = '#ff0000';
        }
    };

// ==========================================


// ========================================================
// SIHIRLI CEKMECE (MOBIL RESPONSIVE) ETKILESIMLERI
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const leftFab = document.getElementById('mobile-drawer-left');
    const rightFab = document.getElementById('mobile-drawer-right');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const canvas = document.getElementById('drawing-canvas');

    if (leftFab && leftPanel) {
        // Dokunmatik cihazlarda cift tiklamayi onlemek icin sadece tek click kullan
        leftFab.addEventListener('click', (e) => {
            e.stopPropagation(); // Tuvale dokunmus sayilmamasi icin
            leftPanel.classList.toggle('drawer-open');
            if(rightPanel) rightPanel.classList.remove('drawer-open'); // Digerini kapat
        });
    }

    if (rightFab && rightPanel) {
        rightFab.addEventListener('click', (e) => {
            e.stopPropagation();
            rightPanel.classList.toggle('drawer-open');
            if(leftPanel) leftPanel.classList.remove('drawer-open');
        });
    }

    // Tuvale (Ekrana) dokunuldugunda cekmeceleri otomatik kapat
    if (canvas) {
        canvas.addEventListener('pointerdown', () => {
            if (window.innerWidth <= 1024) {
                if(leftPanel && leftPanel.classList.contains('drawer-open')) {
                    leftPanel.classList.remove('drawer-open');
                }
                if(rightPanel && rightPanel.classList.contains('drawer-open')) {
                    rightPanel.classList.remove('drawer-open');
                }
            }
        });
    }
});



// --- MOBï¿½L Cï¿½HAZLARDA SOL PANELDEN ARAï¿½ SEï¿½ï¿½Lï¿½NCE PANELï¿½ OTOMATï¿½K KAPATMA YAMASI ---
document.addEventListener('DOMContentLoaded', () => {
    const lp = document.querySelector('.left-panel');
    if (lp) {
        lp.addEventListener('click', (e) => {
            if (e.target.closest('.tool-button') || e.target.closest('.tool-button-sub')) {
                if (window.innerWidth <= 1024 && lp.classList.contains('drawer-open')) {
                    lp.classList.remove('drawer-open');
                }
            }
        });
    }
});


// --- MOBï¿½L Cï¿½HAZLARDA BOï¿½LUï¿½A (ï¿½ï¿½Zï¿½M ALANINA) DOKUNUNCA PANELï¿½ KESï¿½N OLARAK KAPATMA YAMASI ---
document.addEventListener('pointerdown', (e) => {
    if (window.innerWidth <= 1024) { // Daha geniï¿½ tabletleri de kapsasï¿½n diye 1024 yapï¿½ldï¿½
        const lp = document.querySelector('.left-panel');
        const rp = document.querySelector('.right-panel');
        const lFab = document.getElementById('mobile-drawer-left');
        const rFab = document.getElementById('mobile-drawer-right');

        if (lp && lp.classList.contains('drawer-open')) {
            if (!lp.contains(e.target) && (!lFab || !lFab.contains(e.target))) {
                lp.classList.remove('drawer-open');
            }
        }
        if (rp && rp.classList.contains('drawer-open')) {
            if (!rp.contains(e.target) && (!rFab || !rFab.contains(e.target))) {
                rp.classList.remove('drawer-open');
            }
        }
    }
}, { capture: true });
}); // capture: true sayesinde diï¿½er elemanlarï¿½n engellemesini (stopPropagation) aï¿½ar
window.addEventListener('error', function(e) {
    alert('JS HATASI: ' + e.message + ' at ' + e.filename + ':' + e.lineno);
});
