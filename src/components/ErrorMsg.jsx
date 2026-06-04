export default function ErrorMsg({ message }) {
    return message && (
        <div className="flex items-center justify-center gap-2 mt-80 mb-50 mx-auto text-[var(--color-error)]">
            <span className="material-symbols-outlined text-[var(--color-error)]">error</span>
            <span className="text-base text-[var(--color-error)]">{message}</span>
        </div>
    );
}