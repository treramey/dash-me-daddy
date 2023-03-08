import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import MainLayout from "~/components/layouts/mainLayout"

import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { api } from "~/utils/api";

import "~/styles/globals.css";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    session: Session | null;
  }
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  const layout = getLayout(<Component {...pageProps} />) as JSX.Element;
  return getLayout(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <SessionProvider session={session}>
        {Component.requireAuth ? <div datatype="pro">{layout}</div> : layout}
      {/* <Auth>
      </Auth> */}
    </SessionProvider>
  );
};

interface AuthProps {
  children: ReactNode;
}

const Auth : any =  ({ children }: AuthProps) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const isUser = !!session?.user;

  useEffect( () => {
    const isUserSignedIn = async () => await signIn();
    if (loading) return; // Do nothing while loading
    if (!isUser) isUserSignedIn; // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }

  return children;
};

export default api.withTRPC(MyApp);
