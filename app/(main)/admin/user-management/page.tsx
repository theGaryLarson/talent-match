export default function UserManagement() {
  return (
    <main className="mx-auto flex w-3/4 flex-col gap-4">
      <div className="flex">
        <label>Search for a User:</label>
        <input name="myInput" placeholder="Jane Doe" className="w-3/4" />
      </div>
      <div className="grid w-full grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col overflow-y-scroll border border-black">
          <button className="m-2 rounded border border-black p-2">
            User 1
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 2
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 3
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 4
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 5
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 6
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 7
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 8
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 9
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 10
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 11
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 12
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 13
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 14
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 15
          </button>
          <button className="m-2 rounded border border-black p-2">
            User 16
          </button>
        </div>
        <div className="col-span-3 overflow-y-scroll border border-black">
          <div className="m-2 ">
            <p>Career Prep Track: Standard</p>
            <p>Progress: % current module / total modules</p>
            <ul className="flex flex-wrap gap-1">
              <li className="rounded-tr-xl border border-black pr-8">
                <button>Tab 1</button>
              </li>
              <li className="rounded-tr-xl border border-black pr-8">
                <button>Tab 2</button>
              </li>
            </ul>
            <div className="flex flex-col gap-4 border border-black p-4">
              <div className="flex flex-wrap gap-2">
                <p>Past Meetings:</p>
                <p className="rounded-lg border border-black px-1">
                  10/29/2024
                </p>
                <p className="rounded-lg border border-black px-1">11/3/2024</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <p>Upcoming Meetings:</p>
                <p className="rounded-lg border border-black px-1">3/11/2025</p>
              </div>
              <div className="m-4 h-32 border border-black">
                <p className="my-auto text-center">Notes</p>
              </div>
            </div>
            <div>
              <p>Files</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
