const { PeerServer } = require('peer');

console.log("========================================");
console.log("  GEOBEK AKILLI TAHTA YEREL SUNUCUSU    ");
console.log("========================================");
console.log("Bu pencere açık kaldığı sürece tahta,");
console.log("internetsiz olarak okul ağında (LAN) çalışır.");
console.log("Lütfen ders bitene kadar kapatmayın!\n");

const peerServer = PeerServer({ port: 9000, path: '/peerjs' });

peerServer.on('connection', (client) => {
    console.log("[ BAĞLANTI ] Yeni bir cihaz bağlandı:", client.getId());
});

peerServer.on('disconnect', (client) => {
    console.log("[ AYRILDI  ] Bir cihaz koptu:", client.getId());
});

console.log("Sunucu Başlatıldı: port 9000");
