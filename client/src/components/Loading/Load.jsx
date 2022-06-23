import React, { useEffect, useState } from "react";
import { Link } from "@mui/material";
import { RedoOutlined } from "@ant-design/icons";

const Load = () => {
  const [loadingPage, getLoadingPage] = useState("true");

  useEffect(() => {
    const loadScreen = async () => {
      await new Promise((res) => setTimeout(res, 3000));

      getLoadingPage((loadingPage) => !loadingPage);
    };

    loadScreen();
  }, []);

  if (loadingPage) {
    return (
      <div>
        <RedoOutlined />
        Loading...
      </div>
    );
  } else {
    return <Link href={"/board"} />;
  }
};

export default Load;
