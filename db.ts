import Dexie, { Table } from "dexie";
export interface Friend {
  id?: number;
  name: string;
  age: number;
}

class FriendsDB extends Dexie {
  friends!: Table<Friend>;

  constructor() {
    super("friendsDB");
    this.version(2).stores({
      friends: `
        ++id,
        age`,
    });
  }
}

export const db = new FriendsDB();
