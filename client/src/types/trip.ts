export interface TripParticipant {
  id: string;
  name: string;
}

export interface TripStop {
  id: string;
  title: string;
  totalAmount: number;
  paidByParticipantId: string | null;
  participantIds: string[];
}

export interface TripState {
  tripId: string | null;
  title: string;
  participants: TripParticipant[];
  stops: TripStop[];
}
