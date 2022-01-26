import React from "react";
import { Helmet } from "react-helmet-async";

interface HelmetAsyncProps {
  title: string;
}

const HelmetAsync: React.FC<HelmetAsyncProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetAsync;
