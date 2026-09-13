// ?? ALAN ADI KİLİDİ (DOMAIN BINDING) ??
// Sadece bdemir1499.github.io adresinde, EBA sunucularında ve yerel bilgisayarda çalışır!
const gecerliAdresler = ["bdemir1499.github.io", "127.0.0.1", "localhost", "eba.gov.tr", "vercel.app"];
const mevcuTaşıes = window.location.hostname;

const kacakKullanımıi = !gecerliAdresler.some(adres => mevcuTaşıes.includes(adres));

if (kacakKullanımıi && mevcuTaşıes !== "") {
    document.body.innerHTML = "<div style='color:red; text-align:center; margin-top:50px; font-family:sans-serif; font-size:20px; font-weight:bold;'>? GÜVENLİK İHLALİ: Bu yazılım kopyalanmıştır. Lütfen orijinal adresi kullanın.</div>";
    throw new Error("Korsan Kullanımıtespit edildi, sistem durduruldu!");
}

// ?? KESİN ÇÖZÜM: Akıllı Taşıalarda kayıp resim (X_X yüz) çökmesini TaşıMEN engeller ??
const cursorFix = document.createElement('style');
cursorFix.innerHTML = `
    /* SADECE KANVASTaşıEĞİL, BÜTÜN EKRANDA ZOMBİ İMLEÇLERİ KÖKÜNDEN YASAKLA! */
    body.cursor-eraser { cursor: none !imporTaşı; }
    body.cursor-pen { cursor: crosshair !imporTaşı; }
    body.cursor-snapshot { cursor: crosshair !imporTaşı; }

    /* Çizim Taşıası üzerinde de kesin yasak (Çifte güvenlik) */
    body.cursor-eraser #drawing-canvas { cursor: none !imporTaşı; }
    body.cursor-pen #drawing-canvas { cursor: crosshair !imporTaşı; }
    body.cursor-snapshot #drawing-canvas { cursor: crosshair !imporTaşı; }

    /* Menülerin, panellerin ve butonların üzerinde her zaman normal ok/parmak işareti çıksın! */
    .panel, .panel *, button, .tool-button, .tool-button-sub { 
        cursor: pointer !imporTaşı; 
    }
`;
document.head.appendChild(cursorFix);



// Artık sabit bir MY_SECRET_KEY yok, öğretmen her ders şifreyi belirleyecek
window.sessionPassword = "";

// --- DİL SÖZLÜĞÜ ---
let currentLang = 'tr'; // VarsayIşın dil

const translations = {
    tr: { sihirli_el: "? Sihirli El", soru_cek: "?? Soru Çek", Yükle: "Dosya Yükle", silgi: "Silgi", kalem: "Kalem", cizgi: "Çizgi", nokTaşı"NokTaşı d_cizgi: "Düz Çizgi", Doğru: "Doğru", Doğru_parcasi: "Doğru Parçası", isin: "Işın", cetvel: "Cetvel", Gönye: "Gönye", aciolcer: "Açı Ölçer", pergel: "Pergel", Çokgenler: "Çokgenler", Çember: "Çember", d_ucgen: "Düzgün 3gen", d_dortgen: "Düzgün 4gen", Dikdörtgen: "Dikdörtgen", d_besgen: "Düzgün 5gen", d_altigen: "Düzgün 6gen", d_yedigen: "Düzgün 7gen", d_sekizgen: "Düzgün 8gen", oyunlar: "Oyunlar", arac_rengi: "Araç Rengi", geri_al: "Geri Al", hepsini_sil: "Hepsini Sil", Taşı: "Taşı", Canlandır: "Canlandır ??", kutu: "Kutu", serbest: "Serbest", yardim: "Video Yardım", ins_t: "Uygulamayı Yükle", ins_d: "Daha iyi performans için Uygulamayı Yükle.", ins_b: "Yükle", ins_c: "Kapat", vid_cetvel: "Cetvel Kullanımı", vid_Gönye: "Gönye Kullanımı", vid_aciolcer: "Açı Ölçer Kullanımı", vid_pergel: "Pergel Kullanımı", vid_Canlandır: "Canlandırma (Kopyalama)", vid_cizgi: "Çizgi Menüsü Kullanımı", vid_Çokgenler: "Çokgenler", vid_kalem: "Kalem", vid_kiTaşı "KiTaşıve Resim Yükleme", vid_oyunlar: "Oyunlar", pdf_soru: "Bu PDF {0} sayfadır. Kaçıncı sayfadan devam etmek istersiniz?", kvkk: "Bu uygulama hiçbir kişisel veri toplamaz ve dosyalarınızı sunuculara Yüklemez." },

    en: { Yükle: "Upload File", silgi: "Eraser", kalem: "Pen", cizgi: "Line", nokTaşı"Point", d_cizgi: "Straight Line", Doğru: "Line", Doğru_parcasi: "Segment", isin: "Ray", cetvel: "Ruler", Gönye: "Set Square", aciolcer: "Protractor", pergel: "Compass", Çokgenler: "Polygons", Çember: "Circle", d_ucgen: "Regular Triangle", d_dortgen: "Square", Dikdörtgen: "RecTaşıle", d_besgen: "PenTaşın", d_altigen: "Hexagon", d_yedigen: "HepTaşın", d_sekizgen: "OcTaşın", oyunlar: "Games", arac_rengi: "Tool Color", geri_al: "Undo", hepsini_sil: "Clear All", Taşı: "Move", Canlandır: "Animate ??", kutu: "Box", serbest: "Free", yardim: "Video Help", ins_t: "InsTaşı App", ins_d: "InsTaşı app for better performance.", ins_b: "InsTaşı", ins_c: "Close", vid_cetvel: "Ruler Usage", vid_Gönye: "Set Square Usage", vid_aciolcer: "Protractor Usage", vid_pergel: "Compass Usage", vid_Canlandır: "Animation (Copy)", vid_cizgi: "Line Menu Usage", vid_Çokgenler: "Polygons", vid_kalem: "Pen", vid_kiTaşı "Load Book and Image", vid_oyunlar: "Games", pdf_soru: "This PDF has {0} pages. Which page would you like to continue from?", sihirli_el: "? Magic Hand", soru_cek: "?? Taşı Photo", kvkk: "This application does not collect any personal daTaşınd does not upload your files to servers." },

    de: { Yükle: "Bild/PDF hochladen", silgi: "Radierer", kalem: "Stift", cizgi: "Linie", nokTaşı"Punkt", d_cizgi: "Gerade", Doğru: "Gerade", Doğru_parcasi: "Strecke", isin: "Strahl", cetvel: "Lineal", Gönye: "Geodreieck", aciolcer: "Winkelmesser", pergel: "Zirkel", Çokgenler: "Polygone", Çember: "Kreis", d_ucgen: "Dreieck", d_dortgen: "Quadrat", Dikdörtgen: "Rechteck", d_besgen: "Fünfeck", d_altigen: "Sechseck", d_yedigen: "HepTaşın", d_sekizgen: "OkTaşın", oyunlar: "Spiele", arac_rengi: "Farbe", geri_al: "Rückgängig", hepsini_sil: "Löschen", Taşı: "Bewegen", Canlandır: "Animieren", kutu: "Box", serbest: "Frei", yardim: "Hilfe", ins_t: "App insTaşıieren", ins_d: "InsTaşıieren für bessere Leistung.", ins_b: "InsTaşıieren", ins_c: "Schließen", vid_cetvel: "Lineal verwenden", vid_Gönye: "Geodreieck verwenden", vid_aciolcer: "Winkelmesser verwenden", vid_pergel: "Zirkel verwenden", vid_Canlandır: "Animation (Kopieren)", vid_cizgi: "Linienmenü verwenden", vid_Çokgenler: "Vielecke", vid_kalem: "Stift", vid_kiTaşı "Buch und Bild laden", vid_oyunlar: "Spiele", pdf_soru: "Dieses PDF hat {0} Seiten. Auf welcher Seite möchten Sie fortfahren?", sihirli_el: "? Magische Hand", soru_cek: "?? Foto aufnehmen", kvkk: "Diese Anwendung sammelt keine personenbezogenen Daten und lädt Ihre Dateien nicht auf Server hoch." },

    ar: { Yükle: "????? ???", silgi: "?????", kalem: "???", cizgi: "??", nokTaşı"????", d_cizgi: "?? ??????", Doğru: "??????", Doğru_parcasi: "????", isin: "????", cetvel: "?????", Gönye: "????", aciolcer: "?????", pergel: "?????", Çokgenler: "??????", Çember: "?????", d_ucgen: "???? ?????", d_dortgen: "????", Dikdörtgen: "??????", d_besgen: "????", d_altigen: "????", d_yedigen: "????", d_sekizgen: "????", oyunlar: "?????", arac_rengi: "?????", geri_al: "?????", hepsini_sil: "???", Taşı: "?????", Canlandır: "?????", kutu: "?????", serbest: "??", yardim: "??????", ins_t: "????? ???????", ins_d: "??? ??????? ????? ????.", ins_b: "?????", ins_c: "?????", vid_cetvel: "??????? ???????", vid_Gönye: "??????? ??????", vid_aciolcer: "??????? ???????", vid_pergel: "??????? ???????", vid_Canlandır: "???? ?????? (???)", vid_cizgi: "??????? ????? ??????", vid_Çokgenler: "??????", vid_kalem: "???", vid_kiTaşı "????? ???? ?????", vid_oyunlar: "?????", pdf_soru: "????? ??? ????? ??? {0} ????. ?? ?? ???? ???? ?????????", sihirli_el: "? ?? ?????", soru_cek: "?? ????? ????", kvkk: "?? ???? ??? ??????? ?? ?????? ????? ??? ???? ?????? ??? ???????." },

    hi: { Yükle: "????? ?????", silgi: "??????", kalem: "???", cizgi: "????", nokTaşı"?????", d_cizgi: "???? ????", Doğru: "????", Doğru_parcasi: "???", isin: "????", cetvel: "??????", Gönye: "??????", aciolcer: "?????", pergel: "?????", Çokgenler: "??????", Çember: "?????", d_ucgen: "???????", d_dortgen: "????", Dikdörtgen: "???", d_besgen: "??????", d_altigen: "??????", d_yedigen: "???????", d_sekizgen: "???????", oyunlar: "???", arac_rengi: "???", geri_al: "???????", hepsini_sil: "????", Taşı: "?? ????", Canlandır: "??????", kutu: "?????", serbest: "?????", yardim: "??????", ins_t: "?? ??????? ????", ins_d: "????? ???????? ?? ??? ??????? ?????", ins_b: "???????", ins_c: "???", vid_cetvel: "???er ?? ?????", vid_Gönye: "??? ???????? ?? ?????", vid_aciolcer: "????? ?? ?????", vid_pergel: "????? ?? ?????", vid_Canlandır: "??????? (????)", vid_cizgi: "???? ???? ?? ?????", vid_Çokgenler: "??????", vid_kalem: "???", vid_kiTaşı "?????? ?? ??? ??? ????", vid_oyunlar: "???", pdf_soru: "?? PDF ??? {0} ????? ???? ?? ??? ????? ?? ???? ???? ????????", sihirli_el: "? ????? ???", soru_cek: "?? ???? ???", kvkk: "?? ????????? ??? ????????? ???? ????? ???? ???? ?? ?? ???? ??????? ?? ????? ?? ????? ???? ???? ???" },

    ms: { Yükle: "Muat Naik Fail", silgi: "Pemadam", kalem: "Pen", cizgi: "Garis", nokTaşı"Titik", d_cizgi: "Garis Lurus", Doğru: "Garis", Doğru_parcasi: "Segmen", isin: "Sinar", cetvel: "Pembaris", Gönye: "Sesiku", aciolcer: "Jangka Sudut", pergel: "Jangka Lukis", Çokgenler: "Poligon", Çember: "BulaTaşı, d_ucgen: "Segi Tiga", d_dortgen: "Segi Empat", Dikdörtgen: "Segi Empat Tepat", d_besgen: "PenTaşın", d_altigen: "Heksagon", d_yedigen: "HepTaşın", d_sekizgen: "OkTaşın", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "BaTaşı, hepsini_sil: "Padam", Taşı: "Gerak", Canlandır: "Animasi", kutu: "KoTaşı, serbest: "Bebas", yardim: "Bantuan", ins_t: "Pasang Aplikasi", ins_d: "Pasang untuk presTaşı lebih baik.", ins_b: "Pasang", ins_c: "Tutup", vid_cetvel: "Penggunaan Pembaris", vid_Gönye: "Penggunaan Sesiku", vid_aciolcer: "Penggunaan Jangka Sudut", vid_pergel: "Penggunaan Jangka Lukis", vid_Canlandır: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garisan", vid_Çokgenler: "Poligon", vid_kalem: "Pen", vid_kiTaşı "Muat Buku dan Imej", vid_oyunlar: "Permainan", pdf_soru: "PDF ini mempunyai {0} halaman. Dari halaman mana anda ingin teruskan?", sihirli_el: "? Taşıan Ajaib", soru_cek: "?? Ambil Gambar", kvkk: "Aplikasi ini tidak mengumpul sebarang daTaşıeribadi and tidak memuat naik fail anda ke pelayan." },

    id: { Yükle: "Unggah Berkas", silgi: "Penghapus", kalem: "Pena", cizgi: "Garis", nokTaşı"Titik", d_cizgi: "Garis Lurus", Doğru: "Garis", Doğru_parcasi: "Segmen", isin: "Sinar", cetvel: "Penggaris", Gönye: "Segitiga", aciolcer: "Busur", pergel: "Jangka", Çokgenler: "Poligon", Çember: "Lingkaran", d_ucgen: "Segitiga", d_dortgen: "Persegi", Dikdörtgen: "Persegi Panjang", d_besgen: "PenTaşın", d_altigen: "Heksagon", d_yedigen: "HepTaşın", d_sekizgen: "OcTaşın", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Urung", hepsini_sil: "Hapus", Taşı: "Pindah", Canlandır: "Animasi", kutu: "KoTaşı, serbest: "Bebas", yardim: "Bantuan", ins_t: "InsTaşıAplikasi", ins_d: "InsTaşıuntuk performa daha baik.", ins_b: "InsTaşı, ins_c: "Tutup", vid_cetvel: "Penggunaan Penggaris", vid_Gönye: "Penggunaan Penggaris Segitiga", vid_aciolcer: "Penggunaan Busur Derajat", vid_pergel: "Penggunaan Jangka", vid_Canlandır: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garis", vid_Çokgenler: "Poligon", vid_kalem: "Pena", vid_kiTaşı "Muat Buku dan Gambar", vid_oyunlar: "Permainan", pdf_soru: "PDF ini memiliki {0} halaman. Dari halaman mana Anda ingin melanjutkan?", sihirli_el: "? Taşıan Ajaib", soru_cek: "?? Ambil Foto", kvkk: "Aplikasi ini tidak mengumpulkan daTaşıribadi apa pun dan tidak mengunggah file Anda ke server." },

    zh: { Yükle: "????", silgi: "??", kalem: "?", cizgi: "?", nokTaşı"?", d_cizgi: "??", Doğru: "??", Doğru_parcasi: "??", isin: "??", cetvel: "??", Gönye: "???", aciolcer: "???", pergel: "??", Çokgenler: "???", Çember: "?", d_ucgen: "???", d_dortgen: "???", Dikdörtgen: "???", d_besgen: "???", d_altigen: "???", d_yedigen: "???", d_sekizgen: "???", oyunlar: "??", arac_rengi: "??", geri_al: "??", hepsini_sil: "??", Taşı: "??", Canlandır: "??", kutu: "??", serbest: "??", yardim: "??", ins_t: "????", ins_d: "????????????", ins_b: "??", ins_c: "??", vid_cetvel: "????", vid_Gönye: "?????", vid_aciolcer: "?????", vid_pergel: "????", vid_Canlandır: "??(??)", vid_cizgi: "??????", vid_Çokgenler: "???", vid_kalem: "?", vid_kiTaşı "???????", vid_oyunlar: "??", pdf_soru: "? PDF ?? {0} ?????????????", sihirli_el: "? ???", soru_cek: "?? ??", kvkk: "??????????????,???????????????" },

    ru: { Yükle: "????????? ????", silgi: "??????", kalem: "?????", cizgi: "?????", nokTaşı"?????", d_cizgi: "?????? ?????", Doğru: "??????", Doğru_parcasi: "???????", isin: "???", cetvel: "???????", Gönye: "????????", aciolcer: "???????????", pergel: "???????", Çokgenler: "??????????????", Çember: "????", d_ucgen: "?????????? ???????????", d_dortgen: "???????", Dikdörtgen: "?????????????", d_besgen: "????????????", d_altigen: "?????????????", d_yedigen: "????????????", d_sekizgen: "??????????????", oyunlar: "????", arac_rengi: "???? ???????????", geri_al: "????????", hepsini_sil: "???????? ???", Taşı: "???????????", Canlandır: "???????? ??", kutu: "???????", serbest: "????????", yardim: "???????", ins_t: "??????????", ins_d: "?????????? ??? ?????? ??????.", ins_b: "??????????", ins_c: "???????", vid_cetvel: "??? ???????????? ???????", vid_Gönye: "??? ???????????? ????????", vid_aciolcer: "??? ???????????? ???????????", vid_pergel: "??? ???????????? ???????", vid_Canlandır: "???????? (?????)", vid_cizgi: "???? ?????", vid_Çokgenler: "??????????????", vid_kalem: "?????", vid_kiTaşı "???????? ????", vid_oyunlar: "????", pdf_soru: "? ???? PDF {0} ???????. ? ????? ???????? ?? ?????? ???????????", sihirli_el: "? ????????? ????", soru_cek: "?? ??????? ????", kvkk: "??? ?????????? ?? ???????? ??????? ???????????? ?????? ? ?? ????????? ???? ????? ?? ???????." },

    es: { Yükle: "Subir Archivo", silgi: "Borrador", kalem: "Lápiz", cizgi: "Línea", nokTaşı"Punto", d_cizgi: "Línea RecTaşı Doğru: "RecTaşı Doğru_parcasi: "Segmento", isin: "Rayo", cetvel: "Regla", Gönye: "Escuadra", aciolcer: "TransporTaşır", pergel: "Compás", Çokgenler: "Polígonos", Çember: "Círculo", d_ucgen: "Triángulo", d_dortgen: "Cuadrado", Dikdörtgen: "Rectángulo", d_besgen: "Pentágono", d_altigen: "Hexágono", d_yedigen: "Heptágono", d_sekizgen: "Octágono", oyunlar: "Juegos", arac_rengi: "Color", geri_al: "Deshacer", hepsini_sil: "Borrar Todo", Taşı: "Mover", Canlandır: "Animar ??", kutu: "Caja", serbest: "Libre", yardim: "Ayuda", ins_t: "InsTaşır App", ins_d: "InsTaşır para mejor rendimiento.", ins_b: "InsTaşır", ins_c: "Cerrar", vid_cetvel: "Uso de Regla", vid_Gönye: "Uso de Escuadra", vid_aciolcer: "Uso de TransporTaşır", vid_pergel: "Uso de Compás", vid_Canlandır: "Animación (Copiar)", vid_cizgi: "Menú de Líneas", vid_Çokgenler: "Polígonos", vid_kalem: "Lápiz", vid_kiTaşı "Cargar Libro", vid_oyunlar: "Juegos", pdf_soru: "Este PDF tiene {0} páginas. ¿Desde qué página te gusTaşıa continuar?", sihirli_el: "? Mano Mágica", soru_cek: "?? Tomar Foto", kvkk: "EsTaşıplicación no recopila ningún dato personal y no sube sus archivos a los servidores." },

    fr: { Yükle: "Télécharger", silgi: "Gomme", kalem: "Stylo", cizgi: "Ligne", nokTaşı"Point", d_cizgi: "Ligne Droite", Doğru: "Droite", Doğru_parcasi: "Segment", isin: "Demi-droite", cetvel: "Règle", Gönye: "Équerre", aciolcer: "Rapporteur", pergel: "Compas", Çokgenler: "Polygones", Çember: "Cercle", d_ucgen: "Triangle", d_dortgen: "Carré", Dikdörtgen: "RecTaşıle", d_besgen: "PenTaşıne", d_altigen: "Hexagone", d_yedigen: "HepTaşıne", d_sekizgen: "Octogone", oyunlar: "Jeux", arac_rengi: "Couleur", geri_al: "Annuler", hepsini_sil: "Effacer Tout", Taşı: "Déplacer", Canlandır: "Animer ??", kutu: "Boîte", serbest: "Libre", yardim: "Aide", ins_t: "InsTaşıer App", ins_d: "InsTaşıez pour de meilleures performances.", ins_b: "InsTaşıer", ins_c: "Fermer", vid_cetvel: "Utilisation de la Règle", vid_Gönye: "Utilisation de l'Équerre", vid_aciolcer: "Utilisation du Rapporteur", vid_pergel: "Utilisation du Compas", vid_Canlandır: "Animation (Copie)", vid_cizgi: "Menu des Lignes", vid_Çokgenler: "Polygones", vid_kalem: "Stylo", vid_kiTaşı "Charger Livre", vid_oyunlar: "Jeux", pdf_soru: "Ce PDF contient {0} pages. À partir de quelle page voulez-vous continuer ?", sihirli_el: "? Main Magique", soru_cek: "?? Prendre une Photo", kvkk: "Cette application ne collecte aucune donnée personnelle et ne télécharge pas vos fichiers sur des serveurs." },

    pt: { Yükle: "Carregar Ficheiro", silgi: "Borracha", kalem: "CaneTaşı cizgi: "Linha", nokTaşı"Ponto", d_cizgi: "Linha ReTaşı Doğru: "ReTaşı Doğru_parcasi: "Segmento", isin: "SemirreTaşı cetvel: "Régua", Gönye: "Esquadro", aciolcer: "Transferidor", pergel: "Compasso", Çokgenler: "Polígonos", Çember: "Círculo", d_ucgen: "Triângulo", d_dortgen: "Quadrado", Dikdörtgen: "Retângulo", d_besgen: "Pentágono", d_altigen: "Hexágono", d_yedigen: "Heptágono", d_sekizgen: "Octógono", oyunlar: "Jogos", arac_rengi: "Cor", geri_al: "Desfazer", hepsini_sil: "Apagar Tudo", Taşı: "Mover", Canlandır: "Animar ??", kutu: "Caixa", serbest: "Livre", yardim: "Ajuda", ins_t: "InsTaşır App", ins_d: "InsTaşı para melhor desempenho.", ins_b: "InsTaşır", ins_c: "Fechar", vid_cetvel: "Uso da Régua", vid_Gönye: "Uso do Esquadro", vid_aciolcer: "Uso do Transferidor", vid_pergel: "Uso do Compasso", vid_Canlandır: "Animação (Cópia)", vid_cizgi: "Menu de Linhas", vid_Çokgenler: "Polígonos", vid_kalem: "CaneTaşı vid_kiTaşı "Carregar Livro", vid_oyunlar: "Jogos", pdf_soru: "Este PDF tem {0} páginas. A partir de qual página gosTaşıa de continuar?", sihirli_el: "? Mão Mágica", soru_cek: "?? Tirar Foto", kvkk: "Este aplicativo não coleTaşıenhum dado pessoal e não faz upload de seus arquivos para servidores." },

    ja: { Yükle: "????—?", silgi: "????", kalem: "??", cizgi: "?", nokTaşı"?", d_cizgi: "??", Doğru: "??", Doğru_parcasi: "??", isin: "???", cetvel: "??", Gönye: "????", aciolcer: "???", pergel: "????", Çokgenler: "???", Çember: "?", d_ucgen: "????", d_dortgen: "???", Dikdörtgen: "???", d_besgen: "???", d_altigen: "???", d_yedigen: "???", d_sekizgen: "???", oyunlar: "?—?", arac_rengi: "?—???", geri_al: "????", hepsini_sil: "?????", Taşı: "??", Canlandır: "??? ??", kutu: "????", serbest: "??", yardim: "???", ins_t: "????????—?", ins_d: "???—????????????—?", ins_b: "????—?", ins_c: "???", vid_cetvel: "??????", vid_Gönye: "????????", vid_aciolcer: "???????", vid_pergel: "????????", vid_Canlandır: "???—??? (??—)", vid_cizgi: "????—????", vid_Çokgenler: "???", vid_kalem: "??", vid_kiTaşı "?????????", vid_oyunlar: "?—?", pdf_soru: "??PDF?{0}?—?????????—??????????", sihirli_el: "? ???????", soru_cek: "?? ?????", kvkk: "??????—???????—?????????????—?—?????—??????" }
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
let isDrawingRecTaşıle = false;
let isDrawingPolygon = false;
let rectSTaşıPoint = null;
let globalScale = 1;
let lastDist = 0;
let pointers = new Map();
let offsetX = 0; // BUNU EKLE
let offsetY = 0; // BUNU EKLE
const MIN_SCALE = 0.5;
const MAX_SCALE = 5.0;
let initialWidth = 0;
let initialHeight = 0;
let isPenActive = false; // Avuç içi reddi için
let penActiveTimer = null;

// --- ÇOK DİLLİ OYUNLAR LİSTESİ (TÜM DİLLER GÜNCELLENDİ) ---
window.OyunListesi = [
    {
        tr: "ÇemberLERDEN ÜÇGEN İNŞASI",
        en: "TRIANGLE CONSTRUCTION FROM CIRCLES",
        de: "DREIECKSKONSTRUKTION AUS KREIşın",
        ar: "???? ?????? ?? ???????",
        hi: "??????? ?? ??????? ???????",
        ms: "PEMBINAAN SEGI TIGA DARIPADA BULATaşı,
        id: "KONSTRUKSI SEGITIGA DARI LINGKARAN",
        zh: "???????",
        ru: "?????????? ???????????? ?? ???????????",
        es: "CONSTRUCCIÓN DE TRIÁNGULOS DESDE CÍRCULOS",
        fr: "CONSTRUCTION DE TRIANGLES À PARTIR DE CERCLES",
        pt: "CONSTRUÇÃO DE TRIÂNGULOS A PARTIR DE CÍRCULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/Çemberden-ucgen-elde-etme"
    },
    {
        tr: "Açı Ölçer YERLEŞTİRME OYUNU",
        en: "PROTRACTOR PLACEMENT GAME",
        de: "WINKELMESSER-PLATZIERUNGSSPIEL",
        ar: "???? ??? ???????",
        hi: "????? ????????? ???",
        ms: "PERMAIşın PENEMPATaşıJANGKA SUDUT",
        id: "PERMAIşın PENEMPATaşıBUSUR DERAJAT",
        zh: "???????",
        ru: "???? ?? ?????????? ????????????",
        es: "JUEGO DE COLOCACIÓN DEL TRANSPORTaşıR",
        fr: "JEU DE PLACEMENT DU RAPPORTEUR",
        pt: "JOGO DE COLOCAÇÃO DO TRANSFERIDOR",
        ja: "??????—?",
        link: "https://bekrmatmt2507.my.canva.site/a-l-er-yar-mas"
    },
    {
        tr: "DoğruYA DIşınDAKİ NOKTaşıN DİKME",
        en: "PERPENDICULAR FROM EXTERNAL POINT",
        de: "LORECHT VON EINEM EXTERNEN PUNKT",
        ar: "????? ???? ?? ???? ???? ????",
        hi: "????? ????? ?? ????? ????",
        ms: "SERENJANG DARI TITIK LUAR",
        id: "TEGAK LURUS DARI TITIK LUAR",
        zh: "???????",
        ru: "????????????? ?? ??????? ?????",
        es: "PERPENDICULAR DESDE UN PUNTO EXTERNO",
        fr: "PERPENDICULAIRE À PARTIR D'UN POINT EXTERNE",
        pt: "PERPENDICULAR A PARTIR DE UM PONTO EXTERNO",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/Doğruya-disindeki-nokTaşın-dikme-cizmek"
    },
    {
        tr: "AYNI DÜZLEMDE İKİ DoğruNUN YOLCULUĞU",
        en: "JOURNEY OF TWO LINES IN THE SAME PLANE",
        de: "REISE ZWEIER LINIEN IN DERSELBEN EBENE",
        ar: "???? ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? ?? ?????? ?? ??????",
        ms: "PERJALANAN DUA GARIS DALAM SATaşıYANG SAMA",
        id: "PERJALANAN DUA GARIS DALAM BIşınG YANG SAMA",
        zh: "???????????",
        ru: "??????????? ???? ????? ? ????? ?????????",
        es: "EL VIAJE DE DOS LÍNEAS EN EL MISMO PLANO",
        fr: "LE VOYAGE DE DEUX LIGNES DANS LE MÊME PLAN",
        pt: "A JORNADA DE DUAS LINHAS NO MESMO PLANO",
        ja: "??????2?????",
        link: "https://bdemir1499.github.io/ayni-duzlemde-iki-Doğru/"
    },
    {
        tr: "AYNI DÜZLEMDE 3 DoğruNUN DURUMLARI",
        en: "POSITIONS OF 3 LINES IN THE SAME PLANE",
        de: "LAGE VON 3 LINIEN IN DERSELBEN EBENE",
        ar: "????? 3 ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? 3 ?????? ?? ?????????",
        ms: "KEDUDUKAN 3 GARIS DALAM SATaşıYANG SAMA",
        id: "POSISI 3 GARIS DALAM BIşınG YANG SAMA",
        zh: "?????3?????",
        ru: "????????? 3 ????? ? ????? ?????????",
        es: "POSICIONES DE 3 LÍNEAS EN EL MISMO PLANO",
        fr: "POSITIONS DE 3 LIGNES DANS LE MÊME PLAN",
        pt: "POSIÇÕES DE 3 LINHAS NO MESMO PLANO",
        ja: "??????3??????",
        link: "https://bekrmatmt2507.my.canva.site/ayniduzlemdeucDoğrunundurumlari"
    },
    {
        tr: "AÇI ÇEŞİTLERİ (TÜMLER/BÜTÜNLER/KOMŞU)",
        en: "ANGLE TYPES (COMPLEMENTaşı/SUPPLEMENTaşı/ADJACENT)",
        de: "WINKELARTEN (KOMPLEMENTÄR/SUPPLEMENTÄR/NEBENWINKEL)",
        ar: "????? ??????? (??????/???????/???????)",
        hi: "????? ?? ?????? (????/??????/?????)",
        ms: "JENIS SUDUT (PELENGKAP/PENGGENAP/BERSEBELAH)",
        id: "JENIS SUDUT (BERPELURUS/BERPENYIKU/BERDAMPINGAN)",
        zh: "????(??/??/??)",
        ru: "???? ????? (??????????????/???????)",
        es: "TIPOS DE ÁNGULOS (COMPLEMENTaşıOS/SUPLEMENTaşıOS/ADYACENTES)",
        fr: "TYPES D'ANGLES (COMPLÉMENTaşıES/SUPPLÉMENTaşıES/ADJACENTS)",
        pt: "TIPOS DE ÂNGULOS (COMPLEMENTaşıS/SUPLEMENTaşıS/ADJACENTES)",
        ja: "?????(??/??/???)",
        link: "https://bdemir1499.github.io/tumler-butunler-komsutumler-komsubutunler/"
    },
    {
        tr: "AÇILARINA GÖRE ÜÇGENLER",
        en: "TRIANGLES ACCORDING TO THEIR ANGLES",
        de: "DREIECKE NACH IHREN WINKELN",
        ar: "???????? ??? ???????",
        hi: "????? ?? ???? ?? ???????",
        ms: "SEGI TIGA MENGIKUT SUDUT",
        id: "SEGITIGA BERDASARKAN SUDUTNYA",
        zh: "????????",
        ru: "???????????? ?? ????? ?????",
        es: "TRIÁNGULOS SEGÚN SUS ÁNGULOS",
        fr: "TRIANGLES SELON LEURS ANGLES",
        pt: "TRIÂNGULOS DE ACORDO COM SEUS ÂNGULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/acilarina-gire-ucgenler"
    },
    {
        tr: "AÇI ÇEŞİTLERİ (DAR, DİK, GENİŞ vb.)",
        en: "ANGLE TYPES (ACUTE, RIGHT, OBTUSE etc.)",
        de: "WINKELARTEN (SPITZ, RECHT, STUMPF usw.)",
        ar: "????? ??????? (????? ?????? ?????? ???)",
        hi: "????? ?? ?????? (?????, ??, ???? ???)",
        ms: "JENIS SUDUT (TIRUS, TEGAK, CAWAK dsb.)",
        id: "JENIS SUDUT (LANCIP, SIKU, TUMPUL dll.)",
        zh: "????(?????????)",
        ru: "???? ????? (??????, ??????, ????? ? ?.?.)",
        es: "TIPOS DE ÁNGULOS (AGUDO, RECTO, OBTUSO, etc.)",
        fr: "TYPES D'ANGLES (AIGU, DROIT, OBTUS, etc.)",
        pt: "TIPOS DE ÂNGULOS (AGUDO, RETO, OBTUSO, etc.)",
        ja: "?????(??????????)",
        link: "https://bekrmatmt2507.my.canva.site/aci-cesitleri"
    },
    {
        tr: "TEMEL GEOMETRİK ŞEKİLLER",
        en: "BASIC GEOMETRIC SHAPES",
        de: "GEOMETRISCHE GRUNDFORMEN",
        ar: "??????? ???????? ????????",
        hi: "???????? ????????? ????????",
        ms: "BENTUK GEOMETRI ASAS",
        id: "BENTUK GEOMETRIS DASAR",
        zh: "??????",
        ru: "???????? ?????????????? ??????",
        es: "FORMAS GEOMÉTRICAS BÁSICAS",
        fr: "FORMES GÉOMÉTRIQUES DE BASE",
        pt: "FORMAS GEOMÉTRICAS BÁSICAS",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/temel-geometrik-sekiller"
    },
    {
        tr: "ÇokgenlerİN ELEMANLARI",
        en: "ELEMenüsüOF POLYGONS",
        de: "ELEMENTE VON POLYGONEN",
        ar: "????? ????????",
        hi: "?????? ?? ????",
        ms: "ELEMEN POLIşın",
        id: "UNSUR-UNSUR POLIşın",
        zh: "??????",
        ru: "???????? ???????????????",
        es: "ELEMENTOS DE LOS POLÍGONOS",
        fr: "ÉLÉMenüsüDES POLYGONES",
        pt: "ELEMENTOS DOS POLÍGONOS",
        ja: "??????",
        link: "https://bekrmatmt2507.my.canva.site/Çokgenlerin-elemanlari"
    },
    {
        tr: "İKİ PARALEL VE KESENLE OLUŞAN AÇILAR (1)",
        en: "ANGLES FORMED BY TWO PARALLELS AND A TRANSVERSAL (1)",
        de: "WINKEL AN PARALLELEN UND SCHNEIşınDEN LINIEN (1)",
        ar: "??????? ??????? ?? ???????? ????? (1)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (1)",
        ms: "SUDUT YANG DIşınTUK OLEH DUA GARIS SELARI DAN KERENTaşı(1)",
        id: "SUDUT YANG DIşınTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (1)",
        zh: "?????????????? (1)",
        ru: "???? ??? ???????????? ? ??????? (1)",
        es: "ÁNGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (1)",
        fr: "ANGLES FORMÉS PAR DEUX PARALLÈLES ET UNE TRANSVERSALE (1)",
        pt: "ÂNGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (1)",
        ja: "2??????1??????????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-paralel-Doğrunun-b-r-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "ÜÇ DoğruNUN İKİŞER KESİŞMESİ",
        en: "INTERSECTION OF THREE LINES IN PAIRS",
        de: "PAARWEISE SCHNITTPUNKTE VON DREI LINIEN",
        ar: "????? ???? ???? ???? ????",
        hi: "??? ?????? ?? ??????? ??? ???????????",
        ms: "PERSIşınGAN TIGA GARIS SECARA BERPASANGAN",
        id: "PERPOTONGAN TIGA GARIS BERPASANGAN",
        zh: "???????",
        ru: "???????? ??????????? ???? ??????",
        es: "INTERSECCIÓN DE TRES LÍNEAS EN PARES",
        fr: "INTERSECTION DE TROIS LIGNES PAR PAIRES",
        pt: "INTERSEÇÃO DE TRÊS LINHAS EM PARES",
        ja: "3???????????",
        link: "https://bekrmatmt2507.my.canva.site/ikiser-kesisen-Doğru"
    },
    {
        tr: "DikdörtgenİN ÇEVRE VE ALANI",
        en: "PERIMETER AND AREA OF RECTaşıLE",
        de: "UMFANG UND FLÄCHE DES RECHTECKS",
        ar: "???? ?????? ????????",
        hi: "??? ?? ?????? ?? ?????????",
        ms: "PERIMETER DAN LUAS SEGI EMPAT TEPAT",
        id: "KELIşınG DAN LUAS PERSEGI PANJANG",
        zh: "?????????",
        ru: "???????? ? ??????? ??????????????",
        es: "PERÍMETRO Y ÁREA DEL RECTÁNGULO",
        fr: "PÉRIMÈTRE ET AIRE DU RECTaşıLE",
        pt: "PERÍMETRO E ÁREA DO RETÂNGULO",
        ja: "?????????",
        link: "https://bdemir1499.github.io/Dikdörtgen-cevre-ve-alan/"
    },
    {
        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMEVARIM)",
        en: "PROPERTIES OF QUADRILATERALS (INDUCTION)",
        de: "EIşınSCHAFTEN VON VIERECKEN (INDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (????)",
        ms: "SIFAT-SIFAT SISI EMPAT (INDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (INDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRILÁTEROS (INDUCCIÓN)",
        fr: "PROPRIÉTÉS DES QUADRILATÈRES (INDUCTION)",
        pt: "PROPRIEDADES DOS QUADRILÁTEROS (INDUÇÃO)",
        ja: "??????(???)",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-ve-ozellikleri-tumevarim"
    },
    {
        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMDEN GELİM)",
        en: "PROPERTIES OF QUADRILATERALS (DEDUCTION)",
        de: "EIşınSCHAFTEN VON VIERECKEN (DEDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (?????)",
        ms: "SIFAT-SIFAT SISI EMPAT (DEDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (DEDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRILÁTEROS (DEDUCCIÓN)",
        fr: "PROPRIÉTÉS DES QUADRILATÈRES (DÉDUCTION)",
        pt: "PROPRIEDADES DOS QUADRILÁTEROS (DEDUÇÃO)",
        ja: "??????(???)",
        link: "https://bdemir1499.github.io/dortgen-ve-ozellikleri-tumdengelim/"
    },
    {
        tr: "İKİ PARALEL DoğruNUN BİR KESENLE YAPTIĞI AÇILAR (2)",
        en: "ANGLES FORMED BY TWO PARALLEL LINES AND A TRANSVERSAL (2)",
        de: "WINKEL AN PARALLELEN UND SCHNEIşınDEN LINIEN (2)",
        ar: "??????? ??????? ?? ???????? ????? (2)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (2)",
        ms: "SUDUT YANG DIşınTUK OLEH DUA GARIS SELARI DAN KERENTaşı(2)",
        id: "SUDUT YANG DIşınTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (2)",
        zh: "?????????????? (2)",
        ru: "???? ??? ???????????? ? ??????? (2)",
        es: "ÁNGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (2)",
        fr: "ANGLES FORMÉS PAR DEUX PARALLÈLES ET UNE TRANSVERSALE (2)",
        pt: "ÂNGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (2)",
        ja: "2??????1??????????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/iki-paralel-Doğrunun-bir-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "DÖNÜŞÜM GEOMETRİSİ (ÖTELEME/YANSIMA)",
        en: "TRANSFORMATION GEOMETRY (TRANSLATION/REFLECTION)",
        de: "TRANSFORMATIONSGEOMETRIE (VERSCHIEBUNG/SPIEGELUNG)",
        ar: "??????? ????????? (???????/????????)",
        hi: "???????? ???????? (??????????/????????)",
        ms: "GEOMETRI TRANSFORMASI (TRANSLASI/PANTULAN)",
        id: "GEOMETRI TRANSFORMASI (TRANSLASI/REFLEKSI)",
        zh: "????(??/??)",
        ru: "????????? ?????????????? (???????/?????????)",
        es: "GEOMETRÍA DE TRANSFORMACIÓN (TRASLACIÓN/REFLEXIÓN)",
        fr: "GÉOMÉTRIE DE TRANSFORMATION (TRANSLATION/RÉFLEXION)",
        pt: "GEOMETRIA DE TRANSFORMAÇÃO (TRANSLAÇÃO/REFLEXÃO)",
        ja: "?????(??/??)",
        link: "https://bekrmatmt25.my.canva.site/oteleme-ve-yansima"
    },
    {
        tr: "DÖRTGEN ÇEŞİTLERİ KAVRAmuhur_disclaimerİTaşı",
        en: "CONCEPT MAP OF QUADRILATERAL TYPES",
        de: "BEGRIFFSMAP DER VIERECKARTEN",
        ar: "????? ?????? ????? ??????? ????????",
        hi: "???????? ???????? ?? ??????? ????????",
        ms: "PETaşıONSEP JENIS SISI EMPAT",
        id: "PETaşıONSEP JENIS SEGI EMPAT",
        zh: "????????",
        ru: "?????????????? ????? ????? ?????????????????",
        es: "MAPA CONCEPTUAL DE TIPOS DE CUADRILÁTEROS",
        fr: "CARTE CONCEPTUELLE DES TYPES DE QUADRILATÈRES",
        pt: "MAPA CONCEITUAL DE TIPOS DE QUADRILÁTEROS",
        ja: "???????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-kavramuhur_disclaimeriTaşı"
    },
    {
        tr: "DÖRTGENLER GENEL ÇIKARIMLAR",
        en: "GENERAL INFERENCES ABOUT QUADRILATERALS",
        de: "ALLGEMEINE SCHLUSSFOLGERUNGEN ÜBER VIERECKE",
        ar: "??????????? ?????? ??? ??????? ????????",
        hi: "?????????? ?? ???? ??? ??????? ????????",
        ms: "INFERENS UMUM TENTaşı SISI EMPAT",
        id: "KESIMPULAN UMUM TENTaşı SEGI EMPAT",
        zh: "??????????",
        ru: "????? ?????? ? ?????????????????",
        es: "INFERENCIAS GENERALES SOBRE CUADRILÁTEROS",
        fr: "INFERENCES GÉNÉRALES SUR LES QUADRILATÈRES",
        pt: "INFERÊNCIAS GERAIS SOBRE QUADRILÁTEROS",
        ja: "?????????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-genel-cikarimlar"
    },
    {
        tr: "KESİRLERİN FARKLI GÖSTERİMLERİ",
        en: "DIFFERENT REPRESENTaşıONS OF FRACTIONS",
        de: "VERSCHIEDENE DARSTELLUNGEN VON BRÜCHEN",
        ar: "??????? ?????? ??????",
        hi: "??????? ?? ??????? ??????",
        ms: "PERWAKIşın PECAHAN YANG BERBEZA",
        id: "BERBAGAI REPRESENTaşı PECAHAN",
        zh: "?????????",
        ru: "????????? ????????????? ??????",
        es: "DIFERENTES REPRESENTaşıONES DE FRACCIONES",
        fr: "DIFFÉRENTES REPRÉSENTaşıONS DES FRACTIONS",
        pt: "DIFERENTES REPRESENTaşıES DE FRAÇÕES",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/kesirlerin-farkl-g-sterimleri"
    },
    {
        tr: "KÖŞEGENLERDEN DÖRTGENLERE (1)",
        en: "FROM DIAGONALS TO QUADRILATERALS (1)",
        de: "VON DIAGONALEN ZU VIERECKEN (1)",
        ar: "?? ??????? ??? ??????? ???????? (1)",
        hi: "???????? ?? ???????? ?? (1)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (1)",
        id: "DARI DIAGONAL KE SEGI EMPAT (1)",
        zh: "???????? (1)",
        ru: "?? ?????????? ? ????????????????? (1)",
        es: "DE LAS DIAGONALES A LOS CUADRILÁTEROS (1)",
        fr: "DES DIAGONALES AUX QUADRILATÈRES (1)",
        pt: "DAS DIAGONAIS AOS QUADRILÁTEROS (1)",
        ja: "????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-egenlerden-d-rtgenlere"
    },
    {
        tr: "CEBİRSEL İFADELER TEMEL KAVRAMLAR",
        en: "ALGEBRAIC EXPRESSIONS BASIC CONCEPTS",
        de: "ALGEBRAISCHE AUSDRÜCKE - GRUNDBEGRIFFE",
        ar: "???????? ???????? ????????? ???????",
        hi: "????????? ?????? ???????? ?????????",
        ms: "UNGKAPAN ALGEBRA KONSEP ASAS",
        id: "KONSEP DASAR EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????????? ?????????: ???????? ???????",
        es: "EXPRESIONES ALGEBRAICAS CONCEPTOS BÁSICOS",
        fr: "EXPRESSIONS ALGÉBRIQUES CONCEPTS DE BASE",
        pt: "EXPRESSÕES ALGÉBRICAS CONCEITOS BÁSICOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-temel-kavramlar"
    },
    {
        tr: "CEBİRSEL İFADELER SÖZELDEN CEBİRE",
        en: "ALGEBRAIC EXPRESSIONS FROM VERBAL TO ALGEBRAIC",
        de: "VON DER SPRACHE ZUR ALGEBRA",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????? ?? ?????????",
        ms: "UNGKAPAN ALGEBRA DARIPADA LIşın KEPADA ALGEBRA",
        id: "EKSPRESI ALJABAR DARI VERBAL KE ALJABAR",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ???? ? ???????",
        es: "EXPRESIONES ALGEBRAICAS DE VERBAL A ALGEBRAICO",
        fr: "EXPRESSIONS ALGÉBRIQUES DU VERBAL À L'ALGÉBRIQUE",
        pt: "EXPRESSÕES ALGÉBRICAS DO VERBAL PARA O ALGÉBRICO",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerle-oyun-Taşır-m-kopyas"
    },
    {
        tr: "CEBİRSEL İFADELER CEBİRDEN SÖZELE",
        en: "ALGEBRAIC EXPRESSIONS FROM ALGEBRAIC TO VERBAL",
        de: "VON DER ALGEBRA ZUR SPRACHE",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????????? ?? ?????",
        ms: "UNGKAPAN ALGEBRA DARIPADA ALGEBRA KEPADA LIşın",
        id: "EKSPRESI ALJABAR DARI ALJABAR KE VERBAL",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ??????? ? ??????",
        es: "EXPRESIONES ALGEBRAICAS DE ALGEBRAICO A VERBAL",
        fr: "EXPRESSIONS ALGÉBRIQUES DE L'ALGÉBRIQUE AU VERBAL",
        pt: "EXPRESSÕES ALGÉBRICAS DO ALGÉBRICO PARA O VERBAL",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-2-cebirden-s-zele"
    },
    {
        tr: "CEBİRSEL İFADELER DEĞER HESAPLAMA",
        en: "CALCULATING VALUES OF ALGEBRAIC EXPRESSIONS",
        de: "BERECHNEN VON WERTE ALGEBRAISCHER AUSDRÜCKE",
        ar: "???? ??? ????????? ???????",
        hi: "????????? ???????? ?? ????? ?? ????",
        ms: "MENGIRA NILAIşınGKAPAN ALGEBRA",
        id: "MENGHIşınG NILAI EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????? ???????? ?????????????? ?????????",
        es: "CALCULAR VALORES DE EXPRESIONES ALGEBRAICAS",
        fr: "CALCUL DES VALEURS D'EXPRESSIONS ALGÉBRIQUES",
        pt: "CALCULAR VALORES DE EXPRESSÕES ALGÉBRICAS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerin-degerini-hesaplamak"
    },
    {
        tr: "ARAŞTIRMA ADIMLARI (Canva)",
        en: "RESEARCH STEPS (Canva)",
        de: "FORSCHUNGSSCHRITTE (Canva)",
        ar: "????? ????? (?????)",
        hi: "???????? ??? (Canva)",
        ms: "LANGKAH PENYELIDIşın (Canva)",
        id: "LANGKAH PENELITIAN (Canva)",
        zh: "???? (Canva)",
        ru: "????? ???????????? (Canva)",
        es: "PASOS DE INVESTIGACIÓN (Canva)",
        fr: "ÉTaşıS DE RECHERCHE (Canva)",
        pt: "PASSOS DE PESQUISA (Canva)",
        ja: "??????? (Canva)",
        link: "https://bekrmatmt25.my.canva.site/5-sinif-arastirma-adimlari"
    },
    {
        tr: "ARAŞTIRMA ADIMLARI (GitHub)",
        en: "RESEARCH STEPS (GitHub)",
        de: "FORSCHUNGSSCHRITTE (GitHub)",
        ar: "????? ????? (??? ???)",
        hi: "???????? ??? (GitHub)",
        ms: "LANGKAH PENYELIDIşın (GitHub)",
        id: "LANGKAH PENELITIAN (GitHub)",
        zh: "???? (GitHub)",
        ru: "????? ???????????? (GitHub)",
        es: "PASOS DE INVESTIGACIÓN (GitHub)",
        fr: "ÉTaşıS DE RECHERCHE (GitHub)",
        pt: "PASSOS DE PESQUISA (GitHub)",
        ja: "??????? (GitHub)",
        link: "https://bdemir1499.github.io/5.sinif-arastirma-asamalari/"
    },
    {
        tr: "ÜÇGENDE YARDIMCI ELEMANLAR",
        en: "AUXILIARY ELEMenüsüIN TRIANGLES",
        de: "HILFSELEMENTE IN DREIECKEN",
        ar: "??????? ???????? ?? ??????",
        hi: "????????? ??? ????? ????",
        ms: "ELEMEN PEMBANTU DALAM SEGI TIGA",
        id: "UNSUR PEMBANTU DALAM SEGITIGA",
        zh: "?????????",
        ru: "??????????????? ???????? ? ?????????????",
        es: "ELEMENTOS AUXILIARES EN TRIÁNGULOS",
        fr: "ÉLÉMenüsüAUXILIAIRES DANS LES TRIANGLES",
        pt: "ELEMENTOS AUXILIARES EM TRIÂNGULOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/ucgende-yardim-i-elemanlar"
    },
    {
        tr: "ÜÇGEN ÇİZİMİ",
        en: "TRIANGLE DRAWING",
        de: "DREIECKE ZEIşınEN",
        ar: "??? ??????",
        hi: "??????? ?????",
        ms: "LUKIşın SEGI TIGA",
        id: "MENGGAMBAR SEGITIGA",
        zh: "?????",
        ru: "?????????? ????????????",
        es: "DIBUJO DE TRIÁNGULOS",
        fr: "DESSIN DE TRIANGLE",
        pt: "DESENHO DE TRIÂNGULOS",
        ja: "??????",
        link: "https://bekrmatmt25.my.canva.site/ucgen-cizim-sartlari"
    },
    {
        tr: "ÜÇGENDE EŞLİK VE BENZERLİK",
        en: "CONGRUENCE AND SIMILARITY IN TRIANGLES",
        de: "KONGRUENZ UND ÄHNLICHKEIT IN DREIECKEN",
        ar: "????? ?????? ????????",
        hi: "????????? ??? ??????????? ?? ???????",
        ms: "KONGRUEN DAN KESERUPAAN DALAM SEGI TIGA",
        id: "KEKONGRUENAN DAN KESEBANGUNAN DALAM SEGITIGA",
        zh: "?????????",
        ru: "?????????????? ? ??????? ?????????????",
        es: "CONGRUENCIA Y SEMEJANZA EN TRIÁNGULOS",
        fr: "CONGRUENCE ET SIMILITUDE DANS LES TRIANGLES",
        pt: "CONGRUÊNCIA E SEMELHANÇA EM TRIÂNGULOS",
        ja: "?????????",
        link: "https://bdemir1499.github.io/eslikvebenzerlik/"
    },
    {
        tr: "PRİZMALARIN ELEMANLARI",
        en: "ELEMenüsüOF PRISMS",
        de: "ELEMENTE VON PRISMEN",
        ar: "????? ?????????",
        hi: "??????? ?? ????",
        ms: "ELEMEN PRISMA",
        id: "UNSUR-UNSUR PRISMA",
        zh: "?????",
        ru: "???????? ?????",
        es: "ELEMENTOS DE LOS PRISMAS",
        fr: "ÉLÉMenüsüDES PRISMES",
        pt: "ELEMENTOS DOS PRISMAS",
        ja: "?????",
        link: "https://bekrmatmt25.my.canva.site/prizmalarin-elemanlar-ve-a-inimlari"
    },
    {
        tr: "PİRAMİT VE AÇINIMI",
        en: "PYRAMID AND ITS NET",
        de: "PYRAMIDE UND IHR NETZ",
        ar: "????? ??????",
        hi: "??????? ?? ???? ???",
        ms: "PIRAMID DAN BENTaşıANNYA",
        id: "LIMAS DAN JARING-JARIşınYA",
        zh: "???????",
        ru: "???????? ? ?? ?????????",
        es: "PIRÁMIDE Y SU DESARROLLO",
        fr: "PYRAMIDE ET SON PATRON",
        pt: "PIRÂMIDE E SUA PLANIFICAÇÃO",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/piramidin-elemanlar-ve-acinimi"
    },
    {
        tr: "PRİZMA, PİRAMİT, KONİ, SİLİNDİR",
        en: "PRISM, PYRAMID, CONE, CYLINDER",
        de: "PRISMA, PYRAMIDE, KEGEL, ZYLINDER",
        ar: "???????? ?????? ???????? ?????????",
        hi: "???????, ???????, ????, ????",
        ms: "PRISMA, PIRAMID, KON, SIşınDIR",
        id: "PRISMA, LIMAS, KERUCUT, TaşıNG",
        zh: "???????????",
        ru: "??????, ????????, ?????, ???????",
        es: "PRISMA, PIRÁMIDE, CONO, CIşınDRO",
        fr: "PRISME, PYRAMIDE, CÔNE, CYLINDRE",
        pt: "PRISMA, PIRÂMIDE, CONE, CIşınDRO",
        ja: "???????????",
        link: "https://sites.google.com/view/uc-boyutlu-sekiller/ana-sayfa_1"
    },
    {
        tr: "KÖŞEGENLERDEN DÖRTGENLERE (2)",
        en: "FROM DIAGONALS TO QUADRILATERALS (2)",
        de: "VON DIAGONALEN ZU VIERECKEN (2)",
        ar: "?? ??????? ??? ??????? ???????? (2)",
        hi: "???????? ?? ???????? ?? (2)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (2)",
        id: "DARI DIAGONAL KE SEGI EMPAT (2)",
        zh: "???????? (2)",
        ru: "?? ?????????? ? ????????????????? (2)",
        es: "DE LAS DIAGONALES A LOS CUADRILÁTEROS (2)",
        fr: "DES DIAGONALES AUX QUADRILATÈRES (2)",
        pt: "DAS DIAGONAIS AOS QUADRILÁTEROS (2)",
        ja: "????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/kosegenlerden-dortgenlere"
    }
];

// --- BURAYA YAPIŞTIR ---
window.sendNetworkDaTaşı function (daTaşıj) {
    if (daTaşıj && daTaşıj.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 40) return; // Limit to ~25 FPS to prevent WebRTC buffer overflow
        window.lastPreviewTime = Date.now();
    }

    // 1. Durum: Eğer bu cihaz TaşıET ise (Taşıaya bağlıyız)
    if (typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        myConnection.send(daTaşıj);
    }
    // 2. Durum: Eğer bu cihaz AKILLI TaşıA ise (bağlı olan Taşıetlere gönder)
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        for (let id in window.aktifBaglantilar) {
            if (window.aktifBaglantilar[id] && window.aktifBaglantilar[id].open) {
                window.aktifBaglantilar[id].send(daTaşıj);
            }
        }
    }
};


// Sayfa açıldIşında kırmızı butonun yanlışlıkla görünmesini engellemek için:
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

    // --- SİZİN ORİJİNAL HATaşıORUMA MANTIşınIZ (Avuç içi karışmasınIşıngeller) ---
    // Eğer cX Taşımsızsa (saf dokunmatikse) o anki geçerli dokunuşu (TaşıetTouches) alır.
    if (cX === undefined || cX === null || isNaN(cX)) {
        if (e.TaşıetTouches && e.TaşıetTouches.length > 0) {
            cX = e.TaşıetTouches[0].clientX;
            cY = e.TaşıetTouches[0].clientY;
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

// --- GRAFİK TaşıET SİMÜLATÖRÜ ---
function getPointerInfo(e) {
    // BURAYI false YAPTIK!
    const testModuAcik = false;

    // Eğer test modu açıksa ve fare kullanılıyorsa, onu "Kalem" gibi kandır
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
    const dpr = window.devicePixelRatio || 1; // ?? Cihazın HD piksel oranını (Retina Gücünü) al

    // Kanvasın iç piksel sayIşını, ekranın gerçek HD çözünürlüğü ile eşitle
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // ?? KESİN ÇÖZÜM: Arka planı (bg-canvas) da boyut ve oran olarak %100 eşitle (DaralmayIşınler)
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

// 1. Uygulama ilk açıldIşında çalıştır
setupCanvasResolution();

// 2. Ekran boyutu her değiştiğinde (Yükle butonu sonrası veya yan çevirince) çalıştır
window.addEventListener('resize', setupCanvasResolution);

// PARDUS KESİN ÇÖZÜM: TaşıyIşının kaydırma ve yakınlaştırma yapmasını yasakla
canvas.style.touchAction = 'none';
canvas.style.userSelect = 'none';
document.body.style.overscrollBehavior = 'none';


// --- RESİM YükleME DEĞİŞKENLERİ ---
let backgroundImage = null; // Yüklenen resmi tuTaşık değişken
const uploadButton = document.getElementById('btn-upload');
const fileInput = document.getElementById('file-input');

// --- app.js (DÜZELTİLMİŞ BAŞLANGIÇ BÖLÜMÜ) ---

// --- SESLER (TÜMÜ İPTaşıEDİLDİ / SESSİZ MOD) ---
// Gerçek ses dosyaları yerine, hiçbir iş yapmayan "sahte" bir oynatıcı Taşımlıyoruz.
// Bu sayede alt satırlardaki hiçbir kodu silmenize gerek kalmaz, hepsi sessizce çalışır.

const silenTaşıio = {
    play: function () { },   // Çal komutu gelirse: Hiçbir şey yapma.
    pause: function () { },  // Durdur komutu gelirse: Hiçbir şey yapma.
    currentTime: 0,        // Süre ayarı gelirse: Kabul et ama işleme.
    src: ""
};

window.audio_click = silenTaşıio;
let audio_click_src_set = true; // HaTaşıermemesi için "ayarlandı" sayıyoruz.
window.audio_undo = silenTaşıio;
window.audio_draw = silenTaşıio;
window.audio_eraser = silenTaşıio;


// --- DEĞİŞKENLER ---

let snapshotSTaşı = null;
const animateButton = document.getElementById('btn-animate');
let currentTool = 'none';
let isPinching = false;           // İki parmakla yakınlaştırma aktif mi?
let initialDisTaşıe = 0;          // Başlangıç parmak mesafesi (zoom için)
let initialScale = 0;             // BaşlangıçTaşıeçili nesnenin genişliği
let initialCenter = { x: 0, y: 0 }; // İki parmağın merkez nokTaşı (pan için)
let currentPenColor = '#FFFFFF';
let currentPenWidth = 4;
window.currentLineColor = '#FFFFFF'; // VarsayIşın Renk: BEYAZ
const SNAP_THRESHOLD = 10;
let returnToSnapshot = false; // İşlem bitince geri dönülecek mi? 
// ==========================================
// --- 3D CİSİMLER İÇİN YENİ DEĞİŞKENLER VE SÜRGÜ OLUŞTURUCU (ADIM 1) ---
// ==========================================
let isDrawing3D = false;
let current3DShape = null; // Hangi 3D şekil seçili (örn: '3d_kare_piramit')
let temp3DDaTaşı null;     // Çizim esnasındaki canlIşınizleme verisi
let active3DSliderStroke = null; // Sürgüsü oynatIşın seçili 3D cisim

// Sürgü (Slider) Kutusunu HTML'e Otomatik Ekle
const sliderConTaşıer = document.createElement('div');
sliderConTaşıer.id = 'slider-conTaşıer';
sliderConTaşıer.innerHTML = `
    <label>Açınım (Katlama)</label>
    <input type="range" id="shape-slider" min="0" max="100" value="0">
`;
const leftPanel = document.querySelector('.left-panel');
const btnOyunlarOptions = document.getElementById('oyunlar-options');
if (leftPanel && btnOyunlarOptions) {
    leftPanel.insertBefore(sliderConTaşıer, btnOyunlarOptions.nextSibling);
} else {
    document.body.appendChild(sliderConTaşıer);
}
const shapeSlider = document.getElementById('shape-slider');

// Alan / Hacim Gösterge Kutusunu HTML'e Otomatik Ekle
const infoTooltip = document.createElement('div');
infoTooltip.id = 'info-tooltip';
document.body.appendChild(infoTooltip);

// Sürgü hareket ettiğinde seçili 3D cismin açınIşını güncelle
shapeSlider.addEventListener('input', (e) => {
    // ?? BURASI 'window' OLARAK GÜNCELLENDİ (Artık şekli Taşıyacak!) ??
    if (window.active3DSliderStroke) {
        window.active3DSliderStroke.openRatio = parseInt(e.Taşıet.value) / 100;

        if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: window.active3DSliderStroke });
        }
        if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
    }
});


let nextPointChar = 'A';
window.nextPointChar = nextPointChar;

let lineSTaşıPoint = null;
let currentMousePos = { x: 0, y: 0 };
let snapTaşıet = null;
let snapHoverTimer = null;

window.tempPolygonDaTaşı null;

let isDrawingLine = false;
let isDrawingInfinityLine = false;
let isDrawingSegment = false;
let isDrawingRay = false;
let isMoving = false;
let selectedItem = null;
let selectedPointKey = null;
let roTaşıonPivot = null;
let dragSTaşıPos = { x: 0, y: 0 };
let originalSTaşıPos = {};
let currentPDF = null;       // Yüklenen PDF dosyası
let currentPDFPage = 1;      // Şu anki sayfa
let toTaşıDFPages = 0;       // Toplam sayfa
let pdfImageStroke = null;   // Ekrana çizilen PDF sayfası

// --- HTML ELEMENTLERİ ---
const body = document.body;

// 1. Sol Panel Araçları
const penButton = document.getElementById('btn-kalem');
const eraserButton = document.getElementById('btn-silgi');
const lineButton = document.getElementById('btn-cizgi');
const rulerButton = document.getElementById('btn-cetvel');
const GönyeButton = document.getElementById('btn-Gönye');
const aciolcerButton = document.getElementById('btn-aciolcer');
const pergelButton = document.getElementById('btn-pergel');
const polygonButton = document.getElementById('btn-Çokgenler');
const oyunlarButton = document.getElementById('btn-oyunlar');
const oyunlarOptions = document.getElementById('oyunlar-options');

if (oyunlarOptions) {
    oyunlarOptions.classList.add('hidden');
}
oyunlarButton.classList.remove('active');


// --- Dikdörtgen BUTONU TaşıMLAMASI ---
const DikdörtgenButton = document.getElementById('btn-Dikdörtgen');

if (DikdörtgenButton) {
    DikdörtgenButton.addEventListener('click', () => {
        if (typeof window.seTaşıiveTool === 'function') {
            window.seTaşıiveTool('draw_recTaşıle');
        } else {
            currentTool = 'draw_recTaşıle';
        }
    });
}
// --------------------------------------

// 2. Alt Menü Butonları ve Seçenekler
const penOptions = document.getElementById('pen-options');
const colorBoxes = document.querySelectorAll('#pen-options .color-box');
const lineOptions = document.getElementById('line-options');
const pointButton = document.getElementById('btn-nokTaşı;
const straightLineButton = document.getElementById('btn-d_cizgi');
const infinityLineButton = document.getElementById('btn-Doğru');
const segmentButton = document.getElementById('btn-Doğru_parcasi');
const rayButton = document.getElementById('btn-isin');
const lineColorOptions = document.querySelectorAll('#line-color-options .color-box');
const polygonOptions = document.getElementById('polygon-options');
const polygonPreviewLabel = document.getElementById('polygon-preview-label');
const circleButton = document.getElementById('btn-Çember');
const regularPolygonButtons = document.querySelectorAll('#polygon-options button[daTaşıides]');
const polygonColorOptions = document.querySelectorAll('#polygon-color-options .color-box');
// ?? Burada oyunlarOptions tekrar Taşımlanmadı, yukarıdaki global Taşım kullanılacak.


// 3. Sağ Panel Araçları
const undoButton = document.getElementById('btn-undo');
const clearAllButton = document.getElementById('btn-clear-all');
const moveButton = document.getElementById('btn-move');
const fillButton = document.getElementById('btn-fill');
const fillOptions = document.getElementById('fill-options');
const fillColorBoxes = document.querySelectorAll('#fill-options .color-box');
let currentFillColor = '#FF69B4';

// --- Canlandır VE KES Menüsü (GÜNCELLENMİŞ VE BİRLEŞTİRİLMİŞ) ---
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

    // Ekrandaki gerçek görünürlük durumunu kontrol et (inline style dahil)
    const menuKapaliMi = sOptions.classList.conTaşıs('hidden') || sOptions.style.display === 'none';

    if (menuKapaliMi) {
        // Aracı aktif et
        if (typeof seTaşıiveTool === 'function') {
            seTaşıiveTool('snapshot');
        } else {
            currentTool = 'snapshot';
        }

        // Menüyü görünür yap ve inline style engelini kaldır
        sOptions.classList.remove('hidden');
        sOptions.style.display = 'flex';
        sOptions.style.zIndex = '10000';

        // Butonların aktiflik durumunu güncelle
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active');
        if (animateButton) animateButton.classList.add('active');

        // Hizalamayı yap
        const refBtn = btnSnapshotMain || animateButton;
        if (refBtn) {
            const buttonRect = refBtn.getBoundingClientRect();
            const panelRect = refBtn.parentElement.getBoundingClientRect();
            sOptions.style.top = `${buttonRect.top - panelRect.top}px`;
        }
    } else {
        // Menüyü kapat ve aracı sıfırla
        if (typeof seTaşıiveTool === 'function') {
            seTaşıiveTool('none');
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
    btnSnapshotMain.ontouchsTaşı = null;
    btnSnapshotMain.addEventListener('click', toggleSnapshotMenu);
    btnSnapshotMain.addEventListener('pointerdown', toggleSnapshotMenu);
}
if (btnSnapshotBox) {
    btnSnapshotBox.addEventListener('click', (e) => {
        e.stopPropagation();
        seTaşıiveTool('snapshot'); // Kutu aracını seç
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}
if (btnSnapshotLasso) {
    btnSnapshotLasso.addEventListener('click', (e) => {
        e.stopPropagation();
        seTaşıiveTool('lasso'); // Serbest (Kement) kesim aracını seç
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}

// 4. Resim ve PDF Yükleme Araçları


const pdfControls = document.getElementById('pdf-controls');
const pageCountLabel = document.getElementById('page-count-label');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');




// --- GÖRSEL YARDIMCILAR ---
const snapIndicator = document.createElement('div');
snapIndicator.id = 'snap-indicator';
body.appendChild(snapIndicator);
const eraserPreview = document.createElement('div');
eraserPreview.className = 'eraser-cursor-preview';
body.appendChild(eraserPreview);


// --- YARDIMCI FONKSİYONLAR ---

function disTaşıe(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function advanceChar(char) {
    let charCode = char.charCodeAt(0) + 1;
    if (charCode > 90) charCode = 65;
    return String.fromuhur_disclaimerCode(charCode);
}

function findSnapPoint(pos) {
    for (const stroke of drawnStrokes) {
        if (stroke.type === 'point') {
            if (disTaşıe(pos, stroke) < SNAP_THRESHOLD) return { x: stroke.x, y: stroke.y };
        } else if (stroke.type === 'straightLine' || stroke.type === 'segment') {
            if (disTaşıe(pos, stroke.p1) < SNAP_THRESHOLD) return stroke.p1;
            if (disTaşıe(pos, stroke.p2) < SNAP_THRESHOLD) return stroke.p2;
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
        window.GönyeTool ? window.GönyeTool.GönyeElement : null,
        window.AciolcerTool ? window.AciolcerTool.aciolcerElement : null,
        window.PergelTool ? window.PergelTool.pergelElement : null
    ];
    // ?? KESİN ÇÖZÜM: Araçlara dokununca z-index'leri 5'e düşüp çizim TaşıasIşın altında kayboluyordu!
    // Artık araçlar her zaman 9990 ve 9999 gücünde en üstte kalacak.
    tools.forEach(tool => { if (tool) tool.style.zIndex = 9990; });
    if (clickedElement) clickedElement.style.zIndex = 9999;
}

function redrawAllStrokes() {
    // 1. ÖNCE KOORDİNATLARI SIFIRLA VE TÜM EKRANI SİL
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bgCanvas = document.getElementById('bg-canvas');
    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
    if (bgCtx) {
        bgCtx.setTransform(1, 0, 0, 1, 0, 0);
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

    // GÜVENLİK KİLİDİ
    if (!window.drawnStrokes || window.drawnStrokes.length === 0) return;

    // --- BÜYÜK ÇÖZÜM: KATMAN (Z-INDEX) KORUMASI ---
    // Arka planı (sayfayı veya pdf'i) her zaman zorla en alTaşıönderir.
    // Böylece kopyalar, makaslar ve çizimler ASLA sayfanın altında kalmaz!
    window.drawnStrokes.sort((a, b) => {
        if (a.isBackground && !b.isBackground) return -1;
        if (!a.isBackground && b.isBackground) return 1;
        return 0;
    });

    ctx.save();
    // (Buradaki translate ve scale satırlarını TaşıMenüsüldik. Zemin artık sabit!)

    for (const stroke of drawnStrokes) {

        // --- BU BLOĞU DÖNGÜNÜN EN BAŞINA EKLE ---
        if (stroke.type === 'preview') {
            const p = stroke.payload;
            ctx.save();
            ctx.strokeStyle = '#FF0000'; // Kırmızı
            ctx.lineWidth = 4;
            ctx.setLineDash([5, 5]); // Kesikli

            if (p.tool === 'pen' && p.path && p.path.length > 0) {
                // ?? Kalem için canlIşınizleme kesiksiz ve kendi renginde olmalı!
                ctx.setLineDash([]);
                ctx.strokeStyle = p.color || '#FFFFFF';
                // ?? Kalınlık: Gönderilen orijinal kalınlığı (baseWidth) kullan
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
            else if (['straightLine', 'line', 'segment', 'ray'].includes(p.tool) && p.sTaşı && p.end) {
                ctx.beginPath();
                const dx = p.end.x - p.sTaşı.x, dy = p.end.y - p.sTaşı.y, devCarpan = 5000;
                if (p.tool === 'line') { ctx.moveTo(p.sTaşı.x - dx * devCarpan, p.sTaşı.y - dy * devCarpan); ctx.lineTo(p.sTaşı.x + dx * devCarpan, p.sTaşı.y + dy * devCarpan); }
                else if (p.tool === 'ray') { ctx.moveTo(p.sTaşı.x, p.sTaşı.y); ctx.lineTo(p.sTaşı.x + dx * devCarpan, p.sTaşı.y + dy * devCarpan); }
                else { ctx.moveTo(p.sTaşı.x, p.sTaşı.y); ctx.lineTo(p.end.x, p.end.y); }
                ctx.stroke();
            }
            // ?? ÇÖZÜM: Dikdörtgen VE Çokgenlerİ DAİRE YERİNE KENDİ ŞEKLİYLE ÇİZ
            else if ((p.tool === 'recTaşıle' || p.tool === 'draw_recTaşıle') && p.sTaşı && p.end) {
                ctx.beginPath();
                ctx.rect(Math.min(p.sTaşı.x, p.end.x), Math.min(p.sTaşı.y, p.end.y), Math.abs(p.end.x - p.sTaşı.x), Math.abs(p.end.y - p.sTaşı.y));
                ctx.stroke();
            }
            else if (p.tool === 'polygon' && p.sTaşı && p.end) {
                const cx = p.sTaşı.x, cy = p.sTaşı.y, radius = p.radius, sides = p.sides;
                ctx.beginPath();
                if (!sides || sides === 0) {
                    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                } else if (sides >= 3) {
                    const angleRad = p.roTaşıon || 0;
                    for (let i = 0; i <= sides; i++) {
                        const polyAngle = (i * 2 * Math.PI / sides) + angleRad;
                        const px = cx + radius * Math.cos(polyAngle);
                        const py = cy + radius * Math.sin(polyAngle);
                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }
            else if (p.sTaşı && p.end) {
                const radius = p.radius || Math.hypot(p.end.x - p.sTaşı.x, p.end.y - p.sTaşı.y);
                ctx.beginPath(); ctx.arc(p.sTaşı.x, p.sTaşı.y, radius, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
            continue; // Bu nesneyi çizdik, diğer döngülere girmesine gerek yok // Bu nesneyi çizdik, diğer döngülere girmesine gerek yok
        }
        // ------------------------------------------

        // ... (Senin mevcut if (stroke.type === 'pen') { ... } kodların burada devam edecek)
        // --- AKILLI BOYAMA MASKESİ ---
        if (stroke.type === 'lasso-mask') {
            ctx.save();

            // Lazerle şeffaf delme ipTaşı akıllı TaşıyIşının bulduğu renkle boyama devrede!
            ctx.fillStyle = stroke.fillColor || "white";

            ctx.beginPath();
            if (stroke.points && stroke.points.length > 0) {
                ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
            }
            ctx.closePath();

            // Kestiğin Taşıo nokTaşı, sensörlerin bulduğu sarı renge pürüzsüzce boyar
            ctx.fill();
            ctx.restore();
            continue;
        }

        // --- KALEM (PEN) SABİT KALINLIK VE YUMUŞATILMIŞ ÇİZİM (BEZIER CURVE) ---
        if (stroke.type === 'pen') {
            const points = stroke.path;

            if (points.length < 2) {
                // Sadece tıklandıysa tek bir nokTaşıoy (Basınç ipTaşı
                ctx.beginPath();
                ctx.arc(points[0].x, points[0].y, stroke.baseWidth / 2, 0, Math.PI * 2);
                ctx.fillStyle = stroke.color;
                ctx.fill();
            } else {
                // --- KÖŞELERİ YOK EDEN YUMUŞATMA (SMOOTHING) ALGORİTMASI ---
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                ctx.strokeStyle = stroke.color;

                // 1. BASINÇ İPTaşı: Kalınlık her zaman sTaşıart ve sabittir
                ctx.lineWidth = stroke.baseWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // 2. KÖŞE İPTaşı: NokTaşırı Düz Çizgiyle değil, esnek eğrilerle (Bezier) bağlar
                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                // Son nokTaşı eğrinin ucuna bağla
                ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
                ctx.stroke();
            }
        }


        // --- RESİM / PDF VE Canlandır (SNAPSHOT) KOPYASI ---
        else if (stroke.type === 'image') {

            // 1. EĞER BU BİR PDF VEYA ARKA PLAN İSE SADECE ÇERÇEVESİNİ ÇİZ, KENDİNİ EN ARKAYA SAKLA
            if (stroke.isBackground !== false) {
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    ctx.translate(centerX, centerY);
                    ctx.roTaşı((stroke.roTaşıon || 0) * Math.PI / 180);

                    // Kesikli Seçim Çerçevesi
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    // 1. Döndürme Butonu (Üst OrTaşı Yeşil)
                    const rotX = 0;
                    const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath();
                    ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.texTaşıgn = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    // 2. Boyutlandırma Butonu (Sağ Alt - Pembe)
                    const resX = stroke.width / 2;
                    const resY = stroke.height / 2;
                    ctx.beginPath();
                    ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);

                    ctx.restore();
                }
                continue; // İşlemi bitir ve resmin kendini çizmesi için en arkaya (destination-over) pasla
            }

            // 2. EĞER BU KESTİĞİMİZ BİR YÜZEN KOPYAYSA (Canlandır) EKRANA ÇİZ VE ÇERÇEVE EKLE
            let imgToDraw = null;
            if (stroke.img && stroke.img insTaşıeof HTMLImageElement) {
                imgToDraw = stroke.img;
            } else if (stroke.imgDaTaşı{
                if (!stroke.imgObj) {
                    stroke.imgObj = new Image();
                    stroke.imgObj.src = stroke.imgDaTaşı
                    stroke.imgObj.onload = () => { if (window.redrawAllStrokes) window.redrawAllStrokes(); };
                }
                imgToDraw = stroke.imgObj;
            }

            if (imgToDraw && (imgToDraw.complete || imgToDraw.readySTaşı >= 2)) {
                ctx.save();
                const centerX = stroke.x + (stroke.width / 2);
                const centerY = stroke.y + (stroke.height / 2);
                ctx.translate(centerX, centerY);
                ctx.roTaşı((stroke.roTaşıon || 0) * Math.PI / 180);

                ctx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);

                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    const rotX = 0; const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath(); ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.texTaşıgn = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    const resX = stroke.width / 2; const resY = stroke.height / 2;
                    ctx.beginPath(); ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);
                }
                ctx.restore();
            }
        }

        // --- NOKTaşı--
        else if (stroke.type === 'point') {
            drawDot(stroke, stroke.color); // ?? NokTaşın kendi rengini kullanmasını sağlar
            drawLabel(stroke.label, stroke, stroke.color); // ?? Harfin de aynı renk olmasını sağlar
        }

        // --- Düz Çizgi ---
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

        // --- Doğru ---
        else if (stroke.type === 'line') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, false);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- Doğru Parçası ---
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

        // --- Işın ---
        else if (stroke.type === 'ray') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, true);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- Çokgenler ---
        else if (stroke.type === 'polygon') {
            if (window.PolygonTool && typeof window.PolygonTool.calculateVertices === 'function') {
                const vertices = window.PolygonTool.calculateVertices(stroke.center, stroke.radius, stroke.sideCount, stroke.roTaşıon);
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
                        const sTaşıAngle = Math.aTaşı(v_prev.y - v_current.y, v_prev.x - v_current.x);
                        const endAngle = Math.aTaşı(v_next.y - v_current.y, v_next.x - v_current.x);
                        ctx.beginPath();
                        ctx.arc(v_current.x, v_current.y, arcRadius, endAngle, sTaşıAngle);
                        ctx.strokeStyle = '#FFFF00'; ctx.lineWidth = 2; ctx.stroke();
                        const angle_label_x = (v_current.x * 0.8) + (stroke.center.x * 0.2);
                        const angle_label_y = (v_current.y * 0.8) + (stroke.center.y * 0.2);
                        drawLabel(angleLabel, { x: angle_label_x, y: angle_label_y }, '#FFFF00');
                    }
                }
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    const roTaşıHandlePos = window.PolygonTool.getRoTaşıHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(roTaşıHandlePos.x, roTaşıHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'; ctx.fill(); ctx.strokeStyle = '#0F0'; ctx.lineWidth = 2; ctx.stroke();
                    const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(resizeHandlePos.x, resizeHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 0, 255, 0.8)'; ctx.fill(); ctx.strokeStyle = '#F0F'; ctx.lineWidth = 2; ctx.stroke();
                }
            }
        }

        // --- 3D HOLOGRRAM MOTORU YÖNLENDİRMESİ VE 2D SENKRONU ---
        else if (stroke.type === '3d_shape') {
            if (window.ThreeDTool && typeof window.ThreeDTool.drawShape === 'function') window.ThreeDTool.drawShape(ctx, stroke);

            // 1. ÜÇ BOYUTLU NESNEYİ 2D EKRAN MERKEZİNE VE BOYUTUNA ZORLA UYDUR (SENKRONİZASYON)
            if (window.Scene3D && window.Scene3D.scene) {
                const sceneMesh = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === stroke.id);
                if (sceneMesh) {
                    if (stroke.roTaşıonX !== undefined) sceneMesh.roTaşıon.x = stroke.roTaşıonX;
                    if (stroke.roTaşıonY !== undefined) sceneMesh.roTaşıon.y = stroke.roTaşıonY;
                    if (stroke.roTaşıonZ !== undefined) sceneMesh.roTaşıon.z = stroke.roTaşıonZ;
                    
                   const canvasElm = document.getElementById('drawing-canvas');
                    if (canvasElm) {
                        const myCw = canvasElm.width;
                        const myCh = canvasElm.height;
                        
                        // ?? SÜRGÜ KORUMASI: Sürgü çekilince değişen genişlik yerine muhur_disclaimerlü original değerleri kullan
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
                        
                        // ?? KUSURSUZ BOYUT + AĞ ÖLÇEĞİ: Koordinatları bozmadan sadece pembe buton çarpanını ekliyoruz
                        const threeJSHeightRatio = 30 / myCh;
                        const TaşıetThreeJSWidth = refW * threeJSHeightRatio;
                        const originalThreeJSWidth = sceneMesh.userDaTaşıaseSize * 2;
                        const gercekOlcek = TaşıetThreeJSWidth / originalThreeJSWidth;
                        
                        const mScale = stroke.meshScale || 1;
                        sceneMesh.scale.setScalar(gercekOlcek * mScale);
                    }
                }
            }

            // 2. SEÇİLİYKEN YEŞİL VE PEMBE KULPLARI ÇİZ (ESKİ ÖZELLİĞİN GERİ GELMESİ)
            if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                ctx.save();
                const cX = stroke.x + stroke.width / 2;
                const cY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.roTaşıon || 0) * (Math.PI / 180);

                ctx.translate(cX, cY);
                ctx.roTaşı(angleRad);

                // Seçim Çerçevesi
                ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                ctx.setLineDash([]);
                ctx.restore();
            }
        }
        else if (stroke.type === 'recTaşıle') {
            ctx.save();
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            ctx.translate(centerX, centerY);
            ctx.roTaşı((stroke.roTaşıon || 0) * Math.PI / 180);

            // 1. Dikdörtgeni Çiz
            ctx.beginPath();
            ctx.rect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = 4;
            ctx.stroke();

            // 2. Kenar Uzunluklarını Yazdır (Önizlemedeki gibi kalıcı olur)
            if (stroke.showEdgeLabels) {
                ctx.font = "14px Arial";
                ctx.fillStyle = stroke.color;
                ctx.texTaşıgn = "center";

                const wCm = (stroke.width / 30).toFixed(1).replace('.', ',');
                const hCm = (stroke.height / 30).toFixed(1).replace('.', ',');

                // Üst Kenar CM
                ctx.fillText(`${wCm} cm`, 0, -stroke.height / 2 - 10);

                // Sol Kenar CM (Dikey yazdırmak için döndürüyoruz)
                ctx.save();
                ctx.translate(-stroke.width / 2 - 25, 0);
                ctx.roTaşı(-Math.PI / 2);
                ctx.fillText(`${hCm} cm`, 0, 0);
                ctx.restore();
            }

            // 3. Köşe Harflerini Yazdır (A, B, C, D)
            if (stroke.labels) {
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = "#FF69B4"; // Pembe harfler
                ctx.fillText(stroke.labels[0], -stroke.width / 2 - 15, -stroke.height / 2 - 5); // Sol Üst
                ctx.fillText(stroke.labels[1], stroke.width / 2 + 10, -stroke.height / 2 - 5);  // Sağ Üst
                ctx.fillText(stroke.labels[2], stroke.width / 2 + 10, stroke.height / 2 + 15);  // Sağ Alt
                ctx.fillText(stroke.labels[3], -stroke.width / 2 - 15, stroke.height / 2 + 15); // Sol Alt
            }

            // 4. "Taşı" Modu Aktifse Butonları Çiz
            if (currentTool === 'move' && selectedItem === stroke) {
                // Döndürme (Yeşil)
                ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(0, -stroke.height / 2 - 30, 12, 0, 7); ctx.fill();
                // Boyutlandırma (Pembe)
                ctx.fillStyle = '#F0F'; ctx.beginPath(); ctx.arc(stroke.width / 2, stroke.height / 2, 12, 0, 7); ctx.fill();
            }

            // 5. Açı Tıklandıysa 90 Derece Sembolünü Çiz
            if (stroke.showAngleLabels) {
                ctx.font = "bold 14px Arial"; ctx.fillStyle = "yellow";
                ctx.fillText("90°", -stroke.width / 2 + 15, -stroke.height / 2 + 20);
            }
            ctx.restore();
        }



        // --- Çember / PERGEL ---
        else if (stroke.type === 'arc') {
            const PI_RAD = Math.PI / 180;
            let sTaşıRad = stroke.sTaşıAngle * PI_RAD;
            let endRad = stroke.endAngle * PI_RAD;
            const toTaşıngleDrawn = Math.abs(stroke.endAngle - stroke.sTaşıAngle);

            if (toTaşıngleDrawn >= 359) { sTaşıRad = 0; endRad = 2 * Math.PI; }

            ctx.beginPath();
            ctx.arc(stroke.cx, stroke.cy, stroke.radius, sTaşıRad, endRad, false);
            if (toTaşıngleDrawn >= 359) ctx.closePath();

            if (stroke.fillColor && stroke.fillColor !== 'transparent' && toTaşıngleDrawn >= 359) {
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
                drawLabel(`Ç = 2 . ? . r`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= 2 . ${PI} . ${r_cm_str} = ${circ_str} cm`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`A = ? . r²`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= ${PI} . ${r_cm_str}² = ${area_str} cm²`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`(? = ${PI} alındı)`, { x: labelX, y: labelY }, '#AAAAAA');
            }
        }
    } // <-- FOR DÖNGÜSÜ BURADA KAPANIYOR

    ctx.restore();

    // === EKLENECEK YENİ BÖLÜM: SAYFAYIşın ARKAYA ÇİZ ===
    if (bgCtx) {
        bgCtx.save();
        for (const stroke of drawnStrokes) {
            if (stroke.type === 'image' && stroke.isBackground !== false) {
                let imgToDraw = null;
                if (stroke.img && stroke.img insTaşıeof HTMLImageElement) {
                    imgToDraw = stroke.img;
                } else if (stroke.imgObj) {
                    imgToDraw = stroke.imgObj;
                }

                if (imgToDraw && (imgToDraw.complete || imgToDraw.readySTaşı >= 2)) {
                    bgCtx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    bgCtx.translate(centerX, centerY);
                    bgCtx.roTaşı((stroke.roTaşıon || 0) * Math.PI / 180);
                    bgCtx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    bgCtx.restore();
                }
            }
            // Ayrıca Lasso-mask ile PDF üzerinde delik açılmışsa onu da bgCtx'den siliyoruz
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

    // --- YENİ EKLENEN KISIM: OTOMATİK HARF SENKRONİZASYONU ---
    // Ekranda o an var olan en yüksek harfi bulur
    let maxCode = 64;
    drawnStrokes.forEach(s => {
        if (s.label && s.label.charCodeAt(0) > maxCode) maxCode = s.label.charCodeAt(0);
        if (s.label1 && s.label1.charCodeAt(0) > maxCode) maxCode = s.label1.charCodeAt(0);
        if (s.label2 && s.label2.charCodeAt(0) > maxCode) maxCode = s.label2.charCodeAt(0);
    });


    // Sıradaki harfe geçer (Z'yi geçerse A'ya döner)
    let nextCode = maxCode + 1;
    if (nextCode > 90) nextCode = 65;

    // Tüm sistemi (Pergel, Çokgenler ve Kalem) tek bir harfe senkronize eder
    nextPointChar = String.fromuhur_disclaimerCode(nextCode);
    window.nextPointChar = nextPointChar;
    // ---------------------------------------------------------

    // --- 4. ADIM: YENİ POLİGONAL LASSO ÖNİZLEMESİ ---
    if (currentTool === 'lasso' && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) {
        ctx.save();

        // 1. SABİTLENMİŞ ÇİZGİLERİ ÇİZ (NokTaşır arası)
        ctx.strokeStyle = '#00ffcc'; // Çizgi rengi turkuaz
        ctx.lineWidth = 2;
        ctx.setLineDash([]); // Sabit çizgiler düz olsun
        ctx.beginPath();
        ctx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
        for (let i = 1; i < lassoPoints.length; i++) {
            ctx.lineTo(lassoPoints[i].x, lassoPoints[i].y);
        }
        ctx.stroke();

        // 2. KESİKLİ ÖNİZLEME ÇİZGİSİNİ ÇİZ (Son nokTaşın imlece giden)
        if (typeof currentMousePos !== 'undefined' && currentMousePos) {
            ctx.beginPath();
            ctx.setLineDash([6, 6]); // Kesikli çizgi efekti
            ctx.strokeStyle = '#aaaaaa';
            let lastPoint = lassoPoints[lassoPoints.length - 1];
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(currentMousePos.x, currentMousePos.y);
            ctx.stroke();
        }

        // 3. TIKLANAN NOKTaşıRI (KÜÇÜK YUVARLAKLARI) ÇİZ
        ctx.fillStyle = '#ff0044';
        ctx.setLineDash([]);
        for (let i = 0; i < lassoPoints.length; i++) {
            ctx.beginPath();
            // İLK nokTaşı hedef olarak göstermek için daha BÜYÜK çiziyoruz
            let radius = (i === 0) ? 8 : 4;
            ctx.arc(lassoPoints[i].x, lassoPoints[i].y, radius, 0, Math.PI * 2);
            ctx.fill();

            // İlk nokTaşın etrafına beyaz bir hedef halkası ekle
            if (i === 0) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.restore();
    } // <-- BURASI YENİ POLİGONAL LASSO BLOĞUNUN BİTİŞ PARANTEZİ


    // --- HASSAS HEDEFLEME ÇAPRAZI (KESKİN NİŞANCI MODU) ---
    // (Lasso seçiliyse ve parmak ekrana basılıysa her zaman çıkar)
    if (currentTool === 'lasso' && window.isDraggingLassoPoint && typeof currentMousePos !== 'undefined' && currentMousePos) {
        ctx.save();
        ctx.beginPath();
        // Ekranın bir ucundan diğer ucuna yaTaşıve dikey hizalama çizgileri
        ctx.moveTo(0, currentMousePos.y);
        ctx.lineTo(canvas.width, currentMousePos.y);
        ctx.moveTo(currentMousePos.x, 0);
        ctx.lineTo(currentMousePos.x, canvas.height);

        ctx.setLineDash([4, 4]); // Kesikli

        // Eğer başlangIşınokTaşına kilitlendiysek çapraz YEŞİL olsun
        if (window.lassoIsClosing) {
            ctx.strokeStyle = '#00FF00'; // Kilitlendi Yeşili
        } else {
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.7)'; // Normal Pembe
        }

        ctx.lineWidth = 1.5;
        ctx.stroke();


        // Taşıdokunduğun yere minik bir merkez nokTaşı
        ctx.beginPath();
        ctx.arc(currentMousePos.x, currentMousePos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = window.lassoIsClosing ? '#00FF00' : '#ff00ff';
        ctx.fill();
        ctx.restore();
    }

} // <-- redrawAllStrokes FONKSİYONU BURADA TaşıMEN KAPANIYOR


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
    // 1. X-RAY (RÖNTGEN) SENSÖRÜ: Tüm katmanları birleştirip gerçek rengi okur
    // =======================================================
    function getRealColor(x, y) {
        const tCan = document.createElement('canvas');
        tCan.width = 1; tCan.height = 1;
        const tCtx = tCan.getContext('2d');

        // AltTaşı PDF katmanını oku
        const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');
        if (bgLayer) {
            const sX = bgLayer.width / bgLayer.offsetWidth;
            const sY = bgLayer.height / bgLayer.offsetHeight;
            tCtx.drawImage(bgLayer, x * sX, y * sY, 1 * sX, 1 * sY, 0, 0, 1, 1);
        } else {
            tCtx.fillStyle = "white"; tCtx.fillRect(0, 0, 1, 1);
        }
        // Üstteki çizim katmanını ekle
        tCtx.drawImage(canvas, x, y, 1, 1, 0, 0, 1, 1);
        return tCtx.getImageDaTaşı, 0, 1, 1).daTaşı
    }

    // =======================================================
    // 2. KESTİĞİMİZ PARÇAYI (KOPYAYI) OLUŞTUR (X-Ray kullanarak keser)
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

    // Yüksek kaliteli çizim ayarlarını etkinleştir
    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';

    if (bgLayer) {
        // Kanvasın HD çözünürlük oranını al (DPR)
        const dprCanvasX = canvas.width / canvas.getBoundingClientRect().width;
        const dprCanvasY = canvas.height / canvas.getBoundingClientRect().height;

        // PDF koordinatlarını Taşıetin piksel yoğunluğuna göre kusursuz olarak eşitle
        const sX = (bgLayer.width / bgLayer.offsetWidth) / dprCanvasX;
        const sY = (bgLayer.height / bgLayer.offsetHeight) / dprCanvasY;
        offCtx.drawImage(bgLayer, minX * sX, minY * sY, width * sX, height * sY, 0, 0, width, height);
    }
    offCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
    const imgSrc = offCanvas.toDaTaşıL('image/png', 1.0); // Kaliteyi en üste sabitle

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
            // Renk farkını hesapla
            const diff = Math.abs(px[0] - centerPixel[0]) + Math.abs(px[1] - centerPixel[1]) + Math.abs(px[2] - centerPixel[2]);
            if (diff > 50) {
                smartColor = `rgb(${px[0]}, ${px[1]}, ${px[2]})`;
                break;
            }
        }
    } catch (e) {
        console.warn("Renk okuma haTaşı", e);
    }

    // =======================================================
    // 4. ZOOM UYUMLU, KALICI YAMA OLUŞTURUCU
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
    patchImg.src = patchCanvas.toDaTaşıL('image/png');
    patchImg.onload = () => {
        drawnStrokes.unshift({ // Yama her şeyin EN ALTINDA kalacak şekilde başa eklenir
            type: 'image',
            imgObj: patchImg,
            x: minX, y: minY,
            width: width, height: height,
            roTaşıon: 0,
            isBackground: true, // ZOOM YAPILDIşınDA PDF İLE BÜYÜMESİ İÇİN
            isPatch: true       // SAYFA DEĞİŞİNCE SİLİNMESİ İÇİN ÖZEL ETİKET
        });
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };

    // =======================================================
    // 5. KESTİĞİNİZ KOPYAYI EKRANA GETİR VE OTOMATİK SEÇ
    // =======================================================
    const newImgStroke = {
        type: 'image',
        imgDaTaşıimgSrc,
        x: minX, y: minY,
        width: width, height: height,
        roTaşıon: 0,
        isBackground: false, // KRİTİK: Butonların çıkması için false olmalı
        imgObj: null
    };

    const tempImg = new Image();
    tempImg.src = imgSrc;
    tempImg.onload = () => {

        newImgStroke.imgObj = tempImg;
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };
    boxCopies.push(newImgStroke);


    // --- TaşıETTE BUTONLARIN ÇIKMASI İÇİN ŞART ---
    selectedItem = newImgStroke; // Yeni kestiğin parçayIşınında seç
    isMoving = false;            // Sürükleme durumunu kapat

    // Aracı 'move' yap (Yukarıda da yaptık ama burada da olması güvenlidir)
    currentTool = 'move';

    if (window.redrawAllStrokes) window.redrawAllStrokes();
}


function undoLastStroke() {
    if (drawnStrokes.length > 0) {
        if (window.audio_undo) { window.audio_undo.currentTime = 0; window.audio_undo.play(); }

        // 1. Kendi listenden son çizgiyi sil
                const popped = drawnStrokes.pop();

        // 3D ŞEKİLSE GERİ ALIRKEN SAHNEDEN DE KALDIR
        if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
            const meshToRemove = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === popped.id);
            if (meshToRemove) {
                meshToRemove.traverse((child) => {
                    if (child.isMesh || child.isLineSegMenüsü {
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

        // YENİ: KAT İZİ BIRAK (Undo sırasında katlamaları açarken iz bırak)
        if (popped && popped.isPatch === true && popped.foldLine) {
            const p1 = popped.foldLine[0];
            const p2 = popped.foldLine[1];
            // İz stroke'u oluştur (Daha ince ve daha az dikkat dağıtıcı)
            const izStroke = {
                type: 'line', 
                points: [p1, p2],
                color: 'rgba(0, 0, 0, 0.2)', // Daha şeffaf (dikkat dağıtmaz)
                width: 1.5, // Daha ince
                isDash: true, 
                dashPattern: [6, 6], // Kesikli
                isBackground: false
            };
            drawnStrokes.push(izStroke);
        }

        // --- CANLI SINIF: TaşıAYA "SON ÇİZİMİ SİL" MESAJI GÖNDER ---
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkDaTaşı type: 'geri_al' });
        }
        // ---------------------------------------------------------

        redrawAllStrokes();

    }
}

function clearAllStrokes() {
    // 1. Ses çal (varsa)
    if (drawnStrokes.length > 0) {
        if (window.audio_clear) window.audio_clear.play();
    }

    // 2. Taşıetin yerel hafızasını temizle (Arka planları koru)
    drawnStrokes = drawnStrokes.filter(stroke => stroke.isBackground === true);
    window.drawnStrokes = drawnStrokes;

    // ?? HEPSİNİ SİLERKEN 3D SAHNEYİ TaşıMenüsüFIRLA
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

    // 3. Taşıyıcıdaki eski kayıtları temizle (Eğer PC veya Taşıette localStorage kullanıyorsan)
    if (window.localStorage) {
        window.localStorage.removeItem('drawnStrokes');
    }

    // 4. PC'ye "hepsini_sil" komutunu gönder
    if (typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkDaTaşı type: 'hepsini_sil' });
        console.log("Temizleme komutu PC'ye gönderildi.");
    }

    // 5. Harf sayacını sıfırla
    nextPointChar = 'A';
    window.nextPointChar = 'A';

    // 6. Ekranı Taşımen yenile
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
            const angleRad = (stroke.roTaşıon || 0) * (Math.PI / 180);

            // --- KRİTİK DÜZELTME: Resmin gerçek merkezini hesapla ---
            const centerX = stroke.x + halfW;
            const centerY = stroke.y + halfH;

            // --- A. DÖNDÜRME KULPU (RoTaşı Handle) ALGILAMA ---
            const handleDist = halfH + 30;
            const rotX = centerX + Math.sin(angleRad) * handleDist;
            const rotY = centerY - Math.cos(angleRad) * handleDist;

            if (disTaşıe(pos, { x: rotX, y: rotY }) < 25) {
                return { item: stroke, pointKey: 'image_roTaşı' };
            }

            // --- B. BOYUTLANDIRMA KULPU (Resize Handle) ---
            const resLocalX = halfW * Math.cos(angleRad) - halfH * Math.sin(angleRad);
            const resLocalY = halfW * Math.sin(angleRad) + halfH * Math.cos(angleRad);
            const resX = centerX + resLocalX;
            const resY = centerY + resLocalY;

            if (disTaşıe(pos, { x: resX, y: resY }) < 25) {
                return { item: stroke, pointKey: 'image_resize' };
            }

            // --- C. RESİM GÖVDESİ (Taşıma) ---
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localClickX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localClickY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);

            if (localClickX > -halfW && localClickX < halfW && localClickY > -halfH && localClickY < halfH) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        // --- 3D ŞEKİL BUTON VE GÖVDE SENSÖRÜ (KUSURSUZ) ---
        if (stroke.type === '3d_shape') {
            const cX = stroke.x + stroke.width / 2;
            const cY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.roTaşıon || 0) * (Math.PI / 180);

            if (currentTool === 'move' && selectedItem === stroke) {
                // Yeşil (Döndürme)
                const rotY = -stroke.height / 2 - 40;
                const rotX_world = cX + Math.sin(angleRad) * Math.abs(rotY);
                const rotY_world = cY - Math.cos(angleRad) * Math.abs(rotY);
                if (disTaşıe(pos, { x: rotX_world, y: rotY_world }) < 35) return { item: stroke, pointKey: 'image_roTaşı' };

                // Pembe (Boyutlandırma)
                const resX_local = stroke.width / 2 + 20;
                const resY_local = stroke.height / 2 + 20;
                const resX_world = cX + (resX_local * Math.cos(angleRad) - resY_local * Math.sin(angleRad));
                const resY_world = cY + (resX_local * Math.sin(angleRad) + resY_local * Math.cos(angleRad));
                if (disTaşıe(pos, { x: resX_world, y: resY_world }) < 35) return { item: stroke, pointKey: 'image_resize' };
            }

            // ?? 3D Şeklin Tüm Gövdesini Yakala (Taşıma Başlasın ve Butonlar Çıksın)
            if (disTaşıe(pos, { x: cX, y: cY }) < Math.max(stroke.width, stroke.height) + 30) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' && selectedItem === stroke) {
            if (stroke.type === 'polygon') {
                const roTaşıHandlePos = window.PolygonTool.getRoTaşıHandlePosition(stroke);
                const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);

                const dRot = disTaşıe(pos, roTaşıHandlePos);
                const dRes = disTaşıe(pos, resizeHandlePos);

                // ?? PEMBE VE YEŞİL BUTON ÇAKIŞMA ZIRHI (Öncelik en yakın olana verilir)
                if (dRes < 35 && dRes <= dRot) return { item: stroke, pointKey: 'resize' };
                if (dRot < 35) return { item: stroke, pointKey: 'roTaşı' };
            }
        }


        // --- Dikdörtgen YAKALAMA (TaşıET UYUMLU) ---
        if (stroke.type === 'recTaşıle') {
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.roTaşıon || 0) * (Math.PI / 180);

            // A. Döndürme Butonu (Yeşil - Üstte)
            const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 35);
            const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 35);
            if (disTaşıe(pos, { x: rotX, y: rotY }) < 30) return { item: stroke, pointKey: 'image_roTaşı' };

            // B. Boyutlandırma Butonu (Pembe - Sağ Alt)
            const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
            const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
            if (disTaşıe(pos, { x: resX, y: resY }) < 30) return { item: stroke, pointKey: 'image_resize' };

            // C. Köşeler (90 Derece Açı Gösterme - 30px hassasiyet)
            const corners = [
                { x: -stroke.width / 2, y: -stroke.height / 2 }, { x: stroke.width / 2, y: -stroke.height / 2 },
                { x: stroke.width / 2, y: stroke.height / 2 }, { x: -stroke.width / 2, y: stroke.height / 2 }
            ];
            for (let c of corners) {
                const cornerX = centerX + (c.x * Math.cos(angleRad) - c.y * Math.sin(angleRad));
                const cornerY = centerY + (c.x * Math.sin(angleRad) + c.y * Math.cos(angleRad));
                if (disTaşıe(pos, { x: cornerX, y: cornerY }) < 30) return { item: stroke, pointKey: 'toggle_angles' };
            }

            // D. Gövde (Merkezden Taşıma)
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
            if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' || currentTool === 'fill') { // Fill için de hit gerekli
            if (stroke.type === 'polygon' && stroke.vertices) {
                for (let j = 0; j < stroke.vertices.length; j++) {
                    if (disTaşıe(pos, stroke.vertices[j]) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_angles' };
                }
                for (let j = 0; j < stroke.vertices.length; j++) {
                    const v1 = stroke.vertices[j];
                    const v2 = stroke.vertices[(j + 1) % stroke.vertices.length];
                    const lineLength = disTaşıe(v1, v2);
                    const steps = Math.max(1, Math.floor(lineLength / 5));
                    let hitEdge = false;
                    for (let step = 1; step < steps; step++) {
                        const t = step / steps;
                        const sampleX = v1.x + (v2.x - v1.x) * t;
                        const sampleY = v1.y + (v2.y - v1.y) * t;
                        if (disTaşıe({ x: sampleX, y: sampleY }, pos) < SNAP_THRESHOLD) { hitEdge = true; break; }
                    }
                    if (hitEdge) return { item: stroke, pointKey: 'toggle_edges' };
                }
            }

            if (stroke.type === 'recTaşıle') {
                const centerX = stroke.x + stroke.width / 2;
                const centerY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.roTaşıon || 0) * (Math.PI / 180);

                // A. Döndürme Butonu (Yeşil)
                const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 30);
                const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 30);
                if (disTaşıe(pos, { x: rotX, y: rotY }) < 20) return { item: stroke, pointKey: 'image_roTaşı' };

                // B. Boyutlandırma Butonu (Pembe)
                const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
                const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
                if (disTaşıe(pos, { x: resX, y: resY }) < 20) return { item: stroke, pointKey: 'image_resize' };

                // C. Köşeye Tıklama (Açı Gösterme)
                if (disTaşıe(pos, { x: stroke.x, y: stroke.y }) < 20) return { item: stroke, pointKey: 'toggle_angles' };

                // D. Gövdeden Tutma (Merkezden Taşıma)
                const dx = pos.x - centerX; const dy = pos.y - centerY;
                const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
                const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
                if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                    return { item: stroke, pointKey: 'self' };
                }
            } if (stroke.type === 'arc' && stroke.cx) {
                const distToCenter = disTaşıe(pos, { x: stroke.cx, y: stroke.cy });
                if (Math.abs(distToCenter - stroke.radius) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_circle_info' };
            }
        }

        if (stroke.type === 'point') {
            if (disTaşıe(pos, stroke) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'self' };
        }
        if (stroke.p1 && disTaşıe(pos, stroke.p1) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p1' };
        if (stroke.p2 && disTaşıe(pos, stroke.p2) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p2' };
        if (stroke.type === 'arc' && stroke.cx && disTaşıe(pos, { x: stroke.cx, y: stroke.cy }) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'center' };
        // ?? ÇOKGEN MERKEZİNDEN TUTMA HASSASİYETİNİ ARTIR (TaşıET İÇİN)
        if (stroke.type === 'polygon' && stroke.center && disTaşıe(pos, stroke.center) < 50) return { item: stroke, pointKey: 'center' };
    }
    return null;
}

// Global aTaşılar
window.redrawAllStrokes = redrawAllStrokes;
window.advanceChar = advanceChar;
window.disTaşıe = disTaşıe;


// --- ARAÇ SEÇİMİ (TaşıMEN DÜZELTİLMİŞ VERSİYON) ---
function seTaşıiveTool(tool) {
    // Oyunlar Menüsünü her araç değişiminde kapat ve inline olarak gizle
    if (oyunlarOptions) {
        oyunlarOptions.classList.add('hidden');
        oyunlarOptions.style.display = 'none';
    }
    if (oyunlarButton) oyunlarButton.classList.remove('active');

    // Mevcut butonların aktifliğini temizle
    penButton.classList.remove('active');
    eraserButton.classList.remove('active');
    lineButton.classList.remove('active');
    pointButton.classList.remove('active');
    straightLineButton.classList.remove('active');
    infinityLineButton.classList.remove('active');
    segmentButton.classList.remove('active');
    rayButton.classList.remove('active');
    // Fiziksel araç butonlarIşın aktifliği bağımsız yönetilir
    polygonButton.classList.remove('active');
    circleButton.classList.remove('active');
    moveButton.classList.remove('active');
    if (fillButton) fillButton.classList.remove('active');
    if (animateButton) animateButton.classList.remove('active');

    // İmleçleri temizle
    body.classList.remove('cursor-pen', 'cursor-eraser', 'cursor-snapshot');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yeni aracı ayarla
    currentTool = tool;

    // Seçilen aracın ışIşını yak
    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    }

    if (eraserPreview) eraserPreview.style.display = 'none';

    // ?? KESİN ÇÖZÜM: CSS öncelik çelişkisini aşmak için gizlenen tüm menüleri inline (none) yapıyoruz
    if (polygonOptions) {
        polygonOptions.classList.add('hidden');
        polygonOptions.style.display = 'none';
    }

    // Çizgi Menüsünü, SADECE yeni seçilen araç bir çizgi aracı DEĞİLSE inline olarak muhur_disclaimerle
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

    // ?? ÇÖZÜM 1: Kalem Menüsünü kesin olarak gizle
    if (penOptions) { penOptions.classList.add('hidden'); penOptions.style.display = 'none'; }

    // ... diğer gizleme kodları buradadır ...
    penOptions.classList.add('hidden');

    // AŞAĞIDAKİ BLOKU EKLİYORSUN:
    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }
    // ...

    // Değişkenleri sıfırla
    isDrawing = false;
    lineSTaşıPoint = null;
    isDrawingLine = false;
    isDrawingInfinityLine = false;
    isDrawingSegment = false;
    isDrawingRay = false;

    // --- BURAYA Dikdörtgen SIFIRLAMASINI EKLEYİN ---
    isDrawingRecTaşıle = false;
    rectSTaşıPoint = null;

    window.tempPolygonDaTaşı null;
    polygonPreviewLabel.classList.add('hidden');

    // Fiziksel araçlar bağımsız çalıştığı için seTaşıiveTool içerisinde gizlenmez.

    if (snapIndicator) snapIndicator.style.display = 'none';

    // Etkileşimleri kapat
    if (window.RulerTool) window.RulerTool.interactionMode = 'none';
    if (window.GönyeTool) window.GönyeTool.interactionMode = 'none';
    if (window.AciolcerTool) window.AciolcerTool.interactionMode = 'none';
    if (window.PergelTool) window.PergelTool.interactionMode = 'none';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawAllStrokes();

    // 2. Yeni aracı aktif et
    currentTool = tool;

    // ?? KESİN ÇÖZÜM: Seçilen araç 3D değilse, 3D modunu Taşımen kapat! (Çokgen çizerken 3D çizmesini engeller)
    if (!tool || !tool.sTaşısWith('draw_3d_')) {
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
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active'); // ?? EKLENDİ
        body.classList.add('cursor-snapshot');

        // ?? ÇÖZÜM 1: Canlandır alt Menüsünü KESİN OLARAK aç ve hizala!
        if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
            snapshotOptions.classList.remove('hidden');
            snapshotOptions.style.display = 'flex';
            snapshotOptions.style.zIndex = '10000'; // ?? Z-index değeri yükseltildi
            const refBtn = btnSnapshotMain || animateButton; // ?? EKLENDİ
            if (refBtn) snapshotOptions.style.top = `${refBtn.getBoundingClientRect().top - refBtn.parentElement.getBoundingClientRect().top}px`;
        }
    }


    // --- ÇİZGİ ARAÇLARI GRUBU (YÜKSEK CSS ÖNCELİKLİ GÖSTERİM) ---
    if (isLineTool && lineOptions) {
        lineOptions.classList.remove('hidden');
        lineOptions.style.display = 'flex'; // ?? Çizgi aracı seçildiğinde görünürlüğü inline olarak zorla aç
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

    // --- DİĞER ARAÇLAR ---
    // --- DİĞER ARAÇLAR ---
    else if (tool === 'ruler') {
        togglePhysicalTool('ruler');
    } else if (tool === 'Gönye') {
        togglePhysicalTool('Gönye');
    } else if (tool === 'aciolcer') {
        togglePhysicalTool('aciolcer');
    } else if (tool === 'pergel') {
        togglePhysicalTool('pergel');
    }

    else if (tool.sTaşısWith('draw_polygon_')) {
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

penButton.addEventListener('click', () => seTaşıiveTool(currentTool === 'pen' ? 'none' : 'pen'));
eraserButton.addEventListener('click', () => seTaşıiveTool(currentTool === 'eraser' ? 'none' : 'eraser'));


// --- FİZİKSEL ARAÇ BUTONLARI KESİN ÇÖZÜMÜ (TaşıET ZIRHI) ---
function togglePhysicalTool(aracAdi) {
    let toolObj = null, el = null, btn = null, isDisplayBlock = false;
    if (aracAdi === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-conTaşıer'); btn = rulerButton; }
    if (aracAdi === 'Gönye') { toolObj = window.GönyeTool; el = document.querySelector('.Gönye-conTaşıer'); btn = GönyeButton; }
    if (aracAdi === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-conTaşıer'); btn = aciolcerButton; isDisplayBlock = true; }
    if (aracAdi === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-conTaşıer'); btn = pergelButton; isDisplayBlock = true; }

    if (!toolObj || !el) return;

    const isCurrentlyVisible = el.style.display !== 'none' && !el.classList.conTaşıs('hidden');

    if (isCurrentlyVisible) {
        // Gizle
        toolObj.hide();
        el.classList.add('hidden');
        el.style.display = 'none';
        el.style.zIndex = "-1";
        if (btn) btn.classList.remove('active');
    } else {
        // Göster
        toolObj.show();
        el.classList.remove('hidden');
        el.style.display = isDisplayBlock ? 'block' : 'flex';
        el.style.zIndex = "9999";
        if (btn) btn.classList.add('active');

        if (aracAdi === 'pergel' && toolObj.sTaşı) {
            setTimeout(() => {
                toolObj.sTaşı.roTaşıon = 0;
                toolObj.sTaşı.radius = 150;
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder();
            }, 100);
        }

        if (window.bringToolToFront) window.bringToolToFront(el || (toolObj ? toolObj.pergelElement || toolObj.rulerElement || toolObj.GönyeElement || toolObj.aciolcerElement : null));
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
    btn.addEventListener('touchsTaşı', tetikle, { passive: false });
};

butonBagla(rulerButton, 'ruler');
butonBagla(GönyeButton, 'Gönye');
butonBagla(aciolcerButton, 'aciolcer');
butonBagla(pergelButton, 'pergel');


undoButton.addEventListener('click', undoLastStroke);
clearAllButton.addEventListener('click', clearAllStrokes);
moveButton.addEventListener('click', () => seTaşıiveTool(currentTool === 'move' ? 'none' : 'move'));

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

if (prevPageBtn && nextPageBtn) {

    // Önceki Sayfa (<)
    prevPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage > 1) {
            currentPDFPage--;
            window.renderPDFPage(currentPDFPage);
            // ?? YENİ: PC'ye sayfayı değiştirmesini söyle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkDaTaşı type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });

    // Sonraki Sayfa (>)
    nextPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage < toTaşıDFPages) {
            currentPDFPage++;
            window.renderPDFPage(currentPDFPage);
            // ?? YENİ: PC'ye sayfayı değiştirmesini söyle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkDaTaşı type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });
} // <-- EKSİK OLAN VE HATaşı SEBEP OLAN PARANTEZ BURADA KAPANIYOR!


// --- YENİ: Sayfa numarasına tıklayınca hızlı gitme kutusunu aç ---
if (pageCountLabel) {
    pageCountLabel.style.cursor = 'pointer'; // Fareyle üzerine gelince tıklanabilir el işareti çıksın
    pageCountLabel.addEventListener('click', () => {
        if (!currentPDF) return;

        // --- ÇEVİRİ ENTEGRASYONU ---
        let t = translations[currentLang];
        let soruMetni = t.pdf_soru.replace('{0}', toTaşıDFPages);

        const gitSayfa = prompt(soruMetni, currentPDFPage);
        if (gitSayfa !== null) {
            const num = parseInt(gitSayfa);
            if (num > 0 && num <= toTaşıDFPages) {
                currentPDFPage = num;
                window.renderPDFPage(currentPDFPage);
            } else {
                alert("Geçersiz sayfa numarası girdiniz!"); // İstersen burayı da ileride sözlüğe ekleyebilirsin
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
        const file = e.Taşıet.files[0];
        if (!file) return;

        // --- DURUM A: PDF DOSYASI ---
        if (file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                // 1. AĞA GÖNDERMEK İÇİN (Base64 Metni Olarak)
                const base64String = this.result;

                // ?? KESİN ÇÖZÜM: Koca PDF dosyasını PC'nin kendi okuması için ağa fırlatmak yerine, 
                // Taşıetin çizdiği o anki yüksek çözünürlüklü sayfayı (resim olarak) yollayacağız.
                // Bu yüzden pdf_Yükle komutunu AĞA GÖNDERMEYİ İPTaşıEDİYORUZ. 
                // PC, PDF.js yüküne girmek zorunda kalmayacak.

                // 2. TaşıET EKRANI İÇİN (PDF.js'in anladığı formaTaşıeri çeviriyoruz)
                const base64DaTaşı base64String.split(',')[1];
                const binaryString = window.atob(base64DaTaşı
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                try {
                    currentPDF = await pdfjsLib.getDocument(bytes).promise;
                    toTaşıDFPages = currentPDF.numPages;
                    currentPDFPage = 1;

                    if (pdfControls) pdfControls.classList.remove('hidden');

                    window.renderPDFPage(currentPDFPage);

                    setTimeout(() => {
                        let t = typeof translations !== 'undefined' ? translations[currentLang] : { pdf_soru: "Sayfa (1-{0}):" };
                        let soruMetni = (t.pdf_soru || "Sayfa (1-{0}):").replace('{0}', toTaşıDFPages);

                        const sayfaGrisi = prompt(soruMetni, "1");
                        if (sayfaGrisi !== null) {
                            const hedefSayfa = parseInt(sayfaGrisi);
                            if (hedefSayfa > 0 && hedefSayfa <= toTaşıDFPages) {
                                currentPDFPage = hedefSayfa;
                                window.renderPDFPage(currentPDFPage);

                                if (typeof isConnected !== 'undefined' && isConnected) {
                                    window.sendNetworkDaTaşı type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
                                }
                            }
                        }
                    }, 500);

                } catch (error) {
                    console.error("PDF açılırken haTaşıluştu:", error);
                }
            };   // ‹ fileReader.onload BURADA biter
            fileReader.readAsDaTaşıL(file);
        }

        // --- DURUM B: RESİM DOSYASI ---
        if (file.type.sTaşısWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgDaTaşı event.Taşıet.result;



                const img = new Image();
                img.onload = () => {
                    // --- GORUNTU SIKISTIRMA (Resizer & Compressor) ---
                    // Telefon kameralari 15-20MB resim cektigi icin agi yavaslatir.
                    // Burada resmi Taşıaya gitmeden once ufaltip 150KB'a indiriyoruz!
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
                    const compressedDaTaşıl = tempCanvas.toDaTaşıL('image/jpeg', 0.6); 

                    const compressedImg = new Image();
                    compressedImg.onload = () => {
                        window.addNewImageToCanvas(compressedImg, false);
                    };
                    compressedImg.src = compressedDaTaşıl;
                };
                img.src = imgDaTaşı
            };
            reader.readAsDaTaşıL(file);
        }
        // Resim/Dosya islenmeden value'yu temizlemek mobil Taşıyicilarda File objesinin silinmesine (GC) neden olur!
        setTimeout(() => { e.Taşıet.value = ''; }, 2000); 
    };
}


function addToCanvasAsObject(img) {
    let sTaşıWidth = 400;
    if (img.width < 400) sTaşıWidth = img.width;

    let scaleFactor = sTaşıWidth / img.width;
    let sTaşıHeight = img.height * scaleFactor;

    drawnStrokes.push({
        type: 'image',
        img: img,
        // --- TaşıORTaşıMA HESABI ---
        x: (canvas.width / 2) - (sTaşıWidth / 2),
        y: (canvas.height / 2) - (sTaşıHeight / 2),
        width: sTaşıWidth,
        height: sTaşıHeight,
        roTaşıon: 0,
        isBackground: true
    });

    // --- BUTONU GÖSTERME VE KAPATMA İŞLEVİ FONKSİYONUN İÇİNE ALINDI ---
    if (closePdfBtn) {
        // 1. Butonu SADECE resim eklendiğinde görünür yap
        closePdfBtn.classList.remove('hidden');
        closePdfBtn.style.display = 'flex';

        // 2. Kapatma işlevini Taşımla
        closePdfBtn.onclick = () => {
            // Kontrol panelini ve butonun kendisini gizle
            if (typeof pdfControls !== 'undefined' && pdfControls) {
                pdfControls.classList.add('hidden');
            }
            closePdfBtn.classList.add('hidden');
            closePdfBtn.style.display = 'none';

            // Arka plan olan tüm öğeleri, lasso maskelerini ve yamaları kaldır
            drawnStrokes = drawnStrokes.filter(s => !s.isBackground && !s.isPDFPage && s.type !== 'lasso-mask' && !s.isPatch);
            window.drawnStrokes = drawnStrokes;

            // Değişkenleri sıfırla
            currentPDF = null;
            if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;

            // Ekranı temizle ve kalan çizimleri tekrar çiz
            redrawAllStrokes();
        };
    }

    redrawAllStrokes();
}


if (fillButton) fillButton.addEventListener('click', () => seTaşıiveTool(currentTool === 'fill' ? 'none' : 'fill'));
if (fillColorBoxes) {
    fillColorBoxes.forEach(box => {
        const handler = (e) => {
            e.stopPropagation();
            fillColorBoxes.forEach(b => b.classList.remove('selected'));
            e.Taşıet.classList.add('selected');
            currentFillColor = e.Taşıet.daTaşıt.color || e.Taşıet.style.backgroundColor;
            seTaşıiveTool('fill');
        };
        box.addEventListener('click', handler);
        box.addEventListener('touchsTaşı', handler, { passive: false });
    });
    if (fillColorBoxes.length > 0) { fillColorBoxes[0].classList.add('selected'); currentFillColor = fillColorBoxes[0].daTaşıt.color || fillColorBoxes[0].style.backgroundColor; }
}

colorBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        colorBoxes.forEach(b => b.classList.remove('selected'));
        e.Taşıet.classList.add('selected');
        currentPenColor = e.Taşıet.style.backgroundColor;
    });
});
colorBoxes[0].classList.add('selected');
currentPenColor = colorBoxes[0].style.backgroundColor;

lineButton.addEventListener('click', () => {
    if (lineButton.classList.conTaşıs('active')) { seTaşıiveTool('none'); }
    else {
        seTaşıiveTool('none');
        lineOptions.classList.remove('hidden'); lineOptions.style.display = 'flex'; lineButton.classList.add('active');
        const buttonRect = lineButton.getBoundingClientRect();
        const panelRect = lineButton.parentElement.getBoundingClientRect();
        lineOptions.style.top = `${buttonRect.top - panelRect.top}px`;
    }
});

// Çokgen Renk Seçimi (VarsayIşın Beyaz)
if (polygonColorOptions.length > 0) {
    polygonColorOptions[0].classList.add('selected');
    window.currentLineColor = polygonColorOptions[0].daTaşıt.color || '#FFFFFF';

    polygonColorOptions.forEach(box => {
        const handleColorSelect = (e) => {
            e.stopPropagation(); e.preventDefault();
            polygonColorOptions.forEach(b => b.classList.remove('selected'));
            e.Taşıet.classList.add('selected');
            const color = e.Taşıet.daTaşıt.color || e.Taşıet.style.backgroundColor;
            window.currentLineColor = color;
            try { if (window.audio_select) { window.audio_select.currentTime = 0; window.audio_select.play(); } else if (window.audio_click) { window.audio_click.currentTime = 0; window.audio_click.play(); } } catch (err) { }
        };
        box.addEventListener('click', handleColorSelect);
        box.addEventListener('touchsTaşı', handleColorSelect, { passive: false });
    });
}

polygonButton.addEventListener('click', () => {
    if (polygonButton.classList.conTaşıs('active')) { seTaşıiveTool('none'); }
    else {
        seTaşıiveTool('none');
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

// --- OYUNLAR Menüsü: YUKARI AÇIşın, SEVİMLİ VE SİLGİ KAPATaşıSİSTEM ---
oyunlarButton.addEventListener('click', (e) => {
    e.stopPropagation();

    if (oyunlarButton.classList.conTaşıs('active')) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    } else {
        // 1. DİĞER ARAÇLARI VE SİLGİYİ KAPAT (IşIşını söndürür)
        if (typeof seTaşıiveTool === 'function') seTaşıiveTool('none');

        oyunlarOptions.innerHTML = ''; // İçeriği temizle

        // 2. MENÜ GÖRÜNÜM AYARLARI
        oyunlarOptions.style.display = 'flex';
        oyunlarOptions.style.flexDirection = 'column';
        oyunlarOptions.style.maxHeight = '400px';
        oyunlarOptions.style.overflowY = 'auto';
        oyunlarOptions.style.touchAction = 'pan-y';
        oyunlarOptions.style.WebkitOverflowScrolling = 'touch';

        // 3. KONUMU YUKARI ALAN HESAPLAMA (Ekrana sığması için)
        const buttonRect = oyunlarButton.getBoundingClientRect();
        const panelRect = oyunlarButton.parentElement.getBoundingClientRect();
        oyunlarOptions.style.top = 'auto';
        oyunlarOptions.style.bottom = (panelRect.bottom - buttonRect.bottom) + 'px';

        // 4. KAYDIRMA İPUCU (Yazı Geri Geldi)
        const hint = document.createElement('div');
        hint.innerHTML = '?? Liste kaydırılabilir ??';
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

                // KRİTİK DEĞİŞİKLİK BURADA:
                // 'oyun.isim' yerine 'oyun[currentLang]' kullanıyoruz.
                // Eğer o dilde karşılığı yoksa (haTaşıermemesi için) Türkçe'yi gösterir.
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

                let sTaşıY = 0;
                let isScrolling = false;

                linkElement.addEventListener('touchsTaşı', (te) => {
                    sTaşıY = te.touches[0].clientY;
                    isScrolling = false;
                }, { passive: true });

                linkElement.addEventListener('touchmove', (te) => {
                    if (Math.abs(te.touches[0].clientY - sTaşıY) > 10) isScrolling = true;
                }, { passive: true });

                const linkiAc = (ae) => {
                    if (isScrolling) return;
                    ae.preventDefault();
                    ae.stopPropagation();
                    window.open(oyun.link, '_blank');

                    // Kapatma işlemi
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

// --- BOŞLUĞA TIKLAYINCA KAPATMA (DOSYANIN EN ALTINA EKLEYİN) ---
['pointerdown', 'touchsTaşı', 'mousedown'].forEach(evt => {
document.addEventListener(evt, (e) => {

    if (oyunlarOptions && !oyunlarOptions.conTaşıs(e.Taşıet) && e.Taşıet !== oyunlarButton) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    }
});
// 2. Ana menü kutusunun da dışarıdaki "Ekran Kilitlerine" TaşılmasınIşıngelle:
oyunlarOptions.addEventListener('touchsTaşı', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });

circleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    seTaşıiveTool('draw_polygon_circle');
    window.PolygonTool.handleDrawClick(null, 0);
    regularPolygonButtons.forEach(b => b.classList.remove('active'));
    circleButton.classList.add('active');
});

regularPolygonButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const sides = parseInt(e.Taşıet.daTaşıt.sides);
        seTaşıiveTool(`draw_polygon_${sides}_sides`);
        window.PolygonTool.handleDrawClick(null, sides);
        regularPolygonButtons.forEach(b => b.classList.remove('active'));
        circleButton.classList.remove('active');
        e.Taşıet.classList.add('active');
    });
});

pointButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.audio_select) window.audio_select.play();
    if (!audio_click_src_set) { audio_click.src = 'sesler/point-smooth-beep-230573.mp3'; audio_click_src_set = true; }
    seTaşıiveTool(currentTool === 'point' ? 'none' : 'point');
});
straightLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); seTaşıiveTool(currentTool === 'straightLine' ? 'none' : 'straightLine'); });
infinityLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); seTaşıiveTool(currentTool === 'line' ? 'none' : 'line'); });
segmentButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); seTaşıiveTool(currentTool === 'segment' ? 'none' : 'segment'); });
rayButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); seTaşıiveTool(currentTool === 'ray' ? 'none' : 'ray'); });

lineColorOptions.forEach(box => {
    box.addEventListener('click', (e) => {
        e.stopPropagation();
        lineColorOptions.forEach(b => b.classList.remove('selected'));
        e.Taşıet.classList.add('selected');
        const color = e.Taşıet.daTaşıt.color || e.Taşıet.style.backgroundColor;
        window.currentLineColor = color;
    });
});
lineColorOptions[0].classList.add('selected');
window.currentLineColor = lineColorOptions[0].daTaşıt.color || lineColorOptions[0].style.backgroundColor;

// ==========================================
// ?? NİHAİ ÇÖZÜM: KATMAN (Z-INDEX) VE BUTON KORUMA ZIRHI ??
// ==========================================
const katmanZirhi = document.createElement('style');
katmanZirhi.innerHTML = `
    /* 1. Çizim Taşıası: 3D şekillerin üstünde, butonların altında kalmalı */
    #drawing-canvas { position: relative !imporTaşı; z-index: 50 !imporTaşı; background-color: transparent !imporTaşı; }
    
    /* 2. 3D Sahnesi: Kalemin altında kalmalı ki üstüne çizilebilsin */
    #three-conTaşıer { position: absolute !imporTaşı; z-index: 10 !imporTaşı; pointer-events: none !imporTaşı; display: block !imporTaşı; }
    
    /* 3. Arayüz ve Butonlar: Asla kaybolmamaları için en üst seviyeye sabitlendi */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options,
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options,
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-conTaşıer, #info-tooltip {
        z-index: 10000 !imporTaşı;
    }
`;
document.head.appendChild(katmanZirhi);

// 3D motorunun gizli kalmamasını garantile
if (window.Scene3D && window.Scene3D.conTaşıer) {
    window.Scene3D.conTaşıer.style.display = 'block';
    window.Scene3D.conTaşıer.classList.remove('hidden');
}

// ?????? İŞTE KODU TaşıOLARAK BURAYA, BU BOŞLUĞA YAPIŞTIRIYORSUN ??????

// ?? PERGEL TEPE ÇİFT TIKLAMA KESİN DÜZELTMESİ (SIÇRAMA ENGELİ)
document.addEventListener('dblclick', (e) => {
    const hedef = e.Taşıet;
    // Çift tıklanan eleman pergelin tepesi mi kontrol et
    if (hedef && (hedef.id === 'compass-top' || hedef.classList.conTaşıs('compass-top') || hedef.id === 'pergel-tepe' || hedef.closest('#compass-top') || hedef.closest('.pergel-tepe') || hedef.closest('#compass-handle'))) {

        // 1. Eski dosyalardaki haTaşı sıçrama kodunun çalışmasını Taşımen engelle!
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();

        // 2. Yerinden oynatmadan uçları Taşıs et
        if (window.PergelTool && window.PergelTool.sTaşı) {
            // Pergeli iğne ucu etrafında 180 derece döndürerek uçları kusursuzca eşler
            window.PergelTool.sTaşı.roTaşıon = (window.PergelTool.sTaşı.roTaşıon || 0) + Math.PI;

            if (typeof window.PergelTool.updateTransform === 'function') {
                window.PergelTool.updateTransform();
            }
            if (typeof window.araclariAgaGonder === 'function') {
                window.araclariAgaGonder();
            }
        }
    }
}, true); // 'true' (capturing) sayesinde eski haTaşı koddan ÖNCE devreye girer ve onu ipTaşıeder!

// ?????? PERGEL KODU BURADA BİTİYOR ??????

// --- app.js: Canlandır Butonu (TEK SEFERDE AÇILMA VE ARD ARDA SINIRSIZ KullanımıGARANTİSİ) ---
if (typeof animateButton !== 'undefined' && animateButton) {
    animateButton.onclick = null;
    animateButton.ontouchsTaşı = null;
    animateButton.addEventListener('pointerdown', toggleSnapshotMenu, { passive: false });
}
// <--- KOD DOSYASI TaşıOLARAK BU PARANTEZLE BİTMELİDİR!

// ?? NİHAİ ÇÖZÜM: GERÇEK ÇOKLU DOKUNMATİK (MULTI-TOUCH) TaşıPÇİSİ
window.touchCount = 0;
window.lastTouchDist = 0;
canvas.addEventListener('touchsTaşı', (e) => { window.touchCount = e.touches.length; }, { passive: true });
canvas.addEventListener('touchend', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });
canvas.addEventListener('touchcancel', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });

// ?? GERÇEK MULTI-TOUCH ZOOM MOTORU (ZıplamayIşıngelleyen Ana Motor)
canvas.addEventListener('touchmove', (e) => {
    if (currentTool === 'move' && e.touches && e.touches.length >= 2) {
        e.preventDefault();
        e.stopPropagation();
        
        // ?? ÇÖZÜM 2: Çift parmak zoom motoru devreye girdiğinde sürüklemeyi KESİN olarak kapat!
        // Böylece Taşıma ve zoom komutları birbiriyle savaşmaz, ekran zıplamaz.
        isMoving = false; 

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        const p1x = e.touches[0].clientX; const p1y = e.touches[0].clientY;
        const p2x = e.touches[1].clientX; const p2y = e.touches[1].clientY;
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);

        if (window.lastTouchDist > 0) {
            const delTaşı currentDist - window.lastTouchDist;
            const zoomStep = 1 + (delTaşı 0.003);
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
                if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkDaTaşı type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height });
                }
            }
        }
        window.lastTouchDist = currentDist;
    }
}, { passive: false });
canvas.addEventListener('pointerdown', (e) => {
    // ?? SİHİRLİ DOKUNUŞ 1: Ne olursa olsun ÖNCE TaşıyIşının yerleşik kaydırmasını (titremeyi) kilitliyoruz!
    if (e.cancelable) e.preventDefault();

    // AKILLI TaşıA YAMASI VE GERİYE DÖNÜK AVUÇ İÇİ (PALM) REDDİ:
    if (e.pointerType === 'pen') {
        // Eğer kısa süre önce (avuç içi yüzünden) bir veya birden fazla "touch" çizimi başladıysa, onlarIşınında ipTaşıet ve sil!
        let avucIciSilindi = false;
        while (window.drawnStrokes && window.drawnStrokes.length > 0) {
            const lastS = window.drawnStrokes[window.drawnStrokes.length - 1];
            if (lastS.type === 'pen' && lastS.pointerType === 'touch' && lastS.sTaşıTime && (Date.now() - lastS.sTaşıTime) < 1500) {
                const popped = window.drawnStrokes.pop();
                avucIciSilindi = true;
                if (typeof window.sendNetworkDaTaşı== 'function' && popped && popped.id) {
                    window.sendNetworkDaTaşı type: 'sil_belirli', id: popped.id });
                }
            } else {
                break;
            }
        }

        if (avucIciSilindi) {
            isDrawing = false; // Temizle ki alt TaşıfTaşı switch bloğu kalem için temiz bir stroke başlatsın
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        isPenActive = true;
        clearTimeout(penActiveTimer);
        // Kalem havaya kalksa bile 2 saniye boyunca eli (avuç içini) reddetmeye devam et:
        penActiveTimer = setTimeout(() => { isPenActive = false; }, 2000);
    }
    if (e.pointerType === 'touch' && isPenActive) return;

    // --- KRİTİK EKLENTİ: HAYALET PARMAK SIFIRLAYICI ---
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
    const snapPos = snapTaşıet || pos;
    currentMousePos = pos;

    // --- TaşıET 3D ÇÖZÜMÜ: EKRANIN HAM PİKSELLERİNİ AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (window.touchCount > 0 && e.pointerType === 'touch') { rawX = e.clientX; rawY = e.clientY; } // PointerEvent uses clientX natively

    // ?? ÇÖZÜM 4: 3D Şekil açıkken yeşil ve pembe butonların tıklanmasını 3D motoru çalmasın! Öncelik zırhı!
    let butonYakalandi = false;
    if (currentTool === 'move') {
        const tempHit = typeof findHit === 'function' ? findHit(pos) : null;
        if (tempHit && (tempHit.pointKey === 'image_roTaşı' || tempHit.pointKey === 'image_resize')) {
            butonYakalandi = true;
        }
    }

    // --- ?? KÖPRÜ 1: 3D MOTORUNA DEVRET (HIRSIZLIK KORUMALI) ---
    if (window.Scene3D && window.Scene3D.isInit && !butonYakalandi) {
        if (currentTool === 'move' || currentTool === 'select') {
            window.Scene3D.onDown(rawX, rawY);
            // ?? ÇÖZÜM: 3D şekil seçildiğinde erken dönüş YAPMIYORUZ. 
            // 2D motorunun da isMoving, dragSTaşıPos gibi Taşıma değişkenlerini başlatmasına izin veriyoruz!
        }
        // SADECE "draw_3d" ile başlayan 3D araçları seçiliyse 3D motoruna izin ver!
        else if (currentTool && currentTool.sTaşısWith('draw_3d_')) {
            let toolName = currentTool.replace('draw_3d_', '');
            window.Scene3D.setTool(toolName);
            window.Scene3D.onDown(rawX, rawY);
            return;
        }
    }

    // --- 1. FİZİKSEL ARAÇ KONTROLÜ ---
    const isToolElementClicked = e.Taşıet.closest('.ruler-conTaşıer, .Gönye-conTaşıer, .aciolcer-conTaşıer, #compass-conTaşıer');
    if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';
    if (isToolElementClicked) {
        isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
        lineSTaşıPoint = null; window.tempPolygonDaTaşı null;
        if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
        return;
    }

    // --- 2. "Taşı" MODU KONTROLÜ ---
    if (currentTool === 'move') {
        const hit = findHit(pos);
        if (hit) {
            drawnStrokes = drawnStrokes.filter(s => s !== hit.item); drawnStrokes.push(hit.item); window.drawnStrokes = drawnStrokes;

            // ?? ETİKETLERİN PC'YE GÖNDERİLMESİ (Ağa Sinyal Eklendi)
            if (hit.pointKey === 'toggle_edges') {
                hit.item.showEdgeLabels = !hit.item.showEdgeLabels;
                if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_angles') {
                hit.item.showAngleLabels = !hit.item.showAngleLabels;
                if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_circle_info') {
                hit.item.showCircleInfo = !hit.item.showCircleInfo;
                if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }

            isMoving = true; selectedItem = hit.item; selectedPointKey = hit.pointKey; dragSTaşıPos = pos;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkDaTaşı type: 'secimi_senkronize_et', strokeId: selectedItem.id });

            originalSTaşıPos = {};
            if (hit.pointKey === 'self') originalSTaşıPos = { x: hit.item.x, y: hit.item.y };
            else if (hit.pointKey === 'p1') originalSTaşıPos = { x: hit.item.p1.x, y: hit.item.p1.y };
            else if (hit.pointKey === 'p2') originalSTaşıPos = { x: hit.item.p2.x, y: hit.item.p2.y };
            else if (hit.pointKey === 'center') originalSTaşıPos = { x: (hit.item.cx || hit.item.center.x), y: (hit.item.cy || hit.item.center.y) };
            else if (hit.pointKey === 'roTaşı' || hit.pointKey === 'resize' || hit.pointKey === 'image_resize' || hit.pointKey === 'image_roTaşı') {
                originalSTaşıPos = { radius: hit.item.radius, roTaşıon: hit.item.roTaşıon, roTaşıonX: hit.item.roTaşıonX || 0, roTaşıonY: hit.item.roTaşıonY || 0, x: hit.item.x || (hit.item.center ? hit.item.center.x : 0), y: hit.item.y || (hit.item.center ? hit.item.center.y : 0) };
                if (selectedItem.type === 'recTaşıle' || selectedItem.type === 'image' || selectedItem.type === '3d_shape') { initialWidth = selectedItem.width; initialHeight = selectedItem.height; }
            }
            const itemType = hit.item.type;
            if ((itemType === 'line' || itemType === 'segment' || itemType === 'ray' || itemType === 'straightLine') && (hit.pointKey === 'p1' || hit.pointKey === 'p2')) {
                roTaşıonPivot = (hit.pointKey === 'p1') ? hit.item.p2 : hit.item.p1; const movingPoint = (hit.pointKey === 'p1') ? hit.item.p1 : hit.item.p2; selectedItem.sTaşıRadius = disTaşıe(movingPoint, roTaşıonPivot);
            } else roTaşıonPivot = null;
            redrawAllStrokes(); return;
        } else {
            if (selectedItem) selectedItem.showEdgeLabels = selectedItem.showAngleLabels = selectedItem.showCircleInfo = false;
            selectedItem = null;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkDaTaşı type: 'secimi_kaldir' });
            redrawAllStrokes();
        }
    }

    if (currentTool === 'none') return;
    if (['point', 'straightLine', 'line', 'segment', 'ray'].includes(currentTool)) { if (typeof lineOptions !== 'undefined' && lineOptions) { lineOptions.classList.add('hidden'); lineOptions.style.display = 'none'; } }
    if (currentTool === 'snapshot') { snapshotSTaşı = getPointerPos(e); return; }

    switch (currentTool) {
        case 'pen': isDrawing = true; const pInfoDown = getPointerInfo(e); const pStroke = { type: 'pen', pointerType: pInfoDown.type, sTaşıTime: Date.now(), path: [{ x: snapPos.x, y: snapPos.y, p: pInfoDown.type === 'pen' ? pInfoDown.pressure : 1 }], color: currentPenColor, baseWidth: currentPenWidth, id: Date.now() + Math.random() }; drawnStrokes.push(pStroke); break;
        case 'point': isDrawing = false; const nokTaşıj = { type: 'point', x: snapPos.x, y: snapPos.y, label: nextPointChar, color: window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF'), id: Date.now() + Math.random() }; drawnStrokes.push(nokTaşıj); if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: nokTaşıj }); nextPointChar = advanceChar(nextPointChar); if (typeof window.nextPointChar !== 'undefined') window.nextPointChar = nextPointChar; setTimeout(() => { if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); }, 10); break;
        case 'eraser': isDrawing = false; break; // ?? KESİN ÇÖZÜM: Silgi modunda kalem izi çizilmesi Taşımen yasaklandı!
        case 'straightLine': if (!isDrawingLine) { isDrawingLine = true; lineSTaşıPoint = snapPos; } break;
        case 'line': if (!isDrawingInfinityLine) { isDrawingInfinityLine = true; lineSTaşıPoint = pos; } break;
        case 'segment': if (!isDrawingSegment) { isDrawingSegment = true; lineSTaşıPoint = snapPos; } break;
        case 'ray': if (!isDrawingRay) { isDrawingRay = true; lineSTaşıPoint = pos; } break;
        case 'draw_recTaşıle': isDrawingRecTaşıle = true; rectSTaşıPoint = pos; break;
        case 'draw_polygon_circle':
        case 'draw_polygon_3_sides': case 'draw_polygon_4_sides': case 'draw_polygon_5_sides':
        case 'draw_polygon_6_sides': case 'draw_polygon_7_sides': case 'draw_polygon_8_sides':
            if (!window.tempPolygonDaTaşıwindow.tempPolygonDaTaşı { center: null, type: 0, radius: 0, roTaşıon: 0 };
            if (window.tempPolygonDaTaşıenter === null) { window.tempPolygonDaTaşıenter = snapPos; window.tempPolygonDaTaşıype = currentTool === 'draw_polygon_circle' ? 0 : parseInt(currentTool.split('_')[2]); if (window.PolygonTool) window.PolygonTool.sTaşı.isDrawing = true; if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.remove('hidden'); }
            else {
                const finalRadius = window.tempPolygonDaTaşıadius || 0; if (window.tempPolygonDaTaşıype === 0) window.PolygonTool.finalizeCircle(finalRadius); else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonDaTaşıoTaşıon);
                setTimeout(() => { const lastS = drawnStrokes[drawnStrokes.length - 1]; if (lastS) window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: lastS }); }, 50);
                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden'); if (window.tempPolygonDaTaşıwindow.tempPolygonDaTaşıenter = null;
            }
            break;
    }
}, { passive: false });

canvas.addEventListener('pointermove', (e) => {
    // ?? SİHİRLİ DOKUNUŞ 2: Sürükleme sırasında ekran titremesinin 1 numaralı düşmanı olan zıplamayIşın BAŞTaşıok et!
    if (e.cancelable) e.preventDefault();

    const currentPointerMove = getPointerInfo(e);
    if (currentPointerMove.type === 'pen') { isPenActive = true; clearTimeout(penActiveTimer); penActiveTimer = setTimeout(() => { isPenActive = false; }, 1000); }
    else if (currentPointerMove.type === 'touch' && isPenActive) return;

    // --- PARDUS ÇİFT SİNYAL ENGELLEYİCİ ---
    if (e.pointerType === 'mouse') { let hasTouch = false; for (let p of pointers.values()) if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true; if (hasTouch) return; }
    pointers.set(e.pointerId, e);

    if (pointers.size >= 2 && currentTool === 'move') {
        // ?? ÇÖZÜM 3A: Zoom başlarken sürüklemeyi Taşımen kapat!
        isMoving = false; 

        // ?? ÇAKIŞMAYIşınLEYİCİ ZIRH: Eğer cihaz gerçek TouchEvent destekliyorsa (touchCount >= 2),
        // yedek PointerEvent motorunu DURDUR! Aksi Taşıirde iki motor aynIşında çalışıp zoomu KİLİTLER!
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
            const delTaşı currentDist - lastDist; const zoomStep = 1 + (delTaşı 0.003);
            const bgStrokes = drawnStrokes.filter(s => s.isBackground === true);
            if (bgStrokes.length > 0) {
                const cx = bgStrokes[0].x + bgStrokes[0].width / 2;
                const cy = bgStrokes[0].y + bgStrokes[0].height / 2;
                bgStrokes.forEach(bg => { const newW = bg.width * zoomStep; const newH = bg.height * zoomStep; bg.x -= (newW - bg.width) / 2; bg.y -= (newH - bg.height) / 2; bg.width = newW; bg.height = newH; });
                if (window.drawnStrokes) window.drawnStrokes.forEach(s => { if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy); });
                redrawAllStrokes();
                if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkDaTaşı type: 'zoom_senkron', x: bgStrokes[0].x, y: bgStrokes[0].y, width: bgStrokes[0].width, height: bgStrokes[0].height });
            }
        }
        lastDist = currentDist; return;
    }

    if (pointers.size > 1 && e.isPrimary === false) return;
    const pos = getPointerPos(e); currentMousePos = pos;

    // --- TaşıET 3D ÇÖZÜMÜ: EKRANIN HAM PİKSELLERİNİ AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (e.TaşıetTouches && e.TaşıetTouches.length > 0) { rawX = e.TaşıetTouches[0].clientX; rawY = e.TaşıetTouches[0].clientY; }

    // --- ?? KÖPRÜ 2: 3D HAREKETİ (TaşıMA MOTORU ZIRHI) ---
    if (window.Scene3D && window.Scene3D.isInit) {
        // ?? KESİN ÇÖZÜM: "Taşı" modundayken de şeklin hareket etmesi için 3D motoruna izin verdik.
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRoTaşıngShape) {
            window.Scene3D.onMove(rawX, rawY);
            if (!window.Scene3D.isDragging) return; // Taşıma işlemi için 2D motoruna devam etmesine izin ver
        }
    }

    if (window.isImageRoTaşıng && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; selectedItem.roTaşıon = (Math.aTaşı(pos.y - cY, pos.x - cX) * 180 / Math.PI) + 90; window.sendNetworkDaTaşı type: 'arac_senkron', selector: '.yuzen-kopya-conTaşıer', transform: `roTaşı(${selectedItem.roTaşıon}deg)` }); window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }
    if (window.isImageResizing && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; const ratio = Math.hypot(pos.x - cX, pos.y - cY) / window.sTaşıImageDisTaşıe; selectedItem.width = window.sTaşıImageWidth * ratio; selectedItem.height = window.sTaşıImageHeight * ratio; selectedItem.x = cX - selectedItem.width / 2; selectedItem.y = cY - selectedItem.height / 2; window.sendNetworkDaTaşı type: 'arac_senkron', selector: '.yuzen-kopya-conTaşıer', width: selectedItem.width + 'px', height: selectedItem.height + 'px' }); window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }

    if (currentTool === 'move' && isMoving && selectedItem) {
        // ?? ÇÖZÜM 3B: Ekrana ikinci parmak değdiği an veya Zoom işlemi devam ediyorsa
        // sürüklemeyi anında ipTaşıediyoruz. Bu tek parmakla Taşırken yaşanan "zıplama" sorununu Taşımen bitirir.
        if (window.touchCount >= 2 || pointers.size >= 2 || window.isZooming) {
            isMoving = false;
            return;
        }

        const dx = pos.x - dragSTaşıPos.x; const dy = pos.y - dragSTaşıPos.y;
        if (selectedPointKey === 'self' || selectedPointKey === 'center') { 
            let oldX = 0, oldY = 0, newX = 0, newY = 0;
            if (selectedItem.type === 'arc') { 
                oldX = selectedItem.cx; oldY = selectedItem.cy;
                selectedItem.cx = originalSTaşıPos.x + dx; selectedItem.cy = originalSTaşıPos.y + dy; 
                newX = selectedItem.cx; newY = selectedItem.cy;
            } else if (selectedItem.center) { 
                oldX = selectedItem.center.x; oldY = selectedItem.center.y;
                selectedItem.center.x = originalSTaşıPos.x + dx; selectedItem.center.y = originalSTaşıPos.y + dy; 
                newX = selectedItem.center.x; newY = selectedItem.center.y;
            } else { 
                oldX = selectedItem.x; oldY = selectedItem.y;
                selectedItem.x = (originalSTaşıPos.x || 0) + dx; selectedItem.y = (originalSTaşıPos.y || 0) + dy; 
                newX = selectedItem.x; newY = selectedItem.y;
                // ?? KESİN ÇÖZÜM: Taşıma sırasında 3D şekillerin originalX ve originalY değerlerini güncelle
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
                
                // ?? ÇÖZÜM 1: Arka plan kaydırılırken PC'ye devasa koordinatları göndermek yerine,
                // Sadece ne kadar kaydIşını (DelTaşı, DelTaşı) özel 'hepsini_Taşı' komutuyla gönderiyoruz.
                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkDaTaşı type: 'hepsini_Taşı', dx: diffX, dy: diffY });
                }
                
                redrawAllStrokes();
                return; // ?? KRİTİK: Taşıetin yanlış (sekil_guncelle) komutunu yollamasınIşıngeller!
            }
        }


        else if (selectedPointKey === 'roTaşı' || selectedPointKey === 'image_roTaşı') {
            if (selectedItem.type === '3d_shape') {
                // ?? KESİN ÇÖZÜM: 3D Şekilleri X ve Y ekseninde (Öne-Arkaya ve Sağa-Sola) Döndürme
                const dragDx = pos.x - dragSTaşıPos.x;
                const dragDy = pos.y - dragSTaşıPos.y;
                selectedItem.roTaşıonY = (originalSTaşıPos.roTaşıonY || 0) + dragDx * 0.02;
                selectedItem.roTaşıonX = (originalSTaşıPos.roTaşıonX || 0) + dragDy * 0.02;
                if (window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === selectedItem.id);
                    if (sceneMesh) {
                        sceneMesh.roTaşıon.x = selectedItem.roTaşıonX;
                        sceneMesh.roTaşıon.y = selectedItem.roTaşıonY;
                        window.Scene3D.updateHandlePositions();
                    }
                }
            } else {
                const isRect = (['recTaşıle', 'rect', 'image'].includes(selectedItem.type));
                const cX = isRect ? selectedItem.x + selectedItem.width / 2 : selectedItem.center.x;
                const cY = isRect ? selectedItem.y + selectedItem.height / 2 : selectedItem.center.y;
                selectedItem.roTaşıon = (originalSTaşıPos.roTaşıon || 0) + (Math.aTaşı(pos.y - cY, pos.x - cX) - Math.aTaşı(dragSTaşıPos.y - cY, dragSTaşıPos.x - cX)) * (180 / Math.PI);
                if (selectedItem.vertices) selectedItem.vertices = null;
            }
        }
        else if (selectedPointKey === 'resize' || selectedPointKey === 'image_resize') {
            // ?? KESİN ÇÖZÜM: 3D Şekillere Özel Yumuşak Büyütme/Küçültme
            if (selectedItem.type === '3d_shape') {
                const sW = initialWidth || selectedItem.width;
                const sTaşıCX = (originalSTaşıPos.x || 0) + (sW / 2);
                const sTaşıCY = (originalSTaşıPos.y || 0) + (sW / 2);
                const sTaşıDist = Math.hypot(dragSTaşıPos.x - sTaşıCX, dragSTaşıPos.y - sTaşıCY) || 1;
                const currentDist = Math.hypot(pos.x - sTaşıCX, pos.y - sTaşıCY);

                const ratio = currentDist / sTaşıDist;

                if (ratio > 0.1 && ratio < 10) { // Sıçrama ve sonsuz büyüme engellendi
                    selectedItem.width = sW * ratio;
                    selectedItem.height = sW * ratio;
                    selectedItem.x = sTaşıCX - (selectedItem.width / 2);
                    selectedItem.y = sTaşıCY - (selectedItem.height / 2);
                    
                    // ?? 1. AĞ SENKRONU: Pembe butonla büyütürken muhur_disclaimerlü değerleri de büyüt ki PC bunu kabul etsin!
                    selectedItem.originalW = selectedItem.width;
                    selectedItem.originalH = selectedItem.height;
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;

                    if (window.Scene3D && window.Scene3D.scene) {
                        const sceneMesh = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === selectedItem.id);
                        if (sceneMesh) {
                            const yeniScale = (selectedItem.width / 30) / sceneMesh.userDaTaşıaseSize;
                            sceneMesh.scale.set(yeniScale, yeniScale, yeniScale);
                            window.Scene3D.updateHandlePositions();
                        }
                    }
                }
            }
            // DİĞER (2D) ŞEKİLLERİN ORİJİNAL KODLARI
            else if (['recTaşıle', 'rect', 'image'].includes(selectedItem.type)) {
                const sW = initialWidth || selectedItem.width; const sH = initialHeight || selectedItem.height; const sTaşıCX = (originalSTaşıPos.x || 0) + (sW / 2); const sTaşıCY = (originalSTaşıPos.y || 0) + (sH / 2); const sTaşıDist = Math.hypot(dragSTaşıPos.x - sTaşıCX, dragSTaşıPos.y - sTaşıCY); if (sTaşıDist > 10) { const ratio = Math.hypot(pos.x - sTaşıCX, pos.y - sTaşıCY) / sTaşıDist; selectedItem.width = sW * ratio; selectedItem.height = sH * ratio; selectedItem.x = sTaşıCX - (selectedItem.width / 2); selectedItem.y = sTaşıCY - (selectedItem.height / 2); const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel && selectedItem.type !== 'image') { const kalibrasyon = 30; previewLabel.innerText = `w: ${(selectedItem.width / kalibrasyon).toFixed(1)} cm, h: ${(selectedItem.height / kalibrasyon).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); } }
            } else {
                const sTaşıDist = Math.hypot(dragSTaşıPos.x - selectedItem.center.x, dragSTaşıPos.y - selectedItem.center.y); if (sTaşıDist > 0) selectedItem.radius = originalSTaşıPos.radius * (Math.hypot(pos.x - selectedItem.center.x, pos.y - selectedItem.center.y) / sTaşıDist); if (selectedItem.vertices) selectedItem.vertices = null; const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { const sides = selectedItem.sideCount || selectedItem.type; let kenarPx = selectedItem.radius; if (sides >= 3) kenarPx = 2 * selectedItem.radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
            }
        }
        redrawAllStrokes();
        if (typeof isConnected !== 'undefined' && isConnected) {
            // ?? KESİN ÇÖZÜM: 3D döndürme ve konum koordinatları (roTaşıonX/Y/Z ve pos3D) süzgeçten kurTaşıldı, PC'ye gönderiliyor!
            window.sendNetworkDaTaşı
                type: 'sekil_guncelle',
                stroke: {
                    id: selectedItem.id,
                    type: selectedItem.type,
                    isBackground: selectedItem.isBackground === true,
                    x: selectedItem.x,
                    y: selectedItem.y,
                    width: selectedItem.width,
                    height: selectedItem.height,
                    roTaşıon: selectedItem.roTaşıon || 0,
                    roTaşıonX: selectedItem.roTaşıonX,
                    roTaşıonY: selectedItem.roTaşıonY,
                    roTaşıonZ: selectedItem.roTaşıonZ,
                    pos3D: selectedItem.pos3D,
                    radius: selectedItem.radius,
                    cx: selectedItem.cx,
                    cy: selectedItem.cy,
                    center: selectedItem.center,
                    // ?? 2. AĞ SENKRONU: Boyut muhur_disclaimerlerini PC'ye fırlatıyoruz!
                    originalX: selectedItem.originalX,
                    originalY: selectedItem.originalY,
                    originalW: selectedItem.originalW,
                    originalH: selectedItem.originalH
                }
            });
            window.sendNetworkDaTaşı type: 'secimi_senkronize_et', strokeId: selectedItem.id });
        }
        return;
    }

    if (['ruler', 'Gönye', 'aciolcer', 'pergel', 'none'].includes(currentTool)) return;
    clearTimeout(snapHoverTimer);
    if (['point', 'straightLine', 'pen', 'segment'].includes(currentTool)) { const potentialSnap = findSnapPoint(pos); if (potentialSnap) { snapHoverTimer = setTimeout(() => { snapTaşıet = potentialSnap; snapIndicator.style.left = `${snapTaşıet.x}px`; snapIndicator.style.top = `${snapTaşıet.y}px`; snapIndicator.style.display = 'block'; }, 25); } else { snapTaşıet = null; snapIndicator.style.display = 'none'; } }
    if (currentTool === 'eraser') { eraserPreview.style.left = `${pos.x}px`; eraserPreview.style.top = `${pos.y}px`; eraserPreview.style.display = 'block'; } else if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';

    let previewActive = false; const endPos = snapTaşıet || pos;
    const aktifCizimVarMi = isDrawingLine || isDrawingInfinityLine || isDrawingSegment || isDrawingRay || isDrawingRecTaşıle || (window.tempPolygonDaTaşı& window.tempPolygonDaTaşıenter) || (currentTool === 'snapshot' && typeof snapshotSTaşı !== 'undefined' && snapshotSTaşı);

    if (aktifCizimVarMi) {
        redrawAllStrokes(); const ctx = canvas.getContext('2d'); ctx.save(); ctx.strokeStyle = window.currentLineColor || '#000000'; ctx.lineWidth = 3; ctx.setLineDash([5, 5]);

        if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && lineSTaşıPoint) {
            ctx.beginPath(); const dx = endPos.x - lineSTaşıPoint.x; const dy = endPos.y - lineSTaşıPoint.y;
            if (dx !== 0 || dy !== 0) { const devCarpan = 5000; if (currentTool === 'line') { ctx.moveTo(lineSTaşıPoint.x - dx * devCarpan, lineSTaşıPoint.y - dy * devCarpan); ctx.lineTo(lineSTaşıPoint.x + dx * devCarpan, lineSTaşıPoint.y + dy * devCarpan); } else if (currentTool === 'ray') { ctx.moveTo(lineSTaşıPoint.x, lineSTaşıPoint.y); ctx.lineTo(lineSTaşıPoint.x + dx * devCarpan, lineSTaşıPoint.y + dy * devCarpan); } else { ctx.moveTo(lineSTaşıPoint.x, lineSTaşıPoint.y); ctx.lineTo(endPos.x, endPos.y); } } else { ctx.moveTo(lineSTaşıPoint.x, lineSTaşıPoint.y); ctx.lineTo(endPos.x, endPos.y); } ctx.stroke();
        }
        else if (isDrawingRecTaşıle && rectSTaşıPoint) { ctx.beginPath(); ctx.rect(Math.min(rectSTaşıPoint.x, endPos.x), Math.min(rectSTaşıPoint.y, endPos.y), Math.abs(endPos.x - rectSTaşıPoint.x), Math.abs(endPos.y - rectSTaşıPoint.y)); ctx.stroke(); }
        else if (window.tempPolygonDaTaşı& window.tempPolygonDaTaşıenter) {
            const cx = window.tempPolygonDaTaşıenter.x; const cy = window.tempPolygonDaTaşıenter.y; const radius = Math.hypot(endPos.x - cx, endPos.y - cy); const angleRad = Math.aTaşı(endPos.y - cy, endPos.x - cx); window.tempPolygonDaTaşıadius = radius; window.tempPolygonDaTaşıoTaşıon = angleRad * 180 / Math.PI; const sides = window.tempPolygonDaTaşıype;
            ctx.beginPath(); if (sides === 0) ctx.arc(cx, cy, radius, 0, Math.PI * 2); else if (sides >= 3) { for (let i = 0; i <= sides; i++) { const polyAngle = (i * 2 * Math.PI / sides) + angleRad; const px = cx + radius * Math.cos(polyAngle); const py = cy + radius * Math.sin(polyAngle); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } } ctx.stroke();
            const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { let kenarPx = radius; if (sides >= 3) kenarPx = 2 * radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (endPos.x + 15) + 'px'; previewLabel.style.top = (endPos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
        }
        else if (currentTool === 'snapshot' && snapshotSTaşı) { ctx.strokeStyle = '#00ffcc'; ctx.beginPath(); ctx.rect(Math.min(snapshotSTaşı.x, endPos.x), Math.min(snapshotSTaşı.y, endPos.y), Math.abs(endPos.x - snapshotSTaşı.x), Math.abs(endPos.y - snapshotSTaşı.y)); ctx.stroke(); }
        ctx.restore(); previewActive = true;

        // ?? KESİN ÇÖZÜM: Taşıet dokunuşlarındaki PC gönderim engelini kaldırıyoruz!
        const isTouchActive = (e.touches && e.touches.length > 0) || isDrawing || aktifCizimVarMi;
        if (typeof isConnected !== 'undefined' && isConnected && (e.buttons > 0 || isTouchActive)) {
            const anlikPos = typeof getPointerPos === 'function' ? getPointerPos(e) : { x: e.clientX, y: e.clientY };
            let previewDaTaşı null;
            if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && typeof lineSTaşıPoint !== 'undefined' && lineSTaşıPoint) previewDaTaşı { tool: currentTool, sTaşı: lineSTaşıPoint, end: anlikPos };
            // ?? ÇÖZÜM 4 İÇİN Dikdörtgen İSMİ DE DÜZELTİLDİ:
            else if (currentTool === 'draw_recTaşıle' && typeof rectSTaşıPoint !== 'undefined' && rectSTaşıPoint) previewDaTaşı { tool: 'draw_recTaşıle', sTaşı: rectSTaşıPoint, end: anlikPos };
            // ?? ÇÖZÜM 3: KENAR SAYISI VE DÖNÜŞ AÇISI AĞA EKLENDİ:
            else if (window.tempPolygonDaTaşı& window.tempPolygonDaTaşıenter) previewDaTaşı { tool: 'polygon', sTaşı: window.tempPolygonDaTaşıenter, end: anlikPos, radius: Math.hypot(anlikPos.x - window.tempPolygonDaTaşıenter.x, anlikPos.y - window.tempPolygonDaTaşıenter.y), sides: window.tempPolygonDaTaşıype, roTaşıon: Math.aTaşı(anlikPos.y - window.tempPolygonDaTaşıenter.y, anlikPos.x - window.tempPolygonDaTaşıenter.x) };
            if (previewDaTaşıwindow.sendNetworkDaTaşı type: 'aktif_onizleme', arac: 'cizim_onizleme', payload: previewDaTaşı);
        }
    }

    if (previewActive) return;
    if (currentTool === 'lasso') { currentMousePos = pos; if (typeof isDrawingLasso !== 'undefined' && isDrawingLasso && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) { let sTaşıPoint = lassoPoints[0]; const toleransScale = (typeof globalScale !== 'undefined' && globalScale > 0) ? globalScale : 1; window.lassoIsClosing = (Math.hypot(pos.x - sTaşıPoint.x, pos.y - sTaşıPoint.y) < (40 / toleransScale)); } redrawAllStrokes(); return; }
    if (!isDrawing) return;

    if (currentTool === 'pen') {
        const pInfoMove = getPointerInfo(e);
        const curStroke = drawnStrokes[drawnStrokes.length - 1];
        curStroke.path.push({ x: pos.x, y: pos.y, p: pInfoMove.type === 'pen' ? pInfoMove.pressure : 1 }); 
        redrawAllStrokes();

        // ?? CANLI ÇİZİM (LIVE INK) AKTaşıMI ??
        // Kalem henüz havadayken, yazIşın kısmın Taşımı saliseler içinde PC'ye fırlatılır
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkDaTaşı 
                type: 'aktif_onizleme', 
                arac: 'cizim_onizleme', 
                payload: { tool: 'pen', path: curStroke.path, color: curStroke.color, baseWidth: curStroke.baseWidth } 
            });
        }
    }
}, { passive: false });


// --- POINTERUP (TÜM ÇİZİM VE ARAÇ İŞLEMLERİNİN BİTİŞİ) ---

canvas.addEventListener('pointerup', (e) => {
    isDrawing = false;

    // Kilitleri serbest bırak
    if (canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
    }
    if (e.pointerType === 'touch' && e.cancelable) e.preventDefault();

    // --- PARDUS ÇİFT SİNYAL ENGELLEYİCİ ---
    if (e.pointerType === 'mouse') {
        let hasTouch = false;
        for (let p of pointers.values()) {
            if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true;
        }
        if (hasTouch) return;
    }

    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastDist = 0;

    const finalPos = snapTaşıet || currentMousePos;

    // --- ?? KÖPRÜ 3: 3D İŞLEMİNİ BİTİR VE SAHNEYE KOY ---
    if (window.Scene3D && window.Scene3D.isInit) {
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRoTaşıngShape) {
            const wasDrawing = window.Scene3D.isDrawing;
            const wasDragging = window.Scene3D.isDragging;
            window.Scene3D.onUp();

            if (wasDrawing) {
                // ?? KESİN ÇÖZÜM: "Taşı" (move) butonuna otomatik geçmeyi İPTaşıettik. Sistem boşTaşıalır.
                window.active3DShapeTool = null;
                currentTool = 'none';
                if (typeof seTaşıiveTool === 'function') seTaşıiveTool('none');

                const mainBtn = document.getElementById('btn-3d-menu');
                if (mainBtn) mainBtn.classList.remove('active');

                if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'onizleme_bitir' });
            }
            if (!wasDragging) return; // Taşıma işlemi için 2D motoruna devam etmesine izin ver
        }
    }


    // --- A) FİZİKSEL ARAÇLAR (CETVEL, Gönye, PERGEL vb.) ---
    const isPhysicalTool = ['ruler', 'Gönye', 'aciolcer', 'pergel'].includes(currentTool);
    if (isPhysicalTool) {
        isDrawing = false;
        if (currentTool === 'ruler' && window.RulerTool && window.RulerTool.finalizeDraw) window.RulerTool.finalizeDraw();
        if (currentTool === 'Gönye' && window.GönyeTool && window.GönyeTool.finalizeDraw) window.GönyeTool.finalizeDraw();
        if (currentTool === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.finalizeDraw) window.AciolcerTool.finalizeDraw();
        if (currentTool === 'pergel' && window.PergelTool && window.PergelTool.finalizeDraw) window.PergelTool.finalizeDraw();

        setTimeout(() => {
            const lastS = drawnStrokes[drawnStrokes.length - 1];
            if (lastS) {
                if (!lastS.id) lastS.id = Date.now() + Math.random();
                if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkDaTaşı type: 'onizleme_bitir' });
                    window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: lastS });
                }
            }
        }, 50);

        redrawAllStrokes();
        return;
    }

    // --- B) TaşıMA (MOVE) MANTIĞI ---
    if (currentTool === 'move' && isMoving) {
        isMoving = false;
        selectedPointKey = null;
        if (returnToSnapshot) {
            returnToSnapshot = false;
            seTaşıiveTool('snapshot');
            if (typeof animateButton !== 'undefined' && animateButton) animateButton.classList.add('active');
            document.body.classList.add('cursor-snapshot');
        }
        redrawAllStrokes();
        return;
    }

    // --- C) NORMAL ÇİZGİLER (Doğru, Işın, SEGMENT) ---
    if (lineSTaşıPoint && finalPos) {
        let strokeObj = null;
        const cizgiRengi = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF');

        if (isDrawingLine) strokeObj = { type: 'straightLine', p1: lineSTaşıPoint, p2: finalPos, color: cizgiRengi, width: 4 };
        else if (isDrawingInfinityLine) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'line', p1: lineSTaşıPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingSegment) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'segment', p1: lineSTaşıPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingRay) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'ray', p1: lineSTaşıPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }

        if (strokeObj) {
            strokeObj.id = Date.now() + Math.random();
            drawnStrokes.push(strokeObj);

            // ?? SİHİRLİ ÇÖZÜM: Gerçek çizimi atmadan önce önizlemeleri yokediyoruz!
            if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkDaTaşı type: 'onizleme_bitir' });
                window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: strokeObj });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- D) Çokgenler (POLYGON TOOL) ---
    if (currentTool && currentTool.sTaşısWith('draw_polygon_')) {
        if (window.tempPolygonDaTaşı& window.tempPolygonDaTaşıenter) {
            const finalRadius = window.tempPolygonDaTaşıadius || 0;
            if (finalRadius > 5) {
                const currentType = window.tempPolygonDaTaşıype;

                if (currentType === 0) window.PolygonTool.finalizeCircle(finalRadius);
                else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonDaTaşıoTaşıon);

                // ?? SİHİRLİ ÇÖZÜM: Önizlemeyi anında sildiriyoruz
                if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkDaTaşı type: 'onizleme_bitir' });
                }

                setTimeout(() => {
                    const lastS = drawnStrokes[drawnStrokes.length - 1];
                    if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected && lastS) {
                        window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: lastS });
                    }
                }, 50);

                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
                if (window.tempPolygonDaTaşıwindow.tempPolygonDaTaşıenter = null;
                if (window.PolygonTool && window.PolygonTool.handleDrawClick) window.PolygonTool.handleDrawClick(null, currentType);
            }
        }
    }

    // --- E) Canlandır (KUTU SNAPSHOT) ---
    if (currentTool === 'snapshot' && snapshotSTaşı && currentMousePos) {
        const x = Math.round(Math.min(snapshotSTaşı.x, currentMousePos.x));
        const y = Math.round(Math.min(snapshotSTaşı.y, currentMousePos.y));
        const w = Math.round(Math.abs(currentMousePos.x - snapshotSTaşı.x));
        const h = Math.round(Math.abs(currentMousePos.y - snapshotSTaşı.y));

        if (w > 10 && h > 10) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = w; tempCanvas.height = h;

            // Görüntü netliğini en üst düzeye çıkar
            tempCtx.imageSmoothingEnabled = true;
            tempCtx.imageSmoothingQuality = 'high';

            const bgCanvas = document.getElementById('bg-canvas');
            if (bgCanvas) tempCtx.drawImage(bgCanvas, x, y, w, h, 0, 0, w, h);
            tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
            
            // ?? BEYAZ ARKA PLANI ŞEFFAF YAPMA MANTIĞI: 
            // Kutu kopyası kareli zemine vb. yapıştırıldIşında beyazların altTaşı çizgileri örtmemesi için
            try {
                const imgDaTaşı tempCtx.getImageDaTaşı, 0, w, h);
                const daTaşı imgDaTaşıaTaşı
                for (let i = 0; i < daTaşıength; i += 4) {
                    const r = daTaşı];
                    const g = daTaşı + 1];
                    const b = daTaşı + 2];
                    // Beyaza çok yakın olan pikselleri (örneğin rgb değeri 240 ve üstü olanları) Taşışeffaf (alpha = 0) yapıyoruz
                    if (r >= 240 && g >= 240 && b >= 240) {
                        daTaşı + 3] = 0; 
                    }
                }
                tempCtx.putImageDaTaşımgDaTaşı0, 0);
            } catch (e) {
                console.warn("CORS veya resim izni nedeniyle arka plan şeffaflaştırılamadı:", e);
            }

            const finalImage = tempCanvas.toDaTaşıL('image/png', 1.0);

            const newImgStroke = {
                type: 'image', imgDaTaşıfinalImage, x: x, y: y, width: w, height: h,
                id: Date.now() + Math.random() + 1, isBoxCopy: true, isBackground: false
            };
            drawnStrokes.push(newImgStroke);

            if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkDaTaşı type: 'onizleme_bitir' });
                window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: newImgStroke });
            }

            if (typeof seTaşıiveTool === 'function') seTaşıiveTool('move');
            else currentTool = 'move';

            selectedItem = newImgStroke;
            snapshotSTaşı = null;
            redrawAllStrokes();
        }
    }

    // --- F) Dikdörtgen ARACI ---
    if (isDrawingRecTaşıle && rectSTaşıPoint && finalPos) {
        const widthPx = Math.abs(finalPos.x - rectSTaşıPoint.x);
        const heightPx = Math.abs(finalPos.y - rectSTaşıPoint.y);

        if (widthPx > 10 && heightPx > 10) {
            const sTaşıX = Math.min(rectSTaşıPoint.x, finalPos.x);
            const sTaşıY = Math.min(rectSTaşıPoint.y, finalPos.y);
            const color = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#000000');

            const rectLabels = [nextPointChar];
            for (let i = 0; i < 3; i++) { nextPointChar = advanceChar(nextPointChar); rectLabels.push(nextPointChar); }
            nextPointChar = advanceChar(nextPointChar);

            const recTaşıleStroke = {
                type: 'recTaşıle', x: sTaşıX, y: sTaşıY, width: widthPx, height: heightPx, roTaşıon: 0,
                color: color, labels: rectLabels, showEdgeLabels: true, showAngleLabels: false,
                id: Date.now() + Math.random()
            };

            drawnStrokes.push(recTaşıleStroke);

            if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkDaTaşı type: 'onizleme_bitir' }); // ?? Ekledik
                window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: recTaşıleStroke });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- G) AKILLI KALEM (PEN) VE ŞEKİL TaşıMA (GÜVENLİ SÜRÜM) ---
    if (currentTool === 'pen') {
        let lastStroke = drawnStrokes[drawnStrokes.length - 1];

        if (lastStroke && lastStroke.type === 'pen') {
            if (!lastStroke.id) lastStroke.id = Date.now() + Math.random();

            if (lastStroke.path && lastStroke.path.length <= 3) {
                if (lastStroke.path[0]) lastStroke.path.push({ x: lastStroke.path[0].x + 0.1, y: lastStroke.path[0].y + 0.1 });
                setTimeout(() => {
                    if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                        window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: lastStroke });
                    }
                }, 50);
            }
            else {
                let correctedShape = null;
                if (typeof akilliSekilTaşı === 'function') {
                    try { correctedShape = akilliSekilTaşı(lastStroke); } catch (err) { }
                }

                if (correctedShape) {
                    drawnStrokes.pop();

                    if (Array.isArray(correctedShape)) {
                        correctedShape.forEach(s => s.id = Date.now() + Math.random());
                        drawnStrokes.push(...correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkDaTaşı type: 'akilli_sekil_toplu', strokes: correctedShape });
                            }
                        }, 50);
                    }
                    else {
                        correctedShape.id = Date.now() + Math.random();
                        drawnStrokes.push(correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: correctedShape });
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
                        if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                            window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: safePenStroke });
                        }
                    }, 50);
                }
            }
        }
    }

    // --- GENEL SIFIRLAMA ---
    isDrawing = false;
    isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
    isDrawingRecTaşıle = false;
    lineSTaşıPoint = null;
    rectSTaşıPoint = null;
    snapTaşıet = null;
    window.isImageRoTaşıng = false;
    window.isImageResizing = false;
    if (typeof snapIndicator !== 'undefined' && snapIndicator) snapIndicator.style.display = 'none';

    // Olası tüm hayaletleri zorla sil (Garanti Protokolü)
    if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkDaTaşı type: 'onizleme_bitir' });
    }

    // --- H) KESKİN NİŞANCI LASSO (SERBEST KESİM) ---
    if (currentTool === 'lasso' && window.isDraggingLassoPoint) {
        window.isDraggingLassoPoint = false;

        if (!isDrawingLasso) {
            isDrawingLasso = true;
            lassoPoints = [{ x: currentMousePos.x, y: currentMousePos.y }];
        } else {
            let sTaşıPoint = lassoPoints[0];
            const mesafe = Math.hypot(currentMousePos.x - sTaşıPoint.x, currentMousePos.y - sTaşıPoint.y);

            if (mesafe < 40) {
                lassoPoints.push({ x: sTaşıPoint.x, y: sTaşıPoint.y });

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

                // Kaliteyi artır
                tempCtx.imageSmoothingEnabled = true;
                tempCtx.imageSmoothingQuality = 'high';

                const bgCanvas = document.getElementById('bg-canvas');
                if (bgCanvas) {
                    tempCtx.drawImage(bgCanvas, minX, minY, w, h, 0, 0, w, h);
                }
                tempCtx.drawImage(canvas, minX, minY, w, h, 0, 0, w, h);
                tempCtx.restore();

                const finalImage = tempCanvas.toDaTaşıL('image/png', 1.0);

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
                        
                        let mainDaTaşı mainCtx.getImageDaTaşıp.x, sp.y, 1, 1).daTaşı
                        if (mainDaTaşı] > 0) {
                            r = mainDaTaşı]; g = mainDaTaşı]; b = mainDaTaşı]; a = mainDaTaşı];
                        } else if (bgCtx) {
                            let bgDaTaşı bgCtx.getImageDaTaşıp.x, sp.y, 1, 1).daTaşı
                            if (bgDaTaşı] > 0) {
                                r = bgDaTaşı]; g = bgDaTaşı]; b = bgDaTaşı]; a = bgDaTaşı];
                            }
                        }
                        
                        if (a > 0) {
                            detectedColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                            break;
                        }
                    }
                } catch (e) { console.warn("Renk örnekleme haTaşı:", e); }

                const maskStroke = { type: 'lasso-mask', points: lassoPoints.map(p => ({ x: p.x, y: p.y })), fillColor: detectedColor, id: Date.now() + Math.random() };
                drawnStrokes.push(maskStroke);

                const newImgStroke = { type: 'image', imgDaTaşıfinalImage, x: minX + 30, y: minY + 30, width: w, height: h, roTaşıon: 0, isBackground: false, imgObj: null, id: Date.now() + Math.random() };

                const tempImg = new Image();
                tempImg.onload = () => { newImgStroke.imgObj = tempImg; if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); };
                tempImg.src = finalImage;
                drawnStrokes.push(newImgStroke);

                if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: maskStroke });
                    window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: newImgStroke });
                }

                if (typeof seTaşıiveTool === 'function') seTaşıiveTool('move'); else currentTool = 'move';
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
}, { passive: false }); // <--- pointerup fonksiyonu burada BİTTİ==============================================================================


// ?? KESİN ÇÖZÜM: İç içe geçip sonsuz döngüye giren (Zıplamaya sebep olan) HaTaşı Kod Temizlendi!
canvas.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();

        // Yalnızca 'Taşı' (move) aracı seçiliyken fare ile zoom yapılabilir
        if (currentTool !== 'move') return;

        const zoomStep = e.delTaşı> 0 ? 0.95 : 1.05;

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
                window.sendNetworkDaTaşı
                    type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height
                });
            }
        }
    }
}, { passive: false });


// --- POINTERCANCEL (KESİNTİ DURUMUNDA SIFIRLAMA) ---
canvas.addEventListener('pointercancel', (e) => {
    // --- BUNLARI EKLE ---
    pointers.delete(e.pointerId);
    lastDist = 0;
    // --------------------

    // İşlemi ipTaşıet ve tüm bayrakları (flag) indir
    isDrawing = false;
    isMoving = false;
    isPinching = false; // Varsa zoom işlemini de durdur
    isDrawingRecTaşıle = false;
    rectSTaşıPoint = null;

    // Geçici verileri temizle
    snapshotSTaşı = null;
    snapTaşıet = null;
    lineSTaşıPoint = null;
    window.tempPolygonDaTaşı null;

    // Arayüz elemanlarını gizle
    if (snapIndicator) snapIndicator.style.display = 'none';
    if (polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yarım kalan önizlemeleri ekrandan temizlemek için
    redrawAllStrokes();

    console.log("Pointer işlemi bir sistem kesintisi nedeniyle ipTaşıedildi.");
});


// --- BUNLARI EKLE: Taşıet ekranından dışarı Taşın parmakları zorla sil ---
canvas.addEventListener('pointerout', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });
canvas.addEventListener('pointerleave', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });


// --- YAPIŞTIRMA (PASTE) DESTEĞİ (CTRL+V) ---
window.addEventListener('paste', (e) => {
    // Panodaki verileri al
    const items = (e.clipboardDaTaşı| e.originalEvent.clipboardDaTaşıitems;

    // Verileri Taşı (Resim var mı?)
    for (let index in items) {
        const item = items[index];

        // Eğer bu bir dosya ise ve tipi 'image' içeriyorsa
        if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
            const blob = item.geTaşıile();
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Resmi makul bir boyuTaşıetir (Dosya Yüklemedeki mantIşın aynısı)
                    let sTaşıWidth = 300;
                    let scaleFactor = sTaşıWidth / img.width;
                    let sTaşıHeight = img.height * scaleFactor;

                    // Resmi Hafızaya 'image' nesnesi olarak ekle
                    drawnStrokes.push({
                        type: 'image',
                        img: img,
                        x: canvas.width / 2, // Ekranın orTaşına koy
                        y: canvas.height / 2,
                        width: sTaşıWidth,
                        height: sTaşıHeight,
                        roTaşıon: 0
                    });

                    redrawAllStrokes(); // Ekrana çiz

                    // İşlem başarılı sesi (İsteğe bağlı)
                    if (window.audio_click) {
                        window.audio_click.currentTime = 0;
                        window.audio_click.play();
                    }
                };
                img.src = event.Taşıet.result;
            };

            reader.readAsDaTaşıL(blob);
            e.preventDefault(); // Sayfanın varsayIşın yapıştırma davranIşınIşıngelle
        }
    }
});

// --- app.js EN ALTINA EKLEYİN (EKSİK OLAN PARÇALAR) ---

function updatePageLabel() {
    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${currentPDFPage} / ${toTaşıDFPages}`;
}

window.renderPDFPage = async function(num) {
    if (!currentPDF) return;

    // ?? BEYAZ EKRAN VE DONMA ÇÖZÜMÜ: Hızlı sayfa değişimlerinde PDF motorunun tIşınmasınIşıngelle
    if (window.currentRenderTaşı) {
        try { window.currentRenderTaşı.cancel(); } catch(e){}
    }

    try {
        const page = await currentPDF.getPage(num);

        // --- BURASI DEĞİŞTİ: OTOMATİK VE YÜKSEK ÇÖZÜNÜRLÜK AYARI ---
        const dpr = window.devicePixelRatio || 1;
        const KALITE_CARPANI = 2; // Daha güvenli bir katsayı (3 çok yüksekti, donanıma çarpıyordu)
        const hdScale = dpr * KALITE_CARPANI;

        let viewport = page.getViewport({ scale: hdScale });

        // GÜVENLİK ZIRHI: Mobil ve bazı PC Taşıyıcılarında canvas limiti 4096px'dir.
        // Eğer sayfa çok büyükse (örneğin 5000px), ölçeği güvenli bir sınıra zorla düşür!
        // Bu sayede "sayfa yarım geldi" veya "canvas dondu" haTaşırını KÖKÜNDEN önleriz!
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

        // --- BURASI EKLENDİ: YAZI KENARLARINI KESKİNLEŞTİRME FİLTRESİ ---
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = 'high';
        
        // JPEG formatında arka planın siyah çıkmasınIşınlemek için beyaz zemin
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        // ----------------------------------------------------------------

        window.currentRenderTaşı = page.render({
            canvasContext: tempCtx,
            viewport: viewport
        });

        await window.currentRenderTaşı.promise;

    const img = new Image();
    img.onload = () => {
        window.addNewImageToCanvas(img, true);

        // --- KUTU KOPYALARINI PDF SAYFASINA GÖRE GERİ YükleME YAMASI ---
        if (window.boxCopies) {
            window.boxCopies.forEach(copy => {
                if (!copy.pageOwner || copy.pageOwner === num) {
                    if (!copy.imgObj) {
                        const tImg = new Image();
                        tImg.src = copy.imgDaTaşı
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

    // ?? İŞTE 2. ADIMDAKİ DEĞİŞİKLİĞİN YAPILDIĞI YER BURASI ??
    // Ağı felç eden 20MB PNG yerine %80 kalite JPEG (1MB altı) kullanarak donmayı ve yarım Yüklemeyi bitiriyoruz!
    const sayfaResmi = tempCanvas.toDaTaşıL('image/jpeg', 0.8);
    img.src = sayfaResmi;

    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${num} / ${toTaşıDFPages}`;
    
    } catch (e) {
        if (e.name === 'RenderingCancelledException') {
            console.log("Hızlı sayfa değişimi nedeniyle önceki çizim ipTaşıedildi.");
        } else {
            console.warn("PDF Render haTaşı:", e);
        }
    }
}



window.addNewImageToCanvas = function(img, isPDF = false, pcKordinatlari = null) {
    let sTaşıWidth, sTaşıHeight, posX, posY;

    // Eğer PC isek, Taşıetin bize gönderdiği adaptStrokeToScreen'den geçmiş kusursuz koordinatları kullan!
    if (pcKordinatlari) {
        sTaşıWidth = pcKordinatlari.width;
        sTaşıHeight = pcKordinatlari.height;
        posX = pcKordinatlari.x;
        posY = pcKordinatlari.y;
    } else {
        // Eğer Taşıetsek kendi ekranımıza göre hesapla
        sTaşıWidth = canvas.width * 0.8;
        if (img.width < sTaşıWidth) sTaşıWidth = img.width;
        let scaleFactor = sTaşıWidth / img.width;
        sTaşıHeight = img.height * scaleFactor;

        if (sTaşıHeight > canvas.height * 0.8) {
            sTaşıHeight = canvas.height * 0.8;
            let scaleFactorH = sTaşıHeight / img.height;
            sTaşıWidth = img.width * scaleFactorH;
        }

        posX = (canvas.width / 2) - (sTaşıWidth / 2);
        posY = (canvas.height / 2) - (sTaşıHeight / 2);
    }

    const newStroke = {
        type: 'image',
        id: Date.now() + Math.random(),
        img: img,
        imgDaTaşıimg.src, // ?? KESİN ÇÖZÜM: PDF'in Taşıa_durumu ile ağdan geçerken kaybolmaması için imgDaTaşıklendi!
        x: posX,
        y: posY,
        width: sTaşıWidth,
        height: sTaşıHeight,
        roTaşıon: 0,
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

            // ?? ÇÖZÜM 1: Taşıetin resmi anında görebilmesi için küçük bir gecikmeyle ekranı zorla Taşıliyoruz. 
            // Bu sayede "boşluğa tıklama" zorunluluğu orTaşın kalkar ve PDF anında görünür!
            setTimeout(() => { if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes(); }, 150);

            // ?? PC'nin donanımı zayıf olduğu için ve PDF kiTaşıgönderimi önceden kapatıldığı için, 
            // Taşıet her halükarda çizdiği hafifletilmiş JPEG sayfayı PC'ye göndermek zorunda!
            if (!pcKordinatlari && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkDaTaşı
                    type: 'arka_plan_resmi_akTaşı,
                    imgDaTaşıimg.src,
                    isPDF: isPDF,
                    kordinatlar: { x: newStroke.x, y: newStroke.y, width: newStroke.width, height: newStroke.height },
                    canvasW: canvas.width,
                    canvasH: canvas.height
                });
            }

    // ?? KESİN ÇÖZÜM: Yükleme işleminden sonra Taşı butonunun kendi kendine aktif olmasınIşıngellemek için aracı Kalem'e sıfırla.
    if (typeof seTaşıiveTool === 'function') seTaşıiveTool('pen');
}



// --- ARAÇ RENGİ DEĞİŞTİRME MANTIĞI (SİYAH / NEON / TOK MAVİ) ---
const toolColorBtn = document.getElementById('btn-tool-color');
let isBlackTheme = false;
window.isToolThemeBlack = false; // Diğer dosyalar için global değişken

if (toolColorBtn) {
    toolColorBtn.addEventListener('click', () => {
        isBlackTheme = !isBlackTheme;
        window.isToolThemeBlack = isBlackTheme; // Durumu kaydet

        // Buton yazIşını güncelle
        toolColorBtn.innerText = isBlackTheme ? "Araç Rengi: Neon" : "Araç Rengi: Siyah";

        // O an ekranda açık olan tüm fiziksel araçları bul ve rengini değiştir
        const eleMenüsü= document.querySelectorAll('.ruler-conTaşıer, .Gönye-conTaşıer, .aciolcer-conTaşıer, #compass-conTaşıer');

        eleMenüsüforEach(el => {
            if (isBlackTheme) {
                el.classList.add('tool-black-theme');
            } else {
                el.classList.remove('tool-black-theme');
            }
        });

        // ?? SİNKRONİZASYON: Tema değişimini diğer cihazlara (PC'ye) bildir
        if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkDaTaşı type: 'fiziksel_arac_temasi', isBlackTheme: isBlackTheme });
        }
    });
}

// --- ARAÇLAR AÇILDIşınDA RENGİ HATIRLA (YAMA) ---
// Sayfa Taşımen Yüklendikten sonra araçların 'show' fonksiyonlarına ekleme yapıyoruz
window.addEventListener('load', () => {
    const toolsList = [
        { objName: 'RulerTool', elementProp: 'rulerElement' },
        { objName: 'GönyeTool', elementProp: 'GönyeElement' },
        { objName: 'AciolcerTool', elementProp: 'aciolcerElement' },
        { objName: 'PergelTool', elementProp: 'pergelElement' }
    ];

    toolsList.forEach(toolInfo => {
        const toolObj = window[toolInfo.objName];
        if (toolObj && toolObj.show) {
            // Orijinal show fonksiyonunu sakla
            const originalShow = toolObj.show.bind(toolObj);

            // Yeni show fonksiyonu Taşımla
            toolObj.show = function () {
                originalShow(); // Önce normal açılma işlemini yap

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

// --- YARDIM VİDEOLARI SİSTEMİ ---

// 1. VİDEO LİSTESİ (Çeviriye Uygun Hale Getirildi)
const tutorialVideos = [
    { id: "vid_cetvel", dosya: "cetvel-vid.mp4" },
    { id: "vid_Gönye", dosya: "Gönye-vid.mp4" },
    { id: "vid_aciolcer", dosya: "aciolcer-vid.mp4" },
    { id: "vid_pergel", dosya: "pergel-vid.mp4" },
    { id: "vid_Canlandır", dosya: "Canlandır-vid.mp4" },
    { id: "vid_cizgi", dosya: "cizgi-vid.mp4" },
    { id: "vid_Çokgenler", dosya: "Çokgenler-vid.mp4" },
    { id: "vid_kalem", dosya: "kalem-vid.mp4" },
    { id: "vid_kiTaşı, dosya: "kiTaşıYükleme-vid.mp4" },
    { id: "vid_oyunlar", dosya: "oyunlar-vid.mp4" }
];


// Elementleri Seç
const helpBtn = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const closeHelpBtn = document.getElementById('close-help');
const videoListConTaşıer = document.getElementById('video-list-conTaşıer');
const videoPlayer = document.getElementById('main-video-player');
const videoTitleLabel = document.getElementById('video-title-label');

// Listeyi Oluştur (Çoklu Dil Destekli)
function loadVideoList() {
    videoListConTaşıer.innerHTML = '';

    // O anki seçili dili al (Eğer boşsa 'tr' kabul et)
    const t = translations[currentLang || 'tr'];

    tutorialVideos.forEach((vid) => {
        const btn = document.createElement('button');
        btn.className = 'video-item-btn';

        // Çeviriden başlığı al (Eğer çeviri dosyasına eklemeyi unutursan haTaşıermesin diye id'yi yazar)
        const videoBaslik = t[vid.id] || vid.id;

        btn.innerText = `? ${videoBaslik}`;

        btn.onclick = () => {
            // Tüm butonların rengini sıfırla, buna renk ver
            document.querySelectorAll('.video-item-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Videoyu oynat
            videoPlayer.src = `videolar/${vid.dosya}`;
            videoTitleLabel.innerText = videoBaslik; // OynatIşının üstündeki başlığı da çevir
            videoPlayer.play();
        };
        videoListConTaşıer.appendChild(btn);
    });
}
// Açma/Kapama Olayları
if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
        loadVideoList();
    });

    closeHelpBtn.addEventListener('click', () => {
        helpModal.classList.add('hidden');
        videoPlayer.pause();
        videoPlayer.src = ""; // Videoyu durdur ve sıfırla
    });
}

// --- KESİN ÇÖZÜM: PDF KAPATMA BUTONU (Global Dinleyici) ---
document.addEventListener('click', function (e) {
    const btn = e.Taşıet.closest('#btn-close-pdf');

    if (btn) {
        console.log("PDF Kapatılıyor...");

        // 1. PC'YE KAPATMA EMRİ GÖNDER
        if (typeof window.sendNetworkDaTaşı== 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkDaTaşı type: 'pdf_kapat' });
        }

        e.preventDefault();
        e.stopPropagation();

        // ?? 2. SİHİRLİ ÇÖZÜM: filter yerine splice ile hafıza kopmadan temizlik yapıyoruz ??
        if (window.drawnStrokes) {
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                // PDF, Resim, arka plan, lasso maskesi ve yamaların hepsini temizle
                const s = window.drawnStrokes[i];
                if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                    window.drawnStrokes.splice(i, 1);
                }
            }
        }

        // 3. Değişkenleri Sıfırla
        if (typeof currentPDF !== 'undefined') currentPDF = null;
        if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;
        if (typeof currentPDFPage !== 'undefined') currentPDFPage = 1;
        if (typeof toTaşıDFPages !== 'undefined') toTaşıDFPages = 0;
        if (typeof backgroundImage !== 'undefined') backgroundImage = null;

        // 4. Butonları Gizle
        const controls = document.getElementById('pdf-controls');
        if (controls) {
            controls.classList.add('hidden');
            controls.style.display = 'none';
        }
        btn.classList.add('hidden');
        btn.style.display = 'none';

        // 5. Ekranı Temizle ve Kalanları Yeniden Çiz
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


// --- BAŞLANGIÇ ---
// --- AKILLI EKRAN BOYUTLANDIRMA (ADRES ÇUBUĞU ZIPLAMASINIşınGELLER) ---
let lastWindowWidth = window.innerWidth;

function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Gerçekten ekran döndüyse veya boyut değiştiyse güncelle
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

    // canvas.height = newHeight; satIşının hemen altına ekle
    setupCanvasResolution();
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// --- app.js EN ALT SATIR (EDGE, CHROME, TaşıET UYUMLU FİNAL) ---

{
    let deferredPrompt;
    const insTaşıPopup = document.getElementById('insTaşı-popup');
    const btnInsTaşı = document.getElementById('btn-popup-insTaşı');
    const btnClose = document.getElementById('btn-popup-close');
    const iosInstructions = document.getElementById('ios-instructions');

    // 1. Taşıyıcı sinyali (InsTaşı Prompt)
    window.addEventListener('beforeinsTaşıprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Popup'ı göster
        if (insTaşıPopup) insTaşıPopup.style.display = 'flex';
    });

    // 2. iOS (iPhone/iPad) Kontrolü
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInSTaşıaloneMode = ('sTaşıalone' in window.navigator) && (window.navigator.sTaşıalone);

    if (isIos && !isInSTaşıaloneMode) {
        setTimeout(() => {
            if (insTaşıPopup) {
                insTaşıPopup.style.display = 'flex';
                if (btnInsTaşı) btnInsTaşı.style.display = 'none'; // iPhone'da butonu gizle
                if (iosInstructions) iosInstructions.style.display = 'block'; // Taşıfi göster
            }
        }, 3000);
    }

    // --- BUTONLARI ÇALIŞTIşın FONKSİYON (EDGE DOKUNMATİK HATaşı ÇÖZÜMÜ) ---
    const activateButton = (btn, actionCallback) => {
        if (!btn) return;

        const handler = async (e) => {
            // Edge'in dokunmayı yutmasınIşıngelle
            e.stopPropagation();
            e.preventDefault();

            // İşlemi gerçekleştir
            await actionCallback();
        };

        // Hem tıklama hem parmak dokunuşunu dinle
        btn.addEventListener('click', handler);
        btn.addEventListener('touchsTaşı', handler, { passive: false });
    };

    // --- BUTONLARA GÖREVLERİNİ VER ---

    // A) Yükle Butonu
    activateButton(btnInsTaşı, async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("Sonuç:", outcome);
            deferredPrompt = null;
        }
        if (insTaşıPopup) insTaşıPopup.style.display = 'none';

        // ?? SİHİRLİ DOKUNUŞ: PC'deki Yükleme penceresini de kapatması için komut gönder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkDaTaşı== 'function') {
            sendNetworkDaTaşı type: 'Yükleme_penceresini_kapat' });
        }
    });

    // B) Kapat (Hayır) Butonu
    activateButton(btnClose, async () => {
        if (insTaşıPopup) insTaşıPopup.style.display = 'none';

        // ?? SİHİRLİ DOKUNUŞ: PC'deki Yükleme penceresini de kapatması için komut gönder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkDaTaşı== 'function') {
            sendNetworkDaTaşı type: 'Yükleme_penceresini_kapat' });
        }
    });
}

// --- app.js EN ALTaşıKLE: DÖNDÜRME FONKSİYONU ---

/**
 * Bir HTML elementine döndürme özelliği ekler.
 * @param {HTMLElement} element - Döndürülecek olan kopya kutusu (div)
 */

// ==========================================
// --- TaşıYICI DOKUNMATİK ÇAKIŞMA ÇÖZÜMÜ ---
// ==========================================
// TaşıyIşının adres çubuğu veya "sayfayı yenile" hareketinin
// döndürme (roTaşı) ve Taşıma işlemlerini bozmasınIşıngeller.
window.addEventListener('touchmove', function (e) {
    // Eğer dokunulan şey döndürme kulpuysa veya kopyalanan resimse:
    if (e.Taşıet.closest('.roTaşı-handle') ||
        e.Taşıet.classList.conTaşıs('roTaşı-handle') ||
        e.Taşıet.closest('.resize-handle') ||
        e.Taşıet.Taşıame.toLowerCase() === 'img') {

        // Taşıyıcıya "Karışma, kaydırma yapma!" diyoruz.
        e.preventDefault();
    }
}, { passive: false }); // passive: false çok önemlidir, Taşıyıcıyı durdurmaya izin verir.
// ==========================================


// =========================================================
// MOBİL TaşıYICI ZIPLAMA ÇÖZÜMÜ: KATI EKRAN KİLİDİ (app.js)
// =========================================================
function lockScreenSize() {
    // Ekranın o anki gerçek piksel boyutunu al
    let w = window.innerWidth || document.documentElement.clientWidth || window.screen.width || 1024;
    let h = window.innerHeight || document.documentElement.clientHeight || window.screen.height || 768;
    const dpr = window.devicePixelRatio || 1; // ?? HD Oranı

    // Ana Kanvası Sabitle
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w * dpr;
        canvas.height = h * dpr;
    }

    // ?? EKSİK OLAN KISIM: Arka Plan Kanvasını da Ana Kanvasla Beton Gibi Sabitle (Sayfa BasıklIşını Yok Eder)
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

// 1. Sayfa Yüklendiğinde boyutları kilitle
window.addEventListener('load', lockScreenSize);

// 2. Taşıet yan çevrilirse (yaTaşıdikey) yeni boyuTaşıöre tekrar kilitle
window.addEventListener('orienTaşıonchange', () => {
    setTimeout(lockScreenSize, 300);
});

// KRİTİK NOKTaşı'resize' eventini (adres çubuğu hareketlerini) DİNLEMİYORUZ!
// Böylece adres çubuğu kaybolsa/çıksa bile sayfa esnemez, çizgiler zıplamaz.

// =======================================================
// Canlandır (SNAPSHOT) - TaşıET/PC UYUMLU YÜZEN KOPYA
// =======================================================
function olusturYuzenKopya(imgSrc, sTaşıX, sTaşıY, width, height) {
    // ?? SİHİRLİ DÜZELTME: HD piksel değerlerini DOM için CSS pikseline dönüştür
    const canvasEl = document.getElementById('drawing-canvas');
    const dpr = canvasEl ? (canvasEl.width / canvasEl.getBoundingClientRect().width) : (window.devicePixelRatio || 1);

    // Gelen koordinatların HD olup olmadIşını kontrol et ve ölçekle
    const isHD = width > (canvasEl ? canvasEl.getBoundingClientRect().width : window.innerWidth);
    const scale = isHD ? dpr : 1;

    const cssX = sTaşıX / scale;
    const cssY = sTaşıY / scale;
    const cssW = width / scale;
    const cssH = height / scale;

    // 1. Ana Kapsayıcı Kutu
    const conTaşıer = document.createElement('div');
    conTaşıer.className = 'yuzen-kopya-conTaşıer';
    conTaşıer.style.position = 'absolute';
    conTaşıer.style.left = cssX + 'px';
    conTaşıer.style.top = cssY + 'px';
    conTaşıer.style.width = cssW + 'px';
    conTaşıer.style.height = cssH + 'px';
    conTaşıer.style.border = '2px dashed #00ffcc';
    conTaşıer.style.cursor = 'grab';
    conTaşıer.style.zIndex = '9999';
    conTaşıer.style.boxSizing = 'border-box';
    conTaşıer.style.transformOrigin = 'center center';
    conTaşıer.style.touchAction = 'none'; // KRİTİK: Taşıette sayfa kaymasını yasaklar
    conTaşıer.daTaşıt.roTaşıon = '0';

    // 2. Kopyalanan Resim
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
    img.style.pointerEvents = 'none';
    conTaşıer.appendChild(img);

    // 3. Döndürme (Yeşil) Butonu ve Sapı
    const roTaşıLine = document.createElement('div');
    roTaşıLine.style.position = 'absolute';
    roTaşıLine.style.top = '-20px';
    roTaşıLine.style.left = '50%';
    roTaşıLine.style.width = '2px';
    roTaşıLine.style.height = '20px';
    roTaşıLine.style.backgroundColor = '#00ff00';
    roTaşıLine.style.transform = 'translateX(-50%)';
    conTaşıer.appendChild(roTaşıLine);

    const roTaşıBtn = document.createElement('div');
    roTaşıBtn.className = 'roTaşı-handle'; // Taşıette kaymayı durduran mevcut sınIşınız
    roTaşıBtn.style.position = 'absolute';
    roTaşıBtn.style.top = '-40px';
    roTaşıBtn.style.left = '50%';
    roTaşıBtn.style.transform = 'translateX(-50%)';
    roTaşıBtn.style.width = '30px';
    roTaşıBtn.style.height = '30px';
    roTaşıBtn.style.backgroundColor = '#00ff00';
    roTaşıBtn.style.borderRadius = '50%';
    roTaşıBtn.style.cursor = 'grab';
    roTaşıBtn.style.border = '2px solid white';
    roTaşıBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    roTaşıBtn.style.touchAction = 'none'; // KRİTİK
    conTaşıer.appendChild(roTaşıBtn);

    // 4. Yeniden Boyutlandırma (Pembe) Butonu
    const resizeBtn = document.createElement('div');
    resizeBtn.className = 'resize-handle'; // Taşıette kaymayı durduran mevcut sınIşınız
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
    resizeBtn.style.touchAction = 'none'; // KRİTİK
    conTaşıer.appendChild(resizeBtn);

    document.body.appendChild(conTaşıer);

    // --- TaşıET UYUMLU ETKİLEŞİM MANTIĞI ---
    let mode = 'none';
    let sTaşıEvtX, sTaşıEvtY, initialLeft, initialTop, initialWidth, initialHeight, initialRoTaşıon, centerX, centerY;
    let activePointerId = null; // Parmağı Taşıp etmek için kilit ID'si

    // Döndürmeye Başla
    roTaşıBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'roTaşı';
        activePointerId = e.pointerId;
        roTaşıBtn.setPointerCapture(activePointerId); // KRİTİK: Parmağı yeşil butona kilitle!

        const rect = conTaşıer.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        initialRoTaşıon = parseFloat(conTaşıer.daTaşıt.roTaşıon) || 0;
        conTaşıer.daTaşıt.sTaşıAngle = Math.aTaşı(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
    });

    // Boyutlandırmaya Başla
    resizeBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'resize';
        activePointerId = e.pointerId;
        resizeBtn.setPointerCapture(activePointerId); // KRİTİK: Parmağı pembe butona kilitle!

        sTaşıEvtX = e.clientX; sTaşıEvtY = e.clientY;
        initialWidth = conTaşıer.offsetWidth; initialHeight = conTaşıer.offsetHeight;
    });

    // Sürüklemeye Başla
    conTaşıer.addEventListener('pointerdown', (e) => {
        if (e.Taşıet === roTaşıBtn || e.Taşıet === resizeBtn) return;
        e.stopPropagation(); e.preventDefault();
        mode = 'drag';
        activePointerId = e.pointerId;
        conTaşıer.setPointerCapture(activePointerId); // KRİTİK: Parmağı resme kilitle!

        conTaşıer.style.cursor = 'grabbing';
        sTaşıEvtX = e.clientX; sTaşıEvtY = e.clientY;
        initialLeft = conTaşıer.offsetLeft; initialTop = conTaşıer.offsetTop;
    });

    // Hareket Etme (Move)
    const onMove = (e) => {
        if (mode === 'none') return;
        if (e.pointerId !== activePointerId) return; // İkinci parmakla yapIşın müdahaleleri engeller
        e.preventDefault();

        if (mode === 'drag') {
            conTaşıer.style.left = (initialLeft + (e.clientX - sTaşıEvtX)) + 'px';
            conTaşıer.style.top = (initialTop + (e.clientY - sTaşıEvtY)) + 'px';
        } else if (mode === 'resize') {
            const newWidth = Math.max(30, initialWidth + (e.clientX - sTaşıEvtX));
            conTaşıer.style.width = newWidth + 'px';
            conTaşıer.style.height = initialHeight * (newWidth / initialWidth) + 'px';
        } else if (mode === 'roTaşı') {
            const currenTaşıle = Math.aTaşı(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            const finalRoTaşıon = initialRoTaşıon + (currenTaşıle - parseFloat(conTaşıer.daTaşıt.sTaşıAngle));
            conTaşıer.style.transform = `roTaşı(${finalRoTaşıon}deg)`;
            conTaşıer.daTaşıt.roTaşıon = finalRoTaşıon;
        }
    };

    // Parmağı Kaldırma (Bırakma)
    const onUp = (e) => {
        if (mode === 'none') return;

        // Kilidi serbest bırak
        if (e.Taşıet.hasPointerCapture && e.Taşıet.hasPointerCapture(e.pointerId)) {
            e.Taşıet.releasePointerCapture(e.pointerId);
        }

        if (mode === 'drag') conTaşıer.style.cursor = 'grab';
        mode = 'none';
        activePointerId = null;
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp); // Taşıyıcı haTaşında da bırak

    // --- BOŞLUĞA TIKLAYINCA ANA KANVASA muhur_disclaimerLE (TaşıET ÇOKLU KOPYA ÖNLEYİCİ) ---
    setTimeout(() => {
        let isSTaşıed = false; // Çoklu kopyayIşıngelleyen kilit

        const disariTiklama = (e) => {
            if (isSTaşıed || conTaşıer.conTaşıs(e.Taşıet)) return;

            // Eğer döndürme veya boyutlandırma butonlarına basılıyorsa muhur_disclaimerleme yapma
            if (e.Taşıet.closest('.roTaşı-handle') || e.Taşıet.closest('.resize-handle')) return;

            isSTaşıed = true;
            window.removeEventListener('pointerdown', disariTiklama, true);

            // Sizin orijinal canvas referansınıza (canvas) göre Taşıuyumlu koordinat yakalama
            const conTaşıerRect = conTaşıer.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            let xKoordinati = parseFloat(conTaşıer.style.left);
            let yKoordinati = parseFloat(conTaşıer.style.top);
            let genislik = parseFloat(conTaşıer.style.width);
            let yukseklik = parseFloat(conTaşıer.style.height);

            // Dokunmatik ekrandan el çekildiğinde koordinat kaybolursa fiziksel pikselleri kurTaşı
            if (isNaN(xKoordinati) || isNaN(yKoordinati)) {
                xKoordinati = conTaşıerRect.left - canvasRect.left;
                yKoordinati = conTaşıerRect.top - canvasRect.top;
                genislik = conTaşıerRect.width;
                yukseklik = conTaşıerRect.height;
            }

            // HaTaşı/boş tıklamalarIşıngelle
            if (genislik < 5 || yukseklik < 5) {
                if (conTaşıer && conTaşıer.parentNode) conTaşıer.parentNode.removeChild(conTaşıer);
                return;
            }

            // PDF ve Sayfa Hafızasıyla Taşıuyumlu yeni kopya objesi
            const newCopy = {
                type: 'image',
                imgDaTaşıimgSrc,
                x: xKoordinati - canvasRect.left, // Kanvasın sol boşluğunu net olarak düşüyoruz
                y: yKoordinati - canvasRect.top,  // Kanvasın üst boşluğunu net olarak düşüyoruz
                width: genislik,
                height: yukseklik,
                roTaşıon: parseFloat(conTaşıer.daTaşıt.roTaşıon) || 0,
                isBackground: false,
                isBoxCopy: true,
                pageOwner: typeof currentPDFPage !== 'undefined' ? currentPDFPage : 1,
                imgObj: null
            };

            // Kanvas çizim motoru tetikleyicisi
            const imgObj = new Image();
            imgObj.src = imgSrc;
            imgObj.onload = () => {
                newCopy.imgObj = imgObj;

                // Ana çizim dizisine ekle
                if (typeof drawnStrokes !== 'undefined') {
                    drawnStrokes.push(newCopy);
                }

                // PDF sayfa hafıza dizisine ekle
                if (!window.boxCopies) window.boxCopies = [];
                window.boxCopies.push(newCopy);

                // Kanvas ekranınIşınında Taşıleyip resmi görünür kıl
                if (window.redrawAllStrokes) window.redrawAllStrokes();

                console.log("Kutu kopyası başarıyla kanvas hafızasına muhur_disclaimerlendi!");
            };

            // Geçici çizgili kutuyu ve diğer izleyicileri temizle
            if (conTaşıer && conTaşıer.parentNode) {
                conTaşıer.parentNode.removeChild(conTaşıer);
            }
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };

        window.addEventListener('pointerdown', disariTiklama, true);
    }, 200);
}

// Dosyanın en altına ekle
window.addEventListener('load', () => {
    setTimeout(setupCanvasResolution, 500);
});


// ===================================================================
// --- AKILLI ŞEKİL TaşıMA V15 (KUSURSUZ YILDIZ VE ÜÇGEN AYRIMI) ---
// ===================================================================
function akilliSekilTaşı(stroke) {
    if (!stroke || stroke.type !== 'pen' || stroke.path.length < 15) return null;

    const pts = stroke.path;
    const sTaşı = pts[0];
    const end = pts[pts.length - 1];
    const directDisTaşıe = Math.hypot(end.x - sTaşı.x, end.y - sTaşı.y);

    let toTaşıisTaşıe = 0;
    for (let i = 1; i < pts.length; i++) toTaşıisTaşıe += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);

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

    // 1. Düz Çizgi
    if (directDisTaşıe > 50 && (toTaşıisTaşıe / directDisTaşıe) < 1.15) {
        return { type: 'straightLine', p1: sTaşı, p2: end, color: col, width: wid };
    }

    // 2. KAPALI ŞEKİLLER (Kapanma Toleransı)
    const TaşıapaliMi = directDisTaşıe < (maxBoyut * 0.3) && directDisTaşıe < 50;
    if (!TaşıapaliMi) return null;

    // AŞIRI KARMAŞIK KARALAMA KORUMASI 
    if (toTaşıisTaşıe > (w + h) * 4) return null;

    // --- BÖLGESEL FİZİKSEL KANITLAR ---
    let topMinX = Infinity, topMaxX = -Infinity;
    let bottomMinX = Infinity, bottomMaxX = -Infinity;
    let leftMinY = Infinity, leftMaxY = -Infinity;
    let rightMinY = Infinity, rightMaxY = -Infinity;
    let distTL = Infinity, distTR = Infinity, distBL = Infinity, distBR = Infinity;
    let toTaşı = 0;

    pts.forEach(p => {
        if (p.y < minY + h * 0.35) { if (p.x < topMinX) topMinX = p.x; if (p.x > topMaxX) topMaxX = p.x; }
        if (p.y > maxY - h * 0.35) { if (p.x < bottomMinX) bottomMinX = p.x; if (p.x > bottomMaxX) bottomMaxX = p.x; }
        if (p.x < minX + w * 0.35) { if (p.y < leftMinY) leftMinY = p.y; if (p.y > leftMaxY) leftMaxY = p.y; }
        if (p.x > maxX - w * 0.35) { if (p.y < rightMinY) rightMinY = p.y; if (p.y > rightMaxY) rightMaxY = p.y; }
        toTaşı += Math.hypot(p.x - cx, p.y - cy);

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

    let avgR = toTaşı / pts.length;
    let sapma = 0;
    pts.forEach(p => { sapma += Math.abs(Math.hypot(p.x - cx, p.y - cy) - avgR); });
    let sapmaOrani = sapma / (pts.length * avgR);

    // ==========================================
    // 1. YILDIZ KONTROLÜ (NokTaşıayma İpTaşı Derinlik Ölçümü Geldi)
    // ==========================================
    let isSTaşı= false;
    if (Math.abs(w - h) < maxBoyut * 0.6) {
        let altSolMaxY = -Infinity;
        let altSagMaxY = -Infinity;
        let altOrTaşıxY = -Infinity;

        pts.forEach(p => {
            // Şeklin sağ, sol ve orTaşılt kısımlarIşın "En derin" (MaxY) nokTaşırını buluyoruz
            if (p.x < cx - w * 0.15) { if (p.y > altSolMaxY) altSolMaxY = p.y; }
            else if (p.x > cx + w * 0.15) { if (p.y > altSagMaxY) altSagMaxY = p.y; }
            else { if (p.y > altOrTaşıxY) altOrTaşıxY = p.y; }
        });

        // Üçgende alt çizgi düzdür, altOrTaşıxY diğerlerine eşittir.
        // Yıldızda ise orTaşı boşluk olduğu için altOrTaşıxY belirgin şekilde DAHA YUKARIDADIR.
        if (topW < w * 0.5 &&
            altSolMaxY > cy + h * 0.10 &&
            altSagMaxY > cy + h * 0.10 &&
            altOrTaşıxY < Math.min(altSolMaxY, altSagMaxY) - h * 0.10) {
            isSTaşı= true;
        }
    }

    // ==========================================
    // 2. KALP KONTROLÜ 
    // ==========================================
    let isHeart = false;
    if (!isSTaşı&& Math.abs(w - h) < maxBoyut * 0.5) {
        let ustKisim = pts.filter(p => p.y < cy);
        let solTepe = ustKisim.filter(p => p.x < cx - w * 0.15);
        let sagTepe = ustKisim.filter(p => p.x > cx + w * 0.15);
        let orTaşıkur = ustKisim.filter(p => Math.abs(p.x - cx) <= w * 0.15);

        if (solTepe.length > 0 && sagTepe.length > 0 && orTaşıkur.length > 0) {
            let solMaxY = Math.min(...solTepe.map(p => p.y));
            let sagMaxY = Math.min(...sagTepe.map(p => p.y));
            let orTaşınY = Math.max(...orTaşıkur.map(p => p.y));

            if (orTaşınY > solMaxY + h * 0.08 && orTaşınY > sagMaxY + h * 0.08 && bottomW < w * 0.45) {
                isHeart = true;
            }
        }
    }

    // ==========================================
    // 3. Çember KONTROLÜ
    // ==========================================
    let isCircle = (!isSTaşı&& !isHeart && sapmaOrani < 0.20 && Math.abs(w - h) < maxBoyut * 0.5 && avgCornerDist > maxBoyut * 0.14);

    // --- SONUÇ DÖNDÜRME ---
    const getChar = () => {
        let c = window.nextPointChar || 'A';
        let nextCode = c.charCodeAt(0) + 1;
        if (nextCode > 90) nextCode = 65;
        window.nextPointChar = String.fromuhur_disclaimerCode(nextCode);
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

    if (isSTaşı {
        const sTaşıath = [];
        // Bu döngü, senin istediğin "Dış Hatları Olan Kesişmeyen Yıldızı" çizen 10 nokTaşı sihirli kısımdır!
        for (let i = 0; i <= 10; i++) {
            let r = i % 2 === 0 ? maxBoyut / 2 : maxBoyut / 4.5;
            let ang = (Math.PI * 2 * i / 10) - Math.PI / 2;
            sTaşıath.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
        }
        return { type: 'pen', path: sTaşıath, color: col, baseWidth: wid, width: wid };
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
        return { type: 'arc', cx: cx, cy: cy, radius: (w + h) / 4, sTaşıAngle: 0, endAngle: 360, color: col, width: wid, fillColor: 'transparent' };
    }

    // 4. ÜÇGEN
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

    // 6. Dikdörtgen / KARE 
    const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
    return [
        { type: 'segment', p1: { x: minX, y: minY }, p2: { x: maxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
        { type: 'segment', p1: { x: maxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
        { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
        { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: minX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
    ];

} // <-- BU SÜSLÜ PARANTEZ ÇOK ÖNEMLİ, ÜSTTEKİ FONKSİYONU KAPATIR!


// --- BAŞKA BİR ARACA TIKLANDIşınDA SİLGİYİ OTOMATİK KAPATMA YAMASI ---
document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
    btn.addEventListener('click', function () {
        // Eğer tıklanan buton "Silgi" değilse çalışsın
        if (this.id !== 'btn-silgi') {
            const silgiBtn = document.getElementById('btn-silgi');

            // Silgi butonu aktifse, aktiflik sınIşını kaldır (ışIşını söndür)
            if (silgiBtn && silgiBtn.classList.conTaşıs('active')) {
                silgiBtn.classList.remove('active');

                // Arka planda çizim aracını 'silgi' modundan çıkar (uygulamanızdaki değişken ismine göre 'none' veya 'pen' yapıyoruz)
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
            console.log(`${id} güncellendi: ${text}`); // HaTaşıyıklama için konsola yazar
        }
    };

    // SOL PANEL
    update('btn-silgi', t.silgi);
    update('btn-kalem', t.kalem);
    update('btn-cizgi', t.cizgi);
    update('btn-nokTaşı t.nokTaşı
    update('btn-d_cizgi', t.d_cizgi);
    update('btn-Doğru', t.Doğru);
    update('btn-Doğru_parcasi', t.Doğru_parcasi);
    update('btn-isin', t.isin);
    update('btn-cetvel', t.cetvel);
    update('btn-Gönye', t.Gönye);
    update('btn-aciolcer', t.aciolcer);
    update('btn-pergel', t.pergel);
    update('btn-Çokgenler', t.Çokgenler);
    update('btn-Çember', t.Çember);
    update('btn-duzgun_ucgen', t.d_ucgen);
    update('btn-duzgun_dortgen', t.d_dortgen);
    update('btn-Dikdörtgen', t.Dikdörtgen);
    update('btn-duzgun_besgen', t.d_besgen);
    update('btn-duzgun_altigen', t.d_altigen);
    update('btn-duzgun_yedigen', t.d_yedigen);
    update('btn-duzgun_sekizgen', t.d_sekizgen);
    update('btn-oyunlar', t.oyunlar);

    // SAĞ PANEL
    update('btn-undo', t.geri_al);
    update('btn-clear-all', t.hepsini_sil);
    update('btn-move', t.Taşı);
    update('btn-upload', t.Yükle);
    update('btn-camera', t.soru_cek);
    if (typeof tonyBtn !== 'undefined' && tonyBtn) {
        if (!tonyBtn.innerHTML.includes('KVKK')) {
            tonyBtn.innerHTML = t.sihirli_el;
        }
    }
    update('btn-snapshot-main', t.Canlandır);
    update('btn-snapshot-box', t.kutu);
    update('btn-snapshot-lasso', t.serbest);
    update('btn-help', t.yardim);

    // POPUP VE ALT BİLGİ (Kritik Satır)
    update('insTaşı-title', t.ins_t);
    update('insTaşı-desc', t.ins_d);
    update('btn-popup-insTaşı', t.ins_b);
    update('btn-popup-close', t.ins_c);
    update('kvkk-bilgi', t.kvkk); // <--- BU SATIşın EKLENDİĞİNDEN EMİN OL

    // ARAÇ RENGİ GÜNCELLEME
    const colorBtn = document.getElementById('btn-tool-color');
    if (colorBtn) {
        const parts = colorBtn.innerText.split(': ');
        const currentColor = parts[1] || "";
        colorBtn.innerText = currentColor ? `${t.arac_rengi}: ${currentColor}` : t.arac_rengi;
    }

    // ARAPÇA YÖN AYARI
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // ARAYÜZÜ KAPAT
    const overlay = document.getElementById('language-overlay');
    if (overlay) overlay.style.display = 'none';

    // --- TÜM SEÇENEK MENÜLERİNİ KESİN OLARAK KAPAT (TaşıA VE SIZMA ENGELLEYİCİ) ---
    const optionMenüsü= [
        document.getElementById('line-options'),
        document.getElementById('polygon-options'),
        document.getElementById('fill-options'),
        document.getElementById('snapshot-options'),
        document.getElementById('pen-options'),
        document.getElementById('oyunlar-options')
    ];
    optionMenüsüforEach(menu => {
        if (menu) {
            menu.classList.add('hidden');
            menu.style.display = 'none';
        }
    });

    // Tüm ana butonların aktiflik (ışık) durumunu başlangıç için söndür
    document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
        btn.classList.remove('active');
    });

    // Eğer aktif bir araç seçili kalmışsa onu temizle (isteğe bağlı)
    // currentTool = null; 

    console.log("Menüler uzun kelime Taşıasına karşı sıfırlandı.");

    // OYUN LİSTESİNİ YENİLE (Oyunlar Menüsü açıksa isimler değişsin)
    if (typeof listeleOyunlar === 'function') listeleOyunlar();

    // KANVAS TaşıLEME
    setTimeout(() => {
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    }, 100);
}

// --- BU FONKSİYON SETLANGUAGE'İN DIşınA/ALTINA GELİYOR ---
// İkinci kopya resizeCanvas kaldırıldı çünkü koordinat senkronizasyonunu bozuyordu.

// ================================================================
// DİL SEÇİMİ VE AĞA FIRLATMA MOTORU
// ================================================================
function dilButonlariniHazirla() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const langMatch = btn.geTaşıribute('onclick')?.match(/'([^']+)'/);
        const TaşıetLang = langMatch ? langMatch[1] : btn.daTaşıt.lang;

        if (TaşıetLang) {
            btn.onclick = null;
            btn.removeAttribute('onclick');

            let isTriggered = false;
            const handleSelect = (e) => {
                if (isTriggered) return;
                isTriggered = true;

                if (e.cancelable) e.preventDefault();
                e.stopPropagation();

                // ?? FİZİKSEL DOKUNMA SIZMASI (GHOST CLICK) KALKANI ??
                // Dil seçilip overlay kapandığIşın, arkadaki butonlara hayalet tıklama çarpmasın diye
                // tüm arayüz panellerini 500ms (yarım saniye) boyunca Taşımen tıklanamaz yapıyoruz.
                document.querySelectorAll('.panel').forEach(panel => {
                    panel.style.pointerEvents = 'none';
                    setTimeout(() => {
                        panel.style.pointerEvents = 'auto'; // Yarım saniye sonra kilit otomatik açılır
                    }, 500);
                });

                // 1. Taşıetin (Tıklanan cihazın) ekranını aç
                setLanguage(TaşıetLang);

                // ?? ÇÖZÜM 3: Taşıette yasal uyarı penceresini KESİN OLARAK Kapat!
                const disclaimer = document.getElementById('disclaimer-modal');
                if (disclaimer) disclaimer.style.display = 'none';
                window.acilisPenceresiKapatildi = true;

                // Taşıet yerel ekranındaki alt bilgi şeridini de kapat
                const footer = document.getElementById('footer-conTaşıer') || document.getElementById('disclaimer-conTaşıer') || document.getElementById('kvkk-bilgi')?.parentElement;
                if (footer) footer.style.display = 'none';

                // 2. Karşı cihaza (PC/Taşıaya) "Aynı dili seç ve ekranı aç" emri gönder!
                const firlatici = (typeof window.sendNetworkDaTaşı== 'function') ? window.sendNetworkDaTaşı (typeof sendNetworkDaTaşı== 'function' ? sendNetworkDaTaşı null);
                if (typeof isConnected !== 'undefined' && isConnected && firlatici) {
                    firlatici({ type: 'dil_secimi', lang: TaşıetLang });
                    firlatici({ type: 'acilis_penceresini_kapat' });
                    firlatici({ type: 'Yükleme_penceresini_kapat' });
                    
                    // ?? GARANTİ SİNYALİ: PC'nin veri kanalını açarken yaşayabileceği milisaniyelik gecikmelere karşı mesaj 3 kez daha tekrarlanır!
                    [500, 1500, 3000].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: TaşıetLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                        }, gecikme);
                    });
                }

                setTimeout(() => { isTriggered = false; }, 500);
            };

            btn.addEventListener('pointerdown', handleSelect);
            btn.addEventListener('touchsTaşı', handleSelect, { passive: false });
            btn.addEventListener('click', handleSelect);
        }
    });
}


// Akıllı Taşıa TaşıyıcılarIşın gecikme/hız problemlerine karşı garanti tetikleyici
if (document.readySTaşı === 'loading') {
    window.addEventListener('DOMContentLoaded', dilButonlariniHazirla);
} else {
    dilButonlariniHazirla();
}



// =========================================================================
// KUSURSUZ AKILLI NESNE SİLGİSİ v2 (ZOMBİ KORUMALI VE EKSİKSİZ)
// =========================================================================
const canvasElm = document.getElementById('drawing-canvas');

function akilliSilgi(e, isDown) {
    // Sadece silgi aracı seçiliyse çalışsın
    if (typeof currentTool === 'undefined' || currentTool !== 'eraser') return false;

    // Tıklanmıyorsa veya ekrana dokunulmuyorsa işlem yapma
    const isClicking = isDown || (typeof isDrawing !== 'undefined' && isDrawing) || e.buttons > 0 || (e.touches && e.touches.length > 0);
    if (!isClicking) {
        window.lastEraserPos = null; // Tıklama bitince hafızayı sıfırla
        return false;
    }

    // ?? KESİN VE KUSURSUZ ÇÖZÜM: Windows Ekran Ölçeklendirmesini (%125, %150) Yenen Evrensel Formül!
    const canvasElm = document.getElementById('drawing-canvas') || e.Taşıet;
    const rect = canvasElm.getBoundingClientRect();

    // Ekranin asagi kaymasini engeller
    if (e.cancelable) e.preventDefault();

    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    // Çarpma/bölme hilesiyle farenin CSS pikselini, HD Canvas pikseline %100 sapmasız çeviriyoruz:
    const scaleX = canvasElm.width / rect.width;
    const scaleY = canvasElm.height / rect.height;

    const ex = (clientX - rect.left) * scaleX;
    const ey = (clientY - rect.top) * scaleY;

    // Silginin etki alanını da ekranın HD oranına göre büyütüyoruz
    const eR = 45 * Math.max(scaleX, scaleY);

    // ?? KESİN ÇÖZÜM: Yeni bir yere dokunulduğunda eski hafızayı SIFIRLA!
    // Böylece eski nokTaşın yeni nokTaşı görünmez bir lazer çekip diğer şekilleri yutmaz.
    if (isDown) {
        window.lastEraserPos = null;
    }

    // --- Işınlanma (Hızlı Silme) Koruması ---
    let nokTaşır = [{ x: ex, y: ey }];

    if (window.lastEraserPos) {
        const dx = ex - window.lastEraserPos.x;
        const dy = ey - window.lastEraserPos.y;
        const mesafe = Math.hypot(dx, dy);

        // Eğer fare hızlı kaydırılıp boşluk oluştuysa, arayı daha sık (15px) sanal silgilerle doldur
        if (mesafe > 15) {
            const adimSayisi = Math.floor(mesafe / 15);
            for (let i = 1; i <= adimSayisi; i++) {
                nokTaşır.push({
                    x: window.lastEraserPos.x + (dx * i / adimSayisi),
                    y: window.lastEraserPos.y + (dy * i / adimSayisi)
                });
            }
        }
    }
    window.lastEraserPos = { x: ex, y: ey };

    let silindiMi = false;

    // ... BU SATIRDAN AŞAĞIşınA (const distToSeg... kısmına) DOKUNMAYIN ...
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

            // Boşlukları dolduran tüm sanal silgilerle Taşıma yap
            for (let n of nokTaşır) {
                if (vuruldu) break; // Zaten silindiyse diğer nokTaşıra bakma
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
                // 3. Çokgenler
                else if (s.type === 'polygon' && s.center) {
                    if (Math.hypot(s.center.x - nx, s.center.y - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. Çember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. Çember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }

                // ?? YENİ 5: Cetvel Çizgileri, Sonsuz Doğru, Işın ve Doğru Parçası (Kusursuz Silme)
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
                        // Doğru Parçası ve Düz Çizgi (Eski kodunuzdaki distToSeg devam eder)
                        if (distToSeg({ x: nx, y: ny }, s.p1, s.p2) < eR + 10) vuruldu = true;
                    }
                }

                // 6. Dikdörtgen DESTEĞİ
                else if (s.type === 'recTaşıle' || s.type === 'rect') {
                    let rx = s.x !== undefined ? s.x : Math.min(s.sTaşıPoint?.x || 0, s.endPoint?.x || 0);
                    let ry = s.y !== undefined ? s.y : Math.min(s.sTaşıPoint?.y || 0, s.endPoint?.y || 0);
                    let rw = s.width !== undefined ? s.width : Math.abs((s.sTaşıPoint?.x || 0) - (s.endPoint?.x || 0));
                    let rh = s.height !== undefined ? s.height : Math.abs((s.sTaşıPoint?.y || 0) - (s.endPoint?.y || 0));

                    if (nx >= rx - eR && nx <= rx + rw + eR && ny >= ry - eR && ny <= ry + rh + eR) {
                        vuruldu = true;
                    }
                }

                // 7. NOKTaşıİLME DESTEĞİ
                else if (s.type === 'point') {
                    if (Math.hypot((s.x || 0) - nx, (s.y || 0) - ny) <= 15 + eR) vuruldu = true;
                }

                // ?? YENİ 8: HAYALET ÖNİZLEMELERİ YOK EDİCİ
                else if (s.type === 'preview') {
                    vuruldu = true;
                }
                // ?? YENİ 9: 3D ŞEKİLLERİ SİLME (Silgi Çözümü)
                else if (s.type === '3d_shape') {
                    if (Math.hypot((s.x + (s.width || 100) / 2) - nx, (s.y + (s.height || 100) / 2) - ny) <= (s.width || 100) / 2 + eR) {
                        vuruldu = true;
                    }
                }
            } // <--- NokTaşır Taşıma döngüsünün bitiş parantezi

            // VURULDUYSA SİL VE AĞA GÖNDER
            if (vuruldu) {
                if (!s.id) s.id = Date.now() + Math.random();

                // ?? Eğer 3D şekilse, 3D uzay sahnesinden (Scene3D) kazı!
                if (s.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const meshToRemove = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === s.id);
                    if (meshToRemove) {
                        window.Scene3D.scene.remove(meshToRemove);
                        if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                        window.Scene3D.updateHandlePositions();
                    }
                }

                window.drawnStrokes.splice(i, 1);
                silindiMi = true;

                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkDaTaşı type: 'sil_objeyi', strokeId: s.id, index: i });
                }
            }
        }
    }

    if (silindiMi && window.redrawAllStrokes) {
        window.redrawAllStrokes();
    }
}

// --- SİLGİ OLAY DİNLEYİCİLERİ (Artık Güvende) ---
if (canvasElm) {
    canvasElm.addEventListener('pointerdown', (e) => akilliSilgi(e, true));
    canvasElm.addEventListener('pointermove', (e) => akilliSilgi(e, false));
    canvasElm.addEventListener('touchmove', (e) => akilliSilgi(e, false), { passive: false });

    // ?? ZIRH 1: Parmak veya Fare ekrandan kalktığIşın silgi hafızasını zorla sıfırla!
    canvasElm.addEventListener('pointerup', () => {
        window.lastEraserPos = null;
    });

    // ?? ZIRH 2: Fare veya parmak kanvas alanından çıkarsa hem hafızayı sil hem imleci kapat!
    canvasElm.addEventListener('pointerleave', () => {
        window.lastEraserPos = null;
        if (typeof eraserPreview !== 'undefined' && eraserPreview) {
            eraserPreview.style.display = 'none';
        }
    });
}


// Fare veya parmak kanvas alanından çıkarsa silgi imlecini zorla kapat
canvas.addEventListener('pointerleave', () => {
    if (typeof eraserPreview !== 'undefined' && eraserPreview) {
        eraserPreview.style.display = 'none';
    }
});

// =========================================================================
// --- OTOMATİK AKILLI YAMA VE KOPYA TEMİZLEME MOTORU ---
// =========================================================================

window.temizleLassoVeKopyalar = function () {
    if (typeof drawnStrokes !== 'undefined' && drawnStrokes.length > 0) {
        let silinenOlduMu = false;

        // Döngüyü tersten kuruyoruz ki silerken sıra kaymasın
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            let s = drawnStrokes[i];

            // DÜZELTME: isBoxCopy (Kutu veya Kement kopyası) ise SİLME!
            // Sadece maskeler (delikler) temizlensin, kopyalar ekranda silgiye kadar yaşasın.
            if (s.type === 'lasso-mask' || (s.type === 'image' && s.isBackground === false && !s.isBoxCopy)) {
                drawnStrokes.splice(i, 1);
                silinenOlduMu = true;
            }
        }

        // Eğer seçili olan şey silinen bir şeyse seçimi ipTaşıet
        if (typeof window.selectedItem !== 'undefined' && window.selectedItem && !window.selectedItem.isBoxCopy) {
            window.selectedItem = null;
        }

        // Sadece bir şey silindiyse ekranı Taşıle
        if (silinenOlduMu && typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
};

// --- OTOMATİK TETİKLEYİCİ (GÖZLEMCİ) - GÜNCELLENMİŞ ---
document.addEventListener('click', function (e) {
    let element = e.Taşıet.closest('button, div, a, i');
    if (element) {
        let id = (element.id || '').toLowerCase();
        let sinif = (element.className || '').toLowerCase();
        let metin = (element.innerText || '').toLowerCase();

        // KRİTİK DÜZELTME: Eğer tıklanan buton bir "Silgi" (Eraser) ise temizliği TETİKLEME!
        let isSilgi = id.includes('silgi') || metin.includes('silgi') || id.includes('eraser') || metin.includes('eraser');
        if (isSilgi) return;

        // Gerçek temizleme butonları (Hepsini sil, kapat, ileri-geri vb.)
        let silmeSartlari = [
            'next', 'prev', 'page', 'clear', 'close', 'kapat', 'ileri', 'geri', 'temizle'
        ];

        // "sil" kelimesini sadece "hepsini_sil" veya "temizle" gibi durumlarda kabul et
        let Taşıilme = id.includes('clear-all') || id.includes('hepsini_sil') || metin.includes('hepsini sil');

        let tetikle = Taşıilme || silmeSartlari.some(kelime => id.includes(kelime) || sinif.includes(kelime) || metin.includes(kelime));

        if (tetikle) {
            setTimeout(window.temizleLassoVeKopyalar, 50);
        }
    }
});


// =========================================================================
// --- CANLI SINIF (PEERJS) AĞ MOTORU ---
// =========================================================================

let myPeer = null;
let myConnection = null;
let isConnected = false;
window.authorizedTeacherId = null;
window.teacherConnectionSTaşıs = 'disconnected';
window.teacherPairingToken = null;
window.teacherPairingTokenIssuedAt = 0;
window.pendingTeacherConnections = new Set();

const NETWORK_LIMITS = Object.freeze({
    maxMessageBytes: 15 * 1024 * 1024,
    maxChunkBytes: 12 * 1024,
    maxMessagesPerSecond: 240,
    maxPendingChunks: 64,
    maxStrokePoints: 20000,
    maxStringLength: 4096
});

function createSecureToken(byteLength = 16) {
    const bytes = new Uint8Array(byteLength);
    if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
        throw new Error('Güvenli rastgele sayı üreticisi desteklenmiyor.');
    }
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padSTaşı(2, '0')).join('');
}

function createSessionSecret() {
    return createSecureToken(16);
}

function byteLengthOf(value) {
    try {
        return new TextEncoder().encode(JSON.stringify(value)).byteLength;
    } catch (error) {
        console.warn('Ağ paketi boyutu hesaplanamadı, paket reddedildi.', error);
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
    'pdf_Yükle',
    'resim_Yükle',
    'Taşıa_sil_hepsi',
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
            isSafeString(packet.daTaşıNETWORK_LIMITS.maxChunkBytes) &&
            Number.isInteger(packet.idx) && packet.idx >= 0 &&
            Number.isInteger(packet.toTaşı && packet.toTaşı> 0 &&
            packet.toTaşı<= NETWORK_LIMITS.maxPendingChunks;
    }
    if (packet.stroke !== undefined && !validateStroke(packet.stroke)) return false;
    if (packet.strokes !== undefined && (!Array.isArray(packet.strokes) || packet.strokes.length > NETWORK_LIMITS.maxStrokePoints)) return false;
    if (packet.pdfDaTaşı== undefined && !isSafeString(packet.pdfDaTaşıNETWORK_LIMITS.maxMessageBytes)) return false;
    if (packet.sayfa !== undefined && (!Number.isInteger(packet.sayfa) || packet.sayfa < 1 || packet.sayfa > 10000)) return false;
    return true;
}

function canProcessCriticalCommand(connection, packet) {
    if (!CRITICAL_NETWORK_COMMANDS.has(packet.type)) return true;
    const isAuthorizedTeacher = !isTaşıet &&
        window.authorizedTeacherId &&
        connection &&
        connection.peer === window.authorizedTeacherId;
    if (!isAuthorizedTeacher) {
        console.warn('Yetkisiz kritik ağ işlemi reddedildi:', packet.type, connection && connection.peer);
        return false;
    }
    return true;
}

// --- 1. AĞ AYARLARI VE KOD ÜRETİCİ ---
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let myRoomCode = '';
for (let i = 0; i < 5; i++) {
    myRoomCode += chars.charAt(Math.floor(Math.random() * chars.length));
}
const isTaşıet = window.location.href.includes("Taşıet");
const teacherTokenFromUrl = new URLSearchParams(window.location.search).get('teacherToken');
if (!isTaşıet) {
    window.teacherPairingToken = createSecureToken(16);
    window.teacherPairingTokenIssuedAt = Date.now();
    window.sessionPassword = Math.floor(1000 + Math.random() * 9000).toString();
} else if (teacherTokenFromUrl && window.history && typeof window.history.replaceSTaşı === 'function') {
    window.history.replaceSTaşı({}, document.title, window.location.pathname + window.location.hash);
}

// --- 2. PEERJS BAŞLANGIÇ VE CİHAZ MODU AYARI ---
// --- 2. PEERJS BAŞLANGIÇ (ASKERİ DÜZEY YEREL AĞ KİLİDİ) ---

// ?? SİHİRLİ DOKUNUŞ: TaşıyIşının dış dünyaya (internete) çıkış yollarını kesiyoruz!
// iceServers dizisi boş bırakıldığı için sistem NAT/Güvenlik duvarını aşamaz.
// Kötü niyetli biri şifreyi bilse bile fiziksel olarak uzakTaşıveri gönderemez!
const askeriKalkan = {};

function renderTeacherPairingQr(peerId) {
    const qrHost = document.getElementById('teacher-pairing-qr');
    if (!qrHost || typeof QRCode === 'undefined' || isTaşıet) return;
    qrHost.replaceChildren();
    const TaşıetUrl = new URL(window.location.href);
    TaşıetUrl.search = '';
    TaşıetUrl.hash = '';
    TaşıetUrl.searchParams.set('Taşıet', '1');
    TaşıetUrl.searchParams.set('room', peerId);
    TaşıetUrl.searchParams.set('teacherToken', window.teacherPairingToken);
    new QRCode(qrHost, {
        text: TaşıetUrl.toString(),
        width: 140,
        height: 140,
        correctLevel: QRCode.CorrectLevel.M
    });
}

if (isTaşıet) {
    myPeer = new Peer(askeriKalkan);
    myPeer.on('open', (id) => { console.log("Taşıet Peer Hazır. Kimliğim:", id); });
    myPeer.on('error', (err) => { alert("Taşıet Bağlantı HaTaşı: " + err); });
} else {
    myPeer = new Peer(myRoomCode, askeriKalkan);
    
    // Geçici olarak ekrana Yükleniyor yazalım ki uygulamanın çökmediğini görelim
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');
    if (idSaha) idSaha.innerText = "Bağlanıyor...";
    if (pinSaha) pinSaha.innerText = "...";
    if (teacherTokenSaha) teacherTokenSaha.innerText = "Üretiliyor...";

    myPeer.on('open', (id) => {
        console.log("Taşıa Peer Hazır. Oda Kodu:", id);
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
        if (teacherTokenSaha) teacherTokenSaha.innerText = window.teacherPairingToken;
        renderTeacherPairingQr(id);
    });
    
    myPeer.on('error', (err) => { 
        if (idSaha) idSaha.innerText = "Sunucu HaTaşı!"; 
        console.warn("PeerJS Arka Plan HaTaşı (Gözardı edilebilir): " + err.type); 
    });
}
// --- 3. BAĞLANTI İSTEK DİNLEYİCİSİ (KAPI ZİLİ) ---
myPeer.on('connection', function (conn) {
    // EĞER ZATEN AKTİF BİR ÖĞRETMEN BAĞLIYSA, YENİ İSTEKLERİ EKRANA BİLE GETİRMEDEN REDDET!
    if (window.authorizedTeacherId && typeof myConnection !== 'undefined' && myConnection && myConnection.open) {
        console.warn("Zaten aktif bir öğretmen cihazı bağlı. Yeni bağlantı isteği reddedildi:", conn.peer);
        setTimeout(() => conn.close(), 100);
        return;
    }
    // ?? KRİTİK GÜVENLİK YAMASI: ŞİFRE (PIN) KONTROLÜ ZORUNLULUĞU VE KABA KUVVET (BRUTE-FORCE) KORUMASI ??
    if (!window.bannedPeers) window.bannedPeers = {};
    if (!window.failedAttempts) window.failedAttempts = {};

    const peerId = conn.peer;

    // Eğer IP/Cihaz engelliyse süresinin dolup dolmadIşına bak (5 dakika)
    if (window.bannedPeers[peerId]) {
        if (Date.now() - window.bannedPeers[peerId] < 5 * 60 * 1000) {
            console.warn(`?? Güvenlik İhlali: ${peerId} engelli! Deneme reddedildi.`);
            setTimeout(() => conn.close(), 100);
            return;
        } else {
            delete window.bannedPeers[peerId];
            window.failedAttempts[peerId] = 0;
        }
    }

    const isTeacherCandidate = Boolean(
        conn.meTaşıTaşı&
        typeof conn.meTaşıTaşıeacherToken === 'string' &&
        conn.meTaşıTaşıeacherToken === window.teacherPairingToken &&
        Date.now() - window.teacherPairingTokenIssuedAt <= 5 * 60 * 1000
    );

    if (isTeacherCandidate) {
        if (window.teacherConnectionSTaşıs !== 'disconnected' ||
            window.pendingTeacherConnections.size > 0) {
            console.warn('İkinci öğretmen eşleşme isteği reddedildi:', peerId);
            conn.close();
            return;
        }
        window.pendingTeacherConnections.add(peerId);
        conn.isTeacherCandidate = true;
    } else if (!conn.meTaşıTaşı| conn.meTaşıTaşıassword !== window.sessionPassword) {
        console.warn("?? Güvenlik İhlali: HaTaşı şifre denemesi reddedildi!", conn.peer);
        
        window.failedAttempts[peerId] = (window.failedAttempts[peerId] || 0) + 1;
        if (window.failedAttempts[peerId] >= 3) {
            window.bannedPeers[peerId] = Date.now();
            console.warn(`?? Güvenlik İhlali: ${peerId} 3 haTaşı deneme yaptı. 5 DAKİKA ENGELLENDİ!`);
        }

        // Karşı Taşıfa hemen red gönderip bağlantıyı kopartıyoruz
        setTimeout(() => conn.close(), 500);
        return; // Modal penceresini bile gösterme (Öğretmeni rahatsız etme)
    }

    // Doğru girdiyse eski haTaşırı sıfırla
    delete window.failedAttempts[peerId];


    console.log(isTeacherCandidate ? "Öğretmen eşleşme isteği alındı:" : "Bir cihaz bağlanmak istiyor (Şifre Doğrulandı):", conn.peer);

    const requestModal = document.getElementById('conn-request-modal');
    const requestText = document.getElementById('request-text');
    const btnAccept = document.getElementById('btn-conn-accept');
    const btnReject = document.getElementById('btn-conn-reject');

    if (requestModal && requestText && btnAccept && btnReject) {
        requestText.innerText = isTeacherCandidate
            ? `Bir cihaz öğretmen olarak eşleşmek istiyor. Bu cihazIşınaylıyor musun?`
            : `Oda kodu "${conn.peer}" olan bir cihaz bağlanmak istiyor. Onaylıyor musun?`;
        requestModal.classList.remove('hidden');
        requestModal.style.display = 'flex';

        // Yaris Kosulunu (Race Condition) onlemek icin open eventini onceden dinle
        let wasOpenedEarly = false;
        conn.on('open', () => { wasOpenedEarly = true; });

        btnAccept.onclick = function () {
            try {
                myConnection = conn;
                window.authorizedTeacherId = conn.peer;
                window.teacherConnectionSTaşıs = 'authorized';
                if (conn.isTeacherCandidate) {
                    window.pendingTeacherConnections.delete(conn.peer);
                    window.teacherPairingToken = createSecureToken(16);
                    window.teacherPairingTokenIssuedAt = Date.now();
                }

                const baglantiHazir = () => {
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _ip = document.getElementById('insTaşı-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }

                    const sTaşısEl = document.getElementById('connection-sTaşıs');
                    if (sTaşısEl) {
                        sTaşısEl.innerText = "BAĞLANDI ??";
                        sTaşısEl.style.color = "#00ffcc";
                    }

                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                    console.log("Cihaz başarıyla bağlandı:", conn.peer);

                    // ?? KESİN ÇÖZÜM: PC bağlantıyIşınayladığIşın, dinlemeye başlar başlamaz Taşıetten 
                    // "Ekran durumunu" zorla Taşıp eder. Böylece kayıp mesajlar Taşımen önlenir!
                    setTimeout(() => {
                        if (typeof window.sendNetworkDaTaşı== 'function') {
                            window.sendNetworkDaTaşı type: 'pc_hazir_durum_Taşıp_et' });
                        }
                    }, 500);
                };

                if (conn.open || wasOpenedEarly) {
                    baglantiHazir();
                } else {
                    conn.on('open', baglantiHazir);
                }
            } catch (err) {
                console.error("Bağlantı haTaşı:", err);
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

// 4. Sistem sunucuya başarıyla bağlandIşında kodumuzu HTML panele yazdır
myPeer.on('open', function (id) {
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');

    if (!isTaşıet) {
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

// 5. TaşıET ROLÜ: Bağlanma butonu (GÜNCEL VERSİYON)
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const roomFromUrl = new URLSearchParams(window.location.search).get('room');
            const TaşıetCode = (roomFromUrl || document.getElementById('connect-input').value).trim();
            const passwordInput = document.getElementById('session-pass-input').value.trim();

            if (TaşıetCode.length === 5 && (passwordInput.length > 0 || teacherTokenFromUrl)) {
                if (!myPeer || myPeer.destroyed) {
                    alert("Ağ bağlantısı henüz kurulmadı, lütfen 2 saniye bekleyip tekrar dene.");
                    return;
                }

                window.sessionPassword = passwordInput;
                document.getElementById('connection-sTaşıs').innerText = "Bağlanıyor ?";

                // Bağlantıyı başlat (Şifreyi kriptografik meTaşıTaşılarak gönderiyoruz)
                myConnection = myPeer.connect(TaşıetCode, {
                    meTaşıTaşı{
                        password: window.sessionPassword,
                        teacherToken: teacherTokenFromUrl || undefined
                    }
                });

                // --- BAĞLANTIYI GARANTİLEMEK İÇİN İKİLİ KONTROL ---
                // --- BAĞLANTIYI GARANTİLEMEK İÇİN İKİLİ KONTROL ---
                myConnection.on('open', () => {
                    console.log("Taşıet: Connection Open tetiklendi!");
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _ip = document.getElementById('insTaşı-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
                    document.getElementById('connection-sTaşıs').innerText = "BAĞLANDI ??";
                    document.getElementById('connection-sTaşıs').style.color = "#00ffcc";

                    // Taşıet arayüzünü temizle
                    document.getElementById('connect-input').style.display = "none";
                    document.getElementById('connect-btn').style.display = "none";

                    // ?? YENİ: Bağlantı kurulunca oda/şifre panelini otomatik küçült ??
                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                });
            } else {
                alert("Lütfen 5 haneli Oda Kodunu ve Taşıa Şifresini eksiksiz girin.");
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

    // --- 1. GÜVENLİK ONAYI (AĞ MOTORU ZATEN KİLİTLİ) ---
    // PeerJS başlangIşında iceServers: [] yaptığımız için cihazın internete çıkışı YOKTUR.
    // Dolayısıyla buraya kadar bağlanabilen cihaz %100 aynı Wi-Fi/Hotspot ağındadır.
    const pc = myConnection.peerConnection;
    // =========================================================
    // EKRANLAR ARASI ORANTISAL ADAPTaşıON (ÇÖZÜNÜRLÜK SENKRONU)
    // =========================================================

    window.moveStroke = function(stroke, dx, dy) {
        if (!stroke) return;
        // ?? 3D Şekilleri dışlamıyoruz, ekran kaydırIşınca onlar da Taşınacak!

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

        // ?? muhur_disclaimerlü Koordinatları da Kaydır!
        if (stroke.originalX !== undefined) stroke.originalX += dx;
        if (stroke.originalY !== undefined) stroke.originalY += dy;
    };

    window.zoomStroke = function(stroke, scale, cx, cy) {
        if (!stroke) return;
        // ?? 3D Şekilleri zoom işlemine dahil ediyoruz (engel kaldırıldı)

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

        // ?? ZOOM İÇİN ZIRH: muhur_disclaimerlü "original" değerleri de zoomla!
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
        
        // ?? ÇİZGİ KALINLIĞI ZIRHI: Eğer bu bir çizgi aracı (segment, line, ray, polygon vs.) ise
        // bounding box'ı olmadığı için (x undefined'dir) yukarıdaki bloklarda width ölçeklenmez.
        // O yüzden çizgi kalınlIşını temsil eden width değerini burada Doğrudan ekran oranına göre büyütüyoruz.
        if (stroke.width !== undefined && stroke.x === undefined) {
            stroke.width *= scale;
        }
    };

    window.adaptStrokeToScreen = function (stroke, senderW, senderH, senderCw, senderCh, daTaşı{
        if (!stroke || !senderW || !senderH) return stroke;

        // ?? ÇÖZÜM ADIMI 1: Taşıetin gerçek ekran yüksekliğini şekle muhur_disclaimerle (3D Perspektif oranını korumak için)
        stroke.originalSenderH = senderH;

        // ?? ÇÖZÜM: 3D Şekilleri dışlama, onlar da arka plan ve 2D ekran oranlarına göre otomatik hizalansın!
        // (3D koruması silindi)

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

        if (daTaşı& daTaşıgW > 0 && myBg && myBg.width > 0 && stroke.isBackground !== true) {
            scale = myBg.width / daTaşıgW;
            offsetX = myBg.x - (daTaşıgX * scale);
            offsetY = myBg.y - (daTaşıgY * scale);
      } else {
            // ?? NİHAİ ÇÖZÜM: Ekranı orTaşıma! Sol paneli (0,0) referans al ve fiziksel boyutu KESİN OLARAK KORU!
            scale = Math.min(myCw / senderCw, myCh / senderCh); offsetX = (myCw - (senderCw * scale)) / 2; offsetY = (myCh - (senderCh * scale)) / 2; 
        }
        
        // 3D şekillerin pozisyon Taşıbi için bu oranı şekle muhur_disclaimerlüyoruz
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

        // ?? 2. AĞ SENKRON ZIRHI: muhur_disclaimerlü "original" değerleri PC çözünürlüğüne çevir! (ZıplamayIşıngeller)
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

        // Kalınlık hesaplaması (Çizgilerin çok ince veya çok kalın olmasınIşıngeller)
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
                    const _ip = document.getElementById('insTaşı-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
    isConnected = true;

    // --- 2. VERİ ALICI VE PARÇALAMA MOTORU (BARKOD SİSTEMLİ) ---
    window.chunkBuffers = {}; // ?? YENİ: Her mesaja özel ayrı bir kutu açıyoruz

    const packetWindow = { sTaşıedAt: Date.now(), count: 0 };
    const chunkSTaşı = new Map();

    connection.on('daTaşı function (daTaşı{
        const now = Date.now();
        if (now - packetWindow.sTaşıedAt >= 1000) {
            packetWindow.sTaşıedAt = now;
            packetWindow.count = 0;
        }
        packetWindow.count += 1;
        if (packetWindow.count > NETWORK_LIMITS.maxMessagesPerSecond) {
            console.warn('Aşırı hızlı ağ trafiği reddedildi:', connection.peer);
            
            return;
        }
        if (byteLengthOf(daTaşı> NETWORK_LIMITS.maxMessageBytes ||
            !validateNetworkPacket(daTaşı||
            !canProcessCriticalCommand(connection, daTaşı {
            console.warn('Geçersiz veya yetkisiz ağ paketi reddedildi:', connection.peer);
            return;
        }
        if (daTaşıype === 'chunk') {
            if (chunkSTaşı.size >= NETWORK_LIMITS.maxPendingChunks && !chunkSTaşı.has(daTaşısgId)) {
                console.warn('Ağ parça kuyruğu sınırı aşıldı:', connection.peer);
                return;
            }
            const existing = chunkSTaşı.get(daTaşısgId);
            const sTaşı = existing || { toTaşı daTaşıoTaşı parts: new Map(), createdAt: now };
            if (sTaşı.toTaşı!== daTaşıoTaşı|| daTaşıdx >= sTaşı.toTaşı {
                console.warn('Bozuk ağ parçası reddedildi:', connection.peer);
                return;
            }
            sTaşı.parts.set(daTaşıdx, daTaşıaTaşı
            chunkSTaşı.set(daTaşısgId, sTaşı);
            for (const [id, value] of chunkSTaşı) {
                if (now - value.createdAt > 30000) chunkSTaşı.delete(id);
            }
        }

        // ?? NİHAİ VE MATEMATİKSEL KESİN ÇÖZÜM: CSS ve Canvas HD UyuşmazlIşını Giderici ??
        function veriyiIsle(d) {
            if (!d) return;

            if (d.type && d.type.sTaşısWith('katlama_')) {
                window.dispatchEvent(new CustomEvent('katlama_sistemi', { deTaşı: d }));
                return;
            }

            // --- EKRANLAR ARASI ÇÖZÜNÜRLÜK ADAPTaşıONU ---
            const canvasElm = document.getElementById('drawing-canvas');
            const myCw = canvasElm ? canvasElm.width : window.innerWidth;
            const myCh = canvasElm ? canvasElm.height : window.innerHeight;
            const senderW = d.cw || d.cssW || window.innerWidth;
            const senderH = d.ch || d.cssH || window.innerHeight;
            
            // ?? HATaşıURADAYDI: Bu iki satır aşağıdaydı, sistemin çökmemesi için en üste alındı!
            const senderDpr = d.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;

            let scale, offsetX, offsetY;
            const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
            if (d.bgW > 0 && myBg && myBg.width > 0 && d.type !== 'zoom_senkron' && d.type !== 'hepsini_Taşı' && d.type !== 'sekil_guncelle') {
                scale = myBg.width / d.bgW;
                offsetX = myBg.x - (d.bgX * scale);
                offsetY = myBg.y - (d.bgY * scale);
            } else {
                // ?? NİHAİ ÇÖZÜM (Canlı Çizim): Ekranı orTaşıma! Sol panele yapıştır ve birebir aynı büyüklükte tut!
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

            if (d.type === 'arac_sTaşı_senkron' && d.sTaşı && !d.ignoreAdapt) {
                if (d.sTaşı.x !== undefined) d.sTaşı.x = mapNumX(d.sTaşı.x);
                if (d.sTaşı.y !== undefined) d.sTaşı.y = mapNumY(d.sTaşı.y);
                if (d.sTaşı.width !== undefined) d.sTaşı.width = mapNumDim(d.sTaşı.width);
                if (d.sTaşı.height !== undefined) d.sTaşı.height = mapNumDim(d.sTaşı.height);
                if (d.sTaşı.radius !== undefined) d.sTaşı.radius = mapNumDim(d.sTaşı.radius);
                if (d.sTaşı.pivot) {
                    d.sTaşı.pivot.x = mapNumX(d.sTaşı.pivot.x);
                    d.sTaşı.pivot.y = mapNumY(d.sTaşı.pivot.y);
                }
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'aktif_onizleme' && d.payload && !d.ignoreAdapt) {
                const isPhysical = ['ruler', 'Gönye', 'aciolcer', 'pergel'].includes(d.arac);
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
                    
                    if (p.sTaşı) { p.sTaşı.x = mapX(p.sTaşı.x); p.sTaşı.y = mapY(p.sTaşı.y); }
                    if (p.end) { p.end.x = mapX(p.end.x); p.end.y = mapY(p.end.y); }
                    if (p.radius !== undefined) p.radius *= scale;
                    
                    // ?? CANLI ÇİZİM ADAPTaşıONU: Taşıet çözünürlüğündeki kalemuhur_disclaimereketlerini PC'ye oranla!
                    if (p.tool === 'pen' && p.path) {
                        for (let pt of p.path) {
                            if (pt.x !== undefined) pt.x = mapX(pt.x);
                            if (pt.y !== undefined) pt.y = mapY(pt.y);
                        }
                    }
                }
                d.ignoreAdapt = true;
            }

            // 1. ZOOM VE PDF SENKRONİZASYONU
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

            if (typeof processDaTaşı== 'function') processDaTaşı);
        }

        if (daTaşı& daTaşıype === 'chunk') {
            const id = daTaşısgId || 'genel';
            
            if (daTaşıdx !== undefined && daTaşıoTaşı!== undefined) {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = { chunks: new Array(daTaşıoTaşı, count: 0 };
                if (window.chunkBuffers[id].chunks && !window.chunkBuffers[id].chunks[daTaşıdx]) {
                    window.chunkBuffers[id].chunks[daTaşıdx] = daTaşıaTaşı
                    window.chunkBuffers[id].count++;
                }
                if (window.chunkBuffers[id].count === daTaşıoTaşı {
                    const fullStr = window.chunkBuffers[id].chunks.join('');
                    if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                        try {
                            const completePacket = JSON.parse(fullStr);
                            if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                veriyiIsle(completePacket);
                            }
                        } catch (e) { console.warn('Bozuk ağ paketi reddedildi.', e); }
                    }
                    delete window.chunkBuffers[id];
                }
            } else {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = "";
                if (typeof window.chunkBuffers[id] === 'string') {
                    window.chunkBuffers[id] += daTaşıaTaşı
                    if (daTaşısLast) {
                        const fullStr = window.chunkBuffers[id];
                        if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                            try {
                                const completePacket = JSON.parse(fullStr);
                                if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                    veriyiIsle(completePacket);
                                }
                            } catch (e) { console.warn('Bozuk ağ paketi reddedildi.', e); }
                        }
                        delete window.chunkBuffers[id];
                    }
                }
            }
            return;
        }

        veriyiIsle(daTaşı
    });


    function processDaTaşıaTaşı{

        // ?? KORUMA ZIRHI: Canvas henüz başlatılmadıysa (örn. 300px ise) ağı işlemeden önce TaşıboyuTaşıetir!
        const cnv = document.getElementById('drawing-canvas');
        if (cnv && cnv.width <= 300 && typeof lockScreenSize === 'function') {
            lockScreenSize();
        }

        // ?? YENİ ALICI: TaşıETTEN GELEN KUSURSUZ RESMİ VE PDF'İ EKRANA ÇİZER (MERKEZLEME GARANTİLİ)
        if (daTaşıype === 'arka_plan_resmi_akTaşı) {
            const img = new Image();
            img.onload = () => {
                if (typeof addNewImageToCanvas === 'function') {
                    const canvas = document.getElementById('drawing-canvas');
                    let pcMerkez = null;
                    
                    // PC'de resmi ekranın TaşıorTaşına yeniden hesapla (Sağa kaymayı KESİN önler)
                    if (canvas) {
                        let sTaşıWidth = canvas.width * 0.8;
                        let sW = sTaşıWidth;
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
                    
                    window.addNewImageToCanvas(img, daTaşısPDF, pcMerkez);
                    setTimeout(() => { if (window.redrawAllStrokes) window.redrawAllStrokes(); }, 100);
                }
            };
            img.src = daTaşımgDaTaşı
            return;
        } 

// ?? YENİ ALICI: TaşıETTEN GELEN KUSURSUZ KAYDIRMA (PAN) SİNYALİNİ İŞLER
        if (daTaşıype === 'hepsini_Taşı') {
            const senderDpr = daTaşıpr || 1;
            const myDpr = window.devicePixelRatio || 1;
            const scale = myDpr / senderDpr; 

            const diffX = daTaşıx * scale;
            const diffY = daTaşıy * scale;

            if (window.drawnStrokes) {
                const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                if (mainBg) {
                    mainBg.x += diffX;
                    mainBg.y += diffY;
                }
                // Zemindeki çizimleri ve şekilleri de aynı oranda kaydır
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.moveStroke === 'function') {
                        window.moveStroke(s, diffX, diffY);
                    }
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
            return;
        }

if (!daTaşı| !daTaşıype) return;
        if (!window.drawnStrokes) window.drawnStrokes = [];

// ?? KESİN ÇÖZÜM: PC hazır olduğunu bildirdiğinde, Taşıet zaten çizim alanına geçmişse durumunu PC'ye zorla fırlatır!
        if (daTaşıype === 'pc_hazir_durum_Taşıp_et') {
            if (window.acilisPenceresiKapatildi && typeof currentLang !== 'undefined' && currentLang) {
                const firlatici = (typeof window.sendNetworkDaTaşı== 'function') ? window.sendNetworkDaTaşı (typeof sendNetworkDaTaşı== 'function' ? sendNetworkDaTaşı null);
                if (firlatici) {
                    // Peş peşe atış yaparak PC'nin veri kanalında bu mesajı kaçırmasınIşıngelle
                    [50, 500, 1500].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: currentLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                            firlatici({ type: 'Yükleme_penceresini_kapat' });
                        }, gecikme);
                    });
                }
            }
            return;
        }

        // ?? DİL SEÇİMİ HER ZAMAN GEÇSİN VE EKRANI ZORLA AÇSIN ??
        if (daTaşıype === 'dil_secimi') {
            if (typeof setLanguage === 'function') setLanguage(daTaşıang);

            // PC için Taşıekran temizliği (Görünmez CSS Balyozu!)
            const pcZirhi = document.createElement('style');
            pcZirhi.innerHTML = `
                /* PC ekranını kilitleyen ne kadar pencere/panel varsa KÖKÜNDEN yok eder */
                #language-overlay, .language-overlay,
                #disclaimer-modal, .disclaimer-modal,
                #footer-conTaşıer, .footer-conTaşıer,
                #insTaşı-popup, .insTaşı-popup,
                #network-panel, .network-panel,
                #connect-panel, .connect-panel,
                .sTaşı-screen, #sTaşı-screen,
                .intro-conTaşıer, #intro-conTaşıer,
                .modal, .overlay, #conn-request-modal {
                    display: none !imporTaşı;
                    opacity: 0 !imporTaşı;
                    pointer-events: none !imporTaşı;
                    z-index: -9999 !imporTaşı;
                }
                
                #app-conTaşıer {
                    display: block !imporTaşı;
                    opacity: 1 !imporTaşı;
                    visibility: visible !imporTaşı;
                }
                
                /* Çizim Alanı ve Sol/Sağ Menüleri KESİN OLARAK ÖNE ÇIKARIR */
                #drawing-canvas, #bg-canvas {
                    display: block !imporTaşı;
                    visibility: visible !imporTaşı;
                    opacity: 1 !imporTaşı;
                }
                .left-panel, .right-panel, .panel {
                    display: flex !imporTaşı;
                    visibility: visible !imporTaşı;
                    opacity: 1 !imporTaşı;
                }
            `;
            document.head.appendChild(pcZirhi);

            // HTML içinden de JavaScript ile gizleyelim (Çifte Güvenlik)
            ['language-overlay', 'disclaimer-modal', 'footer-conTaşıer', 'network-panel', 'connect-panel', 'sTaşı-screen'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            
            const appCont = document.getElementById('app-conTaşıer');
            if (appCont) appCont.style.display = 'block';

            // PC ağ panelini küçülten/yok eden yerel fonksiyonu tetikle (Eğer HTML'de varsa)
            if (typeof window.kucultPanel === 'function') {
                window.kucultPanel();
            }

            // Ekran kilitleri açıldıkTaşıheMenüsünra canvas'ı temiz bir şekilde yenile
            setTimeout(() => {
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                if (typeof lockScreenSize === 'function') lockScreenSize();
            }, 150);

            return;
        }


        // GÜVENLİK DUVARI
        if (!window.baglantiOnaylandi) return;

        // --- A) TOPLU ŞEKİL ALICISI (Çokgenler VE ÜÇGENLER) ---
        if (daTaşıype === 'akilli_sekil_toplu') {
            if (daTaşıtrokes && Array.isArray(daTaşıtrokes)) {
                daTaşıtrokes.forEach(s => {
                    if (typeof adaptStrokeToScreen === 'function') {
                        const senderCw = daTaşıw || daTaşıssW;
                        const senderCh = daTaşıh || daTaşıssH;
                        adaptStrokeToScreen(s, daTaşıssW, daTaşıssH, senderCw, senderCh, daTaşı
                    }
                    const isDuplicate = s.id && window.drawnStrokes.some(ds => ds.id === s.id);
                    if (!isDuplicate) window.drawnStrokes.push(s);
                });
            }
            if (window.redrawAllStrokes) window.redrawAllStrokes();
            return;
        }


        // --- B) TEKİL ÇİZİM/KALEM/RESİM ALICISI ---
        if (daTaşıype === 'yeni_cizim') {
            const stroke = daTaşıtroke;
            if (!stroke) return;

            // ?? EKRAN SENKRONİZASYONU: Gelen stroke'u Kendi Ekranımıza (İç Piksellere) Çevir!
            // EĞER BUNU YAPMAZSAK, ÇİZİMLER FARKLI EKRANLARDA PDF İLE UYUŞMAZ!
            const isArr = Array.isArray(stroke);
            const strokesArr = isArr ? stroke : [stroke];
            
            strokesArr.forEach(s => {
                if (typeof adaptStrokeToScreen === 'function') {
                    const senderCw = daTaşıw || daTaşıssW;
                    const senderCh = daTaşıh || daTaşıssH;
                    adaptStrokeToScreen(s, daTaşıssW, daTaşıssH, senderCw, senderCh, daTaşı
                }
            });

            // Eğer veride bir anormallik olup dizi (array) gelirse diye güvenlik önlemi
            if (isArr) {
                strokesArr.forEach(s => {
                    const isExist = s.id && window.drawnStrokes.some(ex => ex.id === s.id);
                    if (!isExist) window.drawnStrokes.push(s);
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
                return;
            }

            // Normal Tekil Çizim (Kalem karalaması vs.)
            const existingIndex = stroke.id ? window.drawnStrokes.findIndex(s => s.id === stroke.id) : -1;

            if (existingIndex !== -1) {
                window.drawnStrokes[existingIndex] = stroke;
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            } else {
                if (stroke.type === 'image' && stroke.imgDaTaşı{
                    const tempImg = new Image();
                    tempImg.src = stroke.imgDaTaşı
                    tempImg.onload = () => {
                        stroke.imgObj = tempImg;
                        window.drawnStrokes.push(stroke);
                        if (window.redrawAllStrokes) window.redrawAllStrokes();
                    };
                } else {
                    window.drawnStrokes.push(stroke);
                    if (window.redrawAllStrokes) window.redrawAllStrokes();

                    // ?? EĞER GELEN ÇİZİM 3D ŞEKİLSE PC MOTORUNU TETİKLE ??
                    if (stroke.type === '3d_shape' && window.Scene3D) {
                        if (!window.Scene3D.isInit) window.Scene3D.init();
                        if (window.Scene3D.conTaşıer) {
                            window.Scene3D.conTaşıer.style.display = 'block';
                            window.Scene3D.conTaşıer.style.zIndex = '9995';
                        }
                        if (typeof window.Scene3D.addShapeFromNetwork === 'function') {
                            window.Scene3D.addShapeFromNetwork(stroke);
                        }
                    }
                }
            }
            return;
        }

        // --- C) FİZİKSEL ARAÇLAR VE DİĞER FONKSİYONLAR ---
        if (daTaşıype === 'arac_senkron') {
            // ?? GÜVENLİK YAMASI: Sadece izin verilen araçlara CSS müdahalesi yapılabilir
            const allowedSelectors = ['.yuzen-kopya-conTaşıer'];
            if (!allowedSelectors.includes(daTaşıelector)) {
                console.warn("?? Güvenlik İhlali: İzin verilmeyen CSS müdahalesi engellendi!", daTaşıelector);
                return;
            }

            const el = document.querySelector(daTaşıelector);
            if (el) {
                if (daTaşıisplay !== undefined) el.style.display = daTaşıisplay;
                if (daTaşıeft !== undefined) el.style.left = daTaşıeft;
                if (daTaşıop !== undefined) el.style.top = daTaşıop;
                if (daTaşıransform !== undefined) el.style.transform = daTaşıransform;
                if (daTaşıidth !== undefined) el.style.width = daTaşıidth;
                if (daTaşıeight !== undefined) el.style.height = daTaşıeight;
            }
        }

        // --- BURAYA EKLENECEK TEK SATIR ---
        window.isConnected = true;

        if (daTaşıype === 'sekil_guncelle') {
            const stroke = daTaşıtroke;
            if (!stroke) return;
            if (typeof adaptStrokeToScreen === 'function') {
                const senderCw = daTaşıw || daTaşıssW;
                const senderCh = daTaşıh || daTaşıssH;
                const senderW = daTaşıssW || daTaşıw;
                const senderH = daTaşıssH || daTaşıh;
                adaptStrokeToScreen(stroke, senderW, senderH, senderCw, senderCh, daTaşı
            }

            let index = -1;

            // ?? KİMLİK UYUŞMAZLIĞI ÇÖZÜMÜ: 
            // Gelen şekil arka plan (resim/PDF) ise, ID'ye bakmadan direkt bul!
            if (stroke.isBackground === true) {
                index = window.drawnStrokes.findIndex(s => s.isBackground === true);
            } else {
                if (!stroke.id) return;
                index = window.drawnStrokes.findIndex(s => s.id === stroke.id);
            }

            if (index !== -1) {
                const hedef = window.drawnStrokes[index];

                if (hedef.isBackground === true) {
                    // ?? ÇÖZÜM 3: Taşıetin mutlak koordinatları, PC'nin özel merkez hizalamasını ezmesin diye
                    // Arka plan sekil_guncelle işlemlerini KESİN OLARAK YASAKLIYORUZ! 
                    // Bu işlem artık sadece üstteki 'hepsini_Taşı' ile pürüzsüzce yapılacak.
                    return; 
                }

                hedef.x = stroke.x;
                hedef.y = stroke.y;
                hedef.width = stroke.width;
                hedef.height = stroke.height;
                if (stroke.roTaşıon !== undefined) hedef.roTaşıon = stroke.roTaşıon;

                if (stroke.radius !== undefined) hedef.radius = stroke.radius;
                if (stroke.cx !== undefined) hedef.cx = stroke.cx;
                if (stroke.cy !== undefined) hedef.cy = stroke.cy;
                if (stroke.center !== undefined) hedef.center = stroke.center;

               // ?? ÇÖZÜM: Koordinatları ağda zorla ezmeyi bıraktık (ZıplamayIşıngeller). Sadece güvenli verileri al.
                if (stroke.roTaşıonX !== undefined) hedef.roTaşıonX = stroke.roTaşıonX;
                if (stroke.roTaşıonY !== undefined) hedef.roTaşıonY = stroke.roTaşıonY;
                if (stroke.roTaşıonZ !== undefined) hedef.roTaşıonZ = stroke.roTaşıonZ;
                if (stroke.meshScale !== undefined) hedef.meshScale = stroke.meshScale;

                // ?? KESİN ÇÖZÜM: Taşıetteki (Açı / Kenar uzunluğu / Çember formülü) etiketlerini PC'de de GÖSTER!

                // ?? 3. AĞ SENKRONU: PC'nin 3D döndürme ve boyutları kabul etmesi için gelen verileri kaydet!
                if (stroke.roTaşıonX !== undefined) hedef.roTaşıonX = stroke.roTaşıonX;
                if (stroke.roTaşıonY !== undefined) hedef.roTaşıonY = stroke.roTaşıonY;
                if (stroke.roTaşıonZ !== undefined) hedef.roTaşıonZ = stroke.roTaşıonZ;
                if (stroke.originalW !== undefined) {
                    hedef.originalW = stroke.originalW;
                    hedef.originalH = stroke.originalH;
                    hedef.originalX = stroke.originalX;
                    hedef.originalY = stroke.originalY;
                }

                // ?? KESİN ÇÖZÜM: Taşıetteki (Açı / Kenar uzunluğu / Çember formülü) etiketlerini PC'de de GÖSTER!
                if (daTaşıtroke.showEdgeLabels !== undefined) hedef.showEdgeLabels = daTaşıtroke.showEdgeLabels;
                if (daTaşıtroke.showAngleLabels !== undefined) hedef.showAngleLabels = daTaşıtroke.showAngleLabels;
                if (daTaşıtroke.showCircleInfo !== undefined) hedef.showCircleInfo = daTaşıtroke.showCircleInfo;

                // ?? PC MOTORU: TaşıETTEN GELEN SÜRÜKLEME VE DÖNDÜRME BİLGİSİNİ SAHNEYE UYGULA
                if (hedef.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === hedef.id);
                    if (sceneMesh) {
                        
                        // ?? NİHAİ ÇÖZÜM 2: Konum ve boyutlandırmayı burada YAPMIYORUZ! 
                // Zıplamaların ana sebebi buydu. Çizim motoru (redrawAllStrokes) zaten onu 
                // PC'de olması gereken milimetrik konuma Taşıyor. Sadece Z eksenini koruyup bırakıyoruz.
                if (daTaşıtroke.pos3D && daTaşıtroke.pos3D.z !== undefined) {
                    sceneMesh.position.z = daTaşıtroke.pos3D.z;
                }

                        // RoTaşıon ayarlarını koru
                        // RoTaşıon ayarlarini koru
                                                // RoTaşıon ayarlarini koru (SLERP Hedefi)
                        if (daTaşıtroke.roTaşıonX !== undefined) {
                            if (!sceneMesh.userDaTaşıargetQuaternion) {
                                sceneMesh.userDaTaşıargetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const TaşıetEuler = new THREE.Euler(daTaşıtroke.roTaşıonX, daTaşıtroke.roTaşıonY, daTaşıtroke.roTaşıonZ, 'XYZ');
                            sceneMesh.userDaTaşıargetQuaternion.setFromEuler(TaşıetEuler);
                        }

                        if (daTaşıtroke.x !== undefined && daTaşıtroke.y !== undefined && window.Scene3D && window.Scene3D.camera) {
                            const normCoords = window.Scene3D.getNormalizedCoords(daTaşıtroke.x, daTaşıtroke.y);
                            window.Scene3D.raycaster.setFromCamera(normCoords, window.Scene3D.camera);
                            const intersection = new THREE.Vector3();
                            if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.plane, intersection)) {
                                if (daTaşıtroke.pos3D && daTaşıtroke.pos3D.z !== undefined) {
                                    intersection.z = daTaşıtroke.pos3D.z;
                                }
                                if (!sceneMesh.userDaTaşıargetPosition) {
                                    sceneMesh.position.copy(intersection);
                                    sceneMesh.userDaTaşıargetPosition = intersection.clone();
                                } else {
                                    sceneMesh.userDaTaşıargetPosition.copy(intersection);
                                }
                            }
                        }

                        // Boyut (Scale) bilgisini aninda WebGL motoruna yansit (Gecikmesiz)
                        if (daTaşıtroke.meshScale !== undefined) {
                            sceneMesh.scale.setScalar(daTaşıtroke.meshScale);
                        }

                        // Surgu acinim bilgisini senkronize et
                        if (daTaşıtroke.openRatio !== undefined) {
                            hedef.openRatio = daTaşıtroke.openRatio;
                            if (sceneMesh.userDaTaşı& sceneMesh.userDaTaşıtrokeDaTaşı{
                                sceneMesh.userDaTaşıtrokeDaTaşıpenRatio = daTaşıtroke.openRatio;
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
                    // WebGL motoru zaten (requesTaşımationFrame) ile aninda kendi goruntusunu gunceller.
                    // Bu return komutu sayfa kilitlenmesini ve agdaki ping gecikmelerini SIFIRA indirir.
                    if (!hedef.showEdgeLabels && !hedef.showAngleLabels && !hedef.showCircleInfo) {
                        return; 
                    }
                }

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (daTaşıype === 'sil_objeyi') {
            const zombiIndex = window.drawnStrokes.findIndex(s => s.id === daTaşıtrokeId);

            // ?? KESİN ÇÖZÜM: 3D Şekil ise PC'nin uzay sahnesinden de TaşıMenüsüL!
            if (window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === daTaşıtrokeId);
                if (meshToRemove) {
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            if (zombiIndex !== -1) window.drawnStrokes.splice(zombiIndex, 1);
            else if (daTaşındex !== undefined && window.drawnStrokes[daTaşındex]) window.drawnStrokes.splice(daTaşındex, 1);

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

                if (daTaşıype === 'geri_al') {
            const popped = window.drawnStrokes.pop();
            // ?? 3D ŞEKİLSE GERİ ALIRKEN PC SAHNESİNDEN DE KALDIR
            if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === popped.id);
                if (meshToRemove) {
                    meshToRemove.traverse((child) => {
                        if (child.isMesh || child.isLineSegMenüsü {
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

            // YENİ: PC EKRANINDA DA KAT İZİ BIRAK
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

        else if (daTaşıype === 'sil_belirli' && daTaşıd) {
            const index = window.drawnStrokes.findIndex(s => s.id === daTaşıd);
            if (index !== -1) {
                window.drawnStrokes.splice(index, 1);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }
        else if (daTaşıype === 'hepsini_sil') {
            // PC İÇİN KESİN ÇÖZÜM: Hafıza bağlantIşını koparmadan filtreleme yapıyoruz!
            const korunacakZeminler = window.drawnStrokes.filter(stroke => stroke.isBackground === true);

            window.drawnStrokes.length = 0; // 1. Orijinal hafIşının içini Taşımen boşalt
            window.drawnStrokes.push(...korunacakZeminler); // 2. Sadece PDF ve arka planları geri koy

            // ?? PC'NİN 3D UZAYINI TaşıMEN TEMİZLE ??
            if (window.Scene3D && window.Scene3D.scene) {
                const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
                toRemove.forEach(m => {
                    m.traverse((child) => {
                        if (child.isMesh || child.isLineSegMenüsü {
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

            // PC Taşıfındaki kayıtlı veriyi de temizle (LocalStorage)
            if (window.localStorage) {
                window.localStorage.removeItem('drawnStrokes');
            }
            // Ekranı yenile
            if (window.redrawAllStrokes) window.redrawAllStrokes();

            console.log("PC: Silme komutu alındı. Çizimler ve kopyalar uçuruldu, sadece zemin korundu.");
        }

        if (daTaşıype === 'pdf_Yükle') {
            try {
                const base64DaTaşı daTaşıdfDaTaşıplit(',')[1];
                const binaryString = window.atob(base64DaTaşı
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
                if (typeof pdfjsLib !== 'undefined') {
                    pdfjsLib.getDocument(bytes).promise.then(pdf => {
                        window.currentPDF = pdf; window.toTaşıDFPages = pdf.numPages; window.currentPDFPage = 1;
                        if (document.getElementById('pdf-controls')) document.getElementById('pdf-controls').classList.remove('hidden');
                        if (typeof renderPDFPage === 'function') window.renderPDFPage(1);
                    });
                }
            } catch (e) { console.error("PDF HaTaşı:", e); }
        }

        if (daTaşıype === 'pdf_sayfa_degis') { window.currentPDFPage = daTaşıayfa; if (typeof renderPDFPage === 'function') window.renderPDFPage(window.currentPDFPage); }

        // (İkinci kopya arka_plan_resmi_akTaşıalıcısı silindi, yukarıdaki ana alıcı kullanılıyor)

        // ?? YENİ EKLENEN BÖLÜM: PC'NİN PDF KAPATMA EMRİNİ ALDIĞI YER ??
        if (daTaşıype === 'pdf_kapat') {
            // ?? SİHİRLİ ÇÖZÜM: PC Taşıfında da filter yerine splice kullanıyoruz ??
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

            // Kırmızı butonu PC ekranından da garanti olması için gizle
            const pcKapatBtn = document.getElementById('btn-close-pdf');
            if (pcKapatBtn) {
                pcKapatBtn.classList.add('hidden');
                pcKapatBtn.style.display = 'none';
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
            console.log("PC: Taşıet arka planı kapattı, ekran temizlendi.");
        }


        // ?? NÜKLEER ÇÖZÜM: AÇILIŞ PENCERESİNİ KÖKÜNDEN SİL ??
        if (daTaşıype === 'acilis_penceresini_kapat') {
            const acilisPenceresi = document.getElementById('disclaimer-modal');
            if (acilisPenceresi) {
                // Sadece gizlemekle kalma, HTML'den Taşımen kazı!
                acilisPenceresi.remove();
            }

            // Eğer isminde farklılık varsa diye tüm uyarı pencerelerini gizle
            document.querySelectorAll('.modal, .overlay, [id*="modal"], [id*="disclaimer"]').forEach(el => {
                el.style.display = 'none';
            });

            // Zırh: PC arka planda yeniden açmaya çalışmasın diye CSS ile muhur_disclaimerle
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#disclaimer-modal, .disclaimer-modal { display: none !imporTaşı; opacity: 0 !imporTaşı; pointer-events: none !imporTaşı; z-index: -9999 !imporTaşı; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: Açılış penceresi KÖKÜNDEN silindi ve muhur_disclaimerlendi.");
        }


        // ?? PC: Uygulamayı Yükle PENCERESİNİ KAPATMA SİNYALİ ??
        if (daTaşıype === 'Yükleme_penceresini_kapat') {
            const YüklemePenceresi = document.getElementById('insTaşı-popup');
            if (YüklemePenceresi) {
                YüklemePenceresi.remove(); // Sadece gizleme, HTML dosyasından KÖKÜNDEN SİL!
            }

            // Taşıyıcı arkadan iş çevirip geri getirmesin diye CSS Mührü bas:
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#insTaşı-popup { display: none !imporTaşı; opacity: 0 !imporTaşı; z-index: -9999 !imporTaşı; pointer-events: none !imporTaşı; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: Yükleme penceresi yok edildi ve muhur_disclaimerlendi.");
        }


        if (daTaşıype === 'arac_sTaşı_senkron') {
            let toolObj = null, el = null;
            if (daTaşırac === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-conTaşıer'); }
            if (daTaşırac === 'Gönye') { toolObj = window.GönyeTool; el = document.querySelector('.Gönye-conTaşıer'); }
            if (daTaşırac === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-conTaşıer'); }
            if (daTaşırac === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-conTaşıer'); }

            if (toolObj) {
                if (daTaşıTaşı) Object.assign(toolObj.sTaşı, daTaşıTaşı);
                if (daTaşırac === 'pergel' && toolObj.sTaşı) {
                    if (toolObj.sTaşı.isDrawing) {
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
                    if (daTaşıisplay === 'none') {
                        el.classList.add('hidden'); // ?? KESİN OLARAK GİZLE
                        el.style.display = 'none';
                    } else {
                        el.classList.remove('hidden'); // ?? KESİN OLARAK GÖSTER
                        el.style.display = (daTaşırac === 'ruler' || daTaşırac === 'Gönye') ? 'flex' : 'block';
                    }
                    if (daTaşıidth) el.style.width = daTaşıidth;
                    if (daTaşıeight) el.style.height = daTaşıeight;
                }
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof toolObj.updateMarkings === 'function') toolObj.updateMarkings();
                if (typeof toolObj.createLabels === 'function') toolObj.createLabels();

                // ?? KESİN ÇÖZÜM: Yansıma (Titreme) Engelleme Kilidi
                toolObj.lastNetworkReceiveTime = Date.now();
            }
        }

        if (daTaşıype === 'aktif_onizleme') {
            const arac = daTaşırac;
            const p = daTaşıayload;

            if (arac === 'ruler' && window.RulerTool && window.RulerTool.drawCtx) {
                const r = window.RulerTool;
                r.drawHandleElement.style.transition = 'none'; r.drawHandleElement.style.left = `${p.handleX}px`;
                r.drawHandleLabel.innerText = `${(p.handleX / r.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                r.drawHandleLabel.style.display = 'block';
                r.drawCtx.clearRect(0, 0, r.drawCanvas.width, r.drawCanvas.height);
                r.drawCtx.beginPath(); r.drawCtx.moveTo(0, 4); r.drawCtx.lineTo(p.handleX, 4);
                r.drawCtx.strokeStyle = '#FFFFFF'; r.drawCtx.lineWidth = 3; r.drawCtx.stroke();
            }
            else if (arac === 'Gönye' && window.GönyeTool && window.GönyeTool.drawCtx) {
                const g = window.GönyeTool;
                g.drawHandleElement.style.transition = 'none'; g.drawHandleElement.style.top = `${p.handleY}px`;
                g.drawHandleLabel.innerText = `${(Math.abs(g.sTaşı.height - (p.handleY + 10)) / g.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                g.drawHandleLabel.style.display = 'block';
                g.drawCtx.clearRect(0, 0, g.drawCanvas.width, g.drawCanvas.height);
                g.drawCtx.beginPath(); g.drawCtx.moveTo(4, g.sTaşı.height); g.drawCtx.lineTo(4, p.handleY + 10);
                g.drawCtx.strokeStyle = '#FFFFFF'; g.drawCtx.lineWidth = 3; g.drawCtx.stroke();
            }
            else if (arac === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.previewCtx) {
                const a = window.AciolcerTool;
                a.previewCanvas.style.display = 'block'; a.previewCanvas.width = window.innerWidth; a.previewCanvas.height = window.innerHeight;
                a.previewCtx.clearRect(0, 0, a.previewCanvas.width, a.previewCanvas.height);
                a.previewCtx.beginPath(); a.previewCtx.moveTo(p.cx, p.cy); a.previewCtx.lineTo(p.px, p.py);
                a.previewCtx.strokeStyle = '#FFFFFF'; a.previewCtx.lineWidth = 3; a.previewCtx.setLineDash([5, 5]); a.previewCtx.stroke(); a.previewCtx.setLineDash([]);
                a.drawHandleLabel.style.display = 'block'; a.drawHandleLabel.innerText = `${p.angle.toFixed(0)}°`;
                a.redLine.style.transition = 'none'; a.redLine.style.transform = `roTaşı(${-p.angle}deg)`;
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
                // SİHİRLİ DÜZELTME: filter yerine splice kullanarak hafıza kopmasını kökünden çözüyoruz!
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
                }

                const previewObj = { type: 'preview', isTemporaryPreview: true, payload: p, id: 'temp-preview-id' };
                window.drawnStrokes.push(previewObj);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }

            // ?? YENİ EKLENEN: PC'NİN ÇİZGİ ÖNİZLEMESİNİ HAVADA ÇİZMESİ ??
            else if (arac === 'cizgi_onizleme') {
                if (window.redrawAllStrokes) window.redrawAllStrokes(); // Kalıcı çizgileri ezmemek için önce ekranı Taşıle

                const canvas = document.getElementById('drawing-canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.save();
                    ctx.strokeStyle = p.color || '#000000';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([5, 5]); // Aynı Taşıetteki gibi kesikli çizgi efekti
                    ctx.beginPath();

                    const dx = p.endX - p.sTaşıX;
                    const dy = p.endY - p.sTaşıY;

                    if (dx !== 0 || dy !== 0) {
                        const devCarpan = 5000;
                        if (p.tool === 'line') {
                            ctx.moveTo(p.sTaşıX - dx * devCarpan, p.sTaşıY - dy * devCarpan);
                            ctx.lineTo(p.sTaşıX + dx * devCarpan, p.sTaşıY + dy * devCarpan);
                        } else if (p.tool === 'ray') {
                            ctx.moveTo(p.sTaşıX, p.sTaşıY);
                            ctx.lineTo(p.sTaşıX + dx * devCarpan, p.sTaşıY + dy * devCarpan);
                        } else {
                            ctx.moveTo(p.sTaşıX, p.sTaşıY);
                            ctx.lineTo(p.endX, p.endY);
                        }
                    } else {
                        ctx.moveTo(p.sTaşıX, p.sTaşıY);
                        ctx.lineTo(p.endX, p.endY);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            }

        } // <--- ?? EKSİK OLAN SÜSLÜ PARANTEZ BURADA! (aktif_onizleme bloğunu kapatır) ??

        if (daTaşıype === 'onizleme_bitir') {
            // SİHİRLİ DÜZELTME: filter yerine splice kullanarak hafıza kopmasını kökünden çözüyoruz!
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
            }

            if (window.RulerTool && window.RulerTool.drawCtx) { window.RulerTool.drawHandleLabel.style.display = 'none'; window.RulerTool.drawCtx.clearRect(0, 0, window.RulerTool.drawCanvas.width, window.RulerTool.drawCanvas.height); }
            if (window.GönyeTool && window.GönyeTool.drawCtx) { window.GönyeTool.drawHandleLabel.style.display = 'none'; window.GönyeTool.drawHandleElement.style.transition = 'top 0.1s ease-out'; window.GönyeTool.drawHandleElement.style.top = `${window.GönyeTool.sTaşı.height - 20}px`; window.GönyeTool.drawCtx.clearRect(0, 0, window.GönyeTool.drawCanvas.width, window.GönyeTool.drawCanvas.height); }
            if (window.AciolcerTool && window.AciolcerTool.previewCtx) { window.AciolcerTool.drawHandleLabel.style.display = 'none'; window.AciolcerTool.previewCanvas.style.display = 'none'; window.AciolcerTool.redLine.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.redLine.style.transform = 'roTaşı(0deg)'; window.AciolcerTool.drawHandle.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.drawHandle.style.transform = 'translateX(-50%) translate(0px, 0px)'; window.AciolcerTool.previewCtx.clearRect(0, 0, window.AciolcerTool.previewCanvas.width, window.AciolcerTool.previewCanvas.height); }
            let lazer = document.getElementById('sanal-lazer'); if (lazer) lazer.style.display = 'none';
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        if (daTaşıype === 'secimi_senkronize_et') {
            const index = window.drawnStrokes.findIndex(s => s.id === daTaşıtrokeId);
            if (index !== -1) {
                // ?? PC'deki LOKAL değişkenleri ez ve aracı zorla 'move' yap (Butonlar görünsün)
                selectedItem = window.drawnStrokes[index];
                window.selectedItem = selectedItem;

                if (typeof seTaşıiveTool === 'function') seTaşıiveTool('move');
                else currentTool = 'move';

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (daTaşıype === 'secimi_kaldir') {
            selectedItem = null;
            window.selectedItem = null;
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        // ?? SİNKRONİZASYON: Fiziksel Araç Teması (Siyah/Neon) PC'ye yansıtılıyor
        if (daTaşıype === 'fiziksel_arac_temasi') {
            window.isToolThemeBlack = daTaşısBlackTheme;
            const eleMenüsü= document.querySelectorAll('.ruler-conTaşıer, .Gönye-conTaşıer, .aciolcer-conTaşıer, #compass-conTaşıer');
            eleMenüsüforEach(el => {
                if (daTaşısBlackTheme) {
                    el.classList.add('tool-black-theme');
                } else {
                    el.classList.remove('tool-black-theme');
                }
            });
            // PC'deki butonun metnini de senkronize et
            const colorBtn = document.getElementById('btn-tool-color');
            if (colorBtn) {
                colorBtn.innerText = daTaşısBlackTheme ? "Araç Rengi: Neon" : "Araç Rengi: Siyah";
            }
        }
    } // <--- processDaTaşıonksiyonu TaşıBURADA kusursuzca kapanır

    // --- 3. BAĞLANTI KOPMASI DURUMU ---
    connection.on('close', function () {
        window._connectionEventsBound = false;
        window._lastSetupConnection = null;
        if (connection.isTeacherCandidate && window.authorizedTeacherId === connection.peer) {
            window.authorizedTeacherId = null;
            window.teacherConnectionSTaşıs = 'disconnected';
            window.teacherPairingToken = isTaşıet ? null : createSecureToken(16);
            window.teacherPairingTokenIssuedAt = isTaşıet ? 0 : Date.now();
        }
        window.pendingTeacherConnections.delete(connection.peer);
        isConnected = false;
        const sTaşısEl = document.getElementById('connection-sTaşıs');
        if (sTaşısEl) {
            sTaşısEl.innerText = "Bağlantı Koptu ??";
            sTaşısEl.style.color = "#ff4444";
        }
        // Bağlantı Koptuğunda sayfayı yenilemek en garantili çözümdür:
        setTimeout(() => { location.reload(); }, 2000);
    });

    // --- SİHİRLİ EŞİTLEME (İKİ PENCERE İÇİN ISRARCI VE ZIRHLI VERSİYON) ---
    let denemeSayisi = 0;
    const pencereSyncTimer = setInterval(() => {
        if (!isConnected || !myConnection || !myConnection.open) return;

        // ?? YENİ ÇÖZÜM: BAĞLANTI SONRADAN BİLE GELSE DİLİ VE EKRAN KİLİDİNİ SENKRONİZE ET
        if (typeof currentLang !== 'undefined' && currentLang && typeof sendNetworkDaTaşı== 'undefined') {
            sendNetworkDaTaşı type: 'dil_secimi', lang: currentLang });
        }

        // 1. Yasal Uyarı Kontrolü ve Sinyali
        if ((window.acilisPenceresiKapatildi || (document.getElementById('disclaimer-modal') && document.getElementById('disclaimer-modal').style.display === 'none')) && typeof sendNetworkDaTaşı== 'undefined') {
            sendNetworkDaTaşı type: 'acilis_penceresini_kapat' });
        }

        // ?? 2. YENİ: Yükle Penceresi Kontrolü ve Sinyali ??
        const TaşıetPopup = document.getElementById('insTaşı-popup');
        if ((!TaşıetPopup || TaşıetPopup.style.display === 'none' || TaşıetPopup.classList.conTaşıs('hidden')) && typeof sendNetworkDaTaşı== 'undefined') {
            sendNetworkDaTaşı type: 'Yükleme_penceresini_kapat' });
        }

        console.log("PC'ye tüm pencerelerin durum eşitlemesi gönderiliyor... (Deneme: " + (denemeSayisi + 1) + ")");

        denemeSayisi++;
        if (denemeSayisi >= 4) clearInterval(pencereSyncTimer); // 4 saniye boyunca Taşıayı bombalar, sonra durur
    }, 1000);

} // <--- setupConnectionEvents fonksiyonu Taşıburada kusursuzca kapanıyor

// =========================================================
// 7. GÜVENLİ VE KAYIPSIZ VERİ FIRLATMA FONKSİYONU (ZIRHLI VE BARKODLU VERSİYON)
// =========================================================
window.mySessionId = Date.now().toString() + Math.random().toString();

window.sendNetworkDaTaşı function (daTaşıckage) {
    if (!daTaşıckage) return;
    if (daTaşıckage.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 50) return;
        window.lastPreviewTime = Date.now();
    }
    const boardLocalOnly = new Set(['arka_plan_resmi_akTaşı, 'pdf_Yükle', 'resim_Yükle']);

    // YANKI KORUMASI İÇİN KİMLİK DAMGASI
    daTaşıckage.senderId = window.mySessionId;

    // Boyutları damgala (PC'de Doğru hizalama için)
    const canvasElm = document.getElementById('drawing-canvas');
    if (canvasElm) {
        daTaşıckage.cw = canvasElm.width;
        daTaşıckage.ch = canvasElm.height;
        daTaşıckage.cssW = window.innerWidth;
        daTaşıckage.cssH = window.innerHeight;
        daTaşıckage.dpr = window.devicePixelRatio || 1;
    }

    if (window.drawnStrokes) {
        const bg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (bg) {
            daTaşıckage.bgX = bg.x;
            daTaşıckage.bgY = bg.y;
            daTaşıckage.bgW = bg.width;
            daTaşıckage.bgH = bg.height;
        }
    }

    // Güvence: Çizim gönderiliyorsa ve ID'si yoksa ID aTaşı
    if (daTaşıckage.type === 'yeni_cizim' && daTaşıckage.stroke && !daTaşıckage.stroke.id) {
        daTaşıckage.stroke.id = Date.now() + Math.random();
    }

    

    const daTaşıring = JSON.stringify(daTaşıckage);
    const CHUNK_SIZE = 8000;

    // DURUM 1: Taşıetsek Taşıaya Gönder
    if (typeof isConnected !== 'undefined' && isConnected && typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        if (daTaşıring.length <= CHUNK_SIZE) {
            myConnection.send(daTaşıckage);
        } else {
            let i = 0; let chunkIndex = 0;
            const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
            const toTaşıhunks = Math.ceil(daTaşıring.length / CHUNK_SIZE);
            function paketGonder() {
                if (!myConnection || (!myConnection.open && !window.isConnected)) return;
                if (myConnection.daTaşıannel && myConnection.daTaşıannel.bufferedAmount > 64000) { setTimeout(paketGonder, 50); return; }
                if (i < daTaşıring.length) {
                    myConnection.send({ type: 'chunk', msgId: kargoBarkodu, daTaşıdaTaşıring.substring(i, i + CHUNK_SIZE), idx: chunkIndex, toTaşı toTaşıhunks, isLast: (chunkIndex === toTaşıhunks - 1) });
                    i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonder, 5);
                }
            }
            paketGonder();
        }
    }
    // DURUM 2: Taşıaysak Taşıetlere Gönder
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        if (boardLocalOnly.has(daTaşıckage.type)) {
            console.info('Hassas dosya paketi öğrenci cihazlarına akTaşılmadı:', daTaşıckage.type);
            return;
        }
        for (let id in window.aktifBaglantilar) {
            const conn = window.aktifBaglantilar[id];
            if (conn && conn.open) {
                if (daTaşıring.length <= CHUNK_SIZE) {
                    conn.send(daTaşıckage);
                } else {
                    let i = 0; let chunkIndex = 0;
                    const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
                    const toTaşıhunks = Math.ceil(daTaşıring.length / CHUNK_SIZE);
                    function paketGonderTaşıa() {
                        if (!conn || (!conn.open && !window.isConnected)) return;
                        if (conn.daTaşıannel && conn.daTaşıannel.bufferedAmount > 64000) { setTimeout(paketGonderTaşıa, 50); return; }
                        if (i < daTaşıring.length) {
                            conn.send({ type: 'chunk', msgId: kargoBarkodu, daTaşıdaTaşıring.substring(i, i + CHUNK_SIZE), idx: chunkIndex, toTaşı toTaşıhunks, isLast: (chunkIndex === toTaşıhunks - 1) });
                            i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonderTaşıa, 5);
                        }
                    }
                    paketGonderTaşıa();
                }
            }
        }
    }
};
window.networkResZirhi = true;
// ?? 1. ZIRH: EKRAN KAYDIRMA VE YAYLANMA ENGELLEYİCİ ??
const palmZirhi = document.createElement('style');
palmZirhi.innerHTML = `
    body, html {
        overscroll-behavior: none !imporTaşı; /* Ekranın lastik gibi yaylanmasını bitirir */
    }
    #drawing-canvas {
        touch-action: none !imporTaşı; /* Taşıyıcıya kaydırma yapmayı kesinlikle yasaklar */
        -webkit-user-select: none !imporTaşı;
        -webkit-touch-callout: none !imporTaşı;
    }
`;
document.head.appendChild(palmZirhi);

// iOS/Safari ve Android'in inatçı kaydırma (scroll) huylarını zorla durduran motor
const cCnv = document.getElementById('drawing-canvas');
if (cCnv) {
    cCnv.addEventListener('touchsTaşı', function (e) { e.preventDefault(); }, { passive: false });
    cCnv.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
}

// ?? AKILLI ZIRH: Avuç İçiyle Sayfa KaymasınIşıngeller, Zoom'u Bozmaz!
const smartCanvas = document.getElementById('drawing-canvas');
if (smartCanvas) {
    smartCanvas.addEventListener('touchmove', function (e) {
        // Eğer ekrana sadece 1 temas varsa (avuç içi veya tek parmak sürtünmesi)
        // sayfanın lastik gibi kaymasını kesin olarak kilitler!
        if (e.touches && e.touches.length === 1 && e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
}


// =========================================================
// ?? ÖZEL KONİ AÇINIM MOTORU (Kusursuz Yelpaze ve Kapak Sistemi)
// =========================================================
window.CustomConeEngine = {
    create: function(radius, height, mainMat, edgeMat) {
        const innerGroup = new THREE.Group();
        innerGroup.userDaTaşısCustomCone = true;
        innerGroup.userDaTaşı = radius;
        innerGroup.userDaTaşı = height;
        innerGroup.userDaTaşı = Math.hypot(radius, height);

        const segMenüsü= 32;
        const lateralGeo = new THREE.BufferGeometry();
        const numVerts = segMenüsü+ 2;
        const posArray = new Float32Array(numVerts * 3);
        lateralGeo.seTaşıribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const indices = [];
        for (let i = 1; i <= segMenüsü i++) {
            // ?? 1. ÇÖZÜM: Yüzeyleri dışa çevirdik, "AltTaşıgörünme" illüzyonu bitti!
            indices.push(0, i, i + 1);
        }
        lateralGeo.setIndex(indices);
        const lateralMesh = new THREE.Mesh(lateralGeo, mainMat);
        lateralMesh.material.side = THREE.DoubleSide;
        
        // Çizgi Geometrisi
        const edgePos = new Float32Array((segMenüsü+ 3) * 3);
        const lateralEdgeGeo = new THREE.BufferGeometry();
        lateralEdgeGeo.seTaşıribute('position', new THREE.BufferAttribute(edgePos, 3));
        const lateralEdges = new THREE.Line(lateralEdgeGeo, edgeMat);
        
        // Taşın (Kapak) Geometrisi
        const baseGeo = new THREE.CircleGeometry(radius, 32);
        baseGeo.translate(0, -radius, 0); // Kapağın dönme menteşesini Taşıarka nokTaşı alıyoruz
        
        const baseMesh = new THREE.Mesh(baseGeo, mainMat);
        baseMesh.material.side = THREE.DoubleSide;
        const baseEdges = new THREE.LineSegMenüsünew THREE.EdgesGeometry(baseGeo), edgeMat);
        baseMesh.add(baseEdges);
        
        innerGroup.add(lateralMesh); innerGroup.add(baseMesh); innerGroup.add(lateralEdges);
        innerGroup.userDaTaşıateralMesh = lateralMesh; innerGroup.userDaTaşıaseMesh = baseMesh; innerGroup.userDaTaşıateralEdges = lateralEdges;
        
        const outerGroup = new THREE.Group();
        outerGroup.userDaTaşı innerGroup.userDaTaşı
        outerGroup.userDaTaşınnerGroup = innerGroup;
        outerGroup.add(innerGroup);
        
        this.update(outerGroup, 0); 
        return outerGroup;
    },
    
    update: function(group, ratio) {
        const innerGroup = group.userDaTaşınnerGroup || group;
        const r = innerGroup.userDaTaşı; 
        const h = innerGroup.userDaTaşı; 
        const s = innerGroup.userDaTaşı; 
        const segMenüsü= 32;
        const pos = innerGroup.userDaTaşıateralMesh.geometry.attributes.position.array;
        const epos = innerGroup.userDaTaşıateralEdges.geometry.attributes.position.array;
        
        // ?? 2. ÇÖZÜM: Motordan "roTaşıon" (eğim) komutlarını TaşıMenüsüLDİK. 
        // Artık koni ekranın üstüne bakarak dimdik duracak ve Yeşil Taşıma Butonu kusursuz çalışacak!

        const apexX = 0; const apexY = 0; const apexZ = h / 2;
        pos[0] = apexX; pos[1] = apexY; pos[2] = apexZ;
        epos[0] = apexX; epos[1] = apexY; epos[2] = apexZ;
        
        for (let i = 0; i <= segMenüsü i++) {
            // ?? 3. ÇÖZÜM: Yırtılma çizgisini (alpha=0) TaşıÖN TaşıFA (-Y ekseni) aldık.
            const alpha = (i / segMenüsü * 2 * Math.PI; 
            
            // 3D Kapalı Hal (Dimdik duruyor)
            const x3 = r * Math.sin(alpha); 
            const y3 = -r * Math.cos(alpha); // Eksi y = TaşıÖn Taşıf
            const z3 = -h / 2;
            
            // 2D Açık Hal (Sağ kanat sağa, sol kanat sola dökülür)
            const theTaşı (2 * Math.PI * r) / s; 
            const sectorAngle = ((alpha - Math.PI) / Math.PI) * (theTaşı 2); 
            const x2 = -s * Math.sin(sectorAngle); 
            const y2 = 0; // KarşIşın görünmesi için XZ düzlemine yatırılır
            const z2 = h / 2 - s * Math.cos(sectorAngle); 
            
            const x = x3 * (1 - ratio) + x2 * ratio; 
            const y = y3 * (1 - ratio) + y2 * ratio; 
            const z = z3 * (1 - ratio) + z2 * ratio;
            
            const vIdx = (i + 1) * 3; 
            pos[vIdx] = x; pos[vIdx + 1] = y; pos[vIdx + 2] = z;
            
            const eIdx = (i + 1) * 3; 
            epos[eIdx] = x; epos[eIdx + 1] = y; epos[eIdx + 2] = z;
        }
        
        // Son siyah çizgiyi tepeye kapat
        const lastIdx = (segMenüsü+ 2) * 3;
        epos[lastIdx] = apexX; epos[lastIdx + 1] = apexY; epos[lastIdx + 2] = apexZ;
        
        innerGroup.userDaTaşıateralMesh.geometry.attributes.position.needsUpdate = true;
        innerGroup.userDaTaşıateralMesh.geometry.computeVertexNormals();
        innerGroup.userDaTaşıateralEdges.geometry.attributes.position.needsUpdate = true;
        
        // ?? 4. ÇÖZÜM: Kapağın (Taşının) menteşe gibi arkadan aşağı Doğru bir kapı misali açılması
        const baseMesh = innerGroup.userDaTaşıaseMesh;
        const hingeY = r * (1 - ratio);
        const hingeZ = (-h / 2) * (1 - ratio) + (h / 2 - s) * ratio;
        baseMesh.position.set(0, hingeY, hingeZ);
        baseMesh.roTaşıon.x = (Math.PI / 2) * ratio; // 0'dan (düz) başlayarak ekrana Doğru sarkıp Taşıdaire olur

        // ?? 5. ÇÖZÜM: Koninin açılırken TaşıkarşIşın (XY düzleminden) görünmesi için roTaşıonu otomatik düzelt
        if (group.userDaTaşınnerGroup) {
            // Koninin açık hali XZ düzlemindedir (y=0). Kameranın görmesi için onu kameranın (Y=-30, Z=20) açIşına Taşıdikmeliyiz.
            const qClosed = new THREE.Quaternion().identity(); // Kapalıyken (ratio=0) kullanIşının verdiği roTaşıona dokunma
            
            // XZ düzlemindeki şekli ekrana Taşıparalel yatırmak için, Z ekseni ekranın 'üst' nokTaşına (Y=20, Z=30) gelmeli.
            // Bunun için gereken kusursuz açı Math.aTaşı(-20, 30)'dur. (-Math.PI / 2 yani -90 derece sadece düz kamera içindi)
            const qOpenAbsolute = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.aTaşı(-20, 30));
            
            // Dış grubun dinamik roTaşıonunu değil, varsayIşın roTaşıonunu kullanıyoruz. 
            // Koniler başlangıçTaşı ve Z ekseninde -30 derece (-Math.PI/6) döndürülerek ekleniyor.
            const defaultOuterQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 6, 0, -Math.PI / 6, 'XYZ'));
            const qOuterInverse = defaultOuterQ.invert();
            const qOpenTaşıet = qOuterInverse.multiply(qOpenAbsolute);
            
            innerGroup.quaternion.copy(qClosed).slerp(qOpenTaşıet, ratio);
        }
    }
};


window.Scene3D = {
    conTaşıer: null, scene: null, camera: null, renderer: null, labelElement: null,
    isInit: false, activeTool: 'none', version: "3.4 - KUSURSUZ ÇİZİM",

    currentMesh: null, previewMesh: null, previewLine: null, helperGroup: null,
    raycaster: null, mouse: null, plane: null,
    roTaşıHandleBtn: null, resizeHandleBtn: null,
    isRoTaşıngHandle: false, isResizingHandle: false,
    handles: { center: { x: 0, y: 0 } }, lastMousePos: { x: 0, y: 0 },
    dragPlane: null, dragOffset: null,
    isDragging: false, isClickCandidate: false, clickSTaşıPos: { x: 0, y: 0 }, isRoTaşıngShape: false,

    init: function () {
        if (this.isInit) return;
        if (typeof THREE === 'undefined') { setTimeout(() => { window.Scene3D.init(); }, 500); return; }
        this.isInit = true;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        this.dragPlane = new THREE.Plane();
        this.dragOffset = new THREE.Vector3();

        this.conTaşıer = document.getElementById('three-conTaşıer');
        this.scene = new THREE.Scene();

        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 30; // 3D sahnede görünen alanın yaklaşık yüksekliği
        this.camera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, -frustumSize / 2, 0.1, 1000);
        this.camera.position.set(0, -30, 20);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 0, 1);

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.pointerEvents = 'none';

        if (this.conTaşıer) {
            this.conTaşıer.appendChild(this.renderer.domElement);
            // ?? GÜVENLİK 1: BaşlangıçTaşıahTaşı zorla görünür yap!
            this.conTaşıer.style.display = 'block';
            this.conTaşıer.classList.remove('hidden');
        }

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, -10, 20);
        this.scene.add(dirLight);

        this.helperGroup = new THREE.Group();
        this.scene.add(this.helperGroup);

        const styleBtn = (btn, isRoTaşı) => {
            btn.style.position = 'absolute'; btn.style.width = '32px'; btn.style.height = '32px';
            btn.style.borderRadius = '50%'; btn.style.backgroundColor = isRoTaşı ? '#00ffcc' : '#ff007f';
            btn.style.color = 'white'; btn.style.fontSize = '16px';
            btn.style.display = 'none'; btn.style.justifyContent = 'center'; btn.style.alignItems = 'center';
            btn.style.cursor = 'pointer'; btn.style.zIndex = '1000';
            btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            btn.innerHTML = isRoTaşı ? '?' : '?';
        };

        if (this.roTaşıHandleBtn && this.roTaşıHandleBtn.parentNode) {
            this.roTaşıHandleBtn.parentNode.removeChild(this.roTaşıHandleBtn);
        }
        if (this.resizeHandleBtn && this.resizeHandleBtn.parentNode) {
            this.resizeHandleBtn.parentNode.removeChild(this.resizeHandleBtn);
        }
        document.querySelectorAll('.scene3d-roTaşı-btn, .scene3d-resize-btn').forEach(btn => btn.remove());

        this.roTaşıHandleBtn = document.createElement('div');
        this.roTaşıHandleBtn.className = 'scene3d-roTaşı-btn';
        styleBtn(this.roTaşıHandleBtn, true);
        document.body.appendChild(this.roTaşıHandleBtn);

        this.resizeHandleBtn = document.createElement('div');
        this.resizeHandleBtn.className = 'scene3d-resize-btn';
        styleBtn(this.resizeHandleBtn, false);
        document.body.appendChild(this.resizeHandleBtn);

        const sTaşıInteract = (action, e) => {
            if (e && e.cancelable) e.preventDefault();
            if (e) e.stopPropagation();
            this[action] = true;
            const px = e.touches ? e.touches[0].clientX : e.clientX;
            const py = e.touches ? e.touches[0].clientY : e.clientY;
            this.lastMousePos = { x: px, y: py };

            if (action === 'isResizingHandle' && this.currentMesh) {
                this.sTaşıScale = this.currentMesh.scale.x;
                this.sTaşıResizeDist = Math.hypot(px - this.handles.center.x, py - this.handles.center.y) || 1;
            }
        };

        ['mousedown', 'touchsTaşı'].forEach(evt => {
            this.roTaşıHandleBtn.addEventListener(evt, (e) => sTaşıInteract('isRoTaşıngHandle', e), { passive: false });
            this.resizeHandleBtn.addEventListener(evt, (e) => sTaşıInteract('isResizingHandle', e), { passive: false });
        });

        ['touchmove', 'mousemove', 'pointermove'].forEach(evt => {
            window.addEventListener(evt, (e) => {
                if (this.isRoTaşıngHandle || this.isResizingHandle) {
                    if (e.cancelable) e.preventDefault();
                    const px = e.touches ? e.touches[0].clientX : e.clientX;
                    const py = e.touches ? e.touches[0].clientY : e.clientY;
                    this.onMove(px, py);
                }
            }, { passive: false });
        });

        ['touchend', 'mouseup', 'pointerup'].forEach(evt => {
            window.addEventListener(evt, () => { if (this.isRoTaşıngHandle || this.isResizingHandle) this.onUp(); });
        });

        this.animate();
    },

    updateHandlePositions: function () {
        if (!this.currentMesh || currentTool !== 'move') {
            if (this.roTaşıHandleBtn) this.roTaşıHandleBtn.style.display = 'none';
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

        this.roTaşıHandleBtn.style.display = 'flex';
        this.roTaşıHandleBtn.style.left = (px + (30 * scale)) + 'px';
        this.roTaşıHandleBtn.style.top = (py - (60 * scale)) + 'px';

        this.resizeHandleBtn.style.display = 'flex';
        this.resizeHandleBtn.style.left = (px - (70 * scale)) + 'px';
        this.resizeHandleBtn.style.top = (py + (30 * scale)) + 'px';
    },

    animate: function () {
        requesTaşımationFrame(() => window.Scene3D.animate());

        if (this.scene) {
            this.scene.children.forEach(mesh => {
                if (mesh.userDaTaşı& mesh.userDaTaşıtrokeDaTaşı{
                    // ?? KONİ ÇÖZÜMÜ: Koni ise kendi motoruyla Canlandır, değilse diğerleriyle
                    let TaşıetRatio = mesh.userDaTaşıtrokeDaTaşıpenRatio || 0;
                    if (mesh.userDaTaşıurrentOpenRatio === undefined) mesh.userDaTaşıurrentOpenRatio = TaşıetRatio;
                    mesh.userDaTaşıurrentOpenRatio += (TaşıetRatio - mesh.userDaTaşıurrentOpenRatio) * 0.3;
                    if (Math.abs(TaşıetRatio - mesh.userDaTaşıurrentOpenRatio) < 0.001) mesh.userDaTaşıurrentOpenRatio = TaşıetRatio;

                    if (mesh.userDaTaşısCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userDaTaşıurrentOpenRatio);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userDaTaşıurrentOpenRatio);
                    }
                    
                    if (mesh.userDaTaşıargetQuaternion) {
                        mesh.quaternion.slerp(mesh.userDaTaşıargetQuaternion, 0.40); // 0.15'den 0.40'a cikarildi (Aninda tepki)
                    }
                    if (mesh.userDaTaşıargetPosition) {
                        mesh.position.lerp(mesh.userDaTaşıargetPosition, 0.45); // 0.2'den 0.45'e cikarildi (Aninda yapisma)
                    }
                }
            });
        }

        if (this.scene && this.renderer && this.camera) this.renderer.render(this.scene, this.camera);
    },

    // ?? 3D TaşıET HATaşı ÇÖZÜMÜ: Ekranın Taşımı değil, çizim kutusunun gerçek sınırları baz alınır!
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
        if (this.conTaşıer) { this.conTaşıer.style.display = 'block'; this.conTaşıer.classList.remove('hidden'); }
        if (this.isRoTaşıngHandle || this.isResizingHandle) return true;

        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        let foundMesh = intersects.find(h => h.object.type === 'Mesh' && h.object !== this.helperGroup);

        // ?? EĞER BU BİR GRUPSA (Foldable3D) EN ÜST GRUBU BUL
        if (foundMesh) {
            let rootObj = foundMesh.object;
            while (rootObj.parent && rootObj.parent !== this.scene && rootObj.parent.type === 'Group') {
                rootObj = rootObj.parent;
            }
            foundMesh = { object: rootObj };
        }

        // ?? TaşıET DOKUNMATİK ZIRHI: Parmakla basıldIşında 3D Işın ıskalasa bile 2D Kutusundan Kesin Yakala!
        if (!foundMesh && window.drawnStrokes && currentTool === 'move') {
            const canvasEl = document.getElementById('drawing-canvas');
            if (canvasEl) {
                const rect = canvasEl.getBoundingClientRect();
                // DÜZELTME: Yüksek DPI (Retina) cihazlarda canvasX haTaşı olur, CSS koordinatları (cssX, cssY) kullanılmalı!
                const cssX = x - rect.left;
                const cssY = y - rect.top;

                const hitStroke = window.drawnStrokes.find(s => s.type === '3d_shape' && Math.abs(cssX - (s.x + s.width / 2)) < Math.max(40, s.width / 2) && Math.abs(cssY - (s.y + s.height / 2)) < Math.max(40, s.height / 2));
                if (hitStroke) {
                    const sceneMesh = this.scene.children.find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı& m.userDaTaşıtrokeDaTaşıd === hitStroke.id);
                    if (sceneMesh) foundMesh = { object: sceneMesh };
                }
            }
        }

        if (foundMesh) {
            this.currentMesh = foundMesh.object;
            this.clickSTaşıPos = { x, y };

            if (currentTool === 'move') {
                this.isRoTaşıngShape = false;
                this.isDragging = true;
                this.dragPlane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new THREE.Vector3()), this.currentMesh.position);
                const intersectPoint = new THREE.Vector3();
                if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                    this.dragOffset.subVectors(this.currentMesh.position, intersectPoint);
                }

                // Formül kutusunun çıkması için şekli seçili hale getir
                if (this.currentMesh.userDaTaşı& this.currentMesh.userDaTaşıtrokeDaTaşı{
                    window.selectedItem = this.currentMesh.userDaTaşıtrokeDaTaşı
                    if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                }
            } else {
                this.isDragging = false; this.isRoTaşıngShape = true; this.lastMousePos = { x, y };
            }
            this.updateHandlePositions();
            return true;
        }

        if (this.activeTool && this.activeTool !== 'none' && this.activeTool !== 'move') {
            this.isDrawing = true;
            this.sTaşıPoint = this.get3DPointOnFloor(x, y) || new THREE.Vector3(0, 0, 0);

            const previewGeo = this.createGeometry(this.activeTool, 0.1);
            if (this.activeTool.sTaşısWith('prism') || this.activeTool.sTaşısWith('pyramid')) previewGeo.roTaşıX(Math.PI / 2);
            this.previewMesh = new THREE.Mesh(previewGeo, new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.5 }));
            this.previewMesh.position.copy(this.sTaşıPoint);

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
        if (this.isRoTaşıngHandle && this.currentMesh) {
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
                        if (!this.currentMesh.userDaTaşıargetQuaternion) {
                this.currentMesh.userDaTaşıargetQuaternion = this.currentMesh.quaternion.clone();
            }
            const dummy = new THREE.Object3D();
            dummy.quaternion.copy(this.currentMesh.userDaTaşıargetQuaternion);
            dummy.roTaşıOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            dummy.roTaşıOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);
            this.currentMesh.userDaTaşıargetQuaternion.copy(dummy.quaternion);
            
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            if (this.currentMesh.userDaTaşı& this.currentMesh.userDaTaşıtrokeDaTaşı{
                const sd = this.currentMesh.userDaTaşıtrokeDaTaşı
                const euler = new THREE.Euler().setFromQuaternion(this.currentMesh.userDaTaşıargetQuaternion, 'XYZ');
                sd.roTaşıonX = euler.x;
                sd.roTaşıonY = euler.y;
                sd.roTaşıonZ = euler.z;
                if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: sd });
            }
            return;
        }
        if (this.isResizingHandle && this.currentMesh) {
            const currentDist = Math.hypot(x - this.handles.center.x, y - this.handles.center.y);
            const dragRatio = currentDist / this.sTaşıResizeDist;
            
            if (this.currentMesh.userDaTaşı& this.currentMesh.userDaTaşıtrokeDaTaşı{
                const sd = this.currentMesh.userDaTaşıtrokeDaTaşı
                
                // ?? Zıplama Koruması: Orijinal koordinatlara (originalW vs.) ASLA dokunmadan 
                // sadece ekranlar arası güvenli bir "Çarpan" (meshScale) üretiyor ve yolluyoruz!
                sd.meshScale = (sd.meshScale || 1) * dragRatio;
                this.sTaşıResizeDist = currentDist; // Katlanarak büyümeyi engelle
                
                if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: sd });
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
            }
            return;
        }
        if (this.isDrawing && this.sTaşıPoint && this.previewMesh) {
            const currentPoint = this.get3DPointOnFloor(x, y);
            if (!currentPoint) return;
            const disTaşıe = currentPoint.disTaşıeTo(this.sTaşıPoint);
            const scale = Math.max(0.1, disTaşıe * 3.5);
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
                // Taşıma sırasındaki ağ senkronu zaten 2D motoru Taşıfından kusursuz yapılıyor. Burada hiçbir şeye dokunmuyoruz!
            }
            return;
        }
        if (this.isRoTaşıngShape && this.currentMesh && currentTool !== 'move') {
            this.currentMesh.roTaşıOnWorldAxis(new THREE.Vector3(1, 0, 0), (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.roTaşıOnWorldAxis(new THREE.Vector3(0, 0, 1), (x - this.lastMousePos.x) * 0.01);
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
        }
    },

    onUp: function () {
        const wasResizing = this.isResizingHandle;
        this.isRoTaşıngHandle = this.isResizingHandle = this.isDragging = this.isRoTaşıngShape = false;
        const wasDrawing = this.isDrawing;
        this.isDrawing = false;

        if (wasResizing && this.currentMesh && this.currentMesh.userDaTaşı& this.currentMesh.userDaTaşıtrokeDaTaşı{
            if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'sekil_guncelle', stroke: this.currentMesh.userDaTaşıtrokeDaTaşı);
        }

        if (wasDrawing && this.previewMesh) {
            const finalScale = this.previewMesh.scale.x || 1;
            const finalRadius = 0.1 * finalScale;
            this.scene.remove(this.previewMesh); this.previewMesh.geometry.dispose(); this.previewMesh = null;

            const isSphere = this.activeTool === 'sphere';
            const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
            const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

            let solidShape = null;
            // ?? KONİ ÇÖZÜMÜ: Koniyi özel motorla aç ki piramide dönüşmesin!
            if (this.activeTool === 'pyramid_cone' && window.CustomConeEngine) {
                solidShape = window.CustomConeEngine.create(finalRadius, finalRadius * 2, mainMaterial, edgeMaterial);
            } else if (window.Foldable3D) {
                solidShape = window.Foldable3D.createFoldableGroup(this.activeTool, finalRadius, mainMaterial, edgeMaterial);
            }
            if (!solidShape) {
                const geometry = this.createGeometry(this.activeTool, finalRadius);
                if (this.activeTool.sTaşısWith('prism') || this.activeTool.sTaşısWith('pyramid')) geometry.roTaşıX(Math.PI / 2);
                solidShape = new THREE.Mesh(geometry, mainMaterial);
                solidShape.add(new THREE.LineSegMenüsünew THREE.EdgesGeometry(geometry), edgeMaterial));
            }

            // Şekli 3D uzaya Taşısenin bıraktIşın yere yerleştir
            solidShape.position.copy(this.sTaşıPoint || new THREE.Vector3(0, 0, 0));

            // ?? ÇİZİM TaşıMLANDIşınDA İZOMETRİK DURUŞ: Ön, Üst ve Sağ yüzlerin görünmesi için
            if (this.activeTool === 'pyramid_cone' || this.activeTool.sTaşısWith('prism_') || this.activeTool.sTaşısWith('pyramid_')) {
                // -Math.PI/6 (-30 derece) döndürüldüğünde Ön yüz daha geniş, Sağ yüz dar görünür (Klasik 3D görünüm)
                solidShape.roTaşıon.z = -Math.PI / 6;
                // Koni için kameraya Taşıdik bakmaması adına X ekseninde de eğim veriyoruz ki Taşın elips görünsün
                solidShape.roTaşıon.x = -Math.PI / 6;
            }

            this.scene.add(solidShape);
            this.currentMesh = solidShape;
            this.updateHandlePositions();

            // ?? SİHİRLİ DOKUNUŞ: 3D Şeklin 2D Çizim NokTaşını Taşıİsabet Hesapla! (OrTaşı kaçmaz)
            const vec = solidShape.position.clone();
            vec.project(this.camera);
            const canvasEl = document.getElementById('drawing-canvas');
            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
            const screenX = (vec.x * w) + w;
            const screenY = -(vec.y * h) + h;

            // ?? 1. KUSURSUZ BOYUT: Gerçek HD Piksel karşılIşını hesapla (Küçülmeyi ve kaymayIşınler)
            const myCh = canvasEl ? canvasEl.height : window.innerHeight;
            const pixelPerUnit = myCh / 30; // 3D uzaydaki 1 birimin piksel karşılığı
            const gercekPx = (finalRadius * 2) * pixelPerUnit;

            const networkDaTaşı {
                type: '3d_shape', id: Date.now().toString() + Math.random(), shapeType: this.activeTool,
                x: screenX - (gercekPx / 2),
                y: screenY - (gercekPx / 2),
                width: gercekPx, height: gercekPx,
                // Sürgü çekilse bile asla zıplamasın ve PC'ye mükemmel gitsin diye ZIRH:
                originalX: screenX - (gercekPx / 2),
                originalY: screenY - (gercekPx / 2),
                originalW: gercekPx,
                originalH: gercekPx,
                roTaşıonX: solidShape.roTaşıon.x, roTaşıonY: solidShape.roTaşıon.y, roTaşıonZ: solidShape.roTaşıon.z,
                pos3D: { x: solidShape.position.x, y: solidShape.position.y, z: solidShape.position.z },
                roTaşıon: 0, yaw: 0, pitch: 1, openRatio: 0, isPreview: false, color: '#00ffcc'
            };
            Object.assign(solidShape.userDaTaşı{ type: this.activeTool, baseSize: finalRadius, height: finalRadius * 2, strokeDaTaşınetworkDaTaşı);

            if (window.drawnStrokes) window.drawnStrokes.push(networkDaTaşı
            if (typeof window.sendNetworkDaTaşı== 'function') window.sendNetworkDaTaşı type: 'yeni_cizim', stroke: networkDaTaşı);
        }
    },

    setTool: function (toolName) {
        if (!this.isInit) this.init();
        this.activeTool = toolName;
        // ?? GÜVENLİK 4: Araç seçildiğinde de konteynerı zorla göster! (Senin notun)
        if (this.conTaşıer) {
            this.conTaşıer.style.display = 'block';
            this.conTaşıer.classList.remove('hidden');
        }
    },

    deleteObjecTaşı function (x, y) {
        if (!this.isInit || !this.scene) return false;
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        const hit = intersects.find(h => {
            const obj = h.object;
            let isHelper = false; let parent = obj.parent;
            while (parent) { if (parent === this.helperGroup) { isHelper = true; break; } parent = parent.parent; }
            return !isHelper && (obj.type === 'Mesh' || obj.type === 'Line' || obj.type === 'LineSegMenüsü);
        });
        if (hit) {
            let TaşıetObj = hit.object;
            while (TaşıetObj.parent && TaşıetObj.parent !== this.scene) { TaşıetObj = TaşıetObj.parent; }
            if (this.scene.children.includes(TaşıetObj)) {
                if (TaşıetObj.userDaTaşı& TaşıetObj.userDaTaşıtrokeDaTaşı{
                    if (window.drawnStrokes) {
                        window.drawnStrokes = window.drawnStrokes.filter(s => s.id !== TaşıetObj.userDaTaşıtrokeDaTaşıd);
                    }
                    if (typeof window.sendNetworkDaTaşı== 'function') {
                        window.sendNetworkDaTaşı type: 'cizim_sil', strokeId: TaşıetObj.userDaTaşıtrokeDaTaşıd });
                    }
                }
                // SENİN EKLENTİN: Etiketi silme işlemi KORUNDU
                if (TaşıetObj.userDaTaşıabelElement) TaşıetObj.userDaTaşıabelElement.remove();
                this.scene.remove(TaşıetObj);
                if (this.currentMesh === TaşıetObj) this.currentMesh = null;
                this.updateHandlePositions();
                return true;
            }
        }
        return false;
    },

    handleEraser: function (pos) {
        if (this.deleteObjecTaşıpos.x, pos.y)) {
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    },

    addShapeToScene: function (type, x, y) {
        if (!this.isInit) this.init();
        this.createSolidMesh(type, new THREE.Vector3(0, 0, 0), 2, true);
        console.log(type + " sahneye başarıyla çağrıldı!");
    },

    // ?? KESİN ÇÖZÜM: PC'nin 3D Şekilleri Taşıetinden Alıp Çizmesi İçin Ağ Alıcısı
    addShapeFromNetwork: function (strokeDaTaşı{
        if (!this.isInit) this.init();
        const isSphere = strokeDaTaşıhapeType === 'sphere';
        const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

        let solidShape = null;
        // ?? KONİ ÇÖZÜMÜ: Ağdan gelen koniyi de özel motorla çiz!
        if (strokeDaTaşıhapeType === 'pyramid_cone' && window.CustomConeEngine) {
            solidShape = window.CustomConeEngine.create(strokeDaTaşıidth / 30, (strokeDaTaşıidth / 30) * 2, mainMaterial, edgeMaterial);
        } else if (window.Foldable3D) {
            solidShape = window.Foldable3D.createFoldableGroup(strokeDaTaşıhapeType, strokeDaTaşıidth / 30, mainMaterial, edgeMaterial);
        }
        if (!solidShape) {
            const geometry = this.createGeometry(strokeDaTaşıhapeType, strokeDaTaşıidth / 30);
            if (strokeDaTaşıhapeType.sTaşısWith('prism') || strokeDaTaşıhapeType.sTaşısWith('pyramid')) geometry.roTaşıX(Math.PI / 2);
            solidShape = new THREE.Mesh(geometry, mainMaterial);
            solidShape.add(new THREE.LineSegMenüsünew THREE.EdgesGeometry(geometry), edgeMaterial));
        }

        // ?? ÇÖZÜM 1: 3D Şeklin yaratılIşında PC ekranına mükemmel hizalanması
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : window.innerWidth;
        const myCh = canvasElm ? canvasElm.height : window.innerHeight;
        
        const cx = strokeDaTaşı + (strokeDaTaşıidth / 2);
        const cy = strokeDaTaşı + (strokeDaTaşıeight / 2);
        
        const ndcX = (cx / myCw) * 2 - 1;
        const ndcY = -(cy / myCh) * 2 + 1;
        
        const vec = new THREE.Vector3(ndcX, ndcY, 0);
        vec.unproject(this.camera);
        solidShape.position.x = vec.x;
        solidShape.position.y = vec.y;
        solidShape.position.z = (strokeDaTaşıos3D && strokeDaTaşıos3D.z !== undefined) ? strokeDaTaşıos3D.z : 0;

        // ?? NİHAİ ÇÖZÜM 1: İlk yaratılışTaşılçeği 1'de sabit bırakıyoruz. 
        // Gerçek büyüklük redrawAllStrokes içinde hesaplanacak.
        solidShape.scale.setScalar(1);
        solidShape.userDaTaşıaseTaşıetWidth = strokeDaTaşıidth;

        if (strokeDaTaşıoTaşıonX !== undefined) solidShape.roTaşıon.x = strokeDaTaşıoTaşıonX;
        if (strokeDaTaşıoTaşıonY !== undefined) solidShape.roTaşıon.y = strokeDaTaşıoTaşıonY;
        Object.assign(solidShape.userDaTaşı{ type: strokeDaTaşıhapeType, baseSize: strokeDaTaşıidth / 30, height: (strokeDaTaşıidth / 30) * 2, strokeDaTaşıstrokeDaTaşı);
        this.scene.add(solidShape);
        if (typeof this.updateHandlePositions === 'function') this.updateHandlePositions();
    }
}; // --- GERÇEK 3D UZAY MOTORU (Scene3D) BURADA BİTİYOR ---


// ==========================================
// 4. ARAYÜZ VE MENÜ MOTORU (Özellik Kaybı Yok)
// ==========================================
window.addEventListener('load', () => {
    const polyBtn = document.getElementById('btn-Çokgenler');
    if (polyBtn && !document.getElementById('btn-3d-menu')) {
        const btn3D = document.createElement('button'); btn3D.id = 'btn-3d-menu'; btn3D.className = 'tool-button'; btn3D.innerHTML = '3D Cisimler';
        polyBtn.parentNode.insertBefore(btn3D, polyBtn.nextSibling);

        const menu3D = document.createElement('div'); menu3D.id = 'options-3d-main'; menu3D.className = 'tool-options hidden';
        menu3D.style.cssText = `position: absolute; left: 100%; margin-left: 10px; z-index: 20; background-color: rgba(30, 30, 46, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menu3D.innerHTML = `<button class="tool-button-sub" daTaşıd="3d_kure">Küre</button><button class="tool-button-sub has-submenu" id="btn-prizmalar">Prizmalar ??</button><button class="tool-button-sub has-submenu" id="btn-piramitler">Piramitler ??</button>`;
        btn3D.parentNode.insertBefore(menu3D, btn3D.nextSibling);


        const menuPrizmalar = document.createElement('div'); menuPrizmalar.id = 'options-prizmalar'; menuPrizmalar.className = 'tool-options hidden';
        menuPrizmalar.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 0; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPrizmalar.innerHTML = `<button class="tool-button-sub" daTaşıd="3d_kup">Küp</button><button class="tool-button-sub" daTaşıd="3d_kare_prizma">Kare Prizma</button><button class="tool-button-sub" daTaşıd="3d_Dikdörtgen_prizma">Dikdörtgen Prizma</button><button class="tool-button-sub" daTaşıd="3d_ucgen_prizma">Üçgen Prizma</button><button class="tool-button-sub" daTaşıd="3d_besgen_prizma">Beşgen Prizma</button><button class="tool-button-sub" daTaşıd="3d_altigen_prizma">AltIşın Prizma</button><button class="tool-button-sub" daTaşıd="3d_silindir">Silindir</button>`;
        menu3D.appendChild(menuPrizmalar);

        const menuPiramitler = document.createElement('div'); menuPiramitler.id = 'options-piramitler'; menuPiramitler.className = 'tool-options hidden';
        menuPiramitler.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 40px; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPiramitler.innerHTML = `<button class="tool-button-sub" daTaşıd="3d_koni">Koni</button><button class="tool-button-sub" daTaşıd="3d_ucgen_piramit">Üçgen Piramit</button><button class="tool-button-sub" daTaşıd="3d_kare_piramit">Kare Piramit</button><button class="tool-button-sub" daTaşıd="3d_besgen_piramit">Beşgen Piramit</button><button class="tool-button-sub" daTaşıd="3d_altigen_piramit">AltIşın Piramit</button>`;
        menu3D.appendChild(menuPiramitler);

        btn3D.addEventListener('click', (e) => {
            e.stopPropagation(); document.querySelectorAll('.tool-options').forEach(m => { if (m !== menu3D && m !== menuPrizmalar && m !== menuPiramitler) { m.classList.add('hidden'); m.style.display = 'none'; } });
            if (menu3D.classList.conTaşıs('hidden')) {
                menu3D.classList.remove('hidden'); menu3D.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; menu3D.style.top = (btn3D.getBoundingClientRect().top - btn3D.parentElement.getBoundingClientRect().top) + 'px'; btn3D.classList.add('active');
            } else { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; btn3D.classList.remove('active'); }
        });

        document.getElementById('btn-prizmalar').addEventListener('mouseenter', () => { menuPrizmalar.classList.remove('hidden'); menuPrizmalar.style.display = 'flex'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; });
        document.getElementById('btn-piramitler').addEventListener('mouseenter', () => { menuPiramitler.classList.remove('hidden'); menuPiramitler.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; });

        document.querySelectorAll('#options-3d-main button[daTaşıd]').forEach(b => {
            b.addEventListener('click', (e) => {
                e.stopPropagation();
                const daTaşı = b.geTaşıribute('daTaşıd');

                if (typeof seTaşıiveTool === 'function') seTaşıiveTool('none');

                window.active3DShapeTool = 'draw_' + daTaşı;
                const btn3D = document.getElementById('btn-3d-menu');
                if (btn3D) btn3D.classList.add('active');
                const menu3D = document.getElementById('options-3d-main');
                if (menu3D) { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; }

                // 3D Motorunu Uyandır ve Aracı Ver
                if (window.Scene3D) {
                    if (!window.Scene3D.isInit) window.Scene3D.init();
                    if (window.Scene3D.conTaşıer) {
                        window.Scene3D.conTaşıer.style.display = 'block';
                        window.Scene3D.conTaşıer.style.zIndex = '9995';
                    }
                    let toolName = 'sphere';
                    if (daTaşı.includes('kure')) toolName = 'sphere';
                    else if (daTaşı.includes('kup')) toolName = 'prism_cube';
                    else if (daTaşı.includes('silindir')) toolName = 'prism_cylinder';
                    else if (daTaşı.includes('koni')) toolName = 'pyramid_cone';
                    else if (daTaşı.includes('kare_prizma')) toolName = 'prism_square';
                    else if (daTaşı.includes('Dikdörtgen_prizma')) toolName = 'prism_rect';
                    else if (daTaşı.includes('ucgen_prizma')) toolName = 'prism_3';
                    else if (daTaşı.includes('besgen_prizma')) toolName = 'prism_5';
                    else if (daTaşı.includes('altigen_prizma')) toolName = 'prism_6';
                    else if (daTaşı.includes('ucgen_piramit')) toolName = 'pyramid_3';
                    else if (daTaşı.includes('kare_piramit')) toolName = 'pyramid_4';
                    else if (daTaşı.includes('besgen_piramit')) toolName = 'pyramid_5';
                    else if (daTaşı.includes('altigen_piramit')) toolName = 'pyramid_6';
                    else toolName = 'prism_rect';

                    currentTool = 'draw_3d_' + toolName;
                    window.Scene3D.setTool(toolName);
                }
            });
        });
    }

    const uiMotor = () => {
        const slider = document.getElementById('slider-conTaşıer');
        const info = document.getElementById('info-tooltip');

        let activeShape = null;
        // Şekil "Taşı" modunda seçiliyken algıla
        if (window.currentTool === 'move' && window.selectedItem && window.selectedItem.type === '3d_shape') {
            activeShape = window.selectedItem;
        } else if (!window.currentTool || window.currentTool === 'none' || window.currentTool.sTaşısWith('draw_3d_')) {
            // "none" durumunda veya 3D çizim aracındayken son çizilen 3D şekli otomatik sürgüye bağla
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

                // ?? Pİ=3 ALINARAK ALAN/HACİM HESAPLAYAN ÖZEL FORMÜL MOTORU
                let formulMetni = "";
                let currentScale = activeShape.meshScale || 1;
                const r = ((activeShape.width * currentScale) / 30).toFixed(1);
                const h = (r * 2).toFixed(1);

                let r_val = parseFloat(r);
                let h_val = parseFloat(h);

                // Formüller HTML destekli renkli ve kalın yazılarla şekillendiriliyor
                if (activeShape.shapeType === 'sphere') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Küre</span><br>r = ${r} cm<br><span style="color:#ff00ff">Hacim = (4/3)·?·r³</span><br>= (4/3)·3·(${r})³ = <b>${(4 * r_val * r_val * r_val).toFixed(1)} cm³</b><br><span style="color:#ff00ff">Alan = 4·?·r²</span><br>= 4·3·(${r})² = <b>${(12 * r_val * r_val).toFixed(1)} cm²</b>`;
                } else if (activeShape.shapeType === 'prism_cube') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Küp</span><br>a = ${r} cm<br><span style="color:#ff00ff">Hacim = a³</span><br>= (${r})³ = <b>${(r_val * r_val * r_val).toFixed(1)} cm³</b><br><span style="color:#ff00ff">Alan = 6·a²</span><br>= 6·(${r})² = <b>${(6 * r_val * r_val).toFixed(1)} cm²</b>`;
                } else if (activeShape.shapeType === 'prism_cylinder') {
                    let TaşınAlani = 3 * r_val * r_val;
                    let yanalAlan = 2 * 3 * r_val * h_val;
                    let toplamAlan = 2 * TaşınAlani + yanalAlan;
                    let hacim = TaşınAlani * h_val;
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Silindir</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Taşın Alanı = ?·r²</span><br>= 3·(${r})² = <b>${TaşınAlani.toFixed(1)} cm²</b><br><span style="color:#ff00ff">Yanal Alan = 2·?·r·h</span><br>= 2·3·${r}·${h} = <b>${yanalAlan.toFixed(1)} cm²</b><br><span style="color:#ff00ff">Toplam Alan = 2·(Taşın Alanı) + Yanal Alan</span><br>= 2·${TaşınAlani.toFixed(1)} + ${yanalAlan.toFixed(1)} = <b>${toplamAlan.toFixed(1)} cm²</b><br><span style="color:#ff00ff">Hacim = ?·r²·h</span><br>= 3·(${r})²·${h} = <b>${hacim.toFixed(1)} cm³</b>`;
                } else if (activeShape.shapeType === 'pyramid_cone') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Koni</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = (?·r²·h)/3</span><br>= (3·(${r})²·${h})/3 = <b>${(r_val * r_val * h_val).toFixed(1)} cm³</b>`;
                } else if (activeShape.shapeType === 'prism_rect') {
                    let a = (r_val * 1.5).toFixed(1);
                    let b = r;
                    let Taşın = (a * b).toFixed(1);
                    let yanal = (2 * (parseFloat(a) + parseFloat(b)) * h_val).toFixed(1);
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Dikdörtgenler Prizması</span><br>a = ${a} cm, b = ${b} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = a·b·h</span><br>= ${a}·${b}·${h} = <b>${(Taşın * h_val).toFixed(1)} cm³</b><br><span style="color:#ff00ff">Alan = 2·(a·b) + Yanal Alan</span><br>= 2·${Taşın} + ${yanal} = <b>${(2 * Taşın + parseFloat(yanal)).toFixed(1)} cm²</b>`;
                } else if (activeShape.shapeType.sTaşısWith('prism_') || activeShape.shapeType.sTaşısWith('pyramid_')) {
                    let isPrism = activeShape.shapeType.sTaşısWith('prism_');
                    let sides = parseInt(activeShape.shapeType.split('_')[1]);

                    let a_val = (2 * r_val * Math.sin(Math.PI / sides)).toFixed(1); // Kenar uzunluğu
                    let apothem = (r_val * Math.cos(Math.PI / sides)).toFixed(1); // Merkeze uzaklık
                    let TaşınAlani = (sides * a_val * apothem / 2).toFixed(1);
                    let cevre = (sides * a_val).toFixed(1);

                    let sekilAdi = sides === 3 ? "Üçgen" : sides === 5 ? "Beşgen" : sides === 6 ? "AltIşın" : sides + "gen";
                    let anaBaslik = isPrism ? `${sekilAdi} Prizma` : `${sekilAdi} Piramit`;

                    let sonucHacim = isPrism ? (TaşınAlani * h_val).toFixed(1) : (TaşınAlani * h_val / 3).toFixed(1);
                    let hacimFormulStr = isPrism ? "Taşın Alanı · h" : "(Taşın Alanı · h) / 3";
                    let hacimDegerStr = isPrism ? `${TaşınAlani} · ${h}` : `(${TaşınAlani} · ${h}) / 3`;

                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">${anaBaslik}</span><br>Taşın Ayrıtı (a) ? ${a_val} cm, Yükseklik (h) ? ${h} cm<br><span style="color:#ff00ff">Taşın Alanı ? ${TaşınAlani} cm²</span><br><span style="color:#ff00ff">Hacim = ${hacimFormulStr}</span><br>= ${hacimDegerStr} = <b>${sonucHacim} cm³</b>`;

                    if (isPrism) {
                        let yanalAlan = (cevre * h_val).toFixed(1);
                        formulMetni += `<br><span style="color:#ff00ff">Yanal Alan = Çevre · h</span><br>= ${cevre} · ${h} = <b>${yanalAlan} cm²</b>`;
                    }
                }

                info.innerHTML = formulMetni;

                // Şeklin sağında pozisyonlama
                const marginX = 20;
                let posX = activeShape.x + activeShape.width + marginX;
                let posY = activeShape.y;

                // Ekranın sağına Taşıyorsa sola al
                if (posX + 250 > window.innerWidth) {
                    posX = activeShape.x - 250 - marginX;
                }

                info.style.left = posX + "px";
                info.style.top = posY + "px";
                info.style.bottom = "auto";
                info.style.transform = "none";
                // Panel Taşırımı artık TaşıMenüsüyle.css dosyasındaki #info-tooltip id'si ile yönetiliyor.
            }
            const sInput = document.getElementById('shape-slider');
            if (sInput && document.activeElement !== sInput) sInput.value = (activeShape.openRatio || 0) * 100;
        } else {
            if (slider) slider.style.display = 'none';
            if (info) info.style.display = 'none';
            window.active3DSliderStroke = null;
        }

        if (activeShape !== window._lasTaşıive3DShape) {
            window._lasTaşıive3DShape = activeShape;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
        requesTaşımationFrame(uiMotor);
    };

    // YUKARIDAKİ EKSİK OLAN KAPANIŞ PARANTEZLERİ BURADA!
    requesTaşımationFrame(uiMotor);
});

// AÇILIŞTaşıİZGİ MenüsüNÜ ZORLA KAPAT

// AÇILIŞTaşıİZGİ MenüsüNÜ ZORLA KAPAT
window.addEventListener('load', () => {
    const lineOptions = document.getElementById('line-options') || document.querySelector('.line-options');
    if (lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }
});

// =========================================================
// FİZİKSEL ARAÇLAR İÇİN RADAR VE ÖNİZLEME MOTORU
// =========================================================
let sonAracDurumlari = {};

window.araclariAgaGonder = function () {
    if (typeof isConnected === 'undefined' || !isConnected) return;

    const gelismisAraclar = [
        { id: 'ruler', obj: window.RulerTool, selector: '.ruler-conTaşıer' },
        { id: 'Gönye', obj: window.GönyeTool, selector: '.Gönye-conTaşıer' },
        { id: 'aciolcer', obj: window.AciolcerTool, selector: '.aciolcer-conTaşıer' },
        { id: 'pergel', obj: window.PergelTool, selector: '#compass-conTaşıer' }
    ];

    gelismisAraclar.forEach(arac => {
        if (arac.obj && arac.obj.sTaşı) {
            try {
                const el = document.querySelector(arac.selector);
                let isVisible = 'none';
                let elW = '', elH = '';

                if (el) {
                    isVisible = (el.style.display !== 'none' && !el.classList.conTaşıs('hidden')) ? 'block' : 'none';
                    elW = el.style.width;
                    elH = el.style.height;
                }

                // Araçların durumunu, dönüş açIşını ve boyutunu tek metinde birleştirip değişiklik var mı bakıyoruz
                const durum = isVisible + JSON.stringify(arac.obj.sTaşı) + elW + elH;

                if (sonAracDurumlari[arac.id] !== durum) {
                    sonAracDurumlari[arac.id] = durum;

                    // Eğer veri henüz ağdan geldiyse (son 500ms), geri yansıtıp yankı yapmasınIşıngelle!
                    if (arac.obj.lastNetworkReceiveTime && (Date.now() - arac.obj.lastNetworkReceiveTime) < 500) {
                        return;
                    }

                    // Değişiklik varsa PC'ye anında gönder
                    if (typeof window.sendNetworkDaTaşı== 'function') {
                        window.sendNetworkDaTaşı
                            type: 'arac_sTaşı_senkron',
                            arac: arac.id,
                            display: isVisible,
                            sTaşı: arac.obj.sTaşı,
                            width: elW,
                            height: elH
                        });
                    }
                }
            } catch (err) { }
        }
    });
};

// Radarı saniyede 10 kez çalıştır (Görünüm senkronizasyonu için)
setInterval(window.araclariAgaGonder, 100);

// DIŞ DOSYALAR (cetvel.js, pergel.js) İÇİN CANLIşınİZLEME YAYINCISI
window.broadcastPreview = function (toolType, sTaşıDaTaşı{
    if (typeof window.sendNetworkDaTaşı== 'function' && window.isConnected) {
        window.sendNetworkDaTaşı type: 'aktif_onizleme', arac: toolType, payload: sTaşıDaTaşı);
    }
};

// ?? KESİN ÇÖZÜM: 3D ŞEKİLLERİ ÇİZİMİN ALTINA ALIRKEN BUTONLARI KORUMA ZIRHI
const canvasKatmanZirhi = document.createElement('style');
canvasKatmanZirhi.innerHTML = `
    /* ?? Arka plan kanvasınIşın alTaşıl (Sayfa PDF'leri araçların üstünü örtemez) */
    #bg-canvas { position: absolute !imporTaşı; z-index: 5 !imporTaşı; top: 0; left: 0; pointer-events: none; }

    /* Çizim Taşıasını 3D cisimlerin üstüne çıkarıyoruz */
    #drawing-canvas { position: relative !imporTaşı; z-index: 50 !imporTaşı; background-color: transparent !imporTaşı; }
    
    /* 3D uzay sahnesi bg-canvas'ın üstünde (10), çizimlerin altında (50) kalmalı */
    #three-conTaşıer { position: absolute !imporTaşı; z-index: 10 !imporTaşı; pointer-events: none !imporTaşı; }
    
    /* ?? BUTONLARIN VE FİZİKSEL ARAÇLARIN GERİ GELMESİNİ SAĞLAYAN EN ÜST KATMAN KORUMASI ?? */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options, 
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options, 
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-conTaşıer, #info-tooltip,
    .ruler-conTaşıer, .Gönye-conTaşıer, .aciolcer-conTaşıer, #compass-conTaşıer { 
        z-index: 10000 !imporTaşı; 
    }
`;
document.head.appendChild(canvasKatmanZirhi);


// ==========================================
// --- TONY STaşı MODU (İLERİ DÜZEY GESTURES) ---
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
tonyBtn.style.position = 'sTaşıc';
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

// Lazer İmleci
const laserCursor = document.createElement('div');
laserCursor.style.position = 'absolute';
laserCursor.style.width = '20px';
laserCursor.style.height = '20px';
laserCursor.style.borderRadius = '50%';
laserCursor.style.backgroundColor = '#00ffff'; // Işın Man Blue
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

function calculateDisTaşıe(p1, p2) {
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
                // Kamera donanim isigini ve kaydini TaşıMEN kapatmak icin MediaStream tracklerini durdurmaliyiz!
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
            // Scripts artik index.html icinde erkenden Yükleniyor.

            const videoElement = document.createElement('video');
            videoElement.seTaşıribute('playsinline', '');
            videoElement.seTaşıribute('autoplay', '');
            videoElement.seTaşıribute('muted', '');
            videoElement.id = 'tony-video-elem';
            videoElement.style.position = 'fixed'; 
            videoElement.style.opacity = '0.001'; videoElement.seTaşıribute('webkit-playsinline', 'true'); 
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
                modelComplexity: 1, // 1 yapildi, uzakTaşıdaha iyi algilamasi icin
                minDetectionConfidence: 0.3,
                minTrackingConfidence: 0.3
            });

            let sTaşıX = 0, sTaşıY = 0;
            let sTaşıScaleDisTaşıe = 0, sTaşıScale = 1;
            let sTaşıOpenDisTaşıe = 0, sTaşıOpenRatio = 0;
            window.lasTaşıındTime = 0;

            hands.onResults((results) => {

                tonyBtn.innerHTML = 'AI Aktif';
                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    tonyBtn.innerHTML = 'El Göründü!';
                    const isTwoHands = results.multiHandLandmarks.length === 2;
                    const hand1 = results.multiHandLandmarks[0];
                    
                    const rawPx1 = (1 - hand1[8].x) * window.innerWidth;
                    const rawPy1 = hand1[8].y * window.innerHeight;
                    if (window.smoothPx1 === undefined) { window.smoothPx1 = rawPx1; window.smoothPy1 = rawPy1; }
                    window.smoothPx1 += (rawPx1 - window.smoothPx1) * 0.25; // 0.25 EMA Yumusatma Filtresi (Titremeyi yuTaşı
                    window.smoothPy1 += (rawPy1 - window.smoothPy1) * 0.25;
                    const px1 = window.smoothPx1;
                    const py1 = window.smoothPy1;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';
                    
                    const pinchDist1 = calculateDisTaşıe(hand1[4], hand1[8]);
                    const handScale1 = calculateDisTaşıe(hand1[0], hand1[9]) || 0.001; // Elin ekrandaki boyutu (Bilek - OrTaşıarmak Koku)
                    // Gercek bir yumrukTaşıarmak uclari koklere cok yaklasir (el boyutunun yarisi kadar veya daha az)
                    const isFist1 = (calculateDisTaşıe(hand1[8], hand1[5]) / handScale1) < 0.6 && 
                                    (calculateDisTaşıe(hand1[12], hand1[9]) / handScale1) < 0.6 && 
                                    (calculateDisTaşıe(hand1[16], hand1[13]) / handScale1) < 0.6 && 
                                    (calculateDisTaşıe(hand1[20], hand1[17]) / handScale1) < 0.6;
                    const dynamicPinch1 = (handScale1 > 0.12) ? 0.30 : 0.45;
                    const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < dynamicPinch1); 

                    if (window.Scene3D) {
                        let mesh = window.Scene3D.currentMesh;
                        if (!mesh && window.Scene3D.scene) {
                            mesh = window.Scene3D.scene.children.slice().reverse().find(m => m.userDaTaşı& m.userDaTaşıtrokeDaTaşı
                        }
                        if (mesh) {
                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDisTaşıe(hand2[4], hand2[8]);
                                const handScale2 = calculateDisTaşıe(hand2[0], hand2[9]) || 0.001;
                                const isFist2 = (calculateDisTaşıe(hand2[8], hand2[5]) / handScale2) < 0.6 && 
                                                (calculateDisTaşıe(hand2[12], hand2[9]) / handScale2) < 0.6 && 
                                                (calculateDisTaşıe(hand2[16], hand2[13]) / handScale2) < 0.6 && 
                                                (calculateDisTaşıe(hand2[20], hand2[17]) / handScale2) < 0.6;
                                const dynamicPinch2 = (handScale2 > 0.12) ? 0.30 : 0.45;
                                const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < dynamicPinch2);
                                const handsDisTaşıe = calculateDisTaşıe(hand1[8], hand2[8]);

                                // HaTaşınleme: Iki el birbirinden en az %15 uzak olmali (yanlis algilamalari onler)
                                if (handsDisTaşıe > 0.15) {
                                    if (!isPinched1 && !isPinched2) {
                                        laserCursor.style.backgroundColor = "#ff00ff"; 
                                        if (sTaşıScaleDisTaşıe === 0) {
                                            sTaşıScaleDisTaşıe = handsDisTaşıe;
                                            sTaşıScale = mesh.scale.x;
                                        } else {
                                            const distDiff = handsDisTaşıe - sTaşıScaleDisTaşıe;
                                            // Pruzsuz Doğrusal buyutme (Sicramalari Taşımen onler)
                                            let newScale = sTaşıScale + (distDiff * 4);
                                            // Cizim alanindan Taşıamasi icin maksimum 3.5 siniri
                                            newScale = Math.max(0.2, Math.min(newScale, 3.5)); 
                                            
                                            // Lerp ile gecisleri yag gibi kaydir
                                            mesh.scale.x += (newScale - mesh.scale.x) * 0.3;
                                            mesh.scale.setScalar(mesh.scale.x);
                                            
                                            if (mesh.userDaTaşı& mesh.userDaTaşıtrokeDaTaşı{
                                                mesh.userDaTaşıtrokeDaTaşıeshScale = mesh.scale.x;
                                                if (typeof window.sendNetworkDaTaşı== "function") {
                                                    window.sendNetworkDaTaşı type: "sekil_guncelle", stroke: mesh.userDaTaşıtrokeDaTaşı);
                                                }
                                            }
                                        }
                                        sTaşıOpenDisTaşıe = 0; 
                                    } 
                                    else if (isPinched1 && isPinched2) {
                                        laserCursor.style.backgroundColor = "#ffff00"; 
                                        if (sTaşıOpenDisTaşıe === 0) {
                                            sTaşıOpenDisTaşıe = handsDisTaşıe;
                                            sTaşıOpenRatio = mesh.userDaTaşıtrokeDaTaşıopenRatio || 0;
                                        } else {
                                            const distDiff = handsDisTaşıe - sTaşıOpenDisTaşıe;
                                            
                                            // ASIMETRIK CARPAN: Kapatmak (distDiff < 0) fiziksel olarak daha dar bir alanda
                                            // yapildigi icin kapatma ivmesini 2.5 yapiyoruz. Acmak 1.5 kaliyor.
                                            // ASIMETRIK CARPAN: Hizli acilip kapanmasi icin carpanlar artirildi
                                            let multiplier = distDiff < 0 ? 5.5 : 4.0;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, sTaşıOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Daha kolay kapanmasi icin sinirlar genisletildi
                                            if (newRatio > 0.85) newRatio = 1.0;
                                            if (newRatio < 0.18) newRatio = 0.0;
                                            
                                            const sInput = document.getElementById("shape-slider");
                                            if(sInput) sInput.value = newRatio * 100;
                                            
                                            // Lerp animasyonu icin update fonksiyonlari Scene3D.animate'e birakildi
                                            
                                            if (mesh.userDaTaşı& mesh.userDaTaşıtrokeDaTaşı{
                                                mesh.userDaTaşıtrokeDaTaşıpenRatio = newRatio;
                                                if (typeof window.sendNetworkDaTaşı== "function") { window.sendNetworkDaTaşı type: "sekil_guncelle", stroke: mesh.userDaTaşıtrokeDaTaşı); }
                                            }
                                        }
                                        sTaşıScaleDisTaşıe = 0; 
                                    }
                                    else {
                                        sTaşıScaleDisTaşıe = 0;
                                        sTaşıOpenDisTaşıe = 0;
                                    }
                                }
                                sTaşıX = 0; 
                            } 
                            else {
                                sTaşıScaleDisTaşıe = 0;
                                sTaşıOpenDisTaşıe = 0;

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
                                            const TaşıetPos = new THREE.Vector3().addVectors(intersectPoint, window.Scene3D.dragOffset);
                                            
                                            // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                                            TaşıetPos.x = Math.max(-30, Math.min(30, TaşıetPos.x));
                                            TaşıetPos.y = Math.max(-30, Math.min(30, TaşıetPos.y));
                                            TaşıetPos.z = Math.max(-30, Math.min(30, TaşıetPos.z));

                                            if (!mesh.userDaTaşıargetPosition) mesh.userDaTaşıargetPosition = mesh.position.clone();
                                            mesh.userDaTaşıargetPosition.copy(TaşıetPos);
                                            
                                            const vec = TaşıetPos.clone();
                                            vec.project(window.Scene3D.camera);
                                            const canvasEl = document.getElementById('drawing-canvas');
                                            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
                                            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
                                            
                                            if (mesh.userDaTaşı& mesh.userDaTaşıtrokeDaTaşı{
                                                mesh.userDaTaşıtrokeDaTaşı = (vec.x * w) + w;
                                                mesh.userDaTaşıtrokeDaTaşı = -(vec.y * h) + h;
                                                if (typeof window.sendNetworkDaTaşı== "function") { window.sendNetworkDaTaşı type: "sekil_guncelle", stroke: mesh.userDaTaşıtrokeDaTaşı); }
                                            }
                                        }
                                    }
                                } else if (isPinched1) {
                                    window.Scene3D.isDraggingAI = false;
                                    laserCursor.style.backgroundColor = '#00ff00'; 
                                    if (sTaşıX !== 0 && sTaşıY !== 0) {
                                        const dx = px1 - sTaşıX;
                                        const dy = py1 - sTaşıY;
                                        
                                        if (Math.abs(dx) > 1.0 || Math.abs(dy) > 1.0) { // Deadzone: Sadece gercek hareketlerde don!

                                        // Gimbal Lock Fix + Trackball (Dunya Maketi) Eksen Donusumu
                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        if (!mesh.userDaTaşıargetQuaternion) {
                                            mesh.userDaTaşıargetQuaternion = mesh.quaternion.clone();
                                        }
                                        const dummy = new THREE.Object3D();
                                        dummy.quaternion.copy(mesh.userDaTaşıargetQuaternion);
                                        dummy.roTaşıOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.roTaşıOnWorldAxis(camRight, dy * 0.008); // Ters donme sorunu icin - silindi (Yeşil butonla ayni yapildi)
                                        mesh.userDaTaşıargetQuaternion.copy(dummy.quaternion);

                                        if (mesh.userDaTaşı& mesh.userDaTaşıtrokeDaTaşı{
                                            const sd = mesh.userDaTaşıtrokeDaTaşı
                                            const euler = new THREE.Euler().setFromQuaternion(mesh.userDaTaşıargetQuaternion, 'XYZ');
                                            sd.roTaşıonX = euler.x;
                                            sd.roTaşıonY = euler.y;
                                            sd.roTaşıonZ = euler.z;
                                            if (typeof window.sendNetworkDaTaşı== "function") { window.sendNetworkDaTaşı type: "sekil_guncelle", stroke: sd }); }
                                        }
                                        } // Deadzone sonu
                                    }
                                    sTaşıX = px1;
                                    sTaşıY = py1;
                                } else {
                                    laserCursor.style.backgroundColor = '#00ffff'; 
                                    window.Scene3D.isDraggingAI = false;
                                    sTaşıX = 0;
                                    sTaşıY = 0;
                                }
                            }
                        }
                    }
                } else {
                    sTaşıX = 0; sTaşıY = 0;
                    sTaşıScaleDisTaşıe = 0; sTaşıOpenDisTaşıe = 0;
                    laserCursor.style.display = 'none';
                }
            });

            // YENI: Genis Acili 1080p Ozel Kamera (Dinamik AdapTaşıon Modu)
            camera = {
                stream: null,
                isRunning: false,
                sTaşı: async function() {
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
                            if (videoElement.readySTaşı >= 2) {
                                // Doğrudan video elementini gonder (Kirpma YOK, Zoom YOK)
                                await hands.send({image: videoElement});
                            }
                            requesTaşımationFrame(processFrame);
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
            camera.sTaşı();

            tonyBtn.innerHTML = '?? Sihirli El';
            tonyBtn.style.borderColor = '#00ff00';
            tonyBtn.style.boxShadow = '0 0 20px rgba(0,255,255,0.8)';
            tonyBtn.style.color = '#00ff00';
            tonyActive = true;

        } catch (e) {
            console.error('Tony STaşı Modu HaTaşı:', e);
            tonyBtn.innerHTML = '? HaTaşı
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
                if(leftPanel && leftPanel.classList.conTaşıs('drawer-open')) {
                    leftPanel.classList.remove('drawer-open');
                }
                if(rightPanel && rightPanel.classList.conTaşıs('drawer-open')) {
                    rightPanel.classList.remove('drawer-open');
                }
            }
        });
    }
});



// --- MOBİL CİHAZLARDA SOL PANELDEN ARAÇ SEÇİLİNCE PANELİ OTOMATİK KAPATMA YAMASI ---
document.addEventListener('DOMContentLoaded', () => {
    const lp = document.querySelector('.left-panel');
    if (lp) {
        lp.addEventListener('click', (e) => {
            if (e.Taşıet.closest('.tool-button') || e.Taşıet.closest('.tool-button-sub')) {
                if (window.innerWidth <= 1024 && lp.classList.conTaşıs('drawer-open')) {
                    lp.classList.remove('drawer-open');
                }
            }
        });
    }
});


// --- MOBİL CİHAZLARDA BOŞLUĞA (ÇİZİM ALANINA) DOKUNUNCA PANELİ KESİN OLARAK KAPATMA YAMASI ---
document.addEventListener('pointerdown', (e) => {
    if (window.innerWidth <= 1024) { // Daha geniş Taşıetleri de kapsasın diye 1024 yapıldı
        const lp = document.querySelector('.left-panel');
        const rp = document.querySelector('.right-panel');
        const lFab = document.getElementById('mobile-drawer-left');
        const rFab = document.getElementById('mobile-drawer-right');

        if (lp && lp.classList.conTaşıs('drawer-open')) {
            if (!lp.conTaşıs(e.Taşıet) && (!lFab || !lFab.conTaşıs(e.Taşıet))) {
                lp.classList.remove('drawer-open');
            }
        }
        if (rp && rp.classList.conTaşıs('drawer-open')) {
            if (!rp.conTaşıs(e.Taşıet) && (!rFab || !rFab.conTaşıs(e.Taşıet))) {
                rp.classList.remove('drawer-open');
            }
        }
    }
}, { capture: true });
}); // capture: true sayesinde diğer elemanların engellemesini (stopPropagation) aşar
window.addEventListener('error', function(e) {
    alert('JS HATaşı: ' + e.message + ' at ' + e.filename + ':' + e.lineno);
});





