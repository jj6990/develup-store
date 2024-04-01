import { auth } from "../../auth"
import { SessionProvider } from "next-auth/react"

export default async function ClientPage() {
  const session = await auth()
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }

  return (
    <SessionProvider basePath={"/auth"} session={session}>
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
    </SessionProvider>
  )
}
