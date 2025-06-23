declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
      };
    };
  }
}

export type Event = {
  id: string;
  date: string;
  cover: string;
  title: string;
  people: number;
  venueAddress: string;
  published?: boolean;
  ticketmasterId?: string;
};

export {};