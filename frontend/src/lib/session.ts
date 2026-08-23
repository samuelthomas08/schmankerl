import type { User, Workspace } from '../client';

export type StoredUser = Pick<User, 'id' | 'firstname' | 'lastname' | 'email'>;
export type StoredWorkspace = Pick<Workspace, 'id' | 'name'>;

const USER_KEY = 'schmankerl_user';
const WORKSPACE_KEY = 'schmankerl_workspace';
const PENDING_INVITE_KEY = 'schmankerl_pending_invite';

export const getStoredUser = (): StoredUser | null => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const setStoredUser = (user: StoredUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getStoredWorkspace = (): StoredWorkspace | null => {
  const raw = localStorage.getItem(WORKSPACE_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const setStoredWorkspace = (workspace: StoredWorkspace) => {
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
};

export const getPendingInviteToken = (): string | null =>
  sessionStorage.getItem(PENDING_INVITE_KEY);

export const setPendingInviteToken = (token: string) => {
  sessionStorage.setItem(PENDING_INVITE_KEY, token);
};

export const clearPendingInviteToken = () => {
  sessionStorage.removeItem(PENDING_INVITE_KEY);
};
