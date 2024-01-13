"use client";

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #000;
  color: #fff;
`;

const FooterItems = styled.div`
  max-width: 1257px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const FooterText = styled.p`
  margin: 0;
`;

const FooterLink = styled.a`
  color: #ff8c00;
  //   text-decoration: underline;
  cursor: pointer;
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterItems>
        <FooterText>
          © {currentYear}{" "}
          <FooterLink
            href="https://inleadsit.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inleads IT{" "}
          </FooterLink>
          All Rights Reserved.
        </FooterText>
        <FooterText>
          Developed by{" "}
          <FooterLink
            href="https://github.com/mdforhadsarker"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forhad
          </FooterLink>
        </FooterText>
      </FooterItems>
    </FooterContainer>
  );
}

export default Footer;
