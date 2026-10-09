"use client";

import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";

interface DeleteDialogBoxProps {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialogBox = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteDialogBoxProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => !isDeleting && onClose()}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-dark-100 shadow-2xl">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-4 top-4 rounded-full p-2 text-light-200 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="p-7">
          {/* Warning icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle
              size={28}
              className="text-red-400"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-white">
            Delete this event?
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-light-200">
            Are you sure you want to delete this event? This action
            cannot be undone and all event information will be
            permanently removed.
          </p>

          {/* Actions */}
          <div className="mt-7 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-light-200 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete Event
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialogBox;