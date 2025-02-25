'use client';
import {useRouter} from 'next/navigation';
import {
  defaultTheme,
  Provider
} from '@adobe/react-spectrum';
import { TRPCReactProvider } from "~/trpc/react";

// This is a custom type that extends the RouterConfig type from react-spectrum
declare module '@adobe/react-spectrum' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >;
  }
}

// the Provider of the Application
export function ClientProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <TRPCReactProvider>
      <Provider
        theme={defaultTheme}
        router={{ navigate: router.push }}
        locale='ja-JP'
      >
        {children}
      </Provider>
    </TRPCReactProvider>
  );
}
