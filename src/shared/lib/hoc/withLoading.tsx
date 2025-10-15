import React from "react";
import type { WithLoadingI } from "../../../interfaces/withLoading.interface";
import styles from './withLoading.module.css';

function withLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithLoadingComponent(props: P & WithLoadingI) {
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