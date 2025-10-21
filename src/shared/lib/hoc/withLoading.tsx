import React, { type PropsWithChildren } from "react";
import styles from './withLoading.module.css';

interface WithLoadingI {
  isLoading: boolean;
}

function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithLoadingComponent(props: PropsWithChildren<P & WithLoadingI>) {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      return <div className={styles.container}>
        <span className={styles.loader}></span>
      </div>
    }

    return <WrappedComponent {...(restProps as P)} />;
  };
}

export default withLoading;