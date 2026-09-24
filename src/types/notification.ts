export type NotificationType =
  | 'application_received'
  | 'application_accepted'
  | 'crew_invite'
  | 'project_invite'
  | 'general';

export interface ShipNotification {
  id: number;

  type: NotificationType;

  title: string;
  message: string;

  href?: string;
  imageUrl?: string;

  createdAt: string;

  read: boolean;
}