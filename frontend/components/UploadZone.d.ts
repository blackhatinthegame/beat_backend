interface UploadZoneProps {
    label: string;
    accept: string;
    file: File | null;
    onFileChange: (file: File | null) => void;
    type: 'audio' | 'image';
    helperText?: string;
}
export default function UploadZone({ label, accept, file, onFileChange, type, helperText }: UploadZoneProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=UploadZone.d.ts.map