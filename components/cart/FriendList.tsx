import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

/**
 *  This React component demonstrates the power of
 *
 *      useLiveQuery()
 *
 *  See https://dexie.org/docs/dexie-react-hooks/useLiveQuery()
 */
export function FriendList() {
  // Let's declare some state that will affect the queries:
  const [maxAge, setMaxAge] = useState(21);

  // Query friends within a certain range decided by state:
  const friends = useLiveQuery(
    () =>
      db.friends
        .where("age")
        .belowOrEqual(maxAge || 0)
        .sortBy("id"),
    [maxAge] // because maxAge affects query!
  );

  // Another simple query - total number of friends:
  const friendCount = useLiveQuery(() => db.friends.count());

  // Default values returned --> queries are still loading.
  if (!friends || friendCount === undefined) return null;

  return (
    <div>
      <p>
        Your have <b>{friendCount}</b> friends in total.
      </p>
      <label>
        Please enter max age:
        <input
          type="number"
          value={maxAge}
          onChange={(ev) => setMaxAge(parseInt(ev.target.value, 10))}
        />
      </label>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.name}, {friend.age}
            <button
              onClick={() =>
                db.friends
                  .where({
                    id: friend.id,
                  })
                  .modify((f) => ++f.age)
              }
            >
              Birthday!
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
