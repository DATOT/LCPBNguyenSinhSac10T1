import { useState, useRef } from "react";

interface Props {
  onSubmit: (data: {
    title: string;
    description: string;
    author: string;
    file: File;
  }) => void;

  config: {
    title: string;
    authorPlaceholder: string;
    titlePlaceholder: string;
    descriptionPlaceholder: string;
    submitText: string;

    dropIdleText: string;
    dropActiveText: string;
    dropWithFileText: string;
    errorTitleRequired: string;
    errorFileRequired: string;
  };
}

export default function PostForm({ onSubmit, config }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setError(config.errorTitleRequired);
      return;
    }

    if (!file) {
      setError(config.errorFileRequired);
      return;
    }

    setError(null);

    onSubmit({
      ...form,
      file,
    });

    setForm({
      title: "",
      description: "",
      author: "",
    });
    setFile(null);
    setPreview(null);
  };

  const inputClass = `
    w-full p-2 rounded-[var(--radius-sm)] border outline-none
    bg-[rgb(var(--color-surface-elevated))]
    border-[rgb(var(--color-border))]
    text-[rgb(var(--color-text))]
    placeholder:text-[rgb(var(--color-text-muted))]
    focus:ring-2 focus:ring-[rgb(var(--color-focus-ring)/0.4)]
    transition
  `;

  return (
    <div
      className="
        mb-8 p-5 rounded-[var(--radius-lg)] border
        bg-[rgb(var(--color-surface))]
        border-[rgb(var(--color-border))]
      "
    >
      <h2 className="mb-4 text-lg font-semibold text-[rgb(var(--color-text))]">
        {config.title}
      </h2>

      <div className="grid gap-4">
        {/* Author */}
        <input
          placeholder={config.authorPlaceholder}
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
          className={inputClass}
        />

        {/* Title */}
        <input
          placeholder={config.titlePlaceholder}
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className={inputClass}
        />

        {/* Drag & Drop */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className={`
            relative flex flex-col items-center justify-center
            h-48 rounded-[var(--radius-md)]
            border-2 border-dashed cursor-pointer
            transition-all duration-200 text-center px-4
            ${dragging ? "scale-[1.02]" : ""}
          `}
          style={{
            borderColor: dragging
              ? "rgb(var(--color-primary))"
              : "rgb(var(--color-border))",
            background: dragging
              ? "rgba(var(--color-primary) / 0.08)"
              : "transparent",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />

          <p className="text-sm text-[rgb(var(--color-text-muted))]">
            {file
              ? config.dropWithFileText
              : dragging
              ? config.dropActiveText
              : config.dropIdleText}
          </p>
        </div>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            className="
              h-44 object-cover
              rounded-[var(--radius-md)]
              border border-[rgb(var(--color-border))]
            "
          />
        )}

        {/* Description */}
        <textarea
          placeholder={config.descriptionPlaceholder}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className={inputClass}
        />

        {/* Error */}
        {error && (
          <div className="text-sm text-[rgb(var(--color-danger))]">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="
            px-4 py-2 rounded-[var(--radius-md)]
            font-medium transition
            text-[rgb(var(--color-primary-foreground))]
            bg-[rgb(var(--color-primary))]
            hover:opacity-90
            active:scale-[0.98]
          "
        >
          {config.submitText}
        </button>
      </div>
    </div>
  );
}