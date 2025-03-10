export const mockRouter = {
  events: {
    pipe: (fnPipe: any) => ({
      subscribe: (fnSubscribe: any) => ({}),
    }),
  },
  navigateByUrl: (url: string) => ({}),
};