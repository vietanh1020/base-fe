import { db } from "@/db";
import React, { FormEvent, useState } from "react";

export function AddFriend() {
  const [friend, setFriend] = useState({
    name: "",
    age: 20,
  });

  function onSubmit(event: FormEvent) {
    db.friends.add(friend);
    event.preventDefault();
    setFriend({
      name: "",
      age: 20,
    });
  }

  return (
    <div>
      <h3>Add new friend</h3>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            autoFocus
            placeholder="Enter name..."
            value={friend.name}
            onChange={(ev) =>
              setFriend((friend) => ({
                ...friend,
                name: ev.target.value,
              }))
            }
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            value={friend.age}
            onChange={(ev) =>
              setFriend((friend) => ({
                ...friend,
                age: parseInt(ev.target.value, 10),
              }))
            }
          />
        </label>
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}
