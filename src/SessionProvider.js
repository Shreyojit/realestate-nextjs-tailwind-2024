'use client';

import { SessionProvider } from "next-auth/react";

const Providing = ({ children, session }) => (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
)

export default Providing;