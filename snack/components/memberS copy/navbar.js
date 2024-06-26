import React from "react";
import Link from "next/link";
// import { useAuth } from "@/contexts/auth-context";

export default function Navbar() {
  // const { auth, logout } = useAuth();
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" href="/address-book">
                  通訊錄列表
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/address-book/add">
                  新增通訊錄
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/qs?name=bill&age=25">
                  測試QS
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
           
                <>
                  <li className="nav-item">
                    <Link className="nav-link" href="/login-quick">
                      快速登入
                    </Link>
                  </li>
                </>
            
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
