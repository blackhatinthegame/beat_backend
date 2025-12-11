"use client";

import { useState } from 'react';
import { BeatApi } from '../lib/api';
import { useLocale } from '../lib/locale-context';
import UploadZone from './UploadZone';
import FormGroup from './FormGroup';

export default function UploadForm() {
  const [form, setForm] = useState({
    title: '',
    genre: '',
    key: '',
    bpm: 120,
    price: 29.99
  });
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { t } = useLocale();

  const submit = async (e: React.FormEvent) => {
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
      await BeatApi.create(data);
      setMessage('Uploaded successfully!');
      setForm({ title: '', genre: '', key: '', bpm: 120, price: 29.99 });
      setAudio(null);
      setCover(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-7">
      {/* Title */}
      <FormGroup label={t('upload.title')}>
        <input
          className="w-full bg-neutral-900/80 border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
          placeholder={t('placeholder.title')}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
      </FormGroup>

      {/* Genre */}
      <FormGroup label={t('upload.genre')}>
        <input
          className="w-full bg-neutral-900/80 border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
          placeholder="e.g., Hip-Hop, Trap, R&B"
          value={form.genre}
          onChange={e => setForm({ ...form, genre: e.target.value })}
          required
        />
      </FormGroup>

      {/* Key & BPM Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormGroup label={t('upload.key')} optional>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <input
              className="w-full bg-neutral-900/80 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
              placeholder="e.g., C, Am, F#m"
              value={form.key}
              onChange={e => setForm({ ...form, key: e.target.value })}
            />
          </div>
        </FormGroup>

        <FormGroup label={t('upload.bpm')}>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <input
              className="w-full bg-neutral-900/80 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
              type="number"
              min="40"
              max="240"
              placeholder="120"
              value={form.bpm}
              onChange={e => setForm({ ...form, bpm: Number(e.target.value) })}
              required
            />
          </div>
        </FormGroup>
      </div>

      {/* Price */}
      <FormGroup label={t('upload.price')}>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg font-medium">$</span>
          <input
            className="w-full bg-neutral-900/80 border border-neutral-700 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-[#777A85] focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background transition-all duration-200"
            type="number"
            step="0.01"
            min="0"
            placeholder="29.99"
            value={form.price}
            onChange={e => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
        </div>
      </FormGroup>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <UploadZone
          label={t('upload.audio')}
          accept="audio/*"
          file={audio}
          onFileChange={setAudio}
          type="audio"
          helperText="MP3 or WAV required • Maximum 50MB"
        />
        <UploadZone
          label={t('upload.cover')}
          accept="image/*"
          file={cover}
          onFileChange={setCover}
          type="image"
          helperText="JPG, PNG or WEBP • Maximum 10MB"
        />
      </div>

      {/* Messages */}
      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-4 text-emerald-400 text-sm backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {message}
          </div>
        </div>
      )}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 text-rose-400 text-sm backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button 
        className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white text-base font-bold transition-all duration-300 hover:scale-[1.02] active:scale-100 shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
        type="submit"
        disabled={isUploading}
      >
        {isUploading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          'Upload Beat'
        )}
      </button>
    </form>
  );
}

