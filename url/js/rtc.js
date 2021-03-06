function autoRoom(name) { connection.openOrJoin(name, (isRoomExist, roomid, error) => (error ? notify(error,3) : null)); }
function leaveRoom() { 
    connection.streamEvents.selectAll().forEach(k => k.stream.stop());
    connection.getAllParticipants().forEach(pid => connection.disconnectWith(pid));
    connection.closeSocket();    
}
function RTC() {
    var connection = new RTCMultiConnection(); connection.socketURL = '/';
    connection.socketURL = 'https://rtc.uios.me:443/';
    connection.socketMessageEvent = 'video-conference-demo';
    connection.session = { audio: true, video: true };
    connection.sdpConstraints.mandatory = { OfferToReceiveAudio: true, OfferToReceiveVideo: true };

    var bitrates = 512;
    var resolutions = 'Ultra-HD';
    var videoConstraints = {};
    if (resolutions == 'HD') { videoConstraints = { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: 30 }; }
    if (resolutions == 'Ultra-HD') { videoConstraints = { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: 30 }; }
    connection.mediaConstraints = { video: videoConstraints, audio: false };
    var CodecsHandler = connection.CodecsHandler;
    connection.processSdp = function(sdp) {
        var codecs = 'vp8';    
        if (codecs.length) { sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase()); }
        if (resolutions == 'HD') {
            sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, { audio: 128, video: bitrates, screen: bitrates });
            sdp = CodecsHandler.setVideoBitrates(sdp, { min: bitrates * 8 * 1024, max: bitrates * 8 * 1024 });
        }
        if (resolutions == 'Ultra-HD') {
            sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, { audio: 128, video: bitrates, screen: bitrates });
            sdp = CodecsHandler.setVideoBitrates(sdp, { min: bitrates * 8 * 1024, max: bitrates * 8 * 1024 });
        }
        return sdp;
    };
    connection.iceServers = [{
        'urls': [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun.l.google.com:19302?transport=udp',
        ]
    }];
    connection.videosContainer = document.getElementById('webcam');
    connection.onstream = function(event) { console.log(connection,event);
        var existing = document.getElementById(event.streamid);
        if(existing && existing.parentNode) { existing.parentNode.removeChild(existing); }
        event.mediaElement.removeAttribute('src');
        event.mediaElement.removeAttribute('srcObject');
        event.mediaElement.muted = true;
        event.mediaElement.volume = 0;
        byId('webcam').dataset.box = connection.getAllParticipants().length + 1;
        if(event.type !== "local") {
            var video = document.createElement('video');
            video.id = event.userid;
            video.setAttribute('autoplay', true); video.setAttribute('playsinline', true);
            video.volume = 0; video.setAttribute('muted', true);
            video.srcObject = event.stream;
            connection.videosContainer.appendChild(video);
        }
        localStorage.setItem(connection.socketMessageEvent, connection.sessionid);
    };
    connection.onstreamended = function(event) {    console.log(event);
        if(event.type !== "local") { document.getElementById(event.userid).remove(); }
        byId('webcam').dataset.box = connection.getAllParticipants().length + 1;
        var mediaElement = document.getElementById(event.streamid);
        if (mediaElement) { mediaElement.parentNode.removeChild(mediaElement); }
    };
    connection.onMediaError = function(e) {
        if (e.message === 'Concurrent mic process limit.') {
            if (DetectRTC.audioInputDevices.length <= 1) {
                alert('Please select external microphone. Check github issue number 483.');
                return;
            }
            var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
            connection.mediaConstraints.audio = {
                deviceId: secondaryMic
            };
            connection.join(connection.sessionid);
        }
    };
}



