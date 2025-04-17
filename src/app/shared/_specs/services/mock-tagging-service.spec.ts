import { signal } from "@angular/core";

export const MockTaggingService = {
  signals: {
    'job-applications': signal([]),
  },
  getTags: async () => ({}),
  setTags: async () => ({}),
  resetTags: async () => ({}),
};