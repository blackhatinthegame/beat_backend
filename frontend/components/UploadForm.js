"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UploadForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = require("../lib/api");
const locale_context_1 = require("../lib/locale-context");
const UploadZone_1 = __importDefault(require("./UploadZone"));
const FormGroup_1 = __importDefault(require("./FormGroup"));
function UploadForm() {
    const [form, setForm] = (0, react_1.useState)({
        title: '',
        genre: '',
        key: '',
        bpm: 120,
        price: 29.99
    });
    const [audio, setAudio] = (0, react_1.useState)(null);
    const [cover, setCover] = (0, react_1.useState)(null);
    const [message, setMessage] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [isUploading, setIsUploading] = (0, react_1.useState)(false);
    const { t } = (0, locale_context_1.useLocale)();
    const submit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        if (!audio || !cover) {
            setError('Audio and cover are required');
            return;
        }
        setIsUploading(true);
        const data = new FormData();
        Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
        data.append('audio', audio);
        data.append('cover', cover);
        try {
            await api_1.BeatApi.create(data);
            setMessage('Uploaded successfully!');
            setForm({ title: '', genre: '', key: '', bpm: 120, price: 29.99 });
            setAudio(null);
            setCover(null);
        }
        catch (err) {
            setError(err?.response?.data?.message || 'Upload failed');
        }
        finally {
            setIsUploading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: submit, className: "space-y-7", children: [(0, jsx_runtime_1.jsx)(FormGroup_1.default, { label: t('upload.title'), children: (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-neutral-900/80 border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200", placeholder: t('placeholder.title'), value: form.title, onChange: e => setForm({ ...form, title: e.target.value }), required: true }) }), (0, jsx_runtime_1.jsx)(FormGroup_1.default, { label: t('upload.genre'), children: (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-neutral-900/80 border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200", placeholder: "e.g., Hip-Hop, Trap, R&B", value: form.genre, onChange: e => setForm({ ...form, genre: e.target.value }), required: true }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [(0, jsx_runtime_1.jsx)(FormGroup_1.default, { label: t('upload.key'), optional: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("svg", { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" }) }), (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-neutral-900/80 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200", placeholder: "e.g., C, Am, F#m", value: form.key, onChange: e => setForm({ ...form, key: e.target.value }) })] }) }), (0, jsx_runtime_1.jsx)(FormGroup_1.default, { label: t('upload.bpm'), children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("svg", { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }), (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-neutral-900/80 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200", type: "number", min: "40", max: "240", placeholder: "120", value: form.bpm, onChange: e => setForm({ ...form, bpm: Number(e.target.value) }), required: true })] }) })] }), (0, jsx_runtime_1.jsx)(FormGroup_1.default, { label: t('upload.price'), children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg font-medium", children: "$" }), (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-neutral-900/80 border border-neutral-700 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200", type: "number", step: "0.01", min: "0", placeholder: "29.99", value: form.price, onChange: e => setForm({ ...form, price: Number(e.target.value) }), required: true })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [(0, jsx_runtime_1.jsx)(UploadZone_1.default, { label: t('upload.audio'), accept: "audio/*", file: audio, onFileChange: setAudio, type: "audio", helperText: "MP3 or WAV required \u2022 Maximum 50MB" }), (0, jsx_runtime_1.jsx)(UploadZone_1.default, { label: t('upload.cover'), accept: "image/*", file: cover, onFileChange: setCover, type: "image", helperText: "JPG, PNG or WEBP \u2022 Maximum 10MB" })] }), message && ((0, jsx_runtime_1.jsx)("div", { className: "bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-4 text-emerald-400 text-sm backdrop-blur-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), message] }) })), error && ((0, jsx_runtime_1.jsx)("div", { className: "bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 text-rose-400 text-sm backdrop-blur-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }), error] }) })), (0, jsx_runtime_1.jsx)("button", { className: "w-full px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white text-base font-bold transition-all duration-300 hover:scale-[1.02] active:scale-100 shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100", type: "submit", disabled: isUploading, children: isUploading ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin h-5 w-5", fill: "none", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Uploading..."] })) : ('Upload Beat') })] }));
}
//# sourceMappingURL=UploadForm.js.map