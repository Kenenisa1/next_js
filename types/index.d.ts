export {}; // This makes the file a module

interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
  };
}

interface CloudinaryWidgetInstance {
  open: () => void;
  close: () => void;
  destroy: () => Promise<void>;
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: object,
        callback: (error: Error | null, result: CloudinaryResult) => void
      ) => CloudinaryWidgetInstance;
    };
  }
}