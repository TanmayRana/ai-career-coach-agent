// "use client";

// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";

// function Provider({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const { user } = useUser();
//   console.log("user", user);

//   useEffect(() => {
//     user && createNewUser();
//   }, [user]);

//   const createNewUser = async () => {
//     const result = await axios.post("/api/user");
//   };

//   return <div>{children}</div>;
// }

// export default Provider;

"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect } from "react";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    try {
      const res = await axios.post("/api/user");
      // console.log("res in createNewUser", res.data);
    } catch (error: any) {
      console.error(
        "Failed to create user:",
        error.response?.data || error.message
      );
    }
  };

  return <>{children}</>;
}

export default Provider;
