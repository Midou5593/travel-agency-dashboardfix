import React, { useRef } from "react";
import { Link } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  const sidebarRef = useRef<SidebarComponent>(null);
  const toggleSidebar = () => {
       sidebarRef.current?.toggle();
  }

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>Tourvistor</h1>
        </Link>
        {/*// @ts-ignore */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex items-center gap-2.5 py-10"
        >
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>
      <SidebarComponent
        ref={sidebarRef}
        created={() => sidebarRef.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="Over"
        id="sidebar"
        width={270}
        enableGestures={false}
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
