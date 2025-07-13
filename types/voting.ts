export interface Voting {
  id: number;
  creator: string;
  title: string;
  description: string;
  active: boolean;
}
export interface NewVoting {
    title: string;
    description: string;
}

export interface Candidate {
    id: number;
    voting_id: number;
    name: string;
    image_addr: string;
    vote_count: number;
}
