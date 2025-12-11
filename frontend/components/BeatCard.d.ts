interface BeatCardProps {
    beat: {
        id: string;
        title: string;
        coverUrl?: string;
        price: number;
        genre?: string;
        bpm?: number;
        mood?: string;
        key?: string;
    };
    onPlay?: (beat: any) => void;
}
export default function BeatCard({ beat, onPlay }: BeatCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=BeatCard.d.ts.map