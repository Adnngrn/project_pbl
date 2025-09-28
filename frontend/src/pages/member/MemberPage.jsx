import React from "react";
import LayoutMember from "../../components/member/LayoutMember";
import { Outlet } from "react-router-dom";

const MemberPage = () => {
  return (
    <LayoutMember>
        <Outlet/>
    </LayoutMember>
  );
};

export default MemberPage;