import { User } from '@/components/InfiniteScroll/postList';

export interface state {
  userUid: { value: string };
}

export interface userDataState {
  userData: {
    isLoading: boolean;
    error: boolean;
    data: User;
  };
}
