export type UserTier = 'GUEST' | 'FREE' | 'PRO';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  tier: UserTier;
}
