/**
 * ==============================================================================
 * FINE FOLD MENUS - STICKY INSTAGRAM REEL VIDEO WIDGET
 * ==============================================================================
 * SINGLE PLACE CONTROL:
 * To change the video or poster across ALL pages of the website,
 * simply update the configuration values below:
 * ==============================================================================
 */
var STICKY_REEL_CONFIG = {
    // Relative path or URL to your video file
    videoSrc: 'video/insta_video.mp4',

    // Optional poster image (thumbnail before video loads). Leave '' if none.
    posterSrc: '',

    // Autoplay the small thumbnail muted in the corner
    autoplayThumbnail: true,

    // Loop continuously like an Instagram Reel
    loop: true
};

(function () {
    "use strict";

    // Prevent double initialization
    if (window.__STICKY_REEL_INITIALIZED__) return;
    window.__STICKY_REEL_INITIALIZED__ = true;

    // Inject Styles to ensure 100% consistency across all pages
    function injectStyles() {
        if (document.getElementById('sticky-reel-widget-styles')) return;
        var style = document.createElement('style');
        style.id = 'sticky-reel-widget-styles';
        style.textContent = `
            /* Floating Instagram Reel Sticky Widget */
            .sticky-video-widget {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 125px;
                aspect-ratio: 9 / 16;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15);
                z-index: 99999;
                cursor: pointer;
                background: #000;
                transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, box-shadow 0.3s ease;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }
            .sticky-video-widget:hover {
                transform: scale(1.05) translateY(-3px);
                box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5), 0 0 0 1.5px rgba(212, 175, 55, 0.7);
            }
            .sticky-video-widget.hidden {
                opacity: 0;
                pointer-events: none;
                transform: scale(0.7) translateY(20px);
            }
            .sticky-video-widget video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                pointer-events: none;
                background: #000;
            }
            .sticky-close-btn {
                position: absolute;
                top: 6px;
                right: 6px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.65);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.3);
                font-size: 16px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 3;
                padding: 0;
                transition: background 0.2s, transform 0.2s;
            }
            .sticky-close-btn:hover {
                background: rgba(0, 0, 0, 0.95);
                transform: scale(1.1);
            }

            /* Fullscreen Instagram Reel Popup Overlay */
            .video-popup-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 100000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                -webkit-tap-highlight-color: transparent;
            }
            .video-popup-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .video-popup-box {
                position: relative;
                width: 88vw;
                max-width: 360px;
                aspect-ratio: 9 / 16;
                max-height: 85vh;
                border-radius: 22px;
                overflow: hidden;
                background: #000;
                box-shadow: 0 25px 70px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.15);
                transform: scale(0.9) translateY(12px);
                opacity: 0;
                transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            .video-popup-overlay.active .video-popup-box {
                transform: scale(1) translateY(0);
                opacity: 1;
            }
            .video-popup-box video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                cursor: pointer;
                background: #000;
            }
            .popup-close-btn {
                position: absolute;
                top: 14px;
                right: 14px;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.65);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.3);
                font-size: 22px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
                padding: 0;
                transition: background 0.2s, transform 0.2s;
            }
            .popup-close-btn:hover {
                background: rgba(225, 48, 108, 0.9);
                transform: scale(1.1);
            }
            .popup-video-controls {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 12px 14px;
                background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 5;
            }
            .popup-play-toggle,
            .popup-mute-toggle {
                background: transparent;
                border: none;
                color: #fff;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.15s ease, opacity 0.2s;
            }
            .popup-play-toggle:hover,
            .popup-mute-toggle:hover {
                transform: scale(1.15);
            }
            .popup-progress-bar {
                flex: 1;
                height: 4px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 4px;
                overflow: hidden;
                cursor: pointer;
                position: relative;
            }
            .popup-progress-fill {
                height: 100%;
                width: 0%;
                background: #e1306c;
                border-radius: 4px;
                transition: width 0.1s linear;
            }
            .popup-flash-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.6);
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.65);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                pointer-events: none;
                opacity: 0;
                transition: transform 0.25s ease, opacity 0.25s ease;
                z-index: 6;
            }
            .popup-flash-icon.show {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }

            /* Responsive Adjustments */
            @media (max-width: 768px) {
                .sticky-video-widget {
                    width: 100px;
                    bottom: 16px;
                    right: 16px;
                    border-radius: 12px;
                }
            }
            @media (max-width: 480px) {
                .sticky-video-widget {
                    width: 90px;
                    bottom: 12px;
                    right: 12px;
                }
                .video-popup-box {
                    width: 90vw;
                    max-width: 320px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize Widget DOM & Events
    function initWidget() {
        injectStyles();

        // Remove any old/redundant instances if they exist
        var existingSticky = document.getElementById('stickyWidget');
        if (existingSticky) existingSticky.remove();

        var existingOverlay = document.getElementById('videoPopupOverlay');
        if (existingOverlay) existingOverlay.remove();

        var videoSrc = STICKY_REEL_CONFIG.videoSrc;
        var posterSrc = STICKY_REEL_CONFIG.posterSrc || '';

        // Build HTML
        var widgetHTML = document.createElement('div');
        widgetHTML.className = 'sticky-video-widget';
        widgetHTML.id = 'stickyWidget';
        widgetHTML.setAttribute('role', 'button');
        widgetHTML.setAttribute('aria-label', 'Open Instagram Reel');
        widgetHTML.innerHTML = `
            <button class="sticky-close-btn" id="stickyCloseBtn" aria-label="Close" title="Close">&times;</button>
            <video id="thumbnailVideo" src="${videoSrc}" ${posterSrc ? `poster="${posterSrc}"` : ''} autoplay muted loop playsinline preload="metadata"></video>
        `;

        var overlayHTML = document.createElement('div');
        overlayHTML.className = 'video-popup-overlay';
        overlayHTML.id = 'videoPopupOverlay';
        overlayHTML.setAttribute('role', 'dialog');
        overlayHTML.setAttribute('aria-modal', 'true');
        overlayHTML.setAttribute('aria-label', 'Instagram Reel Player');
        overlayHTML.innerHTML = `
            <div class="video-popup-box">
                <button class="popup-close-btn" id="popupCloseBtn" aria-label="Close" title="Close">&times;</button>
                <video id="popupVideo" src="${videoSrc}" ${posterSrc ? `poster="${posterSrc}"` : ''} playsinline preload="auto" loop></video>
                <div class="popup-flash-icon" id="popupFlashIcon">
                    <svg id="popupFlashPlay" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" style="display:none;"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
                    <svg id="popupFlashPause" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                </div>
                <div class="popup-video-controls" id="popupVideoControls">
                    <button class="popup-play-toggle" id="popupPlayToggle" aria-label="Play/Pause">
                        <svg class="icon-play" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
                        <svg class="icon-pause" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    </button>
                    <div class="popup-progress-bar" id="popupProgressBar">
                        <div class="popup-progress-fill" id="popupProgressFill"></div>
                    </div>
                    <button class="popup-mute-toggle" id="popupMuteToggle" aria-label="Mute/Unmute">
                        <svg class="icon-unmuted" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                        <svg class="icon-muted" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display:none;"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(widgetHTML);
        document.body.appendChild(overlayHTML);

        // Elements
        var stickyWidget = document.getElementById('stickyWidget');
        var stickyCloseBtn = document.getElementById('stickyCloseBtn');
        var thumbnailVideo = document.getElementById('thumbnailVideo');
        var popupOverlay = document.getElementById('videoPopupOverlay');
        var popupVideo = document.getElementById('popupVideo');
        var popupCloseBtn = document.getElementById('popupCloseBtn');
        var popupPlayToggle = document.getElementById('popupPlayToggle');
        var popupMuteToggle = document.getElementById('popupMuteToggle');
        var popupProgressBar = document.getElementById('popupProgressBar');
        var popupProgressFill = document.getElementById('popupProgressFill');
        var popupFlashIcon = document.getElementById('popupFlashIcon');
        var popupFlashPlay = document.getElementById('popupFlashPlay');
        var popupFlashPause = document.getElementById('popupFlashPause');

        var iconPlay = popupPlayToggle.querySelector('.icon-play');
        var iconPause = popupPlayToggle.querySelector('.icon-pause');
        var iconUnmuted = popupMuteToggle.querySelector('.icon-unmuted');
        var iconMuted = popupMuteToggle.querySelector('.icon-muted');

        // Autoplay muted thumbnail
        function playThumbnail() {
            if (!thumbnailVideo) return;
            thumbnailVideo.muted = true;
            var promise = thumbnailVideo.play();
            if (promise !== undefined) {
                promise.catch(function () {
                    // Retry once metadata loaded if initial autoplay was blocked
                    thumbnailVideo.addEventListener('loadedmetadata', function () {
                        thumbnailVideo.play().catch(function () {});
                    }, { once: true });
                });
            }
        }
        playThumbnail();

        // Update popup play/pause button state
        function updatePlayState(isPlaying) {
            if (isPlaying) {
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
            } else {
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
            }
        }

        // Update popup mute/unmute state
        function updateMuteState(isMuted) {
            if (isMuted) {
                iconUnmuted.style.display = 'none';
                iconMuted.style.display = 'block';
            } else {
                iconUnmuted.style.display = 'block';
                iconMuted.style.display = 'none';
            }
        }

        // Flash play/pause icon in center of popup like Instagram Reels
        var flashTimer = null;
        function flashIcon(type) {
            if (flashTimer) clearTimeout(flashTimer);
            if (type === 'play') {
                popupFlashPlay.style.display = 'block';
                popupFlashPause.style.display = 'none';
            } else {
                popupFlashPlay.style.display = 'none';
                popupFlashPause.style.display = 'block';
            }
            popupFlashIcon.classList.add('show');
            flashTimer = setTimeout(function () {
                popupFlashIcon.classList.remove('show');
            }, 500);
        }

        // Toggle play/pause on popup video
        function togglePlayPause() {
            if (popupVideo.paused) {
                popupVideo.play().then(function () {
                    updatePlayState(true);
                    flashIcon('play');
                }).catch(function () {});
            } else {
                popupVideo.pause();
                updatePlayState(false);
                flashIcon('pause');
            }
        }

        // Open popup
        stickyWidget.addEventListener('click', function () {
            popupOverlay.classList.add('active');
            try {
                popupVideo.currentTime = thumbnailVideo.currentTime || 0;
            } catch (e) {}

            popupVideo.muted = false;
            popupVideo.volume = 1;
            updateMuteState(false);

            var playPromise = popupVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(function () {
                    updatePlayState(true);
                }).catch(function () {
                    // Fallback to muted if browser blocks unmuted playback
                    popupVideo.muted = true;
                    updateMuteState(true);
                    popupVideo.play().then(function () {
                        updatePlayState(true);
                    }).catch(function () {});
                });
            }

            thumbnailVideo.pause();
        });

        // Close popup
        function closePopup() {
            popupOverlay.classList.remove('active');
            popupVideo.pause();
            try {
                thumbnailVideo.currentTime = popupVideo.currentTime || 0;
            } catch (e) {}
            playThumbnail();
        }

        popupCloseBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closePopup();
        });

        popupOverlay.addEventListener('click', function (e) {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });

        // Click on popup video toggles play/pause
        popupVideo.addEventListener('click', function (e) {
            e.stopPropagation();
            togglePlayPause();
        });

        popupPlayToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            togglePlayPause();
        });

        // Mute / Unmute toggle
        popupMuteToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            popupVideo.muted = !popupVideo.muted;
            updateMuteState(popupVideo.muted);
        });

        // Progress bar updates
        popupVideo.addEventListener('timeupdate', function () {
            if (popupVideo.duration) {
                var progress = (popupVideo.currentTime / popupVideo.duration) * 100;
                popupProgressFill.style.width = progress + '%';
            }
        });

        // Click progress bar to seek
        popupProgressBar.addEventListener('click', function (e) {
            e.stopPropagation();
            var rect = popupProgressBar.getBoundingClientRect();
            var clickX = e.clientX - rect.left;
            var width = rect.width;
            if (width > 0 && popupVideo.duration) {
                popupVideo.currentTime = (clickX / width) * popupVideo.duration;
            }
        });

        // Close sticky widget entirely
        stickyCloseBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            stickyWidget.classList.add('hidden');
            thumbnailVideo.pause();
        });

        // Keyboard navigation (Esc to close, Space to toggle play/pause)
        document.addEventListener('keydown', function (e) {
            if (!popupOverlay.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closePopup();
            } else if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                togglePlayPause();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();

