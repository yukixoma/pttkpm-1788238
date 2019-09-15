import React, { Fragment } from "react";
import { Alert, AlertProps } from "react-bootstrap";

const AlertBanner: React.FC<AlertBannerProps> = props => {
  const { variant, headerMessage, message } = props;
  return (
    <Fragment>
      {message !== "" ? (
        <Alert variant={variant}>
          <Alert.Heading>{headerMessage}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      ) : null}
    </Fragment>
  );
};

interface AlertBannerProps extends AlertProps {
  headerMessage?: string;
  message: string;
}

export default AlertBanner;
