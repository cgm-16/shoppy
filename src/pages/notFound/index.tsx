import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h1>404</h1>
        <p>이 페이지가 존재하지 않습니다.</p>
        <Link to="/">홈페이지로 이동</Link>
    </div>
);

export default NotFoundPage;