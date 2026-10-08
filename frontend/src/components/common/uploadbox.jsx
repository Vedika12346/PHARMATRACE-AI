import {
  CloudUpload,
  Upload,
  X,
} from 'lucide-react'

export default function UploadBox({
  accept,
  onFile,
  selected,
  kind,
}) {
  return (
    <div className="upload-wrap">
      {selected ? (
        <div className="selected-file">
          <div className="file-icon">
            <Upload size={19} />
          </div>

          <div>
            <strong>{selected.name}</strong>

            <span>
              {selected.size
                ? `${(
                    selected.size / 1024
                  ).toFixed(1)} KB`
                : 'Ready to analyze'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onFile(null)}
          >
            <X size={17} />
          </button>
        </div>
      ) : (
        <label className="upload-box">
          <input
            type="file"
            accept={accept}
            onChange={(e) =>
              onFile(e.target.files?.[0] || null)
            }
          />

          <div className="upload-icon">
            <CloudUpload size={22} />
          </div>

          <strong>
            Drop your {kind} here, or{' '}
            <u>browse</u>
          </strong>

          <span>
            Supported format:{' '}
            {accept
              .replaceAll('.', '')
              .toUpperCase()}{' '}
            · Max 10 MB
          </span>
        </label>
      )}
    </div>
  )
}