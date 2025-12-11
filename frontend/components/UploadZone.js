"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UploadZone;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function UploadZone({ label, accept, file, onFileChange, type, helperText }) {
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [preview, setPreview] = (0, react_1.useState)(null);
    const fileInputRef = (0, react_1.useRef)(null);
    const handleFileSelect = (selectedFile) => {
        onFileChange(selectedFile);
        if (selectedFile && type === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
        else {
            setPreview(null);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    const formatFileSize = (bytes) => {
        if (bytes < 1024)
            return bytes + ' B';
        if (bytes < 1024 * 1024)
            return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-[#c7c7c9] mb-3 tracking-wide", children: label }), (0, jsx_runtime_1.jsxs)("label", { className: "block", children: [(0, jsx_runtime_1.jsx)("div", { onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onClick: () => fileInputRef.current?.click(), className: `
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
            ${file
                            ? 'border-emerald-500/50 bg-emerald-500/5'
                            : isDragging
                                ? 'border-purple-500/50 bg-purple-500/5 scale-[1.02]'
                                : 'border-[#303036] bg-neutral-900/30 hover:border-neutral-600 hover:bg-neutral-900/50'}
          `, children: file ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [type === 'image' && preview ? ((0, jsx_runtime_1.jsx)("div", { className: "relative w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-emerald-500/30", children: (0, jsx_runtime_1.jsx)("img", { src: preview, alt: "Preview", className: "w-full h-full object-cover" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-8 h-8 text-emerald-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: type === 'audio' ? ((0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" })) : ((0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })) }) })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-emerald-400 font-medium text-sm truncate max-w-xs mx-auto", children: file.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-400 mt-1", children: formatFileSize(file.size) })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: `w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110 rotate-12' : ''}`, children: type === 'audio' ? ((0, jsx_runtime_1.jsx)("svg", { className: "w-10 h-10 text-neutral-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" }) })) : ((0, jsx_runtime_1.jsx)("svg", { className: "w-10 h-10 text-neutral-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) })) }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-neutral-400 mb-1", children: isDragging ? 'Drop file here' : 'Click to upload or drag and drop' }), helperText && ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-500 mt-2", children: helperText }))] })] })) }), (0, jsx_runtime_1.jsx)("input", { ref: fileInputRef, type: "file", accept: accept, className: "hidden", onChange: e => handleFileSelect(e.target.files?.[0] || null), required: true })] })] }));
}
//# sourceMappingURL=UploadZone.js.map