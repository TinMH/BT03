import React from 'react';
import { Row, Col } from 'antd';

const AuthLayout = ({ children, title }) => {
    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            minHeight: "100vh",
            width: "100%",
            background: "var(--bg)"
        }}>
            <Row justify={"center"} style={{ width: "100%" }}>
                <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                    <div style={{ 
                        padding: "40px", 
                        border: "1px solid var(--border)", 
                        borderRadius: "15px", 
                        boxShadow: "var(--shadow)",
                        background: "var(--bg)",
                        textAlign: "left"
                    }}>
                        {title && <h2 style={{ textAlign: "center", marginBottom: "30px" }}>{title}</h2>}
                        {children}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AuthLayout;