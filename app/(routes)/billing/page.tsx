// import { PricingTable } from "@clerk/nextjs";
// import React from "react";

// const BillingPage = () => {
//   return (
//     <div>
//       <h1 className="">Choose Your Plan</h1>
//       <p className="">Select a subscription plan to get all Ai Tools Access</p>
//       <PricingTable />
//     </div>
//   );
// };

// export default BillingPage;

import { PricingTable } from "@clerk/nextjs";
import React from "react";

const BillingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
      <div className="max-w-2xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Select a subscription plan to get full access to all AI tools.
        </p>
      </div>
      <div className="w-full max-w-4xl">
        <PricingTable />
      </div>
    </div>
  );
};

export default BillingPage;
