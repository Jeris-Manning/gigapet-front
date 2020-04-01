import React from "react";
import Layout from "antd/es/layout";
import "antd/es/layout/style/css";

const { Footer } = Layout;

const FooterComp = () => {
  return (
    <Layout className="layout">
      <Footer style={{ textAlign: "center" }}>
        Gigapet ©2020 Created by our awesome team.
      </Footer>
    </Layout>
  );
};

export default FooterComp;
