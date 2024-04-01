import { auth } from "../auth"

export default async function Index() {
  const session = await auth()

  return (
    <div>
      <h1>NextAuth.js Example</h1>
      <div>
        This is an example site to demonstrate how to use
        examples to see how to secure pages and get session data.
      </div>
      <div>
        <div>
          Current Session
        </div>
        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
}
