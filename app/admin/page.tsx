/* eslint-disable @next/next/no-img-element */
import { deleteTask } from "@/app/admin/action";
import { db, tasks } from "@/db";
import Link from "next/link";

const Admin = async () => {
  const items = await db.select().from(tasks);

  return (
    <div className="p-4 flex flex-col gap-4">
      <Link href="/admin/upload">Upload</Link>
      <ul className="flex flex-col gap-4">
        {items.map((item) => {
          return (
            <li className="flex gap-4" key={item.id}>
              <form action={deleteTask}>
                <input type="hidden" name="image" value={item.image} />
                <button>DEL</button>
              </form>
              <span>{item.child}</span>
              <img src={item.image} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Admin;
