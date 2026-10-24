/* Wochenkoch camera bridge: image remains on the user's device. */
(()=>{'use strict';
let stream=null;
const byId=id=>document.getElementById(id);
const status=message=>{const el=byId('cameraStatus');if(el)el.textContent=message};
async function stop(){if(stream){stream.getTracks().forEach(track=>track.stop());stream=null}const video=byId('cameraPreview');if(video)video.srcObject=null;const panel=byId('cameraPanel');if(panel)panel.hidden=true}
async function open(){const panel=byId('cameraPanel');if(!navigator.mediaDevices?.getUserMedia){status('Dieser Browser unterstützt keine direkte Kamera. Bitte unten „Kassenzettel-Foto“ verwenden.');panel.hidden=false;return}try{await stop();stream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});panel.hidden=false;const video=byId('cameraPreview');video.srcObject=stream;await video.play();status('Kassenzettel vollständig und gut beleuchtet ins Bild halten.')}catch(err){panel.hidden=false;status('Kamera konnte nicht geöffnet werden: '+err.message+' – alternativ Foto unten auswählen.')}}
async function capture(){const video=byId('cameraPreview');if(!stream||!video?.videoWidth){status('Bitte zuerst die Kamera öffnen.');return}const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d').drawImage(video,0,0);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',0.92));if(!blob){status('Foto konnte nicht erstellt werden.');return}const file=new File([blob],'kassenzettel.jpg',{type:'image/jpeg'});const input=byId('receiptFile');if(!input){status('Foto-Feld fehlt.');return}try{const transfer=new DataTransfer();transfer.items.add(file);input.files=transfer.files}catch{status('Foto konnte nicht an die Erkennung übergeben werden. Bitte das Foto-Feld verwenden.');return}await stop();const read=byId('receiptRead');if(read){read.click();}else{status('Texterkennung nicht geladen. Bitte receipt.js prüfen.')}}
byId('cameraOpen')?.addEventListener('click',open);
byId('cameraClose')?.addEventListener('click',stop);
byId('cameraCapture')?.addEventListener('click',capture);
window.addEventListener('pagehide',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
})();
