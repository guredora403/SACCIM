export const RelationshipStatus = {
  none: "NONE",
  request_sent: "REQUEST_SENT",
  request_received: "REQUEST_RECEIVED",
  friend: "FRIEND",
} as const;

export type RelationshipStatus =
  (typeof RelationshipStatus)[keyof typeof RelationshipStatus];
