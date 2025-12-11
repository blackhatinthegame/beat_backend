"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlayerModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const media_1 = require("../lib/media");
function PlayerModal({ beat, isOpen, onClose }) {
    const audioRef = (0, react_1.useRef)(null);
    const seekbarRef = (0, react_1.useRef)(null);
    const isDraggingRef = (0, react_1.useRef)(false);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [volume, setVolume] = (0, react_1.useState)(1);
    const [isMuted, setIsMuted] = (0, react_1.useState)(false);
    const [playbackRate, setPlaybackRate] = (0, react_1.useState)(1);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        isDraggingRef.current = isDragging;
    }, [isDragging]);
    (0, react_1.useEffect)(() => {
        if (audioRef.current && beat) {
            const audio = audioRef.current;
            audio.src = (0, media_1.resolveMediaUrl)(beat.audioUrl);
            audio.volume = isMuted ? 0 : volume;
            audio.playbackRate = playbackRate;
            const updateTime = () => {
                if (!isDraggingRef.current) {
                    setCurrentTime(audio.currentTime);
                }
            };
            const updateDuration = () => setDuration(audio.duration);
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);
            audio.addEventListener("timeupdate", updateTime);
            audio.addEventListener("loadedmetadata", updateDuration);
            audio.addEventListener("play", handlePlay);
            audio.addEventListener("pause", handlePause);
            audio.play().catch(() => { });
            return () => {
                audio.removeEventListener("timeupdate", updateTime);
                audio.removeEventListener("loadedmetadata", updateDuration);
                audio.removeEventListener("play", handlePlay);
                audio.removeEventListener("pause", handlePause);
            };
        }
    }, [beat]);
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying)
                audioRef.current.pause();
            else
                audioRef.current.play();
        }
    };
    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0)
            setIsMuted(false);
    };
    const handleSeekbarClick = (e) => {
        if (!seekbarRef.current || !audioRef.current || duration === 0)
            return;
        const rect = seekbarRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const newTime = pos * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };
    const handleSeekbarMouseDown = (e) => {
        setIsDragging(true);
        handleSeekbarClick(e);
    };
    const handleSeekbarMouseMove = (e) => {
        if (isDragging && seekbarRef.current && audioRef.current && duration > 0) {
            const rect = seekbarRef.current.getBoundingClientRect();
            const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const newTime = pos * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };
    (0, react_1.useEffect)(() => {
        const handleMouseUp = () => setIsDragging(false);
        const handleMouseMove = (e) => {
            if (isDragging && seekbarRef.current && audioRef.current && duration > 0) {
                const rect = seekbarRef.current.getBoundingClientRect();
                const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const newTime = pos * duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
            }
        };
        if (isDragging) {
            document.addEventListener("mouseup", handleMouseUp);
            document.addEventListener("mousemove", handleMouseMove);
            return () => {
                document.removeEventListener("mouseup", handleMouseUp);
                document.removeEventListener("mousemove", handleMouseMove);
            };
        }
    }, [isDragging, duration]);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const speedOptions = [0.5, 1, 1.25, 1.5];
    if (!isOpen || !beat)
        return null;
    const coverSrc = (0, media_1.resolveMediaUrl)(beat.coverUrl);
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fadeIn", onClick: onClose, children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-neutral-900/70 border border-white/10 rounded-3xl p-8 w-full max-w-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative animate-scaleIn", onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("button", { onClick: onClose, className: "absolute top-4 right-4 text-neutral-400 hover:text-white transition p-2 rounded-lg hover:bg-white/10", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-6 items-center mb-8", children: [(0, jsx_runtime_1.jsx)("img", { src: coverSrc, alt: beat.title, className: "w-32 h-32 rounded-2xl object-cover shadow-xl border border-white/10" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold leading-tight text-white mb-1 truncate", children: beat.title }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-neutral-400 mb-3", children: [beat.genre, " \u2022 ", beat.bpm, " BPM ", beat.key && `• ${beat.key}`] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xl font-semibold text-emerald-400", children: ["$", beat.price] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("div", { ref: seekbarRef, className: "relative bg-neutral-800/70 rounded-full h-3 cursor-pointer group", onClick: handleSeekbarClick, onMouseDown: handleSeekbarMouseDown, onMouseMove: handleSeekbarMouseMove, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 shadow-[0_0_10px_rgba(255,0,120,0.6)] transition-all rounded-full relative", style: { width: `${progress}%` }, children: (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity border-2 border-purple-500", style: { opacity: isDragging ? 1 : undefined } }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-xs text-neutral-400 mt-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: formatTime(currentTime) }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: formatTime(duration) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-6 mb-6", children: [(0, jsx_runtime_1.jsx)("button", { onClick: togglePlay, className: "w-24 h-24 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 hover:scale-110 transition-all flex items-center justify-center shadow-[0_0_30px_rgba(255,0,120,0.5)] hover:shadow-[0_0_40px_rgba(255,0,120,0.7)]", children: isPlaying ? ((0, jsx_runtime_1.jsx)("svg", { className: "w-12 h-12 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" }) })) : ((0, jsx_runtime_1.jsx)("svg", { className: "w-12 h-12 text-white ml-1", fill: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M8 5v14l11-7z" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 w-full max-w-xs", children: [(0, jsx_runtime_1.jsx)("button", { onClick: toggleMute, className: "text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg", children: isMuted || volume === 0 ? ((0, jsx_runtime_1.jsxs)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" }), (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" })] })) : volume < 0.5 ? ((0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" }) })) : ((0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" }) })) }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: "0", max: "1", step: "0.01", value: isMuted ? 0 : volume, onChange: handleVolumeChange, className: "flex-1 h-2 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-purple-500", style: {
                                        background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${(isMuted ? 0 : volume) * 100}%, rgb(55, 65, 81) ${(isMuted ? 0 : volume) * 100}%, rgb(55, 65, 81) 100%)`
                                    } }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-neutral-400 w-8 text-right", children: [Math.round((isMuted ? 0 : volume) * 100), "%"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-neutral-400 mr-2", children: "Speed:" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: speedOptions.map((speed) => ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setPlaybackRate(speed), className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${playbackRate === speed
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                                    : "bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-700/50"}`, children: [speed, "x"] }, speed))) })] }), (0, jsx_runtime_1.jsx)("audio", { ref: audioRef, className: "hidden" })] }) }));
}
//# sourceMappingURL=PlayerModal.js.map