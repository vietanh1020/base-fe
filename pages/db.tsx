import * as React from "react";

import { FriendList } from "@/components/cart/FriendList";
import { AddFriend } from "@/components/cart/AddFriend";
import { ClearDatabaseButton } from "@/components/cart/ClearDatabaseButton";

export default function App() {
  return (
    <div className="App">
      <h1>Dexie useLiveQuery() sample</h1>
      <FriendList />
      <AddFriend />
      <ClearDatabaseButton />
    </div>
  );
}
